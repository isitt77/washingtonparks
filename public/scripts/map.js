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
        type: 'fill',
        // type: 'line',
        source: 'parks',
        // filter: ['==', '$type', 'Polygon'],
        layout: {},
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            'fill-outline-color': '#008000',
            'fill-color': '#008000',
            'fill-opacity': 0.75,
            // 'line-color': '#008000',
            // 'line-width': 5
        }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'parks', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates[0][0].slice();
        const ParkName = e.features[0].properties.ParkName;
        // console.log(coordinates)
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates) > 180) {
            coordinates += e.lngLat.lng > coordinates ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(ParkName).addTo(map);
    });

    map.on('mouseleave', 'parks', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    // End popupMarker paste
});