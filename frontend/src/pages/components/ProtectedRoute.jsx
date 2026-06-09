import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
    children
}) => {

    const token =
        localStorage.getItem(
            "adminToken"
        );

    if (!token) {

        return (

            <Navigate
                to="/admin-login"
                replace
                state={{
                    toast: {
                        message:
                            "Please login first",
                        id:
                            "admin-auth"
                    }
                }}
            />

        );

    }

    return children;

};

export default ProtectedRoute;