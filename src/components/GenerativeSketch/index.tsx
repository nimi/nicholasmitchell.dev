import React, { useRef, useEffect } from 'react'

import sketch from './sketch'
import styled from 'styled-components'

function GenerativeSketch() {
  const sketchRef = useRef(null)

  useEffect(() => {
    if (!sketchRef.current) return

    sketch(sketchRef.current)
  }, [sketchRef.current])

  return <Box ref={sketchRef} />
}

export default GenerativeSketch

// styles

const Box = styled.div`
  width: 100%;
  height: 100vh;
`
