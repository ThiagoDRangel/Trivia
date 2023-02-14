const score = (question, time) => {
  const HIT = 10;
  const rule = 3;

  switch (question.difficulty) {
    case 'easy': {
      return HIT + 1 * time;
    }
    case 'medium': {
      return HIT + 2 * time;
    }
    case 'hard': {
      return HIT + rule * time;
    }
    default: {
      return console.log('O sistema de pontuação não funciona');
    }
  }
};

export default score;
