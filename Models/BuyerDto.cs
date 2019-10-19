using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor.Models
{
    public class BuyerDto
    {

        public int Id { get; private set; }
        public string fullname { get; set; }
        public double credit { get; set; }

        public int NumberOfApartments
        {
            get
            {
                return apartments.Count;
            }
        }



        public ICollection<ApartmentDto> apartments { get; set; }
        = new List<ApartmentDto>();



    }
}
