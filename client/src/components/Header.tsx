import { useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isSignInAtom } from '../recoil'
import { useMutation } from '@tanstack/react-query'
import { fetchSignoutPost } from '../queries'
const Header = () => {
  const signOutMutation = useMutation((bool: boolean) => fetchSignoutPost())
  const isSignIn = useRecoilValue(isSignInAtom)
  const setIsSignIn = useSetRecoilState(isSignInAtom)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleClickOpen = () => {
    setIsMenuOpen(true)
  }
  const handleClickClose = () => {
    setIsMenuOpen(false)
  }

  const handleClickSignOut = () => {
    // TODO: mutateの引数（不要なので指定しない方法を探す）
    signOutMutation.mutate(false, {
      onSuccess: async (res: any) => {
        const json = await res.json()
        if (json.isSuccess) setIsSignIn(false)
      },
    })
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
          <li className="mx-2 text-2xl">
            <button onClick={handleClickSignOut}>SignOut</button>
          </li>
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
            ? 'md:hidden fixed top-0 left-0 h-full w-[60%] bg-white ease-in-out duration-500 pl-4'
            : 'fixed left-[-150px] top-0 h-full ease-in-out duration-1000'
        }
      >
        <h1>Side Menu</h1>
        <ul className="flex flex-col">
          <li className="">hoge</li>
          <li className="">fuga</li>
          <li className="">piyo</li>
          <li className="" onClick={() => setIsMenuOpen(false)}>
            <button onClick={handleClickSignOut}>SignOut</button>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
