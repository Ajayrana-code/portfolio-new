
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
      {
        issuer: 'portfolio-api',
        audience: 'portfolio-admin'
      }
    );

    if (!decoded.sub || decoded.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token.'
      });
    }

    const admin = await Admin.findById(decoded.sub).select('_id role isActive');

    if (!admin || !admin.isActive || admin.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Admin account is no longer active.'
      });
    }

    req.admin = {
      id: admin._id,
      role: admin.role
    };

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.'
    });
  }
};

export default authMiddleware;
