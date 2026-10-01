const
  mountedNodes : HTMLDivElement[] = [],
  backHandlers = new Map<HTMLDivElement, () => boolean>(),
  globalNodes = new Set<HTMLDivElement>(),
  readTopNode = () => mountedNodes[mountedNodes.length - 1];

let skippedPopstateCount = 0;

export const
  registerModalWindow = (node : HTMLDivElement, handleBack : () => boolean) => {
    mountedNodes.push(node);
    backHandlers.set(node, handleBack);
  },
  setModalWindowGlobal = (node : HTMLDivElement) => {
    globalNodes.add(node);
  },
  unregisterModalWindow = (node : HTMLDivElement) => {
    const position = mountedNodes.indexOf(node);

    if (position >= 0) {
      mountedNodes.splice(position, 1);
    }

    backHandlers.delete(node);
    globalNodes.delete(node);
  },
  isTopModalWindow = (node : HTMLDivElement | null) => (
    node !== null && readTopNode() === node
  ),
  hasMountedModalWindow = () => mountedNodes.length > 0,
  isTopModalWindowGlobal = () => globalNodes.has(readTopNode()),
  closeTopModalWindowByBack = () => {
    const handleBack = backHandlers.get(readTopNode());

    return typeof handleBack === "function" ? handleBack() : false;
  },
  pushModalHistoryEntry = () => {
    window.history.pushState({ x25Modal: true }, "");
  },
  isModalHistoryEntryCurrent = () => Boolean(window.history.state?.x25Modal),
  popModalHistoryEntry = () => {
    skippedPopstateCount += 1;
    window.history.back();
  },
  consumeSkippedPopstate = () => {
    if (skippedPopstateCount === 0) {
      return false;
    }

    skippedPopstateCount -= 1;

    return true;
  };
