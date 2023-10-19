import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';
import { readFile } from 'fs/promises';

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        //
        const response = await require('data/user.json');
        // const response = JSON.parse(await readFile(path.resolve('data/user.json'), 'utf8'));
        // console.log(response);

        const passwordCorrect = await compare(
          credentials?.password || '',
          response.password
        );

        // console.log({ passwordCorrect });

        if (passwordCorrect) {
          return {
            email: response.email,
          };
        }

        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };