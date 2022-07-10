import React, {useState} from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function FilterField({fieldName, addQuerry}) {
  const [selectedArrow, setSelectedArrow] = useState(new URLSearchParams(document.location.search).get(fieldName.toLowerCase().replace(" ", "_")))

  const clickOnArrow = (fieldName, value) => {
    setSelectedArrow(prevValue => {
      if (prevValue === value) return null
      return value
    })
    addQuerry(fieldName, value)
  }

  return (
    <div className='userField'>
        {fieldName}
        <div className='arrowUpDown'>
        <KeyboardArrowUpIcon 
          className='arrow'
          style={selectedArrow === 'asc' ? {color:'blue'} : null} 
          onClick={()=> clickOnArrow(fieldName.toLowerCase().replace(" ", "_"), 'asc')}
        />
        <KeyboardArrowDownIcon 
          className='arrow'
          style={selectedArrow === 'desc' ? {color:'blue'} : null} 
          onClick={()=> clickOnArrow(fieldName.toLowerCase().replace(" ", "_"), 'desc')}
        />
        </div>
    </div>
  )
}
