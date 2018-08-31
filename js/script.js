document.addEventListener("DOMContentLoaded", function() {
    var page = 1;
    //FireBase config
    if (page === 1) {
        var config = {
            apiKey: "AIzaSyC1P4-HtTDMf1K5Mm3VUxRmvaAEByTcr1E",
            authDomain: "race-game-33c65.firebaseapp.com",
            databaseURL: "https://race-game-33c65.firebaseio.com",
            projectId: "race-game-33c65",
            storageBucket: "race-game-33c65.appspot.com",
            messagingSenderId: "1041217120872"
        };
        firebase.initializeApp(config);
        var database = firebase.database();

        var ref = database.ref("scores");

        ref.orderByChild("score").on("value", gotData, errData);

        function gotData(data) {
            let sorted = [];

            data.forEach(function(child) {
                sorted.push(child.val());
            });
            let poSorted = sorted.reverse();

            var counter = 0;

            var counterList = 0;
            for (var key in poSorted) {
                counterList++;
                counter++;
                if (counterList <= 10) {
                    var playerName = poSorted[key].name;
                    var playerScore = poSorted[key].score;
                    var table = document.querySelector("tbody");
                    var tr = document.createElement("tr");
                    table.appendChild(tr);
                    var td1 = document.createElement("td");
                    td1.className = "td1";
                    var td2 = document.createElement("td");
                    td2.className = "td2";
                    var td3 = document.createElement("td");
                    td3.className = "td3";

                    if (counter == 1) {
                        td1.innerText = `${counter}st`;
                    } else if (counter == 2) {
                        td1.innerText = `${counter}nd`;
                    } else if (counter == 3) {
                        td1.innerText = `${counter}rd`;
                    } else {
                        td1.innerText = `${counter}th`;
                    }
                    tr.appendChild(td1);
                    td2.innerText = `${playerName}`;

                    tr.appendChild(td2);

                    td3.innerText = `${playerScore}`;
                    tr.appendChild(td3);
                } else {
                    return;
                }
            }
        }
    }
    function errData(err) {
        console.log("Errrorrr !!!");
        console.log(err);
    }

    // Document Object Model
    var anim_id;
    var container = document.querySelector("#container");
    var car = document.querySelector("#car");
    var busted = document.querySelector(".busted");
    car.style.left = "100px";
    car.style.top = "500px";
    var car_1 = document.querySelector("#car_1");
    var car_2 = document.querySelector("#car_2");
    var car_3 = document.querySelector("#car_3");
    var line_1 = document.querySelector("#line_1");
    var line_2 = document.querySelector("#line_2");
    var line_3 = document.querySelector("#line_3");
    var restart_div = document.querySelector("#restart_div");
    var restart_btn = document.querySelector("#restart");
    var inputName = document.querySelector(".inputName");
    var score = document.querySelector("#score");

    //creating initial setups

    var container_width = container.offsetWidth;
    var container_height = container.offsetHeight;
    var car_width = car.offsetWidth;
    var car_height = car.offsetHeight;

    //creating initial declarations

    var game_over = false;
    var score_counter = 1;
    var speed = 1;
    var line_speed = 3;
    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;
    // Move cars on key's

    document.addEventListener("keydown", e => {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37 && move_left === false) {
                move_left = requestAnimationFrame(left);
            } else if (key === 39 && move_right === false) {
                move_right = requestAnimationFrame(right);
            } else if (key === 38 && move_up === false) {
                move_up = requestAnimationFrame(up);
            } else if (key === 40 && move_down === false) {
                move_down = requestAnimationFrame(down);
            }
        }
    });
    document.addEventListener("keyup", e => {
        if (game_over === false) {
            var key = e.keyCode;
            if (key === 37) {
                cancelAnimationFrame(move_left);
                move_left = false;
            } else if (key === 39) {
                cancelAnimationFrame(move_right);
                move_right = false;
            } else if (key === 38) {
                cancelAnimationFrame(move_up);
                move_up = false;
            } else if (key === 40) {
                cancelAnimationFrame(move_down);
                move_down = false;
            }
        }
    });

    //creating functions that's move car
    function left() {
        if (game_over === false && parseInt(car.style.left) > 0) {
            car.style.left = `${parseInt(car.style.left) - 5}px`;
            move_left = requestAnimationFrame(left);
        }
    }

    function right() {
        if (
            game_over === false &&
            parseInt(car.style.left) < container_width - car_width
        ) {
            car.style.left = `${parseInt(car.style.left) + 5}px`;
            move_right = requestAnimationFrame(right);
        }
    }

    function up() {
        if (game_over === false && parseInt(car.style.top) > 0) {
            car.style.top = `${parseInt(car.style.top) - 3}px`;
            move_up = requestAnimationFrame(up);
        }
    }

    function down() {
        if (
            game_over === false &&
            parseInt(car.style.top) < container_height - car_height
        ) {
            car.style.top = `${parseInt(car.style.top) + 3}px`;

            move_down = requestAnimationFrame(down);
        }
    }
    /* Creating functions that move the cars and lines */
    anim_id = requestAnimationFrame(repeat);

    function repeat() {
        if (
            collision(car, car_1) ||
            collision(car, car_2) ||
            collision(car, car_3)
        ) {
            stop_the_game();
            return;
        }

        score_counter += 1;

        if (score_counter % 300 == 0) {
            speed++;
            line_speed++;
        }
        var accScore = Math.floor(score_counter / 10);
        score.innerText = accScore;

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);

        line_down(line_1, line_2, line_3);

        anim_id = requestAnimationFrame(repeat);
    }

    function car_down(car) {
        var car_current_top = car.offsetTop;
        var car_left = parseInt(Math.random() * (container_width - car_width));
        car_current_top += 3;

        if (car_current_top > container_height) {
            car_current_top = -20;
            car.style.left = `${car_left}px`;
        }
        car.style.top = `${car_current_top + speed}px`;
    }

    function line_down(line, line2, line3) {
        var line_current_top = line.offsetTop;
        var line_current_top2 = line2.offsetTop;
        var line_current_top3 = line3.offsetTop;
        line_current_top += 3;
        line_current_top2 += 3;
        line_current_top3 += 3;
        if (line_current_top > container_height) {
            line_current_top = -150;
        }
        if (line_current_top2 > container_height) {
            line_current_top2 = -150;
        }
        if (line_current_top3 > container_height) {
            line_current_top3 = -150;
        }

        line.style.top = `${line_current_top + line_speed}px`;
        line2.style.top = `${line_current_top2 + line_speed}px`;
        line3.style.top = `${line_current_top3 + line_speed}px`;
    }

    //clean list function
    function cleanList() {
        //clean list
        var accList = document.querySelectorAll(".accList");
        [...accList].map(e => {
            return e.parentElement.removeChild(e);
        });
    }
    function dataPush() {
        var data = {
            name: inputName.value,
            score: Number(score.innerText)
        };

        var database = firebase.database();
        var ref = database.ref("scores");

        location.reload();
        ref.push(data);
    }
    //event on restart_btn that restart the game and send data to firebase
    restart_btn.addEventListener("click", function() {
        if (inputName.value.length < 1 || inputName.value.length >= 15) {
            alert("Give me your name");
        } else {
            cleanList();
            dataPush();
            cleanList();
        }
    });

    function stop_the_game() {
        //clean animation
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        //make restart div and busted visible
        restart_div.style.display = "flex";
        busted.style.display = "block";

        //event on enter that restart the game and send data to firebase
        document.addEventListener("keypress", function(e) {
            cleanList();
            var key = e.which || e.keyCode;

            if (key === 13) {
                if (
                    inputName.value.length < 1 ||
                    inputName.value.length >= 15
                ) {
                    alert("Give me your name");
                } else {
                    cleanList();
                    dataPush();
                    cleanList();
                }
            }
        });

        //when you lost you can see your score
        document.querySelector(".yourScore").innerText = `Score: ${
            score.innerText
        }`;
    }
    page++;
    // colision algorithm

    function collision(car1, car2) {
        var x1 = car1.offsetLeft;
        var y1 = car1.offsetTop;
        var h1 = car1.offsetHeight;
        var w1 = car1.offsetWidth;
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = car2.offsetLeft;
        var y2 = car2.offsetTop;
        var h2 = car2.offsetHeight;
        var w2 = car2.offsetWidth;
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});
