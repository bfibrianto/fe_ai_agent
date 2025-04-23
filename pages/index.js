import Image from "next/image";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-5 text-2xl font-bold">Pilih Menu Untuk Memulai</h1>
            <div className="flex gap-5">
                <div
                    className="flex flex-col items-center p-5 border border-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => window.location.href = "/chat"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    <p className="mt-2 text-lg font-medium">Chat</p>
                    {/* Deskripsi fitur */}
                    <p className="mt-1 text-sm text-center">Tanya jawab dengan AI dengan custom context</p>
                </div>
                <div
                    className="flex flex-col items-center p-5 border border-white shadow-md rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => window.location.href = "/upload"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15" />
                    </svg>
                    <p className="mt-2 text-lg font-medium">Upload</p>
                    {/* Deskripsi fitur */}
                    <p className="mt-1 text-sm text-center">Upload dokumen untuk konteks chat</p>
                </div>
            </div>
        </div>
    )
}