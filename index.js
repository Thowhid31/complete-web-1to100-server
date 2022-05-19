const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res)=>{
    res.send('Hello Server')
})

app.listen(port, ()=>{
    console.log(`Ami Douracchi port ${port}`);
})