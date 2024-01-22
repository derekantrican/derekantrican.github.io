import * as project_data from '../data/projects.js';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useIsMobile } from '../hooks/isMobile';
import { useState } from 'react';

export function Projects() {
  const isMobile = useIsMobile();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [projects, setProjects] = useState(project_data.projects);
  //Todo: use page params (eg `?language=react&type=script`) to populate filter
  //Todo: I may want to use the GitHub API to pre-populate this a bit

  const filterProjects = (languages, technologies) => {
    setProjects(project_data.projects.filter(p => 
      (languages.length == 0 || languages.every(l => p.languages.includes(l))) &&
      (technologies.length == 0 || technologies.every(t => p.technologies.includes(t)))
    ));
  };

  return (
    <div className='projects' style={{height: '100%', width: '100%'}}>
      <div style={{padding: '20px 10%'}}>
        <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'start', alignItems: 'center', padding: isMobile ? 10 : '10px 10px 10px 0px', borderBottom: '2px solid white', marginBottom: 10}}>
          <Dropdown name='Languages' options={project_data.languages.map(l => l.name)} setSelectedVals={vals => {
            setSelectedLanguages(vals);
            filterProjects(vals, selectedTechnologies);
          }}/>
          <Dropdown name='Technologies' options={project_data.technologies.map(l => l.name)} setSelectedVals={vals => {
            setSelectedTechnologies(vals);
            filterProjects(selectedLanguages, vals);
          }}/>
        </div>
        {/*Todo: figure out how to keep the 'Filter' at the top & only scroll the projects area*/}
        <div style={{display: 'flex', flexFlow: 'wrap', overflowY: 'auto'}}>
          {projects.map(project =>
            <ProjectCard key={project.name} project={project}/>
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
    </div>
  );
}