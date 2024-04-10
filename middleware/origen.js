const checkOrigin = (req, res, next) => {
    const token = req.headers.authorization.split(' ').pop();
    
    console.log(req.headers);
    next();
}