export const setLocalStorageItem = (key, value) => {
    try {
        window.localStorage.setItem(key, value);
    } catch {
        console.error(`Something went wrong while setting ${key} to Local Storage`);
    }
}

export const getLocalStorageItem = (key) => {
    try {
        return window.localStorage.getItem(key);
    } catch {
        console.error(`Something went wrong while getting ${key} from Local Storage`);
    }
}

export const deleteLocalStorageItem = (key) => {
    try {
        window.localStorage.removeItem(key);
    } catch {
        console.error(`Something went wrong while deleting ${key} from Local Storage`);
    }
}
