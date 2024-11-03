export const toTitle = (str: string): string => {
  const transform = (txt: string): string => {
    const firstPart = txt.charAt(0).toUpperCase(),
      secondPart = txt.substr(1).toLowerCase();

    return `${firstPart}${secondPart}`;
  };

  return str.replace(/\S+/gu, transform);
};
// this is an example ---> This is an example
export const firstToUppercase = (str: string): string => {
  const firstPart = str.charAt(0).toUpperCase(),
    secondPart = str.slice(1);

  return `${firstPart}${secondPart}`;
};

// This is ---> THIS IS
export const toUpper = (str: string): string => String(str ? str : "").toUpperCase();
// This is ---> this is
export const toLower = (str: string): string => String(str ? str : "").toLowerCase();