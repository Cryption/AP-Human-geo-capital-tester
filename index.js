           var question = "What is the capital of {0}?";
            var terms = [
                {
                    term: "Afghanistan",
                    definition: "Kabul"
                }, {
                    term: "Australia",
                    definition: "Canberra"
                }, {
                    term: "Brazil",
                    definition: "Brasilia"
                }, {
                    term: "China",
                    definition: "Beijing"
                }, {
                    term: "Cote D'lvoire",
                    definition: "Yamoussoukro"
                }, {
                    term: "Cuba",
                    definition: "Havana"
                }, {
                    term: "Democratic Republic Of Congo",
                    definition: "Kinshasa"
                }, {
                    term: "Dominican Republic",
                    definition: "Santo Domingo"
                }, {
                    term: "Egypt",
                    definition: "Cairo"
                }, {
                    term: "Ethiopia",
                    definition: "Addis Ababa"
                }, {
                    term: "France",
                    definition: "Paris"
                }, {
                    term: "Germany",
                    definition: "Berlin"
                }, {
                    term: "Greece",
                    definition: "Athens"
                }, {
                    term: "Guatemala",
                    definition: "Guatemala City"
                }, {
                    term: "Haiti",
                    definition: "Port-au-Prince"
                }, {
                    term: "India",
                    definition: "New Delhi"
                }, {
                    term: "Indonesia",
                    definition: "Jakarta"
                }, {
                    term: "Iran",
                    definition: "Tehran"
                }, {
                    term: "Iraq",
                    definition: "Baghdad"
                }, {
                    term: "Ireland",
                    definition: "Dublin"
                }, {
                    term: "Japan",
                    definition: "Tokyo"
                }, {
                    term: "Libya",
                    definition: "Tripol"
                }, {
                    term: "Malaysia",
                    definition: "Kuala Lumpur"
                }, {
                    term: "Morocco",
                    definition: "Rabat"
                }, {
                    term: "North Korea",
                    definition: "Pyongyang"
                }, {
                    term: "Pakistan",
                    definition: "Islamabad"
                }, {
                    term: "Papua New Guinea",
                    definition: "Port Moresby"
                }, {
                    term: "Peru",
                    definition: "Lima"
                }, {
                    term: "Philippines",
                    definition: "Manila"
                }, {
                    term: "Russia",
                    definition: "Moscow"
                }, {
                    term: "Sierre Leone",
                    definition: "Freetown"
                }, {
                    term: "South Korea",
                    definition: "Seoul"
                }, {
                    term: "Spain",
                    definition: "Madrid"
                }, {
                    term: "Syria",
                    definition: "Damascus"
                }, {
                    term: "Thailand",
                    definition: "Bangkok"
                }, {
                    term: "Tunisia",
                    definition: "Tunis"
                }, {
                    term: "Turkey",
                    definition: "Ankara"
                }, {
                    term: "Ukraine",
                    definition: "Kiev"
                }, {
                    term: "Venezuela",
                    definition: "Caracas"
                }, {
                    term: "Yemen",
                    definition: "Sana'a"
                }
            ];

            var questions = [];
            var currentQuestion = {};

            for (var i = 0; i < terms.length; i++) {
                var t = terms[i];
                questions.push({
                    question: question.format(t.term),
                    answer: t.definition.toLowerCase(),
                    difficulty: 0.6
                });
            }

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
           function setDifficulty(var diff) {
           		for (var i = 0; i < terms.length; i++) {
                	var t = terms[i];
                	questions.push({
                   		question: question.format(t.term),
                    	answer: t.definition.toLowerCase(),
                    	difficulty: diff
                	});
           		}          
           }
            function showQuestion() {
                if (questions.length == 0) {
                    $(".mid h1").text("ur done");
                    $(".mid span").parent().width(60 * ("congrats").length);
                    $(".mid span").text("congrats");
                    $(".mid input").val('');
                    $(".mid input").toggle();
                    $(".mid span").animate({
                        color: "#D3D3D3"
                    }, 100);
                }

                currentQuestion = questions.shift();

                $(".mid span").parent().width(60 * currentQuestion.answer.length);
                $(".mid h1").text(currentQuestion.question);
                $(".mid span").text(maskPhrase(currentQuestion.answer, currentQuestion.difficulty));
                $(".mid input").val('');
                $(".mid span").animate({
                    color: "#D3D3D3"
                }, 100);
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

            showQuestion();

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
