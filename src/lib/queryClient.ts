import { contract } from "@/shared/contract";
import { initQueryClient } from "@ts-rest/react-query";

export const client = initQueryClient(contract, {
  baseUrl: "http://localhost:3000/api",
  baseHeaders: {},
});
