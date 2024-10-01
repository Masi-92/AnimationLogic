import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// Dummy Daten (ersetze dies durch den Import deiner tatsächlichen Daten)


const Landing: React.FC = () => {
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [detailsEven, setDetailsEven] = useState<boolean>(true);
  const demoRef = useRef<HTMLDivElement>(null);
  const slideNumbersRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const [active, ...rest] = order;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
    const { innerHeight: height, innerWidth: width } = window;

    const offsetTop = height - 430;
    const offsetLeft = width - 830;

    gsap.set(paginationRef.current, {
      top: offsetTop + 330,
      left: offsetLeft,
      y: 200,
      opacity: 0,
      zIndex: 60,
    });
    gsap.set("nav", { y: -200, opacity: 0 });

    gsap.set(`#card${active}`, {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    gsap.set(`#card-content-${active}`, { x: 0, y: 0, opacity: 0 });
    gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
    gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
    gsap.set(`${detailsInactive} .text`, { y: 100 });
    gsap.set(`${detailsInactive} .title-1`, { y: 100 });
    gsap.set(`${detailsInactive} .title-2`, { y: 100 });
    gsap.set(`${detailsInactive} .desc`, { y: 50 });

    gsap.set(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
    });

    rest.forEach((i, index) => {
      gsap.set(`#card${i}`, {
        x: offsetLeft + 400 + index * (200 + 40),
        y: offsetTop,
        width: 200,
        height: 300,
        zIndex: 30,
        borderRadius: 10,
      });
      gsap.set(`#card-content-${i}`, {
        x: offsetLeft + 400 + index * (200 + 40),
        zIndex: 40,
        y: offsetTop + 300 - 100,
      });
      gsap.set(`#slide-item-${i}`, { x: (index + 1) * 50 });
    });

    gsap.set(".indicator", { x: -window.innerWidth });

    const startDelay = 0.6;

    gsap.to(coverRef.current, {
      x: width + 400,
      delay: 0.5,
      ease: "sine.inOut",
      onComplete: () => {
        setTimeout(() => {
          loop();
        }, 500);
      },
    });
    rest.forEach((i, index) => {
      gsap.to(`#card${i}`, {
        x: offsetLeft + index * (200 + 40),
        zIndex: 30,
        delay: 0.05 * index,
        ease: "sine.inOut",
        delay: startDelay,
      });
      gsap.to(`#card-content-${i}`, {
        x: offsetLeft + index * (200 + 40),
        zIndex: 40,
        delay: 0.05 * index,
        ease: "sine.inOut",
        delay: startDelay,
      });
    });
    gsap.to(paginationRef.current, { y: 0, opacity: 1, ease: "sine.inOut", delay: startDelay });
    gsap.to("nav", { y: 0, opacity: 1, ease: "sine.inOut", delay: startDelay });
    gsap.to(detailsActive, { opacity: 1, x: 0, ease: "sine.inOut", delay: startDelay });
  };

  const step = () => {
    return new Promise((resolve) => {
      setOrder((prev) => {
        const newOrder = [...prev.slice(1), prev[0]];
        return newOrder;
      });
      setDetailsEven((prev) => !prev);

      const detailsActive = detailsEven ? "#details-even" : "#details-odd";
      const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

      // Update the text content of the active details
      const activeIndex = order[0];
      document.querySelector(`${detailsActive} .place-box .text`).textContent = data[activeIndex].place;
      document.querySelector(`${detailsActive} .title-1`).textContent = data[activeIndex].title;
      document.querySelector(`${detailsActive} .title-2`).textContent = data[activeIndex].title2;
      document.querySelector(`${detailsActive} .desc`).textContent = data[activeIndex].description;

      gsap.set(detailsActive, { zIndex: 22 });
      gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease: "sine.inOut" });
      gsap.to(`${detailsActive} .text`, {
        y: 0,
        delay: 0.1,
        duration: 0.7,
        ease: "sine.inOut",
      });
      gsap.to(`${detailsActive} .title-1`, {
        y: 0,
        delay: 0.15,
        duration: 0.7,
        ease: "sine.inOut",
      });
      gsap.to(`${detailsActive} .title-2`, {
        y: 0,
        delay: 0.15,
        duration: 0.7,
        ease: "sine.inOut",
      });
      gsap.to(`${detailsActive} .desc`, {
        y: 0,
        delay: 0.3,
        duration: 0.4,
        ease: "sine.inOut",
      });

      gsap.set(detailsInactive, { zIndex: 12 });

      const [active, ...rest] = order;
      const prv = rest[rest.length - 1];

      gsap.set(`#card${prv}`, { zIndex: 10 });
      gsap.set(`#card${active}`, { zIndex: 20 });
      gsap.to(`#card${prv}`, { scale: 1.5, ease: "sine.inOut" });

      gsap.to(`#card-content-${active}`, {
        y: 300 - 10,
        opacity: 0,
        duration: 0.3,
        ease: "sine.inOut",
      });
      gsap.to(`#slide-item-${active}`, { x: 0, ease: "sine.inOut" });
      gsap.to(`#slide-item-${prv}`, { x: -50, ease: "sine.inOut" });

      gsap.to(`#card${active}`, {
        x: 0,
        y: 0,
        ease: "sine.inOut",
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        onComplete: () => {
          const xNew = 700 + (rest.length - 1) * (200 + 40);
          gsap.set(`#card${prv}`, {
            x: xNew,
            y: 0,
            width: 200,
            height: 300,
            zIndex: 30,
            borderRadius: 10,
            scale: 1,
          });

          gsap.set(`#card-content-${prv}`, {
            x: xNew,
            y: 300 - 100,
            opacity: 1,
            zIndex: 40,
          });
          gsap.set(`#slide-item-${active}`, { x: -50 });
          resolve(true);
        },
      });
    });
  };

  const loop = async () => {
    while (true) {
      await step();
    }
  };

  return (
    <div ref={demoRef} className="main-container">
      <div ref={coverRef} className="cover" />
      <div ref={paginationRef} className="pagination">
        <div className="progress">
          <div className="progress-sub-background"></div>
          <div className="progress-sub-foreground"></div>
        </div>
      </div>
      <nav>
        <h1>Explore the World</h1>
      </nav>

      {order.map((index) => (
        <div key={index} id={`card${index}`} className="card">
          <div id={`card-content-${index}`} className="card-content">
            <img src={data[index].image} alt={data[index].place} />
          </div>
        </div>
      ))}

      <div id="details-even" className="details-even">
        <div className="place-box">
          <div className="text"></div>
        </div>
        <div className="title-1"></div>
        <div className="title-2"></div>
        <div className="desc"></div>
      </div>

      <div id="details-odd" className="details-odd">
        <div className="place-box">
          <div className="text"></div>
        </div>
        <div className="title-1"></div>
        <div className="title-2"></div>
        <div className="desc"></div>
      </div>

      <div className="slide-indicators">
        {order.map((index) => (
          <div key={index} className="indicator" id={`slide-item-${index}`}></div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
