import { signOut } from 'next-auth/react';
import React from 'react';

const StudentHome = () => {
  return (
    <div>
      <h1>Student Home</h1>
      <button onClick={() => signOut()}>yamate kudasai</button>
    </div>
  );
};

export default StudentHome;
