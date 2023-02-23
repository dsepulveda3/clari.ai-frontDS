import { Box, MenuItem, Typography, Select } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import theme from '../styles/theme'
import { AppContext } from '../pages/_app'

const css = {
  container: {
    background: theme.palette.primary.main,
    height: 64,
    borderRadius: '0 0 12px 12px'
  },
  image: {
    cursor: 'pointer'
  },
  select: {
    background: '#FFFFFF',
    bordercolor: '#f0f0f0',
    borderRadius: '12px',
    width: '150px',
    height: '36px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
  },
  inline: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    height: 64,
    maxWidth: '80%',
    margin: 'auto',
    '@media (max-width:685px)': {
      maxWidth: '90%'
    },
    menuItem: {
      display: 'flex',
      alignItems: 'center'
    },
    flagImg: {
      width: '24px',
      marginRight: '8px'
    }
  }

}

function Header({ square }) {

  const { lang, setLang } = useContext(AppContext)

  const router = useRouter()

  function onChange(e) {
    setLang(e.target.value)
  }

  return (
    <Box sx={{ ...css.container, borderRadius: square ? 0 : "0 0 12px 12px" }}>
      <Box sx={css.inline}>
        <Image style={css.image} src="/logo.png" alt="logo" height={35} onClick={() => router.push("/")} />
        <Box sx={css.select}>
          <Select fullWidth value={lang} onChange={onChange} size="small">
            <MenuItem value="en" sx={css.menuItem}>
              {/* <img src="" alt="English" style={css.flagImg} /> */}
              <Typography variant='body1'>English</Typography>
            </MenuItem>
            <MenuItem value="es" sx={css.menuItem}>
              {/* <img src="" alt="Español" style={css.flagImg} /> */}
              <Typography variant='body1'>Español</Typography>
            </MenuItem>
            {/* <MenuItem value="en">
              <Typography variant='subtitle1'>English</Typography>
            </MenuItem>
            <MenuItem value="es">
              <Typography variant='subtitle1'>Español</Typography>
            </MenuItem> */}
          </Select>
        </Box>
      </Box>
    </Box>
  )
}

export default Header