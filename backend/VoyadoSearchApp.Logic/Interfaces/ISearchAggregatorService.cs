using System.Numerics;
using VoyadoSearchApp_Integrations.Dto;

namespace VoyadoSearchApp.Logic.Interfaces
{
    public interface ISearchAggregatorService
    {
        public Task<long> AggregateSearchResults(string query);
    }
}
