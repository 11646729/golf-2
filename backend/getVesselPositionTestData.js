// -------------------------------------------------------
// Find vesselNameUrl from vessels Table from SQLite database
// Path:
// -------------------------------------------------------
export const getVesselPositionTestData = async (req, res) => {
  var longlats = [
    [55.95473, -4.758], // lat, lng
    [55.843985, -4.9333],
    [55.42563, -4.917513],
    [55.001906, -5.34192],
    [54.719465, -5.514335],
    [54.62649822725435, -5.884617360308293],
  ]

  let shipPositions = []
  let loop = 0
  var i = setInterval(function () {
    if (loop < longlats.length) {
      let shipPosition = {
        index: loop + 1,
        timestamp: Date.now(),
        lat: longlats[loop][0],
        lng: longlats[loop][1],
      }

      shipPositions.push(shipPosition)
    } else {
      clearInterval(i)

      res.send(shipPositions)
    }
    loop++
  }, 0)
}

function clearArray(array) {
  while (array.length) {
    array.pop()
  }
}
