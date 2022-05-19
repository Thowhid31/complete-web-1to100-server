const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
const port = process.env.PORT || 5000;

//! Warning: Do not Use in Production
app.use(
    cors({origin: "*"})
)

// app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://clean-admin:KlzPKuYVblAdqWnF@cluster0.mugl7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
      await client.connect();
      const servicesCollection = client.db('cleanCo').collection('service');

      app.get('/service', async(req, res)=>{
        const services = await servicesCollection.find({}).toArray();
        res.send(services)
    })
      
    } finally {
      
    }
  }
  run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Hello Server')
})

app.listen(port, ()=>{
    console.log(`Ami Douracchi port ${port}`);
})