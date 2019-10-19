using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor.Entities
{
    public class RealtorInfoContext : DbContext
    {

        public RealtorInfoContext(DbContextOptions<RealtorInfoContext> options)
           : base(options)
        {
            Database.Migrate();
        }

        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Buyer> Buyers { get; set; }


    }
}
