import ReactCanvasConfetti from "react-canvas-confetti";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router'

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
  };
  
export default function ConfettiOnSuccess({ applicationStatus }) {
    const refAnimationInstance = useRef(null);
    const [intervalId, setIntervalId] = useState();
    const router = useRouter()

  function getFireworkAnimationSettings(originXA, originXB) {
    return {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      particleCount: 30,
      origin: {
        x: randomInRange(originXA, originXB),
        y: Math.random()
      }
    };
  }


  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextFireworkTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getFireworkAnimationSettings(0.2, 0.3));
      refAnimationInstance.current(getFireworkAnimationSettings(0.7, 0.9));
    }
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);
  

  useEffect(() => {
    if (!intervalId) {
      if (applicationStatus !== 'rejected') {
        setIntervalId(setInterval(nextFireworkTickAnimation, 1400));
      }
    }
  }, [])


    return  (
        <>
        <ReactCanvasConfetti 
            refConfetti={getInstance} 
            style={canvasStyles} />
        
      </>
    )
  }