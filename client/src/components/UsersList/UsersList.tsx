'use client';

import React, { useEffect, useState } from 'react';

import { httpClient } from '@/api/client';
import axios from 'axios';

import { ErrorCard } from '@/components/ErrorCard';
import { Loader } from '@/components/Loader';

export const UsersList: React.FC = () => {
  const [countries, setCountries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    axios
      .get('https://ipapi.co/json/')
      .then(({ data: geolocationInfo }) =>
        httpClient
          .post('/countries/update', {
            countryCode: geolocationInfo['country_code'].toLowerCase(),
          })
          .catch(() => setIsError(true)),
      )
      .catch(() => setIsError(true));

    httpClient
      .get('/countries')
      .then(({ data: countries }) => setCountries(countries))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading || !countries) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorCard />;
  }

  return (
    <table>
      <thead className="bg-blue-800">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
          >
            Country
          </th>

          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
          >
            Count
          </th>
        </tr>
      </thead>
      <tbody className="bg-blue-700 divide-y divide-gray-200">
        {Object.entries(countries).map(([country, count]) => {
          return (
            <tr key={country}>
              <td className="px-6 py-4 whitespace-nowrap">{country}</td>
              <td className="px-6 py-4 whitespace-nowrap">{count as string}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
