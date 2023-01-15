import { createContext } from 'react';

export interface ProductData {
	id: number;
	name: string;
	year: number;
	color: string;
	pantoneValue: string;
}

const initialState: ProductData[] = [];

export const ProductContext = createContext<ProductData[]>(initialState);
