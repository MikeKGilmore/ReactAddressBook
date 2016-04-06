using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class AddressBook
    {
        public string Owner { get; set; }
        public List<AddressEntry> Addresses { get; set; }

    }

}