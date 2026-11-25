// Hero rotator
(function () {
  var words = ['front-end developer', 'Angular enthusiast', 'bug hunter', "Fayoum's own"];
  var el = document.getElementById('rotator');
  var i = 0;
  setInterval(function () {
    i = (i + 1) % words.length;
    el.textContent = words[i];
  }, 2200);
})();

// Bug catcher game
(function () {
  var arena = document.getElementById('arena');
  var bug = document.getElementById('bug');
  var overlay = document.getElementById('overlay');
  var msg = document.getElementById('game-msg');
  var startBtn = document.getElementById('start-btn');
  var hudScore = document.getElementById('hud-score');
  var hudTime = document.getElementById('hud-time');
  var hudBest = document.getElementById('hud-best');

  var running = false;
  var score = 0;
  var best = 0;
  var timeLeft = 20;
  var tickId = null;
  var hopId = null;

  function moveBug() {
    bug.style.left = (5 + Math.random() * 82) + '%';
    bug.style.top = (8 + Math.random() * 76) + '%';
  }

  function stopTimers() {
    if (tickId) { clearInterval(tickId); tickId = null; }
    if (hopId) { clearInterval(hopId); hopId = null; }
  }

  function endGame() {
    running = false;
    stopTimers();
    bug.hidden = true;
    if (score > best) best = score;
    hudBest.textContent = best;
    msg.textContent = score >= 15
      ? 'Whoa, ' + score + ' bugs. Consider a career in QA.'
      : score >= 8
        ? score + ' bugs. Solid reflexes.'
        : score + ' bugs. The bugs are laughing.';
    startBtn.textContent = 'Play again';
    overlay.style.display = 'flex';
  }

  function startGame() {
    score = 0;
    timeLeft = 20;
    running = true;
    hudScore.textContent = '0';
    hudTime.textContent = '20';
    overlay.style.display = 'none';
    bug.hidden = false;
    moveBug();

    stopTimers();
    tickId = setInterval(function () {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        hudTime.textContent = '0';
        endGame();
        return;
      }
      hudTime.textContent = timeLeft;
    }, 1000);

    function scheduleHop() {
      if (hopId) clearInterval(hopId);
      hopId = setInterval(moveBug, Math.max(380, 950 - score * 40));
    }
    scheduleHop();
    bug.dataset.reschedule = '1';
    bug._scheduleHop = scheduleHop;
  }

  startBtn.addEventListener('click', startGame);

  bug.addEventListener('click', function () {
    if (!running) return;
    score += 1;
    hudScore.textContent = score;
    moveBug();
    if (bug._scheduleHop) bug._scheduleHop();
  });
})();

// Copy email
(function () {
  var btn = document.getElementById('copy-btn');
  var original = btn.innerHTML;
  btn.addEventListener('click', function () {
    var email = 'yoseftamer206@gmail.com';
    function done() {
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.innerHTML = original; }, 1600);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done, done);
    } else {
      var ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
  });
})();
