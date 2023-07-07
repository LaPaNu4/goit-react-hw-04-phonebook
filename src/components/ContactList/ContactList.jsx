import React from 'react';
import PropTypes from 'prop-types';

const ContactList = ({ contacts, deleteContact }) => {
  const handleDeleteContact = id => {
    deleteContact(id);
  };



  
  return (
    <ul>
      {contacts.map(contact => (
        <li key={contact.id}>
          {contact.name}: {contact.number}
          <button
            type="button"
            onClick={() => handleDeleteContact(contact.id)}
            style={{ marginLeft: '10px' }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
