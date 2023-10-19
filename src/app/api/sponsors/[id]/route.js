import { NextResponse } from "next/server";
import { writeFile, unlink, readFile } from 'fs/promises';
import path from 'path';

export async function DELETE(req, { params }) {
    const { id } = params;
    const fileConfig = path.resolve('data/sponsors.json');
    // const sponsors = require('data/sponsors.json');
    const sponsors = JSON.parse(await readFile(path.resolve('data/sponsors.json'), 'utf8'));
    const index = sponsors.indexOf(sponsors[id]);

    if (index > -1) {
        await unlink(path.resolve(`public/${sponsors[id].src}`));
        sponsors.splice(index, 1);
        await writeFile(fileConfig, JSON.stringify(sponsors, null, 2));
    }

    return NextResponse.json({ message: "OK", data: sponsors }, { status: 200 });
};
