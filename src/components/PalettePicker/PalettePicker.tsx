import { useState } from 'preact/hooks'
import * as tome from 'chromotome'

import PalettePickerModal from './PalettePickerModal'

import { DEFAULT_PALETTE } from '../../constants'

function PalettePicker() {
  const [paletteName, setPaletteName] = useState(DEFAULT_PALETTE)
  const palette = tome.get(paletteName)
  const [modalOpen, setModalOpen] = useState(false)

  const onSelect = (palette) => {
    setPaletteName(palette)
    const event = new CustomEvent('palette-update', {
      detail: {
        palette,
      },
    })
    window.dispatchEvent(event)
    setModalOpen(false)
  }

  return (
    <>
      <PalettePickerModal
        open={modalOpen}
        onSelect={onSelect}
        onClose={() => setModalOpen(false)}
        palette={paletteName}
      />
      <div
        style={{
          cursor: 'pointer',
          width: '125px',
          textAlign: 'center',
          display: 'flex',
        }}
        onClick={() => setModalOpen(true)}
      >
        <span>Change palette</span>
        <div className="palette-picker-bar-list">
          {palette.colors.map((color: string) => (
            <div
              style={{
                flex: '0 1 auto',
                backgroundColor: color,
                width: 4,
                height: 32,
              }}
              key={color}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default PalettePicker
