import {ButtonGroup, Dropdown} from "react-bootstrap";
import classNames from "classnames";

function ChannelButton({channel, isActive, onClick, onRename, onRemove}) {
    if (!channel.removable) {
        return (
            <button type="button" className={classNames('w-100 rounded-0 text-start btn', {'btn-secondary': isActive})} onClick={onClick}>
                <span className="me-1">#</span>{channel.name}
            </button>
        );
    }

    return (
        <Dropdown as={ButtonGroup} className="w-100">
            <button type="button" className={classNames('w-100 rounded-0 text-start text-truncate btn', {'btn-secondary': isActive})} onClick={onClick}>
                <span className="me-1">#</span>{channel.name}
            </button>

            <Dropdown.Toggle split variant={isActive ? "secondary" : "outline"} className={classNames('border-0')} />

            <Dropdown.Menu>
                <Dropdown.Item onClick={onRemove}>Удалить</Dropdown.Item>
                <Dropdown.Item onClick={onRename}>Переименовать</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ChannelButton;
