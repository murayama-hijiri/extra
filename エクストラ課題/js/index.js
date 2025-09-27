// セクション2スクロール
$(function () {
    // テキスト切り替え
    const $area = $(".energy_drink_scroll_area");
    function scrollToInArea($target) {
        const top =
            $target.offset().top - $area.offset().top + $area.scrollTop();
        $area.stop().animate({ scrollTop: top }, 400);
    }
    // コンテンツ切り替え
    function fadeText(target, id) {
        $(".energy_drink_name").addClass("fade_out").removeClass("fade_in");
        scrollToInArea($(target));
        $(".energy_drink_name#" + id)
            .addClass("fade_in")
            .removeClass("fade_out");
    }
    $(".scroll_wrapper").on("scroll", function () {
        var scroll = $(this).scrollTop();
        console.log(scroll);
        if (scroll >= 3000 && scroll <= 6000) {
            if (!$(".energy_drink_name#Green").hasClass("fade_in")) {
                fadeText("#scroll_content_2", "Green");
            }
        } else if (scroll >= 6000) {
            if (!$(".energy_drink_name#Hot").hasClass("fade_in")) {
                $("section").removeClass("lock");
                $("footer").removeClass("lock");
                fadeText("#scroll_content_3", "Hot");
            }
        } else {
            if (!$(".energy_drink_name#Mixed").hasClass("fade_in")) {
                fadeText("#scroll_content_1", "Mixed");
            }
        }
    });
});
// トグルボタン
$(function () {
    $(".toggle-button input[type='checkbox']").on("change", function () {
        let id = $(this).parent().attr("id");
        if ($(this).is(":checked")) {
            $(".check_box_text." + id).addClass("active");
        } else {
            $(".check_box_text." + id).removeClass("active");
        }
    });
});
$(window).on("scroll", function () {
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    let sectionTop = $(".section_6").offset().top;

    if (scroll + windowHeight > sectionTop) {
        $(".circle_graph").show();
    } else {
        $(".circle_graph").hide();
    }
});

