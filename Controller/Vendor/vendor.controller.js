const vendorModel = require("../../Model/vendor.model");

// Vendor SignUp

const vendorRegister = async (req, res) => {
  console.log("register", req.body);
    const { firstName, lastName, email, password } = req.body;
    const missingFields = [];
//   checking missing fields
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
  
    if (missingFields.length > 0) {
    const error = missingFields.reduce((acc , current) => {
        acc[current] = `The ${current} field is required` 
        return acc;
    } , {});

      res.status(422).json({      //invalid entry
        status : false,
        message: error,
      });


    } else {
        try {
            const checkUser = await vendorModel.find({email});
            if(checkUser?.length > 0){
                res.status(422).json({
                    status : false,
                    message: 'The given Email already registered .',
                    
                  });
            }else{
                const registerUser =  new vendorModel({
                    firstName,
                    lastName,
                    email,
                    password
                });
                const saveData = await registerUser.save();
                console.log(saveData);
                return res.status(200).json({
                    status : true,
                    message : "User registered successfully please check your email"
                });
            }
        } catch (error) {
            console.log(error?._message);
          res.status(500).json({
            status : false , 
            message : error?._message
          })   
        }
      
    }
  };
  

 

  const  vendorSignIn = async (req, res ) => {
    const { email, password } = req.body;
    console.log("calling the api", req.body);
    const missingFields  = [];
  if(!email) missingFields.push('email');
  if(!password) missingFields.push('password');
  if(missingFields.length > 0) {
    const error  = missingFields.reduce((previousValue, currentValue) => {
      previousValue[currentValue] = `The Missing field ${currentValue} is required`
      return previousValue;
    } , {});

    return res.status(401).json({
      message : "Invalid Data",
      error,
      success : false,
    });
  }
  
  const getVendorData = await vendorModel.findOne({email : req.body.email});
  console.log("doc aa gaya", getVendorData);
  if(getVendorData) {
    if(getVendorData?.password === req.body?.password){
      const updateUSer =  await vendorModel.findByIdAndUpdate(getVendorData?._id, {
        lat : req.body.lat,
        lng : req.body.lng,
        altitude: req.body.altitude
      });
      console.log("update USer", updateUSer);  
      return res.status(200).json({
          data : updateUSer,
          success : true,
        });
    }else{
      return res.status(401).json({
        message : "Invalid email or password",
        success : false
      })
    }

  }else{
    return res.status(401).json({
      message : "Invalid email or password",
      success : false
    })
  }
}




module.exports = {
    vendorRegister,
    vendorSignIn
}



