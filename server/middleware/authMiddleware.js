import jwt from 'jsonwebtoken';
import Manager from '../models/managerModel.js';

export const authenticateManager = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, "Saumic");
    req.user = await Manager.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
