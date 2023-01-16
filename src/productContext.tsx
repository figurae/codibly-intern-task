import { createContext } from 'react';

interface ProductData {
	id: number;
	name: string;
	year: number;
	color: string;
	pantoneValue: string;
}

export interface ApiInterface {
	data: ProductData[];
	page: number;
	perPage: number;
	total: number;
	totalPages: number;
}

export const apiUrl = 'https://reqres.in/api/products?';
export const ProductContext = createContext<ApiInterface | null>(null);
