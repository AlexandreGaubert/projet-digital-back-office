const axios = require("axios");
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var multer = require('multer')
var fs = require('fs')
var siofu = require("socketio-file-upload");
var session = require("express-session")

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { }
}))

const port = 8080;

app.use(express.static(__dirname + '/uploads'));
app.use(siofu.router)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') //Destination folder
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

//AUTH
app.get('/isAuth', (req, res) => {
  var { isAuth } = req.session;
  var user = req.session.user;
  if (req.session.user) user.password = "*******"

  if (isAuth === true && user) {
    res.send(200, {user})
  }
  else {
    res.send(500, {user: {}})
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  return res.send(200)
})

app.post('/login', (req, res) => {
  const {username, password} = req.body;

  User.findOne({username: username, password: password}, (err, user) => {
    if (user === null) res.send(404, "Mauvais mot de passe")
    else if (user !== null) {
      req.session.user = user;
      req.session.isAuth = true;
      req.session.save();
      res.send(200, user)
    }
  })
})

//MongoDB Models
var News = require("./models/newsModel");
var Activity = require("./models/activityModel");
var Menu = require("./models/menuModel");
var Avis = require("./models/avisModel");
var Gallery = require("./models/galleryModel");
var Resident = require("./models/residentModel");
var User = require("./models/userModel");
var Employee = require("./models/employeeModel");
var SectionDescription = require("./models/sectionDescriptionModel");

var sess = Object();

var endpointsData = [
  {model: News, name: 'NEWS', create: createNews},
  {model: Menu, name: 'MENU'},
  {model: Activity, name: 'ACTIVITY', get: getActivity},
  {model: Avis, name: 'AVIS'},
  {model: Gallery, name: 'GALLERY', edit: editGallery},
  {model: Resident, name: 'RESIDENT'},
  {model: User, name: 'USER', get: getUsers, edit: editUser},
  {model: Employee, name: 'EMPLOYEE', create: createEmployee, edit: editEmployee},
  {model: SectionDescription, name: 'SECTION_DESCRIPTION', edit: editSectionDescription},
]

io.on('connection', function(socket) {
  console.log("connected");

  //file uploader
  var uploader = new siofu();
  uploader.dir = './uploads'
  uploader.listen(socket);

  endpointsData.map(data => {
    endpoints(socket, data)
  })

  socket.on('USER_LOGIN', (data) => {
    User.findOne({username: data.username}, (err, user) => {
      if (user === null)
      socket.emit('USER_LOGIN_RESPONSE', {code: 500, error: "Nom d'utilisateur invalide"})
      else if (user.password !== data.password)
      socket.emit('USER_LOGIN_RESPONSE', {code: 500, error: "Mot de passe invalide"})
      else if (user.password === data.password) {
        socket.handshake.session.user = user;
        socket.handshake.session.save();
        socket.emit('USER_LOGIN_RESPONSE', {code: 200, error: null})
      }
    })

  })

  socket.on('AUTH_RESIDENT', data => {
    console.log(data);
    Resident.findOne({room: data.code}, (err, resident) => {
      if (err != null) socket.emit('AUTH_RESIDENT_RESPONSE', {code: 500, error: err})
      if (resident === null) socket.emit('AUTH_RESIDENT_RESPONSE', {code: 404, error: "not found"})
      else if(resident != null) socket.emit('AUTH_RESIDENT_RESPONSE', {code: 200, resident: resident})

    })
  })

  socket.on('GET_AVIS_OF_RESIDENT', data => {
    console.log(data);
    Avis.find({'resident._id': data.resident._id}, (err, avis) => {
      if (err != null) socket.emit('GET_AVIS_OF_RESIDENT_RESPONSE', {code: 500, error: err})
      if (avis === null) socket.emit('GET_AVIS_OF_RESIDENT_RESPONSE', {code: 404, error: "not found"})
      else if(avis != null) socket.emit('GET_AVIS_OF_RESIDENT_RESPONSE', {code: 200, avis: avis})
    })
  })

  socket.on('GET_MENU_OF_WEEK', data => {
    var curWeekMonday = new Date(data.monday);
    curWeekMonday.setDate(curWeekMonday.getDate() + 7);

    Menu.findOne({from: curWeekMonday.toISOString().slice(0, 10)}, (err, menu) => {
      if (err != null) socket.emit('GET_MENU_OF_WEEK_RESPONSE', {code: 500, error: err})
      if (menu === null) socket.emit('GET_MENU_OF_WEEK_RESPONSE', {code: 404, error: "not found"})
      else if (menu != null) socket.emit('GET_MENU_OF_WEEK_RESPONSE', {code: 200, menu: menu})
    })
  })

})

app.get('/getTarifs', (req, res) => {
  return res.send(200, "fiche")
});

app.post('/create-gallery', upload.array('photo'), (req, res) => {
  var newGallery = new Gallery({name: req.body.name, images: []});

  if (req.files) {
    req.files.forEach(file => {
      newGallery.images.push(file.filename)
    })
  }
  newGallery.save();

  res.redirect('back')
});

app.post('/add-image-to-gallery', upload.array('photo'), (req, res) => {
  Gallery.findOne({_id: req.body._id}, (err, gallery) => {
    if(req.files) {
      req.files.forEach(file => {
        gallery.images.push(file.filename)
      })
    }
    gallery.save();
  })

  res.redirect('back')
});

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

function getUsers(socket) {
  socket.on('GET_USER', data => {
    var result = []

    User.find({}, (err, users) => {
      if (err) console.log(err);
      else {
        result = users.map(user => {
          return {...user._doc, password: null}
        })
        socket.emit('GET_USER_RESPONSE', {code: 200, data: result})
      }
    })
  })
}

function editUser(socket) {
  socket.on('EDIT_USER', data => {
    console.log(data);
    User.findOne({_id: data._id}, (err, user) => {
      if (user != null) {
        if (data.password.length === 0)
          data.password = user.password;
        User.updateOne({_id: data._id}, data, (err, document) => {
          if (err)
            socket.emit(`EDIT_USER_RESPONSE`, {code: 500, error: err});
          else
            socket.emit(`EDIT_USER_RESPONSE`, {code: 200, data: data});
        })
      }
    })

  })
}

function editGallery(socket) {
  socket.on('EDIT_GALLERY', data => {
    Gallery.updateOne({_id: data.update._id}, data.update, (err, document) => {
      if (err)
      socket.emit(`EDIT_GALLERY_RESPONSE`, {code: 500, error: err});
      else {
        data.deletedImages.map(img => {
          fs.unlink(`../pages/LaGallerie/images/${img}`, function(err) {
            if (err)
            console.log(err);
            else
            console.log('file erased !');
          });
        })
        socket.emit(`EDIT_GALLERY_RESPONSE`, {code: 200, data: data.update});
      }
    })
  })
}

function editEmployee(socket) {
  socket.on('EDIT_EMPLOYEE', data => {
    Employee.updateOne({_id: data._id}, data, (err, document) => {
      if (err) {
        socket.emit(`EDIT_EMPLOYEE_RESPONSE`, {code: 500, error: err});
      }
      else {
        socket.emit(`EDIT_EMPLOYEE_RESPONSE`, {code: 200, data: data});
      }
    })
  })
}

function createEmployee(socket) {
  socket.on('CREATE_EMPLOYEE', data => {
    var employee = new Employee(data);
    employee.save((err, document) => {
      if (err) {
        socket.emit(`CREATE_EMPLOYEE_RESPONSE`, {code: 500, error: err});
      }
      else {
        socket.emit(`CREATE_EMPLOYEE_RESPONSE`, {code: 200, data: data});
      }
    })
  })
}

function editSectionDescription(socket) {
  socket.on('EDIT_SECTION_DESCRIPTION', data => {
    SectionDescription.findOne({section: data.section}, (err, document) => {
      // console.log(err, document);

      if (document === null) {
        var nw = new SectionDescription(data);
        nw.save((err, doc) => {
        });
      }
      else {
        SectionDescription.updateOne({section: data.section}, data, (err, document) => {
          console.log(err, document);
          if (err)
          socket.emit(`EDIT_SECTION_DESCRIPTION_RESPONSE`, {code: 500, error: err});
          else {
            socket.emit(`EDIT_SECTION_DESCRIPTION_RESPONSE`, {code: 200, data: data});
          }
        })
      }
    })
  })
}

function createNews(socket) {
  socket.on('CREATE_NEWS', data => {
    var nw = new News(data);

    nw.save((err, saved) => {
      if (err) {
        socket.emit(`CREATE_NEWS_RESPONSE`, {code: 500, error: err})
        return;
      }
      socket.emit(`CREATE_NEWS_RESPONSE`, {code: 200, data: saved});
    })
  })
}

function endpoints(socket, infos) {
  if (infos.get)
  infos.get(socket)
  else {
    socket.on(`GET_${infos.name}`, data => {
      infos.model.find({}, function(err, documents) {
        console.log( documents);
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

  if (infos.edit)
  infos.edit(socket)
  else {
    socket.on(`EDIT_${infos.name}`, data => {
      console.log(data);
      infos.model.updateOne({_id: data._id}, data, (err, document) => {
        if (err)
        socket.emit(`EDIT_${infos.name}_RESPONSE`, {code: 500, error: err});
        else
        socket.emit(`EDIT_${infos.name}_RESPONSE`, {code: 200, data: data});
      })
    })
  }

  socket.on(`DELETE_${infos.name}`, data => {
    infos.model.deleteOne({_id: data}, (err) => {
      if (err)
      socket.emit(`DELETE_${infos.name}_RESPONSE`, {code: 500, error: err})
      else
      socket.emit(`DELETE_${infos.name}_RESPONSE`, {code: 200, deletedID: data})
    })
  })

}

http.listen(port, function() {
  console.log(`server is listening on port ${port}.`)
})
