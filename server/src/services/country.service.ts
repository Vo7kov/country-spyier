import { redisClient } from '../client';
import { clientError } from '../zodSchemas';

const HASH_NAME = 'countries';

const getAllContries = async () => {
  return await redisClient.hGetAll(HASH_NAME);
};

const getOrSetCache = async (key: string, field: string) => {
  return await redisClient
    .hIncrBy(field, key, 1)
    .then(() => 204)
    .catch(() => clientError.parse(''));
};

const checkCountry = async (countryCode: string) => {
  return await getOrSetCache(countryCode, HASH_NAME);
};

export const countryService = {
  getAllContries,
  checkCountry,
};
