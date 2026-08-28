import { motion } from "framer-motion";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeScale = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PalaceSection() {
  return (
    <section className="palace-section relative flex min-h-[100svh] items-center justify-center overflow-hidden">

      {/* =========================
          BACKGROUND
      ========================= */}

      <motion.div
        className="stars"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{
          once: false,
          amount: 0.15,
        }}
        transition={{
          duration: 1.5,
        }}
      />

      <motion.div
        className="moon"
        initial={{
          opacity: 0,
          scale: 0.5,
          x: 40,
        }}
        whileInView={{
          opacity: 0.55,
          scale: 1,
          x: 0,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <motion.div
        className="palace-haze"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 1.8,
        }}
      />

      {/* =========================
          PALACE BUILDING
      ========================= */}

      <motion.div
        className="palace-building"
        variants={fadeScale}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: 0.15,
        }}
      >

        {/* Roof */}
        <motion.div
          className="palace-roof"
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
          }}
          transition={{
            duration: 1,
          }}
        />

        {/* Dome */}
        <motion.div
          className="palace-dome"
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: false,
            amount: 0.15,
          }}
          transition={{
            duration: 1.2,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <span className="dome-crescent">
            ☾
          </span>
        </motion.div>

        {/* Main Arch */}
        <motion.div
          className="palace-arch large-arch"
          initial={{
            opacity: 0,
            scaleY: 0.7,
          }}
          whileInView={{
            opacity: 1,
            scaleY: 1,
          }}
          viewport={{
            once: false,
            amount: 0.15,
          }}
          transition={{
            duration: 1.1,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="inner-arch" />
        </motion.div>

        {/* Left Column */}
        <motion.div
          className="palace-column column-left"
          initial={{
            opacity: 0,
            x: -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.9,
            delay: 0.25,
          }}
        />

        {/* Right Column */}
        <motion.div
          className="palace-column column-right"
          initial={{
            opacity: 0,
            x: 50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.9,
            delay: 0.35,
          }}
        />

        {/* Left Lantern */}
        <motion.div
          className="lantern lantern-left"
          initial={{
            opacity: 0,
            scale: 0.3,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.8,
            delay: 0.55,
          }}
        >
          ✦
        </motion.div>

        {/* Right Lantern */}
        <motion.div
          className="lantern lantern-right"
          initial={{
            opacity: 0,
            scale: 0.3,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.8,
            delay: 0.65,
          }}
        >
          ✦
        </motion.div>
      </motion.div>

      {/* =========================
          CONTENT
      ========================= */}

      <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-24 text-center">

        {/* Eyebrow */}
        <motion.p
          className="eyebrow"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.5,
          }}
        >
          The Nikah
        </motion.p>

        {/* Ornament */}
        <motion.div
          className="ornament-line mx-auto my-7"
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
          }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* Heading */}
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.5,
          }}
        >
          A beautiful beginning awaits
        </motion.h2>

        {/* Description */}
        <motion.p
          className="section-copy mx-auto mt-6 max-w-xl"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.4,
          }}
        >
          With the blessings of our families and the grace of Allah,
          we invite you to join us for this blessed occasion.
        </motion.p>

        {/* =========================
            VENUE CARD
        ========================= */}

        <motion.div
          className="venue-card mt-12"
          initial={{
            opacity: 0,
            y: 80,
            scale: 0.94,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          {/* =========================
              NIKAH
          ========================= */}

          <motion.div
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
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <p className="small-label">
              NIKAH ON
            </p>

            <h3>
              Jamia Masjid, Ambur
            </h3>

            <p className="mosque-subtitle">
              (Big Mosque)
            </p>

            <p className="event-time">
              11:45 AM
            </p>
          </motion.div>

          {/* =========================
              DIVIDER
          ========================= */}

          <motion.div
            className="venue-divider"
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
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
          />

          {/* =========================
              WALIMA
          ========================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 0.9,
              delay: 0.25,
            }}
          >
            <p className="small-label">
              ON THE SAME DAY
            </p>

            <p className="walima-label">
              VALIMA
            </p>

            <h3 className="walima-venue">
              THE TRADE CENTER
            </h3>

            <p className="walima-city">
              AMBUR
            </p>
          </motion.div>

          {/* =========================
              LOCATION BUTTON
          ========================= */}

          <motion.a
            href="https://www.google.com/maps/search/?api=1&query=The+Trade+Center+Ambur"
            target="_blank"
            rel="noreferrer"
            className="gold-button mt-7 inline-flex"
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.94,
            }}
          >
            View Location
          </motion.a>

        </motion.div>
      </div>
    </section>
  );
}