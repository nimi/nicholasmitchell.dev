import React, { useState } from 'react'
import * as tome from 'chromotome'

import { useTheme } from '../../context/theme'
import styled from 'styled-components'
import PalettePickerModal from './PalettePickerModal'

function PalettePicker() {
  const { theme } = useTheme()
  const palette = tome.get(theme.palette)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <PalettePickerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        palette={theme.palette}
      />
      <ColorBarBox onClick={() => setModalOpen(true)}>
        <span>change palette</span>
        <ColorBarList>
          {palette.colors.map((color: string) => (
            <ColorBar key={color} color={color} />
          ))}
        </ColorBarList>
      </ColorBarBox>
    </>
  )
}

export default PalettePicker

const ColorBarBox = styled.div`
  cursor: pointer;
  width: 125px;
  text-align: center;
  display: flex;
`
const ColorBarList = styled.div<{ color: string }>`
  display: flex;
  padding: 0 20px;
  width: 100px;
  justify-content: space-around;
`

const ColorBar = styled.div<{ color: string }>`
  flex: 0 1 auto;

  background-color: ${props => props.color};

  width: 4px;

  height: 32px;
`
