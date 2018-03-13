class Setting {
    static async preset(ctx, next) {
        console.log("preset");
        await next();
    }
}

module.exports = Setting;