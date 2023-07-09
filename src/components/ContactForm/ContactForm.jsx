import PropTypes from 'prop-types';
import React from 'react';

function ContactForm({ addContact }) {
  const [state, setState] = React.useState({
      name: '',
      number: '',
  });
  const { name, number } = state;

  const handleChange = event => {
    setState({
      stats: {
        ...state,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addContact(name, number);
    setState({
      stats: {
        name: '',
        number: '',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Number:
        <input
          type="text"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

export default ContactForm;
