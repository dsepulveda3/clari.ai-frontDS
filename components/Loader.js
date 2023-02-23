import { Box, CircularProgress, Typography } from '@mui/material'
import { useState, useEffect } from 'react'

const css = {
  container: {
    height: 150,
    padding: 3,
    position: 'relative',
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  timer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}

function Loader({ timerDuration = 15 }) {
  const [timeLeft, setTimeLeft] = useState(timerDuration)

  useEffect(() => {
    if (timeLeft === 0) return

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  return (
    <Box sx={css.container}>
      <Box sx={css.loader}>
        <CircularProgress size={70} />
      </Box>
      <Box sx={css.timer}>
        <Typography variant="h4" color="textSecondary" align="center">
          {timeLeft}
        </Typography>
      </Box>
    </Box>
  )
}

export default Loader

