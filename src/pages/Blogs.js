import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/isMobile";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../utils/arrayHelpers';

export function Blogs() {
  const isMobile = useIsMobile();
  //Todo: use page params (eg `?blog=pct&type=non-automated`) to populate filter
  //Todo: if possible, use the blogspot API (https://developers.google.com/blogger/docs/3.0/using)
  //   or reverse-engineer a similar solution myself (that doesn't need Oauth)

  const [showFilter, setShowFilter] = useState(!isMobile);
  const [selectedBlog, setSelectedBlog] = useState('pct');
  const [sortOrder, setSortOrder] = useState('Newest first');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  //Todo: use react-query's 'useQuery' to improve this (https://youtu.be/vxkbf5QMA2g)
  useEffect(() => {
    async function getPosts() {
      setPosts([]);
      setFilteredPosts([]);

      const response = await fetch(`http://localhost:3000/blogs/${selectedBlog}.json`);
      // console.log(await response.json());

      var responsePosts = await response.json();
      responsePosts.forEach(p => p.published = new Date(p.published));

      setPosts(responsePosts);
      setFilteredPosts(responsePosts);
    }

    getPosts();
  }, [selectedBlog]);

  const filterPosts = (labels, sort) => {
    setFilteredPosts(posts.filter(p => 
      (labels.length == 0 || p.labels.intersection(labels).length > 0)
    ).sort((a, b) => {
      if (sort == 'Newest first') {
        return b.published.getTime() - a.published.getTime();
      }
      else if (sort == 'Oldest first') {
        return a.published.getTime() - b.published.getTime();
      }
    }));
  };

  //Todo: allow clicking on images to expand (like with MarkdownPage)
  //Tood: links should open in a new tab

  return (
    <div className='blogs' style={{height: '100%', width: '100%', overflowY: 'auto'}}>
      <div style={{padding: isMobile ? 20 : '20px 10%'}}>
        {isMobile ? 
          <div style={{display: 'flex', alignItems: 'center', marginLeft: 10,  borderBottom: '2px solid white'}} onClick={() => setShowFilter(!showFilter)}>
            <h3>Filter</h3>
            <div style={{flex: '1 0 0'}} />
            <i style={{height: 30, width: 30, fontSize: '30px', color: 'white'}} className={`bi bi-chevron-${showFilter ? 'down' : 'right'}`}/>
          </div>
        : null}
        <div style={{display: showFilter ? 'flex' : 'none', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'start', alignItems: 'center', padding: isMobile ? 10 : '10px 10px 10px 0px', borderBottom: '2px solid white', marginBottom: 10}}>
          <Dropdown name='Order' options={['Newest first', 'Oldest first']} defaultValue='Newest first' setSelected={val => {
            setSortOrder(val);
            filterPosts(selectedLabels, val);
          }}/>
          <Dropdown name='Labels' isMulti={true} options={posts.selectAll(p => p.labels).distinct()} setSelected={vals => {
            setSelectedLabels(vals);
            filterPosts(vals, sortOrder);
          }}/>
        </div>
        {/*Todo: figure out how to keep the 'Filter' at the top & only scroll the posts area*/}
        <div style={{display: 'flex', flexDirection: 'column', overflowY: 'auto'}}>
          {filteredPosts.map(post =>
            //Todo: posts should be "lazy loaded" when they are scolled into view (if possible)
            <PostCard key={post.id} post={post}/>
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
        defaultValue={props.defaultValue ? {value: props.defaultValue, label: props.defaultValue} : null}
        closeMenuOnSelect={!props.isMulti}
        components={animatedComponents}
        onChange={selected => props.isMulti ? props.setSelected(selected.map(val => val.value)) : props.setSelected(selected.value)}
        isMulti={props.isMulti}
        />
    </div>
  );
}

function PostCard(props) {
  const isMobile = useIsMobile();

  //Todo: allow expanding of a post?
  //Todo: hyperlink the title to the blog post on the blog
  //Todo: display the published date better
  //Todo: also fix images on mobile (expanding outside of the view)

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: 'calc(100% - 60px)', padding: 20, margin: 10, borderRadius: 15, backgroundColor: '#888888'}}>
      <h3 style={{marginTop: 0}}>{props.post.title}</h3>
      <h4 style={{marginTop: 0}}>{props.post.published.toLocaleDateString()}</h4>
      <p style={{overflowWrap: 'anywhere'}} dangerouslySetInnerHTML={{__html: props.post.content}}/>
    </div>
  );
}