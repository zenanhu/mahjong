// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import React, { useEffect, useState } from 'react';
import { User } from '@libs/shared/models';
import { formatDate } from '@libs/shared/utils';
import { getUser } from '../apis/user';

export function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;
    getUser('some-id')
      .then(u => { if (mounted) setUser(u); })
      .catch(console.error);
    return () => { mounted = false; };
  }, []);

  console.log('Formatted Date:', formatDate(new Date()));

  return (
    <div>
      {"hello!"}
      {user?.username ?? 'no user'}
    </div>
  );
}

export default App;
