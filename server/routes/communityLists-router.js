const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth-controller')
const CommunityListController = require('../controllers/communityLists-controller')

router.post('/communityList',auth.verify,CommunityListController.publishCommunityList)
module.exports=router