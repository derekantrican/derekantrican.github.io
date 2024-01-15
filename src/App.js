import './App.css';
import Sidebar from './components/sidebar';

//I can also use this site for "hidden" pages (like Turkish Resources, etc)

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
      <Sidebar/>
    </div>
  );
}

export default App;
