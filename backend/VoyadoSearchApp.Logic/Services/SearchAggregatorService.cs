using System.Numerics;
using VoyadoSearchApp.Logic.Interfaces;
using VoyadoSearchApp_Integrations.Dto;
using VoyadoSearchApp_Integrations.Interfaces;

namespace VoyadoSearchApp.Logic.Services
{
    public class SearchAggregatorService(ISearchServiceFactory searchServiceFactory) : ISearchAggregatorService
    {
        private readonly ISearchServiceFactory _searchServiceFactory = searchServiceFactory;
        private static readonly char[] separator = [' '];

        public async Task<BigInteger> AggregateSearchResults(string query)
        {
            BigInteger totalHits = 0;
                        
            var searchTerms = query.Split(separator, StringSplitOptions.RemoveEmptyEntries);
            var searchEngines = _searchServiceFactory.GetAllSearchEngineNames();

            foreach (var term in searchTerms)            {
                
                foreach (var engine in searchEngines)
                {
                    var searchService = _searchServiceFactory.CreateSearchService(engine);
                    totalHits += await searchService.GetTotalSearchHits(term);
                }
            }

            return totalHits;
        }
    }
}

