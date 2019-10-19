using Angular_ASPNETCore_Realtor.Entities;
using Angular_ASPNETCore_Realtor.Models;
using System;
using System.Collections.Generic;


namespace Angular_ASPNETCore_Realtor.Repository
{
    public interface IRealtorInfoRepository
    {

        bool BuyerExists(int BuyerId);                              //Checks if the buyer with the ID given exists

        bool ApartForSaleExists(int ApartId);                       //Checks if the apartment with the ID given exists and hasn't been bought
        bool ApartExistsWithBuyer(int BuyerId, int ApartId);        

        IEnumerable<Buyer> GetBuyers();
        Buyer GetBuyer(int BuyerId);

        //List<Apartment> GetApartments();
        PagingResult<Apartment> GetApartmentsPages(int skip, int take, double priceMin, double priceMax, string filterAddress, int filterNbRooms);


        PagingResult<Apartment> GetApartmentsForBuyer(int BuyerId, int skip, int take);
        Apartment GetApartment(int ApartId);

        Apartment AddApartment(Apartment apartment);
        void AddBuyer(Buyer buyer);
        bool DeleteApartment(Apartment apartment);
 
        bool BuyApartment(Buyer buyer, Apartment apartment);


        bool UpdateApartment(Apartment apartment);
        bool Save();


    }
}
