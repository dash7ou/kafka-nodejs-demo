const { Kafka } = require("kafkajs");

// create kafka
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ['localhost:29092', 'localhost:39092', 'localhost:49092']
})

// create producer
const producer = kafka.producer()

const run = async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: "bar",
      messages: [
        { value: "Hello Kafka :)" }
      ]
    })
  } catch (err) {
    console.log(err);
  }
}

run().then(() => {
  console.log("ok")
})


