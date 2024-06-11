import { MarkdownPage } from "../components/MarkdownPage";
import { useIsMobile } from "../hooks/isMobile";
import { baseUrl } from "../utils/utils";

export function WorkingFromTurkiye() {
  const isMobile = useIsMobile();

  const content = `
  # Working from Turkiye
  From July 15 - August 15, 2024 I'll be working from Istanbul, Turkiye! I love the country of Turkiye (this will be my 4th visit) and
  wanted to spend some extended time there. I didn't want to request vacation time for this large chunk of time and also wanted the
  experience of working from a very different timezone.

  I'll be working approximately 2pm to 10pm Istanbul time (ending my day at noon in PDT). Here is a table of my hours:

  ![|${isMobile ? '100%' : '40%'}](${baseUrl()}/images/turkiye_work_hours.png)

  If you'd like to schedule a meeting with me, here is a helpful tool: [meeting planner](https://www.timeanddate.com/worldclock/meetingtime.html?p1=234&p2=179&p3=107&iv=0)

  Finally, feel free to ping me in my "off hours". I'll have Teams & Outlook installed on my phone and if you have an urgent question,
  I'll do my best to be available.
  `;

  return (
    <div style={{height: 'calc(100% - 40px)', overflowY: 'auto', textAlign: 'center', padding: '20px 10%'}}>
      <MarkdownPage content={content} imageStyles={{margin: 10, objectFit: 'cover'}}/>
    </div>
  );
}