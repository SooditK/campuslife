import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { signOut } from 'next-auth/react';
import React from 'react';
import Cards from '../../components/Admin/Cards';

const AdminHome = () => {
  return (
    <div className="flex flex-col">
      <Cards />
      <button
        onClick={() => {
          signOut();
        }}
        className="bg-red-500 hover:bg-red-700 mx-auto text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
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
