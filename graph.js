const COUNT = 1000;

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth - 340 - 20 - 20 - 20;
canvas.height = window.innerHeight - 40 - 20;
const ctx = canvas.getContext("2d");

// t - коэффициент от 0 до 1
function transform(z, t) {
  z = math.complex(z);
  return math.add(
    math.multiply(1 - t, z),
    math.multiply(
      t,
      math.subtract(
        math.multiply(
          -0.5,
          math.multiply(
            math.add(z, math.inv(z)),
            math.exp(math.multiply((3 * math.pi) / 4, math.i))
          )
        ),
        math.divide(math.complex(1, 1), math.sqrt(2))
      )
    )
  );
}

function draw(T) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const scale = Math.min(centerX, centerY) * 0.8;

  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(canvas.width, centerY);
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, canvas.height);
  ctx.strokeStyle = "#484D5C";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width - 10, centerY - 5);
  ctx.lineTo(canvas.width, centerY);
  ctx.lineTo(canvas.width - 10, centerY + 5);
  ctx.moveTo(centerX - 5, 10);
  ctx.lineTo(centerX, 0);
  ctx.lineTo(centerX + 5, 10);
  ctx.fillStyle = "#484D5C";
  ctx.fill();

  ctx.font = "16px Chivo Mono";
  ctx.fillText("Re", canvas.width - 25, centerY + 20);
  ctx.fillText("Im", centerX - 25, 20);

  ctx.fillStyle = "#89A3F1";
  for (let i = 0; i < COUNT; i++) {
    const angle = Math.random() * Math.PI;
    const radius = Math.random();
    const z = math.complex(radius * Math.cos(angle), radius * Math.sin(angle));
    const w = transform(z, T / 100);

    const x = centerX + math.re(w) * scale;
    const y = centerY - math.im(w) * scale;

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}
