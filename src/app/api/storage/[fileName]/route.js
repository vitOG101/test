import { readFile } from 'fs/promises';
const path = require('path');

// To handle a GET request to /api
export async function GET(req, res) {
    const fileBugger = await readFile(path.resolve(`public/storage/${res.params.fileName}`));
    
    return new Response(fileBugger, { headers: { 'content-type': 'image/*' } });
}
