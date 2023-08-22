const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key8552684', 
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //     secure: true,
    //     httpOnly: true,
    //     maxAge: 1000 * 60 * 60 * 24 * 7 
    // }
}));
const router = require("./router/user");
const port = process.env.port || 3000;
const path = require("path");

require("./db/mongodbConnection");
const staticPath = path.join(__dirname, "./public");
app.set("view engine", "hbs")
app.use(express.static(staticPath))
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(router)

router.get("/", (req, res)=> {
    res.render("home")
})

app.get('/login', (req, res) => {
    res.render('login'); 
});

app.get('/registration', (req, res) => {
    res.render('registration'); 
});

app.get('/user-details-update', (req, res) => {
    let { userName, firstName, lastName, email } = req.session;
    res.render('user-details-update', { userName, firstName, lastName, email }); 
});

app.get('/user-details', (req, res) => {
    let { userName, firstName, lastName, email } = req.session;
    res.render('user-details', { userName, firstName, lastName, email }); 
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        return res.render('home');
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})