export function validateName (name){
    // const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    const nameRegex = /^.+$/;
    const anyNumberRegex= /\d/;
    const checkForNumber = anyNumberRegex.test(name);
    const testName= nameRegex.test(name);
    if(!testName || checkForNumber) return name;
}
export function validateNumber(number){
    const numberRegex= /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
    const testNumber = numberRegex.test(number);
    if(!testNumber) return number;
}
