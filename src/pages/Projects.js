import * as project_data from '../data/projects.js';
import '../styles/projects.css';
import { useIsMobile } from '../hooks/isMobile';
import { useState } from 'react';
import '../utils/arrayHelpers';
import { Dropdown } from '../components/Dropdown';

export function Projects() {
  const isMobile = useIsMobile();
  const uniqueProjectTypes = project_data.projects.map(p => p.type).filter((v, i, a) => a.indexOf(v) === i);

  const [showFilter, setShowFilter] = useState(!isMobile);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState(uniqueProjectTypes);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [projects, setProjects] = useState(project_data.projects);
  //Todo: use page params (eg `?language=react&type=script`) to populate filter
  //Todo: I may want to use the GitHub API to pre-populate this a bit


  const filterProjects = (languages, technologies, types) => {
    setProjects(project_data.projects.filter(p => 
      (languages.length == 0 || p.languages.intersection(languages).length > 0) &&
      (technologies.length == 0 || p.technologies.intersection(technologies).length > 0) &&
      (types.length == 0 || types.includes(p.type))
    ));
  };

  return (
    <div className='projects' style={{height: '100%', width: '100%', overflowY: 'auto'}}>
      <div style={{padding: isMobile ? 20 : '20px 10%'}}>
        {isMobile ? 
          <div style={{display: 'flex', alignItems: 'center', marginLeft: 10,  borderBottom: '2px solid white'}} onClick={() => setShowFilter(!showFilter)}>
            <h3>Filter</h3>
            <div style={{flex: '1 0 0'}} />
            <i style={{height: 30, width: 30, fontSize: '30px', color: 'white'}} className={`bi bi-chevron-${showFilter ? 'down' : 'right'}`}/>
          </div>
        : null}
        <div style={{display: showFilter ? 'flex' : 'none', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'start', alignItems: 'center', padding: isMobile ? 10 : '10px 10px 10px 0px', borderBottom: '2px solid white', marginBottom: 10}}>
          <Dropdown name='Languages' isMulti={true} options={project_data.languages.map(l => l.name)} setSelected={vals => {
            setSelectedLanguages(vals);
            filterProjects(vals, selectedTechnologies, selectedTypes);
          }}/>
          <Dropdown name='Technologies' isMulti={true} options={project_data.technologies.map(l => l.name)} setSelected={vals => {
            setSelectedTechnologies(vals);
            filterProjects(selectedLanguages, vals, selectedTypes);
          }}/>
          <Dropdown name='Type' isMulti={true} options={uniqueProjectTypes} setSelected={vals => {
            setSelectedTypes(vals);
            filterProjects(selectedLanguages, selectedTechnologies, vals);
          }}/>
          <label style={{marginLeft: 20}} className="container">
            Show project details
            <input type='checkbox' onChange={e => setShowProjectDetails(e.target.checked)}/>
            <span className="checkmark"></span>
          </label>
        </div>
        {/*Todo: figure out how to keep the 'Filter' at the top & only scroll the projects area*/}
        <div style={{display: 'flex', flexFlow: 'wrap'}}>
          {projects.map(project =>
            <ProjectCard key={project.name} project={project} showDetails={showProjectDetails}/>
          )}
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: isMobile ? '100%' : 300, padding: 20, margin: 10, borderRadius: 15, backgroundColor: '#888888', cursor: 'pointer'}}
            onClick={() => window.open('https://github.com/derekantrican', '_blank')}>
            <i style={{height: 120, width: 120, fontSize: '100px', color: 'white', textAlign: 'center'}} className='bi bi-github'/>
            <h2>And more...</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard(props) {
  const isMobile = useIsMobile();

  //Todo: implement links to projects, repos, & langs/techs

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? '100%' : 300, padding: 20, margin: 10, borderRadius: 15, backgroundColor: '#888888'}}>
      <img style={{objectFit: 'contain', height: 200, width: isMobile ? '100%' : 300}} src={props.project.icon}/>
      <h3 style={{marginBottom: 0}}>{props.project.name}</h3>
      <div style={{display: 'flex'}}>{/*Todo: there's gotta be a better way to display the website/github icons*/}
        {props.project.website ?
          <a style={{margin: 10}} href={props.project.website} target='_blank'>
            <i style={{height: 30, width: 30, fontSize: '30px', color: 'white'}} className='bi bi-globe2'/>
          </a>  
        : null}
        {props.project.github ?
          <a style={{margin: 10}} href={props.project.github} target='_blank'>
            <i style={{height: 30, width: 30, fontSize: '30px', color: 'white'}} className='bi bi-github'/>
          </a>  
        : null}
      </div>
      <p style={{marginTop: 0}}>{props.project.description}</p>
      {props.showDetails ?
        <div style={{alignSelf: 'start', width: '100%'}}>
          <h4 style={{marginTop: 0}}>Languages:</h4>
          <div style={{display: 'flex', flexFlow: 'wrap'}}>
            {props.project.languages.map(lang =>
              <img style={{objectFit: 'contain', height: 40, width: 40}} 
                src={project_data.languages.find(lang_data => lang_data.name == lang).icon}
                title={lang}/>
            )}
          </div>
          <h4>Technologies:</h4>
          <div style={{display: 'flex', flexFlow: 'wrap'}}>
            {props.project.technologies.map(tech =>
              <img style={{objectFit: 'contain', height: 40, width: 40}}
                src={project_data.technologies.find(tech_data => tech_data.name == tech).icon}
                title={tech}/>
            )}
          </div>
        </div>
      : null}
    </div>
  );
}