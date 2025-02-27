module.exports = {
    redis: {
        host:process.env.REDIS_HOST,
        port:process.env.REDIS_PORT,
    },
    pg: {
        user: process.env.PG_USER,
        host: process.env.PG_HOST,
        port: process.env.PG_PORT,
        database: process.env.PG_DATABASE,
        password: process.env.PG_PASSWORD
    }
}
