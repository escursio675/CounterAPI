import axios, { type AxiosResponse } from 'axios';

const BASE_URL: string = import.meta.env.VITE_API_URL;

export interface Site {
  _id: string;
  name: string;
  apiKey: string;
  allowedOrigins: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Counter {
  _id: string;
  site: string;
  name: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}


//SITES

export const createSite = (adminKey: string, name: string): Promise<AxiosResponse<Site>> =>{
    return axios.post(`${BASE_URL}/api/sites`,
        {
            name
        },
        {   
            headers: {'x-admin-key': adminKey}
        }
    );
};

export const listSites = (adminKey: string): Promise<AxiosResponse<Site[]>> =>{
    return axios.get(`${BASE_URL}/api/sites`,
        {
            headers: {'x-admin-key': adminKey}
        }
    );
};

export const rotateApiKey = (adminKey: string, siteId: string): Promise<AxiosResponse<Site>> =>{
    return axios.patch(`${BASE_URL}/api/sites/${siteId}/rotate-key`,
        {},
        {
            headers: {'x-admin-key': adminKey}
        }
    );
};

export const deleteSite = (adminKey: string, siteId: string): Promise<AxiosResponse<{message: string}>> =>{
    return axios.delete(`${BASE_URL}/api/sites/${siteId}`,
        {
            headers: {'x-admin-key': adminKey}
        }
    );
};

//Counters

export const createCounter = (apiKey: string, name: string): Promise<AxiosResponse<Counter>> =>{
    return axios.post(`${BASE_URL}/api/counters`,
        {
            name
        },
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const listCounters = (apiKey: string): Promise<AxiosResponse<Counter[]>> =>{
    return axios.get(`${BASE_URL}/api/counters`,
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const getCounter = (apiKey: string, name: string): Promise<AxiosResponse<Counter>> =>{
    return axios.get(`${BASE_URL}/api/counters/${name}`,
        {
            headers: {'x-api-key': apiKey}
        }
    )
};

export const incrementCounter = (apiKey: string, name: string, by = 1): Promise<AxiosResponse<Counter>> =>{
    return axios.patch(`${BASE_URL}/api/counters/${name}/increment`,
        {
            by
        },
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const decrementCounter = (apiKey: string, name: string, by = 1): Promise<AxiosResponse<Counter>> => {
    return axios.patch(`${BASE_URL}/api/counters/${name}/decrement`,
        {
            by
        },
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const resetCounter = (apiKey: string, name: string): Promise<AxiosResponse<Counter>> =>{
    return axios.patch(`${BASE_URL}/api/counters/${name}/reset`,
        {},
        {
            headers: {'x-api-key': apiKey}
        }
    );
};

export const deleteCounter = (apiKey: string, name: string): Promise<AxiosResponse<{message: string}>> =>{
    return axios.delete(`${BASE_URL}/api/counters/${name}`,
        {
            headers: {'x-api-key': apiKey}
        }
    );
};