// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { registrationRouter } from './signup';
import { adminRouter } from './admin';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('auth.', registrationRouter)
  .merge('admin.', adminRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
