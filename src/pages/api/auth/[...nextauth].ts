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
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
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
          const teacher = await prisma.teacher.findUnique({ where: { email } });
          if (!teacher) {
            const student = await prisma.student.findUnique({
              where: { email },
            });
            if (!student) {
              throw new Error('No user found');
            }
            // match password
            const match = await bcrypt.compare(password, student.password);
            if (!match) {
              throw new Error('Incorrect Email or password');
            } else {
              // check if student is verified
              if (!student.isVerified) {
                throw new Error('Please verify your account');
              } else {
                finaluser = student;
                role = 'student';
              }
            }
          } else {
            // match password
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
          role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
