const checkAccess = (role)=>{
    return (req, res, next)=>{
        try {
            if(req.user.role === role){
                next();
            } else {
                res.status(403).json({ message: 'Forbidden or UnAuthorized' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = checkAccess;