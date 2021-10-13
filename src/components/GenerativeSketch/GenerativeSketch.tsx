import { useRef, useEffect } from 'preact/hooks'

import sketch from './sketch'

function GenerativeSketch() {
  const sketchRef: any = useRef(null)
  const paletteRef: any = useRef('olympia')

  useEffect(() => {
    window.addEventListener('palette-update', (e: any) => {
      paletteRef.current = e.detail.palette

      console.log(paletteRef.current)

      sketch(sketchRef.current, { paletteName: paletteRef.current })
    })
  }, [])

  useEffect(() => {
    if (!sketchRef.current) return

    console.log('updated', paletteRef.current)

    sketch(sketchRef.current, { paletteName: paletteRef.current })
  }, [sketchRef.current])

  return <div style={{ width: '100%', height: '100vh' }} ref={sketchRef}></div>
}

export default GenerativeSketch
