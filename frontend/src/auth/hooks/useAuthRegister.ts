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

export function getAuthUser(): UserAuth {
  const userStorage: UserAuth | undefined = getStorage("mysterium");
  if (userStorage) {
    if (userStorage.token) return userStorage;
    const token = generateToken();
    const updatedUser = { ...userStorage, token };

    updateStorageElements("mysterium", { token });
    return updatedUser;
  }
  const newUserStorage: UserAuth = {
    username: generateRandomName(),
    token: generateToken(),
    avatar: null,
  };

  setStorage("mysterium", newUserStorage);
  return newUserStorage;
}
