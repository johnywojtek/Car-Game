document.addEventListener("DOMContentLoaded", function() {
    //creating variables

    var anim_id;
    var container = document.querySelector("#container");
    var car = document.querySelector("#car");
    car.style.left = "100px";

    car.style.top = "500px";
    var score_div = document.querySelector("#score_div");
    var car_1 = document.querySelector("#car_1");
    var car_2 = document.querySelector("#car_2");
    var car_3 = document.querySelector("#car_3");
    var line_1 = document.querySelector("#line_1");
    var line_2 = document.querySelector("#line_2");
    var line_3 = document.querySelector("#line_3");
    var restart_div = document.querySelector("#restart_div");
    var restart_btn = document.querySelector("#restart");
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
    // Move cars

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

    //creating functions that's are need to move car
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

        score.innerText = score_counter;
        if (score_counter >= 200) {
            score_div.style.backgroundColor = "#FFFFCC";
        }
        if (score_counter >= 400) {
            score_div.style.backgroundColor = "#FFEDA0";
        }
        if (score_counter >= 600) {
            score_div.style.backgroundColor = "#FED976";
        }
        if (score_counter >= 800) {
            score_div.style.backgroundColor = "#FEB24C";
        }
        if (score_counter >= 1000) {
            score_div.style.backgroundColor = "#FD8D3C";
        }
        if (score_counter >= 1200) {
            score_div.style.backgroundColor = "#FC4E2A";
        }
        if (score_counter >= 1400) {
            score_div.style.backgroundColor = "#E31A1C";
        }
        if (score_counter >= 1600) {
            score_div.style.backgroundColor = "#BD0026";
        }
        if (score_counter >= 1800) {
            score_div.style.backgroundColor = "#800026";
        }
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
    restart_btn.addEventListener("click", function() {
        location.reload();
    });

    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        restart_div.style.display = "block";
        document.addEventListener("keypress", function(e) {
            var key = e.which || e.keyCode;
            if (key === 13) {
                location.reload();
            }
        });
    }

    /* ------------------------------GAME CODE ENDS HERE------------------------------------------- */

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
