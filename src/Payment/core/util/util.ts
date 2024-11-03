
type DataType = {
  Credits: number;
  Months: number;
  companyID: number;
};
  
import codes, { SIDEWORK_APPLICATION } from "../codes";

const getDetails = (application : SIDEWORK_APPLICATION, data : DataType) => {
  
  const getParams = () => {
    const { Credits, Months, companyID } = data;
  
    switch (application) {
      case codes.SMS_ALERT:
  
        return [
          Credits,
          companyID,
        ];
  
      case codes.SIDENOTE_SUBSCRIPTION:
      case codes.INVOICES_SUBSCRIPTION:
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
  