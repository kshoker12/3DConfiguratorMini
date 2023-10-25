const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const server = http.createServer(app);

var data = null;

const io = new Server(server, {
  cors: {
    origins: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

// app.post('/sendData', function(req, res) {
//   console.log('receiving data ...');
//   console.log('body is ',req.body.data);
//   data = req.body.data;
//   res.send(200);
// });

// app.get("/data", (req, res)=>{
//   res.send(data);
//   data = null;
// })

// app.post('/sendData', function(req, res) {
//   console.log('receiving data ...');
//   console.log('body is ',req.body.data);
//   data = req.body.data;
//   io.emit("V3D_DATA", data);
//   console.log("Sent Data")
//   res.send(200);
// });

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("LIC_DATA", (data) => {
    this.data = data;
    console.log(this.data);
    socket.broadcast.emit("V3D_DATA", data);
  });

  socket.on("NULLIFY", (data)=>{
    data = null;
    console.log("Cleared");
  })

  // app.post('/sendData', function(req, res) {
  //   console.log('receiving data ...');
  //   console.log('body is ',req.body.data);
  //   data = req.body.data;
  //   socket.emit("V3D_DATA", data);
  //   console.log("Sent Data")
  //   res.send(200);
  // });
  
  app.get("/data", (req, res)=>{
    res.send(data);
    data = null;
  })

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
});

server.listen(3003, () => {
  console.log("SERVER IS RUNNING");
});