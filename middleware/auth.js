import Site from "../models/Site.js";

export const requireSiteAPIKey = async(req, res, next) =>{
    try{
        const apiKey = req.header('x-api-key');

        if(!apiKey){
            return res.status(401).json({error: 'Missing x-api-key header'});
        }

        const site = await Site.findOne({apiKey, isActive: true});

        if(!site){
            return res.status(401).json({error: 'Invalid or inactive API Key'});
        }

        req.site = site;
        next();
    }
    catch(err){
        next(err);
    }
};

export const requireAdminAPIKey = async(req, res, next) =>{
    const adminKey = req.header('x-admin-key');

    if(!adminKey || adminKey !== process.env.ADMIN_API_KEY){
        return res.status(401).json({error: "Invalid or missing admin key"});
    }
}
