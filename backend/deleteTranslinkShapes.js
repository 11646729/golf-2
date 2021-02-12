import axios from "axios"

// Function to delete Bus Shapes data in the mongodb database
export const deleteTranslinkShapes = async (req, res) => {
  res = await axios({
    url: "http://localhost:5000/api/translinkTransport/translinkShapes",
    method: "delete",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Test for Status - 200 is a Success response code
  if (res.status === 200) {
    console.log("Html Status " + res.status + ": " + res.data)
  }
}
