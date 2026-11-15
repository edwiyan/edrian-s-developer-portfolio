import { useCallback } from "react";
import { useLenis } from "lenis/react";

/** Returns a function that smooth-scrolls to an in-page anchor, through Lenis when it is running. */
export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id.replace(/^#/, ""));
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { duration: 1.6 });
      else el.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );
}
