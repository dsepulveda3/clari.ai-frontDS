import { Box, TextField } from '@mui/material'

function TextInput({ value, onChange }) {
  return (
    <Box>
      <TextField value={value} onChange={onChange} multiline fullWidth />
    </Box>
  )
}

export default TextInput