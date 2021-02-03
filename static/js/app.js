function getPlots(id) {

    d3.json("samples.json").then((importedData) => {
        console.log(importedData);

        var ids = importedData.samples[0].otu_ids;
        console.log(ids)
        
        var sampleValues  = importedData.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        
        var otuLabels = importedData.samples[0].otu_labels.slice(0,10).reverse();
        console.log(otuLabels)
        
        var top_otu = importedData.samples[0].otu_ids.slice(0,10).reverse();
        console.log(top_otu)

        var id_otu = top_otu.map(d => "OTU " + d);
        console.log(`OTU IDs: ${id_otu}`)

        var trace1 = {
            x: sampleValues,
            y: id_otu,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };

        var data1 = [trace1];

        var layout = {
            title: "Top 10 OTUs"
        }

        Plotly.newPlot("bar", data1, layout);

        var trace2 = {
            x: ids,
            y: importedData.samples[0].sample_values,
            mode: "markers",
            
            marker: {
                size: importedData.samples[0].sample_values,
                color: importedData.samples[0].otu_ids,
                colorscale: 'Earth'}
        };

        var layout2 = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };

        var data2 = [trace2];

        Plotly.newPlot("bubble", data2, layout2);
    
    });
}

function getDemos(id) {
    d3.json("samples.json").then((demos) => {

        var metadata = demos.metadata;
        console.log(metadata)
    });
}

function optionChanged(id) {
    getPlots(id);
    getDemos(id);
}

function init() {

    var dropdown = d3.select('#selDataset');

    d3.json("samples.json").then((data) => {
        console.log(data)

        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        getPlots(data.names[0]);
        getDemos(data.names[0]);

    });
}

init();