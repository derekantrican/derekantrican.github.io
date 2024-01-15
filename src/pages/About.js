import { Link } from 'react-router-dom';
import '../styles/about.css'
import { useIsMobile } from '../hooks/isMobile';

export function About() {
  const isMobile = useIsMobile();

  return (
    <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', width: isMobile ? '100%' : '75%'}}>
      <img style={{width: isMobile ? '90%' : '45%', height: 'auto', objectFit: 'cover', marginTop: 20, borderRadius: 20 }} src='images/profile_med.jpg'/>
      <div style={{margin: '0px 35px'}}>
        <h1>Hi, I'm Derek!</h1>
        <p>
          I'm a software developer by profession and hobby, with a passion for building programs that simplify or automate workflows.
        </p>
        <p>
          I currently work as a Software Engineer for Microsoft on the Office Engineering team, creating tools to support those who work on Office products.
        </p>
        <p>
          {/*Todo: eventually, the below link should link to the appropriate 'blogs' subpage*/}
          I also like the outdoors: rock climbing, camping, hiking (<Link to="http://pct.derekantrican.com/" target="_blank">PCT 2015</Link>), etc!
        </p>
      </div>
    </div>
  );
}