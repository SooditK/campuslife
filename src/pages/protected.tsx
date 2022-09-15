import React from 'react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

const Protected = () => {
  return (
    <div>
      <h1>Protected</h1>
    </div>
  );
};

export default Protected;

// getserversideprops

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  console.log(session);
  return {
    props: {
      session: JSON.stringify(session),
    },
  };
};
