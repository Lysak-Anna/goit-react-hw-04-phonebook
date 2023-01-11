import './App.css';
import { useCallback, useState } from 'react';
import useLocalStorage from '../src/hooks/localStorageHook';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import { Title } from 'components/Title/Title';
import Wrapper from 'components/Wrapper/Wrapper';
// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// { id: 'id-5', name: 'Alexa Nuland', number: '581-44-12' },
// { id: 'id-6', name: 'Peter Sill', number: '890-01-14' },
// { id: 'id-7', name: 'Liza Shirow', number: '397-55-66' },
// { id: 'id-8', name: 'John Smith', number: '566-09-11' },

function App() {
  const STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useLocalStorage(STORAGE_KEY, []);
  const [filter, setFilter] = useState('');

  function checkName(array, name) {
    return array.some(item => name.toLowerCase() === item.name.toLowerCase());
  }
  function onSubmitHandler(event) {
    event.preventDefault();
    const name = event.currentTarget.elements.name.value;
    const number = event.currentTarget.elements.number.value;
    checkName(contacts, name)
      ? alert(`${name} is already in contacts`)
      : setContacts(prevState => [
          ...prevState,
          { name, number, id: nanoid() },
        ]);

    event.currentTarget.reset();
  }

  function onChangeHandler(event) {
    setFilter(event.target.value);
  }
  const deleteItemHandler = useCallback(
    event => {
      const id = event.currentTarget.id;
      setContacts(prevState => prevState.filter(item => item.id !== id));
    },
    [setContacts]
  );

  return (
    <div className="App">
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={onSubmitHandler} />
        <Title>Contacts</Title>
        <Filter onChange={onChangeHandler} />
        <ContactList
          filter={filter}
          contacts={contacts}
          deleteItemHandler={deleteItemHandler}
        />
      </Wrapper>
    </div>
  );
}

export default App;
