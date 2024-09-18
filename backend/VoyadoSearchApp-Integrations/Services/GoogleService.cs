using Microsoft.Extensions.Configuration;
using System.Numerics;
using System.Text.Json;
using VoyadoSearchApp_Integrations.Interfaces;
using Microsoft.Extensions.Logging;

namespace VoyadoSearchApp_Integrations.Services
{
    public class GoogleService : ISearchService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private readonly string _cx;
        private readonly ILogger<GoogleService> _logger;

        public GoogleService(HttpClient httpClient, IConfiguration configuration, ILogger<GoogleService> logger)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _apiKey = configuration["GoogleSearch:ApiKey"] ?? throw new ArgumentNullException(nameof(configuration));
            _cx = configuration["GoogleSearch:Cx"] ?? throw new ArgumentNullException(nameof(configuration));
            _logger = logger;
        }

        public async Task<long> GetTotalSearchHits(string query)
        {
            var requestUrl = $"?key={_apiKey}&cx={_cx}&q={query}";
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

            return totalHits;
        }
    }
}
