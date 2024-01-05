import React from 'react';
import { useSpring, animated } from 'react-spring';

import './LandingPage.css';

const LandingPage = () => {
    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: { duration: 1000 },
    });

    const slideIn = useSpring({
        transform: 'translateY(0)',
        from: { transform: 'translateY(100px)' },
        config: { duration: 1000 },
    });

    // Replace 'Your App Name' with your actual app name
    const appName = 'Demeter AI';

    return (
        <div className="landing-page">
            <header>
                <h1>
                    <animated.span className="shining-text">
                        {appName}
                    </animated.span>
                </h1>
            </header>
            <animated.div style={fadeIn} className="title">
                <h2>
                    Welcome to{' '}
                    <animated.span className="shining-text">
                        {appName}
                    </animated.span>
                </h2>
            </animated.div>
            <animated.div style={slideIn} className="description">
                <p>A Satellite Campus Production 🛰️</p>
            </animated.div>
            <GlowingLeavesBackground />
        </div>
    );
};

const GlowingLeavesBackground = () => {
    const leaves = Array.from({ length: 20 }).map((_, index) => (
        <animated.div key={index} className="leaf" style={generateLeafStyle()}>
            <SparkleTrail />
        </animated.div>
    ));

    return <div className="leaves-container">{leaves}</div>;
};

const SparkleTrail = () => {
    const sparkle = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 500 },
    });

    return <animated.div className="sparkle-trail" style={sparkle} />;
};

const generateLeafStyle = () => ({
    top: `${Math.random() * 100}vh`,
    left: `${Math.random() * 100}vw`,
    opacity: Math.random(),
    transformOrigin: 'center bottom',
    transform: `rotate(${Math.random() * 360}deg) scale(${Math.random() * 0.5 + 0.5})`,
    willChange: 'transform, opacity',
    animation: 'fallingLeaves linear infinite',
    animationDuration: `${Math.random() * 5 + 3}s`,
});

export default LandingPage;