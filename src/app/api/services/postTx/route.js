import { NextResponse } from "next/server";

export async function POST(req) {
    const { txHash, address } = await req.json();
    const dataRes = await fetch(`${process.env.API_HOST}/postTx`, {
        method:'POST',
        body: JSON.stringify({
            txHash: txHash,
            address: address,
        }),
        headers: {
            'Authorization': 'Basic ' + Buffer.from(process.env.API_BASIC_AUTH).toString('base64'),
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    console.log(dataRes.status);

    switch (dataRes.status) {
        case 200:
            return NextResponse.json({ message: "This Hash Has Already Been Added" }, { status: 200 });    
        case 400:
            return NextResponse.json({ message: "Hashes Not Found For This Address." }, { status: 400 });    
        case 404:
            return NextResponse.json({ message: "Hashes Not Found For This Address." }, { status: 404 });    
        case 409:
            return NextResponse.json({ message: "This Hash Has Already Been Added" }, { status: 409 });    
        }
    return NextResponse.json({ message: "server error" }, { status: 500 });  
}