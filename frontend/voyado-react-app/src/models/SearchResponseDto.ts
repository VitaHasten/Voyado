export interface SearchResponseDto {
    success: boolean;
    searchResponseString: string;
    errorResponseString?: string;
    numberOfGoogleHits: bigint;
    numberOfBingHits: bigint;
    totalSumOfHits: bigint;
}