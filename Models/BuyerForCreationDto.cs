using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Angular_ASPNETCore_Realtor.Models
{
    public class BuyerForCreationDto

    {

        [Required(ErrorMessage = "You should a provide a name value")]
        [MaxLength(50)]
        public string fullname { get; set; }

        [Required(ErrorMessage = "You should a provide a credit value")]
        public double credit { get; set; }



    }
}
