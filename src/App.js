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
          <Layout title='Home'>
            <Home/>
          </Layout>
        }/>
        <Route path='/about' element={
          <Layout title='About'>
            <About/>
          </Layout>
        }/>
        <Route path='/calendar' element={
          <Layout title='Calendar'>
            <Calendar/>
          </Layout>
        }/>
        {/*Todo: have unlisted pages like turkish resources, halal tips, etc*/}
        <Route path='/dev' element={
          <></>
          //Todo: have a login page (with TOTP) that will open up some admin options on the website
        }/>
        {/*Todo: could have a whole "Turkiye worker" section for newsletters, etc that is login-protected*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
