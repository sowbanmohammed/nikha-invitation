import { motion } from "framer-motion";

const duas = [
  {
    arabic:
      "بَارَكَ اللَّهُ لَكُمَا، وَبَارَكَ عَلَيْكُمَا، وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    meaning:
      "May Allah bless you both, shower His blessings upon you, and bring you together in goodness.",
  },
  {
    arabic:
      "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
    meaning:
      "Our Lord, grant us from our spouses and offspring comfort to our eyes and make us an example for the righteous.",
  },
  {
    arabic:
      "اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَارْزُقْهُمَا السَّكِينَةَ وَالْمَوَدَّةَ وَالرَّحْمَةَ",
    meaning:
      "May Allah bless them, bless their union, and grant their home peace, love, mercy and lasting barakah.",
  },
];

export default function DuaSection() {
  return (
    <section className="dua-section relative overflow-hidden">

      {/* Stars */}
      <motion.div
        className="dua-stars"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: false }}
        transition={{ duration: 1.5 }}
      />

      {/* Glow */}
      <motion.div
        className="dua-glow"
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
        }}
        viewport={{
          once: false,
          amount: 0.2,
        }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center">

        <motion.p
          className="eyebrow"
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
            amount: 0.5,
          }}
          transition={{
            duration: 0.9,
          }}
        >
          A Prayer for Their New Beginning
        </motion.p>

        <motion.div
          className="ornament-line mx-auto my-8"
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
          }}
        />

        <div className="space-y-12">

          {duas.map((dua, index) => (
            <motion.article
              key={index}
              className="dua-card"
              initial={{
                opacity: 0,
                y: 70,
                scale: 0.96,
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
                duration: 1,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.p
                className="dua-arabic"
                dir="rtl"
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
                  delay: 0.15,
                }}
              >
                {dua.arabic}
              </motion.p>

              <motion.div
                className="gold-divider"
                initial={{
                  scaleX: 0,
                  opacity: 0,
                }}
                whileInView={{
                  scaleX: 1,
                  opacity: 1,
                }}
                viewport={{
                  once: false,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.25,
                }}
              />

              <motion.p
                className="dua-meaning"
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
                  delay: 0.3,
                }}
              >
                {dua.meaning}
              </motion.p>
            </motion.article>
          ))}

        </div>

        {/* Final blessing */}
        <motion.div
          className="final-blessing mt-24"
          initial={{
            opacity: 0,
            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.35,
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p>May Allah fill their home with</p>

          <motion.h2
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
          >
            Sakīnah · Mawaddah · Rahmah
          </motion.h2>

          <p className="mt-4">
            and bless their journey together with endless barakah.
          </p>

          <motion.div
            className="ameen"
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 1,
              delay: 0.4,
              type: "spring",
              stiffness: 120,
              damping: 12,
            }}
          >
            Ameen
          </motion.div>

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
            }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}