import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
          <link rel='stylesheet' type='text/css' href='/static/style.css' />
          <link rel='stylesheet' type='text/css' href='/static/animate.min.css' />
          
                 
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous" />
          <script src="/node_modules/bulma-extensions/bulma-accordion/dist/js/bulma-accordion.min.js"></script>
          <script src="../bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js"></script>
          
         
          
          <script src="/static/scripts/jquery.js"></script>
          <script src="/static/scripts/jquery.localScroll.min.js"></script>
          <script src="/static/wow.min.js"></script>
          <script src="/static/scripts/main.js"></script>
          <script src="/static/scripts/custom.js"></script>
          <script src="/static/scripts/jquery.bulma-touchspin.js"></script>
         
          <meta charSet="utf-8" />
         
         
        </Head>
        <body>
          <Main />
          <NextScript />
        
        </body>

      </html>
    )
  }
}