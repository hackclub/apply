import { Button, Box, Card, Text } from 'theme-ui'

export default function Popup({ content, onClose }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}
    >
      <Card
        variant="interactive"
        sx={{
          border: '2px solid',
          borderColor: 'primary',
          maxWidth: ['auto', '450px']
        }}
      >
        <Text sx={{ fontSize: 2 }}>{content}</Text>
        <Button
          variant="primary"
          onClick={onClose}
          sx={{ width: '100%', display: 'block', mt: 2, boxShadow: 'none' }}
        >
          Ok, I got it
        </Button>
      </Card>
    </Box>
  )
}
