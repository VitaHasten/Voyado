export interface SearchResponseDto {
    success: boolean;
    searchResponseString: string;
    errorResponseString?: string;
    numberOfGoogleHits: number;
    numberOfBingHits: number;
    totalSumOfHits: number;
}