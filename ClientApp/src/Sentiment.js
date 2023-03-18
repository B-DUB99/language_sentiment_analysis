function Sentiment({ positiveSentiment, negativeSentiment }) {
  const faces = ["😊", "🙂", "😐", "🙁", "😡"];

  if (negativeSentiment > 0.9) {
    return faces[4];
  }
  if (negativeSentiment > 0.65) {
    return faces[3];
  }

  if (positiveSentiment > 0.9) {
    return faces[0];
  }
  if (positiveSentiment > 0.65) {
    return faces[1];
  }

  return faces[2];
}

export default Sentiment;
