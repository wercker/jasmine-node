var jasmineNode = require(__dirname + "/../lib/jasmine-node/reporter").terminalReporters

describe('TerminalReporter', function() {
  beforeEach(function() {
    var config = {}
    this.reporter = new jasmineNode.TerminalReporter(config);
  });

  describe("initialize", function() {
    it('initializes print from config', function() {
      var config = { print: true };
      this.reporter = new jasmineNode.TerminalReporter(config);
      expect(this.reporter.config.print).toBeTruthy();
    });

    it('initializes color from config', function() {
      var config = { color: true }
      this.reporter = new jasmineNode.TerminalReporter(config);
      expect(this.reporter.config.color).toEqual(jasmineNode.TerminalReporter.prototype.ANSIColors);
    });

    it('initializes includeStackTrace from config', function () {
        var config = {}
        this.reporter = new jasmineNode.TerminalReporter(config);
        expect(this.reporter.config.includeStackTrace).toBeTruthy();
    });

    it('initializes the suites hash', function() {
      var config = {}
      this.reporter = new jasmineNode.TerminalReporter(config);
      expect(this.reporter.suites).toEqual({});
    });

    it('initializes the specCounts to an Object', function() {
      var config = {}
      this.reporter = new jasmineNode.TerminalReporter(config);
      expect(this.reporter.counts).toBeDefined();
    });

    it('sets the callback property to false by default', function() {
      var config = {}
      this.reporter = new jasmineNode.TerminalReporter(config);
      expect(this.reporter.config.callback).toEqual(jasmine.any(Function))
    });

    it('sets the callback property to callback if supplied', function() {
      var foo = function() { }
      var config = { callback: foo }
      this.reporter = new jasmineNode.TerminalReporter(config);
      expect(this.reporter.config.callback).toBe(foo)
    });
  });

  describe('when the report runner starts', function() {
    beforeEach(function() {
      this.spy = spyOn(this.reporter.config, 'print');

      var runner = {
          totalSpecsDefined: 3
      };
      this.reporter.jasmineStarted(runner);
    });

    it('sets the startedAt field', function() {
      // instanceof does not work cross-context (such as when run with requirejs)
      var ts = Object.prototype.toString;
      expect(ts.call(this.reporter.startedAt)).toBe(ts.call(+new Date()));
    });

    it('buildes the suites collection', function() {
      suite = {
          "description": "jasmine-node-flat",
          "fullName": "jasmine-node-flat",
          "id": "suite1",
          "status": ""
      };
      this.reporter.suiteStarted(suite);
      expect(this.reporter.suites['suite1']).toEqual(suite);
    });
  });
});
