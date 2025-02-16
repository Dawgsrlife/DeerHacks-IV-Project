export const barChartDataAIQueries = [
  {
    name: "AI Queries Processed",
    data: [150, 200, 250, 220, 270, 300, 280],
  },
];

export const barChartDataAIRequests = [
  {
    name: "AI Requests Over Time",
    data: [180, 210, 260, 230, 290, 320, 310],
  },
];

export const barChartOptionsAIQueries = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["00", "04", "08", "12", "14", "16", "18"],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: true,
  },
  fill: {
    type: "solid",
    colors: ["#4318FF"],
  },
  dataLabels: {
    enabled: false,
  },
};

export const barChartOptionsAIRequests = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: undefined,
      backgroundColor: "#000000"
    },
    theme: "dark",
  },
  xaxis: {
    categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  grid: {
    show: true,
  },
  fill: {
    type: "solid",
    colors: ["#4318FF"],
  },
  dataLabels: {
    enabled: false,
  },
};

export const pieChartOptionsAIUsage = {
  labels: ["AI Processed Data", "System Memory"],
  colors: ["#4318FF", "#6AD2FF"],
  chart: {
    width: "50px",
  },
  legend: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    colors: ["#4318FF", "#6AD2FF"],
  },
};

export const pieChartDataAIUsage = [72, 28];

export const lineChartDataAIMemory = [
  {
    name: "AI Memory Usage (GB)",
    data: [1.0, 1.1, 1.2, 1.15, 1.3, 1.4, 1.35],
    color: "#4318FF",
  },
];

export const lineChartOptionsAIMemory = {
  chart: {
    type: "line",
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    labels: {
      style: {
        colors: "#A3AED0",
        fontSize: "12px",
        fontWeight: "500",
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#CBD5E0",
        fontSize: "14px",
      },
    },
  },
  stroke: {
    curve: "smooth",
  },
};
