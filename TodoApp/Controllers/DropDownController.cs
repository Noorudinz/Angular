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
    public class DropDownController : ControllerBase
    {
        private readonly ApiDbContext _databaseContext;

        public DropDownController(ApiDbContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        [Route("GetAllCountry")]
        [HttpGet]
        public ActionResult<List<Country>> GetAllCountry()
        {
            var countryList = _databaseContext.Country.ToList();

            return Ok(countryList);

        }

        [Route("GetAllState")]
        [HttpGet]
        public ActionResult<List<State>> GetAllState()
        {
            var stateList = _databaseContext.State.ToList();

            return Ok(stateList);

        }

        [Route("GetAllCity")]
        [HttpGet]
        public ActionResult<List<City>> GetAllCity()
        {
            var cityList = _databaseContext.City.ToList();
            var stateList = _databaseContext.State.ToList();
            var countryList = _databaseContext.Country.ToList();

            var result = from city in cityList
                         join state in stateList on city.StateId equals state.Id
                         join country in countryList on state.CountryId equals country.Id
                         select new
                         {
                             Id = city.Id,
                             StateId = state.Id,
                             CountryId = country.Id,
                             CityName = city.CityName
                         };

            return Ok(result);

        }

        [Route("GetStateById/{countryId}")]
        [HttpGet]
        public ActionResult<List<Country>> GetStateById(int countryId)
        {
            var stateList = _databaseContext.State.Where(a => a.CountryId == countryId)
                                            .Select(a => new { a.Id, a.StateName });

            return Ok(stateList);

        }

        [Route("GetCityById/{stateId}")]
        [HttpGet]
        public ActionResult<List<Country>> GetCityById(int stateId)
        {
            var stateList = _databaseContext.City.Where(a => a.StateId == stateId)
                                            .Select(a => new { a.Id, a.CityName });

            return Ok(stateList);

        }

        [Route("AddCountry")]
        [HttpPost]
        public ActionResult<CommonMessage> AddCountry(Country country)
        {
            if(country != null)
            {
                var addCountry = new Country();
                addCountry.CountryName = country.CountryName;

                _databaseContext.Country.Add(addCountry);
                _databaseContext.SaveChanges();              

            }

            return Ok(new CommonMessage
            {
                Message = "Country '"+ country.CountryName +"' Added Successfully!!!",
                IsAddedOrUpdate = true
            });

        }

        [Route("AddState")]
        [HttpPost]
        public ActionResult<CommonMessage> AddState(State state)
        {
            if (state != null)
            {
                var addState = new State();
                addState.StateName = state.StateName;
                addState.CountryId = state.CountryId;

                _databaseContext.State.Add(addState);
                _databaseContext.SaveChanges();

            }

            return Ok(new CommonMessage
            {
                Message = "State '" + state.StateName + "' Added Successfully!!!",
                IsAddedOrUpdate = true
            });

        }

        [Route("AddCity")]
        [HttpPost]
        public ActionResult<CommonMessage> AddCity(City city)
        {
            if (city != null)
            {
                var addCity = new City();
                addCity.StateId = city.StateId;
                addCity.CityName = city.CityName;
         
                _databaseContext.City.Add(addCity);
                _databaseContext.SaveChanges();

            }

            return Ok(new CommonMessage
            {
                Message = "State '" + city.CityName + "' Added Successfully!!!",
                IsAddedOrUpdate = true
            });

        }
    }

    public class CommonMessage
    {
        public string Message { get; set; }
        public bool IsAddedOrUpdate { get; set; }
    }

    public class Country
    {
        public int Id { get; set; }
        public string CountryName { get; set; }
    }

    public class State
    {
        public int Id { get; set; }
        public string StateName { get; set; }
        public Country Country { get; set; }
        public int CountryId { get; set; }
    }

    public class City
    {
        public int Id { get; set; }
        public int StateId { get; set; }
       // public int CountryId { get; set; }
        public string CityName { get; set; }
        //public State State { get; set; }
        //public Country Country { get; set; }
    }


}
