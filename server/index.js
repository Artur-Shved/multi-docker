const keys = require('./keys');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg')
const redis = require('redis');

// EXPRESS APP SETUP
const app = express();
app.use(cors())
app.use(bodyParser.json());



// Postgress Client Setup
const {pg} = keys;
const pgClient = new Pool({
    user: pg.user,
    host: pg.host,
    port: pg.port,
    database: pg.database,
    password: pg.password,
    ssl:
        process.env.NODE_ENV !== 'production'
            ? false
            : { rejectUnauthorized: false },
});

pgClient.on('connect',  (client) => {
    client.query('Create table if not exists values (number INT)').catch((err) => console.error(err));
});

// Redis client setup
const {redis: {host:redisHost, port: redisPort }} = keys;
const redisClient = redis.createClient({
    host: redisHost,
    port: redisPort,
    retry_strategy: () => 1000
})
const redisPublisher = redisClient.duplicate();


// Express route handlers

app.get('/say-hello', (req, res) => {
    console.log('Hello world!!!!')
    res.send('Hello world');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
})


app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    })
})


app.post('/values', async (req, res) => {
    console.log('VALUES ---> ', req.body);
    const index = req.body?.index;

    if(Number(index) > 40) {
        return res.status(422).send('Index too high');
    };


    redisClient.hset('values', index, 'Nothing yet!');
    redisPublisher.publish('insert', index);
    pgClient.query('INSERT INTO values(number) values($1)', [index]);
    console.log('Hello world!!!!');
    res.send({working:true});
})



app.listen(5000, err => {
    console.log('Listening')
})
