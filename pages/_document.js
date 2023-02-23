import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" ></link>
          {/* <!-- Google tag (gtag.js) --> */}
          <Script strategy='afterInteractive' id="google-an-tag" async src="https://www.googletagmanager.com/gtag/js?id=G-0T8W2LP84Z"></Script>
          <Script strategy='afterInteractive' id='google-an'>
            {
              `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0T8W2LP84Z');`
            }
          </Script>

          {/* <!-- Hotjar Tracking Code for my site --> */}
          <Script strategy='afterInteractive' id='hotjar'>
            {`(function (h, o, t, j, a, r) {
              h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) }
              h._hjSettings = { hjid: 3195602, hjsv: 6 }
              a = o.getElementsByTagName('head')[0]
              r = o.createElement('script'); r.async = 1
              r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
              a.appendChild(r)
            })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');`}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument