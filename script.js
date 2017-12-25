(function (window, document) {
	var WIDTH = 875;
	var HEIGHT = 166;
	var MAXNUM = 14;
	var STEP = 39.5;
	var KAPPA = .5522848;
	var MARGIN_LEFT = 35;
	var STEPS = {
		FIRST_PARAM: 0,
		SECOND_PARAM: 1,
		SUM_PARAM: 2,
		DONE: 3
	};

	var firstInput = document.getElementById('firstInput');
	var secondInput = document.getElementById('secondInput');
	var firstSpan = document.getElementById('firstSpan');
	var secondSpan = document.getElementById('secondSpan');
	var sumInput = document.getElementById('sumInput');
	var textScreen = document.getElementById('text');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var sprite = new Image();
	var step = STEPS.FIRST_PARAM;
	var a = getRandomInt(6, 9);
	var b = getRandomInt(2, 8);
	var sum = a + b;

	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	sprite.src = './assets/sprite.png';
	sprite.onload = init;
	firstInput.addEventListener('change', checkInputs(a));
	secondInput.addEventListener('change', checkInputs(b));
	sumInput.addEventListener('change', checkInputs(sum));

	function getRandomInt(min, max) {
		var random = min - 0.5 + Math.random() * (max - min + 1);

		return Math.round(random);
	}

	function init() {
		render();
		renderStep()
	}

	function scoreBoard(a, b, sum) {
		var pattern = [a, '+', b, '=', sum];
		var result = pattern
			.map(function (v) {
				return v || '?';
			})
			.join(' ');

		textScreen.innerText = result;
	}

	function render() {
		context.clearRect(0, 0, WIDTH, HEIGHT);
		context.drawImage(sprite, 0, HEIGHT / 2, WIDTH, HEIGHT / 2);
	}

	function renderStep() {
		switch (step) {
			case STEPS.FIRST_PARAM:
				drawArrow(0, a);
				firstInput.style.display = 'block';
				firstInput.style.left = firstSpan.style.left = MARGIN_LEFT + (a / 2 * STEP) - 15 + 'px';
				break;

			case STEPS.SECOND_PARAM:
				scoreBoard(a);
				drawArrow(a, b);
				secondInput.style.display = 'block';
				secondInput.style.left = secondSpan.style.left = MARGIN_LEFT + (a * STEP) + (b / 2 * STEP) - 15 + 'px';
				firstInput.style.display = 'none';
				firstSpan.style.display = 'block';
				break;

			case STEPS.SUM_PARAM:
				scoreBoard(a, b);
				secondInput.style.display = 'none';
				secondSpan.style.display = 'block';
				sumInput.style.display = 'block';
				break;

			case STEPS.DONE:
				scoreBoard(a, b, sum);
				sumInput.style.display = 'none';
				break;

			default:
				break
		}

	}

	function checkInputs(expectedValue) {
		return function (event) {
			var value = parseInt(event.target.value, 10);
			if (value === expectedValue) {
				step++;
				renderStep();
			} else {
				event.target.style.borderColor = 'red';
			}
		}
	}

	function drawArrow(start, end) {
		start = start || 0;
		end = Math.min(end, MAXNUM);

		var x = MARGIN_LEFT + STEP * start;
		var y = HEIGHT / 4 + 10;
		var w = MARGIN_LEFT + STEP * (end - 1);
		var h = HEIGHT / 2;
		var ox = (w / 2) * KAPPA;
		var oy = (h / 2) * KAPPA;
		var xe = x + w;
		var xm = x + w / 2;
		var ym = y + h / 2;
		var headlen = 10;
		var angle = Math.atan2(5, 1);

		context.strokeStyle = 'red';
		context.beginPath();
		context.moveTo(x, ym);
		context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
		context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
		context.stroke();

		context.moveTo(xm, ym);
		context.beginPath();
		context.lineTo(xe, ym);
		context.lineTo(xe - headlen * Math.cos(angle - Math.PI / 6), ym - headlen * Math.sin(angle - Math.PI / 6));
		context.moveTo(xe, ym);
		context.lineTo(xe - headlen * Math.cos(angle + Math.PI / 6), ym - headlen * Math.sin(angle + Math.PI / 6));
		context.stroke();

	}


})(window, document);