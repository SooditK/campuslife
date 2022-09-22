import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function Student() {
  return (
    <div>
      <h1>Student</h1>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // if the user is already logged in, redirect to the protected page
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
  if (token.role !== 'student') {
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
