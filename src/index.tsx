import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { render } from "react-dom";
import { CookiesProvider } from "react-cookie";

import Home from "./pages/home/home";
import Movie from "./pages/movie/movie";
import Result from "./pages/result/result";

import "../node_modules/bulma/bulma.sass";
import style from "./index.module.scss";

const index = document.getElementById("root");

function Index() {
    return (
        <div className={style.root}>
            <CookiesProvider>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/both-movie">
                        <Movie movie_type={3} />
                    </Route>
                    <Route path="/movie1">
                        <Movie movie_type={1} />
                    </Route>
                    <Route path="/movie2">
                        <Movie movie_type={2} />
                    </Route>
                    <Route path="/result">
                        <Result />
                    </Route>
                </Switch>
            </BrowserRouter>
            </CookiesProvider>
        </div>
    );
};

render(<Index />, index);