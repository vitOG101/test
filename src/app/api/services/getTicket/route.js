import { NextResponse } from "next/server";

export async function POST(req) {
    const { address } = await req.json();

    const dataRes = await fetch(`${process.env.API_HOST}/getTicket/${address}`, {
        method:'GET',
        headers: {'Authorization': 'Basic ' + Buffer.from(process.env.API_BASIC_AUTH).toString('base64')}
    });

    switch (dataRes.status) {
        case 200:
            const data = await dataRes.json();
            return NextResponse.json({ message: "a hash exist", data: data }, { status: 200 });    
        case 404:
            return NextResponse.json({ message: "Hashes Not Found For This Address." }, { status: 404 });    
        }
    return NextResponse.json({ message: "server error" }, { status: 500 }); 
}