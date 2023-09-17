// this file is for creating a topic with multiple partitions
import { Kafka } from "kafkajs";

async function createPartition() {
	try {
		const kafka = new Kafka({
			clientId: "message-user",
			brokers: ["localhost:9092"],
		});

		// create an admin using kafka variable
		// we need to have the admin access to create partition
		const admin = kafka.admin();
		await admin.connect();
		console.log("admin connected..");

		// create topic
		await admin.createTopics({
			topics: [
				{
					topic: "my-message",
					numPartitions: 2,
				},
			],
		});
        console.log("2 partitions created");

        // disconnect admin
        await admin.disconnect();

	} catch (error) {
		console.error(error);
	}

}


createPartition();