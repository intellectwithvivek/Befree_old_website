export const getAccesstokenStorage = () => {
  const access_token = localStorage.getItem("token");
  return access_token;
};

export const savetokenStorage = (token: string) => {
  localStorage.setItem("token", token);
};
