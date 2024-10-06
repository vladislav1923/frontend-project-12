function Layout({children}) {
    return (
        <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
                <div className="container">
                    <a href="/" className="navbar-brand">Hexlet Chat</a>
                </div>
            </nav>
            {children}
        </div>
    );
}

export default Layout;
