import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Layout from './Layout.tsx';
import CommonArea from './pages/CommonArea.tsx';
import CommonAreaAdmin from './pages/CommonAreaAdmin.tsx';
import NewsPageAdmin from './pages/NewsPageAdmin.tsx';
import NewsPage from './pages/NewsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/news/admin" element={<NewsPageAdmin />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/booking" element={<CommonArea />} />
          <Route path="/booking/admin" element={<CommonAreaAdmin />} />
  
        </Route>
      </Routes>
    </BrowserRouter>,
  </StrictMode>,
)
