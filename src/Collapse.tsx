/* eslint-disable no-undefined */
import React, { useEffect, useRef, useState } from "react";

type CollapseProps = {
    open?: boolean;
    children: any;
    contentClassName: string;
  }

const Collapse = ({ open, children, contentClassName } : CollapseProps) => {

  const
    contentContainerClassName = "collapsible-content-padding-edonec",

    [visibleTimeout, setVisibleTimeout] = useState(0),
    [overflow, setOverflow] = useState(open ? "hidden" : "visible"),

    [isOpen, setIsOpen] = useState(open),
    [height, setHeight] = useState<number | undefined>(open ? undefined : 0),

    ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (!height || !isOpen || !ref.current) {
      return undefined;
    }
    const resizeObserver = new ResizeObserver((element) => {
      setHeight(element[0].contentRect.height);
    });

    resizeObserver.observe(ref.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [height, isOpen]);


  useEffect(() => {
    clearTimeout(visibleTimeout);

    const delay = 100;

    setOverflow("hidden");

    if (isOpen) {
      setHeight(ref.current?.getBoundingClientRect().height);
    } else {
      setHeight(0);
    }

    const theTimeout : any = setTimeout(() => {
      if (isOpen) {
        setOverflow("visible");
      }
    }, delay);

    setVisibleTimeout(theTimeout);

    return () => {
      clearTimeout(visibleTimeout);
    };

  }, [isOpen]);

  return (
    <div
      className={`collapsible-content-edonec ${contentClassName}`} style={{ height,
        overflow }}>
      <div className={contentContainerClassName} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Collapse;
