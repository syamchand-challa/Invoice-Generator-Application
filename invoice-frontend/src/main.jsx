
import ReactDOM from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if(!PUBLISHABLE_KEY){
  throw new Error('PUBLISHABLE_KEY environment key is missing' );
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <AppContextProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </AppContextProvider>
)
