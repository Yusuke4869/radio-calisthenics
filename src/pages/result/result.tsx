import React, { FC } from "react";
import { useCookies } from "react-cookie";
import  { Link } from "react-router-dom";

import Stickers from "../../components/weekstickers";

const Result: FC = () => {
    let finish = false;
    const [cookies, setCookie] = useCookies(["sunday", "sun", "mon", "tue", "wed", "thu", "fri", "sat", "finish"]);
    const week_data = [cookies.sun, cookies.mon, cookies.tue, cookies.wed, cookies.thu, cookies.fri, cookies.sat];

	const today = new Date();
    const week_num = today.getDay();
    const today_data = week_data[week_num];

    if (today_data != 1 && cookies.finish == 1) {
        finish = true;
    };

    if (finish) {
        switch (week_num) {
            case 0:
                setCookie("sun", 1, {path: "/"});
                break;
            case 1:
                setCookie("mon", 1, {path: "/"});
                break;
            case 2:
                setCookie("tue", 1, {path: "/"});
                break;
            case 3:
                setCookie("wed", 1, {path: "/"});
                break;
            case 4:
                setCookie("thu", 1, {path: "/"});
                break;
            case 5:
                setCookie("fri", 1, {path: "/"});
                break;
            case 6:
                setCookie("sat", 1, {path: "/"});
                break;
        };
    };

	return (
		<div className="column is-6 is-offset-3">
            <h2 className="title is-1 m-6">お疲れさまでした！</h2>
            <p className="m-6">毎日頑張りましょう</p>
            {finish && (<p className="mb-6">スタンプを押しました！</p>)}
            <Stickers />
            <Link to="/"><button className="button is-primary m-4 is-medium">トップへ戻る</button></Link>
        </div>
	);
};

export default Result;