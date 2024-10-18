import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StudentPortal from './pages/StudentPortal';
import EmployerPortal from './pages/EmployerPortal';
import AdminPanel from './pages/AdminPanel';
import Resources from './pages/Resources';
import SuccessStories from './pages/SuccessStories';
import FAQ from './pages/FAQ';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student" element={<StudentPortal />} />
            <Route path="/employer" element={<EmployerPortal />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;