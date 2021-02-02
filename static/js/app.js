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

    var data = [trace1];

    var layout = {
        title: "Top 10 OTUs"
    }

    Plotly.newPlot("bar", data, layout);


});