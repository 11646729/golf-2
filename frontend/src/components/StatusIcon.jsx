import React, { memo, useState } from "react"
import PropTypes from "prop-types"

export const StatusIcon = ({ size = 10, initialStatus = true }) => {
  const [circleStatus, setCircleStatus] = useState(initialStatus)

  StatusIcon.propTypes = {
    size: PropTypes.number.isRequired,
    status: PropTypes.bool,
  }

  return (
    <svg
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      height={`${size}px`}
      width={`${size}px`}
      onClick={() => setCircleStatus(!circleStatus)}
    >
      {circleStatus ? (
        //  if true then Green
        <circle cx={`${size / 2}`} cy={`${size / 2}`} r="4" fill="#008000" />
      ) : (
        // if false then Red
        <circle cx={`${size / 2}`} cy={`${size / 2}`} r="4" fill="#ff0000" />
      )}
    </svg>
  )
}

export default memo(StatusIcon)
