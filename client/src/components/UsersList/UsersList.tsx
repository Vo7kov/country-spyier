'use client';

import React, { useEffect, useState } from 'react';

import { httpClient } from '@/api/client';
import axios from 'axios';

import { ErrorCard } from '@/components/ErrorCard';
import { Loader } from '@/components/Loader';
import { RefreshButton } from '@/components/RefreshButton';

export const UsersList: React.FC = () => {
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getCountries = () => {
    httpClient
      .get('/countries')
      .then(({ data: countries }) => setCountries(countries))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const refresh = () => setUpdatedAt(new Date());

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    axios
      .get('https://ipapi.co/json/')
      .then(({ data: geolocationInfo }) =>
        httpClient
          .post('/countries/update', {
            countryCode: geolocationInfo['country_code'].toLowerCase(),
            ip: geolocationInfo['ip'],
          })
          .catch(() => setIsError(true)),
      )
      .catch(() => setIsError(true));

    getCountries();
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getCountries();
  }, [updatedAt]);

  if (isError) {
    return <ErrorCard />;
  }

  return (
    <div className="w-full px-96 flex flex-col gap-4 items-center">
      <RefreshButton handler={refresh} />

      {(isLoading || !countries) && <Loader />}

      {!isLoading && countries && (
        <table className="w-full">
          <thead className="bg-blue-800">
            <tr>
              <th
                scope="col"
                className="text-center px-6 py-3 text-sm font-medium text-gray-300 uppercase tracking-wider"
              >
                Country
              </th>

              <th
                scope="col"
                className="text-center px-6 py-3 text-sm font-medium text-gray-300 uppercase tracking-wider"
              >
                Count
              </th>
            </tr>
          </thead>

          <tbody className="bg-blue-700 divide-y divide-gray-200">
            {Object.entries(countries).map(([country, count]) => {
              return (
                <tr key={country}>
                  <td className="text-center px-6 py-4 whitespace-nowrap text-xl">{country}</td>
                  <td className="text-center px-6 py-4 whitespace-nowrap text-xl">
                    {count as string}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
