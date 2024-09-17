export interface SearchResponseDto {
    isSearchSuccessful: boolean;
    searchResponse: string;
    errorResponse?: string;
    numberOfGoogleHits: bigint;
    numberOfBingHits: bigint;
    totalSumOfHits: bigint;
}