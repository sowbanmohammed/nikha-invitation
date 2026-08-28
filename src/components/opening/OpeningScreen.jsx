import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import RibbonKnot from "./RibbonKnot";

export default function OpeningScreen({ onOpen }) {
  const [pullProgress, setPullProgress] = useState(0);
  const [armed, setArmed] = useState(false);

  const openedRef = useRef(false);
  const openingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const intro = gsap.timeline();

      intro.fromTo(
        ".opening-content",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      intro.fromTo(
        ".ribbon-hint",
        {
          opacity: 0,
          y: 8,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.45"
      );
    }, openingRef);

    return () => ctx.revert();
  }, []);

  const handleProgress = (value) => {
    if (openedRef.current) return;

    const safeValue = Math.max(0, Math.min(1, value));

    setPullProgress(safeValue);

    if (safeValue >= 0.92) {
      setArmed(true);
    } else {
      setArmed(false);
    }
  };

  const handleRelease = () => {
    if (openedRef.current) return;

    /*
     * Not pulled enough:
     * bow returns naturally.
     */
    if (pullProgress < 0.92) {
      gsap.to(
        {
          value: pullProgress,
        },
        {
          value: 0,
          duration: 0.35,
          ease: "power2.out",
          onUpdate: function () {
            setPullProgress(this.targets()[0].value);
          },
          onComplete: () => {
            setPullProgress(0);
            setArmed(false);
          },
        }
      );

      return;
    }

    /*
     * OPEN SEQUENCE
     */
    openedRef.current = true;

    const tl = gsap.timeline();

    /*
     * 1. Hide instruction
     */
    tl.to(".ribbon-hint", {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: "power2.in",
    });

    /*
     * 2. Progress line disappears
     */
    tl.to(
      ".progress-track",
      {
        opacity: 0,
        scaleX: 0.5,
        duration: 0.2,
        ease: "power2.in",
      },
      "<"
    );

    /*
     * 3. Bow gets a small final tension
     */
    tl.to(
      ".bow-grip",
      {
        scale: 1.12,
        duration: 0.16,
        ease: "power2.out",
      }
    );

    /*
     * 4. Bow loosens
     */
    tl.to(
      ".bow-loop-left",
      {
        x: -35,
        rotation: -38,
        scale: 0.65,
        opacity: 0,
        duration: 0.42,
        ease: "power3.in",
      },
      "<"
    );

    tl.to(
      ".bow-loop-right",
      {
        x: 35,
        rotation: 38,
        scale: 0.65,
        opacity: 0,
        duration: 0.42,
        ease: "power3.in",
      },
      "<"
    );

    /*
     * 5. Center knot releases
     */
    tl.to(
      ".bow-center",
      {
        scale: 0.7,
        opacity: 0,
        y: -8,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.2"
    );

    /*
     * 6. Ribbon tails fly apart
     */
    tl.to(
      ".ribbon-tail-left",
      {
        x: "-42vw",
        rotation: -10,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
      },
      "-=0.28"
    );

    tl.to(
      ".ribbon-tail-right",
      {
        x: "42vw",
        rotation: 10,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
      },
      "<"
    );

    /*
     * 7. Bow completely disappears
     */
    tl.to(
      ".knot-wrap",
      {
        scale: 0.88,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      },
      "-=0.18"
    );

    /*
     * 8. Hide Bismillah slightly
     */
    tl.to(
      ".arabic-bismillah",
      {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: "power2.in",
      },
      "<"
    );

    /*
     * 9. Door opens
     */
    tl.set(".invitation-door-left", {
      visibility: "visible",
    });

    tl.set(".invitation-door-right", {
      visibility: "visible",
    });

    /*
     * Initial door position
     */
    tl.set(".invitation-door-left", {
      xPercent: 0,
    });

    tl.set(".invitation-door-right", {
      xPercent: 0,
    });

    /*
     * 10. Small pause before reveal
     */
    tl.to({}, {
      duration: 0.08,
    });

    /*
     * 11. LEFT DOOR OPENS
     */
    tl.to(
      ".invitation-door-left",
      {
        xPercent: -100,
        duration: 0.72,
        ease: "power4.inOut",
      },
      "<"
    );

    /*
     * 12. RIGHT DOOR OPENS
     */
    tl.to(
      ".invitation-door-right",
      {
        xPercent: 100,
        duration: 0.72,
        ease: "power4.inOut",
      },
      "<"
    );

    /*
     * 13. Center reveal light
     */
    tl.to(
      ".door-light",
      {
        opacity: 1,
        scale: 1.35,
        duration: 0.42,
        ease: "power2.out",
      },
      "<"
    );

    /*
     * 14. Light settles
     */
    tl.to(
      ".door-light",
      {
        opacity: 0,
        scale: 1.7,
        duration: 0.45,
        ease: "power2.in",
      }
    );

    /*
     * 15. Opening screen disappears
     */
    tl.to(
      ".opening-screen",
      {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
      },
      "-=0.22"
    );

    /*
     * 16. Tell App that opening is complete
     */
    tl.call(() => {
      document.body.classList.add("invitation-opened");

      onOpen();
    });

    /*
     * 17. Remove opening screen after App receives event
     */
    tl.set(".opening-screen", {
      display: "none",
    });
  };

  return (
    <section
      ref={openingRef}
      className="opening-screen fixed inset-0 z-[100] flex min-h-[100svh] items-center justify-center overflow-hidden bg-royal"
    >
      {/* Background */}
      <div className="opening-vignette" />

      <div className="opening-light-aura" />

      {/* Small atmospheric particles */}
      <div className="gold-dust dust-one" />
      <div className="gold-dust dust-two" />
      <div className="gold-dust dust-three" />
      <div className="gold-dust dust-four" />
      <div className="gold-dust dust-five" />

      {/* ================================================= */}
      {/* PALACE / INVITATION DOORS */}
      {/* ================================================= */}

      <div className="invitation-doors">
        <div className="door-light" />

        <div className="invitation-door invitation-door-left">
          <div className="door-inner">
            <div className="door-arch">
              <div className="door-ornament">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="door-gold-line" />
          </div>
        </div>

        <div className="invitation-door invitation-door-right">
          <div className="door-inner">
            <div className="door-arch">
              <div className="door-ornament">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="door-gold-line" />
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* OPENING CONTENT */}
      {/* ================================================= */}

      <div className="opening-content relative z-20 flex w-full max-w-xl flex-col items-center px-6 text-center">
        <p className="arabic-bismillah">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* 🎀 BOW */}
        <div
          className={`ribbon-stage ${
            armed ? "ribbon-armed" : ""
          }`}
        >
          <RibbonKnot
            progress={pullProgress}
            onProgress={handleProgress}
            onRelease={handleRelease}
          />
        </div>

        {/* Instruction */}
        <p className="ribbon-hint mt-5">
          {armed
            ? "Release to open the invitation"
            : "Pull the ribbon to open"}
        </p>

        {/* Progress */}
        <div
          className="progress-track mt-4"
          aria-hidden="true"
        >
          <div
            className="progress-fill"
            style={{
              width: `${pullProgress * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}