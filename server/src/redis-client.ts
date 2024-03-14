import Redis from 'ioredis';

const DEFAULT_TIME_TO_LIVE_IN_SEC = 1800;

export class RedisClient {
  private readonly _redisClient: Redis;

  public constructor() {
    this._redisClient = new Redis();
  }

  public async saveData(
    key: string,
    value: string | { [key: string]: unknown },
    timeToLiveInSec = DEFAULT_TIME_TO_LIVE_IN_SEC
  ): Promise<void> {
    if (typeof value === 'object') {
      await this._redisClient.set(key, JSON.stringify(value));
      await this._redisClient.expire(key, timeToLiveInSec);
      return;
    }

    await this._redisClient.set(key, value);
  }

  public async retrieveData<Type>(key: string): Promise<Type | null> {
    const data = await this._redisClient.get(key);

    return data !== null ? (JSON.parse(data) as Type) : data;
  }

  public async deleteKey(key: string): Promise<void> {
    await this._redisClient.del(key);
  }
}
