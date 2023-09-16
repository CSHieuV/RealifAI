import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from './SearchPage'
import OverallMapsPage from './OverallMapsPage'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function App() {
  return (
      <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<SearchPage />}/>
                  <Route path="maps_overall" element={< OverallMapsPage/>}/>
              </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}