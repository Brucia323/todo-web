import { UserType } from './types';

let name: string | null;
let email: string | null;
let token: string | null;

export function useUser() {

  const setUser = (user: UserType) => {
    name = user.name;
    email = user.email;
    token = `Bearer ${user.token}`;
  };

  const removeUser = () => {
    name = null;
    email = null;
    token = null;
  };

  return { name, email, token, setUser, removeUser };
}
