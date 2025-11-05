import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"

const Canvas = ({ width, height, className }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    let frameCount = 0
    let animationFrameId

    const draw = (ctx, frame) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.fillStyle = "#000000"
      ctx.beginPath()
      ctx.arc(50, 100, 20 * Math.sin(frame * 0.05) ** 2, 0, 2 * Math.PI)
      ctx.fill()
    }

    // Our draw came here
    const render = () => {
      frameCount += frameCount
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
    />
  )
}

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  className: PropTypes.string,
}

export default Canvas
