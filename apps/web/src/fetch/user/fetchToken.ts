"use server";

export const fetchToken = async (token: string) => {
  try {
    const getTokenInfo = await fetch(
      process.env.API_BASE_URL + "user/invite/" + token,
      {}
    );
    const user = await getTokenInfo.json();
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
};
