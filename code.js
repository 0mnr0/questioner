function getRandomLightColor(min = 200, max = 255) {
    // Генерируем случайные значения RGB в заданном диапазоне
    const r = Math.floor(Math.random() * (max - min + 1)) + min;
    const g = Math.floor(Math.random() * (max - min + 1)) + min;
    const b = Math.floor(Math.random() * (max - min + 1)) + min;
    return `rgb(${r}, ${g}, ${b})`;
}

function getAdjacentColor(baseColor, variation = 20, min = 200, max = 255) {
    const rgb = baseColor.match(/\d+/g).map(Number);
    const newR = Math.min(max, Math.max(min, rgb[0] + Math.floor(Math.random() * variation * 2) - variation));
    const newG = Math.min(max, Math.max(min, rgb[1] + Math.floor(Math.random() * variation * 2) - variation));
    const newB = Math.min(max, Math.max(min, rgb[2] + Math.floor(Math.random() * variation * 2) - variation));
    return `rgb(${newR}, ${newG}, ${newB})`;
}


const Questions = {
	0: {
		'question': "Кто, где, когда?",
		'awnsers': {
			0: 'Хз',
			1: 'Я чё, знаю чтоли?',
			2: 'Никто, нигде и никогда',
			3: 'Без понятия'
		},
		correct: 2
	},
	1: {
		'question': "Вовчик?",
		'awnsers': {
			0: 'Гений',
			1: 'Не лох',
			2: 'Вовчик слазиет',
			3: 'Лошпед в квадрате'
		},
		correct: 3
	}
}




const ShowGameElements = function(){
	document.querySelectorAll('div.startLogo').forEach(logoGame => {logoGame.style.display='none'})
	document.querySelectorAll('.startLogotype').forEach(logoGame => {logoGame.style.display='none'})
	document.querySelectorAll('.GameWindow').forEach(game => {game.style.display='block'})
}


const LaunchStartAnimation = function(){
	let i = 0;
	document.querySelectorAll('.startLogotype').forEach(logoGame => {
		setTimeout(function(){logoGame.style.opacity = '0';}, i*80)
		i+=1
	})
	setTimeout(function(){
		document.body.style.filter = 'brightness(0)'
		setTimeout(function(){document.body.style.filter = '';}, i+600)
		
	},(i*80)-200)
	setTimeout(function(){
		ShowGameElements()
	}, i*80)
}

window.addEventListener('load', function(){
	
	const GameCounters = {
		SucsessfulPoints: 0,
		FailedPoints: 0,
		totalPoints: 0,
		
		
		reset: function(){
			SucsessfulPoints = 0;
			FailedPoints = 0;
		},
		correctAwnser: function(){
			totalPoints += 1;
			SucsessfulPoints = SucsessfulPoints + 1;
		},
		wrongAwnser: function(){
			totalPoints += 1;
			FailedPoints = FailedPoints + 1;
		}
	}
	
	let GameIsPlaying = false;
	let currentQuestion = -1;// -1 is starting game
	
	function ChangeBackgroundToRandom(){
		let color1 = getRandomLightColor(130, 160);
		let color2 = getAdjacentColor(color1, 300, 130, 160);
		let bg = document.querySelector('div.background')
		if (bg){
			bg.style.background='linear-gradient(230deg, '+color1+','+color2+')'
		}
	}
	
	ChangeBackgroundToRandom()
	
	let startButton = document.querySelector('.Game button.startGame')
	if (startButton) {
		startButton.addEventListener('click', function(){
			if (GameIsPlaying) {alert("Игра уже запущена!"); return}
			GameIsPlaying = true;
			LaunchStartAnimation()
			setTimeout(ChangeBackgroundToRandom, 200)
			setTimeout(nextQuestion, 200)
		})
	}
	
	
	function nextQuestion(){
		document.querySelector('div.Game div.GameWindow div.PossibleAwnsers').style=''
		let awnserClicked = false;
		let correctButton = null;
		
		currentQuestion += 1;
		let thisQuestion = Questions[currentQuestion];
		if (thisQuestion === undefined) {GameResults()}
		
		let awnserTitle = document.querySelector('div.GameWindow span#QuestionText');
		let possibleAwnsers = document.querySelector('div.Game div.GameWindow div.PossibleAwnsers #list') || document.getElementById('list');
		possibleAwnsers.innerHeight = '';
		document.querySelectorAll('button.possibleVariant').forEach(btn => {btn.remove()})
		
		for (let key in thisQuestion.awnsers){
			let Text = thisQuestion.awnsers[key];
			awnserTitle.textContent = thisQuestion.question
			let ButtonToChoose = document.createElement('button')
			ButtonToChoose.textContent = Text;
			ButtonToChoose.className='possibleVariant'
			possibleAwnsers.appendChild(ButtonToChoose)
			if (key == thisQuestion.correct) {correctButton = ButtonToChoose;}
			
			function SpawnGotoNextQuestion(){
				let NextQ = document.createElement('button')
				NextQ.textContent = "Следующий вопрос";
				NextQ.className='possibleVariant next'
				NextQ.style='margin-bottom: 0px; padding: 0px; border: solid 2px transparent; height: 0px; overflow: hidden'
				possibleAwnsers.prepend(NextQ)
				possibleAwnsers.style='overflow: hidden'
				
				setTimeout(function(){NextQ.style='overflow: hidden'; possibleAwnsers.style=''}, 10)
				NextQ.addEventListener('click', function(){
					nextQuestion()
				})
			}
			
			function showCorrect(){
				console.log(correctButton)
				if (correctButton) {
					correctButton.classList.add('rightChoosed')
				}
			}
			
			ButtonToChoose.addEventListener('click', function(){
				if (awnserClicked) {return}
				awnserClicked = true;
				
				if (key == thisQuestion.correct){
					ButtonToChoose.classList.add('rightChoosed')
				} else {
					ButtonToChoose.classList.add('wrongChoosed')
				}
				setTimeout(showCorrect, 1200)
				setTimeout(SpawnGotoNextQuestion, 500)
			})
			
			
		}
	}
	
	window.nextQuestion = function(){nextQuestion()}
	
	
	
	
	const GameResults = function(){
		document.querySelector('div.Game div.GameWindow div.PossibleAwnsers').style='height: 0px;  margin-top: 0px; margin-bottom: 0px'
		setTimeout(function(){
			document.querySelector('div.Game div.GameWindow div.PossibleAwnsers span').textContent='Немного не успел, но тут будут результаты'
		}, 300)
	}
	
	
})

