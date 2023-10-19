import { NextResponse } from "next/server";
import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  const data = await req.json();
  const fileConfig = path.resolve('data/sponsors.json');

  await writeFile(fileConfig, JSON.stringify(data, null, 2));
  return NextResponse.json({ message: "OK", data: data }, { status: 200 });
}