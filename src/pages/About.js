import { Link } from 'react-router-dom';
import '../styles/about.css'

export function About() {
    return (
      <div style={{display: 'flex', alignItems: 'center', width: '75%'}}>
        <img style={{width: '45%', height: 'auto', objectFit: 'cover', marginTop: 20, borderRadius: 20 }} src='images/profile_med.jpg'/>
        <div style={{marginLeft: 35}}>
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