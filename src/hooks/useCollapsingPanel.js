import { useRef } from "react"
import { useState } from "react"

const useCollapsingPanel = (isOpen, duration = 500) => {
  const ref = useRef()
  const [minWidth, setMinWidth] = useState(0)

  const onToggle = () => {
    if(isOpen && ref.current) {
      setMinWidth(ref.current.getBoundingClientRect().width)
    }
    else {
      setTimeout(() => {
        setMinWidth(undefined)
      }, duration);
    }
  }

  return {ref, minWidth, onToggle}
}

export default useCollapsingPanel