// For displaying detailed broken down charts on region page
function createRegionCharts(){

    let countyData = [];
    let countyAgeCat = [];

    document.getElementById('region').innerText = getCookie('clickedMapName');


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

                if (jsondata2[i].Location === getCookie('clickedMapCode')) {
                    countyData.push(jsondata2[i]);

                }
            }

            console.log(countyData)



            let recordCount = 0;
            let valueCount = 0;

            for (let i = 0; i < countyData.length; i++) {

                recordCount = recordCount + 1;

                if (recordCount < 10) {
                    valueCount = valueCount + Number(countyData[i].Observation);

                } else if (recordCount === 10) {
                    valueCount = valueCount + Number(countyData[i].Observation);

                    countyAgeCat.push(
                        {x: (countyData[i].Age -9 + '-' + countyData[i].Age), y: (valueCount)}
                    )

                    recordCount = 0;
                    valueCount = 0;
                }
            }
            // For those age 100+
            countyAgeCat.push({x: '100+', y: Number(countyData[countyData.length-1].Observation)});

                console.log(countyAgeCat)




            fetch('2016ageDataByRegion.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`JSON error`);
                    }
                    return response.json();
                })
                .then(jsonData => {

                    let prevCensusData = JSON.stringify(jsonData);

                    prevCensusData = JSON.parse(prevCensusData);

                    let prevCountyData = [];
                    let prevCountyAgeCat = [];


                    // push 2016 census data into prevCountyData in the format {age:x, quantity:y}
                    for (let i = 0; i < prevCensusData.length; i++) {

                        if (prevCensusData[i].geography === getCookie('clickedMapName')) {

                            // Push the value for 0 because its a different format to 1-99
                            prevCountyData.push({age:0, qty: prevCensusData[i]["Age: Age under 1; measures: Value"]});

                            for (let k = 1; k < 100; k++){
                                prevCountyData.push({age:k, qty: prevCensusData[i]["Age: Age "+ k +"; measures: Value"]});
                            }

                            // push the value for 100+ because its a different format to 1-99
                            prevCountyData.push({age:0, qty: prevCensusData[i]["Age: Age 100 and over; measures: Value"]});

                        }
                    }

                    let oldRecordCount = 0;
                    let oldValueCount = 0;


                    for (let i = 0; i < prevCountyData.length; i++) {



                        oldRecordCount = oldRecordCount + 1;

                        if (oldRecordCount < 10) {
                            oldValueCount = oldValueCount + Number(prevCountyData[i].qty);

                        } else if (oldRecordCount === 10) {
                            oldValueCount = oldValueCount + Number(prevCountyData[i].qty);

                            prevCountyAgeCat.push(
                                {x: (prevCountyData[i].age -9 + '-' + prevCountyData[i].age), y: (oldValueCount)}
                            )

                            oldRecordCount = 0;
                            oldValueCount = 0;
                        }
                    }

                    prevCountyAgeCat.push({x: '100+', y: Number(prevCountyData[prevCountyData.length-1].qty)});


                    console.log(prevCountyAgeCat);




                    Highcharts.chart('chart1', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: '2021/2011 Census Age Breakdown Comparison '
                        },
                        subtitle: {
                            text:
                                'Source: <a target="_blank" ' +
                                'href="https://statistics.ukdataservice.ac.uk/dataset/ons_2021_demography_age_single_year">England and Wales Census 2021</a>'
                        },
                        xAxis: {
                            categories: [countyAgeCat[0].x, countyAgeCat[1].x, countyAgeCat[2].x, countyAgeCat[3].x,
                                countyAgeCat[4].x, countyAgeCat[5].x, countyAgeCat[6].x, countyAgeCat[7].x,
                                countyAgeCat[8].x, countyAgeCat[9].x, countyAgeCat[10].x],
                            crosshair: true,
                            accessibility: {
                                description: 'Countries'
                            },
                            title: {
                                text: 'Age Categories'
                            }
                        },
                        yAxis: {

                            min: 0,
                            title: {
                                text: 'Number of People'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' People',
                            headerFormat: "something",
                            style:{
                              fontSize: 18
                            },
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.1,
                                borderWidth: 0
                            }
                        },
                        series: [{
                            name: '2021',
                            data: [
                                [countyAgeCat[0].x, countyAgeCat[0].y],
                                [countyAgeCat[1].x, countyAgeCat[1].y],
                                [countyAgeCat[2].x, countyAgeCat[2].y],
                                [countyAgeCat[3].x, countyAgeCat[3].y],
                                [countyAgeCat[4].x, countyAgeCat[4].y],
                                [countyAgeCat[5].x, countyAgeCat[5].y],
                                [countyAgeCat[6].x, countyAgeCat[6].y],
                                [countyAgeCat[7].x, countyAgeCat[7].y],
                                [countyAgeCat[8].x, countyAgeCat[8].y],
                                [countyAgeCat[9].x, countyAgeCat[9].y],
                                [countyAgeCat[10].x, countyAgeCat[10].y],
                            ]},
                            {
                                name: '2011',
                                data: [
                                [prevCountyAgeCat[0].x, prevCountyAgeCat[0].y],
                                [prevCountyAgeCat[1].x, prevCountyAgeCat[1].y],
                                [prevCountyAgeCat[2].x, prevCountyAgeCat[2].y],
                                [prevCountyAgeCat[3].x, prevCountyAgeCat[3].y],
                                [prevCountyAgeCat[4].x, prevCountyAgeCat[4].y],
                                [prevCountyAgeCat[5].x, prevCountyAgeCat[5].y],
                                [prevCountyAgeCat[6].x, prevCountyAgeCat[6].y],
                                [prevCountyAgeCat[7].x, prevCountyAgeCat[7].y],
                                [prevCountyAgeCat[8].x, prevCountyAgeCat[8].y],
                                [prevCountyAgeCat[9].x, prevCountyAgeCat[9].y],
                                [prevCountyAgeCat[10].x, prevCountyAgeCat[10].y],
                            ]
                        }]
                    });


                    // ---------------------------------------------------------------------------------------------------------------------------------------
                    Highcharts.chart('chart2', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Corn vs wheat estimated production for 2023'
                        },
                        subtitle: {
                            text:
                                'Source: <a target="_blank" ' +
                                'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
                        },
                        xAxis: {
                            categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
                            crosshair: true,
                            accessibility: {
                                description: 'Countries'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '1000 metric tons (MT)'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' (1000 MT)'
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [
                            {
                                name: 'Corn',
                                data: [387749, 280000, 129000, 64300, 54000, 34300]
                            },
                            {
                                name: 'Wheat',
                                data: [45321, 140000, 10000, 140500, 19500, 113500]
                            }
                        ]
                    });


                    // ---------------------------------------------------------------------------------------------------------------------------------------
                    Highcharts.chart('chart3', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Corn vs wheat estimated production for 2023'
                        },
                        subtitle: {
                            text:
                                'Source: <a target="_blank" ' +
                                'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
                        },
                        xAxis: {
                            categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
                            crosshair: true,
                            accessibility: {
                                description: 'Countries'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '1000 metric tons (MT)'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' (1000 MT)'
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [
                            {
                                name: 'Corn',
                                data: [387749, 280000, 129000, 64300, 54000, 34300]
                            },
                            {
                                name: 'Wheat',
                                data: [45321, 140000, 10000, 140500, 19500, 113500]
                            }
                        ]
                    });


                    // ---------------------------------------------------------------------------------------------------------------------------------------
                    Highcharts.chart('chart4', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Corn vs wheat estimated production for 2023'
                        },
                        subtitle: {
                            text:
                                'Source: <a target="_blank" ' +
                                'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
                        },
                        xAxis: {
                            categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
                            crosshair: true,
                            accessibility: {
                                description: 'Countries'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '1000 metric tons (MT)'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' (1000 MT)'
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [
                            {
                                name: 'Corn',
                                data: [387749, 280000, 129000, 64300, 54000, 34300]
                            },
                            {
                                name: 'Wheat',
                                data: [45321, 140000, 10000, 140500, 19500, 113500]
                            }
                        ]
                    });


                })
        })
}