import generateToken from "@/utils/generate-token";
import generateRandomName from "@/utils/generate-random-name";
import type { UserAuth } from "@/auth/types/user";
import {
  getStorage,
  setStorage,
  updateStorageElements,
} from "@/utils/local-storage";

/**
 * Utility for authentication registration.
 * Checks if a user exists in storage and manages token generation.
 */

export function getAuthUser(): UserAuth {
  const userStorage = getStorage("mysterium") as UserAuth | null;

  if (userStorage) {
    return handleExistingUser(userStorage);
  }

  return createNewUser();
}

/**
 * Handles the case where a user already exists in storage.
 * @param userStorage - The existing user data from storage.
 * @returns The updated user data with a new token if necessary.
 */
function handleExistingUser(userStorage: UserAuth): UserAuth {
  if (userStorage.token) {
    console.log({ getAuthUser: userStorage });
    return userStorage;
  }

  const token = generateToken();
  const updatedUser = { ...userStorage, token };

  updateStorageElements("mysterium", { token });
  return updatedUser;
}

/**
 * Creates a new user with a random name and token.
 * @returns The new user data.
 */
function createNewUser(): UserAuth {
  const newUser: UserAuth = {
    username: generateRandomName(),
    token: generateToken(),
    avatar: null,
  };

  setStorage("mysterium", newUser);
  return newUser;
}
