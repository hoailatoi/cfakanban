import fetchInstance from "./fetchInstance";

export const _f_Post_Query = async (_url: string, _data: object) => {
  try {
    const response = await fetchInstance.post(_url, _data);

    if (!response) return null;
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
