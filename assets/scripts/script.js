$(document).ready(function() {

    var now = moment();
    var thisHour = now.hour();
    var tempTime = moment();

    var dateDisplay = now.format("dddd, MMMM Do");

    var timeBlockContainer = $(".container");
    $("#currentDay").text(dateDisplay);
    
    // 9AM - 5PM
    for (var i=9; i <= 17; i++) {
        tempTime.hour(i);
        var dateTimeKey = tempTime.format(`YYYY-MM-DD-${i}`);
        // is it past, present, or future?
        var pastPresentFuture;
        if (thisHour > i) {
            pastPresentFuture = "past";
        } else if (thisHour == i) {
            pastPresentFuture = "present";
        } else {
            pastPresentFuture = "future";
        }
        var timeRow = $("<div>").addClass("row time-block");
        var hourBlock = $("<div>").addClass("col-1 hour").text(tempTime.format("hA"));
        var textAreaBlock = $("<textarea>").addClass(`col-10 ${pastPresentFuture}`).text(retrieveHourPlan(dateTimeKey)).attr("id", dateTimeKey);
        var saveButtonBlock = $("<button>").addClass("col-1 saveBtn").attr("data-key", dateTimeKey).attr("id", i);
        var icon = $("<i>").addClass("fas fa-save");
        icon.appendTo(saveButtonBlock);
        hourBlock.appendTo(timeRow);
        textAreaBlock.appendTo(timeRow);
        saveButtonBlock.appendTo(timeRow);
        timeRow.appendTo(timeBlockContainer);
    }

    $(".saveBtn").on("click", function() {
        var timeKey = this.getAttribute("data-key");
        var textValue = this.previousElementSibling.value;
        saveHourPlan(timeKey, textValue);
    });

    function saveHourPlan(time_key, text_content) {
        localStorage.setItem(time_key, text_content);
    }

    function retrieveHourPlan(time_key) {
        return localStorage.getItem(time_key) || "";
    }


});