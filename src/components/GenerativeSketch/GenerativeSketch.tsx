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
  const draw = () => {
    sketch(sketchRef.current, {
      ...options,
      background: !isSmallScreen,
      backgroundColor: prefersDark ? 'black' : null,
      paletteName: paletteRef.current,
      gridPadding: isSmallScreen ? 0 : 100,
      tileOpts: {
        mode: 'geometry',
      },
    })
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

  useLayoutEffect(() => {
    if (!sketchRef.current) return

    draw()

    loadedRef.current = true
  }, [sketchRef.current])

  return (
    <div
      style={{
        width: '100%',
        height: isSmallScreen ? '20rem' : '100vh',
      }}
      ref={sketchRef}
    ></div>
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
