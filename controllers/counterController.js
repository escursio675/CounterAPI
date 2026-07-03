import Counter from "../models/counter.js";

export const createCounter = async(req, res, next) => {
    try{
       const { name, value } = req.body;

        if(!name){
            return res.status(400).json({error: "Counter name unspecified"});
        }

        const counter = await Counter.create(
            {
                site: req.site._id,
                name,
                value
            }
        );

        return res.status(201).json(counter);
    }
    catch(err){
        next(err);
    }
}
