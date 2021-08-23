import React, { FC } from "react";
import { useCookies } from "react-cookie";

import sticker1 from "../assets/img/sticker1.png";
import sticker2 from "../assets/img/sticker2.png";

const Stickers: FC = () => {
    let sun = false, mon = false, tue = false, wed = false, thu = false, fri = false, sat = false;
    const [cookies, setCookie] = useCookies(["sunday", "sun", "mon", "tue", "wed", "thu", "fri", "sat"]);

    const today = new Date();
    const week_num = today.getDay();
    const sunday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - week_num);
    const sunday_date = `${sunday.getMonth() + 1}${sunday.getDate()}`;

    if (cookies.sunday != sunday_date) {
        setCookie("sunday", sunday_date, {path: "/"});
        setCookie("sun", 0, {path: "/"});
        setCookie("mon", 0, {path: "/"});
        setCookie("thu", 0, {path: "/"});
        setCookie("wed", 0, {path: "/"});
        setCookie("thu", 0, {path: "/"});
        setCookie("fri", 0, {path: "/"});
        setCookie("sat", 0, {path: "/"});
    };

    if (cookies.sun == 1) {
        sun = true;
    };
    if (cookies.mon == 1) {
        mon = true;
    };
    if (cookies.tue == 1) {
        tue = true;
    };
    if (cookies.wed == 1) {
        wed = true;
    };
    if (cookies.thu == 1) {
        thu = true;
    };
    if (cookies.fri == 1) {
        fri = true;
    };
    if (cookies.sat == 1) {
        sat = true;
    };

    return (
        <div className="notification is-warning mt-6">
            <p className="mb-4">今週の成果</p>
            <table className="table is-bordered mx-auto mb-0">
                <thead>
                    <tr>
                        <th>日</th>
                        <th>月</th>
                        <th>火</th>
                        <th>水</th>
                        <th>木</th>
                        <th>金</th>
                        <th>土</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            {sun && <img src={sticker2} className="image is-96x96" />}
                            {!sun && <img src={sticker1} className="image is-96x96" />}
                        </th>
                        <th>
                            {mon && <img src={sticker2} className="image is-96x96" />}
                            {!mon && <img src={sticker1} className="image is-96x96" />}
                        </th>
                        <th>
                            {tue && <img src={sticker2} className="image is-96x96" />}
                            {!tue && <img src={sticker1} className="image is-96x96" />}
                        </th>
                        <th>
                            {wed && <img src={sticker2} className="image is-96x96" />}
                            {!wed && <img src={sticker1} className="image is-96x96" />}
                        </th>
                        <th>
                            {thu && <img src={sticker2} className="image is-96x96" />}
                            {!thu && <img src={sticker1} className="image is-96x96" />}
                        </th>
                        <th>
                            {fri && <img src={sticker2} className="image is-96x96" />}
                            {!fri && <img src={sticker1} className="image is-96x96" />}
                        </th>
                        <th>
                            {sat && <img src={sticker2} className="image is-96x96" />}
                            {!sat && <img src={sticker1} className="image is-96x96" />}
                        </th>
                    </tr>
                </tbody>
            </table>
            <p className="is-size-7">Cookieを削除することでデータが削除されます.</p>
        </div>
    );
};

export default Stickers;