export const
  FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex=\"-1\"])",
  ].join(", "),
  trapFocus = (event : KeyboardEvent, dialogNode : HTMLDivElement) => {
    const focusable = Array.from(
      dialogNode.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );

    if (focusable.length === 0) {
      event.preventDefault();
      dialogNode.focus();

      return;
    }

    const
      [first] = focusable,
      last = focusable[focusable.length - 1],
      active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };
