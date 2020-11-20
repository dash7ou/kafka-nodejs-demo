const { Kafka } = require("kafkajs");
const Chance = require("chance");

const chance = new Chance();

// create kafka
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ['localhost:29092', 'localhost:39092', 'localhost:49092']
})

// create producer
const producer = kafka.producer();
const topic = "bar";

const produceMessages = async () => {
  const newAnimalName = chance.animal();
  console.log(newAnimalName);

  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [
        { value: newAnimalName }
      ]
    })
  } catch (err) {
    throw err;
  }
}

const run = async () => {
  try {
    setInterval(produceMessages, 1000)
  } catch (err) {
    console.log(err);
  }
}

run().then(() => {
  console.log("ok")
})


