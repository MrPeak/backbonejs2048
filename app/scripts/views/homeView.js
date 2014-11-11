define(['backbone', '../collections/tileCollection'], function(Backbone, Rects) {
  // 'use strict';
  var HomeView = Backbone.View.extend({
    el: 'body',
    initialize: function() {
      
      this.$loginModal = this.$el.find('.modal.login');
      this.$logoutModal = this.$el.find('.modal.logout');

      var hasLogin = this._checkLogin();
      this._handleLogin(hasLogin);

      this.isLogin = hasLogin;
    },
    render: function() {

      $('.dimmer.body').removeClass('active');
      
      if (this.isLogin == 'false') return;

      var tplStr = '<a class="item" id="user-info">Welcom!' 
                 + '<%= user.name %> <i class="user icon"></i>';

      var compiledTpl = _.template(tplStr)({
        user: {
          name: 'gaofeng',
          email: 'gfeng.peak@gmail.com'
        }
      });
      
      this.$el
        .find('#login-nav')
        .addClass('util-hidden')
        .end()
        .find('#logout-nav')
        .removeClass('util-hidden')
        .before(compiledTpl);
      
      return this;
    },
    events: {
      'click .skip, #cancel-signup': '_skipLogin',
      'click #login-nav': '_handleLogin',
      'click #logout-nav': '_handleLogout',
      'click #goto-signup': '_goToSignUp'

    },
    _checkLogin: function() {
      // session 逻辑
      return false;
    },
    _handleLogin: function(hasLogin) {
      if (hasLogin === true) {
        return true;
      } else if (typeof hasLogin.type == 'string') {
        this.$loginModal.modal('show');
      } else {
        if (window.sessionStorage.isFirstVisit == 'no') return;

        this.$loginModal
          .modal('setting', {
            closable: false,
            onShow: function() {
              $(this)
                .find('.checkbox')
                .checkbox();
              // tell browser this user has been visited
              window.sessionStorage.isFirstVisit = 'no';
            },
            onHide: function() {
              $(this)
                .find('input[type="text"], input[type="password"]')
                .val('');
            }
          })
          .modal('show');
      }
    },
    _handleLogout: function() {
      var that = this;
      $('.ui.text', '.dimmer.body').addClass('util-hidden');
      that.$logoutModal.modal('setting', {
        onHide: function () {
          $('.ui.text', '.dimmer.body').removeClass('util-hidden');
        },        
        onDeny: function() {
          $(this).modal('hide');
        },
        onApprove: function() {
          that._cleanUserData();
          window.location.reload();
        }
      }).modal('show');
      

    },
    _skipLogin: function() {
      var that = this;
      that.$loginModal
        .modal('hide')
        .find('input[type="text"], input[type="password"]')
        .val('');
      window.setTimeout(that._resetPane, 1000);
    },
    _cleanUserData: function() {
      this.isLogin = false;
      window.localStorage.setItem('isLogin', false);
    },
    _goToSignUp: function() {
      $('#login-pane')
        .transition({
          duration: '0.1s',
          onHide: function() {
            $(this)
              .siblings('#signup-pane')
              .transition({
                animate: 'scala',
                duration: '0.1s'
              });
          }
        });
    },
    _resetPane: function() {
      $('#login-pane').removeClass('transition hidden visible');
      $('#signup-pane')
        .removeClass('visible')
        .addClass('hidden');
    }
  });

  return HomeView;
});
