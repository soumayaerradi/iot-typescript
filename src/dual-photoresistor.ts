import { Board, Sensor, Servo, Led } from "johnny-five";

const lightSensorData = {
  left: 0,
  right: 0
};

const board = new Board();

board.on("ready", () => {
  console.log("🚀 Board connected!");

  // Initialize components
  const leftSensor = new Sensor("A0");
  const rightSensor = new Sensor("A1");
  const servo = new Servo(9);
  const led = new Led(8);

  // Start servo at center
  servo.to(90);

  // Listen to both sensors
  leftSensor.on("data", function (this: Sensor) {
    lightSensorData.left = this.value;
    updateTracker();
  });

  rightSensor.on("data", function (this: Sensor) {
    lightSensorData.right = this.value;
    updateTracker();
  });

  // Function to update servo and LED based on light levels
  function updateTracker() {
    const left = lightSensorData.left;
    const right = lightSensorData.right;

    console.log(`📊 Left: ${left} | Right: ${right}`);

    // Night Mode — if both are below threshold
    if (left < 400 && right < 400) {
      led.on();
      console.log("🌙 Night Mode: LED ON");
    } else {
      led.off();
    }

    // Determine servo direction
    if (left > right) {
      servo.to(0); // Turn Left
      console.log("↖ Turning Left");
    } else if (right > left) {
      servo.to(180); // Turn Right
      console.log("↗ Turning Right");
    } else {
      servo.to(90); // Stay Centered
      console.log("⏸ Centered");
    }
  }
});
