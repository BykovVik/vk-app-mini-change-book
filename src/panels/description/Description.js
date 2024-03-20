import React from 'react';
import { Col, Container, Row } from 'react-bootstrap'
import { Panel } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

import './Description.css'
import logo from '../../img/klipartz_white.png'


const Description = ({nav, id}) => {

	const routeNavigator = useRouteNavigator();

	return (
		<Panel nav={nav} id={id}>
			<Container fluid className="Description">
				<Row>
					<div id="TriangleTopLeft"></div>
					<div id="TriangleBottomRight"></div>
					<Col className="TextBox" xs={11} sm={11} md={11} lg={10} xl={10} xxl={10}>
						<div className="TextWrap">
							<p>При помощи данного приложения вы можете гадать по Книге Перемен самостоятельно, бросив виртуальные монеты. В Китае способ броска монет с древности является самым распространенным. Для того чтобы начать гадание, нажмите кнопку "Начать гадание". Сосредоточьтесь на своем вопросе, затем нажимайте кнопку "Бросить монеты". Если выпадет больше черных (две или три), приложение нарисует непрерывную линию (янь); если больше белых – прерванную посередине линию (инь). Монеты следует бросить 6 раз, при этом каждая новая линия отрисовывается над предыдущей. В результате гадания у вас получится гексаграмма – 6 черт. У каждой из гексаграмм свое значение, которое вы можете узнать, нажав кнопку "Узнать результат".</p>
						</div>		
					</Col>
					<Col className="ReturnButton" xs={8} sm={10} md={6} lg={6} xl={6} xxl={6}>
						<button onClick={() => routeNavigator.push('/')}>
							<img src={logo}/> 
							На главную
						</button>
					</Col>
				</Row>
			</Container>
		</Panel>
	);
}

export default Description;