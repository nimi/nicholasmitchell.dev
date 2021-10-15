import * as tome from 'chromotome'

import { Modal } from '../Modal'

const PALETTE_NAMES = tome.getNames()

function PalettePickerModal(props: any) {
  const paletteOptions = PALETTE_NAMES
  const handleSelect = (name) => {
    props.onSelect(name)
  }

  return (
    <Modal {...props}>
      <div
        style={{
          backgroundColor: 'var(--background-color)',
          marginLeft: 'auto',
          width: '50%',
        }}
      >
        <h4 style={{ lineHeight: '4vw', paddingLeft: '10px', margin: 0 }}>Choose a palette</h4>
        <div style={{ display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {paletteOptions.map((name) => (
            <div
              className="palette-picker-item"
              style={{
                height: 50,
                border: props.palette === name ? 'solid #eee 10px' : 'none',
                flex: '1 1 auto',
                backgroundImage: `
                  linear-gradient(
                    to right,
                    ${tome.get(name).colors[0]},
                    ${tome.get(name).colors[1]}
                  )
                `,
                transition: 'background-image 0.5s linear',
              }}
              onClick={() => handleSelect(name)}
              colors={tome.get(name).colors}
              active={props.palette === name}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default PalettePickerModal
