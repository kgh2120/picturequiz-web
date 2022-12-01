import {Navigate} from "react-router";
import {getAccessToken} from "../../utils/global/token";

const PrivateRoute = ({ children }) => {
    return (
        !getAccessToken() ? <Navigate to='/login' /> : children
    )
};

export default PrivateRoute;