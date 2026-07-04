export const isAdmin = (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'Admin') {
            return res.status(403).json({error: "Forbidden: Admin access required"});
        }

        next();
    } catch (error) {
        console.error("Admin Middleware Error: ", error.message);
        return res.status(403).json({error: "Forbidden: Admin access required"})
    }
}