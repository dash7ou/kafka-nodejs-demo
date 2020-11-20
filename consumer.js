const { Kafka } = require("kafkajs");


// create kafka
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ['localhost:29092', 'localhost:39092', 'localhost:49092'],

})

// create consumer
const consumer = kafka.consumer({ groupId: "consumer-group" });

const run = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "bar", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString()
        })
      }
    })
  } catch (err) {
    console.log(err);
  }
}

run().then(() => {
  console.log("ok")
})


