import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/isMobile";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

export function Blogs() {
  const isMobile = useIsMobile();
  //Todo: use page params (eg `?blog=pct&type=non-automated`) to populate filter
  //Todo: if possible, use the blogspot API (https://developers.google.com/blogger/docs/3.0/using)
  //   or reverse-engineer a similar solution myself (that doesn't need Oauth)

  const [showFilter, setShowFilter] = useState(!isMobile);
  const [selectedBlog, setSelectedBlog] = useState('pct');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`http://localhost:3000/blogs/${selectedBlog}.json`);
      // console.log(await response.json());
      setPosts(await response.json());
    }

    getPosts();
  }, [selectedBlog]);

  //Todo: allow filtering by labels
  //Todo: allow sorting (eg newest to oldest or vice-versa)
  //Todo: allow clicking on images to expand (like with MarkdownPage)
  //Tood: links should open in a new tab

  return (
    <div className='blogs' style={{height: '100%', width: '100%', overflowY: 'auto'}}>
      <div style={{padding: '20px 10%'}}>
        {isMobile ? 
          <div style={{display: 'flex', alignItems: 'center', marginLeft: 10,  borderBottom: '2px solid white'}} onClick={() => setShowFilter(!showFilter)}>
            <h3>Filter</h3>
            <div style={{flex: '1 0 0'}} />
            <i style={{height: 30, width: 30, fontSize: '30px', color: 'white'}} className={`bi bi-chevron-${showFilter ? 'down' : 'right'}`}/>
          </div>
        : null}
        <div style={{display: showFilter ? 'flex' : 'none', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'start', alignItems: 'center', padding: isMobile ? 10 : '10px 10px 10px 0px', borderBottom: '2px solid white', marginBottom: 10}}>
          {/* <Dropdown name='Languages' options={project_data.languages.map(l => l.name)} setSelectedVals={vals => {
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
          }}/> */}
        </div>
        {/*Todo: figure out how to keep the 'Filter' at the top & only scroll the posts area*/}
        <div style={{display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
          {posts.map(post =>
            //Todo: posts should be "lazy loaded" when they are scolled into view (if possible)
            <PostCard key={post.Id} post={post}/>
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

function PostCard(props) {
  const isMobile = useIsMobile();

  //Todo: allow expanding of a post?
  //Todo: hyperlink the title to the blog post on the blog
  //Todo: display the published date better

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 'calc(100% - 60px)', padding: 20, margin: 10, borderRadius: 15, backgroundColor: '#888888'}}>
      <h3 style={{marginTop: 0}}>{props.post.Title}</h3>
      <h4 style={{marginTop: 0}}>{props.post.Published}</h4>
      <p dangerouslySetInnerHTML={{__html: props.post.Content}}/>
    </div>
  );
}