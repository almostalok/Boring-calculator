// ─── Skin ───────────────────────────────────────────────────────────────────
export interface Skin {
  id: string;
  name: string;
  tagline: string;
  // app background
  bg: string;
  // big 3-D number
  faceColor: string;
  shadowColor: string;
  shadowType: 'solid' | 'gradient';
  // equation line
  eqColor: string;
  eqOpColor: string;
  // keypad
  numColor: string;
  opColor: string;
  eqBtnColor: string;
  fnColor: string;
}

// ─── Calculator State ────────────────────────────────────────────────────────
export interface CalcState {
  expr: string;       // the live expression string
  result: string;     // formatted result after = pressed
  settled: boolean;   // true after = was pressed
}

// ─── Button ──────────────────────────────────────────────────────────────────
export type KeyKind = 'num' | 'op' | 'eq' | 'fn';

export interface KeyDef {
  label: string;
  kind: KeyKind;
}

// ─── Token (for equation display) ────────────────────────────────────────────
export interface Token {
  type: 'num' | 'op';
  value: string;
}
