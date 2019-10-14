const User = require("./model.js");
const signToken = require('../serverAuth.js').signToken;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (err) {
    return res.status(400).send({ err: err.toString() });
  }
};

const createUser = async (req, res) => {
  try {
    let user = new User(req.body);
    user = await user.save();
    const token = signToken(user);
    res
      .status(201)
      .location(`/api/users/${user._id}`)
      .json({success: true, message: "Token attached.", token})
  } catch (err) {
    return res.status(400).send({ err: err.toString() });
  }
};

const getUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({message: "User not found!"});
    }

    res.status(200).send(user);
  } catch (err) {
    return res.status(400).send({ err: err.toString() });
  }
};

const updateUser = async (req, res) => {
  try{
    
  }catch(err){
    return res.status(400).send({err: err.toString()});
  }
}

const loginUser = async (req,res) => {
  try{
     const userEmail = req.body.email;

     var query  = User.where({ email: userEmail });
      
      // check if the user exists
		const user = await query.findOne((err, user) => {
      if(user) {
			// if there's no user or the password is invalid
			user.comparePassword(req.body.password, user.password,
        function (err,isMatch) {
          if(isMatch){
	         const token = signToken(user);
			     res.json({success: true, message: "Token attached.", token})
          }
          else if(err){
            //pass
            return res.json({success: false, message: "Invalid credentials."})
          }
          else {
            return res.json({success: false, message: "Invalid credentials."})
          }
        })}
       else {
          res.json({success: false, message: "Invalid credentials."});
        }
      })
  
		
  }
  catch(err){
    res.status(400).send({err:err.toString});
  }
}
 const removeUser = async (req, res) => {

  try{
     let userId = req.params.userId;
     let user = await User.findByIdAndRemove(userId);
     if (!user) {
      return res.status(404);
    } else {
      //res.status(204).send('User successfully deleted');
      res.send('removed');
    }
  }catch(err){
    return res.status(400).send({err: err.toString()});
  }
}

module.exports = {
getUsers,
createUser,
getUser,
updateUser,
loginUser,
removeUser
}