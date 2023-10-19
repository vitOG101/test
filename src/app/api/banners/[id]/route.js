import { NextResponse } from "next/server";
import { writeFile, unlink, readFile } from 'fs/promises';
import path from 'path';

export async function DELETE(req, { params }) {
    const { id } = params;
    const fileConfig = path.resolve('data//banners.json');
    // const banners = require('data/banners.json');
    const banners = JSON.parse(await readFile(path.resolve('data/banners.json'), 'utf8'));
    const index = banners.indexOf(banners[id]);

    if (index > -1) {
        await unlink(path.resolve(`public/${banners[id].src}`));
        banners.splice(index, 1);
        await writeFile(fileConfig, JSON.stringify(banners, null, 2));
    }

    return NextResponse.json({ message: "OK", data: banners }, { status: 200 });
};
