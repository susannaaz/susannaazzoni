import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Research from './pages/Research';
import CMBSimulator from './pages/CMBSimulator';
import Publications from './pages/Publications';
import Talks from './pages/Talks';
import Contact from './pages/Contact';
// import CV from './pages/CV';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/simulator" element={<CMBSimulator />} />
          <Route path="/publications" element={<Publications />} />
          {/* <Route path="/cv" element={<CV />} /> */}
          <Route path="/talks" element={<Talks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;