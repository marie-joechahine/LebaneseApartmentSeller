using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor.Models
{
    public class ApartmentForUpdateDto
    {

        [Required(ErrorMessage = "You should a provide a name value")]
        [MaxLength(50)]
        public string title { get; set; }

        [Required(ErrorMessage = "You should a provide the number of rooms")]
        public int nbrRooms { get; set; }

        [Required(ErrorMessage = "You should a provide the apartment's address")]
        [MaxLength(100)]
        public string address { get; set; }

        public double price { get; set; }

    }
}
