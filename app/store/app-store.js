import { create } from 'zustand';
import { removeJWT, setJWT, getJWT, getMe } from '../api/api-utils';
import { endpoints } from '../api/config';

export const useStore = create((set) => ({
  isAuth: false,
  user: null,
  token: null,
  login: (user, token) => {
    /* С помощью функции set устанавливаем новое состояние хранилища */
    set({ isAuth: true, user: { ...user, id: user._id }, token });
    /* Записываем полученный токен */
    setJWT(token);
  },
  logout: (user, token) => {
    /* С помощью функции set устанавливаем новое состояние хранилища */
    set({ isAuth: false, user: null, token: null });
    /* Записываем полученный токен */
    removeJWT(token);
  },
  checkAuth: async () => {
    const jwt = getJWT();
    if (jwt) {
      const user = await getMe(endpoints.me, jwt);
      if (user) {
        /* Сохраняем полученные данные и токен */
        set({ isAuth: true, user, token: jwt });
        setJWT(jwt);
      } else {
        /* Возвращаем изначальные состояния и удаляем токен */
        set({ isAuth: false, user: null, token: null });
        removeJWT();
      }
    } else {
      set({ isAuth: false, user: null, token: null });
    }
  },
}));