const express = require('express');
const pool = require('./database');
const cors = require('cors');

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.listen(3000);

app.get('/posts', async(req, res) => {
    console.log("GET /posts");
    pool.query("SELECT * FROM posts ORDER BY id DESC", (err, posts) => {
        if (err) throw err;
        res.render('posts', { posts: posts.rows });
    });
});

app.post('/posts', async(req, res) => {
    console.log("POST /posts");
    const post = req.body;
    pool.query(
        "INSERT INTO posts(title, body) values ($1, $2)", [post.title, post.body], (err) => {
            if (err) throw err;
            res.redirect('posts');
        }
    );
});

app.get('/posts/:id', async(req, res) => {
    console.log("GET /posts/:id");
    pool.query("SELECT * FROM posts WHERE id = $1", [req.params.id], (err, post) => {
        if (err) throw err;
        res.json(post.rows[0]);
    });
});

app.put('/posts/:id', async(req, res) => {
    console.log("PUT /posts/:id");
    pool.query("UPDATE posts SET likes = likes+$2 WHERE id=$1", [req.params.id, req.body.likes], (err, post) => {
        if (err) throw err;
        res.end(JSON.stringify(post));
    });

});

app.delete('/posts/:id', async(req, res) => {
    console.log("DELETE /posts/:id");
    pool.query("DELETE FROM posts WHERE id=$1", [req.params.id], (err) => {
        if (err) throw err;
        res.end("Post was deleted!")
    });
});

app.get('/singlepost/:id', async(req, res) => {
    console.log("GET /singlepost/:id");
    pool.query(
        "SELECT * FROM posts WHERE id = $1", [req.params.id], (err, post) => {
            if (err) throw err;
            res.render('singlepost', { posts: post.rows[0] });
        }
    );
});

app.get('/addnewpost', (req, res) => {
    console.log("GET /addnewpost");
    res.render('addnewpost');
});

app.use((req, res) => {
    res.status(404).render('404');
});