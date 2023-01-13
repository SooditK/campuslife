import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiLock } from 'react-icons/bi';
import {
  validatePassword,
  isValidEmail,
} from '../../../utils/validatePassword';
import { trpc } from '../../utils/trpc';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Teacher = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
    phoneNumber: '',
  });
  const mutate = trpc.useMutation(['auth.registerfaculty']);
  async function handleMutate(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!validatePassword(data.password) || !isValidEmail(data.email)) {
      toast.error('Invalid Password or Email');
      return;
    } else {
      if (!data.phoneNumber || !data.name || !data.email || !data.password) {
        toast.error('Please fill all the fields');
        return;
      }
      toast.loading('Registering...');
      mutate.mutate(
        {
          email: data.email,
          password: data.password,
          name: data.name,
          phone: data.phoneNumber,
        },
        {
          onSuccess: () => {
            toast.dismiss();
            toast.success('Registered Successfully');
            setTimeout(() => {
              router.push('/login');
            }, 500);
          },
          onError(error, variables, context) {
            toast.dismiss();
            toast.error(error.message);
          },
        }
      );
    }
  }
  return (
    <>
      <div className="flex min-h-[100vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            {/* <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create a new Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link href="/login">
                <span className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
                  Login
                </span>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm">
              <div className="mb-2">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  value={data.phoneNumber}
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleMutate}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <BiLock
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Teacher;
