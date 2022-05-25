
import { useEffect } from "react";

  type CheckClickOutsideMenu = {
      menuRef: any;
      buttonRef: any;
      setIsOpen : (value : boolean) => any
    }

export const
  checkClickOutsideMenu = ({ menuRef, buttonRef, setIsOpen } : CheckClickOutsideMenu) => {
    useEffect(() => {
      const handleClickOutside = (event : MouseEvent) => {
        const isClickOutsideButNotOnButton = (
          menuRef.current &&
            !menuRef.current.contains(event.target) &&
            !buttonRef.current.contains(event.target)
        );

        if (isClickOutsideButNotOnButton) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [menuRef, buttonRef]);
  };

