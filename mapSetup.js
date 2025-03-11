let arr09 = []; let arr19 = []; let arr29 = []; let arr39 = []; let arr49 = [];
let arr59 = []; let arr69 = []; let arr79 = []; let arr89 = []; let arr99 = [];
let arr100 = [];

let arrTotals9 = []; let arrTotals19 = []; let arrTotals29 = []; let arrTotals39 = [];
let arrTotals49 = []; let arrTotals59 = []; let arrTotals69 = []; let arrTotals79 = [];
let arrTotals89 = []; let arrTotals99 = []; let arrTotals100 = [];

let arraySelected = arrTotals9;


async function createMap(){





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


    console.log("arr selected")
    console.log(arraySelected)

    let data = pushToArray(arraySelected)

    console.log(data)

    // Current data category of age
    // let data = [[]]
    //
    // for (let i = 0; i < arrTotals9.length; i++){
    //     console.log("")
    //     data.push([arrTotals9[i].name, arrTotals9[i].qty]);
    // }
    //
    // console.log(data);





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

        mapView: {
            center: [-3, 52.7],
            zoom: 7.3
        },


        colorAxis: {
            max: 1000,
            type: 'linear',
            width: '50%'
        },

        legend: {
            borderWidth: 1,


            title: {
                width: 500,
                text: 'People per km²'
            }
        },

        series: [{
            data: data,
            name: 'People per KM/2',
            tooltip: {
                valueSuffix: '/km²'
            },
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

}

function clearArray(){
    arr09 = []; arr19 = []; arr29 = []; arr39 = []; arr49 = []; arr59 = []; arr69 = []; arr79 = []; arr89 = []; arr99 = []; arr100 = [];

    arrTotals9 = []; arrTotals19 = []; arrTotals29 = []; arrTotals39 = []; arrTotals49 = []; arrTotals59 = [];
    arrTotals69 = []; arrTotals79 = []; arrTotals89 = []; arrTotals99 = []; arrTotals100 = [];
}

// (async () => {
//
//     fetch('ageDataByRegion.json')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`JSON error`);
//             }
//             return response.json();
//         })
//         .then(jsonData => {
//             let jsondata = JSON.stringify(jsonData);
//
//             let jsondata2 = JSON.parse(jsondata);
//
//
//             for (let i = 0; i < jsondata2.length; i++) {
//                 if (Number(jsondata2[i].Age) < 10) {
//                     arr09.push(jsondata2[i]);
//                 } else if (Number(jsondata2[i].Age) >= 10 && Number(jsondata2[i].Age) < 20) {
//                     arr19.push(jsondata2[i])
//                 } else if (Number(jsondata2[i].Age) >= 20 && Number(jsondata2[i].Age) < 30) {
//                     arr29.push(jsondata2[i])
//                 } else if (Number(jsondata2[i].Age) >= 30 && Number(jsondata2[i].Age) < 40) {
//                     arr39.push(jsondata2[i])
//                 } else if (Number(jsondata2[i].Age) >= 40 && Number(jsondata2[i].Age) < 50) {
//                     arr49.push(jsondata2[i])
//                 } else if (Number(jsondata2[i].Age) >= 50 && Number(jsondata2[i].Age) < 60) {
//                     arr59.push(jsondata2[i])
//                 } else if (Number(jsondata2[i].Age) >= 60 && Number(jsondata2[i].Age) < 70) {
//                     arr69.push(jsondata2[i])
//                 } else if (Number(jsondata2[i].Age) >= 70 && Number(jsondata2[i].Age) < 80) {
//                     arr79.push(jsondata2[i])
//                 } else if (Number(jsondata2[i].Age) >= 80 && Number(jsondata2[i].Age) < 90) {
//                     arr89.push(jsondata2[i])
//                 } else if (Number(jsondata2[i].Age) >= 90 && Number(jsondata2[i].Age) < 100) {
//                     arr99.push(jsondata2[i])
//                 } else {
//                     arr100.push(jsondata2[i])
//                 }
//
//             }
//
//             arrAgeSplit(arr09, 9);
//             arrAgeSplit(arr19, 19);
//             arrAgeSplit(arr29, 29);
//             arrAgeSplit(arr39, 39);
//             arrAgeSplit(arr49, 49);
//             arrAgeSplit(arr59, 59);
//             arrAgeSplit(arr69, 69);
//             arrAgeSplit(arr79, 79);
//             arrAgeSplit(arr89, 89);
//             arrAgeSplit(arr99, 99);
//             arrAgeSplit(arr100, 100);
//
//             // console.log("arrtotals for selected array")
//             // console.log(arrTotals9)
//         })
//
//
//
//
//     const topology = await fetch(
//         'https://code.highcharts.com/mapdata/countries/gb/gb-all.topo.json'
//     ).then(response => response.json());
//
//
//     let data = pushToArray(arraySelected)
//
//     // Current data category of age
//     // let data = [[]]
//     //
//     // for (let i = 0; i < arrTotals9.length; i++){
//     //     console.log("")
//     //     data.push([arrTotals9[i].name, arrTotals9[i].qty]);
//     // }
//     //
//     // console.log(data);
//
//
//
//
//
//     // Create the chart
//     Highcharts.mapChart('mapContainer', {
//         chart: {
//             map: topology,
//             height: '40%'
//         },
//
//         title: {
//             text: 'Highcharts Maps basic demo'
//         },
//
//         subtitle: {
//             text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/gb/gb-all.topo.json">United Kingdom</a>'
//         },
//
//         mapNavigation: {
//             enabled: true,
//             buttonOptions: {
//                 verticalAlign: 'bottom'
//             }
//         },
//
//
//         colorAxis: {
//             max: 1000,
//             type: 'linear',
//             width: '50%'
//         },
//
//         legend: {
//             borderWidth: 1,
//
//
//             title: {
//                 width: 500,
//                 text: 'People per km²'
//             }
//         },
//
//         series: [{
//             data: data,
//             name: 'People per KM/2',
//             tooltip: {
//                 valueSuffix: '/km²'
//             },
//             states: {
//                 hover: {
//                     color: '#BADA55'
//                 }
//             },
//             dataLabels: {
//                 enabled: true,
//                 format: '{point.name}'
//             }
//         }]
//     });
//
// })();

function changeCategory(number){
    console.log("clicked")


    arraySelected = number;

    createMap(arraySelected);
}

function pushToArray(array){


    // Current data category of age
    let data = [[]]

    for (let i = 0; i < array.length; i++){
        // console.log("")
        data.push([array[i].name, array[i].qty]);
    }

    console.log(data);

    return data;

}


// Returns geographic area data for use in later functions
function getAreaData(locationCode){

    const areaData = [{Location: 'gb-hu', area: 1460}, {Location: 'gb-nf', area: 5384},
        {Location: 'gb-2377', area: 268},{Location: 'gb-ke', area:3543},{Location: 'gb-sf', area:3802},
        {Location: 'gb-ex', area:3670},{Location: 'gb-es', area:1810},{Location: 'gb-ws', area:1991},
        {Location: 'gb-li', area:5921},{Location: 'gb-zh', area:73},{Location: 'gb-ss', area:42},
        {Location: 'gb-mw', area:192},{Location: 'gb-tr', area:63},{Location: 'gb-sr', area:1679},
        {Location: 'gb-hv', area:112},{Location: 'gb-bz', area:150},{Location: 'gb-cn', area:22},
        {Location: 'gb-ef', area:82},{Location: 'gb-nh', area:36},{Location: 'gb-xb', area:61},
        {Location: 'gb-ba', area:36},{Location: 'gb-rb', area:56},{Location: 'gb-wf', area:39},
        {Location: 'gb-gr', area:47},{Location: 'gb-hd', area:116},{Location: 'gb-hr', area:50},
        {Location: 'gb-7149', area:87},{Location: 'gb-hy', area:30},{Location: 'gb-hk', area:19},
        {Location: 'gb-th', area:20},{Location: 'gb-it', area:15},{Location: 'gb-sq', area:29},
        {Location: 'gb-6338', area:3},{Location: 'gb-lw', area:35},{Location: 'gb-cy', area:87},
        {Location: 'gb-be', area:43},{Location: 'gb-we', area:21},{Location: 'gb-ww', area:34},
        {Location: 'gb-lt', area:27},{Location: 'gb-me', area:38},{Location: 'gb-hf', area:16},
        {Location: 'gb-kc', area:12},{Location: 'gb-su', area:44},{Location: 'gb-eg', area:56},
        {Location: 'gb-kt', area:37},{Location: 'gb-ru', area:57},{Location: 'gb-7147', area:30},
        {Location: 'gb-7145', area:109},{Location: 'gb-7146', area:198},{Location: 'gb-bu', area:1876},
        {Location: 'gb-ht', area:1643},{Location: 'gb-2381', area:716},{Location: 'gb-lu', area:43},
        {Location: 'gb-cm', area:3387},{Location: 'gb-bd', area:476},{Location: 'gb-mk', area:309},
        {Location: 'gb-pb', area:343},{Location: 'gb-ps', area:40},{Location: 'gb-ha', area:3769},
        {Location: 'gb-ds', area:2653},{Location: 'gb-bh', area:83},{Location: 'gb-do', area:6707},
        {Location: 'gb-2391', area:65},{Location: 'gb-sm', area:4171},{Location: 'gb-co', area:3562},
        {Location: 'gb-2420', area:80},{Location: 'gb-tb', area:63},{Location: 'gb-2389', area:40},
        {Location: 'gb-iw', area:380},{Location: 'gb-7144', area:179},{Location: 'gb-2388', area:40},
        {Location: 'gb-ox', area:2605},{Location: 'gb-7143', area:704},{Location: 'gb-sn', area:230},
        {Location: 'gb-wl', area:3255},{Location: 'gb-bs', area:110},{Location: 'gb-sj', area:497},
        {Location: 'gb-ns', area:375},{Location: 'gb-bn', area:346},{Location: 'gb-gc', area:3150},
        {Location: 'gb-2318', area:849},{Location: 'gb-no', area:190},{Location: 'gb-tf', area:126},
        {Location: 'gb-cp', area:277},{Location: 'gb-ca', area:141},{Location: 'gb-bg', area:109},
        {Location: 'gb-vg', area:331},{Location: 'gb-rt', area:424},{Location: 'gb-mt', area:111},
        {Location: 'gb-bj', area:251},{Location: 'gb-np', area:441},{Location: 'gb-sw', area:380},
        {Location: 'gb-pe', area:1618},{Location: 'gb-ci', area:2371},{Location: 'gb-2301', area:1785},
        {Location: 'gb-po', area:5180},{Location: 'gb-he', area:2180},{Location: 'gb-wc', area:1741},
        {Location: 'gb-sp', area:3487},{Location: 'gb-wr', area:1975},{Location: 'gb-na', area:2364},
        {Location: 'gb-7142', area:99},{Location: 'gb-7141', area:69},{Location: 'gb-7140', area:104},
        {Location: 'gb-7138', area:98},{Location: 'gb-7137', area:86},{Location: 'gb-7139', area:69},
        {Location: 'gb-tk', area:290},{Location: 'gb-st', area:2713},{Location: 'gb-so', area:93},
        {Location: 'gb-rl', area:382},{Location: 'gb-2393', area:2088},{Location: 'gb-lc', area:73},
        {Location: 'gb-de', area:78},{Location: 'gb-db', area:2547},{Location: 'gb-nt', area:2085},
        {Location: 'gb-ng', area:75},{Location: 'gb-ne', area:192},{Location: 'gb-gd', area:2540},
        {Location: 'gb-ay', area:676},{Location: 'gb-cw', area:1126},{Location: 'gb-di', area:837},
        {Location: 'gb-wx', area:499},{Location: 'gb-fl', area:837},{Location: 'gb-7150', area:918},
        {Location: 'gb-2366', area:1165},{Location: 'gb-hl', area:79},{Location: 'gb-7151', area:79},
        {Location: 'gb-7119', area:112},{Location: 'gb-2364', area:87},{Location: 'gb-wt', area:181},
        {Location: 'gb-ms', area:645},{Location: 'gb-7127', area:126},{Location: 'gb-7129', area:106},
        {Location: 'gb-7128', area:116},{Location: 'gb-7126', area:103},{Location: 'gb-3266', area:97},
        {Location: 'gb-7121', area:188},{Location: 'gb-7125', area:142},{Location: 'gb-7134', area:368},
        {Location: 'gb-3267', area:287},{Location: 'gb-nl', area:846},{Location: 'gb-7136', area:568},
        {Location: 'gb-7135', area:329},{Location: 'gb-ey', area:2475},{Location: 'gb-ny', area:8654},
        {Location: 'gb-yk', area:272},{Location: 'gb-7132', area:552},{Location: 'gb-7131', area:366},
        {Location: 'gb-7133', area:339},{Location: 'gb-7124', area:57},{Location: 'gb-7123', area:99},
        {Location: 'gb-3265', area:409},{Location: 'gb-7130', area:364},{Location: 'gb-7122', area:140},
        {Location: 'gb-kh', area:72},{Location: 'gb-test', area:500},{Location: 'gb-test', area:500},
        {Location: 'gb-bw', area:137},{Location: 'gb-la', area:3066},{Location: 'gb-7118', area:153},
        {Location: 'gb-7117', area:35},{Location: 'gb-rc', area:245},{Location: 'gb-mb', area:54},
        {Location: 'gb-zt', area:205},{Location: 'gb-da', area:200},{Location: 'gb-hp', area:94},
        {Location: 'gb-dh', area:2226},{Location: 'gb-cu', area:6768},{Location: 'gb-7115', area:137},
        {Location: 'gb-7114', area:64},{Location: 'gb-7113', area:85},{Location: 'gb-7116', area:142},
        {Location: 'gb-2367', area:113},{Location: 'gb-nb', area:5013}
    ]

    // console.log("location passed in: " + locationCode);
    for(let i = 0; i < areaData.length; i++){
        if(locationCode === areaData[i].Location){
            // console.log(areaData[i].area)
            return areaData[i].area
        }
    }
}

// Condenses main arrays for each age bracket into an array containing summed totals from each category of ages
// e.g. 0-9, 10-19, etc
function arrAgeSplit(arrName, maxAge){
    // For all but the age 100 array
    if(maxAge !== 100){
        let recordCount = 0;
        let valueCount = 0;

        for (let i = 0; i < arrName.length; i++) {
            // console.log(arrName[i])

            recordCount = recordCount + 1;

            if (recordCount < 10) {
                valueCount = valueCount + Number(arrName[i].Observation);

            } else if (recordCount === 10) {
                valueCount = valueCount + Number(arrName[i].Observation);

                // MAYBE DIVIDE BY SQUARE MILES - SOMETHING LIKE THIS

                // if (arrName[i].Location === 'gb-nf'){
                //     eval('arrTotals' + maxAge).push(
                //         {name: arrName[i].Location, qty: (valueCount/2074)}
                //     )
                // }

                let area = getAreaData(arrName[i].Location);
                // console.log("Area for this one is:")
                // console.log(area);

                eval('arrTotals' + maxAge).push(
                    {name: arrName[i].Location, qty: (Math.round((valueCount / area) * 100)/100)}
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

