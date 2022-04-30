mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    zoom: 3, // starting zoom
    center: [-100, 40], // starting center
    projection: 'albers' // starting projection
});


map.on('load', () => {

    map.addSource('covid', {
        type: 'geojson',
        data: 'assets/us-covid-2020-rates.geojson'
    });

    map.addLayer({
        'id': 'covidData-layer',
        'type': 'fill',
        'source': 'covid',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'rates'],
                '#FFEDA0', // stop_output_0
                10, // stop_input_0
                '#FED976', // stop_output_1
                20, // stop_input_1
                '#FEB24C', // stop_output_2
                50, // stop_input_2
                '#FD8D3C', // stop_output_3
                75, // stop_input_3
                '#FC4E2A', // stop_output_4
                100, // stop_input_4
                '#E31A1C', // stop_output_5
                150, // stop_input_5
                '#BD0026', // stop_output_6
                200, // stop_input_6
                "#800026" // stop_output_7
            ],
            'fill-outline-color': '#BBBBBB',
            'fill-opacity': 0.7,
        }
    });

    const layers = [
        '0-9',
        '10-19',
        '20-49',
        '50-74',
        '75-99',
        '100-149',
        '150-199',
        '200 and more'
    ];
    const colors = [
        '#FFEDA070',
        '#FED97670',
        '#FEB24C70',
        '#FD8D3C70',
        '#FC4E2A70',
        '#E31A1C70',
        '#BD002670',
        '#80002670'
    ];

    const legend = document.getElementById('legend');
    legend.innerHTML = "<b>Covid Rate<br>(per thousand residents)</b><br><br>";

    layers.forEach((layer, i) => {
        const color = colors[i];
        const item = document.createElement('div');
        const key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        const value = document.createElement('span');
        value.innerHTML = `${layer}`;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    });

    map.on('mousemove', ({point}) => {

        const state = map.queryRenderedFeatures(point, {
            layers: ['covidData-layer']
        });
        document.getElementById('text-description').innerHTML = state.length ?
            `<h3>${state[0].properties.state}</h3><h3>${state[0].properties.county}</h3><p><strong><em>${state[0].properties.rates}</strong> cases per thousand residents</em></p>` :
            `<p>Hover over a county!</p>`;
    });

});