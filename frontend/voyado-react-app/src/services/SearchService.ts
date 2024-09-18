import axios from "axios";
import { SearchResponseDto } from "../models/SearchResponseDto";

const uri: string = process.env.REACT_APP_BASE_URI!;

export const GetSearchResponse = async (searchString: string): Promise<SearchResponseDto> => {
    try {                
        const response = await axios.get<SearchResponseDto>(`${uri}api/Search?searchString=${searchString}`);        
        return response.data;
    }
    catch (error) {
        console.error('Error fetching search result.', error);
        throw error;
    }
}