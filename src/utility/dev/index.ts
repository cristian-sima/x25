/* eslint-disable no-alert, no-console, no-undefined, callback-return */
import * as Immutable from "immutable";
import { words } from "..";

type Log = { data : any, state : any, key : string};

const setFavIconToDev = () => {
    const element: any = document.querySelector("link[rel*='icon");

    if (element !== null && element.href) {
      element.href = "/static/dev.ico";
    }
  },

  ensureImmutableState = (ignored: Array<any> = []) => {
    const
      ignore = (key: string) => ignored.includes(key),
      isGood = (data : any, key : string) => (
        ignore(key) ||
        data === null ||
        data === undefined ||
        Immutable.isImmutable(data) ||
        typeof data === "number" ||
         typeof data === "boolean" ||
          typeof data === "string"
      );

    let
      problems: any = Immutable.Map(),
      allKeys = Immutable.List(),
      currentKey = Immutable.List();

    const
      listCurrentProblems = () => {
        if (currentKey.size !== 0) {
          const
            log = ({ data, state, key } : Log) => {
              const itExists = (
                typeof data !== "undefined" ||
              typeof state !== "undefined" ||
               typeof key !== "undefined"
              );

              if (itExists) {
                console.group("redux-ensure-state-is-immutable");
                console.log("data:", data);
                console.log("parent:", state.toJS());
                console.log("typeof data:", typeof data);
                console.log("key:", key);
                console.groupEnd();
              }
            };

          alert(words.SomethingIsNotImmutable);
          currentKey.map((current) => log(problems.get(current)));
          currentKey = currentKey.clear();
        }
      },

      addProblem = ({ data, state, key } : Log) => {
        problems = problems.set(key, {
          key,
          state,
          data,
        });

        if (!allKeys.includes(key)) {
          allKeys = allKeys.push(key);
          currentKey = currentKey.push(key);
        }
      },

      shouldParse = (data : any, key : string) => !ignore(key) && Immutable.isImmutable(data),

      checkStateContainsOnlyImmutable = (state : any) => {
        const parse = (data : any, key : string) => {
          const goodData = isGood(data, key),
            canParse = shouldParse(data, key);

          if (!goodData) {
            addProblem({
              data,
              state,
              key,
            });
          }

          listCurrentProblems();

          if (canParse) {
            checkStateContainsOnlyImmutable(data);
          }
        };

        state.forEach((current : string, key : string) => {
          parse(current, key);
        });
      };

    return ({ getState }: any) => (next: any) => (action: any) => {
      const returnValue = next(action),
        state = getState();

      checkStateContainsOnlyImmutable(state);
      return returnValue;
    };
  };

export { setFavIconToDev, ensureImmutableState };
