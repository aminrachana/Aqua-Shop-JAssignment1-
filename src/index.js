const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
var path = require('path')

const app = express();
const port = 3000;
const mongo_uri = "mongodb+srv://admin:HZC6eokgqcBx2fik@cluster0.9imk4id.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
}

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "..", "public")));


app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/products", (req, res) => {

  const client = new MongoClient(mongo_uri, connectionParams);

  client.connect()
    .then(client => {
      const db = client.db('aquashop');
      const collection = db.collection('products');
      collection.find({}).toArray()
        .then((view) => {
          console.log(view);
          res.render('products', { view });
        }).catch(() => { res.send('Sorry! Something went wrong.'); });
    });
  // res.render("products");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
