import React from 'react'

const Author = ({ data }) => {
    return (
        <div>
            <h1>Author - {JSON.stringify(data)} </h1>
        </div>
    )
}


export default Author