import { useRef } from "react";

export function useDoublePress(onDoublePress: () => void, delay = 300) {
  const lastPressAt = useRef(0);

  return () => {
    const now = Date.now();
    if (now - lastPressAt.current <= delay) {
      lastPressAt.current = 0;
      onDoublePress();
      return;
    }
    lastPressAt.current = now;
  };
}