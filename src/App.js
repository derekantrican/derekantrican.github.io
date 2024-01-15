import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Calendar } from './pages/Calendar';

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
        <Route path='/calendar' element={
          <Layout>
            <Calendar/>
          </Layout>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
