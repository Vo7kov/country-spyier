import React from 'react';

type Props = {
  handler: React.MouseEventHandler<HTMLButtonElement>;
};

export const RefreshButton: React.FC<Props> = ({ handler }) => {
  return (
    <button
      onClick={handler}
      type="button"
      className="block bg-sky-600 w-full px-2 py-3"
    >
      Refresh
    </button>
  );
};
