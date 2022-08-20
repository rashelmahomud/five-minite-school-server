const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// chat 

const server = require("http").createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

// chat 

const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
//Midddle Ware
app.use(cors());
app.use(express.json());


// mogodb connecting 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kw06cbq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

  try {
    await client.connect();
    
    const seviceCollection = client.db("five-minite-school").collection("service");


    //===============service for this code started-========

    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = seviceCollection.find(query);
      const course = await cursor.toArray();
      res.send(course);
    });
 


    io.on("connection", (socket) => {
      console.log('hello socket', socket);
    
      socket.on("chat", (payload) => {
        console.log('hello payload', payload);
        io.emit("chat", payload)
      });
    });
    
   




  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Webb School...");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});