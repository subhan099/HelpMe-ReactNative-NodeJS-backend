const VendorModel = require("../../Model/vendor.model");
const BookingModel = require('../../Model/booking.modal')
Math.radians = function (degrees) {
    return degrees * (Math.PI / 180);
};


const bookingController = async (req, res) => {
    console.log("hello", req.body);
    const {userId, location, issues, vehicleType, vendorId} = req.body;
    try {
        const newBooking = new BookingModel({
            customer_Id : userId,
            vendor_Id : vendorId,
            issues,
            vehicleType,
            location : {
                lat : location.lat,
                lng : location.lng
            }
        });
        const savedBooking  = await newBooking.save();
        console.log(savedBooking);
        return res.status(200).json({
            message : "Vendor on the way",
            success : true,
          });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message : "Invalid Data",
            success : false,
          });
    }
}

const bookingSearchController = async (req, res) => {
    console.log("calling search api", req.body);
    try {
        const vendor = await VendorModel.find({
          lat: { $ne: null }, // Exclude vendors without location coordinates
          lng: { $ne: null }, // Exclude vendors without location coordinates
        }).sort({
            lat: 1, // Sort in ascending order of latitude
            lng: 1, // Sort in ascending order of longitude
        });
        const getNearestVendor = vendor?.filter(item=> {
            const distance = calculateDistance(req.body.lat,req.body.lng, item.lat, item.lng);
            if(distance >= 0 && distance <= 5){
                return item
            }
        });
        if(getNearestVendor?.length > 0) {
            return res.status(200).json({
                status : true,
                vendors : getNearestVendor 
            });
        }else{
            return res.status(404).json({
                status : false,
                message : "Not found",
                vendors : [] 
            });
        }
        
      } catch (error) {
        res.status(404).json({
            status : false,
            message : "Not found",
            vendors : [] 
        });
        console.error('Error finding nearest vendor:', error);
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
  
    // Convert degrees to radians
    const lat1Rad = Math.radians(lat1);
    const lon1Rad = Math.radians(lon1);
    const lat2Rad = Math.radians(lat2);
    const lon2Rad = Math.radians(lon2);
  
    // Calculate the differences between the coordinates
    const latDiff = lat2Rad - lat1Rad;
    const lonDiff = lon2Rad - lon1Rad;
  
    // Apply the Haversine formula
    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Calculate the distance
    const distance = earthRadius * c;
  
    return Math.round(distance);
  }
  

  const getPaddingRequest = async (req, res) => {
    console.log("padding", req.body);
    const {vendorId}  = req.body;
    try {
        const getData = await BookingModel.find({vendor_Id : vendorId , status : "pending"}).populate({
            path : 'customer_Id',
            model: "users",
        }).exec();
        console.log(getData);
        return  res.status(200).json({
            data : getData,
            success : false,
          });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            data : [],
            success : false,
          });
    }
  }


  const getActiveRequest = async (req, res) => {
    console.log("acitve", req.body);
    const {vendorId}  = req.body;
    try {
        const getData = await BookingModel.find({vendor_Id : vendorId , status : "active"}).populate({
            path : 'customer_Id',
            model: "users",
        }).exec();
        console.log(getData);
        return  res.status(200).json({
            data : getData,
            success : false,
          });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            data : [],
            success : false,
          });
    }
  }

const updateStatus = async (req, res) => {
    const {bookingId, status} = req.body
    console.log(req.body);
    try {
       const updateData  =  await BookingModel.findByIdAndUpdate(bookingId, {status});
       console.log("update Data", updateData);
       return res.status(200).json({
        data : updateData,
        success : true,
      });
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            data : {},
            success : false,
          });
    }    
}


module.exports = {
    bookingController,
    bookingSearchController,
    getPaddingRequest,
    updateStatus,
    getActiveRequest
}

