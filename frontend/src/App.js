import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {alpha, AppBar, Button, InputBase, styled, Toolbar} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        border: 1,
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.2),
        },
        borderColor: alpha(theme.palette.common.black, 0.5),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
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
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
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