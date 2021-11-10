export interface CounterState {
  counter: number;
  channelName: string;
}

export const initialState: CounterState = {
  counter: 4,
  channelName: 'Noor Web Dev',
};
