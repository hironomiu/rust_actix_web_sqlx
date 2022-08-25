import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useRecoilValue } from 'recoil'
import { isSignInAtom } from '../recoil'

const Header = () => {
  const isSignIn = useRecoilValue(isSignInAtom)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const handleClickOpen = () => {
    setIsMenuOpen(true)
  }
  const handleClickClose = () => {
    setIsMenuOpen(false)
  }

  if (!isSignIn)
    return (
      <header className="flex h-16 justify-between items-center">
        <div className="text-3xl ml-4">Header</div>
      </header>
    )

  return (
    <header className="flex h-16 justify-between items-center">
      <div className="text-3xl ml-4">Header</div>
      <nav>
        <ul className="md:flex mr-4 hidden">
          <li className="mx-2 text-2xl">hoge</li>
          <li className="mx-2 text-2xl">fuga</li>
          <li className="mx-2 text-2xl">piyo</li>
        </ul>
      </nav>
      <div className="md:hidden mr-4">
        {isMenuOpen ? (
          <AiOutlineClose onClick={handleClickClose} />
        ) : (
          <AiOutlineMenu onClick={handleClickOpen} />
        )}
      </div>
      <div
        className={
          isMenuOpen
            ? 'fixed top-0 left-0 h-full w-[60%] ease-in-out duration-1000 bg-white'
            : 'hidden'
        }
      >
        <ul className="flex flex-col mr-4">
          <li className="mx-2 text-2xl">hoge</li>
          <li className="mx-2 text-2xl">fuga</li>
          <li className="mx-2 text-2xl">piyo</li>
        </ul>
      </div>
    </header>
  )
}

export default Header
