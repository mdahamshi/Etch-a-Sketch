const ETch = {
    choices_idx: {
        paper: 1, 
        rock: 0, 
        scissors: 2
    },
    container: {},
    grid_size: 16,
    turns: 5,
    winnerMat : {
        rock: {scissors: 'win', paper: 'lose', rock: 'draw'},
        paper: {rock: 'win', scissors: 'lose', paper: 'draw'},
        scissors: {paper: 'win', rock: 'lose', scissors: 'draw'}
    },
    
    choices: ['rock', 'paper', 'scissors'],
    humanScore: 0, computerScore: 0,
    
    getComputerChoice(){
        let rand = Math.floor(Math.random() * 3);
        return this.choices[rand];
    },

    getHumanChoice(){
        const userIn = prompt('Choose paper, rock, scissors').toLowerCase().trim();

        return userIn;
    },

    getResult(human, computer){
        return this.winnerMat[human][computer];
    },

    playRound(humanChoice, computerChoice){

        humanChoice = humanChoice.toLowerCase();
        if(! this.choices.includes(humanChoice)){
            console.error(`${humanChoice} is not a good input !`)
            return;
        }
        this.total_result.style.color = 'black';
        let res = this.getResult(humanChoice, computerChoice);
        if(res == 'win'){
            this.round_result.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
            this.round_result.style.color = 'green';
            this.humanScore++;
        }
        if(res == 'lose'){
            this.round_result.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
            this.round_result.style.color = 'red';
            this.computerScore++;
        }
        if(res == 'draw'){
            this.round_result.textContent = `Draw! both choosed ${humanChoice}`;
            this.round_result.style.color = 'orange';
        }
        this.total_result.textContent = 
        `You: ${this.humanScore}  Computer: ${this.computerScore}`;
        if(this.computerScore == this.turns || this.humanScore == this.turns){
            if(this.computerScore > this.humanScore){
                this.total_result.textContent = "You lost ! "
                this.total_result.style.color = 'red';
            }
            else {
                this.total_result.textContent = "You Won !"
                this.total_result.style.color = 'green';
            }
            this.humanScore = 0;
            this.computerScore = 0;
            
        }
        return;
    },
    getSquareSize(){
        let rec = this.container.getBoundingClientRect();
        let gsize = rec.width * rec.height;
        let sqaure_size = Math.floor(Math.sqrt(gsize / (this.grid_size * this.grid_size))) - 2;
        return sqaure_size + 'px';
    },
    getSquare(){
        const square = document.createElement('div');
        square.classList.add('sb-square');
        square.style.width = this.getSquareSize();
        square.style.height = this.getSquareSize();
        return square;
    },
    /**
     * Adds events and init score dom elements
     */
    init(){
        const container = document.querySelector('#container');
        this.container = container;
        let grid_size = this.grid_size;
        const square = this.getSquare();
        for(let i = 0; i < grid_size; i++)
            for(let j = 0; j < grid_size; j++)
                container.append(square.cloneNode());
        
        
        

        
    },

  
};

ETch.init();
exports = {
    ETch
};