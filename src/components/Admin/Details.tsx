import { Fragment, useState } from 'react';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { BsCheck } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import { Menu, Transition } from '@headlessui/react';
import { MdAlternateEmail } from 'react-icons/md';
import { RiPhoneLine, RiParentLine } from 'react-icons/ri';
import { BiTrashAlt } from 'react-icons/bi';
import { AiOutlineNumber } from 'react-icons/ai';
import { FaChalkboardTeacher, FaUser, FaUserEdit } from 'react-icons/fa';
import { BsCalendar3 } from 'react-icons/bs';
import { trpc } from '../../utils/trpc';
import toast from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs';
import EditModal from '../globals/EditModal';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface IDetailsProps {
  name: string;
  email: string;
  phone: string;
  id: string;
  createdAt: Date;
  fatherName?: string;
  year?: string;
  course?: string;
  enrollmentNumber?: string;
  motherName?: string;
  handleEdit?: boolean;
}

export default function Details({
  email,
  id,
  name,
  phone,
  createdAt,
  fatherName,
  year,
  course,
  motherName,
  enrollmentNumber,
  handleEdit,
}: IDetailsProps) {
  const deleteTeacherMutation = trpc.useMutation(['admin.delete-teacher']);
  const verifyTeacherMutation = trpc.useMutation(['admin.verify-teacher']);
  const deleteStudentMutation = trpc.useMutation(['admin.delete-student']);
  const verifyStudentMutation = trpc.useMutation(['admin.verify-student']);
  const updateStudentMutation = trpc.useMutation(['admin.update-student']);
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentID, setStudentID] = useState('');
  const utils = trpc.useContext();

  async function handleDelete(e: React.SyntheticEvent, id: string) {
    e.preventDefault();
    toast.loading('Deleting...');
    deleteTeacherMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success('Teacher deleted successfully');
          utils.invalidateQueries('admin.getnon-verified-teachers');
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      }
    );
  }

  async function handleVerify(e: React.SyntheticEvent, id: string) {
    e.preventDefault();
    toast.loading('Verifying...');
    verifyTeacherMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success('Teacher verified successfully');
          utils.invalidateQueries('admin.getnon-verified-teachers');
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      }
    );
  }

  async function handleDeleteStudent(e: React.SyntheticEvent, id: string) {
    e.preventDefault();
    toast.loading('Deleting...');
    deleteStudentMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.dismiss();
          utils.invalidateQueries('admin.getnon-verified-students');
          toast.success('Student deleted successfully');
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      }
    );
  }

  async function handleVerifyStudent(e: React.SyntheticEvent, id: string) {
    e.preventDefault();
    toast.loading('Verifying...');
    verifyStudentMutation.mutate(
      { id },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success('Student verified successfully');
          utils.invalidateQueries('admin.getnon-verified-students');
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      }
    );
  }

  async function handleUpdateStudent(e: React.SyntheticEvent, id: string) {
    e.preventDefault();
    console.log('update', id);
  }

  return (
    <>
      <EditModal
        open={showEditModal}
        setOpen={setShowEditModal}
        id={studentID}
      />
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {name}
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MdAlternateEmail
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {email}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <RiPhoneLine
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {phone}
            </div>
            {!fatherName && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MdOutlineAccountCircle
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {String(createdAt).slice(0, 25)}
              </div>
            )}
            {fatherName && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <RiParentLine
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {fatherName}
              </div>
            )}
            {motherName && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <RiParentLine
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {motherName}
              </div>
            )}
            {enrollmentNumber && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <AiOutlineNumber
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {enrollmentNumber}
              </div>
            )}
            {course && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <FaChalkboardTeacher
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {course}
              </div>
            )}
            {year && (
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <BsCalendar3
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {year}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="ml-3 hidden sm:block">
            <button
              type="button"
              onClick={(e) => {
                if (!enrollmentNumber) {
                  handleDelete(e, id);
                } else {
                  handleDeleteStudent(e, id);
                }
              }}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <BiTrashAlt
                className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
              Delete
            </button>
          </span>

          <span className="sm:ml-3">
            <button
              type="button"
              onClick={(e) => {
                if (!enrollmentNumber) {
                  handleVerify(e, id);
                } else {
                  if (handleEdit === false) {
                    handleVerifyStudent(e, id);
                  } else {
                    handleUpdateStudent(e, id);
                    setStudentID(id);
                    setShowEditModal(true);
                  }
                }
              }}
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {handleEdit ? (
                <FaUserEdit className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              ) : (
                <BsCheck className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              )}
              {handleEdit ? 'Edit' : 'Verify'}
            </button>
          </span>

          {/* Dropdown */}
          <Menu as="div" className="relative ml-3 sm:hidden">
            <Menu.Button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              More
              <BiChevronDown
                className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={(e) => {
                        if (!enrollmentNumber) {
                          handleVerify(e, id);
                        } else {
                          handleVerifyStudent(e, id);
                        }
                      }}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Delete
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
}
