

type DataType = {
  Credits: number;
  Months: number;
  companyID: number;
};
  
import * as codes from "../codes";
import { SIDEWORK_APPLICATION } from "../codes";
  
const getDetails = (application : SIDEWORK_APPLICATION, data : DataType) => {
  
  const getParams = () => {
    const { Credits, Months, companyID } = data;
  
    switch (application) {
      case codes.SIDEWORK_APP_SIDENOTE_SMS:
  
        return [
          Credits,
          companyID,
        ];
  
      case codes.SIDEWORK_APP_SIDENOTE_SUBSCRIPTION:
      case codes.SIDEWORK_APP_INVOICES_SUBSCRIPTION:
        return [
          Months,
          companyID,
        ];
  
      default:
        return [];
    }
  };
  
  return `${application}-${getParams().join("-")}`;
};
  
export {
  getDetails,
};
  