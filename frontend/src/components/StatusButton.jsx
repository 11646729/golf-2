import React, { memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledButton = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  margin: auto;
  display: block;
  color: darkgreen;

  /* The resulting background color will be based on the bg props. */
  background-color: ${(props) =>
    props.bg === "salmon" ? "salmon" : "lightgreen"};

  &:hover {
    background-color: #105b72c2;
    color: white;
    cursor: pointer;
  }
`

const StatusButton = (props) => {
  const { buttonText, status, onShow } = props

  StatusButton.propTypes = {
    buttonText: PropTypes.string,
    status: PropTypes.bool.isRequired,
    onShow: PropTypes.func.isRequired,
  }

  console.log("Status: " + status)

  return (
    <div>
      {status ? (
        <StyledButton bg="salmon" onClick={onShow}>
          {/* {buttonText} */}
          Fetching Data ...
        </StyledButton>
      ) : (
        <StyledButton bg="lightgreen" onClick={onShow}>
          {buttonText}
        </StyledButton>
      )}
    </div>
  )
}

export default memo(StatusButton)
