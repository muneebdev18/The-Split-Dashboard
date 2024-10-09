import axios from 'axios';
import useSWR from 'swr';

const fetcherWithToken = async (url, token, ...args) => {
    const response = await fetch(url, {
        ...args,
        headers: {
            ...args.headers,
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
};

const fetcher = (...args) => fetch(...args).then(res => res.json());

// Function to make a GET request
export const FetchData =  (endpoint, token) => {
    try {
        const fetchFunc = token ? fetcherWithToken : fetcher;
        const { data, error, isLoading } = useSWR(endpoint, fetchFunc);
        return { user: data, isLoading, isError: error }

    } catch (error) {
        // Handle error, you can log, throw, or handle as needed
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to make a GET request
export const FetchDataByID = (endpoint, id, token) => {
    try {
        const fetchFunc = token ? fetcherWithToken : fetcher;
        const { data, error, isLoading } = useSWR(endpoint, fetchFunc);
        return { user: data, isLoading, isError: error }

    } catch (error) {
        // Handle error, you can log, throw, or handle as needed
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to make a POST request
export const PostData = async (endpoint, data, token) => {
    try {
        const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
        const response = await axios.post(endpoint, data, config);
        return response.data;

    } catch (error) {
        // Handle error, you can log, throw, or handle as needed
        console.error('Error posting data:', error);
        throw error;
    }
}

// Function to make a PUT request for updating data
export const UpdateData = async (endpoint, id, data, token) => {
    try {
        const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
        const response = await axios.patch(endpoint, data, config);
        return response.data;

    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

// Function to make a DELETE request for deleting data
// we change isDeleted into true while delete (bcz data not delete from database)
export const DeleteData = async (endpoint, id, token) => {
    try {
        const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
        const response = await axios.put(endpoint, config);
        return response.data;

    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}