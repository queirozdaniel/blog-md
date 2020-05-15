const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === 'MarkdownRemark') {
        const contentName = getNode(node.parent).sourceInstanceName
        console.log(contentName);

        createNodeField({
            name: 'collections',
            node,
            value: contentName
        })

        createNodeField({
            name: 'slug',
            node,
            value: createFilePath({ node, getNode })
        })

    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    const posts = await graphql(`
        query {
            posts: allMarkdownRemark (filter: {fields: {collections: {eq: "pages"}}}) {
                edges {
                    node {
                        frontmatter {
                            categoria
                            description
                            path
                            title
                        }
                    }
                }   
            }
            authors: allMarkdownRemark(filter: {fields: {collections: {eq: "authors"}}}) {
                edges {
                  node {
                    frontmatter {
                      title
                    }
                    fields{
                        slug
                    }
                  }
                }
            }

        }
    `)


    const templatePosts = path.resolve('src/templates/post.js')
    posts.data.posts.edges.forEach(post => {
        createPage({
            path: post.node.frontmatter.path,
            component: templatePosts,
            context: {
                id: post.node.frontmatter.path
            }
        })
    });

    const templateAuthors = path.resolve('src/templates/author.js')
    posts.data.authors.edges.forEach(author => {
        createPage({
            path: author.node.fields.slug,
            component: templateAuthors,
            context: {
                id: author.node.fields.slug
            }
        })
    });

    const templateBlog = path.resolve('src/templates/blog.js')
    const pageSize = 2
    const totalPosts = posts.data.posts.edges.length
    const numPages = Math.ceil(totalPosts / pageSize)
    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: '/blog' + (i == 0 ? '' : '/' + i),
            component: templateBlog,
            context: {
                limit: pageSize,
                skip: i * pageSize,
                numPages,
                currentPage: i
            }
        })
    })
}