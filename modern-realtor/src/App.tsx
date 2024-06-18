// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CMA, CRA, PPT, Home } from './pages';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cra" element={<CRA />} />
        <Route path="/cma" element={<CMA />} />
        <Route path="/ppt" element={<PPT />} />
      </Routes>
    </Router>
  );
};
