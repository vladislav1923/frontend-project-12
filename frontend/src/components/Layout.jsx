import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/authSlice";

function Layout({children}) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div className="container">
                    <a href="/" className="navbar-brand">Hexlet Chat</a>

                    {isAuthenticated && <button type="button" className="btn btn-primary" onClick={() => dispatch(logout())}>Выйти</button>}
                </div>
            </nav>
            {children}
        </div>
    );
}

export default Layout;
