import React from 'react'
import Error from 'next/error'

function ErrorPage({ statusCode }) {
    return (
      <div>
1

      </div>
    )
  }
  
  ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404

    return { statusCode }
  }
  
  export default ErrorPage