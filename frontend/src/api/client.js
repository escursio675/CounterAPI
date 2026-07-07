import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

//SITES

export const createSite = (adminKey, name) =>{
    return axios.post(`${BASE_URL}/api/sites`,
        {
            name
        },
        {   
            headers: {'x-admin-key': adminKey}
        }
    );
};

export const listSites = (adminKey) =>{
    return axios.get(`${BASE_URL}/api/sites`,
        {
            headers: {'x-admin-key': adminKey}
        }
    );
};

export const rotateApiKey = (adminKey, siteId) =>{
    return axios.patch(`${BASE_URL}/api/sites/${siteId}/rotate-key`,
        {},
        {
            headers: {'x-admin-key': adminKey}
        }
    );
};

export const deleteSite = (adminKey, siteId) =>{
    return axios.delete(`${BASE_URL}/api/sites/${siteId}`,
        {
            headers: {'x-admin-key': adminKey}
        }
    );
};

//Counters

export const createCounter = (apiKey, name) =>{
    return axios.post(`${BASE_URL}/api/counters`,
        {
            name
        },
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const listCounters = (apiKey) =>{
    return axios.get(`${BASE_URL}/api/counters`,
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const getCounter = (apiKey, name) =>{
    return axios.get(`${BASE_URL}/api/counters/${name}`,
        {
            headers: {'x-api-key': apiKey}
        }
    )
};

export const incrementCounter = (apiKey, name, by = 1) =>{
    return axios.patch(`${BASE_URL}/api/counters/${name}/increment`,
        {
            by
        },
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const decrementCounter = (apiKey, name, by = 1) => {
    return axios.patch(`${BASE_URL}/api/counters/${name}/decrement`,
        {
            by
        },
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const resetCounter = (apiKey, name) =>{
    return axios.patch(`${BASE_URL}/api/counters/${name}/reset`,
        {},
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const deleteCounter = (apiKey, name) =>{
    return axios.delete(`${BASE_URL}/api/counters/${name}`,
        {
            headers: {'x-api-key': apiKey}
        }
    );
};