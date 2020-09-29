export const addPad = (item: any) => {
    let str = "" + item.striker_number;let pad = "0000";
    let newRealNumber_arry = pad.substring(0, pad.length - str.length) + str;
    return newRealNumber_arry;
}
