import {
  HiOutlineLightningBolt,
  HiOutlineGlobeAlt,
  HiScale,
} from 'react-icons/hi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { BiBookReader } from 'react-icons/bi';
import { useRouter } from 'next/router';

const features = [
  {
    name: 'Students',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: HiOutlineGlobeAlt,
    link: '/admin/students',
  },
  {
    name: 'Teachers',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: HiScale,
    link: '/admin/teachers',
  },
  {
    name: 'Placements',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: HiOutlineLightningBolt,
    link: '/admin/placements',
  },
  {
    name: 'Departments',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: BsChatDots,
    link: '/admin/departments',
  },
  {
    name: 'Verify Teachers',
    description: 'Verify Teachers',
    color: 'red',
    icon: FaChalkboardTeacher,
    link: '/admin/verify-teachers',
  },
  {
    name: 'Verify Students',
    description: 'Verify Students',
    color: 'red',
    icon: BiBookReader,
    link: '/admin/verify-students',
  },
];

export default function Cards() {
  const router = useRouter();
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-lg font-semibold text-indigo-600">Welcome</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            CAMPUSLIFE
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <div className="md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10 md:space-y-0">
            {features.map((feature) => (
              <div
                key={feature.name}
                onClick={() => router.push(feature.link)}
                className="relative hover:shadow-xl p-3 rounded-md cursor-pointer"
              >
                <div className="inset-0 flex gap-x-4">
                  <div
                    className={`${
                      feature.color
                        ? `bg-${feature.color}-500`
                        : 'bg-indigo-500'
                    } h-12 w-12 rounded-md text-white flex items-center justify-center`}
                  >
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="relative justify-center flex items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {feature.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
