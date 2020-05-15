import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/Seo'
import Img from 'gatsby-image'

const Post = ({ data }) => {
    return (
        <div>
            <Seo title={data.markdownRemark.frontmatter.title} description={data.markdownRemark.frontmatter.description} />
            {
                data.markdownRemark.frontmatter.banner && <Img fluid={data.markdownRemark.frontmatter.banner.childImageSharp.fluid} />
            }
            <h1>{data.markdownRemark.frontmatter.title}</h1>
            <div
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />
            <p><Link to="/blog">Voltar para o Blog</Link></p>
        </div>
    )
}

export const pageQuery = graphql`
    query($id: String!){
        markdownRemark(frontmatter: {path: {eq: $id}}) {
            frontmatter {
              title
              description
              banner {
                  childImageSharp{
                      fluid{
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
            }
            html
        }
    }
`

export default Post