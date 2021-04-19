const fs = require("fs")
const path = require("path")

// -------------------------------------------------------
// Local function to read the geojson filenames in a directory
// -------------------------------------------------------
export function readRouteDirectory(dirPath, suffix) {
  try {
    let fileArray = []

    const files = fs.readdirSync(dirPath)

    files.forEach((file) => {
      if (path.extname(file).toLowerCase() === suffix) fileArray.push(file)
    })
    return fileArray
  } catch (err) {
    throw err
  }
}

// -------------------------------------------------------
// Local function to read a Route file
// -------------------------------------------------------
export function readRouteFile(fileUrl) {
  try {
    // Firstly read all existing Bus Stops in the file
    const data = fs.readFileSync(fileUrl, "utf8")

    return JSON.parse(data)
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("File not found!")
    } else {
      throw err
    }
  }
}

// -------------------------------------------------------
// Local function to read a set of files in a directory
// -------------------------------------------------------
export function prepReadGtfsFile(firstFile, iterationSize, arraylength) {
  let fileFetchArray = []
  let fileFetch = []

  // Divide into pieces to prevent timeout error
  let loop = 0
  let start = 0
  let startIteration = firstFile // fileFetch[0]
  let endIteration = 0 // fileFetch[1]
  let end = arraylength // fileFetch[2]
  let iterations = Math.floor(end / iterationSize)

  if (iterations > 0) {
    do {
      if (loop === 0) {
        startIteration = start
        endIteration = iterationSize - 1
      } else {
        startIteration = loop * iterationSize
        if (loop < iterations) {
          endIteration = (loop + 1) * iterationSize - 1
        } else {
          endIteration = end
        }
      }

      loop++

      fileFetch.push(startIteration)
      fileFetch.push(endIteration)

      fileFetchArray.push(fileFetch)
      fileFetch = []
    } while (loop <= iterations)
  } else {
    startIteration = start
    endIteration = end

    fileFetch.push(startIteration)
    fileFetch.push(endIteration)

    fileFetchArray.push(fileFetch)
  }

  return fileFetchArray
}
