const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hey Ajai');
});

app.get('/api/firstpage', (req, res) => {
    res.send('First Page Response');
});

app.get('/api/new/:id/:name', (req, res)=>{
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log(`Listening to the port ${port}`);
});