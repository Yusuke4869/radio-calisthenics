import React, { FC, useEffect } from "react";
import { useCookies } from "react-cookie";

import style from "./movie.module.scss";

// 埋め込み用コードのエラー回避
let player: any, YT: any;

// 埋め込み用のコード ここから

function onYouTubeIframeAPIReady() {
	let first_stretch = false, second_stretch = false, both_stretch = false;
	let videoid = "", playlist: null | string = null;

	let script_tag = document.getElementById("mark_script");

	if (script_tag) {
		first_stretch = script_tag.classList.contains("first_stretch");
		second_stretch = script_tag.classList.contains("second_stretch");
		both_stretch = script_tag.classList.contains("both_stretch");
	};

	if (first_stretch) {
		videoid = "_YZZfaMGEOU";
	} else if (second_stretch) {
		videoid = "yi1TbzML2cU";
	} else if (both_stretch) {
		playlist = "_YZZfaMGEOU,yi1TbzML2cU";
	};

    player = new YT.Player("player", {
        height: "360",
        width: "640",
		videoId: videoid,
		playerVars: {
			"playlist": playlist,
			"controls": 1,
			"disablekb": 1,
			"iv_load_policy": 3,
			"rel": 0,
			"modestbranding": 1
		},
        events: {
        	"onReady": onPlayerReady,
        	"onStateChange": onPlayerStateChange
        }
    });
};

function onPlayerReady(event: any) {
    event.target.playVideo();
};

function onPlayerStateChange(event: any) {
	let first_stretch = false, first_movie = false, second_movie = false, end = false, redirect = false;
	let script_tag = document.getElementById("mark_script");

	if (script_tag) {
		first_stretch = script_tag.classList.contains("first_stretch");
	};

	if (event.data === YT.PlayerState.ENDED) {
		end = true;
	};

	const playing_url = player.getVideoUrl();
	if (playing_url.indexOf("_YZZfaMGEOU") !== -1) {
		first_movie = true;
	} else if (playing_url.indexOf("yi1TbzML2cU") !== -1) {
		second_movie = true;
	};

	if (first_movie) {
		document.title = "ラジオ体操第一";
	} else if (second_movie) {
		document.title = "ラジオ体操第二";
	};

	const now_time = player.getCurrentTime();
	if (first_movie && now_time >= 185) {
		end = true;
	} else if (second_movie && now_time >= 185) {
		end = true;
	};

	if (first_stretch && end) {
		redirect = true;
	} else if (!first_stretch && second_movie && end) {
		redirect = true;
	} else if (!first_stretch && first_movie && end) {
		player.nextVideo();
	};

	if (redirect) {
		redirectpage();		
	};
};

function redirectpage() {
	document.cookie = "finish=1";
	location.href = "/result";
};

// ここまで

interface PropsType {
    movie_type: number;
};

const Movie: FC< PropsType > = ({movie_type}) => {
	const [cookies, setCookie] = useCookies(["finish"]);
	setCookie("finish", 0, {path: "/"});

	let first = false;
	let second = false;
	let both = false;

	switch (movie_type) {
		case 1:
			first = true;
			break;
		case 2:
			second = true;
			break;
		case 3:
			both = true;
			break;
	};

	useEffect(() => {
		let class_name = "YouTube_Iframe_Class";
	
		let class_tags = document.getElementsByClassName(class_name);
		let remove_elements = Array.from(class_tags);
		remove_elements.map(function (element) {
			element.remove();
		});

		let script_tag = document.getElementById("mark_script");
		if (script_tag) {
			if (first) {
				script_tag.classList.add("first_stretch");
			} else if (second) {
				script_tag.classList.add("second_stretch");
			} else {
				script_tag.classList.add("both_stretch");
			};
		};

		let tag_func1 = document.createElement("script");
		let tag_func2 = document.createElement("script");
		let tag_func3 = document.createElement("script");
		let tag_func4 = document.createElement("script");
		let tag_ytapi = document.createElement("script");

		tag_func1.classList.add(class_name);
		tag_func2.classList.add(class_name);
		tag_func3.classList.add(class_name);
		tag_func4.classList.add(class_name);
		tag_ytapi.classList.add(class_name);

		tag_func1.innerHTML = onYouTubeIframeAPIReady.toString();
		tag_func2.innerHTML = onPlayerReady.toString();
		tag_func3.innerHTML = onPlayerStateChange.toString();
		tag_func4.innerHTML = redirectpage.toString();
		tag_ytapi.src = "https://www.youtube.com/iframe_api";

		if (script_tag && script_tag.parentNode) {
			script_tag.parentNode.insertBefore(tag_func1, script_tag);
			script_tag.parentNode.insertBefore(tag_func2, script_tag);
			script_tag.parentNode.insertBefore(tag_func3, script_tag);
			script_tag.parentNode.insertBefore(tag_func4, script_tag);
			script_tag.parentNode.insertBefore(tag_ytapi, script_tag);
		};
	}, []);

	function reload(e: any) {
		e.preventDefault();
		location.reload();
	};

	return (
		<div className={style.movie_page}>
			<div className={style.title}>
				{first && (<h2 className="is-size-3">ラジオ体操第一</h2>)}
				{second && (<h2 className="is-size-3">ラジオ体操第二</h2>)}
				{both && (<h2 className="is-size-3">ラジオ体操第一 ・ ラジオ体操第二</h2>)}
			</div>
			<div id="player"></div>
			<script id="mark_script"></script>
			<p>自動再生がされない場合は、再生ボタンを押してください</p>
			<button className="button is-primary m-5" onClick={reload}>動画が<strong>表示されない場合</strong>はこちら</button>
		</div>
	);
};

export default Movie;