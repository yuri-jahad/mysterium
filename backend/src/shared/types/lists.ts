export type PathKeys = "dictionary" | "english" | "httpCodes" | "occ" | "sn";
export const LIST_PATH: Record<PathKeys, string> = {
  dictionary: "dico",
  english: "english",
  httpCodes: "http-codes",
  occ: "occ",
  sn: "sn",
} as const;
