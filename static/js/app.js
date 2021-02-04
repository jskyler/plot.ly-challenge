function optionChanged(index) {
    d3.json("samples.json").then(function (data) {

        var filteredData = data.samples.filter(row => row.id == index);
        console.log(filteredData);

        getPlots(filteredData[0])

        var panelData = data.metadata.filter(row => row.id == index);
        getDemos(panelData[0]);

    });
 
}


function getDemos(plotData) {
    d3.json("samples.json").then((demos) => {

        console.log(plotData)
        var demoDetails = d3.select("#sample-metadata");

        demoDetails.html("");

        Object.entries(plotData).forEach((key)=> {
            demoDetails.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n")
        });

    });
}


function getPlots(plotData) {

    console.log('Hi' + plotData);

    var sampleValues  = plotData.sample_values.slice(0,10);
    console.log(sampleValues);
    var otuLabels = plotData.otu_labels.slice(0,10);
    console.log(otuLabels);
    var otuIds = plotData.otu_ids.slice(0,10);
    console.log(otuIds)

    var trace1 = {
        x: sampleValues.reverse(),
        y: otuIds.map(object => "OTU " + object).reverse(),
        text: otuLabels.reverse(),
        type: "bar",
        orientation: "h"
    };

    var data1 = [trace1];

    var layout = {
        title: "Top 10 OTUs"
    }

    Plotly.newPlot("bar", data1, layout);

    var trace2 = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: 'Earth'}
    };

    var data2 = [trace2];

    var layout2 = {
        xaxis: {title: "OTU ID"},
        height: 600,
        width: 1000
    };

    Plotly.newPlot("bubble", data2, layout2);
    
}


function init() {

    var dropdown = d3.select('#selDataset');

    d3.json("samples.json").then((data) => {

        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value",name);
        });

        var startData = data.samples[0]
        console.log(data);
        
        getPlots(startData);
        getDemos(startData);

        var metadata = data.metadata[0];
        getDemos(metadata);

    });
}

init();