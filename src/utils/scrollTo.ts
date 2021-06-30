const scrollTo = (list: React.RefObject<HTMLDivElement>, idx: number) => {
  if (!list.current) {
    return;
  }
  const currEl = list.current.childNodes[idx] as HTMLElement;
  list.current.scrollTo(0, currEl.offsetTop);
};

export default scrollTo