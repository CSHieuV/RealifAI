import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {AppBar, IconButton, InputAdornment, TextField, Toolbar} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Tooltip } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "@fontsource/quicksand";
import { useNavigate } from 'react-router-dom';
import {useState} from "react";

export let markers = null;
export let query = "";
let isLoading = false; // Dummy variable for loading state

const theme = createTheme({
    typography: {
        fontFamily: 'Quicksand',
    },
});

export function ButtonAppBar() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton href={'.'} edge="start" color="inherit" aria-label="home">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    RealifAI
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

function fetchFromBackend(value) {
    const apiURL = "http://localhost:5000/housing_query?"
    return fetch(apiURL + new URLSearchParams({
        query_text: value,
    }), {
        options: 'GET',
    })
        .then(response => {return response.json()})
        .then(responseData => {
            query = value;
            markers = responseData;
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}
function SearchBar() {
    const navigate = useNavigate(); // This is the navigate function from react-router
    const [loading, setLoading] = React.useState(false);

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            setLoading(true);
            const value = e.target.value;
            fetchFromBackend(value)
                .then(() => {
                    if (value) {
                        navigate('/maps_overall');
                    }
                });
        }
    };

    const [textValue, setTextValue] = useState('');
    const handleChange = (event) => {
        setTextValue(event.target.value);
    }

    return (
        <div>
            <TextField
                value={textValue}
                onChange={handleChange}
                label="Search (Ex: I want a house close to water!)"
                placeholder="Your ideals lie here!"
                id="filled-start-adornment"
                sx={{
                    m: 1,
                    width: '50ch',
                    borderRadius: '25px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderRadius: '25px',
                        },
                        '&:hover fieldset': {
                            borderColor: 'gray',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'blue',
                        },
                    },
                }}
                onKeyDown={(e) => handleEnter(e)}
                helperText="Press enter to submit"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Tooltip title="Search">
                                <span>
                                    <IconButton
                                    type="button"
                                                sx={{ p: '10px' }}
                                                aria-label="search"
                                                disabled={isLoading}
                                                onClick={(e) => {
                                                    setLoading(true);
                                                    console.log("btn")
                                                    fetchFromBackend(textValue).then(() => {
                                                        if (textValue) {
                                                            navigate('/maps_overall');
                                                        }
                                                    });
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

export default function SearchPage() {
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
                <Container
                    component="main"
                    sx={{
                        mt: 8,
                        mb: 2,
                        p: 4,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        bg: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'  // This centers the child elements horizontally
                    }}
                    maxWidth="md"
                >
                    <Typography variant="h2" component="h1" gutterBottom>
                        RealifAI
                    </Typography>
                    <SearchBar />
                    <br />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Discover the best properties with our AI-powered search
                    </Typography>
                    <Typography variant="h5" component={ "h2"}>
                        Describe your ideal home
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    )
}
