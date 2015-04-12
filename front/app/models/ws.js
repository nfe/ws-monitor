import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  state: DS.attr('string'),
  count: DS.attr('number'),
  lastStatus: DS.attr('string'),
  statusChangedOn: DS.attr('date'),
  lastResponseTime: DS.attr('number'),
  totalResponseTime: DS.attr('number'),
  avgResponseTime: function() {
    return parseInt(this.get('totalResponseTime') / this.get('count'), 10);
  }.property('totalResponseTime', 'count'),
  icon: function() {
    if (this.get("state") === "UP") {
      return "arrow-circle-up";
    } else {
      return "arrow-circle-down";
    }
  }.property('state')
});
