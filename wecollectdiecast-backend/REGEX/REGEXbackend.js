
const validColorHexCode = /^#([A-F0-9]{6}|[A-F0-9]{3})$/;
exports.validColorHexCode = validColorHexCode;

const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z-.]+$/;
exports.validEmail = validEmail;

const validPhoneNumber = /^\d{3}-\d{3}-\d{4}$/;
exports.validPhoneNumber = validPhoneNumber;

const validDate = /^\d{4}-\d{1,2}-\d{2}$/;
exports.validDate = validDate;

const validTime = /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;
exports.validTime = validTime;

const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%-+*?&])[A-Za-z\d@#$!%-+*?&]{8,}$/;
exports.validPassword = validPassword;