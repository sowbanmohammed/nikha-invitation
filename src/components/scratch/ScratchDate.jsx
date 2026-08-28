import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import weddingData from "../../data/weddingData";

const WIDTH = 520;
const HEIGHT = 310;

export default function ScratchDate({ onRevealed }) {
  const canvasRef = useRef(null);
  const scratchingRef = useRef(false);
  const revealedRef = useRef(false);

  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const ctx = canvas.getContext("2d");

    ctx.scale(dpr, dpr);

    const gradient = ctx.createLinearGradient(
      0,
      0,
      WIDTH,
      HEIGHT
    );

    gradient.addColorStop(0, "#d2ad55");
    gradient.addColorStop(0.45, "#8c6b2f");
    gradient.addColorStop(1, "#e3c777");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    /* Satin-like diagonal texture */
    ctx.strokeStyle = "rgba(255,245,215,.22)";
    ctx.lineWidth = 1;

    for (let x = 0; x < WIDTH; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + HEIGHT, HEIGHT);
      ctx.stroke();
    }

    /* Scratch text */
    ctx.fillStyle = "rgba(18,35,29,.9)";
    ctx.textAlign = "center";

    ctx.font = "600 16px Georgia";

    ctx.fillText(
      "SCRATCH TO REVEAL",
      WIDTH / 2,
      HEIGHT / 2 - 8
    );

    ctx.font = "italic 13px Georgia";

    ctx.fillStyle = "rgba(18,35,29,.7)";

    ctx.fillText(
      "our special date",
      WIDTH / 2,
      HEIGHT / 2 + 20
    );

    return () => {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };
  }, []);

  const scratch = (e) => {
    const canvas = canvasRef.current;

    if (!canvas || revealedRef.current) return;

    const rect = canvas.getBoundingClientRect();

    const source = e.touches?.[0] || e;

    const x =
      ((source.clientX - rect.left) / rect.width) *
      WIDTH;

    const y =
      ((source.clientY - rect.top) / rect.height) *
      HEIGHT;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      2
    );

    const ctx = canvas.getContext("2d");

    ctx.save();

    ctx.globalCompositeOperation =
      "destination-out";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      34,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();

    if (Math.random() < 0.08) {
      checkPercent(ctx, dpr);
    }
  };

  const checkPercent = (ctx, dpr) => {
    const sample = ctx.getImageData(
      0,
      0,
      WIDTH * dpr,
      HEIGHT * dpr
    ).data;

    let transparent = 0;

    const step = 24;

    for (
      let i = 3;
      i < sample.length;
      i += 4 * step
    ) {
      if (sample[i] < 80) {
        transparent++;
      }
    }

    const ratio =
      transparent /
      (sample.length / (4 * step));

    if (ratio > 0.72) {
      reveal();
    }
  };

  const reveal = () => {
    if (revealedRef.current) return;

    revealedRef.current = true;

    setRevealed(true);

    onRevealed?.();

    gsap
      .timeline()
      .to(".scratch-canvas", {
        opacity: 0,
        scale: 1.04,
        duration: 0.35,
        ease: "power2.in",
      })
      .fromTo(
        ".date-reveal",
        {
          opacity: 0,
          scale: 0.65,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "back.out(2)",
        }
      )
      .add(() => {
        burstConfetti();
      });
  };

  const burstConfetti = () => {
    const layer =
      document.querySelector(".confetti-layer");

    if (!layer) return;

    for (let i = 0; i < 80; i++) {
      const piece =
        document.createElement("span");

      piece.className =
        "confetti-piece";

      piece.style.left = "50%";
      piece.style.top = "48%";

      piece.style.setProperty(
        "--x",
        `${(Math.random() - 0.5) * 100}vw`
      );

      piece.style.setProperty(
        "--y",
        `${(Math.random() - 0.5) * 90}vh`
      );

      piece.style.setProperty(
        "--r",
        `${Math.random() * 720 - 360}deg`
      );

      piece.style.setProperty(
        "--d",
        `${0.7 + Math.random() * 0.9}s`
      );

      layer.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 1900);
    }
  };

  return (
    <section className="scratch-section relative flex min-h-[100svh] items-center justify-center overflow-hidden">

      {/* Confetti */}
      <div className="confetti-layer" />

      <div className="relative z-10 w-full max-w-3xl px-6 text-center">

        {/* Section Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.p
            className="eyebrow"
            initial={{
              opacity: 0,
              letterSpacing: "0.05em",
            }}
            whileInView={{
              opacity: 1,
              letterSpacing: "0.32em",
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
            }}
          >
            A little surprise
          </motion.p>

          <motion.h2
            className="section-title mt-4"
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            Something special is waiting
          </motion.h2>

          <motion.p
            className="section-copy mx-auto mt-5 max-w-lg"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.9,
              delay: 0.3,
            }}
          >
           
          </motion.p>
        </motion.div>

        {/* Scratch Card */}
        <motion.div
          className={`scratch-card mx-auto mt-12 ${
            revealed ? "revealed" : ""
          }`}
          initial={{
            opacity: 0,
            y: 70,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 1.2,
            delay: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={
            !revealed
              ? {
                  y: -6,
                  scale: 1.015,
                  transition: {
                    duration: 0.3,
                  },
                }
              : {}
          }
        >
          {/* Date */}
          <motion.div
            className="date-underlay"
            animate={
              revealed
                ? {
                    scale: 1,
                  }
                : {
                    scale: 0.98,
                  }
            }
            transition={{
              duration: 0.8,
            }}
          >
            <p className="small-label">
              THE NIKAH
            </p>

            <div className="date-number">
              18
            </div>

            <div className="date-month">
              OCTOBER 2026
            </div>
          </motion.div>

          {/* Scratch Canvas */}
          <canvas
            ref={canvasRef}
            className="scratch-canvas absolute inset-0 z-20 touch-none"
            onPointerDown={(e) => {
              scratchingRef.current = true;

              e.currentTarget.setPointerCapture?.(
                e.pointerId
              );

              scratch(e);
            }}
            onPointerMove={(e) =>
              scratchingRef.current &&
              scratch(e)
            }
            onPointerUp={(e) => {
              scratchingRef.current = false;

              e.currentTarget.releasePointerCapture?.(
                e.pointerId
              );
            }}
            onPointerCancel={() => {
              scratchingRef.current = false;
            }}
            onTouchMove={scratch}
          />
        </motion.div>

        {/* Countdown */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              className="countdown-card mt-12"
              initial={{
                opacity: 0,
                y: 50,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 30,
              }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.p
                className="small-label"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.2,
                }}
              >
                COUNTING DOWN TO THEIR NIKAH
              </motion.p>

              <Countdown />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Countdown() {
  const [left, setLeft] =
    useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    ["Days", left.days],
    ["Hours", left.hours],
    ["Minutes", left.minutes],
    ["Seconds", left.seconds],
  ];

  return (
    <div className="countdown-grid">
      {items.map(([label, value]) => (
        <motion.div
          key={label}
          className="countdown-item"
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <motion.strong
            key={value}
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            {String(value).padStart(2, "0")}
          </motion.strong>

          <span>{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function getTimeLeft() {
  const target = new Date(
    "2026-10-18T19:00:00+05:30"
  ).getTime();

  const diff = Math.max(
    0,
    target - Date.now()
  );

  const days = Math.floor(
    diff / 86400000
  );

  const hours = Math.floor(
    (diff / 3600000) % 24
  );

  const minutes = Math.floor(
    (diff / 60000) % 60
  );

  const seconds = Math.floor(
    (diff / 1000) % 60
  );

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}