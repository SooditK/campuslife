import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';
import React from 'react';

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Home</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default AdminHome;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = await getToken({ req, secret: process.env.SECRET });
  console.log(token);
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  if (token.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
