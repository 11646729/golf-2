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
    <svg height={`${size}px`} width={`${size}px`}>
      <circle cx={`${size / 2}`} cy={`${size / 2}`} r="4" fill={fillColor} />
    </svg>
  )
}

export default memo(StatusIcon)
