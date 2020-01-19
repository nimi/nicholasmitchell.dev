import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Layout from '../layout'
import config from '../../data/SiteConfig'
import GenerativeSketch from '../components/GenerativeSketch'

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
          <IndexLinkList role="navigation">
            <Link to="/posts">Work</Link>
            <Link to="/posts">Blog</Link>
            <Link to="/posts">Contact</Link>
          </IndexLinkList>
        </Flex>
      </IndexBox>
    </Layout>
  )
}

export default IndexPage

// styles

const IndexBox = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`

const Flex = styled.div`
  flex: 0 0 50%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const IndexHeading = styled.h2`
  font-size: 3vw;
  line-height: 3.5vw;
  padding: 2vw 2vw 0 2vw;
`

const IndexLinkList = styled.div`
  display: flex;
  padding: 2vw;

  height: 100%;
  width: 100%;

  > a {
    align-self: flex-end;
    font-size: 2vw;
    line-height: 2.5vw;
    flex: 1;
  }
`

const ExternalLink = styled.a``
