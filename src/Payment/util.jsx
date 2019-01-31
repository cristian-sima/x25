// @flow

const getDetails = (application, data) => {

  const getParams = () => {
    const { Credits, companyID } = data;

    switch (application) {
      case "smsalert":

        return [
          Credits,
          companyID,
        ];
      default:
        return [];
    }
  };

  return `${application}-${getParams().join("-")}`;
};

const info = {
  to      : "S.C. SIDEWORK S.R.L.",
  cif     : "40375263",
  regCom  : "J52/21/2019",
  address : "B-dul Republicii, Bl. B3, Ap. 19, Et. 2, Camera 1 & Camera 2, Bolintin Vale, Giurgiu",

  bankName    : "Banca Transilvania S.A.",
  bankAccount : "RO27 BTRL RONC RT04 8269 9301",
};

export {
  info,
  getDetails,
};
