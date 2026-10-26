import { useState } from 'react';
import { CoinIcon } from '../icons/UIIcons';

const question = {
  prompt: '整理完自己的书架后，下一步最好的做法是？',
  answers: ['把书随手放在地上', '检查书本是否摆放整齐', '马上离开房间'],
  correct: 1,
};

export function Quiz() {
  const [selected, setSelected] = useState<number | null>(null);
  const [complete, setComplete] = useState(false);

  const submit = () => {
    if (selected !== null) setComplete(true);
  };

  return (
    <section className="quiz-page tq-card tq-card-padded page-enter">
      <div className="quiz-eyebrow"><CoinIcon /> Quiz for Olive Coins · 答题淘金币</div>
      <h2>今日橄榄树小挑战</h2>
      <p>回答生活小问题，培养好习惯。答题奖励由家庭管理员统一结算。</p>
      <div className="quiz-question">
        <strong>{question.prompt}</strong>
        <div className="quiz-options">
          {question.answers.map((answer, index) => (
            <button key={answer} className={selected === index ? 'selected' : ''} onClick={() => { setSelected(index); setComplete(false); }}>
              {answer}
            </button>
          ))}
        </div>
      </div>
      {complete && <div className={selected === question.correct ? 'quiz-result success' : 'quiz-result'}>{selected === question.correct ? '答对了！继续积累橄榄币吧。' : '再想一想，整齐收纳是很棒的习惯。'}</div>}
      <button className="tq-btn tq-btn-primary" disabled={selected === null} onClick={submit}>提交答案</button>
    </section>
  );
}
