import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Google from "next-auth/providers/google";
import NextAuth, { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import { text, html } from "./customEmail";

const providers = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  }),
  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
    async sendVerificationRequest({
      identifier: email,
      url,
      provider: { server, from },
    }) {
      const { host } = new URL(url);

      const transport = createTransport(server);

      console.log({
        to: email,
        from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({ url, host, email }),
      });

      await transport.sendMail({
        to: email,
        from,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({ url, host, email }),
      });
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers: providers,
  adapter: PrismaAdapter(prisma),
};

export const handler = NextAuth(authOptions);
