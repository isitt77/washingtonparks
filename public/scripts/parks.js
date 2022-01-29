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

            // Video 3's loop (.map) 
            const features = data.features.map(f => {
                // console.log(f.attributes)
                return `<h1>${f.attributes.OBJECTID}. ${f.attributes.ParkName}</h1>`
            }).join(" ")
            // console.log(features)
            document.querySelector("#app")
                .insertAdjacentHTML("afterbegin", features)

        })
        .catch(err => {
            console.log(err)
        })
}

fetchData()