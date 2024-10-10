export default {
    translation: {
        layout: {
            title: 'Hexlet Chat',
            logoutText: 'Выйти',
        },
        loginForm: {
            title: 'Войти',
            usernameValidationError: 'Имя пользователя обязательно',
            passwordValidationError: 'Пароль обязателен',
            usernamePlaceholder: 'Ваш ник',
            passwordPlaceholder: 'Пароль',
            noAccountText: 'Нет аккаунта?',
            signupText: 'Регистрация',
            badRequestError: 'Неверные имя пользователя или пароль',
            serverError: 'Ошибка при попытке входа',
        },
        signupForm: {
            title: 'Регистрация',
            usernameLengthValidationError: 'От 3 до 20 символов',
            usernameValidationError: 'Имя пользователя обязательно',
            passwordLengthValidationError: 'От 6 до 20 символов',
            passwordValidationError: 'Пароль обязателен',
            passwordConfirmValidationError: 'Пароли должны совпадать',
            usernamePlaceholder: 'Имя пользователя',
            passwordPlaceholder: 'Пароль',
            passwordConfirmPlaceholder: 'Повторите пароль',
            buttonText: 'Зарегистрироваться',
            badRequestError: 'Неверные имя пользователя или пароль',
            serverError: 'Ошибка при попытке входа',
        },
        chatBoard: {
            loadingText: 'Загрузка...',
            channelsTitle: 'Каналы',
            messagesCount_zero: "{{count}} сообщений",
            messagesCount_one: "{{count}} сообщение",
            messagesCount_few: "{{count}} сообщения",
            messagesCount_many: "{{count}} сообщений",
            errorText: 'Ошибка загрузки данных',
        },
        messageAddForm: {
            placeholder: 'Введите сообщение...',
            errorToastText: 'Ошибка при отправке сообщения',
        },
        channelAddForm: {
            title: 'Добавить канал',
            renameTitle: 'Переименовать канал',
            validationError: 'Обязательное поле',
            lengthValidationError: 'От 3 до 20 символов',
            toastText: 'Канал успешно добавлен',
            renameToastText: 'Канал переименован',
            buttonText: 'Отправить',
            cancelButtonText: 'Отменить',
            errorToastText: 'Ошибка при добавлении канала',
            errorRenameToastText: 'Ошибка при переименовании канала',
        },
        channelRemoveForm: {
            title: 'Удалить канал',
            bodyText: 'Уверены?',
            toastText: 'Канал удален',
            buttonText: 'Удалить',
            cancelButtonText: 'Отменить',
            errorToastText: 'Ошибка при удалении канала',
        },
        channelButton: {
            removeText: 'Удалить',
            renameText: 'Переименовать',
        }
    },
};
