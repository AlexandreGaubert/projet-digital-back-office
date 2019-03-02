const axios = require("axios");
const session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var multer = require('multer')
var fs = require('fs')

const port = 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: "shhhh"}))

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/galleries') //Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) //File name after saving
  }
})

var upload = multer({ storage: storage })

//Mongo connexion
var mongoDB = 'mongodb://localhost:27017/projet-digital';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//MongoDB Models
var News = require("./models/newsModel");
var Activity = require("./models/activityModel");
var Menu = require("./models/menuModel");
var Avis = require("./models/avisModel");
var Gallery = require("./models/galleryModel");

var someAvis = [
  {
    resident: "Mme Peltais",
    messages: [
      { from: 'resident', content: "J'ai trouvé l'animation d'aujourd'hui très bien faite j'ai passé un très bon moment"},
      { from: 'foyer', content: "Nous vous remercions de votre avis très positif cela nous fait chaud au coeur"},
      { from: 'resident', content: "Je vous en prie ça me fait plaisir !"}
    ],
    type: 'positive',
    solved: false,
    date: "2019-02-26"
  },
  {
    resident: "Mme Gourhan",
    messages: [
      { from: 'resident', content: "Le repas de ce midi etait très mauvais, le poisson contenait des arretes j'ai failli m'étouffer !"},
      { from: 'foyer', content: "Merci pour votre retour, nous ferons notre possible pour régler cette situation"}
    ],
    type: 'negative',
    solved: false,
    date: "2019-01-12"
  },
  {
    resident: "Mr Frin",
    messages: [
      { from: 'resident', content: "Le sapin est incroyablement bien décoré !"},
      { from: 'foyer', content: "Merci beaucoup Mr Frin, nous faisons en sorte qu'il soit le plus beau de toute la ville de Montfort"},
      { from: 'resident', content: "Et bien c'est réussi cette année encore, bravo !"}
    ],
    type: 'positive',
    solved: false,
    date: "2018-11-10"
  },
]

function populateAvis() {
  var avis = 0;
  someAvis.map((item, key) => {
    avis = new Avis(item);

    avis.save((err, avis) => {
      if (err) console.log(err);
      else console.log(avis);
    })
  })
}

// populateAvis()

var sess = Object();

var endpointsData = [
  {model: News, name: 'NEWS'},
  {model: Menu, name: 'MENU'},
  {model: Activity, name: 'ACTIVITY', get: getActivity},
  {model: Avis, name: 'AVIS'},
  {model: Gallery, name: 'GALLERY', create: createGallery},
]

io.on('connection', function(socket) {
  console.log("connected");
  endpointsData.map(data => {
    endpoints(socket, data)
  })
})

app.post('/create-gallery', upload.single('photo'), (req, res) => {
    var newGallery = new Gallery();

    newGallery.name = req.body.name;
    if(req.file) {
      newGallery.images.push(req.file.path)
      console.log(req.file);
    }
    newGallery.save();

    res.redirect('back')
});

function createGallery(socket) {
  socket.on('CREATE_GALLERY', data => {
    console.log(data.files[0]);
    var newGallery = new Gallery();
    var tmp = {};
    for (var i = 0; i < data.files.length; i++) {
      tmp.data = fs.readFileSync(data.files[i].name)
      tmp.contentType = data.files[i].type
      newGallery.images.push(tmp);
    }
    newGallery.save();
  })
}

function getActivity(socket) {
  socket.on('GET_ACTIVITY', data => {
    var result = []
    const monday = new Date(data.data.monday);
    var date = 0
    var diff = 0;
    Activity.find({}, function(err, activities) {
      activities.map(item => {
        date = new Date(item.date);
        diff = Math.floor((date - monday) / (1000 * 60 * 60 * 24));
        if (diff < 7 && diff >= 0)
          result.push(item)
      })
      socket.emit('GET_ACTIVITY_RESPONSE', {code: 200, data: result})
    })
  })
}

function endpoints(socket, infos) {
  if (infos.get)
    infos.get(socket)
  else {
    socket.on(`GET_${infos.name}`, data => {
      infos.model.find({}, function(err, documents) {
        socket.emit(`GET_${infos.name}_RESPONSE`, {code: 200, msg: 'succesfull', data: documents});
      })
    })
  }

  if (infos.create)
    infos.create(socket)
  else {
    socket.on(`CREATE_${infos.name}`, data => {
      var document = new infos.model(data);
      document.save((err, document) => {
        if (err)
          socket.emit(`CREATE_${infos.name}_RESPONSE`, {code: 500, error: err});
        else
          socket.emit(`CREATE_${infos.name}_RESPONSE`, {code: 200, data: document});
      })
    })
  }

  socket.on(`EDIT_${infos.name}`, data => {
    console.log(data);
    infos.model.updateOne({_id: data._id}, data, (err, document) => {
      if (err)
        socket.emit(`EDIT_${infos.name}_RESPONSE`, {code: 500, error: err});
      else
        socket.emit(`EDIT_${infos.name}_RESPONSE`, {code: 200, data: data});
    })
  })

  socket.on(`DELETE_${infos.name}`, data => {
    infos.model.deleteOne({_id: data}, (err) => {
      if (err)
        socket.emit(`DELETE_${infos.name}_RESPONSE`, {code: 500, error: err})
      else
        socket.emit(`DELETE_${infos.name}_RESPONSE`, {code: 200})
    })
  })

}

http.listen(port, function() {
    console.log(`server is listening on port ${port}.`)
})
