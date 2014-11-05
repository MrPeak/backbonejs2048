define(['backbone', 'text!../../templates/rankTpl.html', '../models/rank'], function(Backbone, rankTpl, Rank) {
  var RankView = Backbone.View.extend({
    el: '.main',
    initialize: function() {
      this.modelList = {};
    },
    events: {
      'click .rank-type': 'switchRank'
    },
    template: _.template(rankTpl),
    render: function() {
      this.$el.html(this.template());
      this.$listTpl = this.$el.find('.animated.list')[0].innerHTML;
      this.localTemplate = _.template(this.$listTpl);
    },
    localRender: function(json) {
      this.localTemplate(json);
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
      var that = this;
      // switch sidenav's state
      this.switchState($target);

      $('.dimmer').addClass('active');
      window.location.hash += $target.data('target'); 

      if (this.modelList[$target.data('target') + 'RankModel'] === undefined) {
        this.modelList[$target.data('target') + 'RankModel'] = new Rank({id: $target.data('target')});
      }

      this.modelList[$target.data('target') + 'RankModel']
        .fetch()
        .done(function(json) {
          console.log(json);
          that.localRender(json);
        })
        .fail(function() {
          var isReload = window.confirm('请求失败，请刷新浏览器！')
          if (isReload) {
            window.location.reload();
          }
        })
        .always(function() {
          $('.dimmer').removeClass('active');
        });
      
    }
  });

  return RankView;
});
  