import '../styles/professionalLife.css';
import { MarkdownPage } from "../components/MarkdownPage";
import { useIsMobile } from "../hooks/isMobile";
import { baseUrl } from "../utils";

//Todo: the <p> sizing is coming from about.css. Find a way to keep that separate

export function ProfessionalLife() {
  const isMobile = useIsMobile();

  const content = `
  ![Microsoft|${isMobile ? '70%' : '30%'}](${baseUrl()}/images/microsoft_logo.png)
  
  ## What part of Microsoft do I work for?
  
  I work at Microsoft on the Office Build System team. We are part of the Office Engineering System - a team of people maintaining the engineering system
  (code storage, building, testing, deployment, etc) for the developers of Office (Word, Excel, Powerpoint, etc). Kinda like how sound & lighting
  engineers might support a band behind the scenes. My immediate team maintains the build system - building the written code into an actual, runnable program.
  Any time an Office product needs to be built (whether it's just because a Word developer is testing their next change or because a new version of Office
  is being shipped), it uses our code.

  I don't have any special insight into why Microsoft (as a company) makes any specific choices and I definitely don't have any special knowledge about
  Windows - I can't help you fix your Windows license or problems any more than your average tech-savvy friend ;)

  ## What languages do I use at work?

  I use a lot of different languages at work! It depends on the proper tool for the job, the environment I'm working in, and sometimes it's just whatever
  I'm feeling like writing in.

  On my team, we mainly use C#, but we also work in [DScript](https://github.com/microsoft/BuildXL/blob/main/Documentation/Wiki/DScript/Introduction.md)
  (based on TypeScript), YAML, and a couple others.

  Office Engineering writes a lot of shortcut tools for developers (eg the command \`pr\` is a shortcut command to open a pull request) and a lot of those
  shortcut commands are written in perl.

  Throughout my time here I've also used quite a bit of PowerShell, cmd/batch (of course), and a little bit of python.

  ## What tools do I like to use?

  ### Software:
  
  - Visual Studio (for full solutions)
  - Visual Studio Code (for smaller projects and single files)
  - Notepad++ for quick notes or quick file editing
  - Todoist for todos
  - Obisidian.md for detailed notes
  - Git for source control
  - Azure DevOps for work items, source control, CI/CD, etc
  - Windows Terminal to do most work
  - Self-built tools for anything else

  ### Hardware:

  - Logitech G610 mechanical keyboard
  - Bose QC35 II headphones
  - Dell U2717D monitors (3)
  `;

  return (
    <div className='professionalLife' style={{width: isMobile ? '' : '75%', height: '100%', padding: 35}}>
      <MarkdownPage content={content} imageStyles={{objectFit: 'cover'}}/>
    </div>
  );
}