import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Research from './pages/Research';
import CMBSimulator from './pages/CMBSimulator';
import Publications from './pages/Publications';
import Talks from './pages/Talks';
import Contact from './pages/Contact';

function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter basename="/susannaazzoni">
      <RedirectHandler />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/simulator" element={<CMBSimulator />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/talks" element={<Talks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;