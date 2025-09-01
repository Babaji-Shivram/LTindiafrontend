namespace ERP.Gateway.Configuration;

public class RateLimitSettings
{
    public const string SectionName = "RateLimitSettings";
    
    public int DefaultLimit { get; set; } = 100;
    public TimeSpan DefaultWindow { get; set; } = TimeSpan.FromMinutes(1);
    public Dictionary<string, EndpointLimit> EndpointLimits { get; set; } = new();
}

public class EndpointLimit
{
    public int Limit { get; set; }
    public TimeSpan Window { get; set; }
}
