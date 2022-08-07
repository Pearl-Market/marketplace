const NFTCard = ({ nfts }) => {

    return (
        <>
            {
            nfts && nfts.length > 0
            ?
            nfts.map((nft, index) => {
                return (
                    <div key={nft.token.tokenId} className="border-2 border-white m-[2px] w-10/12 sm:w-5/12 md:w-3/12  border-solid flex flex-row flex-wrap justify-center">
                        
                            <img src={nft.token.metadata.image} alt={nft.token.metadata.name} width={400} height={400} />
                        <div>
                            <p>{nft.token.metadata.description}</p>
                        </div>
                        
                    </div>
                )
            }
            ) : (
                <div>
                    {"NO FONT FOUND"}
                </div>
            )
            }
        </>
    )
}

export default NFTCard