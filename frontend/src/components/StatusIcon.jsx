import React, { memo } from "react"
import PropTypes from "prop-types"

export const StatusIcon = (props) => {
  const { fillColor } = props

  StatusIcon.propTypes = {
    fillColor: PropTypes.string,
  }

  return (
    <svg height="10" width="10">
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
