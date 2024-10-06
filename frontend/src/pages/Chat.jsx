import { useNavigate } from "react-router-dom";
import {getLocalStorageItem} from "../utils/local-storage";
import { AUTH_DATA_LOCAL_STORAGE_KEY } from '../store/slices/auth';
import {useEffect} from "react";

function Chat() {
    const navigate = useNavigate();
    const authData = getLocalStorageItem(AUTH_DATA_LOCAL_STORAGE_KEY);

    useEffect(() => {
        if (!authData) {
            navigate('/login');
        }
    }, [authData]);

    return <p>Chat page</p>;
}

export default Chat;
