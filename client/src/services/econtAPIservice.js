const uname = "mityo91@gmail.com";
const pword = "Contractors_Hub";
const url = 'https://ee.econt.com/services/Nomenclatures/NomenclaturesService'

export const loadCities = async () => {

    const citiesData = await fetch(`${url}.getCities.json`, {
        method: "POST",
        headers: {
            "Authorization": "Basic " + (uname + ":" + pword),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ countryCode: "BGR" })
    });
    const data = await citiesData.json();
    const firstCities = data.cities.slice(0, 100);
    return firstCities
}

export const loadOffices = async (_cityId) => {
    const offices = await fetch(`${url}.getOffices.json`, {
        method: "POST",
        headers: {
            "Authorization": "Basic " + (uname + ":" + pword),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            countryCode: "BGR",
            cityID: _cityId
        })
    });
    const data = await offices.json();
    const newData = [];
    const _markers = [];
    data['offices'].forEach(x => newData.push(x.address))
    newData.forEach(x => _markers.push({ lat: x.location.latitude, lng: x.location.longitude }))
    return [newData, _markers]    
}