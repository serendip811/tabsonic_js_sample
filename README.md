# Tabsonic Sample JS

브라우져에서 구동가능한 html5 게임을 만들고자, 실습형태로 진행합니다. [PixiJS](http://www.pixijs.com/)엔진을 사용했으며 음악과 관련한 부분은 [HOWLER JS](https://howlerjs.com/)를 사용하였습니다. 구현 가능성만을 확인하고자 작성하였으므로, 완성도가 낮고 코드 또한 더럽습니다.

## 참조
* PixiJS - [공식홈페이지](http://www.pixijs.com/)와 [깃헙페이지](https://github.com/pixijs/pixi.js)에서 다운로드하거나 설치할 수 있습니다. [샘플페이지](http://pixijs.github.io/examples)와 [공식문서](http://pixijs.download/release/docs/index.html)를 참고하였습니다.
* HOWLER JS - [HOWLER JS](https://howlerjs.com)에서 다운로드하거나 설치할 수 있습니다. [깃헙페이지](https://github.com/goldfire/howler.js#documentation)를 간단히 참고하였습니다.

## 설명
* A,S,D,F,H,J,K,L 키를 입력하여 건반을 치게 됩니다.
* json형태로 정의된 악보(?)를 읽어서 시간에 따라 음악을 플레이하고 새로운 건반을 내려보냅니다. 물론 악보를 작성하는 노가다가 필요합니다. (편의상 20초 가량만 작성하였습니다.)