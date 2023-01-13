import React from 'react';
import { trpc } from '../../utils/trpc';
import Header from '../../components/globals/Header';
import Details from '../../components/Admin/Details';

function VerifiedTeachers() {
  const allVerifiedTeachers = trpc.useQuery(['admin.getall-verified-teachers']);
  if (allVerifiedTeachers.status === 'loading') {
    return <div>Loading...</div>;
  }
  if (allVerifiedTeachers.status === 'error') {
    return <div>{allVerifiedTeachers.error.message}</div>;
  }
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="lg:text-center my-8">
        <h2 className="text-lg font-semibold text-indigo-600">Welcome</h2>
        <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          OPEN SOURCE SELF HOSTABLE COLLEGE MANAGEMENT SYSTEM
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Welcome to the College Management System! We are excited to provide
          you with this platform to streamline and automate various processes
          related to college management.
        </p>
      </div>
      {/* <pre>{JSON.stringify(allVerifiedTeachers.data, null, 2)}</pre> */}
      <div className="md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-10 md:space-y-0">
        {allVerifiedTeachers.data?.map((teacher) => (
          <div
            className="relative p-3 rounded-md cursor-pointer"
            key={teacher.id}
          >
            <Details
              createdAt={teacher.createdAt}
              email={teacher.email}
              id={teacher.id}
              name={teacher.name}
              phone={teacher.phone}
              handleEdit={true}
              disabled={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerifiedTeachers;
