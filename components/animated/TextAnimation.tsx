"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface DecryptTextProps {
  text: string;
  trigger?: boolean;
  className?: string;
  style?: React.CSSProperties;
  flickerIntervalMs?: number;
  revealDelayMs?: number;
  trailSize?: number;
  revealBatch?: number;
  startDelayMs?: number;
}

const DEFAULT_CHARSET =
  "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω·⟐⚔ϟϡ";

const randChar = () =>
  DEFAULT_CHARSET[Math.floor(Math.random() * DEFAULT_CHARSET.length)];

export default function DecryptText({
  text,
  trigger = true,
  className = "",
  flickerIntervalMs = 50,
  revealDelayMs = 90,
  trailSize = 6,
  revealBatch = 2,
  startDelayMs = 0,
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState("".padEnd(text.length, " "));
  const [charStates, setCharStates] = useState<
    ("hidden" | "active" | "revealed")[]
  >(Array(text.length).fill("hidden"));

  const revealedRef = useRef<boolean[]>([]);
  const activeRef = useRef<boolean[]>([]);
  const activeQueueRef = useRef<number[]>([]);
  const headRef = useRef<number>(0);

  const flickerRef = useRef<number | null>(null);
  const advanceRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!trigger) {
      if (flickerRef.current) {
        clearInterval(flickerRef.current);
        flickerRef.current = null;
      }
      if (advanceRef.current) {
        clearInterval(advanceRef.current);
        advanceRef.current = null;
      }
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
      setDisplayText("".padEnd(text.length, " "));
      setCharStates(Array(text.length).fill("hidden"));
      return;
    }

    startTimeoutRef.current = window.setTimeout(() => {
      revealedRef.current = Array.from(
        { length: text.length },
        (_, i) => text[i] === " ",
      );
      activeRef.current = Array(text.length).fill(false);
      activeQueueRef.current = [];
      headRef.current = 0;
      setDisplayText("".padEnd(text.length, " "));

      const syncCharStates = () => {
        setCharStates(
          Array.from({ length: text.length }, (_, i) =>
            revealedRef.current[i]
              ? "revealed"
              : activeRef.current[i]
                ? "active"
                : "hidden",
          ),
        );
      };

      const activateNext = () => {
        while (
          activeQueueRef.current.length < trailSize &&
          headRef.current < text.length
        ) {
          if (text[headRef.current] === " ") {
            revealedRef.current[headRef.current] = true;
            headRef.current++;
            continue;
          }
          activeRef.current[headRef.current] = true;
          activeQueueRef.current.push(headRef.current);
          headRef.current++;
        }
      };

      const revealSome = () => {
        let c = 0;
        while (c < revealBatch && activeQueueRef.current.length > 0) {
          const idx = activeQueueRef.current.shift()!;
          activeRef.current[idx] = false;
          revealedRef.current[idx] = true;
          c++;
        }
      };

      const maybeFinish = () => {
        if (
          headRef.current >= text.length &&
          activeQueueRef.current.length === 0
        ) {
          setDisplayText(text);
          syncCharStates();

          if (flickerRef.current) {
            clearInterval(flickerRef.current);
            flickerRef.current = null;
          }
          if (advanceRef.current) {
            clearInterval(advanceRef.current);
            advanceRef.current = null;
          }
        }
      };

      flickerRef.current = window.setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((ch, i) =>
              revealedRef.current[i]
                ? ch
                : activeRef.current[i]
                  ? randChar()
                  : " ",
            )
            .join(""),
        );
      }, flickerIntervalMs);

      advanceRef.current = window.setInterval(() => {
        activateNext();
        revealSome();
        syncCharStates();
        maybeFinish();
      }, revealDelayMs);
    }, startDelayMs);

    return () => {
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
      if (flickerRef.current) clearInterval(flickerRef.current);
      if (advanceRef.current) clearInterval(advanceRef.current);
    };
  }, [
    trigger,
    text,
    flickerIntervalMs,
    revealDelayMs,
    trailSize,
    revealBatch,
    startDelayMs,
  ]);

  return (
    <motion.span className={className}>
      {displayText.split("").map((ch, i) => (
        <span
          key={i}
          className="transition-colors duration-150"
          style={{
            color:
              charStates[i] === "active"
                ? "#D4AF37"
                : charStates[i] === "revealed"
                  ? "inherit"
                  : "transparent",
            textShadow:
              charStates[i] === "active"
                ? "0 0 8px rgba(212,175,55,0.9)"
                : "none",
          }}
        >
          {ch}
        </span>
      ))}
    </motion.span>
  );
}
