import Letters from "@/utils/letters-manager";

export default function generateRoomKey(keys: string[]): string {
  let key = "";
  let count = 0;
  do {
    const random = Math.max(Math.random() * Letters.size());
  } while (count < 7);
}
