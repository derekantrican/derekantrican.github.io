import * as project_data from '../data/projects.js';
import '../styles/projects.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useIsMobile } from '../hooks/isMobile';
import { useState } from 'react';
import '../utils/arrayHelpers';

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
      (languages.length == 0 || languages.intersection(p.languages).length > 0) &&
      (technologies.length == 0 || technologies.intersection(p.technologies).length > 0) &&
      (types.length == 0 || types.includes(p.type))
    ));
  };

  return (
    <div className='projects' style={{height: '100%', width: '100%'}}>
      <div style={{padding: isMobile ? 20 : '20px 10%'}}>
        {isMobile ? 
          <div style={{display: 'flex', alignItems: 'center', marginLeft: 10,  borderBottom: '2px solid white'}} onClick={() => setShowFilter(!showFilter)}>
            <h3>Filter</h3>
            <div style={{flex: '1 0 0'}} />
            <i style={{height: 30, width: 30, fontSize: '30px', color: 'white'}} className={`bi bi-chevron-${showFilter ? 'down' : 'right'}`}/>
          </div>
        : null}
        <div style={{display: showFilter ? 'flex' : 'none', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'start', alignItems: 'center', padding: isMobile ? 10 : '10px 10px 10px 0px', borderBottom: '2px solid white', marginBottom: 10}}>
          <Dropdown name='Languages' options={project_data.languages.map(l => l.name)} setSelectedVals={vals => {
            setSelectedLanguages(vals);
            filterProjects(vals, selectedTechnologies, selectedTypes);
          }}/>
          <Dropdown name='Technologies' options={project_data.technologies.map(l => l.name)} setSelectedVals={vals => {
            setSelectedTechnologies(vals);
            filterProjects(selectedLanguages, vals, selectedTypes);
          }}/>
          <Dropdown name='Type' options={uniqueProjectTypes} setSelectedVals={vals => {
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
        <div style={{display: 'flex', flexFlow: 'wrap', overflowY: 'auto'}}>
          {projects.map(project =>
            <ProjectCard key={project.name} project={project} showDetails={showProjectDetails}/>
          )}
        </div>
      </div>
    </div>
  );
}

const animatedComponents = makeAnimated();

function Dropdown(props) {
  const isMobile = useIsMobile();
  const styles = {
    option: (styles) => {
      return { ...styles, color: 'black'};
    }
  };

  return (
    <div style={{width: isMobile ? '100%' : 300, margin: isMobile ? 10 : '10px 10px 10px 0px'}}>
      <Select styles={styles}
        placeholder={props.name}
        options={props.options.map(o => {return {value: o, label: o}/*TEMP?*/})}
        closeMenuOnSelect={false}
        components={animatedComponents}
        onChange={vals => props.setSelectedVals(vals.map(val => val.value))}
        isMulti
        />
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