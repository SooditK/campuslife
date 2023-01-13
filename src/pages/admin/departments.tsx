import React, { SyntheticEvent, useState } from 'react';
import Header from '../../components/globals/Header';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-hot-toast';
import { RiDeleteBin6Line, RiEdit2Line } from 'react-icons/ri';
import { BiShow, BiTrash } from 'react-icons/bi';
import Select from 'react-select';

const Departments = () => {
  const [showTeachersModal, setShowTeachersModal] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
  const [showTeacherCreateModal, setShowTeacherCreateModal] = useState(false);
  const allTeachers = trpc.useQuery(['admin.get-all-non-assigned-teachers']);
  const [showDepartmentCreateModal, setShowDepartmentCreateModal] =
    useState(false);
  const [departmentId, setDepartmentId] = useState('');
  const createDepartmentMutation = trpc.useMutation([
    'admin.create-department',
  ]);
  const assignDepartment = trpc.useMutation([
    'admin.assign-teachers-to-department',
  ]);
  const utils = trpc.useContext();
  const allDepartments = trpc.useQuery(['admin.get-all-departments']);
  const deleteTeacherFromDepartment = trpc.useMutation([
    'admin.remove-teacher-from-department',
  ]);
  const allTeachersforSelectedDepartment = trpc.useQuery([
    'admin.get-all-teachers-by-department',
    {
      departmentId: departmentId,
    },
  ]);

  const options = allTeachers.data?.map((teacher) => ({
    value: teacher.id,
    label: teacher.name,
  }));

  async function deleteTeacherFromDepartmentHandler(
    e: SyntheticEvent,
    teacherId: string
  ) {
    e.preventDefault();
    toast.loading('Deleting teacher from department...');
    deleteTeacherFromDepartment.mutate(
      {
        departmentId,
        teacherId,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.dismiss();
            toast.success(data.message);
            utils.invalidateQueries(['admin.get-all-departments']);
            utils.invalidateQueries(['admin.get-all-teachers-by-department']);
          }
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      }
    );
  }

  async function createDepartment(e: SyntheticEvent) {
    e.preventDefault();
    if (!departmentId) {
      toast.error('Department name is required');
      return;
    }
    toast.loading('Creating department...');
    createDepartmentMutation.mutate(
      {
        name: departmentId,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.dismiss();
            toast.success(data.message);
            utils.invalidateQueries(['admin.get-all-departments']);
            setShowDepartmentCreateModal(false);
            setDepartmentId('');
          }
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      }
    );
  }

  async function assignDepartmentToTeachers(e: SyntheticEvent) {
    e.preventDefault();
    if (!selectedTeachers.length) {
      toast.error('Please select teachers');
      return;
    }
    toast.loading('Assigning teachers to department...');
    assignDepartment.mutate(
      {
        departmentId,
        teacherIds: selectedTeachers,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.dismiss();
            toast.success(data.message);
            utils.invalidateQueries(['admin.get-all-departments']);
            setShowTeachersModal(false);
            setSelectedTeachers([]);
          }
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      }
    );
  }

  console.log(selectedTeachers);

  return (
    <>
      {showDepartmentCreateModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="document"
              aria-labelledby="modal-title"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Create a new department
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Department name"
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={createDepartment}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setShowDepartmentCreateModal(!showDepartmentCreateModal)
                  }
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTeachersModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="document"
              aria-labelledby="modal-title"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Teachers
                    </h3>
                    <div className="mt-2">
                      <ul>
                        {allTeachersforSelectedDepartment.data?.map(
                          (teacher) => (
                            <div
                              className="flex items-center justify-between border-b border-gray-300 py-2 hover:cursor-pointer"
                              key={teacher.id}
                            >
                              <div className="flex items-center justify-between">
                                <li>{teacher.name}</li>
                              </div>
                              <span
                                className="bg-red-100 p-2 rounded-xl hover:bg-red-200"
                                onClick={(e) =>
                                  deleteTeacherFromDepartmentHandler(
                                    e,
                                    teacher.id
                                  )
                                }
                              >
                                <BiTrash className="text-red-500" />
                              </span>
                            </div>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowTeachersModal(!showTeachersModal)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showTeacherCreateModal && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto rounded-lg"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block align-bottom bg-white text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="document"
              aria-labelledby="modal-title"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:mx-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Add Teachers
                  </h3>
                  <div className="mt-2">
                    <Select
                      options={options}
                      onChange={(e) => {
                        setSelectedTeachers(e.map((teacher) => teacher.value));
                      }}
                      isMulti
                      className="z-10"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => {
                    setShowTeacherCreateModal(!showTeacherCreateModal);
                    setSelectedTeachers([]);
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    assignDepartmentToTeachers(e);
                    setShowTeacherCreateModal(!showTeacherCreateModal);
                    setSelectedTeachers([]);
                  }}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        <div className="mx-auto flex justify-center items-center">
          <button
            onClick={() =>
              setShowDepartmentCreateModal(!showDepartmentCreateModal)
            }
            className="flex px-4 py-2 rounded-md text-gray-100 bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span>Create a New Department</span>
          </button>
        </div>
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allDepartments.data?.map((department) => (
              <div
                key={department.id}
                className="bg-white overflow-hidden shadow-md hover:shadow-xl rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {department.name}
                  </h3>
                  <div className="flex justify-start gap-x-4 items-center mt-4">
                    <button
                      onClick={() => {
                        setDepartmentId(department.id);
                        setShowTeachersModal(!showTeachersModal);
                      }}
                      className="flex px-4 py-2 rounded-md text-gray-100 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <BiShow className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => {
                        setDepartmentId(department.id);
                        setShowTeacherCreateModal(!showTeacherCreateModal);
                      }}
                      className="flex px-4 py-2 rounded-md text-gray-100 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <RiEdit2Line className="text-green-600" />
                    </button>
                    <button
                      disabled
                      className="flex px-4 cursor-not-allowed py-2 rounded-md text-gray-100 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <RiDeleteBin6Line className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Departments;
