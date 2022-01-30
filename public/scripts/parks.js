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
            console.log(features)
            document.querySelector("#app")
                .insertAdjacentHTML("afterbegin", features)

        })
        .catch(err => {
            console.log(err)
        })
}

fetchData()