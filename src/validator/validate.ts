export function validate (addresses: string) {
    let addressesArray = addresses.split(/[,]+/);
    console.log("array of addresses length", addressesArray.length)
    if (addressesArray.length > 100){
        return false;
    }
    return addresses;
}