import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import data from "../data/data.json"; 
import style from "../style/style.module.css";
import StepAnimation from "./StepAnimation"; 

const Landing = () => {
    const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);
    const [detailsEven, setDetailsEven] = useState(true);
    const demoRef = useRef(null);
    const paginationRef = useRef(null);
    const coverRef = useRef(null);

    useEffect(() => {
        init(); // Initialisiere Animationen
    }, []);

    const init = () => {
        const [active, ...rest] = order;
        const detailsActive = detailsEven ? "#details-even" : "#details-odd";
        const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
        const { innerHeight: height, innerWidth: width } = window;

        // Berechnung der Positionen für die Animation
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
        gsap.set(`${detailsInactive} .title1`, { y: 100 });
        gsap.set(`${detailsInactive} .title2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });

        gsap.set(".progressSubForeground", {
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
        gsap.to(paginationRef.current, {
            y: 0,
            opacity: 1,
            ease: "sine.inOut",
            delay: startDelay,
        });
        gsap.to("nav", { y: 0, opacity: 1, ease: "sine.inOut", delay: startDelay });
        gsap.to(detailsActive, {
            opacity: 1,
            x: 0,
            ease: "sine.inOut",
            delay: startDelay,
        });

        // Set initial details
        updateDetails(active, detailsActive);
    };

    const updateDetails = (activeIndex, detailsActive) => {
        if (activeIndex < data.length) {
            const placeText = document.querySelector(`${detailsActive} .place-box .text`);
            const title1Text = document.querySelector(`${detailsActive} .title1`);
            const title2Text = document.querySelector(`${detailsActive} .title2`);
            const descText = document.querySelector(`${detailsActive} .desc`);

            if (placeText) {
                placeText.textContent = data[activeIndex].place;
            }
            if (title1Text) {
                title1Text.textContent = data[activeIndex].title;
            }
            if (title2Text) {
                title2Text.textContent = data[activeIndex].title2;
            }
            if (descText) {
                descText.textContent = data[activeIndex].description;
            }
        } else {
            console.error("Active Index is out of bounds");
        }
    };

    return (
        <div ref={demoRef} className={style.mainContainer}>
            <div ref={coverRef} className={style.cover} />
            <div ref={paginationRef} className={style.pagination}>
                <div className={style.progress}>
                    <div className={style.progressSubBackground}></div>
                    <div className={style.progressSubForeground}></div>
                </div>
            </div>
            <nav>
                <h1>Explore the World</h1>
            </nav>
            {order.map((index) => (
                <div key={index} id={`card${index}`} className={style.card}>
                    <div id={`card-content-${index}`} className={style.cardContent}>
                        <img src={data[index].image} alt={data[index].place} />
                    </div>
                </div>
            ))}
            <div id="details-even" className={style.details}>
                <div className="place-box">
                    <div className="text"></div>
                </div>
                <h2 className="title1"></h2>
                <h2 className="title2"></h2>
                <p className="desc"></p>
            </div>
            <div id="details-odd" className={style.details}>
                <div className="place-box">
                    <div className="text"></div>
                </div>
                <h2 className="title1"></h2>
                <h2 className="title2"></h2>
                <p className="desc"></p>
            </div>

            {/* Hier die StepAnimation-Komponente einfügen */}
            <StepAnimation
                order={order}
                detailsEven={detailsEven}
                setDetailsEven={setDetailsEven}
                updateDetails={updateDetails}
            />
        </div>
    );
};

export default Landing;
