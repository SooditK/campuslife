import React, { SyntheticEvent, useState } from 'react';
import Header from '../../components/globals/Header';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-hot-toast';

const Departments = () => {
  const [showModal, setShowModal] = useState(false);
  const [departmentName, setDepartmentName] = useState('');
  const createDepartmentMutation = trpc.useMutation([
    'admin.create-department',
  ]);
  const utils = trpc.useContext();
  const allDepartments = trpc.useQuery(['admin.get-all-departments']);

  async function createDepartment(e: SyntheticEvent) {
    e.preventDefault();
    if (!departmentName) {
      toast.error('Department name is required');
      return;
    }
    toast.loading('Creating department...');
    createDepartmentMutation.mutate(
      {
        name: departmentName,
      },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.dismiss();
            toast.success(data.message);
            utils.invalidateQueries(['admin.get-all-departments']);
            setShowModal(false);
            setDepartmentName('');
          }
        },
        onError: (error) => {
          toast.dismiss();
          toast.error(error.message);
        },
      }
    );
  }

  return (
    <>
      {showModal && (
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
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
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
                  onClick={() => setShowModal(!showModal)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
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
            CAMPUSLIFE
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>
        <div className="mx-auto flex justify-center items-center">
          <button
            onClick={() => setShowModal(!showModal)}
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
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {department.name}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quos accusamus officiis.
                  </p>
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
