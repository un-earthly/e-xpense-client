import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './route.tsx'
import { Provider } from 'react-redux';
import { store } from './store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>

  </StrictMode>,
)
