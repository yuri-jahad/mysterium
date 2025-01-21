import generateToken from "@/utils/generate-token";
import generateRandomName from "@/utils/generate-random-name";
import type { UserAuth } from "@/auth/types/user";
import {
  getStorage,
  setStorage,
  updateStorageElements,
} from "@/utils/local-storage";

/*
   Authentication registration utility
   Checks if user exists in storage and manages token generation
*/

export default function useAuthRegister(): void {
  const userStorage: UserAuth | undefined = getStorage("mysterium");

  if (userStorage) {
    if (userStorage.token) {
      console.log("Token exists:", userStorage.token);
    } else {
      const item = { token: generateToken() };
      updateStorageElements("mysterium", item);
    }
  } else {
    const newUserStorage: UserAuth = {
      username: generateRandomName(),
      token: generateToken(),
      avatar: null
    };
    setStorage("mysterium", newUserStorage);
  }
}
