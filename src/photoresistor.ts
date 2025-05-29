import { Board, Sensor, Led } from "johnny-five";

const board = new Board();

board.on("ready", () => {
  console.log("🚀 Board connected!");

  const photoResistor = new Sensor("A0");
  const led = new Led(8);

  photoResistor.on("data", () => {
    const lightLevel = photoResistor.value; // 0-1023
    console.log(`💡 Light Level: ${lightLevel}`);

    if (lightLevel < 400) {
      led.on();
      console.log("🔆 LED ON");
    } else {
      led.off();
      console.log("🌑 LED OFF");
    }
  });
});
