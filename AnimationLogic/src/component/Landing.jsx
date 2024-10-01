import { useEffect, useState } from 'react';
import gsap from 'gsap';
import data from './data.json';  // Importiere die JSON-Daten

const Landing = () => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);
  const [detailsEven, setDetailsEven] = useState(true);
  const cardWidth = 200;
  const cardHeight = 300;
  const gap = 40;

  const init = () => {
    const [active, ...rest] = order;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
    const { innerHeight: height, innerWidth: width } = window;
    const offsetTop = height - 430;
    const offsetLeft = width - 830;

    gsap.set("#pagination", {
      top: offsetTop + 330,
      left: offsetLeft,
      y: 200,
      opacity: 0,
      zIndex: 60
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
    gsap.set(`${detailsInactive} .cta`, { y: 60 });

    gsap.set(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
    });

    rest.forEach((i, index) => {
      gsap.set(`#card${i}`, {
        x: offsetLeft + 400 + index * (cardWidth + gap),
        y: offsetTop,
        width: cardWidth,
        height: cardHeight,
        zIndex: 30,
        borderRadius: 10,
      });
      gsap.set(`#card-content-${i}`, {
        x: offsetLeft + 400 + index * (cardWidth + gap),
        zIndex: 40,
        y: offsetTop + cardHeight - 100,
      });
      gsap.set(`#slide-item-${i}`, { x: (index + 1) * 50 });
    });

    gsap.set(".indicator", { x: -window.innerWidth });

    gsap.to(".cover", {
      x: width + 400,
      delay: 0.5,
      onComplete: () => {
        setTimeout(() => {
          step();
        }, 500);
      },
    });
  };

  const step = () => {
    setOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      newOrder.push(newOrder.shift());
      return newOrder;
    });
    setDetailsEven((prevDetailsEven) => !prevDetailsEven);

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4 });
  };

  useEffect(() => {
    init();
  }, [order]);

  return (
    <div>
      <div className="indicator"></div>
      <nav>
        <div>
          <div className="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <div>Globe Express</div>
        </div>
        <div>
          <div className="active">Home</div>
          <div>Holidays</div>
          <div>Destinations</div>
          <div>Flights</div>
          <div>Offers</div>
          <div>Contact</div>
          <div className="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m0 0a5.25 5.25 0 10-7.425-7.425A5.25 5.25 0 0015 15l6 6z" />
            </svg>
          </div>
          <div className="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25V9m-3 0h10.5M4.5 9v9.75A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25V9m-15 0h15" />
            </svg>
          </div>
        </div>
      </nav>
      <div id="cards">
        {data.map((item, index) => (
          <div key={index} id={`card${index}`} className="card">
            <div
              id={`card-content-${index}`}
              className="card-content"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
          </div>
        ))}
      </div>
      <div id="details-even">
        <div className="place-box">
          <div className="text">{data[order[0]].place}</div>
        </div>
        <div className="title-1">{data[order[0]].title}</div>
        <div className="title-2">{data[order[0]].title2}</div>
        <div className="desc">{data[order[0]].description}</div>
      </div>
      <div id="details-odd">
        {/* This will show the alternate details */}
      </div>
      <div id="pagination">
        <div className="progress-background">
          <div className="progress-sub-foreground"></div>
        </div>
        <div className="slide-numbers">
          {order.map((_, index) => (
            <div key={index} id={`slide-item-${index}`} className="slide-number">
              {index + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="arrow-left" onClick={() => step()}>&larr;</div>
      <div className="arrow-right" onClick={() => step()}>&rarr;</div>
    </div>
  );
};

export default Landing;
