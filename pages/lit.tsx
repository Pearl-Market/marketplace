import { NFTStorage, Blob } from 'nft.storage';
import LitJsSdk from 'lit-js-sdk';
import { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header";
import { NextPage } from "next";
import lit from "../components/lib/lit";

const LitProtocol: NextPage = () => {

    const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFmZGVjMjZjNDMxZjc4MjNhQzRFOTkyNDNhMjgxOTI5QTgxQUI0YmMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1OTgxODI5MTU0NCwibmFtZSI6IlBFQVJMIFNUT1JBR0UifQ.IKJa2ylWaqxPN9JjuG7sAb-EvOSsdTF24EHvP7hxUF8'

    const NFTStorageClient = new NFTStorage({ token: NFT_STORAGE_API_KEY })


    const [file, setFile] = useState(null);
    const [encryptedFileArr, setEncryptedFileArr] = useState([]);
    const [encryptedKeyArr, setEncryptedKeyArr] = useState([]);
    const [decryptedFileArr, setDecryptedFileArr] = useState([]);
    const [decryptedFileURL, setdecryptedFileURL] = useState("nfts2");

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

    const decrypt = useCallback(
        () => {
            Promise.all(encryptedFileArr.map((url, idx) => {
                return lit.decryptString(url, encryptedKeyArr[idx]);
            })).then((values) => {
                setDecryptedFileArr(values.map((v) => {
                    return v.decryptedFile;
                }));
            });
        },
        [encryptedFileArr, encryptedKeyArr, lit],
    )

    useEffect(() => {
        if (encryptedFileArr.length !== 0) {
            decrypt();
        }
    }, [encryptedFileArr, decrypt]);

    console.log({ encryptedFileArr })
    console.log({ decryptedFileArr })

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
            <main className="text-black mt-40 px-20 h-full flex sm:flex-col flex-row flex-wrap">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col mb-5">
                        <label className="mb-5">Upload a file that you want to entcrypt and lock behind the Font NFT</label>
                        <input type="file" onChange={retrieveFile} />
                    </div>
                    <div className="flex flex-row">
                        <button
                            type="submit"
                            className="flex flex-row justify-center rounded-lg font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700"
                        >
                            Submit
                        </button>
                    </div>
                    <div className="flex flex-row">
                        <h3 className='my-5'>Placeholder: This will show the original file if encryption and decryption was successful</h3>
                        {decryptedFileArr.length !== 0
                            ? <img src={decryptedFileURL} alt="nfts" /> : null}
                    </div>
                </form>

                <div className="display">


                </div>

            </main >
        </div >
    );
}

export default LitProtocol;
