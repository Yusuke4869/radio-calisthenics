import React, { FC } from "react";
import  { Link } from "react-router-dom";

import Stickers from "../../components/weekstickers";

const Home: FC = () => {
	return (
        <div className="column is-three-fifths is-offset-one-fifth">
            <h1 className="title is-2 m-6">ラジオ体操</h1>
            <div className="menu">
                <p className="menu-label">ラジオ体操メニュー</p>
                <ul className="menu-list">
                    <li><Link to="/both-movie">ラジオ体操を行う</Link></li>
                    <li><Link to="/movie1">ラジオ体操第一のみ行う</Link></li>
                    <li><Link to="/movie2">ラジオ体操第二のみ行う</Link></li>
                </ul>
            </div>
            <Stickers />
        </div>
	);
};

export default Home;