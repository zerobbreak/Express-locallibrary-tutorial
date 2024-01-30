const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});

authorSchema.virtual("name").get(function () {
    let fullName = "";
    if (this.first_name && this.family_name) {
        fullName = `${this.family_name}, ${this.first_name}`;
    }

    return fullName;
})

authorSchema.virtual("url").get(function () {
    return `/catalog/author/${this._id}`;
})

authorSchema.virtual("lifespan").get(function () {
    let lifetime = "";
    if (this.date_of_birth) {
        lifetime = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
            DateTime.DATETIME_MED
        );
    }
    lifetime += " - ";
    if (this.date_of_death) {
        lifetime += DateTime.fromJSDate(this.date_of_death).toLocaleString(
            DateTime.DATETIME_MED
        );
    }

    return lifetime;
})

authorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function(){
    return DateTime.fromJSDate(this.date_of_birth).toISODate();
})

authorSchema.virtual("date_of_death_yyyy_mm_dd").get(function(){
    return DateTime.fromJSDate(this.date_of_death).toISODate();
})

module.exports = mongoose.model("Author", authorSchema);