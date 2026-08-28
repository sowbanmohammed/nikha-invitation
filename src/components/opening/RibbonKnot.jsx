import { useRef } from "react";

export default function RibbonKnot({
  progress,
  onProgress,
  onRelease,
}) {
  const dragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  const updateFromPointer = (clientX, clientY) => {
    const dx = clientX - startX.current;
    const dy = clientY - startY.current;

    // Pull distance in ANY direction
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Maximum pull distance
    const maxDistance = 190;

    const value = Math.min(1, distance / maxDistance);

    onProgress(value);
  };

  const handlePointerDown = (e) => {
    e.preventDefault();

    dragging.current = true;

    startX.current = e.clientX;
    startY.current = e.clientY;

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging.current) return;

    updateFromPointer(e.clientX, e.clientY);
  };

  const handlePointerUp = (e) => {
    if (!dragging.current) return;

    dragging.current = false;

    e.currentTarget.releasePointerCapture?.(e.pointerId);

    onRelease();
  };

  const handlePointerCancel = (e) => {
    if (!dragging.current) return;

    dragging.current = false;

    e.currentTarget.releasePointerCapture?.(e.pointerId);

    onRelease();
  };

  const pull = progress;

  /*
   * Bow becomes loose while pulling.
   */
  const loopScale = 1 - pull * 0.25;
  const loopRotate = pull * 12;

  /*
   * Ribbon tails stretch outward.
   */
  const tailStretch = 1 + pull * 0.7;

  return (
    <div
      className={`knot-wrap ${
        pull > 0 ? "is-pulling" : ""
      } ${pull >= 0.92 ? "is-ready" : ""}`}
    >
      {/* Shadow underneath bow */}
      <div
        className="ribbon-shadow"
        style={{
          opacity: 0.35 + pull * 0.25,
          transform: `scale(${1 + pull * 0.15})`,
        }}
      />

      {/* LEFT RIBBON TAIL */}
      <div
        className="ribbon-tail ribbon-tail-left"
        style={{
          transform: `
            translateX(${-pull * 45}px)
            scaleX(${tailStretch})
            rotate(${-pull * 5}deg)
          `,
        }}
      >
        <div className="ribbon-tail-highlight" />
      </div>

      {/* RIGHT RIBBON TAIL */}
      <div
        className="ribbon-tail ribbon-tail-right"
        style={{
          transform: `
            translateX(${pull * 45}px)
            scaleX(${tailStretch})
            rotate(${pull * 5}deg)
          `,
        }}
      >
        <div className="ribbon-tail-highlight" />
      </div>

      {/* BOW */}
      <div
        className="bow-grip"
        role="button"
        tabIndex={0}
        aria-label="Pull the ribbon bow to open the invitation"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onProgress(1);
            onRelease();
          }
        }}
      >
        {/* LEFT LOOP */}
        <span
          className="bow-loop bow-loop-left"
          style={{
            transform: `
              rotate(${-18 - loopRotate}deg)
              scale(${loopScale})
            `,
          }}
        >
          <span className="bow-loop-inner" />
          <span className="bow-shine" />
        </span>

        {/* RIGHT LOOP */}
        <span
          className="bow-loop bow-loop-right"
          style={{
            transform: `
              rotate(${18 + loopRotate}deg)
              scale(${loopScale})
            `,
          }}
        >
          <span className="bow-loop-inner" />
          <span className="bow-shine" />
        </span>

        {/* CENTER KNOT */}
        <span
          className="bow-center"
          style={{
            transform: `
              translateX(-50%)
              scale(${1 + pull * 0.12}, ${1 - pull * 0.08})
            `,
          }}
        >
          <span className="bow-center-shine" />
        </span>

        {/* SMALL CENTER THREAD */}
        <span
          className="bow-thread"
          style={{
            opacity: 0.5 + pull * 0.5,
          }}
        />
      </div>

      {/* PULL RING / GLOW */}
      <div
        className="pull-glow"
        style={{
          opacity: 0.12 + pull * 0.3,
          transform: `scale(${1 + pull * 0.8})`,
        }}
      />
    </div>
  );
}