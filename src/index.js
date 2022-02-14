import echarts from 'echarts';
import { JSDOM } from 'jsdom';
import pkg from 'canvas';
const { createCanvas } = pkg;
import cors from 'cors';
import express from 'express';
import requestID from 'express-request-id';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { SaveChart, SaveRequest, GetCharts, GetChart, GetRequests } from './db/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestID());

app.use(express.static(path.resolve("web/build")));
app.use("/", express.static(path.resolve("web/build")));
app.use("/home", express.static(path.resolve("web/build")));
app.use("/charts", express.static(path.resolve("web/build")));
app.use("/chart/:id", express.static(path.resolve("web/build")));
app.use("/requests", express.static(path.resolve("web/build")));

const port = process.env.PORT;

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

app.post("/api/image", async (req, res) => {
  const options = req.body;
  let imageOptions = options.imageoptions;
  let chartOptions = options.chartoptions;

  // Error Checking
  if (!imageOptions.length || !imageOptions.width) {
    return res.status(400).send({ error: "check Image dimensions" });
  }

  if (!options.key) {
    return res.status(400).send({ error: "check unique key" });
  }

  if (IsJsonString(chartOptions)) {
    try {
      chartOptions = JSON.parse(chartOptions);
    } catch (error) {
      return res.status(400).send({ error: "check JSON" });
    }
  }

  // Generate chart as svg
  echarts.setPlatformAPI(() => {
    return createCanvas(imageOptions.width, imageOptions.length);
  });

  const { window } = new JSDOM();
  global.window = window;
  global.navigator = window.navigator;
  global.document = window.document;
  const root = document.createElement("div");
  Object.defineProperty(root, "clientWidth", { value: imageOptions.width });
  Object.defineProperty(root, "clientHeight", { value: imageOptions.length });

  const chart = echarts.init(root, null, { renderer: "svg" });

  chart.setOption(chartOptions);

  const chartSVG = root.querySelector('svg').outerHTML;
  const chartUUID = uuidv4().toString();
  const chartURL = `/chart/${chartUUID}`;

  // Save Chart and Request Data in Database
  await SaveChart(chartUUID, imageOptions, chartOptions, chartSVG, options.key);
  await SaveRequest(req.ip, req.id, chartURL, options.key);

  // Response
  res.send({
    svg: chartSVG,
    url: chartURL
  });
  chart.dispose();
});

app.get("/api/charts", async (req, res) => {
  const charts = await GetCharts();
  if (!charts) {
    return res.status(404).send({ error: "not found" });
  }
  return res.send(charts);
});

app.get("/api/chart/:id", async (req, res) => {
  if (req.params.id) {
    const chart = await GetChart(req.params.id);
    if (!chart) {
      return res.status(404).send({ error: "not found" });
    }
    return res.send(chart);
  } else {
    return res.status(400).send({ error: "enter appropriate id" });
  }
});

app.get("/api/requests", async (req, res) => {
  let requests = await GetRequests();
  if (!requests) {
    return res.status(404).send({ error: "not found" });
  }
  return res.send(requests);
});

app.listen(port, () => {
  console.log("App", port);
});
