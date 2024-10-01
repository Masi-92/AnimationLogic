import { useEffect } from "react";
import { gsap } from "gsap";
import data from "../data/data.json";

const StepAnimation = ({
  order,
  detailsEven,
  setDetailsEven,
  updateDetails,
}) => {
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";

  useEffect(() => {
    let isMounted = true; // Track if component is mounted
    const animateStep = async () => {
      while (isMounted) {
        const activeIndex = order[0]; // Assuming order is an array

        // Update details
        updateDetails(activeIndex, detailsActive);
        gsap.set(detailsActive, { zIndex: 22 });

        // Animate active details
        await gsap.to(detailsActive, {
          opacity: 1,
          duration: 0.4,
          ease: "sine.inOut",
        });

        await Promise.all([
          gsap.to(`${detailsActive} .text`, {
            y: 0,
            duration: 0.7,
            ease: "sine.inOut",
            delay: 0.1,
          }),
          gsap.to(`${detailsActive} .title1`, {
            y: 0,
            duration: 0.7,
            ease: "sine.inOut",
            delay: 0.15,
          }),
          gsap.to(`${detailsActive} .title2`, {
            y: 0,
            duration: 0.7,
            ease: "sine.inOut",
            delay: 0.15,
          }),
          gsap.to(`${detailsActive} .desc`, {
            y: 0,
            duration: 0.7,
            ease: "sine.inOut",
            delay: 0.2,
          }),
        ]);

        // Animate inactive details
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
        await gsap.to(detailsInactive, {
          opacity: 0,
          duration: 0.5,
          ease: "sine.inOut",
        });

        // Toggle detailsEven state
        setDetailsEven((prev) => !prev);
      }
    };

    animateStep();

    return () => {
      isMounted = false; // Cleanup on unmount
    };
  }, [order, detailsEven, setDetailsEven, updateDetails]);

  return null; // This component does not render anything
};

export default StepAnimation;
