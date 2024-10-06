function NotFound() {
    return (
        <div className="text-center">
            <img alt="Страница не найдена" width="179" height="179" src="/not-found.svg"/>
            <h1 className="h4 text-muted">Страница не найдена</h1>
            <p className="text-muted">
                Но вы можете перейти <a href="/">на главную страницу</a>
            </p>
        </div>
    );
}

export default NotFound;
