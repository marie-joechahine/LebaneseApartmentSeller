using Angular_ASPNETCore_Realtor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor
{
    public static class RealtorInfoContextExtensions
    {


        public static void EnsureSeedDataForContext(this RealtorInfoContext context)
        {
            if (context.Apartments.Any() || context.Buyers.Any())
            {
                return;
            }

            // init seed data
            var apartments = new List<Apartment>() 
            {
              new Apartment() {
                 title = "Dornish Mansion",
                 address = "Saida, Lebanon",
                 nbrRooms = 5
            },
            new Apartment() {
                title = "The Red Keep",
                address = "Baabda, Lebanon",
                nbrRooms = 8 },

            new Apartment() {
                title = "Casterly Rock",
                address = "Beirut, Lebanon",
                nbrRooms = 7 },

            new Apartment() {
                 title = "Dragonstone",
                 address = "Zahle, Lebanon",
                 nbrRooms = 6 },

            new Apartment() {
                title = "Winterfell's Castle",
                address = "Jbeil, Lebanon",
                nbrRooms = 5 },

            new Apartment() {
                title = "Castle Black",
                address = "Batroun, Lebanon",
                nbrRooms = 2 },

            new Apartment() {
                 title = "Wildling's Hut",
                 address = "Tripoli, Lebanon",
                 nbrRooms = 1
            }

        };

            foreach (Apartment ap in apartments)
            {
                ap.price = ap.nbrRooms * 15000;
            }

            context.Apartments.AddRange(apartments);

            var buyers = new List<Buyer>()
            {
                new Buyer()
                {
                    fullname = "Some poor guy",
                    credit = 1000
                },

                new Buyer() {
                    fullname = "Jon Snow",
                    credit   = 20000
                },

                new Buyer() {
                    fullname = "Ellaria Sand",
                    credit   = 40000,
                },
                new Buyer()
                {
                    fullname = "Daenerys Targaryen",
                    credit = 60000
                },

                new Buyer() {
                    fullname = "Olenna Tyrell",
                    credit   = 100000
                },

                new Buyer() {
                    fullname = "Tywin Lannister",
                    credit   = 400000,
                }

        };

            context.Buyers.AddRange(buyers);

            context.SaveChanges();
        }


    }
}
