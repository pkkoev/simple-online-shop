const jwt = require('jsonwebtoken');
const User = require('./users/model.js');
const JWT_SECRET = process.env.JWT_SECRET || 'our-secret';

function signToken(user) {
	// toObject() returns a basic js object with only the info from the db
	const userData = user.toObject();
	delete userData.password;
	return jwt.sign(userData, JWT_SECRET,{ expiresIn: '1h' });
}

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const token = bearer[1];
    // Set the token
   //req.token = bearerToken;
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
		// if problem with token verification, deny access
		if(err) return res.json({success: false, message: "Invalid token."})
		// otherwise, search for user by id that was embedded in token
		User.findById(decodedData._id, (err, user) => {
			// if no user, deny access
			if(!user) return res.json({success: false, message: "Invalid token."})
			// otherwise, add user to req object
			req.user = user
			// go on to process the route:
			next()
		})})
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}

module.exports = {
	signToken,
	verifyToken
};

