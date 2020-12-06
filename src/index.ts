import { Polygon } from "./polygon";

class App {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixelRatio: number;

  isDown: boolean;
  moveX: number;
  offsetX: number;

  stageWidth: number;
  stageHeight: number;

  polygon: any;

  constructor() {
    this.canvas = document.createElement("canvas");
    document.getElementById("app")!.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;

    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.polygon = new Polygon(
      this.stageWidth / 2,
      this.stageHeight + this.stageHeight / 3,
      this.stageHeight / 1.5,
      12
    );

    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;

    document.addEventListener("pointerdown", this.onDown.bind(this), false);
    document.addEventListener("pointermove", this.onMove.bind(this), false);
    document.addEventListener("pointerup", this.onUp.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this) as any);
  }

  animate(ctx: CanvasRenderingContext2D, moveX: number) {
    window.requestAnimationFrame(this.animate.bind(this) as any);
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.moveX *= 0.9;

    this.polygon.animate(this.ctx, this.moveX);
  }

  onDown(e: any) {
    this.isDown = true;
    this.moveX = 0;
    this.offsetX = e.clientX;
  }
  onMove(e: any) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }

  onUp(e: any) {
    this.isDown = false;
  }
}

new App();
