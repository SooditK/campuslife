import {
  Dispatch,
  Fragment,
  SetStateAction,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BsExclamationCircle } from 'react-icons/bs';
import { trpc } from '../../utils/trpc';
import { toast } from 'react-hot-toast';

type EditModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
};

export default function EditModal({ open, setOpen, id }: EditModalProps) {
  const cancelButtonRef = useRef(null);
  const updateStudentMutation = trpc.useMutation(['admin.update-student']);
  const { refetch } = trpc.useQuery(['admin.getnon-verified-students']);
  const utils = trpc.useContext();
  const student = trpc.useQuery([
    'admin.getstudentbyid',
    {
      id,
    },
  ]);
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    phone: '',
    fatherName: '',
    motherName: '',
    enrollmentNumber: '',
    year: '',
    password: '',
  });
  if (student.status === 'loading') {
    return <div>Loading...</div>;
  }
  if (student.status === 'error') {
    return <div>{student.error.message}</div>;
  }

  async function handleUpdateStudent(e: SyntheticEvent) {
    e.preventDefault();
    if (studentData.password === '') {
      toast.error('Password is required');
      return;
    }
    toast.loading('Loading...');
    updateStudentMutation.mutate(
      {
        id,
        name:
          (studentData.name !== '' ? studentData.name : student.data?.name) ||
          '',
        email:
          (studentData.email !== ''
            ? studentData.email
            : student.data?.email) || '',
        phone:
          (studentData.phone !== ''
            ? studentData.phone
            : student.data?.phone) || '',
        fatherName:
          (studentData.fatherName !== ''
            ? studentData.fatherName
            : student.data?.fatherName) || '',
        motherName:
          (studentData.motherName !== ''
            ? studentData.motherName
            : student.data?.motherName) || '',
        enrollmentNumber:
          (studentData.enrollmentNumber !== ''
            ? studentData.enrollmentNumber
            : student.data?.enrollmentNumber) || '',
        year:
          (studentData.year !== '' ? studentData.year : student.data?.year) ||
          '',
        password: studentData.password,
        course: student.data?.course || '',
      },
      {
        onSuccess: () => {
          toast.dismiss();
          toast.success('Student updated successfully');
          utils.invalidateQueries('admin.getnon-verified-students');
          refetch();
          setOpen(false);
        },
        onError: () => {
          toast.dismiss();
          toast.error('Something went wrong');
        },
      }
    );
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <BsExclamationCircle
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex flex-col">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 my-3 font-medium text-gray-900"
                      >
                        Edit Student
                      </Dialog.Title>
                      <div className="mt-2">
                        <input
                          value={studentData.name || ''}
                          onChange={(e) => {
                            setStudentData({
                              ...studentData,
                              name: e.target.value,
                            });
                          }}
                          placeholder={student.data?.name || ''}
                          type="text"
                          id="name"
                          className="w-full my-2 border border-gray-300 rounded-md p-2"
                        />
                        <input
                          onChange={(e) => {
                            setStudentData({
                              ...studentData,
                              email: e.target.value,
                            });
                          }}
                          type="text"
                          id="email"
                          value={studentData.email || ''}
                          placeholder={student.data?.email || ''}
                          className="w-full my-2 border border-gray-300 rounded-md p-2"
                        />
                        <input
                          onChange={(e) => {
                            setStudentData({
                              ...studentData,
                              enrollmentNumber: e.target.value,
                            });
                          }}
                          type="text"
                          id="enrollmentNumber"
                          value={studentData.enrollmentNumber || ''}
                          placeholder={student.data?.enrollmentNumber || ''}
                          className="w-full my-2 border border-gray-300 rounded-md p-2"
                        />
                        <input
                          onChange={(e) => {
                            setStudentData({
                              ...studentData,
                              fatherName: e.target.value,
                            });
                          }}
                          type="text"
                          id="fatherName"
                          value={studentData.fatherName || ''}
                          placeholder={student.data?.fatherName || ''}
                          className="w-full my-2 border border-gray-300 rounded-md p-2"
                        />
                        <input
                          onChange={(e) => {
                            setStudentData({
                              ...studentData,
                              motherName: e.target.value,
                            });
                          }}
                          type="text"
                          id="motherName"
                          value={studentData.motherName || ''}
                          placeholder={student.data?.motherName || ''}
                          className="w-full my-2 border border-gray-300 rounded-md p-2"
                        />
                        <input
                          onChange={(e) => {
                            setStudentData({
                              ...studentData,
                              year: e.target.value,
                            });
                          }}
                          type="text"
                          id="year"
                          value={studentData.year || ''}
                          placeholder={student.data?.year || ''}
                          className="w-full my-2 border border-gray-300 rounded-md p-2"
                        />
                        <input
                          onChange={(e) => {
                            setStudentData({
                              ...studentData,
                              password: e.target.value,
                            });
                          }}
                          defaultValue=""
                          type="password"
                          id="password"
                          value={studentData.password || ''}
                          placeholder={student.data?.password || ''}
                          className="w-full my-2 border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => {
                      handleUpdateStudent(e);
                      setOpen(false);
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
