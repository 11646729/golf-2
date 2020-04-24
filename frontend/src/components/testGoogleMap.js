import { functions, isEqual, omit } from "lodash"
import React, { useState, useEffect, useRef } from "react"

function Map({ options, onMount, className, onMountProps }) {
  const ref = useRef()
  const [map, setMap] = useState()

  // function addMarkers(map, links) {
  //   links.forEach((link, index) => {
  //     const marker = new window.google.maps.Marker({
  //       map,
  //       position: link.coords,
  //       label: `${index + 1}`,
  //       title: link.title,
  //     })
  //     marker.addListener(`click`, () => {
  //       window.location.href = link.url
  //     })
  //   })
  // }

  // mapProps = {
  //   options: { center: { lat: 20, lng: 40 }, zoom: 4 },
  //   onMount: addMarkers,
  //   onMountProps: linksComingFromSomewhere,
  // }

  useEffect(() => {
    // The Google Maps API modifies the options object passed to
    // the Map constructor in place by adding a mapTypeId with default
    // value 'roadmap'. { ...options } prevents this by creating a copy.
    const onLoad = () =>
      setMap(new window.google.maps.Map(ref.current, { ...options }))
    console.log(options.lng)
    if (!window.google) {
      const script = document.createElement(`script`)
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=` +
        process.env.REACT_APP_GOOGLE_KEY
      document.head.append(script)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  }, [options])

  if (map && typeof onMount === `function`) onMount(map, onMountProps)

  return (
    <div
      style={{ height: `90vh`, margin: `1em 0`, borderRadius: `0.5em` }}
      {...{ ref, className }}
    />
  )
}

function shouldNotUpdate(props, nextProps) {
  const [funcs, nextFuncs] = [functions(props), functions(nextProps)]
  const noPropChange = isEqual(omit(props, funcs), omit(nextProps, nextFuncs))
  const noFuncChange =
    funcs.length === nextFuncs.length &&
    funcs.every((fn) => props[fn].toString() === nextProps[fn].toString())
  return noPropChange && noFuncChange
}

export default React.memo(Map, shouldNotUpdate)

Map.defaultProps = {
  options: {
    center: {
      lat: 54.625539,
      lng: -5.683926,
      // lat: process.env.REACT_APP_CGC_LATITUDE,
      // lng: process.env.REACT_APP_CGC_LONGITUDE,
    },
    zoom: 14,
    mapTypeId: "hybrid",
  },
}
