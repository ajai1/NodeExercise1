const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

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
    const result =  validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});


app.put('/api/users/:id', (req, res) =>{
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    
    const result =  validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    user.name = req.body.name;
    res.send(user);
});


app.delete('/api/users/:id', (req, res)=>{
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    const index = users.indexOf(user);
    users.splice(index,1);
    res.send(user);
});



function validate(userRequest){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(userRequest, schema);
}




const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Listening to the port ${port}`);
});