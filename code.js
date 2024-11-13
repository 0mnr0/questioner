const Questions = {
	0: {
		'question': "Какое основное предназначение имела Государственная Дума?",
		'awnsers': {
			0: 'Представлять интересы населения и участвовать в законодательном процессе',
			1: 'Назначение на должность и освобождение от должности генерального прокурора РФ и его заместителей, зампредседателя Счетной палаты и половины состава ее аудиторов',
			2: 'Принятие законов, имеющих юридическую силу, регулирующих важнейшие общественные отношения и реализуемых в основном другими ветвями власти'
		},
		correct: 0
	},
	1: {
		'question': "Сколько созывов Государственной Думы было в период с 1906 по 1917 год?",
		'awnsers': {
			0: 'Четыре созыва',
			1: 'Два созыва',
			2: 'Пять созыва'
		},
		correct: 0
	},
	2: {
		'question': "Каковы были полномочия Государственной Думы?",
		'awnsers': {
			0: 'Назначение на должность и освобождение от должности Генерального прокурора РФ и заместителей Генерального прокурора РФ',
			1: 'Обсуждение и принятие законов, контроль над бюджетом, возможность выражать недоверие правительству',
			2: 'Принятие конституции и поправок к ней, а также устава субъекта РФ и поправок к нему'
		},
		correct: 1
	},
	3: {
		'question': "Какое событие привело к распуску Государственной Думы в 1917 году?",
		'awnsers': {
			0: 'Начала периода двоевластия',
			1: 'Октябрьская социалистическая революция',
			2: 'Февральская революция '
		},
		correct: 2
	}
}




function getRandomLightColor(min = 200, max = 255) {
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



const ShowGameElements = function(){
	document.querySelectorAll('div.startLogo').forEach(logoGame => {logoGame.style.display='none'})
	document.querySelectorAll('.startLogotype').forEach(logoGame => {logoGame.style.display='none'})
	document.querySelectorAll('.GameWindow').forEach(game => {game.classList.add('visible')})
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

