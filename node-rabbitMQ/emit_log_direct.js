import * as amqp from 'amqplib'
const url = `amqp://localhost`;


(async function publish(){
    const exchange = 'direct_logs';
    const msg = 'hello world';
    const routingKeys = ['info','error','warning'];
    // 1. 创建链接
    const connect = await amqp.connect('amqp://admin:admin@localhost:5672', {
        authMechanism: 'PLAIN'
      });
    // 2. 创建channel
    const channel = await connect.createChannel();
    // 3. 创建 or 连上 交换机
    // 3. 1 直接方式
    await channel.assertExchange(exchange,'direct',{durable:false})
    let i = 0;
    while(i<1){
        const index = random(3)
        channel.publish(exchange,routingKeys[index],Buffer.from(msg))
        console.log(`[x] Sent ${msg}--'index:',${index}, ${routingKeys[index]}`);
        i++;
    }
    await sleep(1);
    await connect.close();
    process.exit(0);
})()

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time*1000));
}

function random(max){
    return Math.floor(Math.random() * Math.floor(max));
}
