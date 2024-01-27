import { About, Blogs, Calendar, Hobbies, Home, ProfessionalLife, Projects } from "../pages";

export const pages = [{
  title : 'Home',
  path : '/',
  element : <Home/>,
  wrapWithLayout : false,
},
{
  title : 'About',
  path : '/about',
  element : <About/>,
  wrapWithLayout : true,
  subpages : [{
      title : 'Professional life',
      path : '/about/professionallife',
      element : <ProfessionalLife/>,
      wrapWithLayout : true,
    },
    {
      title : 'Hobbies',
      path : '/about/hobbies',
      element : <Hobbies/>,
      wrapWithLayout : true,
    }]
},
{
  title : 'Calendar',
  path : '/calendar',
  element : <Calendar/>,
  wrapWithLayout : true,
},
{
  title : 'Projects',
  path : '/projects',
  element : <Projects/>,
  wrapWithLayout : true,
},
{
  title : 'Blogs',
  path : '/blogs',
  element : <Blogs/>,
  wrapWithLayout : true,
},
{
  title: 'Dev',
  path : '/dev',
  element: <></>, //Todo: have a login page (with TOTP) that will open up some admin options on the website
  wrapWithLayout : true,
  unlisted : true,
}];