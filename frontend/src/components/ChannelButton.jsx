import { ButtonGroup, Dropdown } from 'react-bootstrap';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

const ChannelButton = ({
  channel, isActive, onClick, onRename, onRemove,
}) => {
  const { t } = useTranslation();

  if (!channel.removable) {
    return (
      <button type="button" className={classNames('w-100 rounded-0 text-start btn', { 'btn-secondary': isActive })} onClick={onClick}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    );
  }

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      <button type="button" className={classNames('w-100 rounded-0 text-start text-truncate btn', { 'btn-secondary': isActive })} onClick={onClick}>
        <span className="me-1">#</span>
        {channel.name}
      </button>

      <Dropdown.Toggle split variant={isActive ? 'secondary' : 'outline'} className={classNames('border-0')} />

      <Dropdown.Menu>
        <Dropdown.Item onClick={onRemove}>{t('channelButton.removeText')}</Dropdown.Item>
        <Dropdown.Item onClick={onRename}>{t('channelButton.renameText')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelButton;
