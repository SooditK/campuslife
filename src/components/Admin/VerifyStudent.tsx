import Details from './Details';
import { trpc } from '../../utils/trpc';
import Header from '../globals/Header';

export default function VerifyStudent() {
  const nonverifiedstudents = trpc.useQuery(['admin.getnon-verified-students']);
  if (nonverifiedstudents.status === 'loading') {
    return <div>Loading...</div>;
  }
  if (nonverifiedstudents.status === 'error') {
    return <div>{nonverifiedstudents.error.message}</div>;
  }
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header />
        <div className="lg:text-center">
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
        <div className="mt-10">
          <div className="md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {nonverifiedstudents.data!.length > 0 &&
              nonverifiedstudents.data?.map((feature) => (
                <div
                  key={feature.name}
                  className="relative p-3 rounded-md cursor-pointer"
                >
                  <Details
                    email={feature.email}
                    id={feature.id}
                    name={feature.name}
                    phone={feature.phone}
                    createdAt={feature.createdAt}
                    fatherName={feature.fatherName}
                    year={feature.year}
                    course={feature.course}
                    motherName={feature.motherName}
                    enrollmentNumber={feature.enrollmentNumber}
                    handleEdit={false}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
