import { useLocation, useHistory } from 'react-router';

export const useAuth = () => {
  const {
    pathname,
  } = useLocation();
  const history = useHistory();
  const loggedIn = window.localStorage.getItem('logged-in');

  if (loggedIn !== 'true') {
    history.push(`/login?path=${encodeURIComponent(pathname)}`);
  }
};
