import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Link from "@mui/material/Link";
import {AppBar, Button, IconButton, InputAdornment, TextField, Toolbar} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Tooltip } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/quicksand"; // Defaults to weight 400


export let markers = null;
let isLoading = false; // Dummy variable for loading state

const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand',
    },
});

function ButtonAppBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    NLPRealEstate
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

function fetchFromBackend(value, set_curr_page) {
    const apiURL = "http://localhost:5000/housing_query?"
    // GET Request that puts data into responseData;
    fetch(apiURL + new URLSearchParams({
        query_text: value,
    }), {
        options: 'GET',
    })
        .then(response => {return response.json()})
        .then(responseData => {
            markers = responseData;
            console.log(markers)
            set_curr_page((old)=>{
               return "maps_overall";
            });
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}
function SearchBar(props) {
    const [loading, setLoading] = React.useState(false); // State to handle loading

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            setLoading(true);
            const value = e.target.value;
            fetchFromBackend(value, props.set_curr_page)
        }
    };

    return (
        <div>
            <TextField
                label="Search properties"
                placeholder="Your ideals lie here!"
                id="filled-start-adornment"
                sx={{ m: 1, width: '50ch' }}
                onKeyDown={(e) => handleEnter(e)}
                helperText="Press enter to submit"
                variant="filled"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Tooltip title="Search">
                                <span>
                                    <IconButton type="button"
                                                sx={{ p: '10px' }}
                                                aria-label="search"
                                                disabled={isLoading}
                                                onClick={(e) => {
                                                    setLoading(true);
                                                    fetchFromBackend(e.target.value, props.set_curr_page);
                                                }}>
                                        {isLoading ? <CircularProgress size={24} /> : <SearchIcon />}
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
}

export default function SearchPage(props) {
    return (
        <ThemeProvider theme={theme}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                bg: '#f5f5f5', // Light gray background for a subtle differentiation
            }}
        >
            <ButtonAppBar />
            <CssBaseline />
            <Container component="main" sx={{ mt: 8, mb: 2, p: 4, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', bg: 'white' }} maxWidth="md">
                <Typography variant="h2" component="h1" gutterBottom>
                    NLP Real Estate Searcher
                </Typography>
                <SearchBar set_curr_page={props.set_curr_page} />
                <br />
                <Typography variant="h5" component="h2" gutterBottom>
                    Discover the best properties with our AI-powered search
                </Typography>
                <Typography variant="body1">Type a location, feature, or any keyword into the search bar to get started!</Typography>
            </Container>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    bg: 'primary.main', // Styling footer with primary color
                    color: 'white'
                }}
            >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        For VTHacks 11
                    </Typography>
                </Container>
            </Box>
        </Box>
        </ThemeProvider>
    )
}
