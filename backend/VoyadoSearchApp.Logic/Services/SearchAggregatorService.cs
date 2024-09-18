using Microsoft.Extensions.Logging;
using System.Diagnostics;
using VoyadoSearchApp.Logic.Interfaces;
using VoyadoSearchApp_Integrations.Services;

namespace VoyadoSearchApp.Logic.Services
{
    public class SearchAggregatorService(ISearchServiceFactory searchServiceFactory, ILogger<SearchAggregatorService> logger) : ISearchAggregatorService
    {
        private readonly ISearchServiceFactory _searchServiceFactory = searchServiceFactory;
        private static readonly char[] separator = [' '];
        private readonly ILogger<SearchAggregatorService> _logger = logger;

        public async Task<long> AggregateSearchResults(string query)
        {            
            var stopwatch = Stopwatch.StartNew();

            long totalHits = 0;
            var searchTerms = query.Split(separator, StringSplitOptions.RemoveEmptyEntries);
            var searchEngines = _searchServiceFactory.GetAllSearchEngineNames();

            foreach (var term in searchTerms)
            {
                foreach (var engine in searchEngines)
                {
                    var searchService = _searchServiceFactory.CreateSearchService(engine);
                    totalHits += await searchService.GetTotalSearchHits(term);
                }
            }
            
            stopwatch.Stop();
            
            _logger.LogInformation("Total aggregation time for query '{query}' took {stopwatch.ElapsedMilliseconds} ms", query, stopwatch.ElapsedMilliseconds);            

            return totalHits;
        }
    }
}
