const express = require("express");
const stuMD = require('./studentMD.js');
const Joi = require("joi");
const app = express();
//const stuRouter = require("./studentMD.js");

const sR = stuMD.stuRouter;
const courses = [
    {id:1, name:'courses1'},
    {id:2, name:'courses2'},
    {id:3, name:'courses3'}
];


var students = [];

const router = require('express').Router();

app.use(express.json());


// '/api/courses'

router.get('/api/courses', (req,res)=>{
    res.status(200).send(courses);

})

/*router.get('/api/courses/:id/:name',(req,res)=>{
    res.status(200).send(req.params);
})*/



/*router.get('/api/courses/:name/:DayOfBirth/:MonthofBirth/:YearofBirth',(req,res)=>{
    //res.status(200).send(req.params);
    //students.push(req.params);
    //console.log(students);
    var DayOfBirth, MonthofBirth, YearofBirth;
    DayOfBirth = parseInt(req.params.DayOfBirth);
    MonthofBirth = parseInt(req.params.MonthofBirth);
    YearofBirth = parseInt(req.params.YearofBirth);
    
   var myJSONobj = {
        "name": req.params.name,
        "DayOfBirth": DayOfBirth,
        "MonthofBirth": MonthofBirth,
        "YearofBirth": YearofBirth
   }
   if (!checkValidation(DayOfBirth,MonthofBirth,YearofBirth)){
        res.send(`Birthday of input student ${DayOfBirth}/${MonthofBirth}/${YearofBirth} is not valid. Please input again`);
    }
    else{

        // check if duplication
        const dupstudent = students.find(e => {
            return e.name === myJSONobj.name && e.DayOfBirth == myJSONobj.DayOfBirth
                && e.MonthofBirth == myJSONobj.MonthofBirth && e.YearofBirth == myJSONobj.YearofBirth;
        });

        if (!dupstudent){
            students.push(myJSONobj);
            res.status(200).send(`Successfully Input Student ${DayOfBirth}/${MonthofBirth}/${YearofBirth} to the Data!!!`);
        }
        else{
            res.status(400).send(`this student alreadry existed : ${dupstudent}`);
        }
    }

})*/




router.get('/home', (req,res) => { 
    res.set('Content-Type','text/html');
    res.status(200).send('<h1> This is Home page. This is home router</h1>');
});

router.get('/about', (req,res) => { 
    res.set('Content-Type','text/html');
    res.status(200).send('<h1> This is About page. This is About router </h1>');
});

router.get('/literature', (req,res) => { 
    res.set('Content-Type','text/plain');
    const fcontent = fobj.readFileSync('./alice.txt');
    res.status(200).send(fcontent.toString());
}); 

app.use('/api/courses/students',stuMD);

app.use('/', router);

const port = process.env.port ||3000;
app.listen(port);
console.log('Web Server is listening at port' + port);

//console.log(`check (30/2/2013) ${checkValidation(30,2,2013)}`);

