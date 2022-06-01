const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //Emitir um sinal
        console.log('Conectado a base de dados');
        app.emit('pronto');
    })
    // Pode ser usado para renderizar um erro
    .catch((e) => console.log(e));
 const sessionEx = require('express-session');
const MongoStore = require('connect-mongo');
const flasgMsg = require('connect-flash');

const routes = require('./routes'); 
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMiddlewre} = require('./src/middlewares/middleware');

app.use(helmet());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Conteúdo estático
app.use(express.static(path.resolve(__dirname, 'public')));
//Configurações da session
const sessionOptions = sessionEx({
    secret:'Oláaaa',
    store: MongoStore.create({mongoUrl: url}),
    resave: false,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }

});
//Utilizando a sessionOptions
app.use(sessionOptions);
//Utilizando o flash
app.use(flasgMsg());
//Renderização absoluta
app.set('views', path.resolve(__dirname, 'src', 'views'));
//Instalando EJS = npm i ejs
app.set('view engine', 'ejs');
app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddlewre);
app.use(routes);
//Quando o aplicativo estiver pronto executara uma função
app.on('pronto', () =>{
    app.listen(3000, ()=> {
        console.log('http://localhost:3000');
        console.log('Servidor exucutando na porta 3000');
    });
});



