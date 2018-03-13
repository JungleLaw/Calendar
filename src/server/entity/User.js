class User {
    constructor(id, username, password, gender, age, sign, address, mobile, token, validate) {
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
    }
}

module.exports = User;
