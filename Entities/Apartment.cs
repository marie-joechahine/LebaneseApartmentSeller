using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor.Entities
{
    public class Apartment
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; private set; }

        [Required(ErrorMessage = "You should a provide a name value")]
        [MaxLength(50)]
        public string title { get; set; }

        [Required(ErrorMessage = "You should a provide the number of rooms")]
        public int nbrRooms { get; set; }

        [Required(ErrorMessage = "You should a provide the apartment's address")]
        [MaxLength(100)]
        public string address { get; set; }

        public double price { get; set; }
        
        public int OwnerId { get; set; }



    }
}
