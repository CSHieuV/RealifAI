import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import SearchPage from './SearchPage'
import OverallMapsPage from './OverallMapsPage'
import StreetViewPage from "./StreetViewPage";
import {useEffect, useState} from 'react';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function NavigationHandler(props) {
    const navigate = useNavigate();
    let curr_page = props.curr_page;
    let set_curr_page = props.set_curr_page;
    useEffect(() => {
        switch (curr_page) {
            case "search":
                navigate('/');
                break;
            case "maps_overall":
                navigate('/maps_overall');
                break;
            case "street_view":
                navigate('/street_view');
                break;
            default:
                navigate('/');
        }
    }, [curr_page, navigate]);

    return null;  // This component doesn't render anything visually
}

export default function App() {
    const [curr_page, set_curr_page] = useState("search");

  return (
      <ThemeProvider theme={defaultTheme}>
          <BrowserRouter>
              <NavigationHandler curr_page={curr_page} set_curr_page={set_curr_page} />
              <Routes>
                  <Route path="/" element={<SearchPage set_curr_page={set_curr_page} />}/>
                  <Route path="maps_overall" element={< OverallMapsPage/>}/>
                  <Route path="street_view" element={< StreetViewPage/>}/>
              </Routes>
          </BrowserRouter>
      </ThemeProvider>
  );
}