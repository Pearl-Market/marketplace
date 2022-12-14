import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export const Header = () => {

  return (
    <div className="flex flex-row justify-between items-center w-full bg-white header-font px-10 py-5 fixed top-0 shadow">
      <div className="w-full">
        <img src="/logo.png" className="logo" />
      </div>
      <div className="flex flex-row items-center w-full	text-md space-x-5">
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
          href="/lit"
        >
          <a className="hover:text-[#f53bc3]">
            Download Fonts
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

      <div className="flex flex-row justify-end actions w-full">
        <ConnectButton
          accountStatus="address"
          showBalance={false}
        />
      </div>
    </div>
  )

};