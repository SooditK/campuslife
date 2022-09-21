import { GetServerSideProps } from 'next';
import React from 'react';
import SignUpComponent from '../components/globals/Signup';

const SignUp = () => {
  return <SignUpComponent />;
};

export default SignUp;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // if the user is already logged in, redirect to the protected page
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
