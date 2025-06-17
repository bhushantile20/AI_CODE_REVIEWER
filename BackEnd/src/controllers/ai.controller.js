const aiService = require("../services/ai.service")

module.exports.getReview=async(req ,res) => 
{ 
    const code =req.body.code;
    if(!code)
    { 
        return res.status(400).send("prompt is required");
    }

    try { 
        const response =await aiService(code);

    res.send(response);
    } 
    catch (error)
    { 
        res.status(500).send("Error processing AI response");
    }
};
 