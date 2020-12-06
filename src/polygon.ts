const PI2 = Math.PI * 2;

type Color = string;

const COLORS: Color[] = [
  "#ca00d5",
  "#ef3e2f",
  "#b05af2",
  "#e8c476",
  "#e8bcf4",
  "#615118",
  "#fca6dd",
  "#ddccbd",
  "#e6cbeb",
  "#81156a",
  "#eba118",
  "#7956ed"
];

export class Polygon {
  x: number;
  y: number;
  radius: number;
  sides: number;
  rotate: number;
  constructor(
    x: number,
    y: number,
    radius: number,
    sides: number,
    rotate?: number
  ) {
    /** 도형 중앙 x좌표 */
    this.x = x;
    /** 도형 중앙 y좌표 */
    this.y = y;
    /** 반지름 */
    this.radius = radius;
    /** 각의 수 */
    this.sides = sides;
    /** 회전한 각도 */
    this.rotate = 0;
  }

  animate(ctx: CanvasRenderingContext2D, moveX: number) {
    ctx.save();
    // ctx.fillStyle = '#000';
    // ctx.beginPath();

    /** 360도를 각의 수만큼 나눈 각도 */
    const angle = PI2 / this.sides;
    const angle2 = PI2 / 4;

    /** (x, y)만큼 기준점 이동 */
    ctx.translate(this.x, this.y);

    this.rotate += moveX * 0.008;
    ctx.rotate(this.rotate);

    for (let i = 0; i < this.sides; i++) {
      /** 각도별 도형의 중앙 x좌표 */
      const x = this.radius * Math.cos(angle * i);
      /** 각도별 도형의 중앙 y좌표 */
      const y = this.radius * Math.sin(angle * i);

      // (i == 0) ? ctx.moveTo(x,y) : ctx.lineTo(x, y);

      // ctx.beginPath();
      // ctx.arc(x, y, 30, 0, PI2, false);
      // ctx.fill();

      ctx.save();

      ctx.fillStyle = COLORS[i];
      /** 전체 polygon의 중심에서 (x,y)만큼 기준점 이동  */
      ctx.translate(x, y);
      /** 각도에 따라 자식 도형의 회전각도도 달라져야한다. */
      ctx.rotate((((360 / this.sides) * i + 45) * Math.PI) / 180);

      ctx.beginPath();
      for (let j = 0; j < 4; j++) {
        const x2 = 160 * Math.cos(angle2 * j);
        const y2 = 160 * Math.sin(angle2 * j);
        /** 자식 정사각형 그리기 */
        if (j === 0) {
          ctx.moveTo(x2, y2);
        } else {
          ctx.lineTo(x2, y2);
        }
      }
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }

    // ctx.fill();
    // ctx.closePath();
    ctx.restore();
  }
}
