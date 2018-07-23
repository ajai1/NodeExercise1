const express = require('express');
const router = express.Router();
const Joi = require('joi');

const users = [
    {id:1, name:'Ajai'},
    {id:2, name:'Kumar'},
    {id:3, name:'Krishna'}
];

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res)=>{
  const user = users.find(c => c.id === parseInt(req.params.id));
  if(!user){
      res.status(404).send('User not found');
  }else{
      res.send(user);
  }
});

router.post('/', (req, res) =>{
    const result =  validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const user = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(user);
    res.send(user);
});

router.put('/:id', (req, res) =>{
    const user = users.find(c => c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('User not found');
    
    const result =  validate(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    user.name = req.body.name;
    res.send(user);
});

router.delete('/:id', (req, res)=>{
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

module.exports = router;