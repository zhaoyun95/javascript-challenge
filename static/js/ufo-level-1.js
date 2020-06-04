// from data.js
var allData = data;

function populateTable(displayData) {
    // get table body and empty it
    var tbody = d3.select("tbody");
    tbody.selectAll('tr').remove();

    console.log(`length of data: ${displayData.length}`);

    // pupulate table with UFO sighting data
    displayData.forEach(sighting => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            row.append("td").text(value);
        });
    });
}

// populate table with all data
populateTable(allData);

var filter_button = d3.select("#filter-btn");
var form = d3.select("#filter-form");

filter_button.on("click", filterTable);
form.on("submit", filterTable);


// filter sighting table based on date entered
function filterTable() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    var dateElement = d3.select("#datetime");
    var dateValue = dateElement.property("value");

    console.log(dateValue);

    d3.select("#showInputValue").text(dateValue);

    if (dateValue != "") {  // not empty
        var filteredData = allData.filter( sighting => {
            return sighting.datetime == dateValue;
        });
        populateTable(filteredData);
    } else {
        populateTable(allData);
    }
}