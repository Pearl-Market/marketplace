import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export const Header = () => {

  return (
    <div className="header-font flex flex-row w-full justify-between items-center	 px-10 py-5 width-100 fixed top-0">
      <div>
        <img src="/logo.png" className="logo" />
      </div>
      <div className="px-4 flex flex-row items-center	text-lg space-x-5">
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

      <div className="actions">
        <ConnectButton
          accountStatus="address"
          showBalance={false}
        />
      </div>
    </div>
  )

};