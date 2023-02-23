import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { AppContext } from '../../pages/_app'

const subjects = [
  { name: "Mathematics" },
  { name: "English" },
  { name: "History" },
  { name: "Biology" },
  { name: "Physics" },
  { name: "Chemistry" },
  { name: "Spanish" },
]

const subjects_es = [
  { name: "Matemáticas" },
  { name: "Inglés" },
  { name: "Historia" },
  { name: "Biología" },
  { name: "Física" },
  { name: "Química" },
  { name: "Español" },
]

const css = {
  subjects: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '@media (max-width:682px)': {
      justifyContent: 'flex-start'
    },
    overflow: 'auto'
  },
  subject: {
    height: 92,
    width: 92,
    textAlign: 'center',
    padding: 2,
    cursor: 'pointer'
  },
  imgContainer: {
    height: 70,
    overflow: 'hidden'
  }
}

function Subject({ subject, title }) {
  const lang = "es"
  return (
    <Box sx={css.subject}>
      <Box sx={css.imgContainer}>
        <Image src={`/${title?.name?.toLowerCase()}.svg`} alt="subject" height={100} width={100} />
      </Box>
      <Typography variant='subtitle1'>{subject?.name}</Typography>
    </Box>
  )
}

function LandingSubjects({ value }) {
  const { lang } = useContext(AppContext)
  const final_subjects = lang === "es" ? subjects_es : subjects

  return (
    <Box>
      <Box sx={css.subjects}>
        {final_subjects.map((subject, index) => <Subject key={subject.id} subject={subject} title={subjects[index]} />)}
      </Box>
    </Box>
  )
}

export default LandingSubjects