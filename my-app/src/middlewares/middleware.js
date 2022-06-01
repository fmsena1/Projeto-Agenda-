exports.middlewareGlobal = (req, res, next) =>{
    res.locals.variavelLocal = 'Valor local';
    next();
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('error');
    }
}

exports.csrfMiddlewre = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}