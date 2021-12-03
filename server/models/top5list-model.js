const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Top5ListSchema = new Schema(
    {
        name: { type: String, required: true },
        items: { type: [String], required: true },
        ownerEmail: { type: String },
        likes: {type: Number, required:false},
        dislikes: {type: Number, required:false},
        //comments: {type: Map of }
        publishedDate: {type: Date}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Top5List', Top5ListSchema)
