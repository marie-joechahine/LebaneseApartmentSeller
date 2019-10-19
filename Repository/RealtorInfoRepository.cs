using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Angular_ASPNETCore_Realtor.Entities;
using Angular_ASPNETCore_Realtor.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_Realtor.Repository
{
    public class RealtorInfoRepository : IRealtorInfoRepository
    {


        private RealtorInfoContext _context;
        private readonly ILogger _Logger;

    public RealtorInfoRepository(RealtorInfoContext context)
        {
            _context = context;
        }


        public Apartment AddApartment(Apartment apartment)
        {
            apartment.OwnerId = 0;              //OwnerId = 0 means that it hasn't been bought, we ensure it's 0 by default when adding an appartment
            apartment.price = apartment.nbrRooms * 15000;
            _context.Apartments.Add(apartment);

            return apartment;
        }

        public void AddBuyer(Buyer buyer)
        {
            _context.Buyers.Add(buyer);
        }

        public bool ApartExistsWithBuyer(int BuyerId, int ApartId)
        {
            throw new NotImplementedException();
        }

        public bool ApartForSaleExists(int ApartId)
        {
            return _context.Apartments.Where(ap => ap.Id == ApartId).Any(ap => ap.OwnerId == 0);
        }

        public Apartment GetApartment(int ApartId)
        {
            return _context.Apartments.Where(ap => ap.Id == ApartId).FirstOrDefault();
        }

        public bool BuyApartment(Buyer buyer, Apartment apartment)
        {
            
            
                buyer.apartments.Add(apartment);
                apartment.OwnerId = buyer.id; //We set the OwnerId of the apartment to the buyer's to be able
                                              //check later if this apartment has been bought
                buyer.credit -= apartment.price;

                try
                {
                  return (_context.SaveChanges() > 0 ? true : false);
                }
                catch (System.Exception exp)
                {
                  _Logger.LogError($"Error in {nameof(BuyApartment)}: " + exp.Message);
                }
                return false;


    }

        public bool BuyerExists(int BuyerId)
        {
            return _context.Buyers.Any(c => c.id == BuyerId);
        }

    public bool DeleteApartment(Apartment apartment)
    {
      _context.Apartments.Remove(apartment);
      
      try
      {
        return ( _context.SaveChanges() > 0 ? true : false);
      }
      catch (System.Exception exp)
      {
        _Logger.LogError($"Error in {nameof(DeleteApartment)}: " + exp.Message);
      }
      return false;

    }


    
    //  public List<Apartment> GetApartments()
    //{
    //  return _context.Apartments.Where(p => p.OwnerId == 0).OrderByDescending(p => p.price).ToList();

    //}


    public PagingResult<Apartment> GetApartmentsPages(int skip, int take, double priceMin, double priceMax, string filterAddress, int filterNbRooms)
    {

      var filteredApartments = new List<Apartment>();

      if (filterAddress == "defaultAddress")            //" " is the default value for the address given if no filter is implemented
      {
        if (filterNbRooms == 99999)     // 99999 is the default value for the number of rooms given if no filter is implemented
        {
          filteredApartments = _context.Apartments.Where(p => p.OwnerId == 0 && p.price <= priceMax && p.price >= priceMin).OrderByDescending(p => p.price).ToList();

        }
        else
        {
          filteredApartments = _context.Apartments.Where(p => p.OwnerId == 0 && p.nbrRooms == filterNbRooms && p.price <= priceMax && p.price >= priceMin).OrderByDescending(p => p.price).ToList();
        }
      }
      else
      {
        if (filterNbRooms == 99999)
        {
          filteredApartments = _context.Apartments.Where(p => p.OwnerId == 0 && p.address.ToLowerInvariant().Contains(filterAddress.ToLowerInvariant()) && p.price <= priceMax && p.price >= priceMin).OrderByDescending(p => p.price).ToList();

        }
        else
        {
          filteredApartments = _context.Apartments.Where(p => p.OwnerId == 0 && p.address.ToLowerInvariant().Contains(filterAddress.ToLowerInvariant()) && p.nbrRooms == filterNbRooms && p.price <= priceMax && p.price >= priceMin).OrderByDescending(p => p.price).ToList();
        }
      }


      var totalRecords = filteredApartments.Where(p => p.OwnerId == 0).Count();

      var apartments = filteredApartments.Where(p => p.OwnerId == 0)
                                          .OrderByDescending(p => p.price)
                                          .Skip(skip)
                                          .Take(take)
                                          .ToList();

      
      return new PagingResult<Apartment>(apartments, totalRecords);
    }


    public PagingResult<Apartment> GetApartmentsForBuyer(int BuyerId, int skip, int take)
        {

            var totalRecords = _context.Apartments.Count();
            var apartments = _context.Apartments
                           .Where(ap => (ap.OwnerId == BuyerId)).OrderBy(ap => ap.title).OrderByDescending(p => p.price)
                           .Skip(skip)
                           .Take(take)
                           .ToList();

            return new PagingResult<Apartment>(apartments, totalRecords);
    }


    public bool UpdateApartment(Apartment apartment)
    {
      //Will update all properties of the Apartment
      _context.Apartments.Attach(apartment);
      _context.Entry(apartment).State = EntityState.Modified;


      try
      {
        return (_context.SaveChanges() > 0 ? true : false);
      }
      catch (Exception exp)
      {
        _Logger.LogError($"Error in {nameof(UpdateApartment)}: " + exp.Message);
      }
      return false;
    }


    public Buyer GetBuyer(int BuyerId)
        {
            return _context.Buyers.Include(b => b.apartments)
                                  .Where(b => b.id == BuyerId).FirstOrDefault();
        }

        public IEnumerable<Buyer> GetBuyers()
        {
      
                return _context.Buyers.Include(c => c.apartments).OrderBy(c => c.fullname).ToList();
            
        }

        public bool Save()
        {
            return _context.SaveChanges() >= 0;
        }
    }
}
