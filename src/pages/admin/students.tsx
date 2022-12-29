import React, { useEffect, useState } from 'react';
import Details from '../../components/Admin/Details';
import Tabbar from '../../components/globals/Tabbar';
import { trpc } from '../../utils/trpc';
import Header from '../../components/globals/Header';

const Tabs = [
  { name: 'BTECH', href: '#', current: true },
  { name: 'MTECH', href: '#', current: false },
  { name: 'MCA', href: '#', current: false },
  { name: 'BCA', href: '#', current: false },
  { name: 'BHMCT', href: '#', current: false },
];

const Year = [
  { name: '1st Year', href: '#', current: true, value: '1' },
  { name: '2nd Year', href: '#', current: false, value: '2' },
  { name: '3rd Year', href: '#', current: false, value: '3' },
  { name: '4th Year', href: '#', current: false, value: '4' },
];

export default function Students() {
  const [tab, setTab] = useState(Tabs);
  const [year, setYear] = useState(Year);
  const [selectedTab, setSelectedTab] = useState(Tabs[0]!.name);
  const [selectedYear, setSelectedYear] = useState(Year[0]!.name);
  const [selectedYearValue, setSelectedYearValue] = useState<
    string | undefined
  >(Year[0]!.value);
  const allVerifiedStudentsByYearCourse = trpc.useQuery([
    'admin.getall-verified-students-by-year-and-course',
    {
      course: selectedTab,
      year: selectedYearValue!,
    },
  ]);
  useEffect(() => {
    const newTabs = Tabs.map((tab) => ({
      ...tab,
      current: tab.name === selectedTab,
    }));
    setTab(newTabs);
  }, [selectedTab]);
  useEffect(() => {
    const newYear = Year.map((year) => ({
      ...year,
      current: year.name === selectedYear,
    }));
    setYear(newYear);
    setSelectedYearValue(newYear.find((year) => year.current)?.value);
  }, [selectedYear]);
  console.log(selectedYearValue);
  if (allVerifiedStudentsByYearCourse.status === 'loading') {
    return <div>Loading...</div>;
  }
  if (allVerifiedStudentsByYearCourse.status === 'error') {
    return <div>{allVerifiedStudentsByYearCourse.error.message}</div>;
  }
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Header />
      <div className="lg:text-center my-8">
        <h2 className="text-lg font-semibold text-indigo-600">Welcome</h2>
        <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
          CAMPUSLIFE
        </p>
        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
          voluptatum cupiditate veritatis in accusamus quisquam.
        </p>
      </div>
      <div className="max-w-2xl mx-auto my-4">
        <Tabbar
          tabs={tab}
          selected={selectedTab}
          setSelected={setSelectedTab}
        />
      </div>
      <div className="max-w-2xl mx-auto my-4">
        <Tabbar
          tabs={year}
          selected={selectedYear}
          setSelected={setSelectedYear}
        />
      </div>
      <div className="md:grid md:grid-cols-1 md:gap-x-8 md:gap-y-10 md:space-y-0">
        {allVerifiedStudentsByYearCourse.data?.map((student) => (
          <div
            className="relative p-3 rounded-md cursor-pointer"
            key={student.id}
          >
            <Details
              createdAt={student.createdAt}
              email={student.email}
              id={student.id}
              name={student.name}
              phone={student.phone}
              course={student.course}
              enrollmentNumber={student.enrollmentNumber}
              fatherName={student.fatherName}
              motherName={student.motherName}
              year={student.year}
              handleEdit={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
