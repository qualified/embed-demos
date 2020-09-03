(() => {
  const challenges = [
    {
      title: 'Part 1: Node',
      description: `\
<p>Network of <i>wormholes paroxysm</i> of global death cosmic fugue corpus callosum permanence of the stars stirred by starlight?</p>
<p>Emerged into consciousness extraordinary claims require <code>extraordinary</code> evidence circumnavigated. The sky calls to us made in the interiors of collapsing stars a still more glorious dawn awaits. Hearts of the stars a mote of dust suspended in a sunbeam are creatures of the cosmos.</p>
<h3>Example:</h3>
<pre><code>app.post('/blobs', function(req, res){    
    // response goes here
});</code></pre>
<p>With pretty stories for which there's little good evidence two ghostly white figures in coveralls and helmets are softly dancing concept of the number one.</p>`,
      id: '593ea9e1272ca0001dc78310',
      score: 0,
    },
    {
      title: 'Part 2: Ruby on Rails',
      description: `\
<p>The ash of stellar alchemy galaxies the carbon in our apple pies explorations from which we spring not a sunrise but a galaxyrise.</p>
<p>Shores of the cosmic ocean a still more glorious dawn awaits the only home we've ever known astonishment something incredible is waiting to be known globular star cluster? Descended from astronomers venture venture Euclid descended from <a>astronomers made in the interiors of collapsing</a> stars?</p>
<h3>Example:</h3>
<pre><code>render json: Album.all</code></pre>
<p>A mote of dust suspended in a sunbeam great turbulent clouds two ghostly white figures in coveralls and helmets are softly dancing invent the universe vastness is bearable only through love encyclopaedia galactica.</p>`,
      id: '5942c122932bf7000cbe23bd',
      score: 0,
    },
    {
      title: 'Part 3: SQL',
      description: `\
<p>Birth rich in mystery billions upon billions ship of the imagination tesseract. A mote of dust suspended in a sunbeam? Invent the universe hundreds of thousands the sky calls to us realm of the galaxies how far away dream of the mind's eye. From which we spring stirred by starlight great turbulent <code>FROM</code>, <code>JOIN</code>, <code>GROUP</code>, and <code>LIMIT</code>.</p>
<p>Are creatures of the cosmos another world with pretty stories for which there's little <strong>good</strong> evidence the only home we've ever known astonishment star stuff harvesting star light and billions upon billions upon billions upon billions upon billions upon billions upon billions.</p>`,
      id: '5942dd00baa76e001ea2de05',
      score: 0,
    },
    {
      title: 'Part 4: React',
      description: `\
<p>Cosmic fugue the carbon in our apple pies realm of the galaxies corpus callosum astonishment star stuff harvesting star light. Dispassionate extraterrestrial observer cosmic ocean emerged into consciousness. Orion's sword invent the universe kindling the energy hidden in matter.</p>
<p>Finite but unbounded gathered by gravity as a patch of light white dwarf inconspicuous motes of rock and gas bits of moving fluff.</p>
<p>Permanence of the stars with pretty stories for which there's little good evidence with pretty stories for which there's little good evidence vastness is bearable only through love two ghostly white figures in coveralls and helmets are softly dancing Orion's sword?</p>`,
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
    node.appendChild(header);
  }

  function createContent(challenge, node) {
    const desc = document.createElement('div');
    desc.classList.add('challenge-description');
    desc.innerHTML = challenge.description + '<h3>Your Solution:</h3>';
    node.appendChild(desc);
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
            challenge.score = 0;
            if(data.flags.passed) {
              challenge.score = 100;
              challenge.node.classList.add('success');
            } else if(data.flags.success && data.result.passed) {
              challenge.score = 50;
              challenge.node.classList.add('partial');
            } else {
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
    createHeader(challenge, node);
    createContent(challenge, node);
    createEditor(challenge, node);
    containerNode.appendChild(node);
  });

  updateScore();

})();

