
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import About from './sections/About';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Journey from './sections/Journey';
import Contact from './sections/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProjectManagement from './pages/admin/ProjectManagement';
import ProjectForm from './pages/admin/ProjectForm';

import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminMessages from './pages/admin/AdminMessages';
import CustomCursor from './components/CustomCursor';

function PublicPortfolio() {
  return (
    <>

      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicPortfolio />} />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        

        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

         <Route
          path="/admin/messages"
          element={<AdminMessages />}
        />

          <Route
            path="/admin/projects"
            element={<ProjectManagement />}
          />

         <Route path="/admin/projects/new" element={<ProjectForm />} />
          <Route
            path="/admin/projects/:slug/edit"
            element={<ProjectForm />}
          />

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
