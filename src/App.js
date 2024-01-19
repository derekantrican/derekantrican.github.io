import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { About, Blogs, Calendar, Hobbies, Home, ProfessionalLife, Projects } from './pages';

//Todo: I can also use this site for "hidden" pages (like Turkish Resources, etc)
//Todo: maybe I can have a central list of these pages somewhere that can be referenced here (like `pages.map(p => <Route ...)`)
//   and in Sidebar

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
        <Route path='/about/professionallife' element={
          <Layout title='Professional life'>
            <ProfessionalLife/>
          </Layout>
        }/>
        <Route path='/about/hobbies' element={
          <Layout title='Hobbies'>
            <Hobbies/>
          </Layout>
        }/>
        <Route path='/calendar' element={
          <Layout title='Calendar'>
            <Calendar/>
          </Layout>
        }/>
        <Route path='/projects' element={
          <Layout title='Projects'>
            <Projects/>
          </Layout>
        }/>
        <Route path='/blogs' element={
          <Layout title='Blogs'>
            <Blogs/>
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
