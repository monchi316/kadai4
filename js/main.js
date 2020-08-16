'use strict'
  let index = 0;
  const body = document.querySelector('body');
  const startBtn = document.getElementById('startBtn');
  const headMessage = document.getElementById('headMessage');
  const message = document.getElementById('message');
  const category = document.getElementById('category');
  const difficulty = document.getElementById('difficulty');
  const btnArea = document.getElementById('clickArea');
  const selectAnswer = [];
      startBtn.addEventListener('click', () => {
        message.innerHTML = "少々お待ち下さい";
        fetch('https://opentdb.com/api.php?amount=10').then(response => {
          return response.json()
          .then(jsonDate => {
          const question = jsonDate.results;
          const quizPage = new Quiz(question);
          quizPage.createPage(index);
        });
      });  
    })
    class Quiz {     
      constructor(question) {
        this.question = question;
      }
      // クイズ毎のページ書き換え              
      createPage (index) {
        btnArea.innerHTML = '';
        // 回答選択肢配列(不正解配列へ正答を入れる)
        const answers = this.question[index].incorrect_answers;
        answers.push(this.question[index].correct_answer);
        // 配列のシャッフル
        const shuffle = (arr) => {
          for (let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
            }
          return arr;
        };
        // 回答ボタンの生成
        const shuffledAnswers = shuffle(answers);
        shuffledAnswers.forEach((answer) => {
          const answerLi = document.createElement('li');
          const answerBtn = document.createElement('button');
          btnArea.appendChild(answerLi);
          answerLi.appendChild(answerBtn);
          answerBtn.id = 'answerBtn';
          answerBtn.innerHTML = answer;
          // 回答ボタンを押した時の処理
          answerBtn.addEventListener('click', () => {
          // 10問目の場合の処理
            if (index + 1 === 10 ) {
              headMessage.innerHTML = `あなたの正解数は${selectAnswer.length}です！！`;
              category.innerHTML = '';
              difficulty.innerHTML = '';
              message.innerHTML = '再度チャレンジしたい場合は以下をクリック！！';
              btnArea.innerHTML = '';
              const homeLi = document.createElement('li');
              const homeBtn = document.createElement('button');
              btnArea.appendChild(homeLi);
              homeLi.appendChild(homeBtn);
              homeBtn.innerHTML = 'ホームに戻る';
              homeBtn.addEventListener('click', () => {
                index = 0;
                selectAnswer.splice(0,selectAnswer.length);
                headMessage.innerHTML = 'ようこそ';
                message.innerHTML = '以下のボタンをクリック';
                btnArea.innerHTML = '';
                const startLi = document.createElement('li');
                btnArea.appendChild(startLi);
                startLi.appendChild(startBtn);
                })
            // 10問目までの処理
                } else if
                (answerBtn.innerHTML === this.question[index].correct_answer) {
                  selectAnswer.push(this.question[index].correct_answer); 
                  index++;
                  this.createPage(index);
                } else  {
                  index++;
                  this.createPage(index);
                }
            });
        });
        headMessage.innerHTML = `問題${index + 1}`;
        category.innerHTML = `【ジャンル】${this.question[index].category}`;
        difficulty.innerHTML = `【難易度】${this.question[index].difficulty}`;
        message.innerHTML = this.question[index].question;
        }
    }
        