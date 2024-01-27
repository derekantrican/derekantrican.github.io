import '../styles/hobbies.css';
import { MarkdownPage } from "../components/MarkdownPage";
import { useIsMobile } from "../hooks/isMobile";
import { baseUrl } from "../utils/utils";

export function Hobbies() {
  const isMobile = useIsMobile();

  const content = `
  # Hobbies
  Here are just a few of my main hobbies & areas of interest

  ## Programming

  ![|${isMobile ? '50%' : '15%'}|right](${baseUrl()}/images/programming.png)

  Programming is by far my biggest hobby. I love building different [projects](${baseUrl()}/projects). Basically, if there's
  either not a program out there for something I want (or there is, but it's too expensive or it doesn't work the way I want),
  then I create my own tool or modification (eg Chrome extension). I like learning new technologies & languages and expanding
  my knowledge. Some of the new technologies I've learned are [React.js|_blank](https://react.dev), [Avalonia|_blank](https://avaloniaui.net),
  and different technologies for building my own home server.

  I also like building automation solutions. I've built some very popular tools like [Bulk Edit Calendar Events|_blank](https://bulkeditcalendarevents.com)
  and [GAS-ICS-Sync|_blank](https://github.com/derekantrican/GAS-ICS-Sync) (terrible names) that have helped a lot of people simplify
  their workflows. I believe that any repeatable task can be automated - it's just a matter of how difficult it is to automate
  it.

  ![|${isMobile ? '50%' : '20%'}|left](${baseUrl()}/images/pct_finish.jpg)

  ${!isMobile ? '&nbsp;  \n'.repeat(window.innerWidth > 1300 ? (window.innerWidth - 1300) / 200 : 0) : '' /*Add some better position of paragraph on desktop*/}

  ## Outdoors
  My other main hobby is being outdoors! I like hiking, camping, rock climbing, kayaking, and more! One of my biggest accomplishments
  is through-hiking the 2500-mile Pacific Crest Trail (which stretches from Mexico to Canada) in the summer of 2015. This took
  me about 5 months and you can read more about my experience [here](${baseUrl()/*Todo: update this url once the blogs page is up*/}/blogs/pct).

  Additionally, I love taking my friends camping! I try to go camping often every year - whether it's at a drive-in campsite or
  miles into the wilderness on a backpacking trail.

  ${!isMobile ? '&nbsp;  \n'.repeat(window.innerWidth > 1300 ? (window.innerWidth - 1300) / 200 : 0) : '' /*Add some better position of paragraph on desktop*/}

  ![|${isMobile ? '50%' : '20%'}|right](${baseUrl()}/images/holiday_potluck.jpg)

  ## Turkish culture
  My wife and I have a big passion for Turkish culture! We really like the food, the country, and are working on learning the Turkish
  language (_bize şans dile!_). We have a lot of Turkish friends, both here in the Seattle area (a community over 1000, with around
  100 that we know by name) and in Türkiye. We see them often and do all kinds of things together (going to each others' houses
  for dinner, attending various cultural events such as iftar dinners, playing volleyball, and teaching them about American
  traditions like decorating a Christmas tree or carving pumpkins).

  At our church, we have held large interfaith events where Christians & Muslims get together to share a meal and celebrate a holiday.
  For instance, every year we hold a Thanksgiving event for both Turks (who are Muslim) and Christians got together for a halal
  potluck, entertainment, prayer, and insightful thoughts shared from each side. Over 200 people came and it is always a great evening
  for all!
  `;

  //Other hobbies I could list:
  // - 3D printing
  // - Cooking?

  return (
    <div className='hobbies' style={{height: '100%', overflowY: 'auto', padding: '20px 10%'}}>
      <MarkdownPage content={content} imageStyles={{margin: 10, objectFit: 'cover'}}/>
    </div>
  );
}