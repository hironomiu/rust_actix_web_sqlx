import React from 'react'

const Header = () => {
  return (
    <header className="flex h-16 justify-between items-center">
      <div className="text-3xl ml-4">Header</div>
      <nav>
        <ul className="flex mr-4">
          <li className="mx-2 text-2xl">hoge</li>
          <li className="mx-2 text-2xl">fuga</li>
          <li className="mx-2 text-2xl">piyo</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
