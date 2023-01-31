import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import styles from "./index.module.scss"


const Index = ({md}:any) => {
  return <div className={styles.mdContent}>
    <ReactMarkdown  remarkPlugins={[remarkGfm]}>
      {md}
    </ReactMarkdown>
  </div>
}

export default Index