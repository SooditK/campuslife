import { createRouter } from './context';
import { z } from 'zod';

export const adminRouter = createRouter()
  .query('getnon-verified-teachers', {
    async resolve({ ctx }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: String(ctx!.session!.user!.email),
        },
      });
      if (!isAdmin) {
        throw new Error('Not Authorized');
      } else {
        const teachers = await ctx.prisma.teacher.findMany({
          where: {
            isVerified: false,
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
          },
        });
        return teachers;
      }
    },
  })
  .query('getnon-verified-students', {
    async resolve({ ctx }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: String(ctx!.session!.user!.email),
        },
      });
      if (!isAdmin) {
        throw new Error('Not Authorized');
      } else {
        const students = await ctx.prisma.student.findMany({
          where: {
            isVerified: false,
          },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
            fatherName: true,
            year: true,
            course: true,
            enrollmentNumber: true,
            motherName: true,
          },
        });
        return students;
      }
    },
  })
  .mutation('verify-teacher', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: String(ctx!.session!.user!.email),
        },
      });
      if (!isAdmin) {
        throw new Error('Not Authorized');
      } else {
        const teacher = await ctx.prisma.teacher.update({
          where: {
            id: input.id,
          },
          data: {
            isVerified: true,
          },
        });
        return {
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          phone: teacher.phone,
          createdAt: teacher.createdAt,
        };
      }
    },
  })
  .mutation('delete-teacher', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: String(ctx!.session!.user!.email),
        },
      });
      if (!isAdmin) {
        throw new Error('Not Authorized');
      } else {
        const teacher = await ctx.prisma.teacher.delete({
          where: {
            id: input.id,
          },
        });
        return {
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          phone: teacher.phone,
          createdAt: teacher.createdAt,
        };
      }
    },
  })
  .mutation('verify-student', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: String(ctx!.session!.user!.email),
        },
      });
      if (!isAdmin) {
        throw new Error('Not Authorized');
      } else {
        const student = await ctx.prisma.student.update({
          where: {
            id: input.id,
          },
          data: {
            isVerified: true,
          },
        });
        return {
          id: student.id,
          name: student.name,
          email: student.email,
          phone: student.phone,
          createdAt: student.createdAt,
          fatherName: student.fatherName,
          year: student.year,
          course: student.course,
          enrollmentNumber: student.enrollmentNumber,
          motherName: student.motherName,
        };
      }
    },
  })
  .mutation('delete-student', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: String(ctx!.session!.user!.email),
        },
      });
      if (!isAdmin) {
        throw new Error('Not Authorized');
      } else {
        const student = await ctx.prisma.student.delete({
          where: {
            id: input.id,
          },
        });
        return {
          id: student.id,
          name: student.name,
          email: student.email,
          phone: student.phone,
          createdAt: student.createdAt,
          fatherName: student.fatherName,
          year: student.year,
          course: student.course,
          enrollmentNumber: student.enrollmentNumber,
          motherName: student.motherName,
        };
      }
    },
  });
