using Angular_ASPNETCore_Realtor.Entities;
using Angular_ASPNETCore_Realtor.Models;
using Angular_ASPNETCore_Realtor.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor.Controllers
{

    [Route("api/buyers")]
    public class BuyerController : Controller
    {

        private IRealtorInfoRepository _realtorInfoRepository;


        public BuyerController(IRealtorInfoRepository realtorInfoRepository)
        {
            _realtorInfoRepository = realtorInfoRepository;

        }


        [HttpGet()]
        public ActionResult<IEnumerable<BuyerDto>> GetBuyers()
        {
            var buyerEntities = _realtorInfoRepository.GetBuyers();
            
            var results = Mapper.Map<IEnumerable<BuyerDto>>(buyerEntities);
            return Ok(results);
        

        }

        [HttpGet("{id}", Name = "GetBuyer")]
        public ActionResult GetBuyer(int id)
        {
            // return new JsonResult(CityDataStore.Current.Cities.FirstOrDefault(c=>c.Id == id));
            var buyer = _realtorInfoRepository.GetBuyer(id);

            if (!_realtorInfoRepository.BuyerExists(id))
            {
                return NotFound("This buyer does not exist");
            }

          
            var buyerResult = Mapper.Map<BuyerDto>(buyer);

            return Ok(buyerResult);
            


        }
    

    }
}
