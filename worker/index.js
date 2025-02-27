const keys = require("./keys")
const redis = require("redis");


const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const sub = redisClient.duplicate();


function calcFib(index){
    if(index < 2) {
        return 1;
    };

    let prev1 = 1, prev2 = 1, curr;

    for(let i = 2; i <= index; i++) {
        curr = prev1 + prev2;
        prev1 = prev2;
        prev2 = curr;
    }
}


function fib(index){
    if(index < 2) {
        return 1;
    }

    return fib(index-1) + fib(index-2);

}


sub.on('message', (channel, index) => {
    redisClient.hset('values', index, fib(Number(index)))
})

sub.subscribe('insert');
