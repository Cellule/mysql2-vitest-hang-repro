import { hang } from "./hang.js";

await hang(Number(process.argv[2]) || 250);
