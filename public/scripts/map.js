// MapBox
mapboxgl.accessToken = "pk.eyJ1IjoiaXNpdHQ3NyIsImEiOiJjbDBmMWQ2czAwbmQ0M2Nwb2wzaTJ1Y3doIn0.09Q4bcCYc3jYEDgUcICLXQ";
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-120.7401, 47.40], // starting position [lng, lat]
    zoom: 6.3, // starting zoom
    style: 'mapbox://styles/mapbox/light-v10'
    // 'mapbox://styles/mapbox/streets-v11', // style URL or style object
    // hash: true, // sync `center`, `zoom`, `pitch`, and `bearing` with URL
    // Use `transformRequest` to modify requests that begin with `http://myHost`.
    // transformRequest: (url, resourceType) => {
    //     if (resourceType === 'Source' && url.startsWith('http://myHost')) {
    //         return {
    //             url: url.replace('http', 'https'),
    //             headers: { 'my-custom-header': true },
    //             credentials: 'include'  // Include cookies for cross-origin requests
    //         };
    //     }
    // }
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

// From YelpCamp
map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('parks', {
        type: 'geojson',
        data: parks
    });

    map.addLayer({
        id: 'parks',
        // type: 'fill',
        type: 'line',
        source: 'parks',
        // filter: ['==', '$type', 'Polygon'],
        layout: {},
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // 'fill-outline-color': '#F08080',
            // 'fill-color': '#F08080',
            // 'fill-opacity': 0.75,
            'line-color': '#008000',
            'line-width': 5
            // 'circle-color': [
            //     'step',
            //     ['get', 'point_count'],
            //     '#51bbd6',
            //     100,
            //     '#51bbd6',
            //     750,
            //     '#51bbd6'
            // ],
            // 'circle-radius': [
            //     'step',
            //     ['get', 'point_count'],
            //     20,
            //     10,
            //     30,
            //     20,
            //     40
            // ]
        }
    });

    // map.addLayer({
    //     id: 'cluster-count',
    //     type: 'symbol',
    //     source: 'parks',
    //     filter: ['has', 'point_count'],
    //     layout: {
    //         'text-field': '{point_count_abbreviated}',
    //         'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    //         'text-size': 12
    //     }
    // });

    // map.addLayer({
    //     id: 'unclustered-point',
    //     type: 'circle',
    //     source: 'parks',
    //     filter: ['!', ['has', 'point_count']],
    //     paint: {
    //         'circle-color': '#11b4da',
    //         'circle-radius': 4,
    //         'circle-stroke-width': 1,
    //         'circle-stroke-color': '#fff'
    //     }
    // });

    // // inspect a cluster on click
    // map.on('click', 'clusters', (e) => {
    //     const features = map.queryRenderedFeatures(e.point, {
    //         layers: ['clusters']
    //     });
    //     const clusterId = features[0].properties.cluster_id;
    //     map.getSource('parks').getClusterExpansionZoom(
    //         clusterId,
    //         (err, zoom) => {
    //             if (err) return;

    //             map.easeTo({
    //                 center: features[0].geometry.coordinates,
    //                 zoom: zoom
    //             });
    //         }
    //     );
    // });

    // // When a click event occurs on a feature in
    // // the unclustered-point layer, open a popup at
    // // the location of the feature, with
    // // description HTML from its properties.
    // map.on('click', 'unclustered-point', (e) => {
    //     // popupMarkup is from a virtual in the campground schema (campground.js)
    //     const { popupMarkup } = e.features[0].properties
    //     const coordinates = e.features[0].geometry.coordinates.slice();
    //     const mag = e.features[0].properties.mag;
    //     const tsunami =
    //         e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

    //     // Ensure that if the map is zoomed out such that
    //     // multiple copies of the feature are visible, the
    //     // popup appears over the copy being pointed to.
    //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    //     }

    //     new mapboxgl.Popup()
    //         .setLngLat(coordinates)
    //         .setHTML(popupMarkup)
    //         .addTo(map);
    // });

    // map.on('mouseenter', 'clusters', () => {
    //     map.getCanvas().style.cursor = 'pointer';
    // });
    // map.on('mouseleave', 'clusters', () => {
    //     map.getCanvas().style.cursor = '';
    // });
});