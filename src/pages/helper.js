export function getConfigValues(value) {
    console.log('getting value:' + value);
    let json = JSON.parse(sessionStorage.getItem("configData"));
    if(json==null || json[value]==null) {
        return [];
    }
    console.log(json);
    return json[value];
}
export default getConfigValues;