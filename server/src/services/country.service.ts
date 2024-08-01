import { redisClient } from '../client';
import { clientError } from '../zodSchemas';

const HASH_NAME = 'countries';

const getAllContries = async () => {
  return await redisClient.hGetAll(HASH_NAME);
};

const checkCountry = async (countryCode: string, ip: string) => {
  return await getOrSetCache(countryCode, HASH_NAME, ip);
};

const getOrSetCache = async (key: string, field: string, ip: string) => {
  const ipSetKey = `${field}:${key}:ips`;
  const isMember = await redisClient.sIsMember(ipSetKey, ip);

  if (isMember) {
    return 204;
  }

  return await redisClient
    .multi()
    .sAdd(ipSetKey, ip)
    .hIncrBy(field, key, 1)
    .exec()
    .then(() => 204)
    .catch(() => clientError.parse(''));
};

export const countryService = {
  getAllContries,
  checkCountry,
};
