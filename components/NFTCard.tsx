import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import editionsABI from "@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json"
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import { useContractWrite, useContractRead, useWaitForTransaction } from 'wagmi'
import { useAppContext } from "../context/useAppContext"
import MintQuantity from '../components/MintQuantity'
import PostMintDialog from '../components/PostMintDialog'

const heavenly = "#40bedc"

const NFTCard = ({ imageUrl, name, price, author, tokenId, collectionAddress }) => {


    // ZORA NFT Edition default params
    const perMintPrice = 0.003
    const totalMintPrice = String(1 * perMintPrice)
    const mintValue = BigNumber.from(ethers.utils.parseEther(totalMintPrice)).toString()
    console.log("mint VAlue", mintValue)


    // Purchase Mint Call
    const { data: mintData, isError: mintError, isLoading: mintLoading, isSuccess: mintSuccess, status: mintStatus, write: mintWrite } = useContractWrite({
        addressOrName: collectionAddress,
        contractInterface: editionsABI.abi,
        functionName: 'purchase',
        args: [
            '1'
        ],
        overrides: {
            value: mintValue
        },
        onError(error, variables, context) {
            console.log("error", error)
        },
        onSuccess(cancelData, variables, context) {
            console.log("Success!", cancelData)
        },
    })


    // wait for blockchain to resolve transaction
    const { data: mintWaitData, isError: mintWaitError, isLoading: mintWaitLoading } = useWaitForTransaction({
        hash: mintData?.hash,
        onSuccess() {
            console.log("mintData Success:", mintData),
                console.log("waitData: ", mintWaitData)
        },
        onError() {
            console.log("mintData Error:", mintData)
        },
    })

    if (!imageUrl) return null;


    return (
        <div className="card">
            <Link href={`/nft/${tokenId}`}>
                <a>
                    <img src={imageUrl} alt="" className='specimen' />
                </a>
            </Link>
            <div className="details flex flex-row justify-between my-3">
                <span className="name font-500 text-xl">{name}</span>
                <span className="price">{price} ETH</span>
            </div>
            <div className="author flex justify-end mb-5">
                {author}
            </div>

            <button
                className="flex flex-row justify-center w-full rounded-lg font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700"
                onClick={() => mintWrite()}
                disabled={mintWaitLoading}
            >
                {
                    mintWaitLoading ? (
                        <img
                            className="bg-[#40bedc] rounded-3xl w-fit"
                            src="/SVG-Loaders-master/svg-loaders/tail-spin.svg"
                        />
                    ) :
                        (<span className="">Buy</span>)
                }
            </button>

            <PostMintDialog
                colorScheme={heavenly}
                publicTxnLoadingStatus={mintWaitLoading}
                publicTxnSuccessStatus={mintStatus}
                publicTxnHashLink={mintWaitData}
            />

        </div>
    )
}

export default NFTCard;

