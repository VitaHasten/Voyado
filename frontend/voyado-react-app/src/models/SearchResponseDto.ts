export interface SearchResponseDto {
    success: boolean;    
    errorResponseString?: string;
    numberOfGoogleHits: number;
    numberOfBingHits: number;
    totalSumOfHits: number;
    responseTime: number;
}