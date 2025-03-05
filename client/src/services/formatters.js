export const errorFormatter = (err) => {
  const error = err?.response?.data?.message || err?.message;
  if (!error) return "";
  return JSON.stringify(error);
};
