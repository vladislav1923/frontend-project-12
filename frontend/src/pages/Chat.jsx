import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

function Chat() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated]);

    return <p>Chat page</p>;
}

export default Chat;
