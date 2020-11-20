const { Kafka } = require("kafkajs");

// create kafka
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ['localhost:9092', 'localhost:9093', 'localhost:9094']
})

// create producer
const producer = kafka.producer()

const run = async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: "test-topic",
      message: [
        { value: "Hello Kafka :)" }
      ]
    })
  } catch (err) {
    console.log(err);
  }
}