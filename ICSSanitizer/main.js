$(function(){
    $('#btn').click(function(){
        $.get("https://www.google.com/calendar/ical/hdpka717lurrk1qu3pds5q7u40%40group.calendar.google.com/public/basic.ics", function (data) { console.log(data);});
    });
});
