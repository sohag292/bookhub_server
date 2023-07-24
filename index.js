const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 2000;

// middleware
const corsOptions ={
    origin:'*', 
    credentials:true,    
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.koeqpiv.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
      

        const admissioninfoCollection = client.db("BookedHub").collection("admissioninfo");
        const admissoninfoDetail = client.db("BookedHub").collection("admissioninfoDetails");



        app.get('/admissioninfo', async (req, res) => {
            const result = await admissioninfoCollection.find().toArray();
            res.send(result)
        })

       

        app.get('/admissonDetail/:id', async(req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {_id: new ObjectId(id)}
            const user = await admissoninfoDetail.findOne(query)
            res.send(user)
            
        })


        

      




        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('BookHub server is running')
})

app.listen(port, () => {
    console.log(`BookHub server is running on port ${port}`)
})
