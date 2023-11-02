import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [data, setData] = useState({});

  async function signIn({ email, password }) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });
      const { token, user } = response.data;

      localStorage.setItem("@RocketNotes:user", JSON.stringify(user));
      localStorage.setItem("@RocketNotes:token", token);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      setData({ token, user });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Erro ao realizar login, tente novamente mais tarde");
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@RocketNotes:user");
    localStorage.removeItem("@RocketNotes:token");

    setData({});
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        fileUploadForm.append("avatar", avatarFile);

        const response = await api.patch("/users/avatar", fileUploadForm);

        user.avatar = response.data.avatar;
      }

      await api.put("/users", user);

      localStorage.setItem("@RocketNotes:user", JSON.stringify(user));

      setData({ user, token: data.token });

      alert("Perfil atualizado com sucesso");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert(error.response.data.error);
      } else {
        alert(
          "Erro ao tentar atualizar o seu perfil, tente novamente mais tarde"
        );
      }
    }
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem("@RocketNotes:user");
    const storagedToken = localStorage.getItem("@RocketNotes:token");

    if (storagedToken && storagedUser) {
      api.defaults.headers["Authorization"] = `Bearer ${storagedToken}`;
      setData({ token: storagedToken, user: JSON.parse(storagedUser) });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateProfile,
        user: data.user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
