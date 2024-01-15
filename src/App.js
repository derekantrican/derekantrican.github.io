import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { About } from './pages/About';
import { Home } from './pages/Home';

//I can also use this site for "hidden" pages (like Turkish Resources, etc)

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={
          <Layout>
            <Home/>
          </Layout>
        }/>
        <Route path='/about' element={
          <Layout>
            <About/>
          </Layout>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
