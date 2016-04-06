using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class AddressEntry
    {
        public int _id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

    }

}