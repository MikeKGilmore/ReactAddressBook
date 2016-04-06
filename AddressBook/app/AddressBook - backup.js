(function () {
    'use strict';

    //Test Data
    /*var testData = {
        Owner: "TestDataOwner",
        Addresses: [
            { Name: "TestName", Email: "test@email", Phone: "801-555-5555", Address: "TestAddress" },
            { Name: "TestName2", Email: "test2@email", Phone: "801-666-6666", Address: "TestAddress2" },
            { Name: "TestName3", Email: "test3@email", Phone: "801-777-7777", Address: "TestAddress3" }

        ]

    };*/

    //Component structure

    //-AddressBook
    //  -AddressBookEntryList
    //      -AddressBookEntry

    //AddressBook Component
    var AddressBook = React.createClass({
        getInitialState: function() {
            return {data: { Owner: "Loading...", Addresses: [] }};
        },
        componentDidMount: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)

            });
        },
        handleAddressSubmit: function(newEntry) {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: newEntry,
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        },
        render: function () {
            return (
                <div className="addressBook">
                    <div>
                        <h1>This is an Address Book.</h1>
                        <AddressBookEntryList data={this.state.data} />
                    </div>
                    <div>
                        <br />
                        <div>New AddressBook Entry:</div>
                        <AddressBookInputForm onNewAddressEntry={this.handleAddressSubmit} />
                    </div>
                </div>
            );

        }

    });

    //AddressBookEntryList Component
    var AddressBookEntryList = React.createClass({
        render: function() {
            var addressEntries = this.props.data.Addresses.map(function(addressListEntry) {
                return (
                    <AddressBookEntry Name={addressListEntry.Name} 
                        Email={addressListEntry.Email}
                        Phone={addressListEntry.Phone}
                        Address={addressListEntry.Address} />
                );
                
            });

            return (
                <div className="addressBookEntryList">
                    <h2 className="addressBookOwner">{this.props.data.Owner}</h2>
                    {addressEntries}
                </div>
            );

        }

    });

    //AddressBookEntry Component
    var AddressBookEntry = React.createClass({
        //var editMode, addressForm;
        //getInitialState: function() {
        //    return { editMode: false };
        //},
        render: function() {
            return (
                <div className="addressBookEntry">
                    <div className="header">
                        <h3 className="addressEntryName">{this.props.Name}</h3>
                        <button type="button">Edit</button>
                        <button type="button">Delete</button>
                    </div>
                    <div className="entryBody">
                        <div><label>e-mail: </label>{this.props.Email}</div>
                        <div><label>Phone: </label>{this.props.Phone}</div>
                        <div><label>Address: </label>{this.props.Address}</div>
                    </div>
                </div>
                
            );

        }

    });

    //AddressBookInputForm Component
    var AddressBookInputForm = React.createClass({
        getInitialState: function() {
            return { name: '', eMail: '', phone: '', address: '' };
        },
        handleNameChange: function(e) {
            this.setState({ name: e.target.value });
        },
        handleEMailChange: function(e) {
            this.setState({ eMail: e.target.value });
        },
        handlePhoneChange: function(e) {
            this.setState({ phone: e.target.value });
        },
        handleAddressChange: function(e) {
            this.setState({ address: e.target.value });
        },
        handleSubmit: function(e) {
            e.preventDefault();
            var name = this.state.name.trim();
            var eMail = this.state.eMail.trim();
            var phone = this.state.phone.trim();
            var address = this.state.address.trim();
            
            //Validation here
            if (!name || !address)
                return;

            //Submit the new address entry
            this.props.onNewAddressEntry({ Name: name, Email: eMail, Phone: phone, Address: address })
            this.setState({ name: '', eMail: '', phone: '', address: '' });

        },
        render: function() {
            return (
                <form className="addressInputForm" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Name" 
                        value={this.state.name} onChange={this.handleNameChange} /><br />
                    <input type="text" placeholder="e-mail" 
                        value={this.state.eMail} onChange={this.handleEMailChange} /><br />
                    <input type="text" placeholder="Phone"
                        value={this.state.phone} onChange={this.handlePhoneChange} /><br />
                    <input type="text" placeholder="Address" 
                        value={this.state.address} onChange={this.handleAddressChange} /><br />
                    <input type="submit" value="Post" />
                </form>
            );

        }

    });


    ReactDOM.render(
//Using Test Data        <AddressBook data={testData} />,
        <AddressBook url="http://localhost:1428/api/sessions/AddressBook" />,
        document.getElementById('content')
    );

})();