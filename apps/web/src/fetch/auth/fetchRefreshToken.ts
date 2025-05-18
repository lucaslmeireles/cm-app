"use server";
import { signOut } from "@/auth";
import { JWT } from "next-auth/jwt";

export const refreshToken = async (token: JWT) => {
  try {
    const newToken = await fetch(process.env.API_BASE_URL + "auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: token.token.refreshToken,
      }),
    });
    const n_token = await newToken.json();
    console.log(n_token);
    if (n_token.statusCode == 401) {
      throw new Error("Unauthorized");
    }
    console.log({
      ...token,
      token: {
        accessToken: n_token.access_token,
        refreshToken: n_token.refresh_token,
        expiresIn: n_token.expiresIn,
      },
    });
    return {
      ...token,
      token: {
        accessToken: n_token.access_token,
        refreshToken: n_token.refresh_token,
        expiresIn: n_token.expiresIn,
      },
    };
  } catch (e) {
    throw new Error("Unauthorized");
  }
};
