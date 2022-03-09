using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using TodoApp.Models.DTOs.Responses;

namespace TodoApp.Models.DTOs.Requests
{
    public class UserRegistrationDto
    {
        public string Id { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public string[] roles { get; set; }
        public List<Roles> RoleList { get; set; }

    }

    public class UpdateUserDTO
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<EditedRoles> RoleList { get; set; }

    }
    public class EditedRoles
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public bool IsChecked { get; set; }
    }
}