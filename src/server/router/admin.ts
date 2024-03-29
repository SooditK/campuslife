import { createRouter } from './context';
import bcrypt from 'bcrypt';
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
  .query('getstudentbyid', {
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
        const student = await ctx.prisma.student.findUnique({
          where: {
            id: input.id,
          },
        });
        return student;
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
  })
  .query('getall-verified-teachers', {
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
            isVerified: true,
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
  .query('getall-verified-students-by-year-and-course', {
    input: z.object({
      year: z.string(),
      course: z.string(),
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
        const students = await ctx.prisma.student.findMany({
          where: {
            isVerified: true,
            year: input.year,
            course: input.course,
          },
        });
        return students;
      }
    },
  })
  .mutation('update-student', {
    input: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      phone: z.string(),
      fatherName: z.string(),
      year: z.string(),
      course: z.string(),
      enrollmentNumber: z.string(),
      motherName: z.string(),
      password: z.string(),
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
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash password
        const hashedPassword = await bcrypt.hash(input.password, salt);
        const student = await ctx.prisma.student.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            email: input.email,
            phone: input.phone,
            fatherName: input.fatherName,
            year: input.year,
            course: input.course,
            enrollmentNumber: input.enrollmentNumber,
            motherName: input.motherName,
            password: hashedPassword,
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
  .mutation('create-department', {
    input: z.object({
      name: z.string(),
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
        const isDepartmentThere = await ctx.prisma.department.findUnique({
          where: {
            name: input.name,
          },
        });
        if (isDepartmentThere) {
          return {
            success: false,
            message: 'Department already exists',
          };
        } else {
          // create a new department
          const department = await ctx.prisma.department.create({
            data: {
              name: input.name,
            },
          });
          return {
            success: true,
            message: 'Department created successfully',
            id: department.id,
            name: department.name,
          };
        }
      }
    },
  })
  .query('get-all-departments', {
    async resolve({ ctx }) {
      const isAdmin = await ctx.prisma.admin.findUnique({
        where: {
          email: String(ctx!.session!.user!.email),
        },
      });
      if (!isAdmin) {
        throw new Error('Not Authorized');
      } else {
        const departments = await ctx.prisma.department.findMany({
          select: {
            id: true,
            name: true,
          },
        });
        return departments;
      }
    },
  })
  .mutation('assign-teachers-to-department', {
    input: z.object({
      departmentId: z.string(),
      teacherIds: z.array(z.string()),
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
        const department = await ctx.prisma.department.update({
          where: {
            id: input.departmentId,
          },
          data: {
            teachers: {
              connect: input.teacherIds.map((id) => ({
                id,
              })),
            },
          },
        });
        return {
          success: true,
          message: 'Teachers assigned to department successfully',
          id: department.id,
          name: department.name,
        };
      }
    },
  })
  .query('get-all-teachers-by-department', {
    input: z.object({
      departmentId: z.string(),
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
        const teachers = await ctx.prisma.teacher.findMany({
          where: {
            departmentId: input.departmentId,
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
  .query('get-all-non-assigned-teachers', {
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
            departmentId: null,
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
  .mutation('delete-department', {
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
        const department = await ctx.prisma.department.delete({
          where: {
            id: input.id,
          },
        });
        return {
          id: department.id,
          name: department.name,
        };
      }
    },
  })
  .mutation('remove-teacher-from-department', {
    input: z.object({
      departmentId: z.string(),
      teacherId: z.string(),
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
        const department = await ctx.prisma.department.update({
          where: {
            id: input.departmentId,
          },
          data: {
            teachers: {
              disconnect: {
                id: input.teacherId,
              },
            },
          },
        });
        return {
          success: true,
          message: 'Teacher removed from department successfully',
          id: department.id,
          name: department.name,
        };
      }
    },
  });
