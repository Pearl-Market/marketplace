import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export const Header = () => {

  return (
    <div className="bg-black text-black flex flex-row justify-center">
      <div className="fixed top-0 right-0">
        <ConnectButton
          accountStatus="address"
          showBalance={false}
        />
      </div>
      <div className="z-10 bg-white fixed top-12 sm:top-0 px-4 py-w border-2 border-solid border-white flex flex-row w-fit space-x-4">
        <Link
          href="/"
        >
          <a className="hover:text-[#f53bc3]">
            Home
          </a>
        </Link>
        <Link
          href="/create"
        >
          <a className="hover:text-[#f53bc3]">
            Create Font
          </a>
        </Link>
        <Link
          href="/mint"
        >
          <a className="hover:text-[#f53bc3]">
            Buy Font
          </a>
        </Link>
        <Link
          href="/gallery"
        >
          <a className="hover:text-[#f53bc3]">
            Gallery
          </a>
        </Link>
      </div>
    </div>
  )

};