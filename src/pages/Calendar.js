export function Calendar() {

  //This function is a complicated function for building up the embedded calendar url,
  //but makes it easier to tweak the embedded calendars if I need to
  const calendarSrc = () => {
    const baseUrl = 'https://calendar.google.com/calendar/embed?';
    const urlProps = {
      'title' : 'Derek Antrican\'s Calendar',
      'mode' : 'WEEK',
      'height' : 600,
      'wkst' : 1,
      'bgcolor' : '#FFFFFF',
      'ctz' : 'America/Los_Angeles',
      'calendars' : [
        {
          //derekantrican@gmail.com calendar
          'src' : 'derekantrican@gmail.com',
          'color' : '#2952A3',
        },
        {
          //Daily Routine calendar
          'src' : 'c3ins1sptk096cturh9miq1fh8@group.calendar.google.com',
          'color' : '#853104',
        },
        {
          //US holidays calendar
          'src' : 'usa__en@holiday.calendar.google.com',
          'color' : '#691426',
        },
        {
          //Travel calendar
          'src' : '0rjqhei6kll2ctt0dnf2csvreo@group.calendar.google.com',
          'color' : '#B1365F',
        },
        {
          //Work calendar
          'src' : '9knhmt5mqsqhnrgcj6v5np1ea0@group.calendar.google.com',
          'color' : '#711616',
        },
        {
          //Antrican calendar
          'src' : 'jioo99046g13ul1ko3b3japcqo@group.calendar.google.com',
          'color' : '#2952A3',
        },
      ],
    };
    
    const urlSerializeObject = (obj) => {
      return Object.keys(obj).map(key => {
        if (Array.isArray(obj[key])) {
          return obj[key].map(subobj => urlSerializeObject(subobj)).join('&');
        }
        else {
          return `${key}=${encodeURIComponent(obj[key])}`;
        }
      }).join('&');
    };

    return baseUrl + urlSerializeObject(urlProps);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', width: 'calc(100% - 20px)', margin: '0px 10px'}}>
      {/*Todo: allow sidebar to still be shown without obscuring the content (perhaps this will be fine once sidebar is turned into a show/hide behavior) */}
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
        <strong>Key: </strong>
        {/*Todo: rather than using imgur links, I could use the calendar map above and make the squares directly*/}
        <LegendItem icon='http://i.imgur.com/334XVTX.jpg' name='Personal Calendar'/>
        <LegendItem icon='http://i.imgur.com/rS6RBK3.jpg' name='Work Calendar'/>
        <LegendItem icon='http://i.imgur.com/ODS6Twe.jpg' name='Travel Calendar'/>
        <LegendItem icon='http://i.imgur.com/LDJEHNa.jpg' name='Daily Routine'/>
      </div>
      <iframe style={{height: '100%', width: '100%', borderWidth: 0}} src={calendarSrc()}/>
    </div>
  );
}

function LegendItem(props) {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <img style={{margin: 5}} src={props.icon}/>
      <span>= {props.name} ;</span>
    </div>
  );
}