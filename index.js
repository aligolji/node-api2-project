const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();
server.use(express.json());

server.use('/api/posts', postsRouter);


server.get('/', (req, res) => {
    res.status(200).json({ Hello: `Server is up API 2!` });
});


const port = 5000;
server.listen(port, () => console.log(`Server listening on ${port}`));
