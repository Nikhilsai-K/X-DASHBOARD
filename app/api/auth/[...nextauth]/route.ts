import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        url: "https://twitter.com/i/oauth2/authorize",
        params: {
          scope: "tweet.read users.read follows.read offline.access",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and user info to the token right after signin
      if (account) {
        console.log("JWT Callback - Account:", account);
        console.log("JWT Callback - Profile:", profile);
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        // Twitter profile uses 'data.id' for OAuth 2.0
        token.userId = (profile as any)?.data?.id || profile?.sub || (profile as any)?.id || account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string;
      session.userId = token.userId as string;
      console.log("Session Callback - Final session:", {
        hasAccessToken: !!session.accessToken,
        hasUserId: !!session.userId,
        userId: session.userId
      });
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
