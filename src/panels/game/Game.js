import React, {useState} from 'react';

import { Panel} from '@vkontakte/vkui';
import { Col, Container, Row } from 'react-bootstrap'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import bridge from "@vkontakte/vk-bridge";

import './Game.css';
import coin_o from '../../img/coin_o.png'
import coin_p from '../../img/coin_p.png'
import one_line from '../../img/one_line.png'
import two_line from '../../img/two_line.png'
import empty_line from '../../img/empty_line.png'

import data from '../../data/data.json'


const Game = ({nav, id}) => {

    const routeNavigator = useRouteNavigator();

    const [currentIndex, setCurrentIndex] = useState(5);
    const [coins, setCoins] = useState(['heads', 'heads', 'heads']);
    const [lines, setLines] = useState(['empty_line', 'empty_line', 'empty_line', 'empty_line', 'empty_line', 'empty_line'])
    const [result, setResult] = useState(false)
    const [resultText, setResultText] = useState("")

    const showResult = () => {
        setResult(true)
        setCurrentIndex(currentIndex - 1);
        setResultText(data[lines.join(", ")])
    }

    const flipCoins = () => {
        const newCoins = coins.map(() => (Math.random() < 0.5 ? 'heads' : 'tails'));
        setCoins(newCoins);
    
        const headsCount = newCoins.filter((coin) => coin === 'heads').length;
        const tailsCount = newCoins.length - headsCount;

        setLines(lines => {
            const newLines = [...lines];
            newLines[currentIndex] = headsCount > tailsCount ? 'solid' : 'dashed';
            return newLines;
        });

        setCurrentIndex(currentIndex - 1);
    };

    const wallPosting = () => {

        bridge.send("VKWebAppShowWallPostBox", {
            message: resultText,
            attachments: 'https://vk.com/app51876075',
        })
        .then((data) => {
            console.log("WALL POSTING DATA", data)
        })
        .catch( (error) => {
            if (error.error_data.error_reason === 'Access to adding post denied') {
                AllowNotifications()
            }
            console.error("WALL POSTING ERROR", error)
        });
    }

    const AllowNotifications = () => {
        bridge.send('VKWebAppAllowNotifications')
        .then((data) => { 
            if (data.result) {
                console.log("ALLOW NOTIFICATIONS DATA", data.result);
            } else {
                console.log("ALLOW NOTIFICATIONS DATA ERROR");
            }
        })
        .catch((error) => {
            console.log("ALLOW NOTIFICATIONS ERROR", error);
        });
    }
    
    return (
        <Panel nav={nav} id={id}>
            <div id="TriangleTopLeft"></div>
			<div id="TriangleBottomRight"></div>
			<Container fluid className="Game">
				<Row>
                    <Col className='ResultBoxMob' xs={6} sm={3} md={3}>
                        {lines.map((image, index) => (
                            <div key={index}>
                            {image === 'empty_line'&&
                                <img src={empty_line} alt={image} />
                            }
                            {image === 'solid'&&
                                <img src={one_line} alt={image} />
                            }
                            {image === 'dashed'&&
                                <img src={two_line} alt={image} />
                            }
                            </div>
                        ))}
                    </Col>
					<Col className="GameBox" xs={12} sm={9} md={9}>
                        <Row>
                        {result &&
                            <Col className="ResultText">
                                <p>{resultText}</p>
                            </Col>
                        }
                        {!result &&
                            coins.map((coin, index) => (
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <img key={index} src={coin === 'heads' ? coin_o : coin_p} alt={coin} />
                                </Col>
                            ))
                        }
                        </Row>
                    </Col>
					<Col className="ButtonBlock" xs={10} sm={8} md={6} lg={6} xl={6} xxl={6}>
                    {currentIndex >= 0 &&
                        <button onClick={flipCoins}>Бросить монетки</button>
                    }
                    {currentIndex === -1 &&
                        <button onClick={showResult}>Узнать результат</button>
                    }
                    {currentIndex === -2 &&
                        <div className='FinalButtons'>
                            <button id="GoHome" onClick={() => routeNavigator.push('/')}>На главную</button>
                            <button id="RePost" onClick={wallPosting}>Добавить к себе</button>
                        </div>
                    }
					</Col>
				</Row>
			</Container>
		</Panel>
    )

}

export default Game;