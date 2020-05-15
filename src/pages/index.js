import React from 'react'
import { Link } from 'gatsby'
import Seo from '../components/Seo'

const Index = () => {
    return (
        <div>
            <Seo title='Meu primeiro Blog' description='Blog feito em react' />
            <h1>Blog do Daniel</h1>
            <p>
                <Link to='/blog'>Blog</Link>
            </p>
        </div>
    )
}

export default Index