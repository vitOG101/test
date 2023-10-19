import { NextResponse } from "next/server";
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

// To handle a GET request to /api
export async function GET(request) {
  const banners = JSON.parse(await readFile(path.resolve('data/banners.json'), 'utf8'));
  // Do whatever you want
  return NextResponse.json({ message: "OK", data: banners }, { status: 200 });
}

export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');

  const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
             
  if (!allowedExtensions.exec(file.name)) {
    return NextResponse.json({ error: "Not Valid" }, { status: 400 });
  } 

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileStorePath = `/storage/${Date.now()}-${file.name}`;
  const filePath = path.resolve(`public${fileStorePath}`);
  await writeFile(filePath, buffer);

  // const banners = require('data/banners.json');
  const banners = JSON.parse(await readFile(path.resolve('data/banners.json'), 'utf8'));
  const res = [ ...banners, ...[{ src: fileStorePath }] ];
  const fileConfig = path.resolve('data/banners.json');

  await writeFile(fileConfig, JSON.stringify(res, null, 2));

  return NextResponse.json({ message: "OK", data: res }, { status: 200 });
}