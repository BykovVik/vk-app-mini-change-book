import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { RouterProvider, createHashRouter } from '@vkontakte/vk-mini-apps-router';

// Init VK Mini App
bridge.send("VKWebAppInit");

const router = createHashRouter([
	{
	  	path: '/',
	  	panel: 'home',
	  	view: 'default_view',
	},
	{
		path: '/description',
		panel: 'description',
		view: 'default_view',
	},
	{
		path: '/game',
		panel: 'game',
		view: 'default_view',
	},
]);

ReactDOM.render(
<RouterProvider router={router} notFoundRedirectPath="/">
    <App />
</RouterProvider>,
document.getElementById("root")
);
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
