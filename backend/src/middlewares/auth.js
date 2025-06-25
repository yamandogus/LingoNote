import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = neq.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "Yetkisiz erişim" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Geçersiz token" });
  }
};

export default auth;
