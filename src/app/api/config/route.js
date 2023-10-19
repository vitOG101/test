import { writeFile, readFile } from 'fs/promises';
const path = require('path');

import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
    // const config = require('data/config.json');
    const config = JSON.parse(await readFile(path.resolve('data/config.json'), 'utf8'));
    // Do whatever you want
    return NextResponse.json({ message: "OK", data: config }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(req) {
    // Do whatever you want
    // const config = require('data/config.json');
    const config = JSON.parse(await readFile(path.resolve('data/config.json'), 'utf8'));
    const data = await req.json();
    const res = { ...config, ...data };
    const fileConfig = path.resolve('data/config.json');

    await writeFile(fileConfig, JSON.stringify(res, null, 2));
    return NextResponse.json({ message: "OK", data: res }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...