import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";

import OpeningScreen from "./components/opening/OpeningScreen";
import PalaceSection from "./components/palace/PalaceSection";
import ScratchDate from "./components/scratch/ScratchDate";
import DuaSection from "./components/dua/DuaSection";

import weddingData from "./data/weddingData";

export default function App() {
  const [opened, setOpened] = useState(false);
  const lenisRef = useRef(null);

  /* =========================================================
     LENIS SMOOTH SCROLL
  ========================================================= */

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);
      lenis.destroy();
    };
  }, []);

  /* =========================================================
     OPEN INVITATION
  ========================================================= */

  const handleOpen = () => {
    setOpened(true);

    requestAnimationFrame(() => {
      document.body.classList.add("invitation-opened");

      gsap.to(".opening-screen", {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",

        onComplete: () => {
          const openingScreen =
            document.querySelector(".opening-screen");

          if (openingScreen) {
            openingScreen.classList.add("is-hidden");
          }

          const invitation =
            document.querySelector("#invitation");

          if (invitation) {
            invitation.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        },
      });
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-royal">

      {/* =====================================================
          OPENING SCREEN
      ===================================================== */}

      {!opened && (
        <OpeningScreen onOpen={handleOpen} />
      )}

      {/* =====================================================
          INVITATION
      ===================================================== */}

      <main
        id="invitation"
        className={
          opened
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }
      >

        {/* ===================================================
            BRIDE & GROOM NAME REVEAL
        =================================================== */}

        <section
          className="
            name-reveal
            relative
            flex
            min-h-[100svh]
            w-full
            items-center
            justify-center
            overflow-hidden
          "
        >

          {/* =================================================
              PALACE GLOW
          ================================================= */}

          <motion.div
            className="palace-glow"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.25,
            }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* =================================================
              BACK ARCH
          ================================================= */}

          <motion.div
            className="arch arch-back"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 0.25,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.15,
            }}
            transition={{
              duration: 1.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* =================================================
              FRONT ARCH
          ================================================= */}

          <motion.div
            className="arch arch-front"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 0.12,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            transition={{
              duration: 1.25,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div
            className="
              relative
              z-10
              flex
              min-h-[100svh]
              w-full
              items-center
              justify-center
              px-4
              pb-20
              text-center
            "
          >

            <div
              className="
                flex
                w-full
                flex-col
                items-center
                justify-center
              "
            >

              {/* =================================================
                  BISMILLAH
              ================================================= */}

              <motion.div
                className="
                  mb-6
                  flex
                  w-full
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
                initial={{
                  opacity: 0,
                  y: -35,
                  scale: 0.9,
                  filter: "blur(8px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: false,
                  amount: 0.5,
                }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >

                {/* Arabic */}

                <p
                  dir="rtl"
                  className="
                    font-['Amiri']
                    text-[clamp(1.35rem,4.5vw,2.4rem)]
                    leading-relaxed
                    text-[#dfc27b]
                  "
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>

                {/* English Meaning */}

                <p
                  className="
                    mt-1
                    px-5
                    font-['Cormorant_Garamond']
                    text-[clamp(0.75rem,2vw,1.05rem)]
                    italic
                    tracking-wide
                    text-[#c9c4ae]
                  "
                >
                  In the name of Allah, the Most Gracious,
                  the Most Merciful
                </p>

              </motion.div>

              {/* =================================================
                  EYEBROW
              ================================================= */}

          <motion.div
  className="
    mb-6
    flex
    w-full
    flex-col
    items-center
    justify-center
    text-center
  "
  initial={{
    opacity: 0,
    y: 25,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: false,
    amount: 0.5,
  }}
  transition={{
    duration: 0.9,
    delay: 0.15,
    ease: [0.16, 1, 0.3, 1],
  }}
>
  <span
    className="
      eyebrow
      !mb-1
      !text-[clamp(0.65rem,2.2vw,0.95rem)]
      !tracking-[0.2em]
      leading-relaxed
    "
  >
    With the Blessings of Allah &amp; Our Beloved Families
  </span>

  <span
    className="
      eyebrow
      !mb-0
      !text-[clamp(0.65rem,2.2vw,0.95rem)]
      !tracking-[0.2em]
      leading-relaxed
    "
  >
    We Invite You to Share in the Joy of Our Nikah
  </span>
</motion.div>

              {/* =================================================
                  TOP ORNAMENT
              ================================================= */}

              <motion.div
                className="ornament-line mx-auto mb-8"
                initial={{
                  opacity: 0,
                  scaleX: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scaleX: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.5,
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

              {/* =================================================
                  BRIDE NAME
              ================================================= */}

              <motion.div
                className="
                  flex
                  w-full
                  max-w-[92%]
                  items-baseline
                  justify-center
                  whitespace-nowrap
                  text-center
                "
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.85,
                  filter: "blur(14px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: false,
                  amount: 0.5,
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >

                <span
                  className="
                    royal-name
                    !m-0
                    !text-[clamp(1.2rem,5.5vw,4.5rem)]
                    !leading-none
                    whitespace-nowrap
                  "
                >
                  {weddingData.bride.name}
                </span>
{weddingData.bride.degree && (
  <span
    className="
      ml-1
      whitespace-nowrap
      text-[clamp(0.3rem,1vw,0.6rem)]
      font-medium
      tracking-wide
      text-[#e5c76f]
      sm:ml-2
    "
  >
    ({weddingData.bride.degree})
  </span>
)}

              </motion.div>

              {/* =================================================
                  AMPERSAND
              ================================================= */}

              <motion.div
                className="ampersand"
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  rotate: -25,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.5,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                &amp;
              </motion.div>

              {/* =================================================
                  GROOM NAME
              ================================================= */}

              <motion.div
                className="
                  flex
                  w-full
                  max-w-[92%]
                  items-center
                  justify-center
                  whitespace-nowrap
                  text-center
                "
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.85,
                  filter: "blur(14px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{
                  once: false,
                  amount: 0.5,
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >

                <span
                  className="
                    royal-name
                    !m-0
                    !text-[clamp(1.2rem,5.5vw,4.5rem)]
                    !leading-none
                    whitespace-nowrap
                    text-center
                  "
                >
                  {weddingData.groom.name}
                </span>

              </motion.div>

              {/* =================================================
                  BOTTOM ORNAMENT
              ================================================= */}

              <motion.div
                className="ornament-line mx-auto mt-8"
                initial={{
                  opacity: 0,
                  scaleX: 0,
                }}
                whileInView={{
                  opacity: 1,
                  scaleX: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.45,
                }}
                transition={{
                  duration: 1,
                  delay: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />

            </div>
          </div>

          {/* =================================================
              SCROLL TO DISCOVER
          ================================================= */}

          <motion.div
            className="
              absolute
              bottom-6
              left-0
              z-20
              flex
              w-full
              flex-col
              items-center
              justify-center
              text-center
            "
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 0.8,
              delay: 1.1,
            }}
          >

            <span
              className="
                whitespace-nowrap
                text-[0.62rem]
                uppercase
                tracking-[0.22em]
                text-[#b9b29b]
              "
            >
              Scroll to discover
            </span>

            <motion.span
              className="
                mt-1
                block
                text-xl
                text-[#d5b866]
              "
              animate={{
                y: [0, 7, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ↓
            </motion.span>

          </motion.div>

        </section>

        {/* =====================================================
            PALACE
        ===================================================== */}

        <PalaceSection />

        {/* =====================================================
            SCRATCH DATE
        ===================================================== */}

        <ScratchDate />

        {/* =====================================================
            DUA
        ===================================================== */}

        <DuaSection />

      </main>
    </div>
  );
}