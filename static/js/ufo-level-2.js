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

    // get all filter values and convert string to lower case
    var dateValue = d3.select("#datetime").property("value");
    var cityValue = d3.select("#city").property("value").toLowerCase();
    var stateValue = d3.select("#state").property("value").toLowerCase();
    var countryValue = d3.select("#country").property("value").toLowerCase();
    var shapeValue = d3.select("#shape").property("value").toLowerCase();

    console.log(`dateValue: ${dateValue}`);
    console.log(`cityValue: ${cityValue}`);
    console.log(`stateValue: ${stateValue}`);
    console.log(`countryValue: ${countryValue}`);
    console.log(`shapeValue: ${shapeValue}`);

    var outputList = d3.select("#showInputValue");
    outputList.selectAll('li').remove();
    var filterValues = {'date':dateValue, 'city':cityValue, 'state':stateValue, 'country':countryValue, 'shape':shapeValue};
    Object.entries(filterValues).forEach(([key, value])=> {
        var listItem = outputList.append('li');
        listItem.text(`${key} : ${value}`);
    });

    var filteredData = allData;
    
    // filter by date
    if (dateValue != "") {
        filteredData = filteredData.filter( sighting => {
            return sighting.datetime == dateValue;
        });
    };
    
    // filter by city
    if (cityValue != "") {
        filteredData = filteredData.filter( sighting => {
            return sighting.city == cityValue;
        });
    };
    
    // filter by state
    if (stateValue != "") {
        filteredData = filteredData.filter( sighting => {
            return sighting.state == stateValue;
        });
    };
    
    // filter by country
    if (countryValue != "") {
        filteredData = filteredData.filter( sighting => {
            return sighting.country == countryValue;
        });
    };
    
    // filter by shape
    if (shapeValue != "") {
        filteredData = filteredData.filter( sighting => {
            return sighting.shape == shapeValue;
        });
    };            

    populateTable(filteredData);
}