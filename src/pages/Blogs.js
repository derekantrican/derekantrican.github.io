import '../styles/blogs.css';
import { useEffect, useState } from "react";
import { useIsMobile } from "../hooks/isMobile";
import '../utils/arrayHelpers';
import { Dropdown } from '../components/Dropdown';
import { baseUrl } from '../utils/utils';

export function Blogs() {
  const isMobile = useIsMobile();
  //Todo: use page params (eg `?blog=pct&type=non-automated`) to populate filter

  const [showFilter, setShowFilter] = useState(!isMobile);
  const [selectedBlog, setSelectedBlog] = useState('pct');
  const [sortOrder, setSortOrder] = useState('Oldest first');
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  //Todo: use react-query's 'useQuery' to improve this (https://youtu.be/vxkbf5QMA2g)
  useEffect(() => {
    async function getPosts() {
      setPosts([]);
      setFilteredPosts([]);

      const response = await fetch(`${baseUrl()}/blogs/${selectedBlog}.json`);
      // console.log(await response.json());

      var responsePosts = await response.json();
      responsePosts.forEach(p => p.published = new Date(p.published));
      responsePosts = sortPosts(responsePosts, sortOrder);

      setPosts(responsePosts);
      setFilteredPosts(responsePosts);
    }

    getPosts();
  }, [selectedBlog]);

  const sortPosts = (posts, sort) => {
    return posts.sort((a, b) => {
      if (sort === 'Newest first') {
        return b.published.getTime() - a.published.getTime();
      }
      else if (sort === 'Oldest first') {
        return a.published.getTime() - b.published.getTime();
      }
    })
  }

  const filterPosts = (labels, sort) => {
    setFilteredPosts(sortPosts(posts.filter(p => 
      (labels.length === 0 || p.labels.intersection(labels).length > 0)
    ), sort));
  };

  //Todo: allow clicking on images to expand (like with MarkdownPage)
  //   Currently, some images are already linked to an external image, but that opens in a new tab. Probably fine enough for now.

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
          <Dropdown name='Order' options={['Newest first', 'Oldest first']} defaultValue='Oldest first' setSelected={val => {
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

function PostCard(props) {
  return (
    <div className='blogPost' style={{display: 'flex', flexDirection: 'column', width: 'calc(100% - 60px)', padding: 20, margin: 10, borderRadius: 15, backgroundColor: '#888888'}}>
      <div style={{display: 'flex'}}>
        <h3 style={{marginTop: 0}}>{props.post.title}</h3>
        <div style={{flex: '1 0 0'}} />
        <a style={{marginLeft: 10}} href={props.post.url} target='_blank'>
          <i style={{height: 25, width: 25, fontSize: '25px', color: 'white'}} className='bi bi-box-arrow-up-right'/>
        </a>
      </div>
      <h4 style={{marginTop: 0}}>{props.post.published.toLocaleDateString()}</h4>
      <p style={{overflowWrap: 'anywhere'}} dangerouslySetInnerHTML={{__html: props.post.content}}/>
    </div>
  );
}