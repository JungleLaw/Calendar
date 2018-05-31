class User {
    constructor(id, username, password, gender, age, sign, address, mobile, token, validate,platform,registration_time) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.gender = gender;
        this.age = age;
        this.sign = sign;
        this.address = address;
        this.mobile = mobile;
        this.token = token;
        this.validate = validate;
        this.platform = platform;
        this.registration_time = registration_time;
    }
}

module.exports = User;
