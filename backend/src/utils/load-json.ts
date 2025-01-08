import { join } from "path";

export default async function loadJsonFile(fileName: string) {
  const pathFile = join(import.meta.dir, `../data/${fileName}.json`);
  const file = Bun.file(pathFile);
  return await file.json();
}
