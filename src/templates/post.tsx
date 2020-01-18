import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Layout from '../layout'
import PostTags from '../components/PostTags/PostTags'
import SEO from '../components/SEO/SEO'
import Footer from '../components/Footer/Footer'
import config from '../../data/SiteConfig'

function PostTemplate({ data, pageContext }: any) {
  const { slug } = pageContext
  const postNode = data.markdownRemark
  const post = postNode.frontmatter
  if (!post.id) {
    post.id = slug
  }
  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID
  }

  return (
    <Layout>
      <PostBox>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <PostMeta>
            <PostTags tags={post.tags} />
          </PostMeta>
          <Footer config={config} />
        </div>
      </PostBox>
    </Layout>
  )
}

export default PostTemplate

// data
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`

// styles
const PostMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PostBox = styled.div`
  code[class*='language-'],
  pre[class*='language-'] {
    font-family: Consolas, Menlo, Monaco, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
      'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono',
      'Nimbus Mono L', 'Courier New', Courier, monospace;
    font-size: 14px;
    line-height: 1.375;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    background: #1d1f21;
    color: #c5c8c6;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #b4b7b4;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #b4b7b4;
  }

  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: #969896;
  }

  .token.punctuation {
    color: #c5c8c6;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.operator,
  .token.boolean,
  .token.number {
    color: #de935f;
  }

  .token.property {
    color: #f0c674;
  }

  .token.tag {
    color: #81a2be;
  }

  .token.string {
    color: #8abeb7;
  }

  .token.selector {
    color: #b294bb;
  }

  .token.attr-name {
    color: #de935f;
  }

  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #8abeb7;
  }

  .token.attr-value,
  .token.keyword,
  .token.control,
  .token.directive,
  .token.unit {
    color: #b5bd68;
  }

  .token.statement,
  .token.regex,
  .token.atrule {
    color: #8abeb7;
  }

  .token.placeholder,
  .token.variable {
    color: #81a2be;
  }

  .token.deleted {
    text-decoration: line-through;
  }

  .token.inserted {
    border-bottom: 1px dotted #fff;
    text-decoration: none;
  }

  .token.italic {
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.important {
    color: #c66;
  }

  .token.entity {
    cursor: help;
  }

  pre > code.highlight {
    outline: 0.4em solid #c66;
    outline-offset: 0.4em;
  }
`
