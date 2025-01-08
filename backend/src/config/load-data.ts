import { LIST_PATH } from "@/types/lists";
import type { PathKeys } from "@/types/lists";
import loadJsonFile from "@/utils/load-json";

const listContent = await Promise.all(
  Object.keys(LIST_PATH).map(async (key: string) => ({
    [key as PathKeys]: await loadJsonFile(LIST_PATH[key as PathKeys]),
  }))
);

export default listContent;
