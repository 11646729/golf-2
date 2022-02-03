import React, { memo } from "react"
import axios from "axios"

import styled from "styled-components"

const ThreeRingsContainer = styled.div`
  display: flex;
`

function ThreeRingsPage() {
  console.log("here")
  // --------------------------------------------------------------
  // CODE FOR SAMARITANS
  // Attempt to load today's shifts
  // axios
  //   .get("https://www.3r.org.uk/stats/export_rotas.json", {
  //     headers: {
  //       Authorization: "APIKEY mXdvaUQjLxAeO9ixqSuMyQtt",
  //     },
  //   })
  //   .then((res) => {
  //     console.log("Success")
  //     console.log(res.data)
  //   })
  //   .catch((error) => {
  //     console.log("Error :" + error)
  //   })
  // --------------------------------------------------------------

  return <ThreeRingsContainer></ThreeRingsContainer>
}

export default memo(ThreeRingsPage)
