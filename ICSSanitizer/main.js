$(function(){
    $('#btn').click(function(){
        $.get("http://www.instantcal.com/test.ics", function (data) { console.log(data);});
    });
});
