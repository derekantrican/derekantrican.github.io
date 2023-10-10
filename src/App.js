import './App.css';

//I can also use this site for "hidden" pages (like Turkish Resources, etc)

function App() {
  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
      <div style={{width: 400, borderWidth: '0px 2px 0px 0px', borderStyle: 'solid'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <img style={{borderRadius: '50%', width: 'calc(100% - 100px)', margin: '50px 50px 0px 50px'}} src="https://avatars.githubusercontent.com/u/1558019"/>
          <div style={{width: 'calc(100% - 20px)', padding: 10, margin: '20px 0px', textAlign: 'center'}}>
            Software Engineer | Mechanical Engineer | Outdoorsman
          </div>
          <NavBarLink name="About Me" top="true"/>{/*Subpages: Hobbies, Turkiye, etc?*/}
          <NavBarLink name="Calendar"/>
          <NavBarLink name="Projects"/>{/*Subpages: should auto populate from a json file somewhat like my current projects page https://derekantrican.com/projects.html */}
          <NavBarLink name="Blog(s)"/>{/*Should be an "aggregate feed" of my various blogs (with filters for PCT, etc and the special tags I used on the PCT blog) */}
          {/*Todo: need some links like GitHub, LinkedIn, etc */}
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}

function NavBarLink(props) {
  return (
    <div style={{display: 'flex', borderWidth: `${props.top ? '2px' : '0px'} 0px 2px 0px`, borderStyle: 'solid', width: 'calc(100% - 20px)', padding: 10}}>
      <div style={{fontSize: '20px'}}>{props.name}</div>
      <div style={{flex: '1 0 0'}} />
      <i style={{height: 20, width: 20, fontSize: '25px'}} className='bi bi-chevron-right'/>
    </div>
  );
}

export default App;
