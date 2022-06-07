const express = require('express');

const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6zcbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const itemsCollection = client.db('my-blog').collection('blogs');

        // blog

        app.get('/blog', async (req, res) => {
            const query = {};
            const cursor = itemsCollection.find(query);
            const blogs = await cursor.toArray();
            res.send(blogs);
        });

        // add new blog

        app.post('/blog', async (req, res) => {
            const newItem = req.body;
            const result = await itemsCollection.insertOne(newItem);
            res.send(result);
        });

    }
    finally {
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("server running");
});

app.listen(port, () => {
    console.log("Listining to port");
})