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
    props.bg === "lightgreen" ? "lightgreen" : "red"};

  &:hover {
    background-color: #105b72c2;
    color: white;
    cursor: pointer;
  }
`

const StatusButton = (props) => {
  const { bgcolor, text, onShow } = props

  StatusButton.propTypes = {
    bgcolor: PropTypes.string,
    text: PropTypes.string,
    onShow: PropTypes.func.isRequired,
  }

  return (
    <StyledButton bg={bgcolor} onClick={onShow}>
      {text}
    </StyledButton>
  )
}

export default memo(StatusButton)
