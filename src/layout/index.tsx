import React, { ReactElement } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import config from '../../data/SiteConfig'
import Reset from '../components/Reset'
import { ThemeProvider } from '../context/theme'

export interface MainLayoutProps {
  children: ReactElement
  padding?: string
}

const FONT_HREF = 'https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap'

function MainLayout(props: MainLayoutProps) {
  const { children, padding = '20px' } = props
  return (
    <ThemeProvider>
      <MainLayoutBox padding={padding}>
        <Reset />
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <html lang="en" />
          <link href={FONT_HREF} rel="stylesheet"></link>
        </Helmet>
        {children}
      </MainLayoutBox>
    </ThemeProvider>
  )
}

export default MainLayout

// styles

const MainLayoutBox = styled.div<{ padding: string }>`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  padding: ${({ padding }) => padding};
`
