"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

export function useConceptActivity<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.28 });
  const reduced = useReducedMotion() === true;
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    inView,
    reduced,
    width,
    wide: width >= 900,
    motionOn: inView && !reduced,
  };
}
