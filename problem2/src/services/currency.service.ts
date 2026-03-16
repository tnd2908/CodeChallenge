import type { ICurrency } from "../types/types";

const API_URL = '/mock/data.json';

const getCurrency = async (): Promise<ICurrency[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch currency');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default getCurrency;