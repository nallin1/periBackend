import internal from "stream";
import { db } from "../connection";
import { OkPacket, RowDataPacket } from "mysql2";


export interface BasicAdm {
    id: number;
}

export interface Adm extends BasicAdm {
    name: string,
    password: string,
}

export const findOneAdm = (passwordAdm: number, callback: Function) => {
    const queryString = `
        SELECT password FROM cl201279.adm_peri WHERE password=? 
    `;

    db.query(queryString, passwordAdm, (err,result) => {
        if (err) {callback(err)}

        const row = (<RowDataPacket> result)[0];
        const adm: Adm = {
            id: row.id,
            name: row.name,
            password: row.password,
        }
        callback(null, adm);
    });
}