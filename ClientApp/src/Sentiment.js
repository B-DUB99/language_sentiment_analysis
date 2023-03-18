function Sentiment({ value }) {
  const isPositive = value >= 0;
  const face = isPositive ? "😊" : "☹️";

  return face;
}

export default Sentiment;
