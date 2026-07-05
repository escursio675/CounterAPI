export const errorHandler = (err, req, res, next) =>{
    console.error(err);

    if(err.name === 'ValidationError'){
        return res.status(400).json({ error: err.message });
    }

    if(err.code === 11000){
        return res.status(409).json({ error: 'A resource with that identifier already exists' });
    }

    if(err.name === 'CastError'){
        return res.status(400).json({ error: "Invalid ID Format" });
    }

    return res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
};

export const notFound = (req, res) =>{
    return res.status(404).json({ error: `Route ${req.originalUrl} not found` });
};
