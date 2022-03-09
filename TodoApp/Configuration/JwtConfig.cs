namespace TodoApp.Configuration
{
    public class JwtConfig
    {
        public string Secret { get; set; }
        public string ExpiresIn { get; set; }
    }
}