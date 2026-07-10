import crypto from 'crypto';

import Site from "../models/site.js";
import Counter from "../models/counter.js";

export const createSite = async(req, res, next) =>{
    try{
        const { name } = req.body;

        if(!name)
            return res.status(400).json({error: "Site name unspecified"});

        const site = await Site.create({ name });

        return res.status(201).json(site);
    }
    catch(err){
        next(err);
    }
};

export const listSites = async(req, res, next) =>{
    try{
        const sites = await Site.find();

        return res.status(200).json(sites);
    }
    catch(err){
        next(err);
    }
};

export const rotateAPIKey = async(req, res, next) =>{
    try{
        const site = await Site.findById(req.params.id);

        if(!site){
            return res.status(404).json({error: "Site not found"});
        }

        site.apiKey = crypto.randomBytes(24).toString('hex');
        await site.save();

        return res.status(200).json(site);
    }
    catch(err){
        next(err);
    }
};

export const deleteSite = async(req, res, next) => {
    try{
        const site = await Site.findByIdAndDelete(req.params.id);

        if(!site){
            return res.status(404).json({error: "Site not found"});
        }

        const counter = await Counter.deleteMany({ site: site._id });


        return res.status(200).json({message: "Site and it's counters deleted successfully"});
    }
    catch(err){
        next(err);
    }
}
