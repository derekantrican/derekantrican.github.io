import { useState } from 'react';
import './App.css';
import { isMobile } from 'react-device-detect';

//I can also use this site for "hidden" pages (like Turkish Resources, etc)

function App() {
  const [navState, setNavState] = useState('home');

  return (
    <div style={{display: 'flex', flexDirection: 'row', height: '100%'}}>
      {isMobile ? 
       <i style={{fontSize: '50px' /*Might need position: absolute */}} className='bi bi-list'/> :  
       <div style={{width: 400, borderWidth: '0px 2px 0px 0px', borderStyle: 'solid'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}>
          <img style={{borderRadius: '50%', width: 'calc(100% - 100px)', margin: '50px 50px 0px 50px'}} src="https://avatars.githubusercontent.com/u/1558019"/>
          <div style={{width: 'calc(100% - 20px)', padding: 10, margin: '20px 0px', textAlign: 'center'}}>
            Software Engineer | Mechanical Engineer | Outdoorsman
          </div>
          {/* <i style={{height: 20, width: 20, fontSize: '25px', alignSelf: 'start', visibility: 'hidden'}} className={`bi bi-chevron-left`} onClick={() => setNavState('home')}/> */}
          <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
            <NavBarLink name="About Me" top="true" onClick={() => setNavState('about')} selected={navState == 'about'}>
              {/*Subpages: Hobbies, Turkiye, etc?*/}
              <NavBarLink name="Hobbies" level="1"/>
              <NavBarLink name="Turkiye" level="1"/>
            </NavBarLink>
            <NavBarLink name="Calendar"/>
            <NavBarLink name="Projects" onClick={() => setNavState('projects')}>
              {/*Subpages: should auto populate from a json file somewhat like my current projects page https://derekantrican.com/projects.html */}
            </NavBarLink>
            <NavBarLink name="Blog(s)" onClick={() => setNavState('blogs')}>
              {/*Should be an "aggregate feed" of my various blogs (with filters for PCT, etc and the special tags I used on the PCT blog) */}
            </NavBarLink>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 'auto'}}>
              <Social icon='github' link='https://github.com/derekantrican'/>
              <Social icon='linkedin' link='https://www.linkedin.com/in/derekantrican/'/>
              <Social icon='envelope' link='mailto:derekantrican@gmail.com'/>
            </div>
          </div>
        </div>
      </div>}
      <div>

      </div>
    </div>
  );
}

//Todo: it'd be nice to have the current page's nav link also "highlighted" (a blue background or whatever)
function NavBarLink(props) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', borderWidth: `${props.top ? '2px' : '0px'} 0px 2px 0px`, borderStyle: 'solid', width: 'calc(100% - 20px)', padding: '10px 10px 12px 10px',
        cursor: 'pointer'}} className="navlink" onClick={props.onClick}>
        <div style={{fontSize: '20px', marginLeft: (props.level ?? 0) * 20}}>{props.name}</div>
        <div style={{flex: '1 0 0'}} />
        {props.children ? <i style={{height: 20, width: 20, fontSize: '25px'}} className={`bi bi-chevron-${props.selected ? 'down' : 'right'}`}/> : null}
      </div>
      {props.selected ? 
        props.children 
      : null}
    </div>
  );
}

function Social(props) {
  return (
    <a style={{color: 'white', margin: 20}} href={props.link} target='_blank'>
      <i style={{height: 50, width: 50, fontSize: '50px'}} className={`bi bi-${props.icon}`}/>
    </a>
  );
}

export default App;
