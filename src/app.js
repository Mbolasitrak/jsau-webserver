const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const userRouter = require('./routes/route')

let nunjucks = require('nunjucks'); // templating framework
const port = 4000;

app.set("view engine", "html")
app.use(bodyParser.json());
nunjucks.configure([__dirname +'/views'], {   // setting a default views folder for templates
    autoescape: false,
    express: app
})

// tp-async-callback
app.use("/enquete", userRouter);

app.listen(port, () => {
  console.log("started on http://localhost:"+port);
});
