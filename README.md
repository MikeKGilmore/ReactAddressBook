# ReactAddressBook

This project demonstrates the following:

ASP.NET Web API 2
	- Created a restful endpoint for the application (see /Controllers/AddressBookController.cs)
	- For the route, see /App_Start/RouteConfig.cs
	
	I had enabled Session State for the AddressBook Controller route but didn't have time to fully use it.
	Static data is used instead (defined in the controller).

ReactJS
	- Demonstrates modular, component-based design
	- Uses component state to switch between view & edit modes
	- Consumes the AddressBookController REST interface
	- Data is updated via REST
	- Bootstrap.css is used for limited styling

This Assignment was a crash course on ReactJS.  The bulk of the time spent (>85%) was spent learning the
React paradigm.  Unfortunately that means there were some items on the assignment that I was not able to
complete (AngularJS poisoned my mind!).