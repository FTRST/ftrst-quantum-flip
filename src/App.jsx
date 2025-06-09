import "./App.css";
import QuantumCoinFlip from "./components/QuantumCoinFlip";
import { ShortcutContainer } from "futurist-components";

import { useSetAtom } from "jotai";
import { useDeviceDetail } from "./states/deviceDetail";
import { windowManipulatorAtom } from "./states/deviceDetailState";

function App() {
  const device = useDeviceDetail();
  const manipulateWindows = useSetAtom(windowManipulatorAtom);

  const shortcuts = [
    {
      icon: "https://futurist.io/icons/folder.png",
      title: "Quantum Coin Flip",
      id: "qcf",
      type: "app",
      windowData: {
        id: "qcf",
        title: "Quantum Coin Flip",
        width: "300px",
        height: "300px",
        xCoord: 10,
        yCoord: 10
      },
    },
  ];

  return (
    <>
      <ShortcutContainer
        device={device}
        shortcuts={shortcuts}
        manipulateWindows={manipulateWindows}
      />
      <QuantumCoinFlip device={device} manipulateWindows={manipulateWindows} />
    </>
  );
}

export default App;
