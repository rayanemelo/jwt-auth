import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { router } from "expo-router";

type AuthProps = {
  authentication: {
    token: string;
    authenticated: boolean;
  };
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
};

type AuthProvider = {
  children: JSX.Element | JSX.Element[];
};

const AuthContext = createContext<AuthProps>({} as AuthProps);

const TOKEN_KEY = 'mytoken';
const API_URL = "http://localhost:3000";

export const AuthProvider = ({ children }: AuthProvider) => {
  const [authentication, seAuthentication] = useState({
    token: "",
    authenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  console.log("authentication: ", authentication); 

  async function getToken() {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      seAuthentication({ token, authenticated: true });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getToken();
  }, []);

  async function signIn(email: string, password: string) {
    try {
      const response = await axios.post(`${API_URL}/api/v1/access/login`, {
        email,
        password,
      });

      const token = response.data.data.token

      seAuthentication({
        token: token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, token);

      router.push("/home");

      return response;
    } catch (error) {
      return { error: true, message: error };
    }
  }

  async function signOut() {
    seAuthentication({
      token: "",
      authenticated: false,
    });

    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        authentication,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
