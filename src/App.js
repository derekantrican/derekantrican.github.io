import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import { pages } from './data/pages';
import './utils/arrayHelpers';
import DocumentMeta from 'react-document-meta';

function App() {
  const inflateMeta = (meta, page) => {
    //Populate OpenGraph properties from other meta properties
    if (meta) {
      meta.meta.property['og:title'] = meta.title ?? page.title;
      meta.meta.property['og:description'] = meta.description;
      
      let pageUrl = `https://derekantrican.com${page.path}`;
      meta.canonical = pageUrl;
      meta.meta.property['og:url'] = pageUrl;
    }

    return meta;
  };

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routes>
        {pages.concat(pages.selectAll(p => p.subpages ?? [])).map(page =>
          <Route key={page.title} path={page.path} element={
            <DocumentMeta {...inflateMeta(page.meta, page)}>
              {page.wrapWithLayout
                ? <Layout title={page.title}>{page.element}</Layout> 
                : page.element
              }
            </DocumentMeta>
          }/>
        )}
        {/*Todo: could have a whole "Turkiye worker" section for newsletters, etc that is login-protected*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
