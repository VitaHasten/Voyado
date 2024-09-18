using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using VoyadoSearchApp_Integrations.Interfaces;

namespace VoyadoSearchApp_Integrations.Services
{
    public class GoogleService(HttpClient httpClient, IConfiguration configuration, ILogger<GoogleService> logger) : ISearchService
    {
        private readonly HttpClient _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        private readonly string _apiKey = configuration["GoogleSearch:ApiKey"] ?? throw new ArgumentNullException(nameof(configuration));
        private readonly string _cx = configuration["GoogleSearch:Cx"] ?? throw new ArgumentNullException(nameof(configuration));
        private readonly ILogger<GoogleService> _logger = logger;

        public async Task<long> GetTotalSearchHits(string query)
        {            
            _logger.LogInformation("Starting search for query: {query}", query);

            var requestUrl = $"?key={_apiKey}&cx={_cx}&q={query}";

            try
            {                
                _logger.LogDebug("Sending request to Google Search API at: {requestUrl}", requestUrl);

                var response = await _httpClient.GetAsync(requestUrl);
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                var jsonDoc = JsonDocument.Parse(content);

                long totalHits = 0;
                if (jsonDoc.RootElement.TryGetProperty("searchInformation", out var searchInfo))
                {
                    if (searchInfo.TryGetProperty("totalResults", out var totalResults))
                    {
                        totalHits = long.Parse(totalResults.GetString() ?? "0");
                    }
                }
                                
                _logger.LogInformation("Total Google-hits for query '{query}': {totalHits}", query, totalHits);

                return totalHits;
            }
            catch (Exception ex)
            {                
                _logger.LogError(ex, "Error occurred while searching Google for query: {query}", query);
                throw;
            }
        }
    }
}
