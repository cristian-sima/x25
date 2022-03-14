import { isValidBankAccount } from "./bank";

const valid = true,
  notValid = false;


const wrong = [
  "",
  "1",
  "111",
  "RO",
  "RO14CECEGR",
  "RO14CECEGR0201RON0269170",
  // "RO14CECEGR0201RON0269171", -- it is good
  "RO14CECEGR0201RON0269172",
  "RO14CECEGR0201RON0269173",
  "RO14CECEGR0201RON0269174",
  "RO14CECEGR0201RON0269175",
  "RO14CECEGR0201RON0269176",
  "RO14CECEGR0201RON0269177",
  "RO14CECEGR0201RON0269178",
  "RO14CECEGR0201RON0269179",
];

wrong.map((iban) => (
  describe(`given the wrong IBAN ${iban}`,
    () => {
      it("should not be valid",
        () => {
          expect(isValidBankAccount(iban)).toBe(notValid);
        });
    })
));

const good = [
  "RO74RZBR0000060001635742",
  "RO20RNCB0146009062650001",
  "RO51BRDE190SV09770651900",
  "RO19RZBR0000060014507080",
  "RO14CECEGR0201RON0269171",
  "RO89RNCB0146009060300001",
  "RO69RNCB0146009053910001",
  "RO32RNCB0148009659280001",
  "RO32RZBR0000060008527863",
  "RO35BRDE190SV17599841900",
  "RO35BRDE190SV17599841900",
  "RO79RZBR0000060013901108",
  "RO61RZBR0000060005489107",
  "RO41CECEGR0230RON0350215",
  "RO25RZBR0000060008522848",
  "RO35RNCB0146127215140001",
  "RO50RZBR0000060006249397",

  "RO74rzbr0000060001635742",

  // other countries
  "AD12 0001 2030 2003 5910 0100",
  "AE07 0331 2345 6789 0123 456",
  "AL47 2121 1009 0000 0002 3569 8741",
  "AT61 1904 3002 3457 3201",
  "AZ21 NABZ 0000 0000 1370 1000 1944",
  "BA39 1290 0794 0102 8494",
  "BE62 5100 0754 7061",
  "BG80 BNBG 9661 1020 3456 78",
  "BH67 BMAG 0000 1299 1234 56",
  "CH93 0076 2011 6238 5295 7",
  "CY17 0020 0128 0000 0012 0052 7600",
  "CZ65 0800 0000 1920 0014 5399",
  "DE89 3704 0044 0532 0130 00",
  "DK50 0040 0440 1162 43",
  "EE38 2200 2210 2014 5685",
  "ES80 2310 0001 1800 0001 2345",
  "FI21 1234 5600 0007 85",
  "FO97 5432 0388 8999 44",
  "FR14 2004 1010 0505 0001 3M02 606",

  /*
   * "GB29 RBOS 6016 1331 9268 19",
   * "GB99 RBOS 1234 5612 3456 78",
   */
  "GE29 NB00 0000 0101 9049 17",
  "GI75 NWBK 0000 0000 7099 453",
  "GL56 0444 9876 5432 10",
  "GR16 0110 1250 0000 0001 2300 695",
  "HR12 1001 0051 8630 0016 0",
  "HU42 1177 3016 1111 1018 0000 0000",
  "IE29 AIBK 9311 5212 3456 78",
  "IL62 0108 0000 0009 9999 999",
  "IS14 0159 2600 7654 5510 7303 39",
  "IT40 S054 2811 1010 0000 0123 456",
  // "JO94 CBJO 0010 0000 0000 0131 0003 02",
  "KW81 CBKU 0000 0000 0000 1234 5601 01",
  "LB62 0999 0000 0001 0019 0122 9114",
  "LI21 0881 0000 2324 013A A",
  "LT12 1000 0111 0100 1000",
  "LU28 0019 4006 4475 0000",
  "LV80 BANK 0000 4351 9500 1",
  "MC93 2005 2222 1001 1223 3M44 555",
  "MD24 AG00 0225 1000 1310 4168",
  "ME25 5050 0001 2345 6789 51",
  "MK072 5012 0000 0589 84",
  "MT84 MALT 0110 0001 2345 MTLC AST0 01S",
  "MU17 BOMM 0101 1010 3030 0200 000M UR",
  "NL39 RABO 0300 0652 64",
  "NO93 8601 1117 947",
  "PK36 SCBL 0000 0011 2345 6702",
  "PL60 1020 1026 0000 0422 7020 1111",
  "PT50 0002 0123 1234 5678 9015 4",
  // "QA58 DOHB 0000 1234 5678 90AB CDEF G",
  "RO49 AAAA 1B31 0075 9384 0000",
  "RS35 2600 0560 1001 6113 79",
  "SA03 8000 0000 6080 1016 7519",
  "SE35 5000 0000 0549 1000 0003",
  "SI56 1910 0000 0123 438",
  "SK31 1200 0000 1987 4263 7541",
  "SM86 U032 2509 8000 0000 0270 100",
  "TN59 1000 6035 1835 9847 8831",
  "TR33 0006 1005 1978 6457 8413 26",
];

good.map((iban) => (
  describe(`given good IBAN ${iban}`,
    () => {
      it("should be valid",
        () => {
          expect(isValidBankAccount(iban)).toBe(valid);
        });
    })
));