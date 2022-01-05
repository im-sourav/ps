"use strict";
const $ = (givMe) => {
  const self = document.querySelectorAll(givMe);
  self.T = (text) => {
    self.forEach((all) => {
      all.innerText = text;
    });
  };
  self.O = (event, fun) => {
    self.forEach((all) => {
      all.addEventListener(event, fun);
    });
  };
  self.S = (object) => {
    const css = Object.entries(object);
    self.forEach((all) => {
      css.forEach(([prorerty, value]) => {
        all.style[prorerty] = value;
      });
    });
  };
  return self;
};

// return Id
const ID = (id) => {
  const self = document.getElementById(id);
  self.on = (event, fun) => {
    self.addEventListener(event, fun);
  };
  return self;
};

// class add in html
function addClass(array, className = "active") {
  if (array.length == undefined) {
    array.classList.forEach((e) => {
      if (e != className) {
        array.classList.add(className);
      }
    });
  } else {
    array.forEach((element) => {
      element.classList.forEach((e) => {
        if (e != className) {
          element.classList.add(className);
        }
      });
    });
  }
}

// claass remove in html
function removeClass(array, className = "active") {
  if (array.length == undefined) {
    array.classList.forEach((e) => {
      if (e == className) {
        array.classList.remove(className);
      }
    });
  } else {
    array.forEach((element) => {
      element.classList.forEach((e) => {
        if (e == className) {
          element.classList.remove(className);
        }
      });
    });
  }
}

class Canvas {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    var cvs = document.createElement("canvas");
    cvs.setAttribute("width", width);
    cvs.setAttribute("height", height);
    document.body.appendChild(cvs);
    this.context = cvs.getContext("2d");
  }

  rect(fillStyle = "#ff0000", x = 0, y = 0, w = this.width, h = this.height) {
    this.context.fillStyle = fillStyle;
    this.context.fillRect(x, y, w, h);
  }

  rectStroke(
    strokeStyle = "#fff000",
    x = 0,
    y = 0,
    w = this.width,
    h = this.height,
    lineWidth = 1
  ) {
    this.context.strokeStyle = strokeStyle;
    this.context.lineWidth = lineWidth;
    this.context.rect(x, y, w, h);
    this.context.stroke();
  }

  arc(
    fillStyle = "#0ff000",
    x = this.width / 2,
    y = this.height / 2,
    radius = (this.width + this.height) / 4
  ) {
    this.context.fillStyle = fillStyle;
    this.context.beginPath();
    this.context.arc(x, y, Canvas.sr(radius), 0, Math.PI * 2, false);
    this.context.fill();
    this.context.closePath();
  }

  arcStroke(
    strokeClor = "#ff0000",
    x = this.width / 2,
    y = this.height / 2,
    radius = (this.width + this.height) / 4,
    lineWidth = 1
  ) {
    this.context.strokeStyle = strokeClor;
    this.context.beginPath();
    this.context.lineWidth = lineWidth;
    this.context.arc(x, y, Canvas.sr(radius), 0, Math.PI * 2, false);
    this.context.stroke();
  }

  moveTo(
    strokeStyle = "#00ffff",
    x = 0,
    y = 0,
    fillStyle = "#000fff",
    lineWidth = 1,
    round = true
  ) {
    this.context.strokeStyle = strokeStyle;
    this.context.fillStyle = fillStyle;
    this.context.beginPath();
    this.context.lineWidth = lineWidth;
    this.context.lineCap = round == true ? "round" : "square";
    this.context.moveTo(x, y);
  }

  lineTo(x = this.width / 2, y = this.heigth / 2) {
    this.context.lineTo(x, y);
  }
 
  closePath() {
    this.context.stroke();
    this.context.closePath();
    this.context.fill();
  }
  clearRect() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  // always positive
  static sr(val) {
    return Math.sqrt(Math.pow(val, 2));
  }

  // degree convert to radian
  static toRadian(degree) {
    return (degree * Math.PI) / 180;
  }

  // radian convert to Degree
  static toDegree(radian) {
    return (radian * 180) / Math.PI;
  }
}
