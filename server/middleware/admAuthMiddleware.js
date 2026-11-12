import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const tokenMatch = authHeader?.match(/^Bearer\s+(\S+)$/i);

  if (!tokenMatch) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.'
    });
  }

  let decoded;

  // Verify JWT
  try {
    decoded = jwt.verify(
      tokenMatch[1],
      process.env.JWT_SECRET,
      {
        issuer: 'portfolio-api',
        audience: 'portfolio-admin',
        algorithms: ['HS256']
      }
    );
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token.'
    });
  }

  // Validate token payload
  if (
    !decoded ||
    typeof decoded !== 'object' ||
    !decoded.sub ||
    decoded.role !== 'admin'
  ) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.'
    });
  }

  // Verify admin account
  try {
    const admin = await Admin.findById(decoded.sub)
      .select('_id role isActive');

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

    return next();
  } catch (error) {
    console.error('Admin authentication lookup failed:', error.message);

    return res.status(503).json({
      success: false,
      message: 'Authentication service is temporarily unavailable.'
    });
  }
};

export default authMiddleware;