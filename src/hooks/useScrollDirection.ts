"use client";

import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [prevScrollY, setPrevScrollY]         = useState(0);
  const [isVisible, setIsVisible]             = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setIsVisible(true);
        setScrollDirection("up");
        setPrevScrollY(currentScrollY);
        return;
      }

      // スクロール方向を判定
      if (currentScrollY > prevScrollY) {
        // 下にスクロール
        if (scrollDirection !== "down") {
          setScrollDirection("down");
          setIsVisible(false);
        }
      } else {
        // 上にスクロール
        if (scrollDirection !== "up") {
          setScrollDirection("up");
          setIsVisible(true);
        }
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollDirection, prevScrollY]);

  return { scrollDirection, isVisible };
}
