const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListSchema = new Schema(
    {
        /*
        "key": "0",
            "name": "Games",
            "likes": 2150,
            "dislikes": 114,
            "created": "Thu, 22 Oct 2020 01:10:53 GMT",
            "modified": "Wed, 23 Jun 2021 03:21:31 GMT",
            "accessed": "Thu, 26 Aug 2021 03:23:31 GMT",
            "items": [
                "StarCraft",
                "Fallout 3",
                "Katamari Damacy",
                "Civilization II",
                "Super Mario World"
            ]*/
        key: {type:Number, required: true},
        name: { type: String, required: true },
        likes: {type: Number, required:false},
        dislikes: {type: Number, required:false},
        createdDate: {type: Date, required: true},
        modifiedDate: {type:Date,required: true},
        accessedDate: {type: Date,required:true},
        items: { type: [String], required: true },
        ownerEmail: { type: String , required:true}
    },
    { timestamps: true }
)

module.exports = mongoose.model('CommunityList', CommunityListSchema)
