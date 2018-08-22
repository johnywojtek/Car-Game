function car_down(car) {
    var car_current_top = car.offsetTop;
    console.log(car.offsetTop);
    console.log(container_height);

    if (car_current_top > container_height) {
        car_current_top -= 200;
        var car_left = parseInt(Math.random() * (container_width - car_width));

        car.style.left = car_left;
    }
    car.style.top = car_current_top + speed;
}

function line_down(line) {
    var line_current_top = line.offsetTop;
    if (line_current_top > container_height) {
        line_current_top = -300;
    }
    line.style.top = line_current_top + line_speed;
}

restart_btn.click(function() {
    location.reload();
});

function stop_the_game() {
    game_over = true;
    cancelAnimationFrame(anim_id);
    cancelAnimationFrame(move_right);
    cancelAnimationFrame(move_left);
    cancelAnimationFrame(move_up);
    cancelAnimationFrame(move_down);
    restart_div.style.diplay = "block";
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
