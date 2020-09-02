(() => {
  const challenges = [
    {
      title: 'Node Challenge',
      id: '593ea9e1272ca0001dc78310',
      score: 0,
    },
    {
      title: 'Ruby on Rails Challenge',
      id: '5942c122932bf7000cbe23bd',
      score: 0,
    },
    {
      title: 'PostgreSQL Challenge',
      id: '5942dd00baa76e001ea2de05',
      score: 0,
    },
    {
      title: 'React Challenge',
      id: '5942d33abaa76e0012a2ddc0',
      score: 0,
    },
  ];

  const progressNodeMeter = document.querySelector('.progress-meter .meter');
  const progressNodeText = document.querySelector('.progress-meter .text');
  const containerNode = document.querySelector('.qualified-embeds');

  const managerConfig = {
    autoCreate: false,
    options: {
      embedClientKey: '9icrHZFzFYPdOWaPsPEwEptLAkS0wLdD',
      theme: 'light',
    },
  };

  const manager = window.QualifiedEmbed.init(managerConfig);

  function updateScore() {
    let total = 0;
    challenges.forEach(challenge => {
      total += Math.min(100, Math.max(0, challenge.score));
    });
    const percent = Math.round(10 * total / (challenges.length)) / 10;
    progressNodeMeter.style.width = percent + '%';
    progressNodeText.textContent = percent >= 100 ? 'All Complete!' : (percent + '%' + ' Completed across all challenges');
  }

  function createHeader(challenge, node) {
    const header = document.createElement('h2');
    const title = document.createElement('span');
    title.classList.add('challenge-title');
    title.textContent = challenge.title;
    header.appendChild(title);
    const score = document.createElement('span');
    score.classList.add('challenge-score');
    score.textContent = '—';
    header.appendChild(score);
    node.appendChild(header);
    return score;
  }

  function createEditor(challenge, node) {
    manager.createEditor({
      node: node,
      challengeId: challenge.id,
      options: {
        onRun({ data }) {
          if(data.type === 'attempt') {
            console.log(data);
            challenge.node.classList.remove('error', 'partial', 'success');
            // TODO: replace with data.score once embeds supports it
            challenge.score = 0;
            if(data.flags.passed) {
              challenge.score = 100;
              challenge.headerScore.textContent = '100%';
              challenge.node.classList.add('success');
            } else if(data.flags.success && data.result.passed) {
              challenge.score = 50;
              challenge.headerScore.textContent = '50%';
              challenge.node.classList.add('partial');
            } else {
              challenge.headerScore.textContent = '0%';
              challenge.node.classList.add('error');
            }
            updateScore();
          }
        },
      },
    });
  }

  challenges.forEach(challenge => {
    const node = challenge.node = document.createElement('div');
    node.classList.add('qualified-embed');
    challenge.headerScore = createHeader(challenge, node);
    createEditor(challenge, node);
    containerNode.appendChild(node);
  });

  updateScore();

})();

