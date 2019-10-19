using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor.Entities
{
    public class Buyer
    {
        

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; private set; }


        [Required(ErrorMessage = "You should a provide a name value")]
        [MaxLength(50)]
        public string fullname { get; set; }

        [Required(ErrorMessage = "You should a provide a credit value")]
        public double credit { get; set; }

        public ICollection<Apartment> apartments { get; set; }
        = new List<Apartment>();



    }
}
