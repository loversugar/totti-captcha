let currentCaptchaId = null;
$(function () {
    clearAllPreventDefault($(".slider"));
    refreshCaptcha();
})

$("#slider-move-btn").mousedown(down);
$("#slider-move-btn").on("touchstart", down);

$("#slider-close-btn").click(() => {
});

$("#slider-refresh-btn").click(() => {
    refreshCaptcha();
});

function valid(captchaConfig) {

    let data = {
        'id' : currentCaptchaId,
        'captchaTrack': {
            bgImageWidth: captchaConfig.bgImageWidth,
            bgImageHeight: captchaConfig.bgImageHeight,
            sliderImageWidth: captchaConfig.sliderImageWidth,
            sliderImageHeight: captchaConfig.sliderImageHeight,
            startSlidingTime: captchaConfig.startTime,
            endSlidingTime: captchaConfig.stopTime,
            trackList: captchaConfig.trackArr
        }
    }

    $.ajax({
        type:"POST",
        url:"http://localhost:8080/check",
        contentType: "application/json",
        dataType:"json",
        data:JSON.stringify(data),
        success:function (res) {
            if (res) {
                alert("验证成功!!!");
            }
            refreshCaptcha();
        }
    })
}

function refreshCaptcha() {
    $.get("http://localhost:8080/get", function (data) {
        reset();
        currentCaptchaId = data.id;
        const bgImg = $("#bg-img");
        const sliderImg = $("#slider-img");
        bgImg.attr("src", data.captcha.backgroundImage);
        sliderImg.attr("src", data.captcha.templateImage);
        initConfig(bgImg.width(), bgImg.height(), sliderImg.width(), sliderImg.height(), 206);
    })
}

function doDown() {
    $("#slider-move-btn").css("background-position", "-5px 31.0092%")
}

function doMove(currentCaptchaConfig) {
    const moveX = currentCaptchaConfig.moveX;
    $("#slider-move-btn").css("transform", "translate(" + moveX + "px, 0px)")
    $("#slider-img-div").css("transform", "translate(" + moveX + "px, 0px)")
}
function reset() {
    $("#slider-move-btn").css("background-position", "-5px 11.79625%")
    $("#slider-move-btn").css("transform", "translate(0px, 0px)")
    $("#slider-img-div").css("transform", "translate(0px, 0px)")
    currentCaptchaId = null;
}
