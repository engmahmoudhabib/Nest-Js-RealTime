import { Transport } from '@nestjs/microservices';

const RMQConfig = {
  transport: Transport.RMQ,

  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'users_queue',
    queueOptions: {
      durable: false,
    },
  },
};

export default RMQConfig;
