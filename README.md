# PEARL
PEARL is where typedesigners and designers can create, sell, and discover typefaces and designs.
With PEARL, we want to onboard the creative ecosystem on-chain, from designing creative assets, selling, and sharing designs. while bringing value to the designer.

## Type Designer Workflow
 - Upload Preview Image (Implemented)
 - Create Collection
 - Upload and ecrypt files (only feature Preview no UI)

## Graphic Designer Workflow
 - Browse NFTs (Implemented)
 - Buy NFT (Implemented)
 - Unlock and download ecrypted files (only feature Preview no UI)
 - Create own Designs (Not Implemented)

## Storage
We store the NFT Font preview on IPFS using nft.storage.
We also store the encrypted font files, Specimen image, Licence on IPFS using nft.storage as well.

## Lit Protocol
In our demo our accessControlCondition is controlling at least 1 ERC721 Font NFT.
The Encyrpted files by the type designer can be decrypted if you own a font.


### How to test on your local machiene:

> Clone the repo
```bash
git clone https://github.com/Pearl-Market/marketplace
```
> Install dependencies
```bash
cd zora-starter-kit
npm install
```
> Run locally
```bash
npm run dev
```
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.

Forked from the [ZORA DEVELOPER STARTER KIT - v0.1](https://github.com/0xTranqui/zora-starter-kit)\

