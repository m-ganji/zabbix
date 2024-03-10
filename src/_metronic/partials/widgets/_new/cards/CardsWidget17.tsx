/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useRef } from "react";
import { getCSSVariableValue } from "../../../../assets/ts/_utils";
import { useThemeMode } from "../../../layout/theme-mode/ThemeModeProvider";
import { useIntl } from "react-intl";

type Props = {
  className: string;
  chartSize?: number;
  chartLine?: number;
  chartRotate?: number;
  ProblemsList: { severity?: string | number }[];
};
interface SeverityColor {
  [key: string]: { title: string; color: string };
}

const CardsWidget17: FC<Props> = ({
  className,
  chartSize = 70,
  chartLine = 11,
  chartRotate = 145,
  ProblemsList,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const intl = useIntl();
  const { mode } = useThemeMode();
  useEffect(() => {
    refreshChart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }

    setTimeout(() => {
      initChart(chartSize, chartLine, chartRotate);
    }, 10);
  };

  const severityToColor: SeverityColor = {
    5: { title: "بسیار بالا", color: "danger" },
    4: { title: "بالا", color: "red/80" },
    3: { title: "عادی", color: "info" },
    2: { title: "هشدار", color: "warning" },
    1: { title: "اطلاعات", color: "primary" },
    0: { title: "نا معلوم", color: "dark" },
  };

  const severityCounts: { [key: number]: number } = {};

  ProblemsList.forEach((item) => {
    const severity = item.severity as number; // Ensure severity is a number
    if (severity in severityCounts) {
      severityCounts[severity]++;
    } else {
      severityCounts[severity] = 1;
    }
  });

  const countsList = Object.entries(severityCounts).map(([severity, count]) => (
    <>
      <div className="d-flex fw-semibold align-items-center">
        <div
          className={`bullet w-8px h-3px rounded-2 bg-${severityToColor[severity].color} me-3`}
        />
        <div className="fw-bolder text-gray-700 text-xxl-end">
          {severityToColor[severity].title}
        </div>
        <div className="text-gray-500 flex-grow-1 me-4">{count}</div>
      </div>
    </>
  ));

  return (
    <div className={`card card-flush ${className}`}>
      <div className="card-header pt-5">
        <div className="card-title d-flex flex-column">
          <span className="fw-semibold fs-2">
            {intl.formatMessage({ id: "DASH.PROBLEMS.SEVERITY" })}
          </span>
        </div>
      </div>

      <div className="card-body pt-2 pb-4 d-flex flex-wrap align-items-center">
        <div className="d-flex flex-center me-5 pt-2">
          <div
            id="kt_card_widget_17_chart"
            ref={chartRef}
            style={{ minWidth: chartSize + "px", minHeight: chartSize + "px" }}
            data-kt-size={chartSize}
            data-kt-line={chartLine}
          ></div>
        </div>

        <div className="d-flex flex-column content-justify-center flex-row-fluid">
          {countsList}
        </div>
      </div>
    </div>
  );
};

const initChart = function (
  chartSize: number = 70,
  chartLine: number = 11,
  chartRotate: number = 145
) {
  const el = document.getElementById("kt_card_widget_17_chart");
  if (!el) {
    return;
  }
  el.innerHTML = "";

  const options = {
    size: chartSize,
    lineWidth: chartLine,
    rotate: chartRotate,
    //percent:  el.getAttribute('data-kt-percent') ,
  };

  const canvas = document.createElement("canvas");
  const span = document.createElement("span");

  //@ts-ignore
  if (typeof G_vmlCanvasManager !== "undefined") {
    //@ts-ignore
    G_vmlCanvasManager.initElement(canvas);
  }

  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

  ctx?.translate(options.size / 2, options.size / 2); // change center
  ctx?.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  const radius = (options.size - options.lineWidth) / 2;

  const drawCircle = function (
    color: string,
    lineWidth: number,
    percent: number
  ) {
    percent = Math.min(Math.max(0, 1 || 1), 1);
    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = "round"; // butt, round or square
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  // Init 2
  drawCircle("#E4E6EF", options.lineWidth, 100 / 100);
  drawCircle(getCSSVariableValue("--bs-info"), options.lineWidth, 100 / 250);
};

export { CardsWidget17 };
