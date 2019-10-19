using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular_ASPNETCore_Realtor.Entities;
using Angular_ASPNETCore_Realtor.Models;
using Angular_ASPNETCore_Realtor.Repository;
using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_Realtor.Controllers
{
  [Route("api/apartments")]
  public class ApartmentController : Controller
  {

    private IRealtorInfoRepository _realtorInfoRepository;

    ILogger _Logger;

    public ApartmentController(IRealtorInfoRepository reatlorInfoRepository, ILoggerFactory loggerFactory)
    {
      _realtorInfoRepository = reatlorInfoRepository;

      _Logger = loggerFactory.CreateLogger(nameof(ApartmentController));
    }



    //[HttpGet]
    //public ActionResult<IEnumerable<Apartment>> GetAllApartments(double priceMin = 0, double priceMax = 999999999999, string filterAddress = "", int filterNbRooms = 99999)
    //{

    //  var AllApartments = _realtorInfoRepository.GetApartments();

    //  var AllApartmentsResults = Mapper.Map<IEnumerable<ApartmentDto>>(AllApartments);

    //  return Ok(AllApartmentsResults);
    //}


    [HttpGet("page/{skip}/{take}/{priceMin}/{priceMax}/{filterAddress}/{filterNbRooms}")]
    public ActionResult GetApartmentsPage(int skip, int take, double priceMin = 0, double priceMax = 999999999999, string filterAddress = "", int filterNbRooms = 99999)
        {


      try
      {
        var pagingResult = _realtorInfoRepository.GetApartmentsPages(skip, take, priceMin, priceMax, filterAddress, filterNbRooms);

        Response.Headers.Add("X-InlineCount", pagingResult.TotalRecords.ToString());
        return Ok(pagingResult.Records);
      }
      catch (Exception exp)
      {
        _Logger.LogError(exp.Message);
        return BadRequest(new ApiResponse { Status = false });
      }
  }

    [HttpGet("{id}", Name = "GetApartmentRoute")]
    public ActionResult GetApartment(int id)
    {

      try
      {
        var apartment = _realtorInfoRepository.GetApartment(id);
        return Ok(apartment);
      }
      catch (Exception exp)
      {
        _Logger.LogError(exp.Message);
        return BadRequest(new ApiResponse { Status = false });
      }
    }


    // Buying an apartment
    [HttpGet("{BuyerId}/apartments/{ApartId}")]
        public ActionResult BuyApartment(int BuyerId, int ApartId)
        {
      bool status = false;
      try
      {
        var apartment = _realtorInfoRepository.GetApartment(ApartId);
        var buyer = _realtorInfoRepository.GetBuyer(BuyerId);
        
        if (apartment.price <= buyer.credit)
        {

          status = _realtorInfoRepository.BuyApartment(buyer, apartment);

          if (!status)
          {
            return BadRequest(status = false );
          }

          return Ok( status = true );

        }
        //return Ok("Purchase failure: Not enough credit. Better save up!");
        _Logger.LogError("Purchase failure: Not enough credit. Better save up!");
        return Ok( status = false );
      }

      catch (Exception exp)
      {
        _Logger.LogError(exp.Message);
        return BadRequest(status = false );
      }

    }


    [HttpPost]
    public ActionResult CreateApartment(
        [FromBody] Apartment newApartment)
    {

      if (!ModelState.IsValid)
      {
        return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
      }

      try
      {
        var newAp = _realtorInfoRepository.AddApartment(newApartment);
        if (newApartment == null)
        {
          return BadRequest(new ApiResponse { Status = false });
        }

        if (!_realtorInfoRepository.Save())
        {
          return StatusCode(500, "A problem happened while handling your request.");
        }
        return CreatedAtRoute("GetApartmentRoute", new { id = newAp.Id },
                new ApiResponse { Status = true, Apartment = newAp });
      }
      catch (Exception exp)
      {
        _Logger.LogError(exp.Message);
        return BadRequest(new ApiResponse { Status = false });
      }
    }


    [HttpPut("{id}")]
    public ActionResult UpdateApartment(int id, [FromBody]Apartment apartment)
    {

      
      if (!ModelState.IsValid || apartment == null)
      {
        return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
      }

      try
      {
        ApartmentForUpdateDto apartmentToUpdate;
        apartmentToUpdate = Mapper.Map<Models.ApartmentForUpdateDto>(apartment);

        var apartmentEntity = _realtorInfoRepository.GetApartment(id);

        Mapper.Map(apartmentToUpdate, apartmentEntity);


        if (!_realtorInfoRepository.Save())
        {
          return StatusCode(500, "A problem happened while handling your request.");
        }


        //var status = _realtorInfoRepository.UpdateApartment(apartment);
        //if (!status)
        //{
        //  return BadRequest(new ApiResponse { Status = false });
        //}
        return Ok(new ApiResponse { Status = true, Apartment = apartment });
      }
      catch (Exception exp)
      {
        _Logger.LogError(exp.Message);
        return BadRequest(new ApiResponse { Status = false });
      }
    }




    // DELETE an apartment
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
      try
      {
        
        var apartmentEntity = _realtorInfoRepository.GetApartment(id);

        var status = _realtorInfoRepository.DeleteApartment(apartmentEntity);

        if (!status)
        {
          return BadRequest(new ApiResponse { Status = false });
        }
        return Ok(new ApiResponse { Status = true });
      }

      catch (Exception exp)
      {
        _Logger.LogError(exp.Message);
        return BadRequest(new ApiResponse { Status = false });
      }
    }
    }
}
