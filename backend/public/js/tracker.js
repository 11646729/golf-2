document.addEventListener("DOMContentLoaded", () => {
  const socket = io("/")

  // Tracker emits ping
  socket.emit("_ping")

  // Tracker listens for pong
  socket.on("_pong", () => {
    console.log("got pong")
  })

  const positionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0
  }

  setInterval(() => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        console.log(pos.coords)
      },
      err => {
        console.error("err")
      },
      positionOptions
    )
  }, 5000)
})
