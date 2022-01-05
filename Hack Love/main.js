const c_width = document.documentElement.clientWidth;
const c_height = document.documentElement.clientHeight;
const FPS = 60;
let c = new Canvas(c_width * 4, c_height * 4);
let w_div = Math.floor((c_width / 40) * 4);
let h_div = Math.floor((c_height / 30) * 4);
let window_run = true;
let size = Math.floor((c_width * 4) / w_div);

let rnd = (min, max) => {
  return Math.floor(Math.random() * (max + 1) + min);
};
let hex_num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
let random_color = () => {
  let color = "#00";
  for (let i = 0; i < 4; i++) {
    color += hex_num[rnd(0, 15)];
  }
  return color;
};

let text_array = [
  ["I", " "],
  [" ", " "],
  ["Y", "O", "U", " "],
  [" ", " ", " ", " "],
  ["B", "U", "I", " "],
  ["L", "O", "V", "E", " "],
  ["P", "U", "B", "U", " "],
  [" ", " ", " ", " ", " "],
  ["P", "U", "B", "A", "L", "I", " "],
  ["S", "O", "U", "R", "A", "V", " "],
];
let dy_ary_rnd = [0.05, 0.1, 0.2];
let ary = [];
for (let i = 0; i < w_div + 1; i++) {
  ary[i] = {
    text: [],
    color: random_color(),
    ry: dy_ary_rnd[rnd(0, dy_ary_rnd.length - 1)],
    dy: 0,
  };
}

let sume_text = (index) => {
  if (!ary[index].text.length) {
    ary[index].text = text_array[rnd(0, text_array.length - 1)]
      .join("")
      .split("");
  }
  let str = ary[index].text[0];
  ary[index].text.shift();
  return str;
};

let line_text_array = [];
for (let i = 0; i < w_div + 1; i++) {
  line_text_array[i] = [];
  for (let j = 0; j < h_div; j++) {
    line_text_array[i][j] = " ";
  }
}

c.context.font = `${size}px sans-serif`;
c.context.textAlign = "center";

let draw = () => {
  c.rect("#000000");
  for (let i = 0; i < w_div + 1; i++) {
    c.context.fillStyle = ary[i].color;
    for (let j = 0; j < h_div; j++) {
      c.context.fillText(
        line_text_array[i][j],
        i * size,
        j * size + ary[i].dy * size
      );
    }
  }
};

let text_speed_time = 0;
let update = () => {
  for (let i = 0; i < w_div + 1; i++) {
    if (ary[i].dy >= 1) {
      line_text_array[i].unshift(sume_text(i));
      ary[i].dy = 0;
    }
    ary[i].dy += ary[i].ry;
  }
  for (let i = 0; i < w_div + 1; i++) {
    if (line_text_array[i].length > h_div) {
      line_text_array[i].pop();
    }
  }
  draw();

    // speed change 
    if(text_speed_time >= 300){
      text_speed_time = 0;
      for (let i = 0; i < w_div + 1; i++) {
        ary[i].ry = dy_ary_rnd[rnd(0, dy_ary_rnd.length - 1)];
      }
    }
    text_speed_time++;
};

let animate = () => {
  update();
  if (window_run) {
    setTimeout(animate, 1000 / FPS);
  }
};

animate();
