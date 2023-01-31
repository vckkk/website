import React from 'react'
import Error from 'next/error'

function ErrorPage({ statusCode }) {
    return (
 <Error statusCode={statusCode} />
    )
  }
  
  ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    console.log(res.statusCode,"res.statusCode")
    return { statusCode }
  }
  
  export default ErrorPage