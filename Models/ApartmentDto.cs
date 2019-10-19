using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor.Models
{
    public class ApartmentDto
    {

        public int nbrRooms { get; set; }

        public int Id { get; private set; }    
        public double price { get; set; }
        public string title;
        public string address;


        //public ApartmentDto()
        //{
            
        //    price = nbrRooms * 15000;
        //}


    }
}
