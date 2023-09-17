import { Kafka } from "kafkajs";

async function consume() {
	try {
		const kafka = new Kafka({
			clientId: "player-jersey",
			brokers: ["localhost:9092"],
		});

		// This allows you to use the msg variable to receive and work with the value provided as a command-line argument.
		// ie, run node consumer.js hello
		const msg = process.argv[2];

		// create a consumer using kafka variable
		const consumer = kafka.consumer({ groupId: "test-group123" });
		await consumer.connect();
		console.log("consumer connected..");

		// to subscribe to a topic to receive events from that topic
		await consumer.subscribe({
			topic: "my-message",
			fromBeginning: true,
		});

        await consumer.run({
            eachMessage: async ({topic,partition,message})=>{
                console.log(`received message ${message.value.toString()} on partition ${partition}`);
            }
        })

		// dont need to disconnect consumer
	} catch (error) {
		console.error(error);
	}
}

consume();
