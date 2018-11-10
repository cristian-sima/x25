import { isValidCIF } from "./cif";

const valid = true,
  notValid = false;

const wrong = [

  "adsasd",

  // too short < 6
  "00",

  // too long > 10
  "00000000001",

  // contains other things
  "aaaaaaaaaa",

  "1450123",

  "13880060",
  "13880061",
  "13880062",
  // "51584214", // <-- this is good
  "13880064",
  "13880065",
  "13880066",
  "13880067",
  "13880068",
  "13880069",
];

wrong.map((cif) => (
  describe(`given the wrong CIF ${cif}`, () => {
    it("should not be valid", () => {
      expect(isValidCIF(cif)).toBe(notValid);
    });
  })
));

const good = [

  "4446651",
  "3678190",
  "4352719",
  "3627676",
  "7525881",
  "4347666",
  "3372840",
  "5217524",
  "4317819",
  "4192600",
  "4266928",
  "4233815",
  "4288004",
  "4300787",
  "4300574",
  "4332134",
  "3519380",
  "4375178",
  "4297924",
  "3127336",
  "11078781",
  "3897033",
  "4541874",
  "4605609",
  "4245518",
  "4358002",
  "4230436",
  "4266898",
  "2613486",
  "4318113",
  "2844154",
  "4222310",
  "2540830",
  "4287378",
  "3897343",
  "4540062",
  "5397247",
  "4556140",
  "4231881",
  "4244393",
  "4280213",
  "4323179",
  "4567890",
  "6412248",
  "4269304",
  "4321658",
  "4494721",
  "4404613",

  "51584214",
];

good.map((cif) => (
  describe(`given the good CIF ${cif}`, () => {
    it("should be valid", () => {
      expect(isValidCIF(cif)).toBe(valid);
    });
  })
));
