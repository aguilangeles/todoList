/**
 * Created by angeles on 3/19/16.
 */

/**
 * TODO LIST (SIN HTML) SOLO API
 Crear Nota
 Tipo de nota: texto o items
 Si es un item: completado, texto y fecha completado
 Si es un texto: solo body
 Nombre
 Usuario
 fecha de creacion
 fecha de ultima modificacion
 Estado
 Listar todas las notas de un usuario
 * */


// ========================= application ==================================
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json({ type: 'application/*+json' });
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser);
app.use(urlencodedParser);

// parse application/json
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


// ========================= entities ==================================

function Usuario(obj){
    return{
        id:     parseInt(obj.id),
        nombre: obj.nombre
    }
}
function Nota(obj) {
    // TODO: validar obj!!!!
    var date = new Date();
    return {
        id:             parseInt(obj.id), //TODO: crear ids unicos dinamicamente!!!!
        tipo:           obj.tipo,
        texto:          obj.texto,
        creacion:       date,
        modificacion:   date,
        estado:         obj.estado,
        idUsuario:      parseInt(obj.idUsuario)
    }
}

function Item(obj){

    return{
        id:     parseInt(obj.id),
        texto:  obj.texto,
        estado: obj.estado,
        idNota: obj.idNota
    }
}


// ========================= data ==================================

var notas   = [
    new Nota({id: 1, tipo: 'nota', texto: 'esta es una puta nota 1', estado: 'activa', idUsuario: 1}),
    new Nota({id: 2, tipo: 'nota', texto: 'esta es una puta nota 2', estado: 'activa', idUsuario: 1}),
    new Nota({id: 3, tipo: 'checklist', texto: 'esta es un puta checklist 3', estado: 'activa', idUsuario: 1}),
    new Nota({id: 4, tipo: 'checklist', texto: 'esta es un puto checklist 4', estado: 'activa', idUsuario: 1})
];

var items = [
    new Item({id:1, texto:'primer item', estado:'activo', idNota:2}),
    new Item({id:2, texto:'segundo item', estado:'activo', idNota:2})
];

var usuarios = [
    new Usuario({id:1, nombre:'charly'}),
    new Usuario({id:2, nombre:'lucy'})
];



// ========================= routes ==================================

app.get('/', function (req, res, next) {
    res.send('Hello World!');
    next();
});


// ========================= usuarios ==================================
app.post('/usuarios', urlencodedParser, function(req,res,next){

    if (!req.body) {
        return res.sendStatus(400);
    }
    var obj = {
        id:         req.body.id,
        nombre:     req.body.nombre

    };
    var usuario = new Usuario(obj);
    res.send('welcome usuario, ' + req.body.nombre);
    console.log(usuario);
    usuarios.push(usuario);
    next();

});

function getUsuarioById(id) {
    var ret = false;
    id = parseInt(id);
    if (id && !isNaN(id))  {
        usuarios.forEach(function(usuario) {
            if (usuario.id == id) {
                ret = usuario;
            }
        });
    }
    return ret;
}

app.get('/usuarios/:id', urlencodedParser, function(req, res, next){

    res.send(getUsuarioById(req.params.id));
    next();

});

app.get('/usuarios', urlencodedParser, function(req, res, next){
    res.send(usuarios);
    next();

});

// ========================= notas ==================================

app.post('/notas', urlencodedParser, function(req, res, next){

    if (!req.body) {
        return res.sendStatus(400);
    }
    var obj = {
        id:         req.body.id,
        tipo:       req.body.tipo,
        texto:      req.body.texto,
        estado:     req.body.estado,
        idUsuario:  req.body.idUsuario
    };

    var nota = new Nota(obj);
    res.send('welcome nota, ' + req.body.id);
    console.log(nota);
    notas.push(nota);
    next();

});

function getNotaById(id) {
    var ret = false;
    id = parseInt(id);
    if (id && !isNaN(id))  {
        notas.forEach(function(nota) {
            if (nota.id == id) {
                ret = nota;
            }
        });
    }
    return ret;
}

app.get('/notas/:id', urlencodedParser, function(req, res, next){

    res.send(getNotaById(req.params.id));
    next();

});

app.get('/notas', urlencodedParser, function(req, res, next){

    res.send(notas);
    next();

});

// ========================= notas ==================================

app.post('/items', urlencodedParser, function(req,res,next){

    if (!req.body) {
        return res.sendStatus(400);
    }
    var obj = {
        id:         req.body.id,
        texto:      req.body.texto,
        estado:     req.body.estado,
        idNota:     req.body.idNota

    };
    var item = new Item(obj);
    res.send('welcome item, ' + req.body.texto);
    console.log(item);
    items.push(item);
    next();

});

function getItemById(id) {
    var ret = false;
    id = parseInt(id);
    if (id && !isNaN(id))  {
        items.forEach(function(item) {
            if (item.id == id) {
                ret = item;
            }
        });
    }
    return ret;
}

app.get('/items/:id', urlencodedParser, function(req, res, next){

    res.send(getNotaById(req.params.id));
    next();

});

app.get('/items', urlencodedParser, function(req, res, next){

    res.send(items);
    next();

});



