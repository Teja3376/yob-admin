"use client"

import Lottie from "lottie-react"

type LottieAnimationProps = {
  animationData: any
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className,
}: LottieAnimationProps) {
  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
      />
    </div>
  )
}