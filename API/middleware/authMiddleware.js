// Middleware pour vérifier le rôle Admin
export const AdminRole = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.roles && req.user.roles.includes("admin")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admin role required." });
  }
};

// Middleware pour vérifier le rôle Parent
export const ParentRole = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.roles && req.user.roles.includes("parent")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Parent role required." });
  }
};

// Middleware pour vérifier le rôle Pro
export const ProRole = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.roles && req.user.roles.includes("pro")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Pro role required." });
  }
};
