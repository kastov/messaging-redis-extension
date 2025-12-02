import { Channel } from '@nestjstools/messaging';
import { RedisChannelConfig } from './redis.channel-config';
import { Queue } from 'bullmq';

export class RedisChannel extends Channel<RedisChannelConfig> {
  public readonly config: RedisChannelConfig;
  public readonly queue: Queue;

  constructor(config: RedisChannelConfig) {
    super(config);
    this.queue = new Queue(config.queue, {
      connection: {
        ...this.config.connection.connectionOpts,
        password: this.config.connection.password,
        db: this.config.connection.db,
      },
      prefix: config.keyPrefix,
      defaultJobOptions: {
        removeOnComplete: config.bullJobOptions?.removeOnComplete,
        removeOnFail: config.bullJobOptions?.removeOnFail,
      },
    });
  }
}
