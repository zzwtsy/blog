import { useEffect, useRef, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // 使用 useRef 来存储定时器的 ID，以及最新值。
  const timerRef = useRef<{ id: number | null; latestValue: T }>({
    id: null,
    latestValue: value,
  });

  useEffect(() => {
    // 更新最新值
    timerRef.current.latestValue = value;
    // 如果定时器已存在，则清除并重新设置
    if (timerRef.current.id) {
      window.clearTimeout(timerRef.current.id);
      timerRef.current.id = window.setTimeout(() => {
        setDebouncedValue(timerRef.current.latestValue);
      }, delay);
    } else {
      // 如果定时器不存在，则直接创建
      timerRef.current.id = window.setTimeout(() => {
        setDebouncedValue(timerRef.current.latestValue);
      }, delay);
    }

    // 组件卸载时清除定时器
    return () => {
      if (timerRef.current.id) {
        window.clearTimeout(timerRef.current.id);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
