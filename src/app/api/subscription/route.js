import { NextResponse } from "next/server";
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

// To handle a POST request to /api
export async function POST(req) {
    // Do whatever you want
    // const emails = require('data/emails.json');
    const emails = JSON.parse(await readFile(path.resolve('data/emails.json'), 'utf8'));
    const data = await req.json();

    if (!emails?.find(el => el === data.email)) {
        emails.push(data.email);
        const fileConfig = path.resolve('data//emails.json');
        await writeFile(fileConfig, JSON.stringify(emails, null, 2));
    }
    
    return NextResponse.json({ message: "OK" }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...