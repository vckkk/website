import React from 'react'
import Error from 'next/error'

function ErrorPage({ statusCode }:{ statusCode: number | string}) {
    return (
      <div>
1

      </div>
    )
  }
  
  ErrorPage.getInitialProps = ({ res, err }:{res:any,err:any}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404

    return { statusCode }
  }
  
  export default ErrorPage
