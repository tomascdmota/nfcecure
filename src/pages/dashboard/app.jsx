/* eslint-disable perfectionist/sort-imports */
import './global.css';

import { useScrollToTop } from '../dashboard/hooks/use-scroll-to-top';

import Router from '../dashboard/routes/sections';
import ThemeProvider from '../dashboard/theme';
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
