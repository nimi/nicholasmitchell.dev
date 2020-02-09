import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

import sketch from './sketch'
import { useTheme } from '../../context/theme'

function GenerativeSketch() {
  const sketchRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (!sketchRef.current) return

    sketch(sketchRef.current, { paletteName: theme.palette })
  }, [sketchRef.current, theme.palette])

  return <Box ref={sketchRef} />
}

export default GenerativeSketch

// styles

const Box = styled.div`
  width: 100%;
  height: 100vh;
`

const PalettePickerBox = styled.div`
  position: absolute;
`
