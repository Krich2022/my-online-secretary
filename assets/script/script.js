// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const today = dayjs();
const hoursArray = [12, 1, 2, 3, 4, 5];
const currentHour = dayjs().hour();
let hourContainerId = 12;
$(function () {
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    for (let i = 0; i < hoursArray.length; i++) {
        let div = $("<div>").attr({
            id: `hour-${hourContainerId}`,
            class: "row time-block",
        });
        div.html(`<div class="col-2 col-md-1 hour text-center py-3">${hoursArray[i]}PM</div>
  <textarea class="col-8 col-md-10 description" rows="3"></textarea>
  <button class="btn saveBtn col-2 col-md-1" aria-label="save">
    <i class="fas fa-save" aria-hidden="true"></i>
  </button>`);
        $("#scheduleContainer").append(div);
        let hourContainers = $('[id*="hour"]');
        hourContainers.each(function () {
            let container = this.id;
            let hour = container.split("-"[1]);
            if (hour)
                if (hour < currentHour) {
                    this.classList.add("past");
                } else if (hour > currentHour) {
                    this.classList.add("future");
                } else {
                    this.classList.add("present");
                }
            $(this).find("textarea").text(localStorage.getItem(container));
            $(this)
                .find("button")
                .on("click", () => {
                    let userEvents = $(this).find("textarea").val();
                    localStorage.setItem(container, userEvents);
                });
            hourContainerId++;
        });
    }
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
    $("#currentDay").text(today.format("M/D/YYYY"));
});
