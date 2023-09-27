import React from 'react'
import Error from 'next/error'
import Link from 'next/link'

function ErrorPage({ statusCode }:{ statusCode: number | string}) {
  if(statusCode === 404) {
    return (
      <div>
        404
        <Link href='/'>Home</Link>
      </div>
      )
    } else {
      return (
        <div>500</div>
      )
    }
  }
  
  ErrorPage.getInitialProps = ({ res, err }:{res:any,err:any}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404

    return { statusCode }
  }
  
  export default ErrorPage
