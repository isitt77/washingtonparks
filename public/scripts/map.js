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
                // return `<p>${f.attributes.OBJECTID}. ${f.attributes.ParkName} ${f.geometry.rings[0]}</p>`
                const a = f.attributes.ParkName
                const g = f.geometry.rings[0]
                // const featureCollection = [a, g]
                const featureCollection = {
                    parkName: a,
                    geometry: g
                }
                // console.log(featureCollection)
                // return featureCollection
                // return data
            })
            // .join(" ")
            // console.log(features)
            // document.querySelector("#app")
            //     .insertAdjacentHTML("afterbegin", features)
            // console.log(featureCollection)
            // return featureCollection
            // return features

        })
        .catch(err => {
            console.log(err)
        })
}

// fetchData()


// console.log(parkFeatures)
// console.log(park)

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
    map.addSource('parks', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        // data: parkFeatures, // <-- Not valid geojson object.
        data: {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates:
                    [
                        [
                            [
                                -121.959828957288,
                                47.2933286723113
                            ],
                            [
                                -121.960458775241,
                                47.2926305735251
                            ],
                            [
                                -121.960889776673,
                                47.2923367635631
                            ],
                            [
                                -121.961258137286,
                                47.2918891405105
                            ],
                            [
                                -121.962559198043,
                                47.290109010344
                            ],
                            [
                                -121.963420577655,
                                47.2899499806816
                            ],
                            [
                                -121.96450752586,
                                47.2897117050892
                            ],
                            [
                                -121.964554088683,
                                47.2897095019452
                            ],
                            [
                                -121.966246173985,
                                47.2896674567081
                            ],
                            [
                                -121.966333898396,
                                47.2896635428557
                            ],
                            [
                                -121.966087622391,
                                47.2902602631503
                            ],
                            [
                                -121.96595516819,
                                47.2907698558298
                            ],
                            [
                                -121.965335531585,
                                47.2916640550591
                            ],
                            [
                                -121.964452702054,
                                47.2925750152911
                            ],
                            [
                                -121.96447054068,
                                47.2918277692083
                            ],
                            [
                                -121.964262003502,
                                47.291831755727
                            ],
                            [
                                -121.964279816804,
                                47.291637144138
                            ],
                            [
                                -121.964135002956,
                                47.2918341839561
                            ],
                            [
                                -121.964019452213,
                                47.2919914140486
                            ],
                            [
                                -121.963524126016,
                                47.2921539683812
                            ],
                            [
                                -121.96304202565,
                                47.2928017021671
                            ],
                            [
                                -121.962490443375,
                                47.2932665908213
                            ],
                            [
                                -121.961751570051,
                                47.2935144720471
                            ],
                            [
                                -121.961336587304,
                                47.2937700556232
                            ],
                            [
                                -121.959828957288,
                                47.2933286723113
                            ]
                        ],
                        [
                            [
                                -121.947019090209,
                                47.3059490379173
                            ],
                            [
                                -121.947023063723,
                                47.3058994792587
                            ],
                            [
                                -121.947021472742,
                                47.3058965420456
                            ],
                            [
                                -121.947059332851,
                                47.3048059863142
                            ],
                            [
                                -121.947153500625,
                                47.3020933111221
                            ],
                            [
                                -121.947287911862,
                                47.3012273196979
                            ],
                            [
                                -121.947258682759,
                                47.3006340998899
                            ],
                            [
                                -121.947553941505,
                                47.3003266789948
                            ],
                            [
                                -121.947614347684,
                                47.3002716088801
                            ],
                            [
                                -121.947617014338,
                                47.3002691780773
                            ],
                            [
                                -121.947663596637,
                                47.3002338636268
                            ],
                            [
                                -121.947713892707,
                                47.3002117443974
                            ],
                            [
                                -121.947767742253,
                                47.3001990844349
                            ],
                            [
                                -121.947827395168,
                                47.3001957000031
                            ],
                            [
                                -121.947937254457,
                                47.3000467738501
                            ],
                            [
                                -121.94793826745,
                                47.3000454009622
                            ],
                            [
                                -121.948265753902,
                                47.2996796197881
                            ],
                            [
                                -121.948274957156,
                                47.2996693399297
                            ],
                            [
                                -121.948571336322,
                                47.2996864932801
                            ],
                            [
                                -121.948571569435,
                                47.2996865065608
                            ],
                            [
                                -121.948627723598,
                                47.2996530899699
                            ],
                            [
                                -121.948685696981,
                                47.2996437543444
                            ],
                            [
                                -121.948856171599,
                                47.2996393857877
                            ],
                            [
                                -121.949033573026,
                                47.2996348125548
                            ],
                            [
                                -121.949654872994,
                                47.2991856422147
                            ],
                            [
                                -121.95003466365,
                                47.2996091147946
                            ],
                            [
                                -121.950710991124,
                                47.2995917386119
                            ],
                            [
                                -121.950101045207,
                                47.300460300514
                            ],
                            [
                                -121.949737745781,
                                47.3011022255168
                            ],
                            [
                                -121.94997102452,
                                47.3014706529282
                            ],
                            [
                                -121.949974117645,
                                47.3014755379057
                            ],
                            [
                                -121.949977210746,
                                47.3014804219838
                            ],
                            [
                                -121.950013024187,
                                47.3015369825749
                            ],
                            [
                                -121.950053763553,
                                47.3016445587876
                            ],
                            [
                                -121.950109089053,
                                47.3018018440814
                            ],
                            [
                                -121.950110823971,
                                47.3018067775293
                            ],
                            [
                                -121.95012927267,
                                47.3018439469896
                            ],
                            [
                                -121.950249511694,
                                47.3021614472651
                            ],
                            [
                                -121.950720717868,
                                47.3028028925071
                            ],
                            [
                                -121.950909273058,
                                47.3032785687955
                            ],
                            [
                                -121.950968529692,
                                47.3038454953756
                            ],
                            [
                                -121.950711001411,
                                47.3040678174012
                            ],
                            [
                                -121.950332679579,
                                47.3041926297411
                            ],
                            [
                                -121.949550053944,
                                47.3044508223304
                            ],
                            [
                                -121.948426427605,
                                47.3051321220804
                            ],
                            [
                                -121.947631626053,
                                47.3055204924979
                            ],
                            [
                                -121.947076641249,
                                47.3061150049319
                            ],
                            [
                                -121.947013012932,
                                47.306140273298
                            ],
                            [
                                -121.947009822548,
                                47.3061415402009
                            ],
                            [
                                -121.947019090209,
                                47.3059490379173
                            ]
                        ]
                    ]
            }
        }
        // cluster: true,
        // clusterMaxZoom: 14, // Max zoom to cluster points on
        // clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'parks',
        type: 'fill',
        source: 'parks',
        // filter: ['==', '$type', 'Polygon'],
        layout: {},
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'fill-outline-color': '#F08080',
            'fill-color': '#F08080',
            'fill-opacity': 0.75
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