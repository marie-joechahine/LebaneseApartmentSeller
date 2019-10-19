using Angular_ASPNETCore_Realtor.Entities;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Angular_ASPNETCore_Realtor.Models
{
    public class ApiResponse
    {
        public bool Status { get; set; }
    public Apartment Apartment { get; set; }
    public ModelStateDictionary ModelState { get; set; }
    }
}
