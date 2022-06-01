exports.homePage = (req, res) =>{
    //res.render = renderizar page 
    res.render('index', {
        titulo: 'Título da Página',
        numeros: [0, 1, 2, 3]

    });
    return;
   
}

exports.trataPost = (req, res) =>{
    res.send(req.body);
    return;
}