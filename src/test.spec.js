import { describe, it } from "vitest";
import "./tables";
import { hang } from "./hang";

describe("test", () => {
  it("hangs", () => hang(250));
});
