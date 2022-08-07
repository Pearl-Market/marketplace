import type { NextPage } from 'next'
import Link from 'next/link'
import NFTCard from '../components/NFTCard'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col h-screen min-h-screen px-16'>
      <div className='flex flex-col py-10'>
        <img src="/logo.png" className='home-logo' />
        <h6>CREATE, SELL, DISCOVER AND BUY TYPEFACES</h6>
      </div>

      <main className="flex flex-col">
        <div className="app-features flex flex-row justify-end mt-20 mb-12">
          <Link href="/create">
            <a className='flex flex-col users-box px-5'>
              <div className="icon"></div>
              <h4 className="title uppercase font-bold mb-3">Type designer</h4>
              <p className="description mb-3">
                Sell your font licence
              </p>
              <p className="description mb-3">
                Get royalties from the font sales and secondary design/templates sales
              </p>
              <p className="description mb-3">
                Keep ownership of your work
              </p>
            </a>
          </Link>
          <Link href="/gallery">
            <a className='flex flex-col users-box px-5'>
              <div className="icon"></div>
              <h4 className="title uppercase font-bold mb-3">Graphic designer</h4>
              <p className="description mb-3">
                Find fonts
              </p>
              <p className="description mb-3">
                Design and sell designs/templates
              </p>
              <p className="description mb-3">
                Get revenue from design sales
              </p>
            </a>
          </Link>
        </div>

        <div className="explore-typefaces flex flex-col mb-10">
          <h4 className="title uppercase font-bold mb-3">Explore typefaces</h4>

          <div className="cards-row flex flex-row flex-wrap gap-x-5">
            <NFTCard imageUrl="/specimen.png" name="Font Name" price="0.2" author="Type designer" tokenId={1} />
          </div>
        </div>

        <div className="explore-designs flex flex-col my-10">
          <h4 className="title uppercase font-bold mb-3">Explore designs</h4>

          <div className="cards-row flex flex-row flex-wrap gap-x-5">
            <NFTCard imageUrl="/specimen.png" name="Font Name" price="0.2" author="Type designer" tokenId={1} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