// クリップパス
$(window).on("scroll", function () {
    let scroll = $(window).scrollTop();
    let windowHeight = $(window).height();
    let sectionTop = $(".section_6").offset().top;

    if (scroll + windowHeight > sectionTop) {
        $(".card_1").addClass("active");
        $(".card_2").addClass("active");
        $(".card_3").addClass("active");
        $(".card_4").addClass("active");
    } else {
        $(".card_1").removeClass("active");
        $(".card_2").removeClass("active");
        $(".card_3").removeClass("active");
        $(".card_4").removeClass("active");
    }
});
// 販売店舗
$(function () {
    // 店舗情報
    const salesStore = {
        hokkaido: {
            slide1: "./img/Mask group (32).png",
            slide2: "./img/Mask group (39).png",
            slide3: "./img/Mask group (41).png",
            store_name: "グローバル・グルメ・マーケット 札幌店",
            store_address: "〒060-0001 北海道札幌市中央区ユートピア大通1-2-3",
            store_tel: "TEL:000-0000-0000",
            store_url: "xxxxxxxxxxxx.jpa",
            x: 43.064398451814874,
            y: 141.33773805955263,
        },
    };
    // ホバー
    let active_store = "";
    $(".map_area path").hover(function () {
        $(".map_area path").removeClass("select");
        $(this).addClass("select");
        let key = $(this).attr("class").replace("select", "").trim();
        active_store = key;
        if (key == "") {
            return;
        } else {
            let target_key = salesStore[key];
            $(".slide_1").attr("src", target_key.slide1);
            $(".slide_2").attr("src", target_key.slide2);
            $(".slide_3").attr("src", target_key.slide3);
            $(".store_name").text(target_key.store_name);
            $(".store_address").text(target_key.store_address);
            $(".store_tel").text(target_key.store_tel);
            $(".store_url").attr("href", target_key.store_url);
        }
    });
    // 現在地からの距離表示
    $(".distance_button").click(function () {
        let target = active_store;
        let lat = salesStore[target].x;
        let lng = salesStore[target].y;
        function changeMap(lat, lng) {
            const iframe = document.getElementById("mapFrame");
            iframe.src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
        }
        function success(pos) {
            let cl_x = pos.coords.latitude;
            let cl_y = pos.coords.longitude;
            const R = Math.PI / 180;
            function distance(cl_x, cl_y, lat, lng) {
                cl_x *= R;
                cl_y *= R;
                lat *= R;
                lng *= R;
                return (
                    6371 *
                    Math.acos(
                        Math.cos(cl_x) * Math.cos(lat) * Math.cos(lng - cl_y) +
                            Math.sin(cl_x) * Math.sin(lat)
                    )
                );
            }
            $("#distance").text(Math.round(distance(cl_x, cl_y, lat, lng)));
            changeMap(lat, lng);
        }
        function fail(pos) {
            console.log("位置情報の取得に失敗しました。エラーコード：");
        }
        navigator.geolocation.getCurrentPosition(success, fail);
        $(".distance_area_wrapper").fadeIn();
    });
});
// セクション9SP版
$(function () {
    $(".select_area").click(function () {
        const $target = $(this).closest(".sp_choice_content");
        let id = $(this).data("id");
        let select_result = "";
        $(".sp_choice_result").removeClass("active");
        if (id === "yes") {
            $target.find(".select_area[data-id='yes']").addClass("active");
            $target
                .find(".select_area[data-id='yes']")
                .css("background", "#00ffe0")
                .find("p")
                .show();
            $target.find(".select_area[data-id='no']").removeClass("active");
            $target
                .find(".select_area[data-id='no']")
                .css("background", "#9C9C9C")
                .find("p")
                .hide();
            $target.find(".select_arrow[data-id='sp']").addClass("yes");
            $target.find(".select_arrow[data-id='sp']").removeClass("no");
        } else if (id === "no") {
            $target.find(".select_area[data-id='no']").addClass("active");
            $target
                .find(".select_area[data-id='no']")
                .css("background", "#ad00ff")
                .find("p")
                .show();
            $target.find(".select_area[data-id='yes']").removeClass("active");
            $target
                .find(".select_area[data-id='yes']")
                .css("background", "#9C9C9C")
                .find("p")
                .hide();
            $target.find(".select_arrow[data-id='sp']").addClass("no");
            $target.find(".select_arrow[data-id='sp']").removeClass("yes");
        }
        $("[data-id='sp']").each(function () {
            let result = $(this)
                .attr("class")
                .replace("select_arrow", "")
                .trim();
            select_result += result;
        });
        if (
            select_result === "yesyesyes" ||
            select_result === "yesnono" ||
            select_result === "nonoyes"
        ) {
            $(".HotBlazeBlast").addClass("active");
        } else if (
            select_result === "yesyesno" ||
            select_result === "yesnoyes" ||
            select_result === "noyesno"
        ) {
            $(".MixedBerryDelight").addClass("active");
        } else if (select_result === "noyesyes" || select_result === "nonono") {
            $(".GreenFusionBlast").addClass("active");
        } else {
            $(".sp_choice_result").removeClass("active");
        }
    });
});
// 摂取量
$(function () {
    $(".diagnosis_button").click(function () {
        $(".select_box_wrapper select").removeClass("empty");
        let isEmpty = true;
        let age = Number($("#age").val());
        let weight = Number($("#weight").val());
        let sleep_time = Number($("#sleep_time").val());
        let input_result = age + weight + sleep_time;
        let result = 0;
        console.log(age);
        console.log(weight);
        console.log(sleep_time);
        if (age === 9 || weight === 0 || sleep_time === 11) {
            result = 1;
        } else if (input_result % 2 === 1) {
            result = 2;
        } else {
            result = 3;
        }
        // バリデーション
        $(".select_box_wrapper select").each(function () {
            let val = $(this).val();
            if (val === "") {
                $(this).addClass("empty");
                isEmpty = false;
            }
        });
        if (!isEmpty) {
            return false;
        }
        $(".diagnosis_result").text(result);
    });
});
// 無限スクロール
$(function () {
    const list = document.querySelector("ol");
    const observedElement = document.createElement("div");
    observedElement.className = "observedElement";
    list.insertAdjacentElement("afterend", observedElement);
    const callback = (entries) => {
        const article_data = [
            {
                img: "./img/Mask group (36).png",
                date: "2023/00/00",
                title: "エナジードリンクの歴史と未来",
                text: "エナジードリンクの進化と未来展望を探ります。",
            },
            {
                img: "./img/Mask group (37).png",
                date: "2023/00/00",
                title: "ストレス対策にエナジードリンクは役立つか？",
                text: "ストレス軽減にエナジードリンクの可能性を考察。",
            },
            {
                img: "./img/Mask group (38).png",
                date: "2023/00/00",
                title: "アスリートのためのエナジードリンクの最適な利用法",
                text: "競技者向けのエナジードリンクの最適な使い方。",
            },
        ];
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                for (let i = 1; i <= 3; i++) {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                    <div class="article_box">
                        <div class="article_thumbnail">
                            <img src="${article_data[0].img}" alt="">
                        </div>
                        <div class="article_box_bottom">
                            <div class="article_date">
                                ${article_data[0].date}
                            </div>
                            <div class="article_name">
                                ${article_data[0].title}
                            </div>
                            <div class="article_main_text">
                                ${article_data[0].text}
                            </div>
                        </div>
                    </div>
                    <div class="article_box">
                        <div class="article_thumbnail">
                            <img src="${article_data[1].img}" alt="">
                        </div>
                        <div class="article_box_bottom">
                            <div class="article_date">
                                ${article_data[1].date}
                            </div>
                            <div class="article_name">
                                ${article_data[1].title}
                            </div>
                            <div class="article_main_text">
                                ${article_data[1].text}
                            </div>
                        </div>
                    </div>
                    <div class="article_box">
                        <div class="article_thumbnail">
                            <img src="${article_data[2].img}" alt="">
                        </div>
                        <div class="article_box_bottom">
                            <div class="article_date">
                                ${article_data[2].date}
                            </div>
                            <div class="article_name">
                                ${article_data[2].title}
                            </div>
                            <div class="article_main_text">
                                ${article_data[2].text}
                            </div>
                        </div>
                    </div>
                `;
                    list.appendChild(listItem);
                }
            }
        });
    };

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.0,
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(observedElement);
});
// スクロールモーダル表示切替
$(function () {
    $(".article_wrapper button").on("click", function () {
        $(".article_modal").fadeIn();
    });
    $(".article_modal").on("click", function () {
        $(".article_modal").fadeOut();
    });
});
// フェードイン
$(function () {
    $(window).scroll(function () {
        const wHeight = $(window).height();
        const wScroll = $(window).scrollTop();
        const bPosition = $(".section_9_content").offset().top;
        // スクロールした量が要素の高さを上回ったら
        // その数値にウィンドウの高さを引き、最後に200pxを足す
        if (wScroll > bPosition - wHeight + 200) {
            $(".section_9_content").addClass("fadeIn");
        } else {
            $(".section_9_content").removeClass("fadeIn");
        }
    });
});
// 郵便番号検索
$(function () {
    // 表示切替
    $("#post_code").click(function () {
        $(".search_address_modal").addClass("is-open");
        $("#search_post_code").val("");
    });
    $(".search_address_modal .back").click(function () {
        $(".search_address_modal").removeClass("is-open");
        $("#search_post_code").val("");
    });
    $(".search_address_select_modal").on(
        "click",
        ".chome_select, .back",
        function () {
            let chome = $(this).text();
            let address_val = $(".search_address_result").text() + chome;
            $(".search_address_select_modal").removeClass("is-open");
            $("#address").val(address_val);
            return false;
        }
    );
    $(".search_address_select_modal .back").click(function () {
        let address_val = $(".search_address_result").text();
        $(".search_address_select_modal").removeClass("is-open");
        $("#address").val(address_val);
        return false;
    });
    // 住所検索形式確認
    $(window).click(function () {
        $(".search_address_modal_input_item input")
            .parent()
            .find(".validation_text")
            .hide();
        $(".search_address_modal_input_item input").removeClass("validation");
        const regex = /^\d{3}-?\d{4}$/;
        let val = $("#search_post_code").val();
        if (val === "") {
            return;
        } else if (!regex.test(val)) {
            $(".search_address_modal_input_item input").addClass("validation");
            $(".search_address_modal_input_item input")
                .parent()
                .find(".validation_text")
                .show();
            return false;
        } else {
            // 入力内容反映
            $("#post_code").val(val);
            $.getJSON("http://zipcloud.ibsnet.co.jp/api/search?callback=?", {
                zipcode: $("#search_post_code").val(),
            }).done(function (data) {
                let result = data.results[0];
                let targetPref = result.address1;
                let targetCity = result.address2;
                let targetTown = result.address3;
                let address_result = targetPref + targetCity + targetTown;
                $(".search_address_result").text(address_result);
                $(".search_address_modal").removeClass("is-open");
                $(".search_address_select_modal").addClass("is-open");
                const url = "./assets/latest.csv";
                Papa.parse(url, {
                    download: true, // 外部CSVをfetch
                    header: true, // 1行目をキーにする
                    complete: function (results) {
                        const csvData = results.data;
                        const chomeList = csvData
                            .filter(
                                (row) =>
                                    row["都道府県名"] === targetPref &&
                                    row["市区町村名"] === targetCity &&
                                    row["大字町丁目名"].startsWith(targetTown)
                            )
                            .map((row) => row["大字町丁目名"]);

                        const $ul = $("#chome");
                        $ul.empty();

                        chomeList.forEach(function (i, index) {
                            let item = index + 1;
                            $ul.append(
                                $("<li class='chome_index'>").text(item),
                                $("<li class='chome_select'>").text(
                                    item + "丁目"
                                )
                            );
                        });
                    },
                });
            });
        }
    });
});
// バリデーション
$(function () {
    // ボタン有効化
    $(".submit_button").prop("disabled", true);
    $("#agree").on("change", function () {
        if ($("#agree").is(":checked")) {
            $(".submit_button").prop("disabled", false);
        } else {
            $(".submit_button").prop("disabled", true);
        }
    });
    // 空欄形式確認
    $(".submit_button").click(function (e) {
        const tel = /^\d{10,11}$|^\d{2,4}-\d{2,4}-\d{3,4}$/;
        const email = /^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
        const hurigana = /^[\u3040-\u309Fー\s]+$/;
        let isValid = true;
        function validation(target, text) {
            $(target).find("input").addClass("required");
            $(target).find(".validation_text").text(text);
            $(target).find(".validation_text").show();
            isValid = false;
        }
        $(".form_input_wrapper").each(function () {
            let val = $(this).find("input").val();
            let id = $(this).find("input").attr("id");
            $(this).find("input").removeClass("required");
            $(this).find(".validation_text").hide();
            if (val === "") {
                validation(this, "必須項目です");
            } else if (id === "tel" && !tel.test(val.trim())) {
                validation(this, "電話番号を正しく入力してください");
            } else if (id === "email" && !email.test(val.trim())) {
                validation(this, "メールアドレスを正しく入力してください");
            } else if (id === "hurigana" && !hurigana.test(val.trim())) {
                validation(this, "ひらがなで入力してください");
            }
        });
        if (!isValid) {
            e.preventDefault();
        }
    });
});
// モーダル
$(function () {
    // どのようにページが読み込まれたかのフラグ
    var backFlg = window.performance.navigation.type;

    // ブラウザバック以外で読み込まれたらのif
    if (backFlg < 1) {
        // 履歴に現在のURLを追加保存する
        history.pushState(null, null, location.href);
    }

    //モーダルウィンドウの表示
    $(window).on("popstate", function (event) {
        $(".modal__content.confirm").addClass("active");
        $(".js-modal").fadeIn();

        // モーダルウィンドウ内閉じるリンクのリンク先変更
        var mLink = document.getElementsByClassName("js-modal-close");
        mLink[1].setAttribute("onClick", "history.back();return false;");
    });

    // モーダルウィンドウの解除
    $(".js-modal-close").on("click", function () {
        if ($(".modal__content.register").hasClass("active")) {
            $(".modal__content.register").removeClass("active");
            $(".modal__content.confirm").addClass("active");
        }
        $(".js-modal").fadeOut();
        return false;
    });
    //モーダル切り替え
    $(".continue_button").on("click", function () {
        $(".modal__content.register").addClass("active");
        $(".modal__content.confirm").removeClass("active");
    });
    // モーダルバリデーション
    $(".modal_form_button").click(function (e) {
        const email = /^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}$/;
        let isValid = true;
        let val = $(".modal_email").val();
        $(".modal_email").removeClass("required");
        $(".modal_input_wrapper").find(".validation_text").hide();
        function validation(text) {
            $(".modal_email").addClass("required");
            $(".modal_input_wrapper").find(".validation_text").text(text);
            $(".modal_input_wrapper").find(".validation_text").show();
            isValid = false;
        }
        if (val === "") {
            validation("必須項目です");
        } else if (!email.test(val.trim())) {
            validation("メールアドレスを正しく入力してください");
        }
        if (!isValid) {
            e.preventDefault();
        }
    });
});
