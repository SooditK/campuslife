import bcrypt from 'bcrypt';
import { createRouter } from './context';
import { z } from 'zod';
import {
  isValidEmail,
  validatePassword,
} from '../../../utils/validatePassword';

export const registrationRouter = createRouter()
  .mutation('registerstudent', {
    input: z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
      enrollmentNumber: z.string(),
      fatherName: z.string(),
      motherName: z.string(),
      phone: z.string(),
      course: z.string(),
      year: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!validatePassword(input.password) || !isValidEmail(input.email)) {
        throw new Error('Invalid email or password');
      } else {
        // check email and enrollment number
        const checkExistingUser = await ctx.prisma.student.findFirst({
          where: {
            OR: [
              {
                email: input.email,
              },
              {
                enrollmentNumber: input.enrollmentNumber,
              },
            ],
          },
        });
        if (checkExistingUser) {
          throw new Error('User already exists');
        } else {
          // generate salt
          const salt = await bcrypt.genSalt(10);
          // hash password
          const hashedPassword = await bcrypt.hash(input.password, salt);
          // create user
          const user = await ctx.prisma.student.create({
            data: {
              email: input.email,
              password: hashedPassword,
              name: input.name,
              enrollmentNumber: input.enrollmentNumber,
              fatherName: input.fatherName,
              motherName: input.motherName,
              phone: input.phone,
              course: input.course,
              year: input.year,
            },
            select: {
              id: true,
              email: true,
              name: true,
              enrollmentNumber: true,
              fatherName: false,
              motherName: false,
              password: false,
              isVerified: true,
              phone: true,
            },
          });
          return {
            success: true,
            message: 'User created successfully',
            user,
          };
        }
      }
    },
  })
  .mutation('registerfaculty', {
    input: z.object({
      email: z.string(),
      password: z.string(),
      name: z.string(),
      phone: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!validatePassword(input.password) || !isValidEmail(input.email)) {
        throw new Error('Invalid email or password');
      } else {
        // check email and enrollment number
        const checkExistingUser = await ctx.prisma.teacher.findFirst({
          where: {
            OR: [
              {
                email: input.email,
              },
            ],
          },
        });
        if (checkExistingUser) {
          throw new Error('User already exists');
        } else {
          // generate salt
          const salt = await bcrypt.genSalt(10);
          // hash password
          const hashedPassword = await bcrypt.hash(input.password, salt);
          // create user
          const user = await ctx.prisma.teacher.create({
            data: {
              email: input.email,
              password: hashedPassword,
              name: input.name,
              phone: input.phone,
            },
            select: {
              id: true,
              email: true,
              name: true,
              phone: true,
              password: false,
              isVerified: true,
            },
          });
          return {
            success: true,
            message: 'User created successfully',
            user,
          };
        }
      }
    },
  });
