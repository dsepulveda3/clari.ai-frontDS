import { Box, ThemeProvider } from "@mui/material"
import theme from "../styles/theme"
import '../styles/globals.css'
import Head from "next/head"
import { createContext, useState } from "react"

const css = {
  container: {
    // maxWidth: 800,
    // margin: 'auto',
    // padding: '36px 24px'
  }
}

export const AppContext = createContext({})

function MyApp({ Component, pageProps }) {

  const [lang, setLang] = useState("en")

  return (
    <div>
      <Head>
        <title>Clari</title>
        <meta charset="utf-8" />
        <link rel="icon" href="/transparente.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Come and find instant answers to your questions!"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{ lang, setLang }}>
          <Box sx={css.container}>
            <Component {...pageProps} />
          </Box>
        </AppContext.Provider>
      </ThemeProvider>
    </div>
  )

}

export default MyApp
