export const setComponentRefs =
  <T>(
    ref: React.MutableRefObject<T | null>,
    forwardedRef: React.ForwardedRef<T>
  ) =>
  (el: T) => {
    ref.current = el;
    if (typeof forwardedRef === 'function') forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };
