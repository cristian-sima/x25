type This = any;
import { normalizeNumber } from "./numbers";

export const handleBlur = (that: This) => {
  const {
      state,
      props,
    } = that,
    {
      input,
      normalizeValue,
      optional,
    } = props,
    {
      onBlur,
    } = input,
    {
      value: currentValue,
    } = state,

    performBlur = (value: number | null, shouldRenderAgain: boolean) => {
      input.onChange(value);

      /*
     * Swallow the event to prevent Redux Form from
     * extracting the form value
     */
      onBlur();

      if (shouldRenderAgain) {
        const setState = that.setState.bind(that);

        return setState({
          value,
        });
      }

      return null;
    },

    shouldNotChange = currentValue === "" && optional;

  if (shouldNotChange) {
    if (input.value === "") {
      return null;
    }

    return performBlur(null, true);
  }

  const normalizedValue = normalizeValue(currentValue),
    shouldRenderAgain = !isNaN(normalizedValue) && currentValue !== normalizedValue;

  return performBlur(normalizedValue, shouldRenderAgain);
};
export const normalizeFloat = (raw: string): number => {
  /* eslint-disable no-magic-numbers */
  const value = normalizeNumber(raw),
    shouldNotNormalize = value.trim() === "" || isNaN(Number(value));

  if (shouldNotNormalize) {
    return NaN;
  }

  const result = Number(value),
    truncateTo = (unRouned: number, nrOfDecimals = 2): number => {
      const parts = String(unRouned).split(".");

      if (parts.length !== 2) {
      // ex. 12
        return unRouned;
      }

      const newDecimals = parts[1].slice(0, nrOfDecimals),
        newString = `${parts[0]}.${newDecimals}`;

      return Number(newString);
    },
    normalized = truncateTo(result);

  return normalized;
};
export const cwrp = (that: This, nextany: any) => {
  const {
      state,
    } = that,
    {
      input: {
        value: newValue,
      },
    } = nextany,
    {
      value: currentValue,
    } = state,
    shouldRenderAgain = !isNaN(newValue) && currentValue !== newValue,
    setState = that.setState.bind(that);

  if (shouldRenderAgain) {
    setState({
      value: newValue,
    });
  }
};
