const express = require('express');
const app = express();

const users = [
    {id:1, name:'Ajai'},
    {id:2, name:'Kumar'},
    {id:3, name:'Krishna'}
];

app.get('/', (req, res) => {
    res.send('Hey Ajai');
});

app.get('/api/firstpage', (req, res) => {
    res.send('First Page Response');
});

app.get('/api/users/:id', (req, res)=>{
  const user = users.find(c => c.id === parseInt(req.params.id));
  if(!user){
      res.status(404).send('User not found');
  }else{
      res.send(user);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Listening to the port ${port}`);
});