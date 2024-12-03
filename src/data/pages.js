import { About, Blogs, Calendar, Hobbies, Home, ProfessionalLife, Projects } from "../pages";
import { Giveaway } from "../pages/Giveaway";
import { HalalTips } from "../pages/HalalTips";
import { TurkishResources } from "../pages/TurkishResources";

export const pages = [{
  title : 'Home',
  path : '/',
  element : <Home/>,
  wrapWithLayout : false,
  meta : {
    title: 'Derek Antrican',
    description: "Derek Antrican's website",
    meta: {
      property: {
        //Todo: og:image
      }
    }
  },
},
{
  title : 'About',
  path : '/about',
  element : <About/>,
  wrapWithLayout : true,
  meta : {
    description: "About Derek Antrican",
    meta: {
      property: {
        //Todo: og:image
      }
    }
  },
  subpages : [{
      title : 'Professional life',
      path : '/about/professionallife',
      element : <ProfessionalLife/>,
      wrapWithLayout : true,
      meta : {
        description: "Derek Antrican's professional life",
        meta: {
          property: {
            //Todo: og:image
          }
        }
      },
    },
    {
      title : 'Hobbies',
      path : '/about/hobbies',
      element : <Hobbies/>,
      wrapWithLayout : true,
      meta : {
        description: "Derek Antrican's hobbies",
        meta: {
          property: {
            //Todo: og:image
          }
        }
      },
    }]
},
{
  title : 'Calendar',
  path : '/calendar',
  element : <Calendar/>,
  wrapWithLayout : true,
  meta : {
    description: "Derek's Calendar",
    meta: {
      property: {
        //Todo: og:image
      }
    }
  },
},
{
  title : 'Projects',
  path : '/projects',
  element : <Projects/>,
  wrapWithLayout : true,
  meta : {
    description: "Derek Antrican's projects",
    meta: {
      property: {
        //Todo: og:image
      }
    }
  },
},
{
  title : 'Blogs',
  path : '/blogs',
  element : <Blogs/>,
  wrapWithLayout : true,
  meta : {
    description: "Derek Antrican's blogs",
    meta: {
      property: {
        //Todo: og:image
      }
    }
  },
},
{
  title : 'Halal tips',
  path : '/halal',
  element : <HalalTips/>,
  wrapWithLayout : true,
  unlisted : true,
},
{
  title : 'Turkish Resources',
  path : '/turkish',
  element : <TurkishResources/>,
  wrapWithLayout : true,
  unlisted : true,
},
{
  title : 'Giveaway',
  path : '/giveaway',
  element: <Giveaway/>,
  wrapWithLayout: false,
  unlisted: true,
},
{
  title: 'Dev',
  path : '/dev',
  element: <></>, //Todo: have a login page (with TOTP) that will open up some admin options on the website
  wrapWithLayout : true,
  unlisted : true,
}];