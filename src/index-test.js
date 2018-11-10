import {
  utility,
} from "./index";

// toTitle
(() => {
  describe("It exports", () => {
    it("should export utility functions", () => {
      expect(utility.normalizeDiacritics).toBeDefined();
    });
  });
})();
