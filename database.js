const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "password",
    database: "wad_hw_node",
    host: "localhost",
    port: "5432"
});

module.exports = pool;