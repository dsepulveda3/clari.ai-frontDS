import { Send } from '@mui/icons-material'
import { Box, Button, IconButton, Paper, Typography } from '@mui/material'
import Fab from "@mui/material/Fab"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import useTranslate from '../../hooks/TranslationHook'
import theme from '../../styles/theme'
import { AppContext } from '../../pages/_app'
import Header from '../Header'
import TextInput from '../TextInput'
import LandingSubjects from './LandingSubjects'
import { Router } from 'react-router-dom'
import { FloatingWhatsApp } from 'react-floating-whatsapp'

const css = {
  container: {

  },
  firstSection: {
    minHeight: '75vh',
    background: theme.palette.gradient.main,
    '& > *': {
      color: 'white'
    }
  },
  landingCatch: {
    display: 'flex',
    '& > *:first-child': {
      flexBasis: '60%',
      '@media (max-width:1024px)': {
        flexBasis: '100%'
      }
    },
    maxWidth: '80%',
    margin: 'auto',
    paddingTop: 3,
    '@media (max-width:1024px)': {
      flexWrap: 'wrap'
    },
    '@media (max-width:682px)': {
      maxWidth: '90%',
    }
  },
  catchInfo: {
    '& > *': {
      margin: '8px 0',
      color: 'white'
    },
    '& > h1': {
      fontSize: 48,
      fontWeight: 900,
      '@media (max-width:682px)': {
        fontSize: 30
      }
    }
  },
  how: {
    background: 'white',
    padding: "96px 48px",
    textAlign: 'center',
    '@media (max-width:682px)': {
      padding: "96px 18px",
    }
  },
  it: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateAreas: '"a b c"',
    '@media (max-width:1024px)': {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateAreas: '"a b" "c c"',
    },
    '@media (max-width:682px)': {
      gridTemplateColumns: '1fr',
      gridTemplateAreas: '"a" "b" "c"',
    },
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  works: {
    padding: 4,
    background: 'whitesmoke',
    textAlign: 'center',
    // maxWidth: 250,
    margin: 10,
    position: 'relative',
    '@media (max-width:682px)': {
      margin: 4
    }
  },
  work: {
    position: 'absolute',
    left: -64,
    top: -120,
    zIndex: 2,
    '& > img': {
      height: 180,
      width: 180
    },
    '@media (max-width:682px)': {
      left: -48,
      top: -80,
      '& > img': {
        height: 120,
        width: 120
      },
    }
  },
  book: {
    position: 'absolute',
    right: -90,
    bottom: -100,
    zIndex: 0,
    '& > img': {
      height: 180,
      width: 180
    },
    '@media (max-width:682px)': {
      right: -25,
      bottom: -75,
      '& > img': {
        height: 120,
        width: 120
      },
    }
  },
  community: {
    textAlign: 'center',
    padding: 4,
    '& > h1': {
      fontSize: 48,
      fontWeight: 900
    }
  },
  community_paper: {
    maxWidth: 350,
    padding: 6,
    margin: '36px auto',
    position: 'relative',
  },
  books: {
    position: 'absolute',
    zIndex: 2,
    left: '90%',
    top: '60%',
    '@media (max-width:682px)': {
      left: '70%',
      top: '70%',
      '& > img': {
        height: 96,
        width: 92
      }
    }
  },
  numbers: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  testimonies: {
    textAlign: 'center',
    padding: "96px 48px",
    '@media (max-width:682px)': {
      padding: "96px 42px",
    }
  },
  subjects: {
    padding: 1
  },
  mainImageContainer: {
    '& > *': {
      width: '80%',
    },
    '@media (max-width:1024px)': {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      margin: '24px 0'
    }
  },
  catchPar: {
    maxWidth: '80%', margin: '18px 0 12px 0', color: 'white',
    '@media (max-width:682px)': {
      maxWidth: 'unset'
    }
  },
  bigButton: {
    width: '80%',
    height: 50,
    margin: '24px 0'
  },
  floatingButton: {
    width: 300,
    '@media (max-width:682px)': {
      width: '100%'
    }
  },
  askButton: {
    flexGrow: 1,
    padding: '12px 0px 12px 0px',
    margin: '12px 0px 12px 0px'
  },
  title: {
    fontSize: "35px",
    fontWeight: 'bold',
    color: ' #FFFFFF',
    textDecoration: 'underline',
    margin: '12px 0px 12px 0px'
  },
  subtitle: {
    // fontSize: "25px",
    fontWeight: 'bold',
    color: ' #FFFFFF'
  },
  sharebutton: {
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 5,
    background: '#00BB2D',
    borderRadius: '50px',
  },
  sx: {
    position: "fixed",
    right: "16px",
    bottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px 16px",
    backgroundColor: "#2AA81A",
    color: "white",
    borderRadius: "50px",
    cursor: "pointer",
    backgroundImage: "url('whatsapp.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    width: "200px",
    "&:hover": {
      backgroundColor: "#2AA81A"
    }
  },

}
// heu

function Landing({ value }) {

  const { lang } = useContext(AppContext)
  const [dict, T] = useTranslate(lang, "landing")
  const [content, setContent] = useState("")
  const router = useRouter()

  // function sendAndCreateQuestion() {
  //   (`/questions?content=${content}`)
  // }

  function sendAndCreateQuestion() {
    router.push('/questions')
  }

  // function sendAndCreateQuestion() {
  //   const url = '/questions';
  //   Router.events.emit("routeChangeStart", url);
  //   window.location.href = url;
  // }

  return (
    <Box>
      <Header square />
      <Fab sx={css.sx} href={T(dict.share_text)}>
        {T(dict.share)}
      </Fab>
      {/* <Fab sx={css.fab}>
        <div sx={css.icon}></div>
        <div sx={css.text}>Share</div>
      </Fab> */}


      <Box sx={css.firstSection}>
        <Box sx={css.landingCatch}>
          <Box sx={css.catchInfo}>
            <Typography variant='h1'>{T(dict.t1)}</Typography>
            <Typography variant='h1'>{T(dict.t2)}</Typography>
            {/* <Typography variant='h2'>{T(dict.t3)}</Typography> */}
            <Typography variant='body1' sx={css.catchPar}>
              {T(dict.catch)}
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              {/* <Typography variant='h2' sx={{ color: 'white' }}>{T(dict.join1)}</Typography> */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* <Paper sx={{ flexGrow: 1 }}>
                  <TextInput onChange={e => setContent(e.target.value)} value={content} />
                </Paper> */}
                <Button color="secondary" variant="contained" sx={css.askButton} onClick={sendAndCreateQuestion} endIcon={<Send />}>
                  {/* onClick={createQuestion} PUT IT INTO BUTTON*/}
                  {T(dict.join1)}
                </Button>
                {/* <IconButton disabled={!content} sx={{ color: 'white' }} onClick={sendAndCreateQuestion}>
                  <Send />
                </IconButton> */}
              </Box>
            </Box>
          </Box>
          <Box sx={css.mainImageContainer}>
            <img src="/first.svg" alt="catch" />
          </Box>
        </Box>
      </Box>
      <Box sx={css.subjects}>
        <LandingSubjects />
      </Box>
    </Box>
  )
}

export default Landing