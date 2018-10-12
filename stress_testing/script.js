import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 50,
  // vus: 500,
  // vus: 1000,
  // duration: "30s"
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m30s", target: 10 },
    { duration: "20s", target: 0 }
  ]
};

export default function() {
  // let res = http.get("/artists/:artistID")
  let id = getRandomInt(1, 10000000);
  let res = http.get(`http://localhost:3000/${id}`);
  check(res, {
    "status was 200": r => r.status == 200,
    "transaction time OK": r => r.timings.duration < 200
  });
  sleep(1);
}

// Helper function: from app.jsx
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  let random = Math.random();
  if (Math.random() < 0.5) {
    return Math.floor((random / 1000) * (max - min)) + min;
  } else {
    return Math.floor(random * (max - min)) + min;
  }
}
