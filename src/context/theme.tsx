import React, { useState, useContext } from 'react'
import * as tome from 'chromotome'

import { ThemeProvider as StyledThemeProvider } from 'styled-components'

interface ThemeConfig {
  palette: string
  paletteOptions: Array<string>
}

export type ThemeContextValue = { theme: ThemeConfig; setPalette: (p: string) => void } | void
export const ThemeContext = React.createContext<ThemeContextValue>(undefined)

export interface Props {
  children?: React.ReactChild
}

export const ThemeProvider: React.FunctionComponent<Props> = ({ children }) => {
  const [palette, setPalette] = useState(theme.palette)

  const value = React.useMemo(
    () => ({
      theme: { ...theme, palette },
      setPalette,
    }),
    [theme, palette],
  )

  return (
    <StyledThemeProvider theme={value.theme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </StyledThemeProvider>
  )
}

// Theme configuration

const PALETTE_NAMES = tome.getNames()
const INITIAL_PALETTE = 'olympia'

const theme = {
  palette: INITIAL_PALETTE,
  paletteOptions: PALETTE_NAMES,
}

// Hook

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context)
    throw Error('Component cannot call `useTheme` unless wrapped with a `ThemeProvider`')
  return context
}
