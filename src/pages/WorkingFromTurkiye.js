import { MarkdownPage } from "../components/MarkdownPage";
import { useIsMobile } from "../hooks/isMobile";
import { baseUrl } from "../utils/utils";

export function WorkingFromTurkiye() {
  const isMobile = useIsMobile();

  const content = `
  # Working from Türkiye
  
  From July 15 - August 15, 2024 I'll be working from Istanbul, Türkiye! I love the country of Türkiye (this will be my 4th visit) and
  wanted to spend some extended time there. I didn't want to request vacation time for this large chunk of time and also wanted the
  experience of working from a very different timezone.

  I'll be taking time on both ends of my trip (July 15 & 16, August 15 & 16) for "travel days", but currently plan on working any other weekday in between.

  ## Working hours

  My plan is to work approximately 2pm to 10pm Istanbul time (ending my day at noon in PDT). Here is a table of my hours:

  ![|${isMobile ? '100%' : '40%'}](${baseUrl()}/images/turkiye_work_hours.png)

  If you'd like to schedule a meeting with me, here is a helpful tool: [meeting planner|_blank](https://www.timeanddate.com/worldclock/meetingtime.html?p1=234&p2=179&p3=107&iv=0)
  (just keep in mind my "shifted hours" of 2pm - 10pm to make scheduling with PST easier)

  ## Meeting attendance

  Here is how I plan to attend the usual meetings:

  - **1-on-1:** plan to attend
  - **Build System - Service Health:** plan to attend
  - **Build System - Triage:** plan to attend (with a hard stop at noon)
  - **Build System - Weekly Status:** plan to attend (with a hard stop at noon)
  - **ICM incident review:** plan to attend (with a hard stop at noon)
  - **Velocity project demo/launch:** will watch the recording the next day (unless, by chance, I am presenting something - then I will stay up late to attend)
  - **Lunch and weekly wind down:** may attend for a bit (with a hard stop at noon)
  - **Engineering Service Review:** attend if presenting

  ## Communication

  Finally, feel free to ping me in my "off hours". I'll have Teams & Outlook installed on my phone and if you have an urgent question,
  I'll do my best to be available.

  *Click on one of the icons below to contact me on that platform*
  `;

  return (
    <div style={{height: 'calc(100% - 40px)', overflowY: 'auto', padding: '20px 10%'}}>
      <MarkdownPage content={content} imageStyles={{margin: 10, objectFit: 'cover'}}/>
      <div>
        <a href="sip:deantric@microsoft.com">
          <img style={{width: isMobile ? '20%' : '10%', margin: 10}} src="https://cdn0.iconfinder.com/data/icons/logos-microsoft-office-365/128/Microsoft_Office-10-512.png"/>
        </a>
        <a href="mailto:deantric@microsoft.com">
          <img style={{width: isMobile ? '20%' : '10%', margin: 10}} src="https://cdn.jim-nielsen.com/macos/512/microsoft-outlook-2022-08-02.png"/>
        </a>
      </div>
    </div>
  );
}