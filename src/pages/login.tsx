import React from 'react';
import LoginComponent from '../components/globals/Login';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

const Login = () => {
  return <LoginComponent />;
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // if the user is already logged in, redirect to the protected page
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        destination: '/protected',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
