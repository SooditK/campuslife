import React from 'react';
import { trpc } from '../../utils/trpc';

function VerifiedTeachers() {
  const allVerifiedTeachers = trpc.useQuery(['admin.getall-verified-teachers']);
  if (allVerifiedTeachers.status === 'loading') {
    return <div>Loading...</div>;
  }
  if (allVerifiedTeachers.status === 'error') {
    return <div>{allVerifiedTeachers.error.message}</div>;
  }
  return (
    <div>
      <pre>{JSON.stringify(allVerifiedTeachers.data, null, 2)}</pre>
    </div>
  );
}

export default VerifiedTeachers;
