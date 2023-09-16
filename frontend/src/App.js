import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { alpha, AppBar, Button, InputAdornment, InputBase, styled, TextField, Toolbar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

function Footer() {
  return (
      <Typography variant="body2" color="text.secondary">
        {'Created using an '}
        <Link color="inherit" href="https://mui.com/material-ui/getting-started/templates/">
          MUI Template
        </Link>
        {'.'}
      </Typography>
  );
}
function ButtonAppBar() {
    return (
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit">NLPRealEstate</Button>
                </Toolbar>
            </AppBar>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function SearchBar() {
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);

    };

    return (
        <div>
            <TextField
                label="Search..."
                id="filled-start-adornment"
                sx={{ m: 1, width: '50ch' }}
                InputProps={{

                }}
                variant="filled"
            />

        </div>

    )

}

function RenderMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}

export default function App() {
  return (
      <ThemeProvider theme={defaultTheme}>
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
        >
            <ButtonAppBar/>
          <CssBaseline />
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="md">
            <Typography variant="h2" component="h1" gutterBottom>
              NLP Real Estate Searcher
            </Typography>
              <SearchBar/>
              <br/>
            <Typography variant="h5" component="h2" gutterBottom>
              {'Text that talks about our program'}
            </Typography>
            <Typography variant="body1">Type something into the search bar to get started!</Typography>
          </Container>
          <Box
              component="footer"
              sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
              }}
          >
            <Container maxWidth="sm">
              <Typography variant="body1">
                For VTHacks 11
              </Typography>
              <Footer />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
  );
}