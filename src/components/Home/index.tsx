import React from 'react'

import styles from './index.module.scss'

const HomePage = ()=>{
  return (
    <div>
      <div className={styles.banner}>
        <h1>
          Same Old .
        </h1>
        <div className={styles.radius}>
          <div className={styles.innerRadius} />
        </div>
      </div>
    </div>
  )
}

export default HomePage