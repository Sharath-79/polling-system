
import { Producer as _Producer, Consumer as _Consumer, KafkaClient } from 'kafka-node';

const Producer = _Producer;
const Consumer = _Consumer;
const client = new KafkaClient({ kafkaHost: process.env.KAFKA_BROKER });

const producer = new Producer(client);
const consumer = new Consumer(client, [{ topic: 'votes', partition: 0 }]);

producer.on('ready', () => {
  console.log('Kafka Producer is ready.');
});

producer.on('error', (err) => console.error('Producer error:', err));

consumer.on('message', (message) => {
  console.log('New vote:', message.value);
  // Process the vote and update the database
});

consumer.on('error', (err) => console.error('Consumer error:', err));

export default { producer };
                