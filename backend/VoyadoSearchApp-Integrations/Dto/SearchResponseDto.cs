using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace VoyadoSearchApp_Integrations.Dto
{
    public class SearchResponseDto
    {
        public bool Success { get; set; }
        public string SearchResponseString { get; set; } = string.Empty;
        public string? ErrorResponseString { get; set; }
        public BigInteger NumberOfGoogleHits { get; set; }
        public BigInteger NumberOfBingHits { get; set; }
        public BigInteger TotalSumOfHits { get; set; }
    }
}
