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
    <div className='projects' style={{height: '100%', width: '100%', overflowY: 'auto'}}>
      <div style={{padding: '20px 10%'}}>
        <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', padding: 10, borderBottom: '2px solid white'}}>
          <Dropdown name='Languages' options={project_data.languages.map(l => l.name)} setSelectedVals={vals => {
            setSelectedLanguages(vals);
            filterProjects(vals, selectedTechnologies);
          }}/>
          <Dropdown name='Technologies' options={project_data.technologies.map(l => l.name)} setSelectedVals={vals => {
            setSelectedTechnologies(vals);
            filterProjects(selectedLanguages, vals);
          }}/>
        </div>
        <div style={{display: 'flex', flexFlow: 'wrap'}}>
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
    <div style={{width: isMobile ? 'auto' : 300, margin: 10}}>
      <Select styles={styles}
        placeholder={props.name}
        options={props.options.map(o => {return {value: o, label: o}/*TEMP?*/})}
        closeMenuOnSelect={false}
        components={animatedComponents}
        // onChange={vals => console.log('selected options:', vals.map(val => val.value))}
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
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? '100%' : 300, padding: 20, margin: 10, borderRadius: 15, backgroundColor: 'lightgray', color: 'black'}}>
      <img style={{objectFit: 'contain', height: 200, width: isMobile ? '100%' : 300}} src={props.project.icon}/>
      <h3>{props.project.name}</h3>
      <p style={{marginTop: 0}}>{props.project.description}</p>
      <div style={{alignSelf: 'start'}}>
        <h4>Languages:</h4>
        <div style={{display: 'flex', flexFlow: 'wrap'}}>
          {props.project.languages.map(lang =>
            <img style={{objectFit: 'contain', height: 40, width: 40}} src={project_data.languages.find(lang_data => lang_data.name == lang).icon}/>
          )}
        </div>
        <h4>Technologies:</h4>
        <div style={{display: 'flex', flexFlow: 'wrap'}}>
          {props.project.technologies.map(tech =>
            <img style={{objectFit: 'contain', height: 40, width: 40}} src={project_data.technologies.find(tech_data => tech_data.name == tech).icon}/>
          )}
        </div>
      </div>
    </div>
  );
}