import React, { memo } from "react"
import styled from "styled-components"
// import PropTypes from "prop-types"

const StatusIcon = () => {
  // const { connected } = props

  // MyIcon.propTypes = {
  //   connected: PropTypes.bool,
  // }

  return (
    <div
      height="8px"
      width="8px"
      border-radius="50%"
      display="inline-block"
      // background-color: #e38968;
      background-color="#86bb71"
      margin-right="6px"
    />
  )
}

// function Profile() {
//   return (
//     <img
//       src="https://i.imgur.com/MK3eW3As.jpg"
//       alt="Katherine Johnson"
//     />
//   );
// }

export default memo(StatusIcon)
