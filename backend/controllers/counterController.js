import Counter from "../models/counter.js";

export const createCounter = async(req, res, next) => {
    try{
       const { name, value } = req.body;

        if(!name){
            return res.status(400).json({ error: "Counter name unspecified" });
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
};

export const listCounters = async(req, res, next) => {
    try{
        const counters = await Counter.find({ site: req.site._id });
        return res.status(200).json(counters);
    }
    catch(err){
        next(err);
    }
};

export const getCounter = async(req, res, next) =>{
    try{
        const counter = await Counter.findOne({ site: req.site._id, name: req.params.name });

        if(!counter){
            return res.status(404).json({ error: "Counter not found" });
        }

        return res.status(200).json(counter);
    }
    catch(err){
        next(err);
    }
};

export const incrementCounter = async (req, res, next) =>{
    try{
        const by = req.body?.by ?? 1;

        if(typeof by !== 'number' || by <= 0){
            return res.status(400).json({ error: "Invalid increment value" });
        }

        const counter = await Counter.findOne({ site: req.site._id, name: req.params.name });

        if(!counter){
            return res.status(404).json({ error: "Counter not found" });
        }

        counter.value += by;
        await counter.save();

        return res.status(200).json(counter);
    }
    catch(err){
        next(err);
    }
};

export const decrementCounter = async (req, res, next) =>{
    try{
        const by = req.body?.by ?? 1;

        if(typeof by !== 'number' || by <= 0){
            return res.status(400).json({ error: "Invalid decrement value" });
        }

        const counter = await Counter.findOne({ site: req.site._id, name: req.params.name });

        if(!counter){
            return res.status(404).json({ error: "Counter not found" });
        }

        counter.value -= by;
        await counter.save();

        return res.status(200).json(counter);
    }
    catch(err){
        next(err);
    }
};


export const resetCounter = async(req, res, next) =>{
    try{
        const counter = await Counter.findOne({ site: req.site._id, name: req.params.name });

        if(!counter){
            return res.status(404).json({ error: "Counter not found" });
        }

        counter.value = 0;
        await counter.save();

        return res.status(200).json(counter);
    }
    catch(err){
        next(err);
    }
};

export const deleteCounter = async(req, res, next) =>{
    try{
        const counter = await Counter.findOneAndDelete({ site: req.site._id, name: req.params.name });

        if(!counter){
            return res.status(404).json({ error: "Could not find Counter" });
        }

        return res.status(200).json({ message: "Counter deleted successfully" });
    }
    catch(err){
        next(err);
    }
};
