// Parks
const ParksApi = "https://services5.arcgis.com/4LKAHwqnBooVDUlX/arcgis/rest/services/LandClassification/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json"

function fetchData() {
    fetch(ParksApi)
        .then(res => {
            if (!res.ok) {
                throw Error("Response not ok.")
            }
            return res.json()
        })
        .then(data => {
            // console.log(data)
            // Video 3's loop (.map) 
            const features = data.features.map(f => {
                // console.log(f.attributes)
                return `<p>${f.attributes.OBJECTID}. ${f.attributes.ParkName} ${f.geometry.rings[0]}</p>`
            }).join(" ")
            // console.log(features)
            document.querySelector("#app")
                .insertAdjacentHTML("afterbegin", features)
            return features

        })
        .catch(err => {
            console.log(err)
        })
}

fetchData()




// MapBox
mapboxgl.accessToken = "pk.eyJ1IjoiaXNpdHQ3NyIsImEiOiJja3dvam45NjAwM2oyMndqdjNzdHNpZGtmIn0.N1zn-7deVgeJLaqFawePDg";
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-120.7401, 47.40], // starting position [lng, lat]
    zoom: 6.3, // starting zoom
    style: 'mapbox://styles/mapbox/streets-v11', // style URL or style object
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
    map.addSource('campgrounds', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: campgroundFeatures,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#51bbd6',
                750,
                '#51bbd6'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                10,
                30,
                20,
                40
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', (e) => {
        // popupMarkup is from a virtual in the campground schema (campground.js)
        const { popupMarkup } = e.features[0].properties
        const coordinates = e.features[0].geometry.coordinates.slice();
        const mag = e.features[0].properties.mag;
        const tsunami =
            e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupMarkup)
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
});