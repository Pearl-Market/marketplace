import Link from "next/link"
import NFTCard from "./NFTCard"

const NFTList = ({ nfts }) => {

  return (
    <div className="flex flex-row flex-wrap gap-x-12">
      {
        nfts && nfts.length > 0
          ?
          nfts.map((nft, index) => {
            return (
              <NFTCard 
                key={nft.token.tokenId} 
                tokenId={nft.token.tokenId} 
                imageUrl={nft.token.metadata.image} 
                collectionAddress={nft.token.collectionAddress} 
                name={nft.token.metadata.name} 
                price="0.003"
                author="Typedesigner"
              />
            )
          }
          ) : (
            <div>
              {"NO FONT FOUND"}
            </div>
          )
      }
    </div>
  )
}

export default NFTList