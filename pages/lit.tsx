import { NFTStorage, Blob } from 'nft.storage';
import LitJsSdk from 'lit-js-sdk';
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { NextPage } from "next";

const client = new LitJsSdk.LitNodeClient()
const chain = 'rinkeby'

const accessControlConditionsNFT = [
    {
        contractAddress: '0xBF5560691df59dd8A5E2B3904D311AC070b9764a',
        standardContractType: 'ERC721',
        chain,
        method: 'balanceOf',
        parameters: [
            ':userAddress'
        ],
        returnValueTest: {
            comparator: '>',
            value: '0'
        }
    }
]

class Lit {
    litNodeClient

    async connect() {
        await client.connect()
        this.litNodeClient = client
    }

    async encryptString(str) {
        if (!this.litNodeClient) {
            await this.connect()
        }
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(str)

        const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
            accessControlConditions: accessControlConditionsNFT,
            symmetricKey,
            authSig,
            chain,
        })

        return {
            encryptedFile: encryptedString,
            encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
        }
    }

    async decryptString(encryptedStr, encryptedSymmetricKey) {
        if (!this.litNodeClient) {
            await this.connect()
        }
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const symmetricKey = await this.litNodeClient.getEncryptionKey({
            accessControlConditions: accessControlConditionsNFT,
            toDecrypt: encryptedSymmetricKey,
            chain,
            authSig
        })
        const decryptedFile = await LitJsSdk.decryptString(
            encryptedStr,
            symmetricKey
        );
        // eslint-disable-next-line no-console
        console.log({
            decryptedFile
        });
        return { decryptedFile }
    }
}


const LitProtocol: NextPage = () => {

    const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFmZGVjMjZjNDMxZjc4MjNhQzRFOTkyNDNhMjgxOTI5QTgxQUI0YmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1OTgxODI5MTU0NCwibmFtZSI6IlBFQVJMIFNUT1JBR0UifQ.IKJa2ylWaqxPN9JjuG7sAb-EvOSsdTF24EHvP7hxUF8'

    const NFTStorageClient = new NFTStorage({ token: NFT_STORAGE_API_KEY })


    const [file, setFile] = useState(null);
    const [encryptedFileArr, setEncryptedFileArr] = useState([]);
    const [encryptedKeyArr, setEncryptedKeyArr] = useState([]);
    const [decryptedFileArr, setDecryptedFileArr] = useState([]);
    const [decryptedFileURL, setdecryptedFileURL] = useState("nfts2");

    const lit = new Lit()

    async function handleSubmit(e) {
        e.preventDefault();

        try {


            const encrypted = await lit.encryptString(file);

            setEncryptedFileArr((prev) => [...prev, encrypted.encryptedFile]);
            setEncryptedKeyArr((prev) => [...prev, encrypted.encryptedSymmetricKey]);

            const someData = new Blob(encryptedFileArr);
            const cid = await NFTStorageClient.storeBlob(someData);

            const url = `https://nftstorage.link/ipfs/${cid}`;
            console.log("nft.storage url:", url)

        } catch (error) {
            console.log(error.message);
        }
    }

    function decrypt() {
        Promise.all(encryptedFileArr.map((url, idx) => {
            return lit.decryptString(url, encryptedKeyArr[idx]);
        })).then((values) => {
            setDecryptedFileArr(values.map((v) => {
                return v.decryptedFile;
            }));
        });
    }

    useEffect(() => {
        if (encryptedFileArr.length !== 0) {
            decrypt();
        }
    }, [encryptedFileArr, decrypt]);

    useEffect(() => {
        if (decryptedFileArr.length !== 0) {
            decryptedFileArr.map((el) => convertToPng(el))
        }
    }, [decryptedFileArr]);

    function retrieveFile(e) {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsDataURL(data);
        // const buf1 = Buffer.from('this is a tést');
        reader.onloadend = () => {
            console.log('TYPE OF ----------------------------', typeof reader.result);
            console.log('bytearray: ?', reader.result);
            const base64 = getBase64StringFromDataURL(reader.result);
            console.log(base64);

            setFile(base64);
        };

        e.preventDefault();
    }
    const getBase64StringFromDataURL = (dataURL) =>
        dataURL.replace('data:', '').replace(/^.+,/, '');

    function convertToPng(decryptedFile) {
        console.log('type of ----------------', typeof decryptedFile);
        console.log('bytearray ------------', decryptedFile);
        let buff = Buffer.from(decryptedFile, 'base64');
        const blob = new Blob([buff], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);
        setdecryptedFileURL(imageUrl);
        console.log('imageUrl', imageUrl);
        return imageUrl
    }


    return (
        <div className="mt-20 sm:0 min-h-screen h-screen">
            <Header />
            <main className="text-black h-full flex sm:flex-col flex-row flex-wrap">
                <div className="main">
                    <form onSubmit={handleSubmit}>
                        <input type="file" onChange={retrieveFile} />
                        <button type="submit" className="button">Submit</button>

                    </form>
                </div>

                <div className="display">
                    {decryptedFileArr.length !== 0
                        ? <img src={decryptedFileURL} alt="nfts" /> : <h3>Upload data</h3>}

                </div>

            </main >
        </div >
    );
}

export default LitProtocol;
