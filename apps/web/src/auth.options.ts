// import Credentials from "next-auth/providers/credentials";
// import { AuthError, NextAuthConfig } from "next-auth";
// import { loginSchema } from "./schema/login.schema";
// import { refreshToken } from "./fetch/auth/fetchRefreshToken";
// import { fetchPermission } from "./fetch/user/fetchPermissions";

// export default {
//     providers: [
//         Credentials({
//             credentials: {
//                 email: {
//                     label: "email",
//                     type: "text",
//                 },
//                 password: {
//                     label: "password",
//                     type: "password",
//                 },
//             },
//             async authorize(credentials, request) {
//                 const validatedField = loginSchema.safeParse(credentials);
//                 if (!validatedField.success) {
//                     console.log("parse deu errado");
//                     return null;
//                 }
//                 try {
//                     const { email, password } = validatedField.data;
//                     const res = await fetch(
//                         process.env.API_BASE_URL + "auth/login",
//                         {
//                             method: "POST",
//                             body: JSON.stringify({
//                                 username: email,
//                                 password: password,
//                             }),
//                             headers: {
//                                 "Content-Type": "application/json",
//                             },
//                         },
//                     );
//                     if (res.status === 404 || res.status === 401) {
//                         throw new AuthError("Wrong Credentials");
//                     }
//                     const data = await res.json();
//                     const user = {
//                         user: {
//                             email: data.username,
//                             id: data.id,
//                             role: data.role,
//                             tenant_id: data.tenant_id,
//                             name: data.name,
//                             org: data.org,
//                             profile_pic: data.profile_pic,
//                             active: data.active,
//                             employee_id: data.employee_id,
//                             employee_name: data.employee_name,
//                         },
//                         token: {
//                             accessToken: data.token.access_token,
//                             refreshToken: data.token.refresh_token,
//                             expiresIn: data.token.expiresIn,
//                         },
//                     };

//                     return user;
//                 } catch (error) {
//                     throw new Error("Wrong Credentials");
//                 }
//             },
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET,
//     pages: {
//         signIn: "auth/login",
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             if (user) {
//                 token.user = user.user;
//                 token.token = user.token;
//                 const role = await fetchPermission(
//                     token.token.accessToken as string,
//                 );
//                 token.user.role = role;
//                 return {
//                     ...token,
//                     ...user,
//                 };
//             }

//             if (Date.now() - 6000 < token.token.expiresIn) {
//                 return token;
//             }

//             try {
//                 return refreshToken(token);
//             } catch (e) {
//                 console.log(e);
//                 return;
//             }
//         },
//         async session({ session, token, user }) {
//             session.user = token.user;
//             session.accessToken = token.token.accessToken as string;
//             session.refreshToken = token.token.refreshToken as string;
//             session.expiresIn = token.token.expiresIn;
//             session.role = token.user.role;
//             return session;
//         },
//         //TODO REFRESHTOKEN
//         //TODO singIn função para buscar na BD informações da organizacao
//     },

//     jwt: {
//         maxAge: 60 * 60 * 2,
//     },
//     session: {
//         maxAge: 60 * 60 * 2,
//         strategy: "jwt",
//     },

//     trustHost: true,
// } satisfies NextAuthConfig;
