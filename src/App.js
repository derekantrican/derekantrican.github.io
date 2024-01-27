import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { pages } from './data/pages';
import './utils/arrayHelpers';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        {pages.concat(pages.selectAll(p => p.subpages ?? [])).map(page =>
          <Route key={page.title} path={page.path} element={
            page.wrapWithLayout ? <Layout title={page.title}>{page.element}</Layout> : page.element
          }/>
        )}
        {/*Todo: have unlisted pages like turkish resources, halal tips, etc*/}
        {/*Todo: could have a whole "Turkiye worker" section for newsletters, etc that is login-protected*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
