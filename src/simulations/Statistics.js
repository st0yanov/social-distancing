class Statistics {
  constructor({
    unaffected = 0,
    infected = 0,
    cured = 0,
    fatal = 0,
  }) {
    this.unaffectedValue = unaffected;
    this.infectedValue = infected;
    this.curedValue = cured;
    this.fatalValue = fatal;

    this.unaffectedTimelineValue = [];
    this.infectedTimelineValue = [];
    this.curedTimelineValue = [];
    this.fatalTimelineValue = [];
  }

  get unaffected() {
    return this.unaffectedValue;
  }

  set unaffected(unaffected) {
    this.unaffectedValue = unaffected;
  }

  get infected() {
    return this.infectedValue;
  }

  set infected(infected) {
    this.infectedValue = infected;
  }

  get cured() {
    return this.curedValue;
  }

  set cured(cured) {
    this.curedValue = cured;
  }

  get fatal() {
    return this.fatalValue;
  }

  set fatal(fatal) {
    this.fatalValue = fatal;
  }

  get unaffectedTimeline() {
    return this.unaffectedTimelineValue;
  }

  get infectedTimeline() {
    return this.infectedTimelineValue;
  }

  get curedTimeline() {
    return this.curedTimelineValue;
  }

  get fatalTimeline() {
    return this.fatalTimelineValue;
  }

  recordTimelines() {
    this.unaffectedTimelineValue.push(this.unaffectedValue + this.curedValue);
    this.infectedTimelineValue.push(this.infectedValue);
    this.curedTimelineValue.push(this.curedValue);
    this.fatalTimelineValue.push(this.fatalValue);
  }

  reset() {
    this.unaffectedValue = 0;
    this.infectedValue = 0;
    this.curedValue = 0;
    this.fatalValue = 0;
    this.unaffectedTimelineValue = [];
    this.infectedTimelineValue = [];
    this.curedTimelineValue = [];
    this.fatalTimelineValue = [];
  }

  counters() {
    return {
      unaffected: this.unaffectedValue,
      infected: this.infectedValue,
      cured: this.curedValue,
      fatal: this.fatalValue,
    };
  }

  timelines() {
    return {
      unaffectedTimeline: this.unaffectedTimelineValue,
      infectedTimeline: this.infectedTimelineValue,
      curedTimeline: this.curedTimelineValue,
      fatalTimeline: this.fatalTimelineValue,
    };
  }
}

export default Statistics;
