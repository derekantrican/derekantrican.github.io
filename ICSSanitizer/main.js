const corsProxy = "https://cors-anywhere.herokuapp.com/";

$(function(){
    $('#btn').click(function(){
        var link = $('#link').val().replace("webcal://", "https://");
        $("#textArea").val("Working...");
        $.get(corsProxy + link)
        .done(function (data) { processICS(data); })
        .fail(function (err) { alert(`Error accessing \"${link}\"\n\n${err.responseText}`); });
    });
});

function processICS(icsString){
    if (!icsString.includes("BEGIN:VCALENDAR")){
        alert("Invalid ICS file");
        return;
    }

    var jcalData = ICAL.parse(icsString);
    var component = new ICAL.Component(jcalData);
    var allEvents = component.getAllSubcomponents("vevent");

    modifyCalendar(component);
    allEvents.forEach(modifyEvent);

    $("#textArea").val(component.toString());
}

function modifyCalendar(component){
    switch ($("input[name=calName]:checked").val()){
        case "scramble":
            if (component.hasProperty("name"))
                component.getFirstProperty("name").setValue(md5(component.getFirstPropertyValue("name")));
            else if (component.hasProperty("x-wr-calname"))
                component.getFirstProperty("x-wr-calname").setValue(md5(component.getFirstPropertyValue("x-wr-calname")));
            break;
        case "remove":
            if (component.hasProperty("name"))
                component.getFirstProperty("name").setValue("");
            else if (component.hasProperty("x-wr-calname"))
                component.getFirstProperty("x-wr-calname").setValue("");
            break;
    }

    switch ($("input[name=calDesc]:checked").val()){
        case "scramble":
            if (component.hasProperty("x-wr-caldesc"))
                component.getFirstProperty("x-wr-caldesc").setValue(md5(component.getFirstPropertyValue("x-wr-caldesc")));
            break;
        case "remove":
            if (component.hasProperty("x-wr-caldesc"))
                component.getFirstProperty("x-wr-caldesc").setValue("");
            break;
    }

    switch ($("input[name=calProdid]:checked").val()){
        case "scramble":
            if (component.hasProperty("prodid"))
                component.getFirstProperty("prodid").setValue(md5(component.getFirstPropertyValue("prodid")));
            break;
        case "remove":
            if (component.hasProperty("prodid"))
                component.getFirstProperty("prodid").setValue("");
            break;
    }
}

function modifyEvent(vevent){
    vevent = new ICAL.Event(vevent, {strictExceptions: true});

    switch ($("input[name=eventTitle]:checked").val()){
        case "scramble":
            vevent.summary = md5(vevent.summary);
            break;
        case "remove":
            vevent.summary = "";
            break;
    }
    
    switch ($("input[name=eventDesc]:checked").val()){
        case "scramble":
            vevent.description = md5(vevent.description);
            break;
        case "remove":
            vevent.description = "";
            break;
    }

    switch ($("input[name=eventLoc]:checked").val()){
        case "scramble":
            vevent.location = md5(vevent.location);
            break;
        case "remove":
            vevent.location = "";
            break;
    }
            
    switch ($("input[name=eventUid]:checked").val()){
        case "scramble":
            vevent.uid = md5(vevent.uid);
            break;
        case "remove":
            vevent.uid = "";
            break;
    }
}
