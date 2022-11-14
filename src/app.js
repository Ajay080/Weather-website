const path=require('path')
const express= require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast.js')
// const { hslToRgb } = require('@material-ui/core')
//basic express server
// with the help of it we can render HTML, JSON, asset from a directory on our machine

console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname,'../public'))


const app = express()
const port= process.env.PORT || 3000

//define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const PartialPath=path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location

// app.set (setting name , setting value) this give what template we have intalled
app.set('view engine','hbs')// now we have setup handle bars . now we can design template 
app.set('views',viewsPath)
hbs.registerPartials(PartialPath)// handle bars module needs

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        //all the value, that your view want to access
        title:'Weather App',
        name:'Ajay Singh'
    }) // it will render the handle bars template, or dynamic html
    //argument1: name of the particular view we want to use
})
app.get('/about',(req,res)=>{
    res.render('about',{
        //all the value, that your view want to access
        title:'About Me',
        name:'Ajay Singh'
    }) // it will render the handle bars template, or dynamic html
    //argument1: name of the particular view we want to use
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query)
    //console.log(req.query.search)
    res.send({
            product:[]
        })
})

app.get('/weather',(req,res)=>{
    if(!req.query.latitude || !req.query.longitude ){
        return res.send({
            error: "Add address propertu onto JSON which returns the provided address"
        })
    }
    var para1=JSON.stringify(req.query.latitude)
    var para2=JSON.stringify(req.query.longitude)
    forecast(para1, para2,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: 'The temperature is '+forecastData.current.temperature+" but it feels like "+forecastData.current.feelslike,
            lat:para1,
            lon:para2,
            location:forecastData.location.name+", "+forecastData.location.region+", "+forecastData.location.country
        })
    })
    
})
app.get('/help',(req,res)=>{
    res.render('help',{
        //all the value, that your view want to access
        Help:'I am here, How can I help you sir',
        title:'Help',
        name:'Ajay Singh'
    }) // it will render the handle bars template, or dynamic html
    //argument1: name of the particular view we want to use
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ajay Singh',
        errorMessage:'Help Article not found',
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Ajay Singh',
        errorMessage:"Page does not exist"
    })
})

//app.com    // that is root route
//app.com/help // partial route is /help
//app.com/about // partial route is /about

// app.get() // this tell the server what to do when someone try to get resource st a specific url
// may be we should be sending back html or we should be sending back html
/*
app.get(parameter 1, parameter 2)
parameter 1 is the partial url
parameter 2 takes in function if someone visit url and decide what to send back to them
*/

/*
app.get('',(req,res)=>{
    res.send('<h1> Weather </h1>') // it will display when someone request dfrom the browser
})
app.get('/help',(req,res)=>{
    // res.send({   // we are sending the JSON object , it will show stringify and parsed json
    //     name: 'Andrew',
    //     age: 22
    // })
    // this JSON can be the object or array of objects
    res.send(
        [   // we are sending the JSON object , it will show stringify and parsed json
        {name: 'Andrew'},
        {age: 22}
        ]
    )
})
app.get('/about',(req, res)=>{
    res.send('You are inside of about page')
})
app.get('/weather',(req,res)=>{
    res.send('You are inside of weather page')
})
*/

//start the server up
app.listen(port,()=>{
    console.log('Server is up on port '+port) // it not going to shpw on the user, it for checking it is running or not
})

/*
the process of starting a server is an asynchronous process
second argument is an option call back functio which run on the starting of the server
app.listen only run one time as it runs on a specific port here it is port 3000
*/ 

