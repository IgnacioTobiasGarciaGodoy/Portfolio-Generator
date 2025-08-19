import React, { useEffect, useRef } from 'react'

const useClickOutside = (callbackFn) => {
  let domNodeRef = useRef()

  useEffect(() => {
    let handler = (event) => {
      if(!domNodeRef.current?.contains(event.target)) {
        callbackFn()
      }
    }
    document.addEventListener("mousedown", handler)

    return() => {
      document.removeEventListener("mousedown", handler)
    } 
  }, [])

  return domNodeRef
}

export default useClickOutside