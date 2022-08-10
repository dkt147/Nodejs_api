const Joi = require('joi');
const express = require('express');
const {json, response} = require("express");
const app = express();

app.use(express.json());
const courses = [
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"}
];


// app.get();
// app.post();
// app.put();
// app.delete();

//Root Api Caliing...
app.get('/',(req,res) => {
    res.send('get api calling....');
});

//Test Api Calling...
app.get('/api/test',(req,res) => {
    res.send(courses);
});

//Single Data Api Calling...
app.get('/api/test/:id',(req,res) => {
    const record = courses.find(c=>c.id == parseInt(req.params.id));
    if(!record) res.status(404).send('Record not found');
    res.send(record);
});

//Single Data Api Calling...
app.get('/api/posts/:year/:month',(req,res) => {
    res.send(req.query);
});


//post api...
app.post('/api/new/course',(req,res) => {
    // const validation_rules = {
    //     name: Joi.string().min(3).required()
    // }
    // const result = Joi.validate(req.body,validation_rules);


    if(!req.body.name || req.body.name.length < 3){
        const response = {
            status: 400,
            message:"Invalid Data",
            response: {}

        };
        res.status(400).send(response)
        return;
    }

const record = {
    id: req.body.id,
    name:req.body.name
}
courses.push(record);
const response = {
    status: 200,
    message:"Success",
    response:record

};
res.status(200).send(response)
});


//Update Api...
app.put('/api/update/record/:id',(req,res) => {
    const record = courses.find(c=>c.id == parseInt(req.params.id));
    if(!record) res.status(404).send('Record not found');

    if(!req.body.name || req.body.name.length < 3){
        const response = {
            status: 400,
            message:"Invalid Data",
            response: {}

        };
        res.status(400).send(response)
        return;
    }

    record.name = req.body.name;
    res.send(record);
});




//Delete Api...
app.put('/api/delete/record/:id',(req,res) => {
    const record = courses.find(c=>c.id == parseInt(req.params.id));
    if(!record) res.status(404).send('Record not found');

    const index = courses.indexOf(record);
    courses.splice(index,1);

    res.send(record);
});

//To change port number...
// export PORT=5000


//Dynamic Port...
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`listening on port ${port} ...`);
})