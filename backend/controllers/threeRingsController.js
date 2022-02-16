import axios from "axios"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:4000/api/threerings/
// -------------------------------------------------------
export var index = (req, res) => {
  res.send({ response: "Three Rings Route Catalog home page" }).status(200)
}

// -----------------------------------------------------
// Fetch Three Rings Shifts Data
// Path:
// -----------------------------------------------------
export const getThreeRingsShiftsData = async (req, res) => {
  const apiKey = process.env.THREE_RINGS_API_KEY

  let resultData = await axios({
    url: "https://www.3r.org.uk/stats/export_rotas.json",
    method: "GET",
    timeout: 8000,
    headers: {
      Authorization: apiKey,
    },
  })

  res.send(resultData.data)
}

// -----------------------------------------------------
// Fetch Three Rings News Data
// Path:
// -----------------------------------------------------
export const getThreeRingsNewsData = async (req, res) => {
  const apiKey = process.env.THREE_RINGS_API_KEY

  let resultData = await axios({
    url: "https://www.3r.org.uk/news.json",
    method: "GET",
    timeout: 8000,
    headers: {
      Authorization: apiKey,
    },
  })

  res.send(resultData.data)
}

// -----------------------------------------------------
// Fetch Three Rings Events Data
// Path:
// -----------------------------------------------------
export const getThreeRingsEventsData = async (req, res) => {
  const apiKey = process.env.THREE_RINGS_API_KEY

  let resultData = await axios({
    url: "https://www.3r.org.uk/events.json",
    method: "GET",
    timeout: 8000,
    headers: {
      Authorization: apiKey,
    },
  })

  res.send(resultData.data)
}
