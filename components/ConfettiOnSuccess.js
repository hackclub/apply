import ReactCanvasConfetti from 'react-canvas-confetti'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'

function randomInRange(min, max) {
  return Math.random() * (max - min) + min
}

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0
}

export default function ConfettiOnSuccess({ applicationStatus }) {
  const refAnimationInstance = useRef(null)
  const router = useRouter()

  function getFireworkAnimationSettings(originXA, originXB) {
    return {
      startVelocity: 35,
      spread: 360,
      ticks: 100,
      zIndex: 0,
      particleCount: 100,
      origin: {
        x: randomInRange(originXA, originXB),
        y: Math.random()
      }
    }
  }

  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance
  }, [])

  const nextFireworkTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getFireworkAnimationSettings(0.2, 0.3))
      refAnimationInstance.current(getFireworkAnimationSettings(0.7, 0.9))
    }
  }, [])

  useEffect(() => {
    if (applicationStatus !== 'rejected') {
      setTimeout(nextFireworkTickAnimation, 1000)
      setTimeout(nextFireworkTickAnimation, 1800)
      setTimeout(nextFireworkTickAnimation, 2600)
      setTimeout(nextFireworkTickAnimation, 3400)
      setTimeout(nextFireworkTickAnimation, 4200)
    }
  }, [])

  return (
    <>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  )
}
