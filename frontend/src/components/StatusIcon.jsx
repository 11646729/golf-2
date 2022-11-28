import React, { memo } from "react"
import PropTypes from "prop-types"

export const StatusIcon = (props) => {
  const { size, fillColor } = props

  StatusIcon.defaultProps = {
    size: 10,
  }

  StatusIcon.propTypes = {
    size: PropTypes.number.isRequired,
    fillColor: PropTypes.string,
  }

  return (
    // <svg height="10" width="10">
    <svg height={`${size}px`} width={`${size}px`}>
      <circle
        cx="5"
        cy="5"
        r="4"
        // stroke="black"
        // stroke-width="1"
        fill={fillColor}
      />
    </svg>
  )
}

export default memo(StatusIcon)
