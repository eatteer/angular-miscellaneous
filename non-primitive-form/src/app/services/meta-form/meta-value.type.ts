export interface MetaValue<Value, MetaValue> {
  label: string;
  value: Value;
  metaValue: MetaValue;
}
