import React from "react";
import { ToastContainer } from "react-toastify";
import "./toast.css";
import ModalRoot from "../Modal/Root";

const
  useTheme = () => {
    const [theme, setTheme] = React.useState<"light" | "dark">(() => (
      document.documentElement.getAttribute("data-bs-theme") === "dark" ? "dark" : "light"
    ));

    React.useEffect(() => {
      const observer = new MutationObserver(() => {
        const current = document.documentElement.getAttribute("data-bs-theme");

        setTheme(current === "dark" ? "dark" : "light");
      });

      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-bs-theme"] });

      return () => observer.disconnect();
    }, []);

    return theme;
  },
  Things = () => {
    const theme = useTheme();

    return (
      <>
        <div className="d-print-none">
          <ToastContainer closeOnClick newestOnTop position="bottom-right" theme={theme} />
        </div>
        <ModalRoot />
      </>
    );
  };

export default Things;
