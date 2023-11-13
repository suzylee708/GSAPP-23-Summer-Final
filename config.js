let titleDiv =
  '<p class="avenir tl f2 mw6 center mt2 mb2">Diminishing Returns of High-Rise Living in New York City: Balancing Between Views and Energy Efficiency</p>' +
  '<p class="code tl f6 mw6 center mt3 lh-copy">A project by <a class="link underline black hover-red" href="https://www.linkedin.com/in/suji-lee-0b824419b/" target="_blank">Suji Lee</a> from <a class="link underline black hover-red" href="https://www.arch.columbia.edu/programs/15-m-s-computational-design-practices" target="_blank">MSCDP at GSAPP Columbia University</a>.</p>' +
  '<br><br><p class="title_gif"><img src="./data/view3_07.gif">' +
  '<br><br><br><br></p><p style="text-align: center;">Scroll to continue<br>▼</p>';
let divChapter1 =
  '<div class="ph4 pt3 pb4"><p class="avenir tl f4">NEW YORK STATE DENSITY MAP IN 2021</p>' +
  `<br><p class="code tl lh-copy f6">New York City continues to draw in people from all corners of the world, despite its confined footprint. With the population around Manhattan becoming increasingly dense, the inevitable outcome is the rising height of buildings, a necessity driven by the need to accommodate this growing influx of residents.</p>` +
  '<br><img src="./data/nystate_population.png" class="w-100 pt0" alt="Graph of number of notices per week">' +
  `<div id="income-legend" class="legend">
            <br><h4>The Number of People per Square Foot</h4>
            <div><span style="background-color: #45094e"></span>Extremely High Density (20 +)</div>
            <div><span style="background-color: #7b4a9e"></span>Very High Density (15 - 20)</div>
            <div><span style="background-color: #9198c5"></span>High Density (10 - 15)</div>
            <div><span style="background-color: #c1cfe3"></span>Moderate Density (5 - 10)</div>
            <div><span style="background-color: #e2eaf3"></span>Low Density (0 - 5)</div>
        </div>` +
  '<p class="code tl lh-copy f7 mb0 mt3">Data Sorce: <a class="link underline black hover-red" href="https://www.census.gov/topics/population/data.html" target="_blank">United States Census Data (2021)</a></p>' +
  '</div>';

let divChapter2 =
  '<div class="ph4 pt3 pb4"><p class="avenir tl f4">2023 High-Rise Residential Buildings in NYC</p>' +
  '<p class="code tl lh-copy f6"><br>High-rise residential buildings are densely clustered in two specific areas, not necessarily reflecting overall population density. These skyscrapers are not solely about accommodating more people, but about capturing better views of the Hudson River, Central Park, and iconic midtown landmarks. The desire for better views pushes these buildings to become taller, representing a sense of luxury.<br><br>The desire for better views pushes these buildings to become taller, representing a sense of luxury. However, this brings challenges that I mentioned earlier.</p>' +
  '<br><svg class="dib v-mid" height="18" width="18"><circle cx="9" cy="9" r="7" stroke="black" stroke-width="0.8" fill="#ffd700" /></svg><p class="dib v-mid code tl lh-copy f7 pl1 mv2">Location of Residentail Building over 300ft height (2023)</p>' +
  '<p class="code tl lh-copy f7 mb0 mt3">Data Sorce: <a class="link underline black hover-red" href="https://www.nyc.gov/site/planning/data-maps/open-data/dwn-pluto-mappluto.page#mappluto" target="_blank">NYC Department of City Planning (PLUTO)</a></p>' +
  '</div>';

let divChapter3 =
  '<div class="ph4 pt3 pb4"><p class="avenir tl f4">SELECTED NEIGHBORHOOD OF THE CITY</p>' +
  '<p class="code tl lh-copy f5 mt4">Lower Manhattan</p>' +
  '<br><p class="code tl lh-copy f6">Lower Manhattan is known for its concentration of tall residential towers strategically positioned to offer scenic views of the Hudson River. Yet, the pursuit of greater heights has led to increased exposure to direct sunlight, resulting in glare issues and elevated cooling energy requirements for maintaining comfortable indoor temperatures. This balance between maximizing panoramic vistas and managing energy efficiency presents a challenge for architects and urban planners in the area.</p>' +
  `<div id="income-legend" class="legend">
            <br><h4>Energy Use Intensity in Residential Buildings (kBTU/ft2)</h4>
            <div><span style="background-color: #9c2847"></span>Extremely High (400+ >)</div>
            <div><span style="background-color: #d97447"></span>Very High (400 > 300)</div>
            <div><span style="background-color: #f2d183"></span>High (300 > 200)</div>
            <div><span style="background-color: #e6f29e"></span>Moderate (200 > 100)</div>
            <div><span style="background-color: #7fb5aa"></span>Low (100 > 50)</div>
            <div><span style="background-color: #5578b4"></span>Very Low (50 >)</div>
        </div>` +
  '<p class="code tl lh-copy f7 mb0 mt3">Data Sorce: <a class="link underline black hover-red" href="https://climate.cityofnewyork.us/" target="_blank">NYC Mayor Office of Climate & Environmental Justice</a></p>' +
  '</div>';

const config = {
  MAPBOX_ACCESS_TOKEN:
    'pk.eyJ1IjoiY2xheW5lIiwiYSI6ImNsa2lzZ2dlYjBkNmwzZm9hY3VyMTBuanUifQ.hBUlDyGnCEG28_Mt-DPT7g',
  style: 'mapbox://styles/mapbox/light-v11',
  title: titleDiv,
  chapters: [
    {
      id: 'one',
      chapterDiv: divChapter1,
      location: {
        center: [-74.03645, 40.73021],
        zoom: 10,

        pitch: 0,
        bearing: 0,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        {
          layer: 'density',
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: 'density',
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: 'two',
      chapterDiv: divChapter2,
      location: {
        center: [-74.01187, 40.73242],
        zoom: 11.7,
        pitch: 28,
        bearing: -10.4,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: true,
      callback: '',
      onChapterEnter: [
        {
          layer: '300ftoutput',
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: '300ftoutput',
          opacity: 0,
          duration: 300,
        },
      ],
    },
    {
      id: 'three',
      chapterDiv: divChapter3,
      location: {
        center: [-74.01661, 40.71193],
        zoom: 13.77,
        zoomSmall: 9,
        pitch: 0,
        bearing: 0,
      },
      mapAnimation: 'flyTo',
      rotateAnimation: false,
      callback: '',
      onChapterEnter: [
        {
          layer: 'energy',
          opacity: 1,
          duration: 300,
        },
      ],
      onChapterExit: [
        {
          layer: 'energy',
          opacity: 0,
          duration: 300,
        },
      ],
    },
  ],
};
