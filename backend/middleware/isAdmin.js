export const isAdmin = (req, res, next) => {
    try {
        const { isAdmin } = req.user;
        if (!isAdmin) {
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }
        next();
    } catch (error) {
        console.log("error in isAdmin middleware", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}