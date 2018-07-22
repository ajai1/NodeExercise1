const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const users = [
    {id:1, name:'Ajai'},
    {id:2, name:'Kumar'},
    {id:3, name:'Krishna'}
];

app.get('/', (req, res) => {
    res.send('Hey Ajai');
});

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get('/api/users/:id', (req, res)=>{
  const user = users.find(c => c.id === parseInt(req.params.id));
  if(!user){
      res.status(404).send('User not found');
  }else{
      res.send(user);
  }
});

app.post('/api/users', (req, res) =>{

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result =  Joi.validate(req.body, schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Listening to the port ${port}`);
});