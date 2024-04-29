import { useState } from 'react';
import { RiSearchLine, RiCloseCircleLine } from 'react-icons/ri';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <>
    <div className="flex items-center border border-gray-300 rounded p-2 mobile">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleChange}
        className="outline-none flex-grow"
      />
      {query && (
        <button onClick={clearSearch} className="ml-2 focus:outline-none">
          <RiCloseCircleLine size={20} />
        </button>
      )}
      <button className="ml-2 focus:outline-none">
        <RiSearchLine size={20} />
      </button>
    </div>

    <div className='flex items-center lg:hidden sm:hidden md:hidden '>
    <button className="ml-2 focus:outline-none">
        <RiSearchLine size={20} />
      </button>
    </div>
    </>

  );
};

export default SearchBar;
