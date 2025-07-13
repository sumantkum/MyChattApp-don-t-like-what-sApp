import React, { useState } from 'react';
import ChatApp from './components/ChatApp';
import NameEntry from './components/NameEntry';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <>
      {username ? (
        <ChatApp username={username} />
      ) : (
        <NameEntry onJoin={(name) => setUsername(name)} />
      )}
    </>
  );
};

export default App;
