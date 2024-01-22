export const languages = [{
  name : "C#",
  link : "https://docs.microsoft.com/en-us/dotnet/csharp/",
  icon : "https://static-00.iconduck.com/assets.00/c-sharp-c-icon-1822x2048-wuf3ijab.png",
},
{
  name : "Python",
  link : "",
  icon : "",
},
{
  name : "Javascript",
  link : "https://www.javascript.com/",
  icon : "https://static-00.iconduck.com/assets.00/javascript-js-icon-2048x2048-nyxvtvk0.png",
},
{
  name : "XAML",
  link : "https://learn.microsoft.com/en-us/dotnet/desktop/wpf/xaml",
  icon : "https://user-images.githubusercontent.com/7389110/76443001-aa91c180-63b9-11ea-99c1-2ef5362479ce.png",
}];

export const technologies = [{
  name : "Avalonia",
  link : "http://avaloniaui.net/",
  icon : "https://avatars.githubusercontent.com/u/58937344?s=400&v=4",
},
{
  name : "Visual Studio",
  link : "https://visualstudio.microsoft.com/",
  icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Visual_Studio_Icon_2019.svg/1024px-Visual_Studio_Icon_2019.svg.png",
},
{
  name : "Google Apps Script",
  link : "https://developers.google.com/apps-script",
  icon : "https://derekantrican.com/images/googleappsscript.png",
},
{
  name : "React",
  link : "https://react.dev/",
  icon : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
}];

//Other projects I could list:
// - React websites (Readdit, Tea Time, )
// - Clockwork
// - OctoPrint-Webhooks
// - YouTubeSubscriptionDownloader?
// - Gantt Chart?
// - WatchFace?
// - picroft (even though it's not active anymore, the 'mute button' project would show that I have hardware skills as well)
// - Chrome extensions (TrelloBugFeatureColors - though I don't know if it still works)
// - APCAlert?
// - 
//For some of these, they're not a great show of skill, but they might be worth adding just for more listings

//I could also talk about things on my HomeServer - but all that stuff is private

export const projects = [{
  name : "Bulk Edit Calendar Events",
  description : "A cross-platform desktop program for editing Google Calendar events in bulk",
  users : "~25,000",
  icon : "https://bulkeditcalendarevents.com/images/screenshots/main.png",
  website : "https://bulkeditcalendarevents.com",
  languages : [
    "C#",
    "XAML",
  ],
  technologies : [
    "Avalonia",
    "Visual Studio",
  ],
  //Maybe keywords? Like 'desktop, Windows, macOS, customer-support, async, API, etc'
},
{
  name : "GAS-ICS-Sync",
  description : "A script for syncing ics/ical calendars to Google Calendar faster than the 12 hour cadence provided natively by Google Calendar",
  users : "1,200 stars on GitHub, probably 5-10x that many users",
  icon : "https://derekantrican.com/images/gas-ics-sync.png",
  github : "https://github.com/derekantrican/GAS-ICS-Sync",
  languages : [
    "Javascript",
  ],
  technologies : [
    "Google Apps Script",
  ],
},
{
  name : "MountainProjectBot",
  description : "An HTML scraper and reddit bot to link MountainProject.com and various climbing subreddits, replying automatically to posts with climbing information",
  icon : "https://derekantrican.com/images/reddit_bot.png",
  github : "https://github.com/derekantrican/MountainProject",
  languages : [
    "C#",
  ],
  technologies : [
    "Visual Studio",
  ],
}];