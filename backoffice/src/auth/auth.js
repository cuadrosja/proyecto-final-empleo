export const isAuthenticated = () => {
  const user = localStorage.getItem("usuario");
  return !!user;
};
