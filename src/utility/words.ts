import { english } from "./languages/english";
import { romanian } from "./languages/ro";

export let words = english;

export const setLanguage = (language = "english") => {
  switch (language) {
    case "romanian":
      words = romanian;
      break;

    default:
      words = english;
      break;
  }
};

export const years = [
  {
    value : 2018,
    name  : "2018",
  }, {
    value : 2019,
    name  : "2019",
  }, {
    value : 2020,
    name  : "2020",
  }, {
    value : 2021,
    name  : "2021",
  },
];
export const months = [
  {
    value : 0,
    name  : words.Month[0],
  }, {
    value : 1,
    name  : words.Month[1],
  }, {
    value : 2,
    name  : words.Month[2],
  }, {
    value : 3,
    name  : words.Month[3],
  }, {
    value : 4,
    name  : words.Month[4],
  }, {
    value : 5,
    name  : words.Month[5],
  }, {
    value : 6,
    name  : words.Month[6],
  }, {
    value : 7,
    name  : words.Month[7],
  }, {
    value : 8,
    name  : words.Month[8],
  }, {
    value : 9,
    name  : words.Month[9],
  }, {
    value : 10,
    name  : words.Month[10],
  }, {
    value : 11,
    name  : words.Month[11],
  },
];
