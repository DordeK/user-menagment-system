import React from 'react'
import './style.css'

export default function Layout({children}) {
  return (
    <div className="layoutBox">
      <div className="layoutCenterBox">
      {children}
      </div>
    </div>
  )
}
