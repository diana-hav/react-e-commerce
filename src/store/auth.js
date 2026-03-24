import { useReducer } from "react";
import { toast } from "react-toastify";
import {
  setExpirationDate,
  getUserFromLocalStorage,
} from "../helpers/checkExpiration";

const initialState = {
  user: getUserFromLocalStorage() || null,
};
const actions = Object.freeze({
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
});

const reducer = (state, action) => {
  if (action.type == actions.SET_USER) {
    return { ...state, user: action.user };
  }
  if (action.type == actions.LOGOUT) {
    return { ...state, user: null };
  }
  return state;
};

const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (userInfo) => {
    try {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user already exists
      const existingUser = users.find(user => user.email === userInfo.email);
      if (existingUser) {
        toast.error("Пользователь с таким email уже существует");
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password, // In real app, hash this
        phone: userInfo.phone || "",
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Set current user
      const userForState = { ...newUser };
      delete userForState.password; // Don't store password in state
      dispatch({ type: actions.SET_USER, user: userForState });
      userForState.expirationDate = setExpirationDate(7);
      localStorage.setItem("user", JSON.stringify(userForState));
      toast.success("Регистрация успешна");
    } catch (error) {
      toast.error("Ошибка при регистрации");
    }
  };

  const login = async (userInfo) => {
    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Find user
      const user = users.find(u => u.email === userInfo.email && u.password === userInfo.password);
      if (!user) {
        toast.error("Неверный email или пароль");
        return;
      }

      // Set current user
      const userForState = { ...user };
      delete userForState.password;
      dispatch({ type: actions.SET_USER, user: userForState });
      userForState.expirationDate = setExpirationDate(7);
      localStorage.setItem("user", JSON.stringify(userForState));
      toast.success("Вход выполнен успешно");
    } catch (error) {
      toast.error("Ошибка при входе");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: actions.LOGOUT });
    toast.success("Выход выполнен");
  };

  return { state, register, login, logout };
};

export default useAuth;
