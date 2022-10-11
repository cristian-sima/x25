import React, { useState, useEffect, createContext, useContext } from "react";

// type BreakPoints = {
//   hideMenu : boolean;
// }

  type BreakpointProviderProps = {
    children: any;
    queries: any;
  }

export type Queries = {
  [key in keyof typeof mainQueries] : boolean;
}

const
  defaultValue = {} as Queries,
  BreakpointContext = createContext(defaultValue);

export const
  mainQueries = {
    sm: "(max-width: 576px)",
  // xs : "(max-width: 320px)",
  // md : "(max-width: 1024px)",
  // or : "(orientation: portrait)",
  },
  BreakpointProvider = ({ children, queries } : BreakpointProviderProps) => {
    const [queryMatch, setQueryMatch] = useState({} as Queries);

    useEffect(() => {
      const mediaQueryLists : any = {},
        keys = Object.keys(queries);
      let isAttached = false;

      const handleQueryListener = () => {
        const updatedMatches = keys.reduce((acc : any, media : any) => {
          acc[media] = Boolean(mediaQueryLists[media] && mediaQueryLists[media].matches);
          return acc;
        }, {});

        setQueryMatch(updatedMatches);
      };

      if (window && window.matchMedia) {
        const matches : any = {};

        keys.forEach((media) => {
          if (typeof queries[media] === "string") {
            mediaQueryLists[media] = window.matchMedia(queries[media]);
            matches[media] = mediaQueryLists[media].matches;
          } else {
            matches[media] = false;
          }
        });
        setQueryMatch(matches);
        isAttached = true;
        keys.forEach((media) => {
          if (typeof queries[media] === "string") {
            mediaQueryLists[media].addListener(handleQueryListener);
          }
        });
      }

      return () => {
        if (isAttached) {
          keys.forEach((media) => {
            if (typeof queries[media] === "string") {
              mediaQueryLists[media].removeListener(handleQueryListener);
            }
          });
        }
      };
    }, [queries]);

    return (
      <BreakpointContext.Provider value={queryMatch}>
        {children}
      </BreakpointContext.Provider>
    );
  },
  useBreakpoint = () => {
    const context = useContext(BreakpointContext);

    if (context === defaultValue) {
      throw new Error("useBreakpoint must be used within BreakpointProvider");
    }
    return context;
  };
