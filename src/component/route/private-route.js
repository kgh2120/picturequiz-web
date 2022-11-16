import {Navigate} from "react-router";
import {isLogined} from "../../utils/global/token";

const PrivateRoute = ({ children }) => {
    return (
        !isLogined() ? <Navigate to='/login' /> : children
    )
};

export default PrivateRoute;