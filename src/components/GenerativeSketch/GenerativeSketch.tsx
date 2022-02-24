import { Fragment } from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'
// import placeholderSrc from './generated-image.png'

import sketch from './sketch'

import { DEFAULT_PALETTE } from '../../constants'
interface GenerativeSketchProps {
  cellScale: number
  cellPadding: number
  gridSize: number
  paletteName: string
  strokeWeight: number
}

// const Fallback = () => {
//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <img style={{ width: 'min(45vw,80vh)', height: 'min(45vw,80vh)' }} src={placeholderSrc} />
//     </div>
//   )

//   return (
//     <div
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100%',
//       }}
//     >
//       <div
//         style={{
//           height: 'min(75vw, 75vh)',
//           width: 'min(75vw, 75vh)',
//           display: 'grid',
//           gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
//           gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
//           columnGap: '15px',
//           rowGap: '15px',
//         }}
//       >
//         {Array(25)
//           .fill(null)
//           .map((_) => (
//             <div
//               style={{
//                 background: `var(--placeholder-gradient)`,
//                 animation: 'loading 2s ease infinite',
//                 backgroundSize: '200% 200%',
//               }}
//             />
//           ))}
//       </div>
//     </div>
//   )
// }

function GenerativeSketch(props: GenerativeSketchProps) {
  const isServer = typeof document === 'undefined'
  const options = { ...props, auto: true }
  const sketchRef: any = useRef(null)
  const loadedRef: any = useRef(false)
  const paletteRef: any = useRef(DEFAULT_PALETTE)
  const isSmallScreen = useMediaQuery('(max-width: 68em)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const [drawComplete, setDrawComplete] = useState(false)
  const draw = () => {
    sketch(
      sketchRef.current,
      {
        ...options,
        background: !isSmallScreen,
        backgroundColor: prefersDark ? 'black' : null,
        paletteName: paletteRef.current,
        gridPadding: isSmallScreen ? 0 : 100,
        tileOpts: {
          mode: 'geometry',
        },
      },
      () => setDrawComplete(true),
    )
  }

  useEffect(() => {
    const debouncedDraw = debounce(draw)
    const onPaletteUpdate = (e: any) => {
      paletteRef.current = e.detail.palette
      draw()
    }
    window.addEventListener('palette-update', onPaletteUpdate)
    window.addEventListener('resize', debouncedDraw)

    return () => {
      window.removeEventListener('resize', debouncedDraw)
      window.removeEventListener('palette-update', onPaletteUpdate)
    }
  }, [isSmallScreen, prefersDark])

  useEffect(() => {
    if (!sketchRef.current) return

    draw()

    loadedRef.current = true
  }, [sketchRef.current])

  return (
    <div className="wrapper">
      {!isServer && (
        <div className="placeholder">
          <div
            style={{
              opacity: drawComplete ? 0 : 1,
            }}
          >
            {Array(25)
              .fill(null)
              .map((_) => (
                <div className="placeholder-block" />
              ))}
          </div>
        </div>
      )}
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: 0,
          height: isSmallScreen ? '20rem' : '100vh',
          visibility: drawComplete ? 'visible' : 'hidden',
        }}
        ref={sketchRef}
      ></div>
    </div>
  )
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => {
      setMatches(media.matches)
    }
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}

export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number = 200,
) {
  let timer: any

  return (...args: T): Promise<U> => {
    clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait)
    })
  }
}

export default GenerativeSketch
