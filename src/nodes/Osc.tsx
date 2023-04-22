import { ChangeEvent, useState } from "react";
import { Handle, Position } from "reactflow";
import { shallow } from "zustand/shallow";
import {
  Card,
  Dropdown,
  Input,
  Text,
  FormElement,
  Grid,
} from "@nextui-org/react";

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
  const [selected, setSelected] = useState<string>("sine");

  const handleFreqChange = (e: ChangeEvent<HTMLInputElement | FormElement>) => {
    setFrequency(e as ChangeEvent<HTMLInputElement>);
  };

  return (
    <div>
      <Card variant="flat" css={{ mh: "300px", bg: "#000" }}>
        <Card.Body css={{ pt: 0 }}>
          <Text color="primary" h4 css={{ mb: 0 }}>
            Oscillator
          </Text>

          <Grid.Container gap={1}>
            <Grid>
              <Text color="primary" size="small">
                Frequency
              </Text>
              <Text color="success" size="x-small">
                {data.frequency}Hz
              </Text>

              <Input
                color="primary"
                size="xs"
                className="nodrag"
                type="range"
                min="10"
                max="1000"
                value={data.frequency}
                onChange={handleFreqChange}
              />

              <Text color="primary" size="small">
                Waveform
              </Text>

              <Dropdown>
                <Dropdown.Button size="xs">{selected}</Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Oscillator selection"
                  className="nodrag"
                  disallowEmptySelection
                  onChange={setType}
                  onSelectionChange={(key) => setSelected(key as string)}
                  selectedKeys={selected}
                  selectionMode="single"
                >
                  <Dropdown.Item key="sawtooth">sawtooth</Dropdown.Item>
                  <Dropdown.Item key="sine">sine</Dropdown.Item>
                  <Dropdown.Item key="square">square</Dropdown.Item>
                  <Dropdown.Item key="triangle">triangle</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
