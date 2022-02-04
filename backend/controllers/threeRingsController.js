import axios from "axios"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:4000/api/threerings/
// -------------------------------------------------------
export var index = (req, res) => {
  res.send({ response: "Three Rings Route Catalog home page" }).status(200)
}

// -----------------------------------------------------
// Fetch Three Rings Shift Data
// Path:
// -----------------------------------------------------
export const getThreeRingsShiftData = async () => {
  let resultData = await axios({
    url: "https://www.3r.org.uk/stats/export_rotas.json",
    method: "GET",
    timeout: 8000,
    headers: {
      Authorization: "APIKEY mXdvaUQjLxAeO9ixqSuMyQtt",
    },
  })

  console.log(resultData.data) // Good to here
  return resultData.data
}
