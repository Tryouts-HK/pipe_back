// for accessing files (RBAC)

const restrictResourceTo = (...roles) => {
  console.log("allowed roles");
  console.log(roles);
  return (req, res, next) => {
    console.log("printing req user");
    console.log(req.user);
    if (!req.user) {
      return res.status(401).json({ error: "You are not signed In" });
    }

    // Allow the request if no roles are passed
    if (roles.length === 0) {
      return next();
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
      return res
        .status(403)
        .json({
          error: `You are not allowed to make this request`,
        });
    }
    return next();
  };
};

export default restrictResourceTo;
