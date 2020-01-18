import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'

import config from '../../data/SiteConfig'

function MainLayout(props: any) {
  const { children } = props
  return (
    <MainLayoutBox>
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      {children}
    </MainLayoutBox>
  )
}

export default MainLayout

// styles

const MainLayoutBox = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  padding: 20px;

  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    min-width: 100%;
  }

  #___gatsby #gatsby-focus-wrapper {
    min-height: 100vh;
    min-width: 100vw;
  }
`
