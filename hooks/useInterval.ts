import React, { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef() as React.MutableRefObject<() => void>;

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick(): void {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return (): void => clearInterval(id);
    }
  }, [delay]);
};
