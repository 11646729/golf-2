const fs = require("fs")
const path = require("path")
import sqlite3 from "sqlite3"
import { open } from "sqlite"

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
  let noOfIterations = Math.floor(end / iterationSize)

  if (noOfIterations > 0) {
    do {
      if (loop === 0) {
        startIteration = start
        endIteration = iterationSize - 1
      } else {
        startIteration = loop * iterationSize
        if (loop < noOfIterations) {
          endIteration = (loop + 1) * iterationSize - 1
        } else {
          endIteration = end - 1
        }
      }

      loop++

      fileFetch.push(startIteration)
      fileFetch.push(endIteration)
      fileFetch.push(noOfIterations)

      fileFetchArray.push(fileFetch)

      fileFetch = []
    } while (loop <= noOfIterations)
  } else {
    startIteration = start
    endIteration = end - 1

    fileFetch.push(startIteration)
    fileFetch.push(endIteration)
    fileFetch.push(noOfIterations)

    fileFetchArray.push(fileFetch)
  }

  return fileFetchArray
}

// -------------------------------------------------------
// Function to open the SQLite database file connection
// -------------------------------------------------------
export const openSqlDbConnection = (filename) => {
  let db = open({
    filename,
    driver: sqlite3.Database,
  })

  if (db !== null) {
    console.log("Connected to the SQLite database")
    return db
  } else {
    console.log("UNSUCCESSFUL connection to the SQLite database")
  }
}

// -------------------------------------------------------
// Function to close the SQLite database connection
// -------------------------------------------------------
export const closeSqlDbConnection = (db) => {
  console.log("Here")

  return db.close()
  // db.close((err) => {
  //   if (err) {
  //     console.error(err.message)
  //   } else {
  //     console.log("Closed the SQLite database connection.")
  //   }
  // })
}
