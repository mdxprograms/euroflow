import { ChangeEvent } from "react";
import { Handle, Position } from "reactflow";
import shallow from "zustand/shallow";

import { Create, useStore } from "../store";

export type OscProps = {
  id: string;
  data: {
    frequency: number;
    type: OscillatorType;
  };
};

const selector = (id: string, data: OscProps["data"]) => (store: Create) => ({
  setFrequency: (e: ChangeEvent<HTMLInputElement>) =>
    store.updateNode(id, { frequency: +e.target.value, type: data.type }),
  setType: (e: ChangeEvent<HTMLSelectElement>) =>
    store.updateNode(id, {
      frequency: data.frequency,
      type: e.target.value as OscillatorType,
    }),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Osc({ id, data }: OscProps) {
  const { setFrequency, setType } = useStore(selector(id, data), shallow);
  return (
    <div>
      <div>
        <p>Oscillator Node</p>

        <label>
          <span>Frequency</span>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="1000"
            value={data.frequency}
            onChange={setFrequency}
          />
          <span>{data.frequency}Hz</span>
        </label>

        <label>
          <span>Waveform</span>
          <select className="nodrag" value={data.type} onChange={setType}>
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </label>
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
