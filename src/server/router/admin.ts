import { createRouter } from './context';
import { z } from 'zod';

export const adminRouter = createRouter()
  .query('getnon-verified-teachers', {
    async resolve({ ctx }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: ctx.session.user.email,
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
  .mutation('verify-teacher', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: ctx.session.user.email,
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
          email: ctx.session.user.email,
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
  });
