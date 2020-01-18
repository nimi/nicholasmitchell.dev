import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import About from '../components/About'
import config from '../../data/SiteConfig'

function AboutPage() {
  return (
    <Layout>
      <div>
        <Helmet title={`About | ${config.siteTitle}`} />
        <About />
      </div>
    </Layout>
  )
}

export default AboutPage
