using System.Collections.Generic;

namespace TodoApp.Configuration
{
    public class AuthResult
    {
        public string IdToken { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string RefreshToken { get; set; }
        public string ExpiresIn { get; set; }
        public string LocalId { get; set; }
        public bool IsRegistered { get; set; }
        public List<string> Errors { get; set; }
        public List<string> RolesName { get; set; }
    }

    public  class TokenResponse
    {
        public string IdToken { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string RefreshToken { get; set; }
        public string ExpiresIn { get; set; }
        public string LocalId { get; set; }
        public bool registered { get; set; }
    }
}