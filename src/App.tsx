// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Detail from './pages/Detail'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Detail />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App