import {v4 as uuidv4} from 'uuid';
import {getDb} from "@/libs/db";

const db = getDb();
export const checkAndSaveUser = async (name: string, email: string, image: string, last_login_ip: string) => {
    const results = await db.query(`select * from user_info where email=$1;`, [email]);
    const users = results.rows;
    if (users.length <= 0) {
        const result = {
            user_id: '',
            name: '',
            email: '',
            image: '',
        }
        // 新增
        const strUUID = uuidv4().replace(/-/g, '');
        await db.query('insert into user_info(user_id,name,email,image,last_login_ip) values($1,$2,$3,$4,$5)',
            [strUUID, name, email, image, last_login_ip]);

        result.user_id = strUUID;
        result.name = name;
        result.email = email;
        result.image = image;
        return result;
    } else {
        // 更新
        const user = users[0];
        await db.query('update user_info set name=$1,image=$2,last_login_ip=$3,updated_at=now() where id=$4',
            [name, image, last_login_ip, user.id]);
        return user;
    }
}