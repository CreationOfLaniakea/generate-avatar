import {getDb} from "@/libs/db";
import * as process from "process";
import {limitQuery} from "@/server/countUser";
import type { NextApiRequest, NextApiResponse } from 'next';
import {collect_user_info} from "@/server/image_user";
import {NextResponse} from "next/server";

const db = getDb();

export async function POST(request){
    const json = await request.json();
    const email = json.email;
    const image = json.image;

    const result = await collect_user_info(email, image);

    return NextResponse.json(true, { status: 200 });
}
