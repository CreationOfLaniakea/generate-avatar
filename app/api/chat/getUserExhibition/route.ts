import {getDb} from "@/libs/db";
import {NextResponse} from "next/server";
import {get_user_image} from "@/server/image_user";

const db = getDb();

export async function POST(request){
    const json = await request.json();
    const email = json.email;

    const result = await get_user_image(email);

    return NextResponse.json(result, { status: 200 });
}
