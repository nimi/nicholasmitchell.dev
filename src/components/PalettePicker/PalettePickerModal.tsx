import React, { ChangeEvent, useState, useEffect } from 'react'
import * as tome from 'chromotome'

import { useTheme } from '../../context/theme'
import { Modal } from '../ui/Modal'
import styled from 'styled-components'

function PalettePickerModal(props: any) {
  const { setPalette, theme } = useTheme()

  return (
    <Modal {...props}>
      <PalettePickerBox>
        <PickerLabel>Choose a palette</PickerLabel>
        <PaletteList>
          {theme.paletteOptions.map(name => (
            <ColorBar
              onClick={() => setPalette(name)}
              colors={tome.get(name).colors}
              active={props.palette === name}
            />
          ))}
        </PaletteList>
      </PalettePickerBox>
    </Modal>
  )
}

export default PalettePickerModal

const PickerLabel = styled.h4`
  line-height: 4vw;
  padding-left: 10px;
`

const PalettePickerBox = styled.div`
  background-color: white;
  margin-left: auto;
  width: 50%;
`

const PaletteList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;

  > div {
    height: 50px;
  }
`

const ColorBar = styled.div<{ colors: Array<string> }>`
  border: ${props => (props.active ? 'solid white 10px' : 'none')};

  flex: 1 1 auto;

  background-image: ${props => {
    return `
      linear-gradient(
        to right,
        ${props.colors[0]},
        ${props.colors[1]}
      )
    `
  }};
  transition: background-image 0.5s linear;

  height: 100%;

  &:hover {
    border: solid white 10px;
  }
`
