const {MongoClient} = require ("mongodb");

require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//get the collections
const getCollections = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {sub} = req.params;

try {
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("users").findOne({sub:sub})

    if(!result){
        return res.status(400).json({status:400,massage:"invalid user sub"})
    }

    client.close();
    return res.status(200).json({status:200,massage:"success",data:result.collection});
}

catch(err){
    return res.status(400).json({status:400,massage:err})
}
}

//post the collection
const postCollection = async (req , res) =>{
const client = new MongoClient(MONGO_URI,options);
const {id , sub, strDrinkThumb, strDrink} = req.body;
const query = {sub:sub}
const updateValue = {$push : {"collection":{strDrinkThumb:strDrinkThumb,id:id,strDrink:strDrink}}} 

try{
    await client.connect();
    const db = client.db("cocktails");

    const result = await db.collection("users").findOne({sub})

    if(!result){
        return res.status(400).json({status:400,message:"user not existed"})
    }
    else{
        //search for that drink inthe collection list to see whether its already added to the collection
        const isCollected = await db.collection("users").findOne({sub:sub,collection:{$elemMatch:{id:id}}})
        //when cant find the same collection push the drink info into the list
        if(!isCollected){
            await db.collection("users").updateOne(query,updateValue)
        }
        //when there is the same drink collected then no push
        else{
            return res.status(200).json({status:200,message:"collection already existed",data:null})
        }
        
    }

    client.close();
    return res.status(200).json({status:200,message:"collection added",data: req.body})
}
catch (err) {
    return res.status(400).json({status:400,err:err})
}
}

//post the collection
const postCommunityCollection = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);
    const {id , sub, img, strDrink} = req.body;
    const query = {sub:sub}
    const updateValue = {$push : {"communityCollection":{img:img,id:id,strDrink:strDrink}}} 
    
    try{
        await client.connect();
        const db = client.db("cocktails");
    
        const result = await db.collection("users").findOne({sub})
    
        if(!result){
            return res.status(400).json({status:400,message:"user not existed"})
        }
        else{
            //search for that drink inthe collection list to see whether its already added to the collection
            const isCollected = await db.collection("users").findOne({sub:sub,communityCollection:{$elemMatch:{id:id}}})
            //when cant find the same collection push the drink info into the list
            if(!isCollected){
                await db.collection("users").updateOne(query,updateValue)
            }
            //when there is the same drink collected then no push
            else{
                return res.status(200).json({status:200,message:"collection already existed",data:null})
            }
            
        }
    
        client.close();
        return res.status(200).json({status:200,message:"collection added",data: req.body})
    }
    catch (err) {
        return res.status(400).json({status:400,err:err})
    }
    }

    //get the community collections
const getCommunityCollections = async (req , res) =>{
    const client = new MongoClient(MONGO_URI,options);
    const {sub} = req.params;
    
    try {
        await client.connect();
        const db = client.db("cocktails");
    
        const result = await db.collection("users").findOne({sub:sub})
    
        if(!result){
            return res.status(400).json({status:400,massage:"invalid user sub"})
        }
    
        client.close();
        return res.status(200).json({status:200,massage:"success",data:result.communityCollection});
    }
    
    catch(err){
        return res.status(400).json({status:400,massage:err})
    }
    }

module.exports = {postCollection,getCollections,postCommunityCollection , getCommunityCollections}