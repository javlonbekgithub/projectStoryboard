
const { Schema, model } = require('mongoose')
const { URL } = require('../env')

const storySchema = new Schema ({
    title: String,
    content: String,
    category: String,
    data_created: {
        type: Date,
        default: Date.now
    },
    author: {
        ref: 'Users',
        type: Schema.Types.ObjectId,
    },
    cover: {
        type: String,
        default: `${URL}/covers/cover.jpg`
    }
})
const Story = model('Stories',storySchema)
module.exports = { Story }
