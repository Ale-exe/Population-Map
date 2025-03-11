let arr09 = []; let arr19 = []; let arr29 = []; let arr39 = []; let arr49 = [];
let arr59 = []; let arr69 = []; let arr79 = []; let arr89 = []; let arr99 = [];
let arr100 = [];

let arrTotals9 = []; let arrTotals19 = []; let arrTotals29 = []; let arrTotals39 = [];
let arrTotals49 = []; let arrTotals59 = []; let arrTotals69 = []; let arrTotals79 = [];
let arrTotals89 = []; let arrTotals99 = []; let arrTotals100 = [];

(async () => {

    fetch('ageDataByRegion.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`JSON error`);
            }
            return response.json();
        })
        .then(jsonData => {
            let jsondata = JSON.stringify(jsonData);

            let jsondata2 = JSON.parse(jsondata);


            for (let i = 0; i < jsondata2.length; i++) {
                if (Number(jsondata2[i].Age) < 10) {
                    arr09.push(jsondata2[i]);
                } else if (Number(jsondata2[i].Age) >= 10 && Number(jsondata2[i].Age) < 20) {
                    arr19.push(jsondata2[i])
                } else if (Number(jsondata2[i].Age) >= 20 && Number(jsondata2[i].Age) < 30) {
                    arr29.push(jsondata2[i])
                } else if (Number(jsondata2[i].Age) >= 30 && Number(jsondata2[i].Age) < 40) {
                    arr39.push(jsondata2[i])
                } else if (Number(jsondata2[i].Age) >= 40 && Number(jsondata2[i].Age) < 50) {
                    arr49.push(jsondata2[i])
                } else if (Number(jsondata2[i].Age) >= 50 && Number(jsondata2[i].Age) < 60) {
                    arr59.push(jsondata2[i])
                } else if (Number(jsondata2[i].Age) >= 60 && Number(jsondata2[i].Age) < 70) {
                    arr69.push(jsondata2[i])
                } else if (Number(jsondata2[i].Age) >= 70 && Number(jsondata2[i].Age) < 80) {
                    arr79.push(jsondata2[i])
                } else if (Number(jsondata2[i].Age) >= 80 && Number(jsondata2[i].Age) < 90) {
                    arr89.push(jsondata2[i])
                } else if (Number(jsondata2[i].Age) >= 90 && Number(jsondata2[i].Age) < 100) {
                    arr99.push(jsondata2[i])
                } else {
                    arr100.push(jsondata2[i])
                }

            }

            arrAgeSplit(arr09, 9);
            arrAgeSplit(arr19, 19);
            arrAgeSplit(arr29, 29);
            arrAgeSplit(arr39, 39);
            arrAgeSplit(arr49, 49);
            arrAgeSplit(arr59, 59);
            arrAgeSplit(arr69, 69);
            arrAgeSplit(arr79, 79);
            arrAgeSplit(arr89, 89);
            arrAgeSplit(arr99, 99);
            arrAgeSplit(arr100, 100);

            // console.log("arrtotals for selected array")
            // console.log(arrTotals9)
        })


    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/gb/gb-all.topo.json'
    ).then(response => response.json());




    // Current data category of age
    let data = [[]]

    for (let i = 0; i < arrTotals9.length; i++){
        console.log("")
        data.push([arrTotals9[i].name, arrTotals9[i].qty]);
    }

    console.log(data);



    // Create the chart
    Highcharts.mapChart('mapContainer', {
        chart: {
            map: topology,
            height: '40%'
        },

        title: {
            text: 'Highcharts Maps basic demo'
        },

        subtitle: {
            text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/gb/gb-all.topo.json">United Kingdom</a>'
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },

        colorAxis: {
            min: 0
        },

        series: [{
            data: data,
            name: 'Area Specific Data',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }]
    });

})();

// Condenses main arrays for each age bracket into an array containing summed totals from each category of ages
// e.g. 0-9, 10-19, etc
function arrAgeSplit(arrName, maxAge){
    // For all but the age 100 array
    if(maxAge !== 100){
        let recordCount = 0;
        let valueCount = 0;

        for (let i = 0; i < arrName.length; i++) {
            recordCount = recordCount + 1;

            if (recordCount < 10) {
                valueCount = valueCount + Number(arrName[i].Observation);

            } else if (recordCount === 10) {
                valueCount = valueCount + Number(arrName[i].Observation);

                eval('arrTotals' + maxAge).push(
                    {name: arrName[i].Location, qty: valueCount}
                )

                recordCount = 0;
                valueCount = 0;
            }
        }

        // For the age 100+ array
    } else {
        for (let i = 0; i < arrName.length; i++) {
            arrTotals100.push(
                {name: arrName[i].Location, qty: arrName[i].Observation}
            )
        }
    }

}

