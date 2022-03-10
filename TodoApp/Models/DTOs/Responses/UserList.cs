using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models.DTOs.Responses
{
    public class UserList
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Roles { get; set; }
    }

    public class Roles
    {
        public string RoleId { get; set; }
        public string RoleName { get; set; }
        public bool IsChecked { get; set; }
    }

    public class DeleteResponse
    {
        public string Message { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class SendEmailResponse
    {
        public string Message { get; set; }
        public bool IsSend { get; set; }
    }

    public class ChangePasswordRequest
    {
        public string Email { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class ChangePasswordResponse
    {
        public string Message { get; set; }
        public bool IsChanges { get; set; }
    }
}
