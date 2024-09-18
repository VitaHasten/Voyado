using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Numerics;
using VoyadoSearchApp_Integrations.Interfaces;

public class BingService : ISearchService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;   
    private readonly ILogger<BingService> _logger;

    public BingService(HttpClient httpClient, IConfiguration configuration, ILogger<BingService> logger)
    {
        _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        _apiKey = configuration["BingSearch:ApiKey"] ?? throw new ArgumentNullException(nameof(configuration));        
        _logger = logger;
    }

    public async Task<long> GetTotalSearchHits(string query)
    {
        if (string.IsNullOrEmpty(query))
        {
            throw new ArgumentNullException(nameof(query));
        }
        
        var relativeUri = $"/v7.0/search?q={Uri.EscapeDataString(query)}";
        
        var request = new HttpRequestMessage(HttpMethod.Get, relativeUri);
        request.Headers.Add("Ocp-Apim-Subscription-Key", _apiKey);

        try
        {            
            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();
            
            var json = await response.Content.ReadAsStringAsync();

            dynamic parsedJson = JsonConvert.DeserializeObject(json);
            
            long totalHits = parsedJson.webPages.totalEstimatedMatches;

            _logger.LogInformation($"Total hits for query '{query}': {totalHits}");
            return totalHits;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while searching Bing.");
            throw;
        }
    }
}
