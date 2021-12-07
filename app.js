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
    try {
        const posts = await pool.query(
            "SELECT * FROM posts"
        );
        res.render('posts', { posts: posts.rows });
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/posts', async(req, res) => {
    try {
        const post = req.body;
        await pool.query(
            "INSERT INTO posts(title, body) values ($1, $2)", [post.title, post.body]
        );
        res.redirect('posts');
    } catch (err) {
        console.error(err.message)
    }
});

app.get('/posts/:id', async(req, res) => {
    try {
        const id = req.params;
        const post = await pool.query(
            "SELECT * FROM posts WHERE id = $1", [id]
        );
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.delete('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "DELETE FROM posts WHERE id = $1", [id]
        );
        res.redirect('posts');
        console.log("delete a post request has arrived!");

    } catch (err) {
        console.error(err.message);
    }
});

app.get('/singlepost/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const posts = await pool.query(
            "SELECT * FROM posts WHERE id = $1", [id]
        );
        res.render('singlepost', { posts: posts.rows[0] });
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/addnewpost', (req, res) => {
    res.render('addnewpost');
});

app.use((req, res) => {
    res.status(404).render('404');
});