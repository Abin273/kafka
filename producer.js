import { Kafka } from "kafkajs";

async function produce() {
	try {
		const kafka = new Kafka({
			clientId: "player-jersey",
			brokers: ["localhost:9092"],
		});

		// This allows you to use the msg variable to receive and work with the value provided as a command-line argument.
		// ie, run node producer.js hello
		const msg = process.argv[2];

		// create a producer using kafka variable
		const producer = kafka.producer();
		await producer.connect();
		console.log("producer connected..");

		// 'A-M','a-m' is in partition 0 and 'N-Z','n-z' is in partition 1
		const partition = msg[0] < "n" ? 0 : 1;

		// producer can send a record which is an object
		const producedData = await producer.send({
			topic: "my-message",
			messages: [
				{
					value: msg,
					partition: partition,
				},
			],
		});

		console.log(`produced data: ${JSON.stringify(producedData)}`);

		// disconnect producer
		await producer.disconnect();
	} catch (error) {
		console.error(error);
	}
}

produce();
