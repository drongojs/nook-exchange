const Logout = () => {
  window.localStorage.removeItem('logged-in');
  window.location.href = '/';
  return null;
};

export default Logout;
