import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../store/authSlice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a href="/" className="navbar-brand">{t('layout.title')}</a>

          {isAuthenticated && <button type="button" className="btn btn-primary" onClick={() => dispatch(logout())}>{t('layout.logoutText')}</button>}
        </div>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
