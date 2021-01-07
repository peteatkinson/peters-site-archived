import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="blog-roll__container">
        <h3 className="blog-roll__title">Write-ups</h3>
        <p className="blog-roll__description">I speak at meetups and conferences on topics that I'm excited about.</p>
        <ul className="blog-roll__list">
          { posts && posts.map(({node: post}, index) => (
            <li 
              className="blog-roll__list-item"
              key={index}>
              <Link 
                className="blog-roll__list-item--link"
                to={post.fields.slug}
                >
                  {post.frontmatter.title}
                </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
