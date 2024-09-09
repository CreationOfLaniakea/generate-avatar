import {getDb} from "@/libs/db";
import config from "@/config";

function getCurrentDateIntl(): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const formattedDate =  formatter.format(new Date());

    const [month, day, year] = formattedDate.split('/');
    return `${year}-${month}-${day}`;
}

const db = getDb();
export const limitQuery = async (email: string) => {
    const results = await db.query(`select * from user_login_count where email=$1;`, [email]);
    const users = results.rows;
    if (users.length <= 0) {
        // 新增
        await db.query('insert into user_login_count(email,count_curr,count_total,click_date,count_click) values($1,$2,$3,$4,$5)',
            [email, 1, 1, getCurrentDateIntl(), 1]);

        return false;
    } else {
        // 更新
        const user = users[0];

        if (user.click_date != getCurrentDateIntl()) {
            await db.query('update user_login_count set email=$1,count_curr=$2,count_total=$3,click_date=$4,count_click=$5',
                [email, 1, Number(user.count_total)+1, getCurrentDateIntl(), Number(user.count_click)+1]);

            return false;
        }

        if(Number(user.count_curr) <= config.limit) {
            await db.query('update user_login_count set email=$1,count_curr=$2,count_total=$3,click_date=$4,count_click=$5',
                [email, Number(user.count_curr)+1, Number(user.count_total)+1, getCurrentDateIntl(), Number(user.count_click)+1]);
            return false;
        }

        await db.query('update user_login_count set count_click=$1',
            [Number(user.count_click)+1]);
        return true;
    }
}