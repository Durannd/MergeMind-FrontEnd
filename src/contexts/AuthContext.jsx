import { createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import fetchUser from "../components/fetchUser";
import signUpUser from "../components/signUpUser";
import { useNavigate } from "@tanstack/react-router";

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
                error.message = "Email or password invalid.";
            } else {
                console.error("Error on login:", error);
            }
        }
    });

    const registerMutation = useMutation({
        mutationFn: ({ name, email, password }) => signUpUser(name, email, password),
        onSuccess: (data) => {
            const userData = data.user;
            const token = data.token;

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
        },
        onError: (error) => {
            if(error.status === 409){
                error.message = "Email already in use.";
            }else{
                console.error("Error on register:", error);
            }

        }
    });

    function login(email, password) {
        loginMutation.mutate({ email, password });

    }

    function register (name, email, password) {
        registerMutation.mutate({ name, email, password });
    }

     const logout = () => {
        setUser(null);
        localStorage.clear();
        navigate({ to: '/login' });
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
            register,
            isRegisterError: registerMutation.isError,
            isRegisterPending: registerMutation.isPending,
            isLoginPending: loginMutation.isPending,
            isLoginError: loginMutation.isError,
            errorLogin: loginMutation.error,
            errorRegister: registerMutation.error,
        }}>
            {children}
        </AuthContext.Provider>
    );

};

