var express = require('express');

var app = express();

//set up handlebars engine
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
    ];


app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname+'/public'));

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/about', (req, res)=>{
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about',{fortune: randomFortune});
});


/*
Note that our custom 404 and 500 pages must be handled slightly differently. Instead
of using app.get, it is using app.use. app.use is the method by which Express adds
middleware. We’ll be covering middleware in more depth in Chapter 10, but for now,
you can think of this as a catch-all handler for anything that didn’t get matched by a
route. This brings us to a very important point: in Express, the order in which routes and
middleware are added is significant. If we put the 404 handler above the routes, the home
page and About page would stop working: instead, those URLs would result in a 404.

*/
//custom 404 page
app.use((req,res)=>{
    res.status(404);
    res.render('404')
});

//custom 500 page
app.use((err, req, res,next)=>{
    console.err(err.stack);
    
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('server started at port 3000');
})