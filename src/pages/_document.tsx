import { Html, Head, Main, NextScript } from 'next/document'
import dayjs from 'dayjs'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script>
          {dayjs.locale('zh-cn')}
        </script>
      </body>
    </Html>
  )
}
