$(function() {
  $.fn.timer = function(audio) {
    var notifier = new Audio(audio);

    var session = this.find('[data-wrapper="session"]').first();
    var sessionProgress = $(session).find('[data-progress="session"]').first();
    var round = this.find('[data-wrapper="round"]').first();
    var roundProgress = $(round).find('[data-progress="round"]').first();
    var status = this.find('[data-status]').first();

    var currentRound = 0;
    var rounds = 1;
    var totalRounds = 100;
    var roundDuration = 6000;
    var shotVolume = 25;

    var tickRate = roundDuration/1000;

    var progressDimension = 'height';
    var progressInvert = true;

    function nextRound() {
      rounds += 1;
      currentRound = 0;

      roundProgress.css(progressDimension, '0%');

      notifier.play();
    }

    function updateStatus() {
      var message = "Shot " + rounds + "/" + totalRounds;
      var countdown = Math.round((roundDuration - currentRound) / 1000) + " seconds";
      var volumeMl = shotVolume * rounds;
      var volumePints = volumeMl > 0 ? volumeMl * 0.00175975326 : 0;
      var volume = volumeMl + " ml, or " + +volumePints.toFixed(2) + " pints";
      status.html("<h1>" + message + "</h1><p>" + countdown + "</p><p>" + volume + "</p>");
    }

    function updateProgress() {
      currentRound += tickRate;
      var progress = currentRound / roundDuration * 100;
      var totalProgress = (rounds - 1) / totalRounds * 100;
      totalProgress += progress / 100;

      roundProgress.css(progressDimension, progress + '%');
      sessionProgress.css('width', totalProgress + '%');

      if (currentRound >= roundDuration) {
        nextRound();
      }
    }

    window.setInterval(updateProgress, tickRate);
    window.setInterval(updateStatus, 1000);
    updateStatus();

    return this;
  };
});
