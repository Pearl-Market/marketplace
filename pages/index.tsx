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
          
            <a className='flex flex-col users-box px-5'>
              <div className="icon"></div>
              <h4 className="title uppercase underline font-bold mb-3">
                <Link href="/create">Type designer</Link>
              </h4>
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
          
          
            <a className='flex flex-col users-box px-5'>
              <div className="icon"></div>
              <h4 className="title uppercase font-bold underline mb-3">
                <Link href="/gallery">Graphic designer</Link>
              </h4>
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
          
        </div>

        <div className="explore-typefaces flex flex-col mb-10">
          <h4 className="title uppercase font-bold mb-3">Explore typefaces</h4>

          <div className="cards-row flex flex-row flex-wrap gap-x-5">
            <NFTCard collectionAddress='' imageUrl="/1.png" name="Trickster" price="0.2" author="Jean-Baptiste Morizot" tokenId={1} />
            <NFTCard collectionAddress='' imageUrl="/2.png" name="Outward" price="0.2" author="Jeremy Landes" tokenId={1} />
            <NFTCard collectionAddress='' imageUrl="/3.png" name="Millimetre" price="0.2" author="Jeremy Landes" tokenId={1} />
            <NFTCard collectionAddress='' imageUrl="/4.png" name="Ouroboros" price="0.2" author="Jean-Baptiste Morizot" tokenId={1} />
          </div>
        </div>

        <div className="explore-designs flex flex-col my-10">
          <h4 className="title uppercase font-bold mb-3">Explore designs</h4>

          <div className="cards-row flex flex-row flex-wrap gap-x-5">
            <NFTCard collectionAddress='' imageUrl="/5.png" name="Bentlyout" price="0.2" author="Darius X" tokenId={1} />
            <NFTCard collectionAddress='' imageUrl="/6.png" name="Azora" price="0.2" author="Maxi Lopez" tokenId={1} />
            <NFTCard collectionAddress='' imageUrl="/7.png" name="Mexes" price="0.2" author="Maxi Lopez" tokenId={1} />
            <NFTCard collectionAddress='' imageUrl="/8.png" name="Livera" price="0.2" author="Francesa Muiz" tokenId={1} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
