import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Header } from '../components/Header'

import Link from "next/link"
import { useContractRead, useAccount } from "wagmi"
import { NFTPreview, MediaConfiguration } from "@zoralabs/nft-components"
import { Networks, NFTFetchConfiguration, Strategies, useNFT, useNFTMetadata, MediaFetchAgent } from "@zoralabs/nft-hooks"
import editionsABI from "@zoralabs/nft-drop-contracts/dist/artifacts/ERC721Drop.sol/ERC721Drop.json"
import { BigNumber } from "ethers"
import { useState, useEffect } from 'react'
import { createClient } from "urql"
import { Switch } from "@headlessui/react"
import NFTList from '../components/NFTList'

// APIs
const API_MAINNET = "https://api.zora.co/graphql"

const client = createClient({
  url: API_MAINNET,
})

console.log("client", client)

const Gallery = () => {

  const [nftsMinted, setNFTsMinted] = useState();
  const [loading, setLoading] = useState(false);
  const [rawData, setRawData] = useState([]);
  const [userData, setUserData] = useState([])
  const [enabled, setEnabled] = useState(false);

  // hook to get the current account of user
  const { address, connector, isConnecting, isConnected, status } = useAccount();
  const currentUserAddress = address ? address.toLowerCase() : "";

  const NFTFontCollectionAddresses = [
    "0xC4CF74b756c763Fe426F132FEC6873C5a53d1DBA",
    "0x9c95A40a62854d69c05f897e754088f57D9a4884",
    "0xB8c79DA8b9D6Cfc99f2DB94918690E3C871cAd1f",
    "0x1759ee7cfD8B1f80a80d47ADaB6789aa860709dD",
    "0x79D9B0cb692d760ADd1366d61523A0B1ADfd127C",
    "0xbD2596685Fc7EaE2B732C3D07F16E53067AA14Df",
    "0xdd0dA8d59d40cBce5e4e37A02EF377A1dF9149Cc",
    "0x34B1eb40E1C5B9b96BE34D72d75B2Da874b88771",
  ];
  // read call to get current totalSupply
  // const { data: totalSupplyData, isLoading, isSuccess, isFetching } = useContractRead({
  //   addressOrName: "0x6D873c95a65eBfe1579B7B0B3d0189c9fF8A35e7",
  //   contractInterface: editionsABI.abi,
  //   functionName: 'totalSupply',
  //   args: [],
  //   watch: true,
  //   onError(error) {
  //     console.log("totalsSupply error: ", error)
  //   },
  //   onSuccess(data) {
  //     console.log("success! --> ", totalSupplyData)
  //   }
  // })

  // const totalSupply = totalSupplyData ? BigNumber.from(totalSupplyData).toString() : "loading"
  // const totalSupplyNumber = Number(totalSupply)
  // const numOfCallsRequired = Math.ceil(totalSupplyNumber / 100)
  const numOfCallsRequired = 1;
  console.log({numOfCallsRequired})

  const generateCalls = (numCalls) => {
    const callArray = [];

    for (let i = 0; i < numCalls; i++) {
      let call =
        ` 
    query PreviewTokens {
      tokens(
        networks: [{network: ETHEREUM, chain: RINKEBY}], 
        pagination: {limit: 10}, 
        where: {
          tokens: [
            {
              address: "0xBF5560691df59dd8A5E2B3904D311AC070b9764a",
              tokenId: "1"
            },
            {
              address: "0xC4CF74b756c763Fe426F132FEC6873C5a53d1DBA",
              tokenId: "1"
            },
            {
              address: "0x9c95A40a62854d69c05f897e754088f57D9a4884",
              tokenId: "1"
            },
            {
              address: "0xB8c79DA8b9D6Cfc99f2DB94918690E3C871cAd1f",
              tokenId: "1"
            },
            {
              address: "0x1759ee7cfD8B1f80a80d47ADaB6789aa860709dD" ,
              tokenId: "1"
            },
            {
              address: "0x79D9B0cb692d760ADd1366d61523A0B1ADfd127C" ,
              tokenId: "1"
            },
            {
              address: "0xbD2596685Fc7EaE2B732C3D07F16E53067AA14Df" ,
              tokenId: "1"
            },
            {
              address: "0xdd0dA8d59d40cBce5e4e37A02EF377A1dF9149Cc" ,
              tokenId: "1"
            },
            {
              address: "0x34B1eb40E1C5B9b96BE34D72d75B2Da874b88771" ,
              tokenId: "1"
            },
          ]
        }
      ) 
      {
        nodes {
          marketsSummary {
            marketType
            tokenId
            properties {
              ... on V3Ask {
                sellerFundsRecipient
                findersFeeBps
                askPrice {
                  nativePrice {
                    decimal
                    currency {
                      name
                    }
                  }
                }
                v3AskStatus
              }
            }
          }
          token {
            collectionAddress
            tokenId
            name
            tokenUrl
            metadata
          }
        }
      }
    }
    `

      callArray.push(call)
    }
    return callArray
  }

  const generateQueries = (array, length) => {
    const promises = []
    for (let i = 0; i < length; i++) {
      promises.push(client.query(array[i]).toPromise())
    }
    return promises
  }

  const runPromises = async (inputArray) => {
    return Promise.all(inputArray).then((results) => {
      return [results]
    })
  }

  const parseCollection = (multipleArrays) => {

    const masterArray = []
    console.log('test ', multipleArrays[0][0])
    for (let j = 0; j < multipleArrays[0][0].data.tokens.nodes.length; j++) {
      masterArray.push(multipleArrays[0][0].data.tokens.nodes[j])
    }
    return masterArray
  }

  const concatPromiseResultsMainnet = (multipleArrays) => {
    const masterArray = []
    for (let i = 0; i < multipleArrays[0].length; i++) {
      for (let j = 0; j < multipleArrays[0][i].data.tokens.nodes.length; j++) {
        masterArray.push(multipleArrays[0][i].data.tokens.nodes[j])
      }
    }
    return masterArray
  }

  const ownerFilter = (rawData) => {
    const filteredArray = []
    const filteredNFTs = rawData.filter((nft) => {
      if (nft.owner === currentUserAddress) {
        filteredArray.push(nft)
      }
      return filteredArray
    });
    setUserData(filteredArray)
  }

  const fetchData = async () => {
    console.log("fetching data")

    try {
      setLoading(true);

      const finalCallArray = generateCalls(numOfCallsRequired);
      console.log("Finalcallarray", finalCallArray)

      const finalPromises = generateQueries(finalCallArray, numOfCallsRequired);
      console.log("finalpromises", finalPromises)

      const promiseReturns = await runPromises(finalPromises);
      console.log("promiseReturns", promiseReturns)

      const promiseResults = parseCollection(promiseReturns)

      console.log("promiseResults: ", promiseResults);

      setRawData(promiseResults)

      ownerFilter(promiseResults)

      console.log("rawData", rawData)

    } catch (error) {
      console.log('fetch error', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  },
    []
  )

  useEffect(() => {
    if (!!rawData)
      ownerFilter(rawData);
  },
    [currentUserAddress]
  )

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col px-10 mt-40">
        {/* <Switch.Group>
          <div className=" mt-20 mb-5 w-full flex flex-row justify-center items-center">
            <Switch.Label className="mr-4 font-bold text-white">FULL COLLECTION</Switch.Label>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${enabled ? `bg-[#4A524C]` : `bg-[#B8C5C9]`}
                  relative inline-flex h-[30px] w-[66px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
                    pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
            <Switch.Label className="ml-4 font-bold text-white">MY COLLECTION</Switch.Label>
          </div>
        </Switch.Group> */}


        <div className="flex flex-row">
          {
            loading
              ? "loading . . . "
              : <NFTList nfts={rawData} />
          }
        </div>
      </div>
    </div>
  )
}

export default Gallery
