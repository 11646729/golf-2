import axios from "axios"

// Function to delete old Reduced Route data in the mongodb database
export const deleteOldReducedRoutes = async (req, res) => {
  console.log("Step 1: Delete Reduced Route data in the mongodb database")

  res = await axios({
    url:
      "http://localhost:5000/api/gtfsTransport/deleteReducedRoutesLineStrings",
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
