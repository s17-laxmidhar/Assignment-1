const express = require("express");
const app = express();
const router = require("./router/employee");
const port = process.env.port || 3000;
const path = require("path");

require("./db/mongodbConnection");
// const staticPath = path.join(__dirname, "./public");
app.set("view engine", "hbs")
// app.use(express.static(staticPath))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(router)

router.get("/", (req, res)=> {
    res.render("index")
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})