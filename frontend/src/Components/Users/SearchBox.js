import React, {useState, useRef} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './styles.css'
export default function SearchBox({addQuerry}) {
  const [inputValue, setInputValue] = useState(new URLSearchParams(document.location.search).get('filter_text'))


  const search = () => {
    addQuerry('filter_text', inputValue)
  }

  return (
    <div className="searchBox">
      <input
        onKeyDown={(e) => e.key === 'Enter' ? search() : null }
        value={inputValue ? inputValue : ''}
        type="text"
        placeholder="Search.."
        name="search"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <SearchIcon onClick={() => search()} />
    </div>
  )
}
