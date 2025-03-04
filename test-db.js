const { Client } = require('pg');

const client = new Client({
    host: "yamanote.proxy.rlwy.net",
    port: 49168,
    user: "postgres",
    password: "cmVYiYqWujZYpMkbQRMspxSDlVNLxwKr",
    database: "railway"
});

async function testConnection() {
    try {
        await client.connect();
        console.log("Conexión exitosa a PostgreSQL en Railway");
        const res = await client.query("SELECT NOW()");
        console.log("Hora en PostgreSQL:", res.rows[0]);
    } catch (err) {
        console.error("Error conectando a la BD:", err);
    } finally {
        await client.end();
    }
}

testConnection();
