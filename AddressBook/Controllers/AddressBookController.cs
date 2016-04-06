using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace AddressBook.Controllers
{
    public class AddressBookController : ApiController
    {
        Models.AddressBook m_addressBook = new Models.AddressBook
        {
            Owner = "TestOwner",
            Addresses = new List<Models.AddressEntry>()
                {
                    new Models.AddressEntry { _id = 0, Address = "782 Ridge Top Circle, North Salt Lake, UT, 84054", Email = "test@test.com", Name = "TestEntry", Phone = "(801) 555-5555" },
                    new Models.AddressEntry { _id = 1, Address = "Address2", Email = "test2@test2.com", Name = "TestEntry2", Phone = "(801) 666-6666" },
                    new Models.AddressEntry { _id = 2, Address = "Address3", Email = "test3@test3.com", Name = "TestEntry3", Phone = "(801) 777-7777" }
                }
        };

        // GET: api/AddressBook
        public Models.AddressBook Get()
        {
            return m_addressBook;

        }

        // GET: api/AddressBook/5
        public Models.AddressEntry Get(int id)
        {
            return m_addressBook.Addresses.Find(x => x._id == id);

        }

        // POST: api/AddressBook
        public Models.AddressBook Post([FromBody]Models.AddressEntry value)
        {
            if (value == null)
                return m_addressBook;

            //Try to find it in the address book
            for (int i = 0; i < m_addressBook.Addresses.Count; i++)
            {
                if (m_addressBook.Addresses[i]._id == value._id)
                {
                    m_addressBook.Addresses[i] = value;

                    return m_addressBook;

                }
            }

            //Otherwise, add it to the address book
            m_addressBook.Addresses.Add(value);

            return m_addressBook;

        }

        // PUT: api/AddressBook/5
        /*public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/AddressBook/5
        public void Delete(int id)
        {
        }*/

    }

}