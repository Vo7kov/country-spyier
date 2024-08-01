import React from 'react';

import { UsersList } from '@/components/UsersList';

const Home: React.FC = () => {
  return (
    <div className="bg-slate-900 h-full flex items-center justify-center">
      <UsersList />
    </div>
  );
};

export default Home;
