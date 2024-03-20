import React from 'react';
import PropTypes from 'prop-types';

import { Panel } from '@vkontakte/vkui';
import { Col, Container, Row } from 'react-bootstrap'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { parseURLSearchParamsForGetLaunchParams } from '@vkontakte/vk-bridge';

import './Home.css';
import title from '../../img/title.png'
import logo from '../../img/klipartz_white.png'
import geek from '../../img/geek.png'
import gypsy from '../../img/gypsy_studio.png'


const Home = ({ nav, id, fetchedUser }) => {

	const routeNavigator = useRouteNavigator();
	const { vk_platform } = parseURLSearchParamsForGetLaunchParams(window.location.search);

	//PLATFORMS: mobile_web, desktop_web, mobile_android, mobile_iphone, mobile_ipad
	
	return (
		<Panel nav={nav} id={id}>
			<Container fluid className='Home'>
				<Row>
					<div id="TriangleTopLeft"></div>
					<div id="TriangleBottomRight"></div>
					{fetchedUser && vk_platform === "desktop_web" &&
					<Col className="UserInfo" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
						<div>
							<img src={logo} width={64} height={64}/>
						</div>
						<div className='UserGreeting'>
							<p>Приветствую тебя,<span>{`${fetchedUser.first_name} ${fetchedUser.last_name}`}.</span> Добро пожаловать в "Книгу Перемнен". Поддержите наши сообщества, кликнув на одно изображение ниже, если вас заинтересовала тематика. </p>
						</div>
					</Col>
					}
					<Col className='Title' xs={12} md={8} lg={10}>
						<img src={title}/>
					</Col>
					<Col className="ButtonBox" xs={10} sm={8} md={6} lg={6} xl={6} xxl={6}>
						<div className="ButtonWrap">
							<button onClick={() => routeNavigator.push('/game')}>Начать гадание</button>
						</div>
						<div className="ButtonWrap">
							<button onClick={() => routeNavigator.push('/description')}>Инструкция по применению</button>
						</div>
					</Col>
					{vk_platform === "desktop_web" &&
					<Col className="BottomInfo" xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
						<div className='BottomInfoItem'>
							<a href='https://vk.com/this_is_for_geeks' target="_blank"><img src={geek}/></a>
						</div>
						<div className='BottomInfoItem'>
							<a href='https://vk.com/this_is_for_indie_developers' target="_blank"><img src={gypsy}/></a>
						</div>
					</Col>
					}
				</Row>
			</Container>
		</Panel>
	);
}
Home.propTypes = {
	id: PropTypes.string.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
