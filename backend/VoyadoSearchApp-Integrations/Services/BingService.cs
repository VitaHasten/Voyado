using Microsoft.Extensions.Configuration;
using System.Numerics;
using System.Text.Json;
using VoyadoSearchApp_Integrations.Interfaces;

namespace VoyadoSearchApp_Integrations.Services
{
    public class BingService(HttpClient httpClient) : ISearchService
    {
        private readonly HttpClient _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));

        public async Task<BigInteger> GetTotalSearchHits(string query)
        {            
            var requestUrl = $"search?q={query}";
           
            var requestMessage = new HttpRequestMessage(HttpMethod.Get, requestUrl);
            
            var response = await _httpClient.SendAsync(requestMessage);
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            var jsonDoc = JsonDocument.Parse(content);

            BigInteger totalHits = 0;
            if (jsonDoc.RootElement.TryGetProperty("webPages", out var webPages))
            {
                if (webPages.TryGetProperty("totalEstimatedMatches", out var totalEstimatedMatches))
                {
                    totalHits = totalEstimatedMatches.GetInt32();
                }
            }

            return totalHits;
        }
    }

}