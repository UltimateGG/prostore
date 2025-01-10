import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import { signInFormSchema } from './lib/types';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/sign-in',
    error: '/sign-in'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = signInFormSchema.parse(credentials);

        // Find user in db
        const user = await prisma.user.findFirst({ where: { email: email } });

        if (user && user.password) {
          const isMatch = compareSync(password, user.password);

          if (isMatch) return { id: user.id, name: user.name, email: user.email, role: user.role };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      // Set user id from token
      session.user.id = token.sub;

      // If there is an update then update user name
      if (trigger === 'update') {
        session.user.name = user.name;
      }

      return session;
    }
  }
});
