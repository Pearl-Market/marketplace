import Link from "next/link"
import NFTCard from "./NFTCard"

const NFTList = ({ nfts }) => {

  return (
    <div className="flex flex-row flex-wrap">
    {
        nfts && nfts.length > 0
          ?
          nfts.map((nft, index) => {
            return (
              <Link key={nft.token.tokenId} href={`\nft\${nft.token.tokenId}`}>
                <a>
                  <NFTCard />
                </a>
              </Link>
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