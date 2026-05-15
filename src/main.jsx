import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import App from './App';
import { handleResetParam } from './lib/queryParams';

// Must run before any component mounts. If ?reset=1 is present, this wipes
// quiz-related localStorage and reloads without the param — we skip
// rendering this pass so React doesn't briefly mount on stale state.
const willReload = handleResetParam(['metodorec_quiz_state', 'metodorec_offer_seen']);

if (!willReload) {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}
