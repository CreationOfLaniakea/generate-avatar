import {getDb} from "@/libs/db";

const db = getDb();

export const collect_user_info = async (email: string, image: string) => {
    const result = await db.query(`select * from user_exhibition where email=$1`, [email]);
    const users = result.rows;

    if(users.length <= 0) {
        //新增
        await db.query('insert into user_exhibition(email, url_image) values($1, ARRAY[$2])', [email, image]);
    } else {
        //追加
        await db.query('update user_exhibition set url_image=array_append(url_image, $1) where email=$2', [image, email]);
    }

    return;
}


export const get_user_image = async (email: string) => {
    const result = await db.query(`select url_image from user_exhibition where email=$1`, [email]);
    const users = result.rows;

    if(users.length > 0) {
        return users[0].url_image;
    }

    return [];
}