const express = require ('express');
const bodyparser = require ('body-parser');

const app = express();

const port = process.env.port || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get(`/`, (req, res)=>{
    res.status(200);
    res.render('./main/index.ejs');
})

app.get(`/fnv`, (req, res)=>{
    res.status(200);
    res.render('./map/index.ejs');
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}..`);
    console.log(`Go to app: localhost:${port}`);
})