import { NFTPreview, MediaConfiguration } from "@zoralabs/nft-components";
import { Networks, Strategies } from "@zoralabs/nft-hooks"
import { CreateAsk } from "./Asks/CreateAsk";
import AskWrite_disclosure from "./Asks/AskWrite_disclosure";
import Image from "next/image";

const zdkStrategyMainnet = new Strategies.ZDKFetchStrategy(
    Networks.MAINNET
)

const NFTCard = ({ nfts }) => {

    return (
        <>
            {
            nfts && nfts.length > 0
            ?
            nfts.map((nft, index) => {
                return (
                    <div key={nft.token.tokenId} className="border-2 border-white m-[2px] w-10/12 sm:w-5/12 md:w-3/12  border-solid flex flex-row flex-wrap justify-center">
                        
                            <img src={nft.token.metadata.image} alt="NFT..." width={400} height={400} />
                        <div>
                            <p>{nft.token.metadata.description}</p>
                        </div>
                        {/* <div className="text-white">
                            { nft.marketsSummary.length === 0 ? (
                            <div className="mb-5">
                                <div>
                                    {"Listing Status: " + "INACTIVE"}
                                </div>                            
                                <div>
                                    {"Listing Price: " + "N/A"}
                                </div>
                                <div>
                                    {"Finders Fee: " + "N/A"}
                                </div>                                  
                            </div>
                            ) : ( 
                            <div className="mb-5"> 
                                <div>
                                    {"Listing Status: " + nft.marketsSummary[0].properties.v3AskStatus}
                                </div>                            
                                <div>
                                    {"Listing Price: " + nft.marketsSummary[0].properties.askPrice.nativePrice.decimal + " " + nft.marketsSummary[0].properties.askPrice.nativePrice.currency.name}
                                </div>
                                <div>
                                    {"Finders Fee: " + (nft.marketsSummary[0].properties.findersFeeBps / 100) + "%"}
                                </div>                                  
                            </div>
                            )}
                        </div> */}
                    </div>
                )
            }
            ) : (
                <div>
                    {"::: NO RESULTS :::"}
                </div>
            )
            }
        </>
    )
}

export default NFTCard