import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
