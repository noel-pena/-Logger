import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "Forget",
    content: "I always forget everything. Sometimes writing it down helps me remember",
    author: "Noel Pena",
    date: "2023-10-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Random Fact: The Moon",
    content:
    "Only one side of the Moon is visible from Earth because the Moon rotates about its spin axis at the same rate that the Moon orbits the Earth, a situation known as synchronous rotation or tidal locking.",
    author: "Noel Pena",
    date: "2023-11-28T14:30:00Z",
  },
  {
    id: 3,
    title: "Hello",
    content:
    "Hello world, Hello world, hello world!",
    author: "Noel Pena",
    date: "2023-12-1T09:15:00Z",
  },
];

let lastId = 3;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/posts', (req, res) => {
  res.json(posts);
  console.log(posts);
})


app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.post('/posts', (req, res) => {
  const newId = lastId += 1
  const newPost = {
    id: newId,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    date: new Date(),
  }
  lastId = newId
  posts.push(newPost);
  res.status(201).json(newPost);
})

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
  res.sendStatus(200);
});

app.delete('/posts/:id', (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if(index > -1){
    posts.splice(index, 1); 
    res.json({ message: "Deleted."})};
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
