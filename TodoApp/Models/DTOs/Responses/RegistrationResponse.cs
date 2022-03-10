using TodoApp.Configuration;

namespace TodoApp.Models.DTOs.Responses
{
    public class RegistrationResponse: AuthResult
    {
        public string Message { get; set; }
        public bool IsCreated { get; set; }

    }
}