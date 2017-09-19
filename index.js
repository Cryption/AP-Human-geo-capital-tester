            var questions = [];
            var currentQuestion = {};
            function maskPhrase(word, percent) {
                var r = "";
                for (var i = 0; i < word.length; i++) {
                    if (Math.random() < percent) {
                        r += '_';
                    } else {
                        r += word[i];
                    }
                }

                return r;
            }
            function showQuestion() {
                if (questions.length == 0) {
                    $(".mid h1").text("ur done");
                    $(".mid span").parent().width(60 * ("congrats").length);
                    $(".mid span").text("congrats");
                    $(".mid input").val('');
                    $(".mid input").show();
                    $(".mid span").animate({
                        color: "#D3D3D3"
                    }, 100);
                }

                currentQuestion = questions.shift();
                try{
                    $(".mid span").parent().width(60 * currentQuestion.answer.length);
                    $(".mid h1").text(currentQuestion.question);
                    $(".mid span").text(maskPhrase(currentQuestion.answer, currentQuestion.difficulty));
                    $(".mid input").val('');
                    $(".mid span").animate({
                        color: "#D3D3D3"
                    }, 100);
                } catch(e) {
                   $('#new-terms').modal('open');
               }
           }

           function endQuestion() {
            $('.mid input').toggle();
            $('.mid input').focus();

            var txt = $(".mid input").val();

            if (txt.toLowerCase() == currentQuestion.answer.toLowerCase()) {
                currentQuestion.difficulty += 0.2;

                if (currentQuestion.difficulty <= 1.4) {
                    questions.push(currentQuestion);
                }
            } else {
                currentQuestion.difficulty -= 0.2;
                questions.unshift(currentQuestion);
            }

            showQuestion();
        }


        $(".mid input").keyup(function (e) {
            var txt = $(e.target).val();
            
            if (txt.length >= currentQuestion.answer.length) {
                if (txt.toLowerCase() == currentQuestion.answer.toLowerCase()) {
                    $(e.target).toggle();

                    $(".mid span").animate({
                        color: "green"
                    }, 200);

                    setTimeout(endQuestion, 400);
                } else {
                    $(e.target).toggle();

                    $(".mid span").text(currentQuestion.answer);
                    $(".mid span").animate({
                        color: "red"
                    }, 200);

                    setTimeout(endQuestion, 1500);
                }
            }
        });
        function setDifficulty(diff) {
          questions = [];
          currentQuestion = {};
          for (var i = 0; i < terms.length; i++) {
             var t = terms[i];
             questions.push({
                question: question.format(t.term),
                answer: t.definition.toLowerCase(),
                difficulty: diff
            });
         }
         showQuestion();
     }
     setDifficulty(0.0);

