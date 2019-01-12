import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
   static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  } 

  render() {
    return (
      <html>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
           
            <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
            <link rel='stylesheet' type='text/css' href='/static/admin.css' />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous" />
            <meta charSet="utf-8" />
            {/* 
            Need to link to fontawesome CDN in _document.js 
            Need to set viewport in _document.js to get responsive behaviours 
            */}
        </Head>
        <body>
          <Main />
          <NextScript />
                   
        </body>
      </html>
    )
  }
}