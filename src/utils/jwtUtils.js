import jwt from "jsonwebtoken";
export const verifyToken = (token) => {
  // const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
  // console.log(token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    const userId = decoded.id; // Extract user ID from the decoded payload
    // You can use the userId to perform database queries or other user-specific actions
    console.log("User ID:", userId);
    return userId;
    // res.status(200).json({msg:"Id found",status:200,userId})
  } catch (error) {
    // Handle token verification errors (e.g., token expired or invalid)
    console.error("Token error:", error.message);
    return null;
    // res.status(500).json({msg:"Token Error",status:500,error:error})
  }
};
