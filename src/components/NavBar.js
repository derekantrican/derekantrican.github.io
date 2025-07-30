import '../styles/sidebar.css';
import { Link } from "react-router-dom";
import { useIsMobile } from '../hooks/isMobile';
import { pages } from '../data/pages';

export function Sidebar(props) {
  const isMobile = useIsMobile();

  //Todo: fix the issue of double scrollbars when the height is too small for the sidebar
  //Todo: on small screens (eg I reproduced on the /blogs page with the iPhone SE dimensions) the sidepanel can have a background discrepency: https://i.imgur.com/5PyYoDr.png

  return (
    <div className={isMobile ? props.isOpen ? "sidebar open" : "sidebar" : ""} style={isMobile ? {width: '100%'} : {width: 400, borderWidth: '0px 2px 0px 0px', borderStyle: 'solid'}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: isMobile ? 'calc(100% - 50px)' : '100%'}}>
        <Link style={{textDecoration: 'none', color: 'white'}} to='/'>
          <img style={{borderRadius: '50%', width: 'calc(100% - 100px)', margin: '50px 50px 0px 50px'}} src="https://avatars.githubusercontent.com/u/1558019"/>
          <div style={{width: 'calc(100% - 20px)', padding: '10px 10px 30px 10px', marginTop: 20, textAlign: 'center', borderBottom: '2px solid white'}}>
              Software Engineer | Mechanical Engineer | Outdoorsman
          </div>
        </Link>
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
          {pages.filter(p => p.title !== 'Home' && !p.unlisted).map(page =>
            <NavBarLink key={page.title} name={page.title} path={page.path} selected={window.location.pathname.includes(page.path)}>
              {page.subpages ? page.subpages.map(subpage =>
                <NavBarLink key={subpage.title} name={subpage.title} path={subpage.path} level='1'/> //Currently this only handles 1 level of subpages (not fully recursive)
              ) : null}
            </NavBarLink>
          )}
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

export function HomePageNav() {
  const isMobile = useIsMobile();

  const navLinkStyle = {
    textDecoration: 'none',
    display: 'inline-block',
    color: 'white',
    fontSize: 24,
    border: '2px solid white',
    padding: '10px 40px',
    margin: isMobile ? 10 : '0px 5px',
    borderRadius: 25,
    textAlign: 'center',
    width: isMobile ? 200 : 110,
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', alignItems: 'center'}}>
        {pages.filter(p => (!p.level || p.level === 0) && p.title !== 'Home' && !p.unlisted).map(page =>
          <Link key={page.title} style={navLinkStyle} to={page.path}>{page.title}</Link>
        )}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 'auto'}}>
        <Social icon='github' link='https://github.com/derekantrican'/>
        <Social icon='linkedin' link='https://www.linkedin.com/in/derekantrican/'/>
        <Social icon='envelope' link='mailto:derekantrican@gmail.com'/>
      </div>
    </div>
  );
}

//Todo: it'd be nice to have the current page's nav link also "highlighted" (a blue background or whatever)
function NavBarLink(props) {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Link style={{textDecoration: 'none', color: 'white'}} to={props.path}>
        <div className="navlink" style={{display: 'flex', borderBottom: '2px solid white', width: 'calc(100% - 20px)', padding: '10px 10px 12px 10px',
          cursor: 'pointer'}} onClick={props.onClick}>
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
    <a style={{color: 'white', margin: 20}} href={props.link} target='_blank' rel='noreferrer'>
      <i style={{height: 50, width: 50, fontSize: '50px'}} className={`bi bi-${props.icon}`}/>
    </a>
  );
}