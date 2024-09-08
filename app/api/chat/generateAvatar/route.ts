import {getDb} from "@/libs/db";
import * as process from "process";
import {limitQuery} from "@/server/countUser";
import type { NextApiRequest, NextApiResponse } from 'next';

const db = getDb();

export async function POST(req: Request, res: Response) {
    const json = await req.json();
    const email = json.email;

    const resultsUser = await limitQuery(email);


    const responseBody = JSON.stringify({ resultsUser: resultsUser });


    // return new Response(responseBody, {
    return new Response(responseBody, {
        status: 200,
        statusText: "limit query",
    })
}
