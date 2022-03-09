using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Data;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApiDbContext _databaseContext;

        public PostsController(ApiDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [Route("GetAllPosts")]
        [HttpGet]
        public ActionResult<List<Posts>> GetAllPosts()
        {
            var postList = _databaseContext.Posts.ToList();

            return Ok(postList);

        }

    }

    public class Posts
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
