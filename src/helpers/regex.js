export function validateName (name){
    // const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const nameRegex = /^.+$/;
    const anyNumberRegex= /\d/;
    const checkForNumber = anyNumberRegex.test(name);
    const testName= nameRegex.test(name);
    if(!testName || checkForNumber) return name;
}
export function validateNumber(number){
    const phoneNumberRegex= /^\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
    // const numberRegex= /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    const testNumber = phoneNumberRegex.test(number);
    if(!testNumber) return number;
}
