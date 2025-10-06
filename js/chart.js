const bar = document.getElementById("bar_Chart");
const circle = document.getElementById("circle_Chart");
const color = "#FF0211";
var chart_flag = false;
// 棒グラフ
new Chart(bar, {
    type: "bar",
    data: {
        labels: ["21/12", "22/12", "23/12"],
        datasets: [
            {
                label: "売上高",
                data: [4500, 5500, 6500],
                borderWidth: 1,
                backgroundColor: color,
            },
        ],
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 8,
                        weight: "bold",
                    },
                    padding: 20,
                },
                align: "end",
            },
        },
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: 8000,
                ticks: {
                    stepSize: 2000,
                    font: {
                        size: 10,
                        weight: "bold",
                        family: "Arial",
                    },
                },
                border: {
                    // ★このブロックを追加
                    display: false, // ← 縦線を消す設定
                },
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        size: 10,
                        weight: "bold",
                        family: "Arial",
                    },
                },
            },
        },
    },
});
// 円グラフ
new Chart(circle, {
    type: "pie",
    data: {
        labels: ["男性", "女性"],
        datasets: [
            {
                data: [63.4, 36.6],
                backgroundColor: ["#0092E3", "#FF7456"],
            },
        ],
    },
    plugins: [
        {
            afterDatasetsDraw: function (chart, args, options) {
                let metas = chart.getSortedVisibleDatasetMetas();
                metas.forEach(function (meta, i) {
                    if (
                        meta.data.length &&
                        (meta.type === "pie" || meta.type === "doughnut")
                    ) {
                        let dataset = chart.data.datasets[meta.index];
                        let dataKey = dataset.parsing?.key;
                        dataKey =
                            dataKey !== undefined
                                ? dataKey
                                : chart.options.parsing?.key;
                        let elements = meta.data;
                        let ctx = chart.ctx;
                        ctx.save();
                        ctx.font = "bold 24px Orbitron";
                        ctx.fillStyle = "#fff";
                        ctx.lineWidth = 0;
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        elements.forEach(function (el, i) {
                            if (el.circumference) {
                                let data =
                                    dataKey !== undefined
                                        ? dataset.data[i][dataKey]
                                        : dataset.data[i];
                                let par = Math.floor((data / meta.total) * 100);
                                let rdist =
                                    el.innerRadius +
                                    (el.outerRadius - el.innerRadius) * 0.5;
                                let eangle = (el.startAngle + el.endAngle) / 2;
                                let pos = {
                                    x: el.x + rdist * Math.cos(eangle),
                                    y: el.y + rdist * Math.sin(eangle),
                                };
                                const labelText = chart.data.labels[i];
                                const numberText = `${par}%`;

                                const fontPx = parseInt(
                                    ctx.font.match(/(\d+)px/)?.[1] || 16,
                                    10
                                );
                                const lineHeight = fontPx * 1.2;

                                ctx.fillText(
                                    labelText,
                                    pos.x,
                                    pos.y - lineHeight / 2
                                );
                                ctx.fillText(
                                    numberText,
                                    pos.x,
                                    pos.y + lineHeight / 2
                                );
                            }
                        });
                    }
                });
            },
        },
    ],
    options: {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label + ":" + context.parsed + "%";
                        return label;
                    },
                },
            },
        },
    },
});
