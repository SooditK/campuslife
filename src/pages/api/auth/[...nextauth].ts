import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';

import { env } from '../../../env/server.mjs';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        let finaluser;
        let role;
        const adminuser = await prisma.admin.findUnique({ where: { email } });
        if (!adminuser) {
          const teacher = await prisma.teacher.findFirst({ where: { email } });
          if (!teacher) {
            const student = await prisma.student.findUnique({
              where: { email },
            });
            if (!student) {
              throw new Error('No user found');
            }
            const match = await bcrypt.compare(password, student.password);
            if (!match) {
              throw new Error('Incorrect Email or password');
            } else {
              if (!student.isVerified) {
                throw new Error('Please verify your account');
              } else {
                finaluser = student;
                role = 'student';
              }
            }
          } else {
            // match password
            console.log('we found teacher', teacher);
            const match = await bcrypt.compare(password, teacher.password);
            if (!match) {
              throw new Error('Incorrect Email or password');
            } else {
              // check if teacher is verified
              if (!teacher.isVerified) {
                throw new Error('Please verify your account');
              } else {
                finaluser = teacher;
                role = 'teacher';
              }
            }
          }
        } else {
          // match password
          const match = await bcrypt.compare(password, adminuser.password);
          if (!match) {
            throw new Error('Incorrect Email or password');
          } else {
            finaluser = adminuser;
            role = 'admin';
          }
        }
        return {
          id: finaluser?.id,
          email: finaluser?.email,
          name: finaluser?.name,
          role: role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }
      return token;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
