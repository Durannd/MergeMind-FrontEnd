import { createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import fetchUser from "../components/fetchUser";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
    const authenticated = () => {
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    const loginMutation = useMutation({
        mutationFn: ({ email, password }) => fetchUser(email, password),
        onSuccess: (data) => {

            const userData = data.user;
            const token = data.token;

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
        },
        onError: (error) => {
            if (error.status === 401) {
                error.message = "Email ou senha incorretos.";
            } else {
                console.error("Error on login:", error);
            }
        }
    });
    function login(email, password) {
        loginMutation.mutate({ email, password });

    }

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };
    const isAuthenticated = () => {
        return authenticated;
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated,
            isPending: loginMutation.isPending,

            error: loginMutation.error
        }}>
            {children}
        </AuthContext.Provider>
    );

};

