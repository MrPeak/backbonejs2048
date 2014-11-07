define(['backbone', 'text!../../templates/rankTpl.html', 'text!../../templates/rankLocalTpl.html', '../collections/rankCollection'], function(Backbone, rankTpl, rankLocalTpl, RankCollection) {

  rankCollection = new RankCollection();

  var RankView = Backbone.View.extend({
    el: '.main',
    initialize: function() {
      this.listenToOnce(rankCollection, 'change', this.render);
      rankCollection.fetch({
        data: {
          type: 'daily'
        }
      }).always(function() {
        $('.inverted.dimmer').removeClass('active');
      });
    },
    events: {
      'click .rank-type': 'switchRank'
    },
    template: _.template(rankTpl),
    render: function(collection) {
      this.listenTo(rankCollection, 'change', this.localRender);
      this.$el.html(this.template(collection.toJSON()));
      return this;
    },
    localRender: function(collection) {
      // this.localTemplate(collection.toJSON());
      this.localTemplate = _.template(rankLocalTpl);
      this.$el.find('.ui.animated.list').html(this.localTemplate(collection.toJSON()))
    },
    switchState: function($target) {
      $target.hasClass('active') ? $.noop() : $target
        .siblings('.item')
        .removeClass('active')
        .end()
        .addClass('active');
    },
    switchRank: function(e) {
      var $target = $(e.target);

      if ($target[0].tagName.toLowerCase() != 'a') return;
      if ($target.hasClass('active')) return;

      var that = this;
      // switch sidenav's state
      this.switchState($target);

      $('.inverted.dimmer').addClass('active');
      window.location.hash += $target.data('target');

      rankCollection
        .fetch({
          data: {
            type: $target.data('target')
          }
        })
        .fail(function() {
          var isReload = window.confirm('请求失败，请刷新浏览器！')
          if (isReload) {
            window.location.reload();
          }
        })
        .always(function() {
          $('.inverted.dimmer').removeClass('active');
        });

    }
  });

  return RankView;
});
