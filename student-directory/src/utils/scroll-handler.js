export function handleScrollDebounced(e, currentPage, setCurrentPage, scrollDebounceRef) {
  const el = e.currentTarget;
  const width = el.clientWidth;

  if (scrollDebounceRef.current) clearTimeout(scrollDebounceRef.current);

  scrollDebounceRef.current = setTimeout(() => {
    const pageIndex = Math.round(el.scrollLeft / Math.max(1, width));
    if (pageIndex !== currentPage) setCurrentPage(pageIndex);
  }, 120);
}