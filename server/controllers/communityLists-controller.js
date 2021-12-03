const Top5List = require('../models/top5list-model');
const User = require('../models/user-model');
const CommunityLists=require('../models/communityLists-model');

publishCommunityList= (req,res) =>{  
    console.log("publishCommunityList in communityLists controller...");
    const body=req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }
    const top5List = new Top5List(body); //Create a top5 list from the body of the request.
    
    if (!top5List) {//If the list is improperly formatted
        return res.status(400).json({
            errorMessage: 'Improperly formatted request',
        })
    }

    CommunityLists.communityLists.push(top5List);
    CommunityLists
            .save()
            .then(() => {
                top5List
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            CommunityLists: [communityLists]
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Community List Not Published!'
                        })
                    })
            });



}
