/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { DefaultSession } from 'next-auth';
import type { User as PrismaUser } from '@prisma/client';
import { JWT } from 'next-auth/jwt';

type MyUser = { role?: string | null; name?: string | null };

declare module 'next-auth' {
  interface Session {
    user: MyUser & DefaultSession['user'];
  }

  interface User extends MyUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends MyUser {}
}
