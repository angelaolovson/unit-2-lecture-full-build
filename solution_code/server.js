// Dependencies
const express = require('express');
const morgan = require('morgan'); 
const methodOverride = require('method-override');
const app = express();
require('dotenv').config();

/////////////////////////////////////////////////////
// Middleware req => Middleware => res
// Need to be in the right order
/////////////////////////////////////////////////////
app.use(morgan("tiny")) //logging - just use in the development, so I'll see that in the terminal - successful(code 200) vs failure(400)
// npm i morgan or npm i --save-dev  morgan for devDenpendencies: for development porpuse only, not a requirement for the function
app.use(methodOverride("_method")) // override for put and delete requests from forms
app.use(express.urlencoded({extended: true})) // parse urlencoded request bodies
app.use(express.static("public")) // serve files from public statically

app.get('/', (req, res) => {
    res.send('default route')
})

const fruitsController = require('./controllers/fruits');
app.use('/fruits', fruitsController);

// Listener
app.listen(process.env.PORT, () =>
	console.log(`express is listening on port: ${process.env.PORT}`)
);