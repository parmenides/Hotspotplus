import amqp, { Options } from 'amqplib';

if (!process.env.RABBITMQ_USERNAME || !process.env.RABBITMQ_PASSWORD) {
  throw new Error('invalid rabbit credentials');
}
let connection: amqp.Connection;
export const getRabbitMqConnection = async () => {
  connection = await amqp.connect(
    `amqp://${process.env.RABBITMQ_USERNAME}:${
      process.env.RABBITMQ_PASSWORD
    }@rabbitmq`,
  );
  connection.on('close',()=>{
      setTimeout(()=>{process.exit(1)},10000);
  })
  return connection;
};

export const getRabbitMqChannel = async () => {
  const amqpConnection = await getRabbitMqConnection();
  return amqpConnection.createConfirmChannel();
};
