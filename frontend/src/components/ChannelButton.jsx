import classNames from "classnames";

function ChannelButton({children, isActive, onClick}) {
    return (
        <button type="button" className={classNames('w-100 rounded-0 text-start btn', {'btn-secondary': isActive})} onClick={onClick}>
            <span className="me-1">#</span>{children}
        </button>
    );
}

export default ChannelButton;
