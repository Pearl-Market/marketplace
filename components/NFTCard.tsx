
const NFTCard = ({ imageUrl, name, price, author, tokenId }) => {

    return (
        <div className="card">
            <img src={imageUrl} alt="" className='specimen' />
            <div className="details flex flex-row justify-between my-3">
                <span className="name font-500 text-2xl">{name}</span>
                <span className="price">{price} ETH</span>
            </div>
            <div className="author flex justify-end">
                {author}
            </div>
        </div>

        // <img src={nft.token.metadata.image} alt={nft.token.metadata.name} width={400} height={400} />
        // <div>
        //     <p>{nft.token.metadata.description}</p>
        // </div>
    )
}

export default NFTCard