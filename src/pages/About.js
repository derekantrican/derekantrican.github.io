import '../styles/about.css'
import { useIsMobile } from '../hooks/isMobile';
import { MarkdownPage } from '../components/MarkdownPage';
import { baseUrl } from '../utils/utils';

export function About() {
  const isMobile = useIsMobile();

  const content = `
  # Hi, I'm Derek!

  I'm a software developer by profession and hobby, with a passion for building programs that simplify or automate workflows.

  I currently work as a Software Engineer for Microsoft on the Office Engineering team, creating tools to support those who work on Office products.

  I also like the outdoors: rock climbing, camping, hiking ([PCT 2015](${baseUrl()}/blogs)), etc!

  ## Personality

  I'm a very driven person and, inspired by the quote _"Be the change you wish to see in the world"_, try to do just that.
  So I try to stay on top of communication, help others improve their use of technology (eg with automation), and invite foreigners
  and refugees into my home ([Tea Time|_blank](https://tea-time.social)).
  `;

  return (
    <div style={{display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', width: isMobile ? '100%' : '75%'}}>
      <img style={{width: isMobile ? '90%' : '45%', height: 'auto', objectFit: 'cover', marginTop: 20, borderRadius: 20 }} src='images/profile_med.jpg'/>
      <div className='about' style={{margin: '0px 35px'}}>
        <MarkdownPage content={content}/>
      </div>
    </div>
  );
}