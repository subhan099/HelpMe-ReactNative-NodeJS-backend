const UserModel = require("../../Model/user.model");
const register = async (req, res) => {
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
            const checkUser = await UserModel.find({email});
            if(checkUser?.length > 0){
                res.status(422).json({
                    status : false,
                    message: 'The given Email already registered .',
                    
                  });
            }else{
                const registerUser =  new UserModel({
                    firstName,
                    lastName,
                    email,
                    password
                });
                const saveData = await registerUser.save();
                console.log(saveData);
                return res.status(200).json({
                    status : true,
                    message : "User register successfully please check your email"
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
  



module.exports = {
    register,
}



