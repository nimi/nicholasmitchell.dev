import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Layout from '../layout'
import PostListing from '../components/PostListing/PostListing'
import SEO from '../components/SEO/SEO'
import config from '../../data/SiteConfig'

function PostListTemplate(props: any) {
  const postEdges = props.data.allMarkdownRemark.edges

  return (
    <Layout>
      <PostListBox>
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <PostListing postEdges={postEdges} />
        </div>
      </PostListBox>
    </Layout>
  )
}

export default PostListTemplate

// data
export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(sort: { fields: [fields___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`

// styles

const PostListBox = styled.div`
  min-height: 100%;
  min-width: 60%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
