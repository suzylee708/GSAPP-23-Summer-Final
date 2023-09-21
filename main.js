const layerTypes = {
    'fill': ['fill-opacity'],
    'line': ['line-opacity'],
    'circle': ['circle-opacity', 'circle-stroke-opacity'],
    'symbol': ['icon-opacity', 'text-opacity'],
    'raster': ['raster-opacity'],
    'fill-extrusion': ['fill-extrusion-opacity']
}
const alignments = {
    'left': 'lefty',
    'center': 'centered',
    'right': 'righty'
}

function getLayerPaintType(layer) {
    console.log(layer)
    console.log(map.getLayer(layer))
    var layerType = map.getLayer(layer).type;
    return layerTypes[layerType];
}
function setLayerOpacity(layer) {
    const paintProps = getLayerPaintType(layer.layer);
    paintProps.forEach(function (prop) {
        map.setPaintProperty(layer.layer, prop, layer.opacity);
    });
}


/*
    ============
    MAPBOX LOGIC
    ============
*/

mapboxgl.accessToken = config.MAPBOX_ACCESS_TOKEN;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: config.style,
    center: [-74.03645, 40.73021], // starting position [lng, lat] Columbia University
    zoom: 10, // starting zoom
    interactive: false,
});

// // bring in data
// const model = './data/density_map.geojson'

// // iterate over geojson data
// fetch(model)
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         // console.log(data)
//         // iterate over each data object
//         data.features.forEach(element => {
//           // log the data to the browser
//           console.log(element)
            
//         //   const feb_percent_threshold = element.properties["Percent_Threshold_Daylight_Feb"]

//         })
//     })

    map.on('load', function () {
    
        map.addLayer({
            'id': 'density',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': './data/density_map.geojson'
            },
            'paint': {
                'fill-color': ['step', ['get', 'population_density'],
                    '#ffffff', 
                    0, '#e2eaf3',
                    0.0070, '#c1cfe3',
                    0.0200, '#9198c5',
                    0.0300, '#7b4a9e',
                    0.0450, '#45094e'],
                'fill-opacity': ['case', ['==', ['get', 'population_density'], null], 0, 0]
            }
            }, 'waterway');
        
        map.addLayer({
            'id': '300ftoutput',
            'type': 'circle',
            'source': {
                'type': "geojson",
                'data': "./data/300ftoutput.geojson",
            },
            'paint': {
                    "circle-opacity": 0,
                    "circle-stroke-opacity": 0,
                    "circle-color": "gold",
                    "circle-stroke-color": "black",
                    "circle-stroke-width": 0.5,
                    "circle-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                        10,
                        3.5,
                        14,
                        4,
                        18,
                        12,
                    ],
                },
                });
                map.addLayer({
                    'id': 'energy',
                    'type': 'fill',
                    'source': {
                        'type': 'geojson',
                        'data': './data/newenergy_MN.geojson'
                    },
                    'paint': {
                        'fill-color': ['step', ['get', 'electricity'],
                            '#ffffff', 
                            400000, '#5578b4',
                            800000, '#7fb5aa',
                            1200000, '#e6f29e',
                            1600000, '#f2d183',
                            2000000, '#d97447',
                            5000000, '#9c2847'],
                        'fill-opacity': ['case', ['==', ['get', 'electricity'], null], 0, 0]
                    }
                    }, 'waterway');

        // map.addLayer(
        // {
        //         id: "warnBuildings2020extrusion",
        //         type: "fill-extrusion",
        //         source: {
        //             type: "geojson",
        //             data: "data/warnBuildings2020.geojson",
        //         },
        //         paint: {
        //             "fill-extrusion-opacity": 0,
        //             "fill-extrusion-height": ["*", 0.3048, ["get", "heightroof"]],
        //             "fill-extrusion-color": "gold",
        //         },
        //         },
        //         "road-label"
        //     );
        //     map.addLayer(
        //         {
        //         id: "otherBuildingsOverpass",
        //         type: "fill-extrusion",
        //         source: {
        //             type: "geojson",
        //             data: "data/otherBuildings.geojson",
        //         },
        //         paint: {
        //             "fill-extrusion-opacity": 0,
        //             "fill-extrusion-height": ["to-number", ["get", "height"]],
        //             "fill-extrusion-color": "#e1e5e5",
        //         },
        //         },
        //         "road-label"
        //     );




    })

/*
    ============
    SCROLLER LOGIC
    ============
*/

// const story = document.getElementById("story");
const scrolly = document.querySelector("#scrolly");
const article = scrolly.querySelector("article.features");
const step = article.querySelectorAll(".step");

if (config.title) {
    let hero = document.querySelector('header.hero');
    hero.innerHTML = config.title;
}

// for each chapter
config.chapters.forEach((record, idx) => {
    // console.log(record)
    // create a paragraph element
    const p = document.createElement('p');
    p.innerHTML = record.chapterDiv
    p.classList.add("br3", "custom");
    step[idx].appendChild(p)
    // if (idx === 0) {
    //     container.classList.add("is-active");
    // }
})

// instantiate the scrollama
const scroller = scrollama();
// console.log(scroller)

// setup the instance, pass callback functions
scroller
    .setup({
        step: "#scrolly article .step",
        offset: 0.75,
        progress: true,
    })
    .onStepEnter((response) => {
        let chapter = config.chapters.find((chap) => chap['id'] === response.element.id)

        // add color to current step only
        response.element.classList.add("is-active");

        let thisZoom = chapter.location.zoom;
        thisLocation = {
            bearing: chapter.location.bearing,
            center: chapter.location.center,
            pitch: chapter.location.pitch,
            zoom: thisZoom
        };
        map.flyTo(thisLocation)
        if (chapter.onChapterEnter.length > 0) {
            // console.log(chapter.onChapterEnter)
            chapter.onChapterEnter.forEach(setLayerOpacity);
        }

    })
    .onStepExit((response) => {
        // { element, index, direction }
        response.element.classList.remove("is-active");
        let chapter = config.chapters.find(chap => chap.id === response.element.id);
            if (chapter.onChapterExit.length > 0) {
                chapter.onChapterExit.forEach(setLayerOpacity);
            }
    });

