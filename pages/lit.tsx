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
    const [uploading, setUploading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [decrypting, setDecrypting] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [url, setURL] = useState("");
    const [encryptedFileArr, setEncryptedFileArr] = useState([]);
    const [encryptedKeyArr, setEncryptedKeyArr] = useState([]);
    const [decryptedFileArr, setDecryptedFileArr] = useState([]);
    const [decryptedFileURL, setdecryptedFileURL] = useState("nfts2");

    async function handleSubmit(e) {
        e.preventDefault();
        setUploading(true);
        setError(false);
        setSuccess(false);
        console.log("is file ready++++++++++++++++++++++++++++", file)

        try {
            const encrypted = await lit.encryptString(file);

            console.log("file uploaded", encrypted)
            console.log("encryptedFile", encrypted.encryptedFile)
            console.log("encryptedSymmetricKey", encrypted.encryptedSymmetricKey)

            setEncryptedFileArr((prev) => [...prev, encrypted.encryptedFile]);
            setEncryptedKeyArr((prev) => [...prev, encrypted.encryptedSymmetricKey]);

            console.log("encryptedFileArr", encryptedFileArr)

            const someData = new Blob(encryptedFileArr);
            console.log("someDATA", someData)
            // const cid = await NFTStorageClient.storeBlob(someData);

            // console.log("cid", cid)

            // const url = `https://nftstorage.link/ipfs/${cid}`;
            // setURL(url);
            // setSuccess(true)
            // console.log("nft.storage url:", url)
        } catch (error) {
            console.log('upload error:', error.message);
            setError(true);
        }
        setUploading(false);
    }

    function retrieveFile(e) {
        setProcessing(true)
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
            console.log('tYPE OF ----------------------------', typeof reader.result);
            console.log('Content ----------------------------', base64);
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


    const decrypt = useCallback(
        () => {
            Promise.all(encryptedFileArr.map((url, idx) => {
                return lit.decryptString(url, encryptedKeyArr[idx]);
            })).then((values) => {
                setDecryptedFileArr(values.map((v) => {
                    return v.decryptedFile;
                }));
            });
            setDecrypting(false)
        },
        [encryptedFileArr, encryptedKeyArr],
    )


    function handleDecrypt() {
        if (encryptedFileArr.length !== 0) {
            setDecrypting(true)
            decrypt();
        }
    }


    console.log({ encryptedFileArr })
    console.log({ decryptedFileArr })

    useEffect(() => {
        if (decryptedFileArr.length !== 0) {
            decryptedFileArr.map((el) => convertToPng(el))
        }
    }, [decryptedFileArr]);

    useEffect(() => {
        if (!file) return;
        setProcessing(processing => !processing)
    }, [file]);


    return (
        <div className="mt-20 sm:0 min-h-screen h-screen">
            <Header />
            <main className="text-black mt-40 px-10 h-full flex flex-row flex-wrap">
                <div className="encypt shadow px-5 w-6/12">
                    <h2 className="title">Sligoli Font Assets</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-5">
                            <label className="mb-5">Upload a file that you want to encrypt and lock behind the Sligoli Font NFT. Only NFT holders can decrypt uploads.</label>
                            <input type="file" onChange={retrieveFile} />
                            {processing && (<p className="text-blue-400 my-3">Processing uploaded file...</p>)}
                        </div>
                        <div className="flex flex-row">
                            <button
                                type="submit"
                                className="flex flex-row justify-center rounded-lg font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700"
                                disabled={uploading || processing}
                            >
                                {uploading && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>)}

                                <span>Upload Assets</span>
                            </button>
                        </div>
                        <div className="flex flex-row mt-5">
                            {success && (
                                <p className='text--400-500'>
                                    Upload and Encryption was Successful. <br /><br />
                                    <a className='underline' href={url}>Encrypted uploaded file</a>
                                </p>
                            )}

                            {error && (
                                <p className='text-rose-600'>
                                    An Error Occured during upload. <br /><br />
                                    Please ensure you have bought the Sligoli NFT.
                                </p>
                            )}

                        </div>

                    </form>
                </div>

                <div className="decrypt shadow px-5 w-6/12">
                    <div className="flex flex-col">
                        <h2 className='title'>Decrypt Sligoli Font Assets</h2>
                        <p className='mb-5'>File would be displayed below if decryption via Lit Protocol was successful</p>

                        <div className="flex flex-row">
                            <button
                                className="flex flex-row justify-center rounded-lg font-semibold py-2.5 px-4 bg-emerald-900 text-white hover:bg-slate-700"
                                disabled={decrypting}
                                onClick={handleDecrypt}
                            >
                                {decrypting && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>)}

                                <span>Decrypt Assets</span>
                            </button>
                        </div>

                        <div className="mt-5 px-2 flex flex-row">
                            {decryptedFileArr.length !== 0
                                ? <img src={decryptedFileURL} alt="nfts" /> : null}
                        </div>

                    </div>

                </div>

            </main >
        </div >
    );
}

export default LitProtocol;
