const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const cors = require('cors');
const res = require('express/lib/response');
const port = process.env.PORT || 5000;

//! Warning: Do not Use in Production
app.use(
  cors({ origin: "*" })
)

// app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://clean-admin:KlzPKuYVblAdqWnF@cluster0.mugl7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const servicesCollection = client.db('cleanCo').collection('service');

    app.get('/get-service', async (req, res) => {
      const services = await servicesCollection.find({}).toArray();
      res.send(services)
    });

    app.post('/add-service', async(req, res)=>{
      const data = req.body;
      const result  = await servicesCollection.insertOne(data);
      res.send(result);
    }) 

    app.put('/update-server/:id', async(req, res)=> {
      const {id} = req.params;
      const data = req.body;
      const filter = {_id: ObjectId(id)}
      const updateDoc = {$set: data};
      const option = {upsert: true}

      const result = await servicesCollection.updateOne(filter, updateDoc, option);

      res.send(result);
    })

    app.delete('/delete-server/:id', async(req, res)=> {
      const {id} = req.params;
      
      const query = {_id: ObjectId(id)}
     

      const result = await servicesCollection.deleteOne(query);

      res.send(result);
    })

  } finally {

  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Server')
});


//body
app.get('/dummy-route/user2', (req, res)=>{
  const data = req.body;
  res.json(data)
})


//params
app.get('/dummy-route/user/:id', (req, res) => {
  const {id} = req.params;
  console.log(id);
    res.json(id)
});

//query
app.get('/dummy-route/user', (req, res) => {
  const data = req.query;

  res.json(data)
})

app.listen(port, () => {
  console.log(`Ami Douracchi port ${port}`);
})