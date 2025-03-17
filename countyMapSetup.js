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



                    Highcharts.chart('chart3', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: `2021 vs 2011 Census Population by Age Group - ${getCookie('clickedMapName')}`,

                            style:{
                                fontSize: 22,
                            }
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
                                text: 'Age Categories',
                                margin: 10,
                                style:{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }
                            }
                        },
                        yAxis: {

                            min: 0,
                            title: {
                                text: 'Individuals Residing',

                                style:{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }
                            },

                            labels: {
                                step: 1,

                                style: {
                                    fontSize: 15,
                                },
                            }
                        },

                        legend: {
                            margin: 0,
                            x: 34,
                        },

                        tooltip: {
                            format: "<b>Age Category: {point.category}</b><br> <span style=\"color:{point.series.color}\">\u25CF</span> {series.name}: Population: {point.y}",

                            style:{
                              fontSize: 18,
                                fontWeight: 'normal',
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
                    let cleanedGenderData = [];

                    fetch('2021GenderDataByRegion.json')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`JSON error`);
                            }
                            return response.json();
                        })
                        .then(jsonData => {

                            let jsondata = JSON.stringify(jsonData);

                            let rawGenderData = JSON.parse(jsondata);


                            let first = [0,0,'']; let second = [0,0,'']; let third = [0,0,''];
                            let fourth = [0,0,'']; let fifth = [0,0,'']; let sixth = [0,0,''];
                            let final = [0,0,''];

                            for (let i =0; i < rawGenderData.length; i++){

                                if (rawGenderData[i].area === getCookie('clickedMapName')){

                                    if (rawGenderData[i].ageCat === 'Aged 16 to 24 years'){
                                        if (rawGenderData[i].gender === 'Female'){
                                            first[0] += Number(rawGenderData[i].Observation);
                                            first[2] = rawGenderData[i].area;
                                        } else {
                                            first[1] += Number(rawGenderData[i].Observation);
                                            first[2] = rawGenderData[i].area;
                                        }
                                    } else if (rawGenderData[i].ageCat === 'Aged 25 to 34 years'){
                                        if (rawGenderData[i].gender === 'Female'){
                                            second[0] += Number(rawGenderData[i].Observation);
                                            second[2] = rawGenderData[i].area;
                                        } else {
                                            second[1] += Number(rawGenderData[i].Observation);
                                            second[2] = rawGenderData[i].area;
                                        }
                                    } else if (rawGenderData[i].ageCat === 'Aged 35 to 44 years') {
                                        if (rawGenderData[i].gender === 'Female') {
                                            third[0] += Number(rawGenderData[i].Observation);
                                            third[2] = rawGenderData[i].area;
                                        } else {
                                            third[1] += Number(rawGenderData[i].Observation);
                                            third[2] = rawGenderData[i].area;
                                        }
                                    } else if (rawGenderData[i].ageCat === 'Aged 45 to 54 years') {
                                        if (rawGenderData[i].gender === 'Female') {
                                            fourth[0] += Number(rawGenderData[i].Observation);
                                            fourth[2] = rawGenderData[i].area;
                                        } else {
                                            fourth[1] += Number(rawGenderData[i].Observation);
                                            fourth[2] = rawGenderData[i].area;
                                        }
                                    } else if (rawGenderData[i].ageCat === 'Aged 55 to 64 years') {
                                        if (rawGenderData[i].gender === 'Female') {
                                            fifth[0] += Number(rawGenderData[i].Observation);
                                            fifth[2] = rawGenderData[i].area;
                                        } else {
                                            fifth[1] += Number(rawGenderData[i].Observation);
                                            fifth[2] = rawGenderData[i].area;
                                        }
                                    } else if (rawGenderData[i].ageCat === 'Aged 65 to 74 years') {
                                        if (rawGenderData[i].gender === 'Female') {
                                            sixth[0] += Number(rawGenderData[i].Observation);
                                            sixth[2] = rawGenderData[i].area;
                                        } else {
                                            sixth[1] += Number(rawGenderData[i].Observation);
                                            sixth[2] = rawGenderData[i].area;
                                        }
                                    } else if (rawGenderData[i].ageCat === 'Aged 75 years and over') {
                                        if (rawGenderData[i].gender === 'Female') {
                                            final[0] += Number(rawGenderData[i].Observation);
                                            final[2] = rawGenderData[i].area;
                                        } else {
                                            final[1] += Number(rawGenderData[i].Observation);
                                            final[2] = rawGenderData[i].area;
                                        }
                                    }
                                }
                            }
                            cleanedGenderData.push({area:first[2], age: '16-24', male: first[1], female: first[0]});
                            cleanedGenderData.push({area:second[2], age: '25-34', male: second[1], female: second[0]});
                            cleanedGenderData.push({area:third[2], age: '35-44', male: third[1], female: third[0]});
                            cleanedGenderData.push({area:fourth[2], age: '45-54', male: fourth[1], female: fourth[0]});
                            cleanedGenderData.push({area:fifth[2], age: '55-64', male: fifth[1], female: fifth[0]});
                            cleanedGenderData.push({area:sixth[2], age: '65-74', male: sixth[1], female: sixth[0]});
                            cleanedGenderData.push({area:final[2], age: '75+', male: final[1], female: final[0]});


                            Highcharts.Templating.helpers.abs = value => Math.abs(value);

                            const categories = [
                                '16-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75+'
                            ];


                    Highcharts.chart('chart2', {
                        chart: {
                            type: 'bar',
                        },
                        title: {
                            text: `2021 Census Population Gender Split - ${getCookie('clickedMapName')}`,

                            style:{
                                fontSize: 22,
                            }
                        },
                        subtitle: {
                            text: 'Source: <a ' +
                                'href="https://statistics.ukdataservice.ac.uk/dataset/england-and-wales-census-2021-rm163-gender-identity-by-age-by-sex"' +
                                'target="_blank">England and Wales Census 2021 - Gender identity by age by sex</a>'
                        },
                        accessibility: {
                            point: {
                                valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
                            },
                        },
                        xAxis: [{
                            categories: categories,
                            reversed: false,
                            title: {
                                text: 'Age Categories',

                                style:{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }
                            },
                            labels: {
                                step: 1,

                                style:{
                                    fontSize: 15,
                                }
                            },
                            accessibility: {
                                description: 'Age (male)'
                            }
                        }, { // mirror axis on right side
                            title: {
                                text: 'Age Categories',

                                style:{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }
                            },
                            opposite: true,
                            reversed: false,
                            categories: categories,
                            linkedTo: 0,
                            labels: {
                                step: 1,

                                style:{
                                    fontSize: 15,
                                }
                            },
                            accessibility: {
                                description: 'Age (female)'
                            }
                        }],
                        yAxis: {
                            title: {
                                text: 'Individuals Residing',
                                margin: 10,
                                style:{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                }
                            },
                            labels: {
                                format: '{abs value}',

                                style:{
                                    fontSize: 13,
                                }
                            },
                            accessibility: {
                                description: 'Percentage population',
                                rangeDescription: 'Range: 0 to 5%'
                            }
                        },

                        legend: {
                            margin: 0,
                        },

                        plotOptions: {
                            series: {
                                pointPadding: -0.1,
                                stacking: 'normal',
                            }
                        },

                        tooltip: {
                            format: '<b>{series.name}s: Age {point.category}</b><br/>' +
                                '<span style=\"color:{point.series.color}\">\u25CF</span> Population: {(abs point.y)}',

                            style:{
                                fontSize: 18
                            },
                        },

                        series: [{
                            name: 'Male',
                            data: [
                                -cleanedGenderData[0].male, -cleanedGenderData[1].male, -cleanedGenderData[2].male,
                                -cleanedGenderData[3].male, -cleanedGenderData[4].male, -cleanedGenderData[5].male,
                                -cleanedGenderData[6].male

                            ]
                        }, {
                            name: 'Female',
                            data: [
                                cleanedGenderData[0].female, cleanedGenderData[1].female, cleanedGenderData[2].female,
                                cleanedGenderData[3].female, cleanedGenderData[4].female, cleanedGenderData[5].female,
                                cleanedGenderData[6].female

                            ]
                        }]
                    });

                        })



                    // ---------------------------------------------------------------------------------------------------------------------------------------

                    let identityData = [{name: 'British only', qty: 0},{name: 'Welsh only', qty: 0},
                        {name: 'Welsh and British', qty: 0}, {name: 'English only', qty: 0},{name: 'English and British', qty: 0},
                        {name: 'Non-UK', qty: 0}];

                    fetch('2021IIdentityByRegion.json')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`JSON error`);
                            }
                            return response.json();
                        })
                        .then(jsondata => {

                            let identData = JSON.stringify(jsondata);

                            let rawIdentityData = JSON.parse(identData);


                            for (let i = 0; i < rawIdentityData.length; i++) {
                                if (getCookie('clickedMapName') === rawIdentityData[i].area) {

                                    if (rawIdentityData[i].identityCat === '1') {
                                        identityData[Number(rawIdentityData[i].identityCat) - 1].qty += Number(rawIdentityData[i].observation);
                                    } else if (rawIdentityData[i].identityCat === '2') {
                                        identityData[Number(rawIdentityData[i].identityCat) - 1].qty += Number(rawIdentityData[i].observation);
                                    } else if (rawIdentityData[i].identityCat === '3') {
                                        identityData[Number(rawIdentityData[i].identityCat) - 1].qty += Number(rawIdentityData[i].observation);
                                    } else if (rawIdentityData[i].identityCat === '4') {
                                        identityData[Number(rawIdentityData[i].identityCat) - 1].qty += Number(rawIdentityData[i].observation);
                                    } else if (rawIdentityData[i].identityCat === '5') {
                                        identityData[Number(rawIdentityData[i].identityCat) - 1].qty += Number(rawIdentityData[i].observation);
                                    } else if (rawIdentityData[i].identityCat === '7') {
                                        identityData[Number(rawIdentityData[i].identityCat) - 2].qty += Number(rawIdentityData[i].observation);
                                    }

                                }
                            }


                            Highcharts.chart('chart4', {
                                chart: {
                                    type: 'pie'
                                },
                                title: {
                                    text: `2021 Census National Identity of Inhabitants - ${getCookie('clickedMapName')}`,
                                    style: {
                                        fontSize: 22
                                    }
                                },
                                subtitle: {
                                    text: 'Source: <a ' +
                                        'href="https://statistics.ukdataservice.ac.uk/dataset/england-and-wales-census-2021-rm086-national-identity-by-age"' +
                                        'target="_blank">England and Wales Census 2021 - National Identity by age</a>'
                                },
                                tooltip: {
                                    headerFormat: '',
                                    pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' +
                                        '{point.name}</b><br/>' +
                                        '<b>{point.percentage:.1f}</b>% of Population',
                                    // 'Area (square km): <b>{point.y}</b><br/>' +
                                    // 'Population density (people per square km): <b>{point.z}</b><br/>'

                                    style: {
                                        fontSize: 18
                                    },
                                },
                                series: [{
                                    minPointSize: 10,
                                    innerSize: '20%',
                                    zMin: 0,
                                    name: 'countries',
                                    borderRadius: 10,
                                    data: [{
                                        name: identityData[0].name,
                                        y: identityData[0].qty,
                                        z: Math.cbrt(Number(identityData[0].qty)) / 10

                                    }, {
                                        name: identityData[1].name,
                                        y: identityData[1].qty,
                                        z: Math.cbrt(Number(identityData[1].qty)) / 10

                                    }, {
                                        name: identityData[2].name,
                                        y: identityData[2].qty,
                                        z: Math.cbrt(Number(identityData[2].qty)) / 10

                                    }, {
                                        name: identityData[3].name,
                                        y: identityData[3].qty,
                                        z: Math.cbrt(Number(identityData[3].qty)) / 10
                                    }, {
                                        name: identityData[4].name,
                                        y: identityData[4].qty,
                                        z: Math.cbrt(Number(identityData[4].qty)) / 10

                                    }, {
                                        name: identityData[5].name,
                                        y: identityData[5].qty,
                                        z: Math.cbrt(Number(identityData[5].qty)) / 10

                                    }],
                                    dataLabels: {
                                        style: {
                                            fontSize: 16
                                        }
                                    },

                                    colors: [
                                        'rgba(71, 82, 255)',
                                        'rgba(91, 102, 255)',
                                        'rgba(121, 132, 255)',
                                        'rgba(158, 162, 255)',
                                        'rgba(188, 192, 255)',
                                        'rgba(218,222,255)',
                                    ]
                                }]
                            });


                            // ---------------------------------------------------------------------------------------------------------------------------------------
                            let cleanedPopulationOverTime = [];

                            fetch('10YearCountyPop.json')
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`JSON error`);
                                    }
                                    return response.json();
                                })
                                .then(jsonData => {

                                    let jsondata = JSON.stringify(jsonData);

                                    let rawPopOverTime = JSON.parse(jsondata);

                                    for (let i = 0; i< rawPopOverTime.length; i++){
                                        if (getCookie('clickedMapName') === rawPopOverTime[i].area){

                                            if (rawPopOverTime[i].sex === 'F'){
                                                cleanedPopulationOverTime.push({sex:'F', date11:rawPopOverTime[i]['2011'], date12:rawPopOverTime[i]['2012'],
                                                    date13:rawPopOverTime[i]['2013'], date14:rawPopOverTime[i]['2014'], date15:rawPopOverTime[i]['2015'],
                                                    date16:rawPopOverTime[i]['2016'], date17:rawPopOverTime[i]['2017'], date18:rawPopOverTime[i]['2018'],
                                                    date19:rawPopOverTime[i]['2019'], date20:rawPopOverTime[i]['2020'],
                                                    date21:rawPopOverTime[i]['2021'], date22:rawPopOverTime[i]['2022'], date23:rawPopOverTime[i]['2023']})
                                            } else {
                                                cleanedPopulationOverTime.push({sex:'M', date11:rawPopOverTime[i]['2011'], date12:rawPopOverTime[i]['2012'],
                                                    date13:rawPopOverTime[i]['2013'], date14:rawPopOverTime[i]['2014'], date15:rawPopOverTime[i]['2015'],
                                                    date16:rawPopOverTime[i]['2016'], date17:rawPopOverTime[i]['2017'], date18:rawPopOverTime[i]['2018'],
                                                    date19:rawPopOverTime[i]['2019'], date20:rawPopOverTime[i]['2020'],
                                                    date21:rawPopOverTime[i]['2021'], date22:rawPopOverTime[i]['2022'], date23:rawPopOverTime[i]['2023']})
                                            }
                                        }
                                    }
                                    console.log(cleanedPopulationOverTime)



                                    Highcharts.chart('chart1', {
                                        title: {
                                            text: `Population Change Over Time by Gender- ${getCookie('clickedMapName')}`,

                                            style:{
                                                fontSize: 22,
                                            }
                                        },
                                        subtitle: {
                                            text:
                                                'Source: <a target="_blank" ' +
                                                'href="https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/datasets/estimatesofthepopulationforenglandandwales">Office for National Statistics - Estimates of the population for England and Wales 2011-2023</a>'
                                        },

                                        yAxis: {
                                            title: {
                                                text: 'Individuals Residing',

                                                style:{
                                                    fontSize: 16,
                                                    fontWeight: 'bold',
                                                }
                                            },
                                            labels:{
                                                style:{
                                                    fontSize: 15,
                                                }
                                            }
                                        },

                                        xAxis: {
                                            title:{
                                                text: 'Year',
                                                style:{
                                                    fontSize: 16,
                                                    fontWeight: 'bold',

                                                }
                                            },
                                            categories: [
                                                '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019',
                                                '2020', '2021', '2022', '2023'
                                            ],
                                            accessibility: {
                                                rangeDescription: 'Years: 2011 to 2023'
                                            }
                                        },

                                        legend: {
                                            layout: 'horizontal',
                                            align: 'center',
                                            verticalAlign: 'bottom',
                                            margin: 0,
                                            x: 34
                                        },

                                        plotOptions: {
                                            series: {
                                                label: {
                                                    connectorAllowed: false
                                                },
                                            }
                                        },

                                        series: [{
                                            name: 'Male',
                                            data: [
                                                Number(cleanedPopulationOverTime[1].date11), Number(cleanedPopulationOverTime[1].date12),
                                                Number(cleanedPopulationOverTime[1].date13), Number(cleanedPopulationOverTime[1].date14),
                                                Number(cleanedPopulationOverTime[1].date15), Number(cleanedPopulationOverTime[1].date16),
                                                Number(cleanedPopulationOverTime[1].date17), Number(cleanedPopulationOverTime[1].date18),
                                                Number(cleanedPopulationOverTime[1].date19), Number(cleanedPopulationOverTime[1].date20),
                                                Number(cleanedPopulationOverTime[1].date21), Number(cleanedPopulationOverTime[1].date22),
                                                Number(cleanedPopulationOverTime[1].date23)
                                            ]
                                        }, {
                                            name: 'Female',
                                            data: [
                                                Number(cleanedPopulationOverTime[0].date11), Number(cleanedPopulationOverTime[0].date12),
                                                Number(cleanedPopulationOverTime[0].date13), Number(cleanedPopulationOverTime[0].date14),
                                                Number(cleanedPopulationOverTime[0].date15), Number(cleanedPopulationOverTime[0].date16),
                                                Number(cleanedPopulationOverTime[0].date17), Number(cleanedPopulationOverTime[0].date18),
                                                Number(cleanedPopulationOverTime[0].date19), Number(cleanedPopulationOverTime[0].date20),
                                                Number(cleanedPopulationOverTime[0].date21), Number(cleanedPopulationOverTime[0].date22),
                                                Number(cleanedPopulationOverTime[0].date23)
                                            ]
                                        }, ],

                                        responsive: {
                                            rules: [{
                                                condition: {
                                                    maxWidth: 500
                                                },
                                                chartOptions: {
                                                    legend: {
                                                        layout: 'horizontal',
                                                        align: 'center',
                                                        verticalAlign: 'bottom',
                                                    }
                                                }

                                            }]
                                        }

                                    });

                                })
                        })
                })
        })
}