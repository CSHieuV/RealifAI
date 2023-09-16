import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import * as React from "react";
import Link from "@mui/material/Link";
import {AppBar, Button, TextField, Toolbar} from "@mui/material";
import {useEffect, useState} from "react";

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

function SearchBar() {
    const [search, setSearch] = useState("");

    const [data, setData] = useState(null);

    const apiURL = "httpbin.org/get"

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            const value = e.target.value;
            setSearch(value);


            // GET Request that puts data into responseData;
            fetch('https://httpbin.org/anything?' + new URLSearchParams({
                query: value
            }), {
                options: 'GET'
            })
                .then(response => {return response.json()})
                .then(responseData => {console.log(responseData)})
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    };

    return (
        <div>
            <TextField
                label="Search..."
                id="filled-start-adornment"
                sx={{ m: 1, width: '50ch' }}
                onKeyDown={(e) => handleEnter(e)}
                variant="filled"
            />

        </div>

    )

}

export default function SearchPage() {
    return (
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
    )
}