import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from './SearchPage'
import OverallMapsPage from './OverallMapsPage'
import StreetViewPage from "./StreetViewPage";
import {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';

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

export default function App() {
    useEffect(() => {
        document.title = 'RealifAI';
    }, []);
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<SearchPage />}/>
              <Route path="maps_overall" element={< OverallMapsPage/>}/>
              <Route path="street_view" element={< StreetViewPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}