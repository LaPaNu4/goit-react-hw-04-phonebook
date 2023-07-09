import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

function App() {
  const [contacts, setContacts] = React.useState(() => JSON.parse(localStorage.getItem('contact'))??[]);
  const [filter, setFilter] = React.useState('');


React.useEffect(() => {
 
    localStorage.setItem('contact', JSON.stringify(contacts));
  
}, [ contacts]);

  function addContact(name, number) {
    const isDuplicate = contacts.some(
      contact =>
        contact.name && contact.name.toLowerCase() === name.toLowerCase()
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

    setContacts(prevContacts => [...prevContacts, newContact]);
  }
  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(
      contact =>
        contact.name &&
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList
        deleteContact={deleteContact}
        contacts={getFilteredContacts()}
      />
    </div>
  );
}

export default App;
