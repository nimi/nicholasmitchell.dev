import { Fragment } from 'preact'
import { useRef, useEffect, useState, useLayoutEffect } from 'preact/hooks'

import sketch from './sketch'

import { DEFAULT_PALETTE } from '../../constants'
interface GenerativeSketchProps {
  cellScale: number
  cellPadding: number
  gridSize: number
  paletteName: string
  strokeWeight: number
}

function GenerativeSketch(props: GenerativeSketchProps) {
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
    <div
      style={{
        position: 'relative',
        height: drawComplete && isSmallScreen ? '20rem' : '100%',
      }}
    >
      {true && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: isSmallScreen ? '20rem' : 'calc(100vh - 6rem)',
            padding: isSmallScreen ? 0 : '3rem',
          }}
        >
          <div
            style={{
              height: isSmallScreen ? '20rem' : 'min(45vw, 90vh)',
              width: isSmallScreen ? '20rem' : 'max(45vw, 75vh)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
              columnGap: '15px',
              rowGap: '15px',
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
