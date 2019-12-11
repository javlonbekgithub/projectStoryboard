const Router = require ('express')
const { checkToken } = require ('../helpers')
const { User }  = require('../schemas/user')
const  { Story } = require('../schemas/story')

const story = Router()

story.get('/',async (req, res) => {
    let options = {
        path : 'author',
        select : 'name avatar'
    }
    res.json( await Story.find().populate(options))
})

story.delete('/', checkToken, async (req, res) => {
    let { id } = req.body
    await User.findByIdAndUpdate(
        req.currentUser._id,
        { $pull: { stories: id } },
    )
    await Story.findByIdAndDelete(id)
    res.json({ id,status:'successful' })
})

story.post('/', checkToken, async (req ,res) => {
    let story = req.body
    story.author = req.currentUser._id

    let addedStory = await Story.insertMany([story])
    
    await User.findByIdAndUpdate(
        req.currentUser._id,
        { $push: { stories: addedStory[0]._id } }
    )

    res.json(addedStory[0])

})
module.exports = { story }