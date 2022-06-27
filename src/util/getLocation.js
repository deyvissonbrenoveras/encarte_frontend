import axios from 'axios'
export const getLocation = async (lng, lat) => {
    return await axios.get(`
    https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=AIzaSyCTNtde1oTnSIBxmMbo6eLXbt8rKp_pO2E`).then(response => {
        var data = response//.data.plus_code.compound_code.match(/ /)
        return data
    });
}