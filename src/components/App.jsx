import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contact = localStorage.getItem('contact');
    if (contact) {
      this.setState({ contacts: JSON.parse(contact) });
    }
  }

  componentDidUpdate(presProps,prevState) {
    if (prevState.contact !== this.state.contacts) {
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const isDuplicate = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isDuplicate) {
      alert('This contact already exists in the phone book!');
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
    }));
  };

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList
          deleteContact={this.deleteContact}
          contacts={filteredContacts}
        />
      </div>
    );
  }
}

export default App;
