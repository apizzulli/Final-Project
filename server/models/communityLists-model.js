const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommunityListsSchema = new Schema(
    {
        top5Lists: {type: [Scehma.Top5ListSchema], required: true}
    },
    { timestamps: true }
)

module.exports = mongoose.model('CommunityLists', CommunityListsSchema)
