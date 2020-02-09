import React, { ChangeEvent } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Layout from '../layout'
import config from '../../data/SiteConfig'
import GenerativeSketch from '../components/GenerativeSketch'
import PalettePicker from '../components/PalettePicker/index'

function IndexPage() {
  return (
    <Layout padding="0px">
      <Helmet title={`${config.siteTitle}`} />
      <IndexBox>
        <Flex>
          <GenerativeSketch />
        </Flex>
        <Flex>
          <IndexHeading>
            Hi, I'm Nicholas. I'm a software engineer, listener, thinker, and problem solver.
            Currently, I'm working with{' '}
            <ExternalLink href="https://www.netlify.com">Netlify</ExternalLink> to help make apps
            and websites faster, more secure and scalable.
          </IndexHeading>
          <IndexFooter>
            <IndexLinkList role="navigation">
              <a href="https://github.com/nimi">Work</a>
              <Link to="/posts">Blog</Link>
              <a href="https://linkedin.com/in/nicholaslmitchell/">Contact</a>
            </IndexLinkList>
            <IndexPalettePicker>
              <PalettePicker />
            </IndexPalettePicker>
          </IndexFooter>
        </Flex>
      </IndexBox>
    </Layout>
  )
}

export default IndexPage

// styles

const IndexBox = styled.div`
  display: grid;
  grid-template-columns: 50% 1fr;
  height: 100vh;
  width: 100%;
`

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const IndexHeading = styled.h2`
  font-size: 3vw;
  line-height: 3.5vw;
  padding: 2vw 2vw 0 2vw;
`

const IndexFooter = styled.footer`
  display: flex;
  align-items: space-between;
`

const IndexPalettePicker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2vw;

  position: relative;
`

const IndexLinkList = styled.div`
  justify-content: flex-end;
  display: flex;
  flex-direction: column;
  padding: 2vw;

  height: 100%;
  width: 100%;

  > a {
    font-size: 2vw;
    line-height: 3.5vw;
  }
`

const ExternalLink = styled.a``
