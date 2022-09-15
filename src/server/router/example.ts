import bcrypt from 'bcrypt';
import { createRouter } from './context';
import { z } from 'zod';
import {
  isValidEmail,
  validatePassword,
} from '../../../utils/validatePassword';

export const exampleRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .mutation('registeradmin', {
    input: z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!validatePassword(input.password) || !isValidEmail(input.email)) {
        throw new Error('Invalid email or password');
      } else {
        const user = await ctx.prisma.admin.findUnique({
          where: {
            email: input.email,
          },
        });
        if (user) {
          throw new Error('User already exists');
        } else {
          // generate salt
          const salt = await bcrypt.genSalt(10);
          // hash password
          const hashedPassword = await bcrypt.hash(input.password, salt);
          // create user
          const newUser = await ctx.prisma.admin.create({
            data: {
              email: input.email,
              password: hashedPassword,
              name: input.name,
            },
            select: {
              id: true,
              email: true,
              name: true,
            },
          });
          return {
            success: true,
            message: 'User created',
            user: newUser,
          };
        }
      }
    },
  });
