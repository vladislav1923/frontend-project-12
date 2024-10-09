import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {ChatBoard, ChannelModal} from "../components";

function Chat() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated]);

    return (
        <>
            <div className="container h-100 my-4 overflow-hidden rounded shadow">
                {isAuthenticated && <ChatBoard/>}
            </div>

            <ChannelModal />
        </>
    );
}

export default Chat;
