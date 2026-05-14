import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Quiz from './pages/Quiz';

const Upsell = lazy(() => import('./pages/Upsell'));
const Downsell = lazy(() => import('./pages/Downsell'));
const Acceso = lazy(() => import('./pages/Acceso'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/upsell" element={<Upsell />} />
          <Route path="/downsell" element={<Downsell />} />
          <Route path="/acceso" element={<Acceso />} />
          <Route path="*" element={<Quiz />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
