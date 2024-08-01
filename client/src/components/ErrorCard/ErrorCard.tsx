import React from 'react';

export const ErrorCard: React.FC = () => {
  return (
    <div className="bg-red-500 text-white p-4 rounded-md max-w-sm">
      <h2 className="text-lg font-semibold">Ошибка</h2>

      <p className="mt-2">
        Произошла ошибка во время получения данных. Пожалуйста, попробуйте еще раз позже
      </p>
    </div>
  );
};
