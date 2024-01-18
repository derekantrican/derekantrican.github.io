import '../styles/sidebar.css';
import { Link } from "react-router-dom";
import { useIsMobile } from '../hooks/isMobile';

export function Sidebar(props) {
  const isMobile = useIsMobile();

  //Todo: fix the issue of double scrollbars when the height is too small for the sidebar

  return (
    <div className={isMobile ? props.isOpen ? "sidebar open" : "sidebar" : ""} style={isMobile ? {width: '100%'} : {width: 400, borderWidth: '0px 2px 0px 0px', borderStyle: 'solid'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: isMobile ? 'calc(100% - 50px)' : '100%'}}>
        <Link style={{textDecoration: 'none', color: 'white'}} to='/'>
          <img style={{borderRadius: '50%', width: 'calc(100% - 100px)', margin: '50px 50px 0px 50px'}} src="https://avatars.githubusercontent.com/u/1558019"/>
          <div style={{width: 'calc(100% - 20px)', padding: 10, margin: '20px 0px', textAlign: 'center'}}>
              Software Engineer | Mechanical Engineer | Outdoorsman
          </div>
        </Link>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
          <NavBarLink name="About Me" top="true" path='/about' selected={window.location.pathname.includes('/about')}>
            {/*Subpages: Hobbies, Turkiye, etc?*/}
            <NavBarLink name="Professional life" level="1" path='/about/professionallife'/>{/*Todo: this could also have my 'resume' link at the bottom*/}
            <NavBarLink name="Hobbies" level="1" path='/about/hobbies'/>
          </NavBarLink>
          <NavBarLink name="Calendar" path='/calendar'/>
          <NavBarLink name="Projects" path='/projects'>
            {/*Subpages: should auto populate from a json file somewhat like my current projects page https://derekantrican.com/projects.html */}
          </NavBarLink>
          <NavBarLink name="Blog(s)" path='/blogs'>
            {/*Should be an "aggregate feed" of my various blogs (with filters for PCT, etc and the special tags I used on the PCT blog) */}
          </NavBarLink>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 'auto'}}>
            <Social icon='github' link='https://github.com/derekantrican'/>
            <Social icon='linkedin' link='https://www.linkedin.com/in/derekantrican/'/>
            <Social icon='envelope' link='mailto:derekantrican@gmail.com'/>
          </div>
        </div>
      </div>
    </div>
  );
}

//Todo: it'd be nice to have the current page's nav link also "highlighted" (a blue background or whatever)
function NavBarLink(props) {
    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Link style={{textDecoration: 'none', color: 'white'}} to={props.path}>
          <div style={{display: 'flex', borderWidth: `${props.top ? '2px' : '0px'} 0px 2px 0px`, borderStyle: 'solid', width: 'calc(100% - 20px)', padding: '10px 10px 12px 10px',
            cursor: 'pointer'}} className="navlink" onClick={props.onClick}>
            <div style={{fontSize: '20px', marginLeft: (props.level ?? 0) * 20}}>{props.name}</div>
            <div style={{flex: '1 0 0'}} />
            {props.children ? <i style={{height: 20, width: 20, fontSize: '25px'}} className={`bi bi-chevron-${props.selected ? 'down' : 'right'}`}/> : null}
          </div>
        </Link>
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