import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useGetPanelForView } from '@vkontakte/vk-mini-apps-router';

import Home from './panels/home/Home';
import Description from './panels/description/Description';
import Game from './panels/game/Game';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
  	const activePanel = useGetPanelForView('default_view');

	useEffect(() => {
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout popout={popout}>
						<SplitCol>
							<View nav='default_view' activePanel={activePanel}>
								<Home nav='home' id='home' fetchedUser={fetchedUser}/>
								<Description nav='description' id='description'/>
								<Game nav='game' id='game'/>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
