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
