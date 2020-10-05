const express = require('express');
const fs = require("fs");
var dateFormat = require('dateformat');
var computers = require('./computers')

const app = express();
const router = express.Router();

//create function that writes data to server.txt log file
let writeData = (data) => {
  data += "\n" //move to next line
  fs.appendFile('server_log.txt', data, (err) => {
    if (err) throw err;
    console.log('Log Saved!');
  });
}


//Create middleware function
let logger = (req, res, next) => {
  const todays = dateFormat(Date(), "dddd, mmmm dS, yyyy, h:MM:ss TT");
  let method = req.method
  let data  = `[${todays}] - [${method}] - ${req.originalUrl}`
  //Call write function
  writeData(data)
  next() //if this next call is not there it will not move on to the next function
}


//Set the middleware
app.use(logger); //this function will run when any http request is recieved
//app.use([logger1, logger2]) //can pass array of middleware functions
//app.use('/user', logger) //runs onle when url /user is passed

//--Equivalent chunk to app.route().... below
//"/book" represents an "endpoint"
// app.get('/book', (req, res) => {
//   res.send('GET - Get a random book')
// })

// app.post('/book', (req, res) => {
//   res.send('POST - Add a book')
// })

//  app.put('/book', (req, res) => {
//   res.send('PUT - Update the book')
// })

//--Equivalent chunk to app.get, app.post, app.put chunk above

app.route('/book')
.get((req, res) => {
  res.send('GET -Get a random book')
})
.post((req, res) =>{
  res.send('POST - Add a book')
})
.put((req, res) =>{
  res.send('PUT - Update the book')
})

//use the other file that defines a bunch of other endpoints
//this module will be used whenevr the first part of the url is 'book/computer
app.use('/book/computer',computers) //injects whatever was set as exports in the other module

 app.listen(process.env.port || 8081);
 console.log('Web Server is listening at port '+ (process.env.port || 8081));