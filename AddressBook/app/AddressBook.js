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

    //-Index
    //  -AddressBookEntryList
    //      -AddressBookEntry

    //Index Component
    var AddressBook = React.createClass({
        getInitialState: function() {
            return { data: { Owner: "", Addresses: [] }, loaded: false };
        },
        componentDidMount: function() {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                cache: false,
                success: function(data) {
                    this.setState({data: data, loaded: true });
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)

            });
        },
        render: function() {
            if (!this.state.loaded) {
                return <div><h1>Loading...</h1></div>
            }
            
            return (
                <div>
                    <h1>Address Book</h1>
                    <AddressBookList data={this.state.data} url="http://localhost:1428/api/sessions/AddressBook" />
                </div>
            );
        }
    });

    //AddressBookList Component
    var AddressBookList = React.createClass({
        getInitialState: function() {
            return { editing: null };
        },
        toggleEditing: function(itemId) {
            console.log("Toggled editing for item " + itemId);
            this.setState({ editing: itemId });
        },
        handleEditField(event) {
            //Enter Button
            if (event.keyCode === 13) {
                console.log("handling edit field");
                console.log(event.target);
                var target = event.target;
                var update = {};

                update._id = this.state.editing;
                update[target.name] = target.value;

                this.handleEntryUpdate(update);

            }
        },
        handleEditItem() {
            var itemId = this.state.editing;

            console.log("ref: " + this.refs[`Name_${itemId}`].value)
            this.handleEntryUpdate({
                _id: itemId,
                Name: this.refs[`Name_${itemId}`].value,
                Email: this.refs[`Email_${itemId}`].value,
                Phone: this.refs[`Phone_${itemId}`].value,
                Address: this.refs[`Address_${itemId}`].value
            });

        },
        handleEntryUpdate: function(update) {
            console.log("Handling update: ");
            console.log(update);

            $.ajax({
                url: this.props.url,
                dataType: 'json',
                type: 'POST',
                data: update,
                success: function(data) {
                    //TODO - update
                    this.setState({editing: null});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });

        },
        render: function() {
            var addressEntries = this.props.data.Addresses.map(function(addressListEntry){
                if (this.state.editing === addressListEntry._id) {
                    return (
                        <div key={addressListEntry._id}
                             className="list-group-item">
                            <div><label>(Hidden) _id: </label>{addressListEntry._id}</div>
                            <div><input type="text" placeholder="Name" defaultValue={addressListEntry.Name} onKeyDown={this.handleEditField} ref={`Name_${addressListEntry._id}`} /></div>
                            <div><input type="text" placeholder="Email" defaultValue={addressListEntry.Email} onKeyDown={this.handleEditField} ref={`Email_${addressListEntry._id}`} /></div>
                            <div><input type="text" placeholder="Phone" defaultValue={addressListEntry.Phone} onKeyDown={this.handleEditField} ref={`Phone_${addressListEntry._id}`} /></div>
                            <div><input type="text" placeholder="Address" defaultValue={addressListEntry.Address} onKeyDown={this.handleEditField} ref={`Address_${addressListEntry._id}`} /></div>
                            <button className="btn btn-primary" onClick={this.handleEditItem}>Update Item</button>
                        </div>
                        );
                } else {
                    return (
                        <li onClick={this.toggleEditing.bind(null, addressListEntry._id)}
                            key={addressListEntry._id}
                            className="list-group-item">
                           <div>
                               <div className="header">
                                   <h3>{addressListEntry.Name}</h3>
                               </div>
                               <div className="body">
                                   <div><label>(Hidden) _id: </label>{addressListEntry._id}</div>
                                   <div><label>e-mail: </label>{addressListEntry.Email}</div>
                                   <div><label>Phone: </label>{addressListEntry.Phone}</div>
                                   <div><label>Address: </label>{addressListEntry.Address}</div>
                               </div>
                           </div>
                        </li>
                    );
                }

            }, this);
            
            return (
                <ul className="addressBookEntryList">
                    <h2 className="addressBookOwner">{this.props.data.Owner}'s Address Book</h2>
                    {addressEntries}
                </ul>
                );
 
        }
    });

    ReactDOM.render(
//Using Test Data        <AddressBook data={testData} />,
        <AddressBook url="http://localhost:1428/api/sessions/AddressBook" />,
        document.getElementById('content')
    );

})();