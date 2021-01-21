
// const express = require('express')
// const http = require('http')
// const socketIo = require('socket.io')
// const cors = require('cors')
// const port = process.env.PORT || 4000

// const index = require('./routes/index')

// const app = express()

// app.use(index)
// app.use(cors())
// const server = http.createServer(app)

// const io = socketIo(server);

// const getApiAndEmit = (socket) => {
//   const response = new Date()
//   socket.emit('FromAPI', response)
// }

// let interval;

// io.on('connection', (socket)=>{
//   console.log('new client connected');
//   if (interval){
//     clearInterval(interval)
//   }
//   interval = setInterval(getApiAndEmit(socket),1000)
//   socket.on('disconnect',  ()=>{
//     console.log('client disconnected');
//     clearInterval(interval)
//   })
// })


// server.listen(port,()=>{
//   console.log(`listening on ${port}`);
// })

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4000;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
server.listen(4000, () => console.log(`Listening on port 4000`));

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};
