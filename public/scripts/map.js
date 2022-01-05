mapboxgl.accessToken = "pk.eyJ1IjoiaXNpdHQ3NyIsImEiOiJja3dvam45NjAwM2oyMndqdjNzdHNpZGtmIn0.N1zn-7deVgeJLaqFawePDg";
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-120.7401, 47.7511], // starting position [lng, lat]
    zoom: 6, // starting zoom
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