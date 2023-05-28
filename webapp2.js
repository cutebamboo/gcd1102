const express = require("express");
const Joi = require("joi");
const app = express();
const fobj= require('fs');
const courses = [
    {id:1, name:'courses1'},
    {id:2, name:'courses2'},
    {id:3, name:'courses3'}
];
const studentFN = "./studentdata.txt";

var students = [];

const router = express.Router();

app.use(express.json());


// '/api/courses'

router.get('/api/courses', (req,res)=>{
    res.status(200).send(courses);

})

/*router.get('/api/courses/:id/:name',(req,res)=>{
    res.status(200).send(req.params);
})*/

router.get('/api/courses/students/load', (req,res)=>{

    try{
        const buf = fobj.readFileSync(studentFN);
        students = JSON.parse(buf);
        res.status(200).send(students);
    }
    catch(err){
        res.status(400).send('Student File does not exists.');
    }
});

router.get('/api/courses/students/newsave', (req,res)=>{
    try{
        fobj.writeFileSync(studentFN,JSON.stringify(students));
        res.status(200).send(`The student data is successfully stored to the file ${studentFN}`);
    }
    catch(err){
        res.status(400).send('Error Ocurred!!!!');
    }

});

router.post('/api/courses/students/append',(req,res) => {
    //validate the student information
    
    const {error} = checkValidation2(req.body);
    if (error) return res.status(400).send('Bad Json input!!!'); 

    const dupstudent = students.find(e => {
        return e.name === req.body.name && e.DayOfBirth == req.body.DayOfBirth
            && e.MonthofBirth == req.body.MonthofBirth && e.YearofBirth == req.body.YearofBirth;
    });

    if (!dupstudent){
        students.push(req.body);
        res.status(200).send('Successfully Input Student' +  req.body+ 
                                'to the Data!!');
    }
    else{
        res.status(400).send('this student alreadry existed :' + dupstudent);
    }
    //console.log(req.body.name);
    /*if (!req.body.name || !req.body.DayOfBirth || 
        !req.body.MonthofBirth || !req.body.YearofBirth){
            return res.status(400).send('Bad Request. There is invalid input!')
        }*/
    
    
    /*var DayOfBirth, MonthofBirth, YearofBirth;
    DayOfBirth = parseInt(req.body.DayOfBirth);
    MonthofBirth = parseInt(req.body.MonthofBirth);
    YearofBirth = parseInt(req.body.YearofBirth);
    
   var myJSONobj = {
        "name": req.body.name,
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
    }*/
})
router.get('/api/courses/:name/:DayOfBirth/:MonthofBirth/:YearofBirth',(req,res)=>{
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

})

function checkValidation2(student){
    const schema = {
        name: Joi.string().min(3).max(30).required(),
        DayOfBirth: Joi.number().integer().min(1).max(31).required(),
        MonthofBirth: Joi.number().integer().min(1).max(12).required(),
        YearofBirth: Joi.number().integer().min(1951).max(2023).required()
    }
    
    const result = Joi.validate(student,schema);
    if (result.error) return result; 
    
    const schema2 = {
        date: Joi.date().required()
    }
    
    const result2 = Joi.validate({"date": Date.parse(`${student.YearofBirth}-${student.MonthofBirth}-${student.DayOfBirth}`)},schema2);
    return result2;
 }

function checkValidation(day,month,year){
    if (year <=1950 || year>=2023){
        return false;
    }
    if (month<1 || month>12){
        return false;
    }
    switch (month){
        case 1,3,5,7,8,10,12: 
        if (day<1 || day>31) {
            return false;
        }
        break;
        case 2:
            if (day<1 || day>29) {
                return false;
            }
            break; 
        default:
            if (day<1 || day>30) {
                return false;
            }
    }
    return true;
}

router.get('/api/courses/students',(req,res)=>{
    res.status(200).send(students);
})
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

app.use('/', router);

const port = process.env.port ||3000;
app.listen(port);
console.log('Web Server is listening at port' + port);

//console.log(`check (30/2/2013) ${checkValidation(30,2,2013)}`);

