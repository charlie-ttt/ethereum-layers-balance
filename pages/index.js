import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from '../src/components/Copyright';
import Link from '../src/components/Link';
import Typography from '@mui/material/Typography';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5 example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
}
