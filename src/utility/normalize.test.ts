
import * as Immutable from "immutable";
import { describe, expect, test } from "vitest";
import { normalizeArray } from "./normalize";

describe("test util/normalize", () => {
  const input = [
    {
      ID   : 1,
      Name : "BlaBla 1",
    }, {
      ID   : 2,
      Name : "BlaBla 2",
    }, {
      ID   : 3,
      Name : "BlaBla 3",
    },
  ];

  describe("given an array", () => {
    const result = normalizeArray(input);

    test("normalizes the entities", () => {
      expect(result.entities).toEqual(Immutable.Map({
        "1": Immutable.Map({
          ID   : 1,
          Name : "BlaBla 1",
        }),
        "2": Immutable.Map({
          ID   : 2,
          Name : "BlaBla 2",
        }),
        "3": Immutable.Map({
          ID   : 3,
          Name : "BlaBla 3",
        }),
      }));
    });
    test("normalizes the result", () => {
      expect(result.result).toEqual(Immutable.List(["1", "2", "3"]));
    });
  });
});
