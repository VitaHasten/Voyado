using Microsoft.AspNetCore.Mvc;
using System.Numerics;
using VoyadoSearchApp.Logic.Interfaces;
using VoyadoSearchApp_Integrations.Dto;
using VoyadoSearchApp_Integrations.Interfaces;

namespace VoyadoSearchApp.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController(ISearchAggregatorService searchAggregatorService) : ControllerBase
    {
        private readonly ISearchAggregatorService _searchAggregatorService = searchAggregatorService;
        //private readonly ILogger<SearchController> _logger = logger;

        [HttpGet()]
        public async Task<ActionResult<long>> PerformSearch(string searchString)
        {
            var searchResponse = await _searchAggregatorService.AggregateSearchResults(searchString);            

            return Ok(searchResponse);
        }
    }
}
