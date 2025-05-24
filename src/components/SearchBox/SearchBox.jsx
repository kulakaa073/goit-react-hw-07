import css from './SearchBox.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from '../../redux/filtersSlice';
import { useDebounce } from 'use-debounce';
import { useState, useEffect } from 'react';

export default function SearchBox() {
  const nameFilter = useSelector(state => state.filters.name);
  const dispatch = useDispatch();

  const [newName, setNewName] = useState(nameFilter || '');
  const [debouncedName] = useDebounce(newName, 250);

  useEffect(() => {
    setNewName(nameFilter || '');
  }, [nameFilter]);

  const handleChange = event => {
    //const newName = event.target.value;
    //dispatch(changeFilter(newName));
    setNewName(event.target.value);
  };

  useEffect(() => {
    dispatch(changeFilter(debouncedName));
  }, [debouncedName, dispatch]);

  return (
    <div className={css.container}>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={newName}
        onChange={handleChange}
        className={css.field}
      />
    </div>
  );
}
