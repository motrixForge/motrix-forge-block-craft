System.register("chunks:///_virtual/AdventureResultScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts', './BaseScreen.ts', './AdsUtils.ts', './ModeUtils.ts', './ScreenEntrance.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Button, Tween, tween, GameEvents, BaseScreen, AdsUtils, GAME_MODE, ScreenEntrance;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Button = module.Button;
      Tween = module.Tween;
      tween = module.tween;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      AdsUtils = module.AdsUtils;
    }, function (module) {
      GAME_MODE = module.GAME_MODE;
    }, function (module) {
      ScreenEntrance = module.ScreenEntrance;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "ed2c9Z3LAZJ/qqSlLk5zPUb", "AdventureResultScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TITLE_POP = 0.3;
      var TURNS_DELAY = 0.26;
      var TURNS_POP = 0.22;
      var COUNT_UP_TIME = 0.65;
      var BEST_DELAY = 0.5;
      var BEST_POP = 0.2;
      var BUTTONS_DELAY = 0.62;
      var BUTTONS_RISE = 0.34;
      var AdventureResultScreen = exports('AdventureResultScreen', (_dec = ccclass('AdventureResultScreen'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Button), _dec6 = property(Button), _dec7 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(AdventureResultScreen, _BaseScreen);
        function AdventureResultScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "titleLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "turnsLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bestLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nextButton", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "retryButton", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "homeButton", _descriptor6, _assertThisInitialized(_this));
          _this.entrance = new ScreenEntrance();
          // Held on the instance rather than made per call, so reopening the screen can stop the count
          // still running from the previous win instead of leaving two of them writing one label.
          _this.countProxy = {
            value: 0
          };
          _this.countTarget = 0;
          _this.handleNextClicked = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            _this.node.scene.emit(GameEvents.HANDLE_START_GAME, GAME_MODE.ADVENTURE);
          };
          _this.handleRetryClicked = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            _this.node.scene.emit(GameEvents.HANDLE_GAME_RETRY);
          };
          _this.handleHomeClicked = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            _this.node.scene.emit(GameEvents.HANDLE_RETURN_TO_DASHBOARD);
          };
          return _this;
        }
        var _proto = AdventureResultScreen.prototype;
        _proto.__preload = function __preload() {
          this.registerEvents();
        };
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvents();
        };
        _proto.registerEvents = function registerEvents() {
          this.nextButton.node.on(Button.EventType.CLICK, this.handleNextClicked, this);
          this.retryButton.node.on(Button.EventType.CLICK, this.handleRetryClicked, this);
          this.homeButton.node.on(Button.EventType.CLICK, this.handleHomeClicked, this);
        };
        _proto.unregisterEvents = function unregisterEvents() {
          this.nextButton.node.off(Button.EventType.CLICK, this.handleNextClicked, this);
          this.retryButton.node.off(Button.EventType.CLICK, this.handleRetryClicked, this);
          this.homeButton.node.off(Button.EventType.CLICK, this.handleHomeClicked, this);
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return AdsUtils.getInstance().showInterstitialAdAsync('run-end');
                case 2:
                  _context.next = 4;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 4:
                  if (data) {
                    _context.next = 6;
                    break;
                  }
                  return _context.abrupt("return");
                case 6:
                  if (data.result === 'win') this.renderWin(data);else this.renderFail(data);
                  this.animEntrance(data);
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.stopEntrance();
                  _context2.next = 3;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.renderWin = function renderWin(data) {
          var _data$turns, _data$best, _data$hasNext;
          if (this.titleLabel) this.titleLabel.string = data.levelName + " Cleared!";
          if (this.turnsLabel) this.turnsLabel.string = "Moves: " + ((_data$turns = data.turns) != null ? _data$turns : 0);
          if (this.bestLabel) this.bestLabel.string = "Best: " + ((_data$best = data.best) != null ? _data$best : 0);
          if (this.nextButton) this.nextButton.node.active = (_data$hasNext = data.hasNext) != null ? _data$hasNext : false;
        };
        _proto.renderFail = function renderFail(data) {
          if (this.titleLabel) {
            this.titleLabel.string = data.reason === 'time' ? "Time's up!" : 'Out of moves!';
          }
          if (this.turnsLabel) this.turnsLabel.string = data.levelName;
          if (this.bestLabel) this.bestLabel.string = '';
          if (this.nextButton) this.nextButton.node.active = false;
        }

        /**
         * The screen used to snap on whole — `BaseScreen.openScreenAsync` only flips `active`. This
         * staggers it in so a cleared level has a payoff instead of a popup.
         */;
        _proto.animEntrance = function animEntrance(data) {
          var _this$titleLabel, _this$turnsLabel, _this$bestLabel, _this$retryButton, _data$turns2;
          // Cleared before the reset below, or a fail opened after a win would have the previous
          // run's move count written over the level name this screen just rendered.
          this.countTarget = 0;
          this.stopEntrance();
          this.entrance.pop((_this$titleLabel = this.titleLabel) == null ? void 0 : _this$titleLabel.node, 0, TITLE_POP);
          this.entrance.pop((_this$turnsLabel = this.turnsLabel) == null ? void 0 : _this$turnsLabel.node, TURNS_DELAY, TURNS_POP);
          this.entrance.pop((_this$bestLabel = this.bestLabel) == null ? void 0 : _this$bestLabel.node, BEST_DELAY, BEST_POP);
          this.entrance.rise((_this$retryButton = this.retryButton) == null ? void 0 : _this$retryButton.node.parent, this.node, BUTTONS_DELAY, BUTTONS_RISE);
          if (data.result !== 'win') return;
          this.animCountUp((_data$turns2 = data.turns) != null ? _data$turns2 : 0);
        };
        _proto.animCountUp = function animCountUp(turns) {
          var label = this.turnsLabel;
          if (!label || turns <= 0) return;
          var proxy = this.countProxy;
          Tween.stopAllByTarget(proxy);
          proxy.value = 0;
          this.countTarget = turns;
          label.string = 'Moves: 0';
          tween(proxy).delay(TURNS_DELAY + TURNS_POP).to(COUNT_UP_TIME, {
            value: turns
          }, {
            easing: 'quadOut',
            onUpdate: function onUpdate() {
              label.string = "Moves: " + Math.round(proxy.value);
            }
          }).call(function () {
            label.string = "Moves: " + turns;
          }).start();
        };
        _proto.stopEntrance = function stopEntrance() {
          Tween.stopAllByTarget(this.countProxy);
          if (this.countTarget > 0 && this.turnsLabel) {
            this.turnsLabel.string = "Moves: " + this.countTarget;
          }
          this.entrance.settle();
        };
        return AdventureResultScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "turnsLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bestLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nextButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "retryButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "homeButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DailyQuestScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts', './DailyQuestRow.ts', './BaseScreen.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Button, GameEvents, DailyQuestRow, BaseScreen;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Button = module.Button;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      DailyQuestRow = module.DailyQuestRow;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "891fbAa+RxKN5YI6twI/0mm", "DailyQuestScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DailyQuestScreen = exports('DailyQuestScreen', (_dec = ccclass('DailyQuestScreen'), _dec2 = property([DailyQuestRow]), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(DailyQuestScreen, _BaseScreen);
        function DailyQuestScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "rows", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "streakLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinsLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeButton", _descriptor4, _assertThisInitialized(_this));
          _this.handleClickClose = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
          };
          return _this;
        }
        var _proto = DailyQuestScreen.prototype;
        _proto.__preload = function __preload() {
          var _this$closeButton,
            _this2 = this;
          (_this$closeButton = this.closeButton) == null || _this$closeButton.node.on(Button.EventType.CLICK, this.handleClickClose, this);
          var _loop = function _loop(i) {
            var row = _this2.rows[i];
            if (row) row.onClaim = function () {
              return _this2.claim(i);
            };
          };
          for (var i = 0; i < this.rows.length; i++) {
            _loop(i);
          }
        };
        _proto.onDestroy = function onDestroy() {
          var _this$closeButton2;
          (_this$closeButton2 = this.closeButton) == null || _this$closeButton2.node.off(Button.EventType.CLICK, this.handleClickClose, this);
          for (var _iterator = _createForOfIteratorHelperLoose(this.rows), _step; !(_step = _iterator()).done;) {
            var row = _step.value;
            if (row) row.onClaim = null;
          }
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            var i, row, rowData;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  if (data) {
                    _context.next = 4;
                    break;
                  }
                  return _context.abrupt("return");
                case 4:
                  i = 0;
                case 5:
                  if (!(i < this.rows.length)) {
                    _context.next = 14;
                    break;
                  }
                  row = this.rows[i];
                  if (row) {
                    _context.next = 9;
                    break;
                  }
                  return _context.abrupt("continue", 11);
                case 9:
                  rowData = data.rows[i];
                  if (rowData) row.render(rowData);else row.hide();
                case 11:
                  i++;
                  _context.next = 5;
                  break;
                case 14:
                  if (this.streakLabel) this.streakLabel.string = "" + data.streak;
                  if (this.coinsLabel) this.coinsLabel.string = "" + data.coins;
                case 16:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            var _iterator2, _step2, row;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  for (_iterator2 = _createForOfIteratorHelperLoose(this.rows); !(_step2 = _iterator2()).done;) {
                    row = _step2.value;
                    row == null || row.rest();
                  }
                  _context2.next = 3;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.claim = function claim(index) {
          this.playClickSfx();
          this.node.scene.emit(GameEvents.HANDLE_CLAIM_QUEST, index);
        };
        return DailyQuestScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rows", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "streakLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "coinsLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DashboardScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ScreenManager.ts', './GameEvents.ts', './CurrencyCounter.ts', './BaseScreen.ts', './ModeUtils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, _createClass, cclegacy, _decorator, Button, ScreenManager, GameEvents, ScreenNames, CurrencyCounter, BaseScreen, GAME_MODE;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }, function (module) {
      GameEvents = module.GameEvents;
      ScreenNames = module.ScreenNames;
    }, function (module) {
      CurrencyCounter = module.CurrencyCounter;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      GAME_MODE = module.GAME_MODE;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
      cclegacy._RF.push({}, "b1269ZFTdJLN6IrO36nuAoL", "DashboardScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DashboardScreen = exports('DashboardScreen', (_dec = ccclass('DashboardScreen'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Button), _dec7 = property(Button), _dec8 = property(CurrencyCounter), _dec9 = property(CurrencyCounter), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(DashboardScreen, _BaseScreen);
        function DashboardScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "adventureButton", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "classicButton", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "tournamentButton", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "dailyButton", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "wheelButton", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "shopButton", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinCounter", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "heartCounter", _descriptor8, _assertThisInitialized(_this));
          _this.handleWalletChanged = function () {
            var _this$coinCounter, _this$heartCounter;
            (_this$coinCounter = _this.coinCounter) == null || _this$coinCounter.animToWallet();
            (_this$heartCounter = _this.heartCounter) == null || _this$heartCounter.animToWallet();
          };
          _this.handleClickPlayClassic = function () {
            _this.playClickSfx();
            _this.node.scene.emit(GameEvents.HANDLE_START_GAME, GAME_MODE.CLASSIC);
          };
          _this.handleClickPlayAdventure = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _this.playClickSfx();
                  _context.next = 3;
                  return ScreenManager.instance.openScreenAsync(ScreenNames.LEVEL_SELECT_SCREEN);
                case 3:
                  _this.closeScreenAsync();
                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          _this.handleClickPlayTournament = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var _window$GameSDK;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _this.playClickSfx();
                  _context2.next = 3;
                  return (_window$GameSDK = window.GameSDK) == null ? void 0 : _window$GameSDK.findAndJoinTournamentAsync();
                case 3:
                  ScreenManager.instance.openScreenAsync(ScreenNames.LEADERBOARD_SCREEN, {
                    framing: 'entry'
                  });
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          _this.handleClickDaily = function () {
            _this.playClickSfx();
            _this.node.scene.emit(GameEvents.HANDLE_OPEN_DAILY_QUESTS);
          };
          _this.handleClickWheel = function () {
            _this.playClickSfx();
            ScreenManager.instance.openScreenAsync(ScreenNames.RANDOM_WHEEL_SCREEN);
          };
          _this.handleClickShop = function () {
            _this.playClickSfx();
            ScreenManager.instance.openScreenAsync(ScreenNames.SHOP_SCREEN);
          };
          return _this;
        }
        var _proto = DashboardScreen.prototype;
        _proto.__preload = function __preload() {
          this.refreshCounters();
        };
        _proto.onLoad = function onLoad() {
          this.registerEvents();
        };
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvents();
        };
        _proto.registerEvents = function registerEvents() {
          var _this$dailyButton, _this$wheelButton, _this$shopButton;
          this.adventureButton.node.on(Button.EventType.CLICK, this.handleClickPlayAdventure, this);
          this.classicButton.node.on(Button.EventType.CLICK, this.handleClickPlayClassic, this);
          this.tournamentButton.node.on(Button.EventType.CLICK, this.handleClickPlayTournament, this);
          (_this$dailyButton = this.dailyButton) == null || _this$dailyButton.node.on(Button.EventType.CLICK, this.handleClickDaily, this);
          (_this$wheelButton = this.wheelButton) == null || _this$wheelButton.node.on(Button.EventType.CLICK, this.handleClickWheel, this);
          (_this$shopButton = this.shopButton) == null || _this$shopButton.node.on(Button.EventType.CLICK, this.handleClickShop, this);
          this.node.scene.on(GameEvents.ON_WALLET_CHANGED, this.handleWalletChanged, this);
        };
        _proto.unregisterEvents = function unregisterEvents() {
          var _this$dailyButton2, _this$wheelButton2, _this$shopButton2;
          this.adventureButton.node.off(Button.EventType.CLICK, this.handleClickPlayAdventure, this);
          this.classicButton.node.off(Button.EventType.CLICK, this.handleClickPlayClassic, this);
          this.tournamentButton.node.off(Button.EventType.CLICK, this.handleClickPlayTournament, this);
          (_this$dailyButton2 = this.dailyButton) == null || _this$dailyButton2.node.off(Button.EventType.CLICK, this.handleClickDaily, this);
          (_this$wheelButton2 = this.wheelButton) == null || _this$wheelButton2.node.off(Button.EventType.CLICK, this.handleClickWheel, this);
          (_this$shopButton2 = this.shopButton) == null || _this$shopButton2.node.off(Button.EventType.CLICK, this.handleClickShop, this);
          this.node.scene.off(GameEvents.ON_WALLET_CHANGED, this.handleWalletChanged, this);
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  this.refreshCounters();
                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.refreshCounters = function refreshCounters() {
          var _this$coinCounter2, _this$heartCounter2;
          (_this$coinCounter2 = this.coinCounter) == null || _this$coinCounter2.refresh();
          (_this$heartCounter2 = this.heartCounter) == null || _this$heartCounter2.refresh();
        };
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 2:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _createClass(DashboardScreen, [{
          key: "isFullscreen",
          get: function get() {
            return true;
          }
        }]);
        return DashboardScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "adventureButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "classicButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tournamentButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "dailyButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wheelButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "shopButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "coinCounter", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "heartCounter", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LeaderboardScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TournamentRoster.ts', './ScreenManager.ts', './GameEvents.ts', './LeaderboardList.ts', './BaseScreen.ts', './ModeUtils.ts', './ScreenEntrance.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Button, TournamentRoster, ScreenManager, GameEvents, LeaderboardList, BaseScreen, GAME_MODE, ScreenEntrance;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Button = module.Button;
    }, function (module) {
      TournamentRoster = module.TournamentRoster;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      LeaderboardList = module.LeaderboardList;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      GAME_MODE = module.GAME_MODE;
    }, function (module) {
      ScreenEntrance = module.ScreenEntrance;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "f8a20HeUcRMrZHxXkkWj+e1", "LeaderboardScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TITLE_POP = 0.3;
      var ACTION_DELAY = 0.34;
      var ACTION_RISE = 0.34;
      // The fetch has no timeout and the loading screen has no close button to escape a hung request.
      var ROSTER_WAIT_MS = 8000;
      var LeaderboardScreen = exports('LeaderboardScreen', (_dec = ccclass('LeaderboardScreen'), _dec2 = property(Label), _dec3 = property(Button), _dec4 = property(Label), _dec5 = property(Button), _dec6 = property(LeaderboardList), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(LeaderboardScreen, _BaseScreen);
        function LeaderboardScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "titleLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "actionButton", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "actionLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeButton", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "list", _descriptor5, _assertThisInitialized(_this));
          _this.entrance = new ScreenEntrance();
          _this.framing = 'entry';
          _this.runScore = null;
          _this.renderToken = 0;
          _this.handleAction = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            if (_this.framing === 'result') {
              _this.node.scene.emit(GameEvents.HANDLE_RETURN_TO_DASHBOARD);
              return;
            }
            _this.node.scene.emit(GameEvents.HANDLE_START_GAME, GAME_MODE.TOURNAMENT);
          };
          _this.handleClose = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            _this.node.scene.emit(GameEvents.HANDLE_RETURN_TO_DASHBOARD);
          };
          return _this;
        }
        var _proto = LeaderboardScreen.prototype;
        _proto.__preload = function __preload() {
          var _this$closeButton;
          this.actionButton.node.on(Button.EventType.CLICK, this.handleAction, this);
          (_this$closeButton = this.closeButton) == null || _this$closeButton.node.on(Button.EventType.CLICK, this.handleClose, this);
        };
        _proto.onDestroy = function onDestroy() {
          var _this$closeButton2;
          this.actionButton.node.off(Button.EventType.CLICK, this.handleAction, this);
          (_this$closeButton2 = this.closeButton) == null || _this$closeButton2.node.off(Button.EventType.CLICK, this.handleClose, this);
        }

        // Stays inactive until the roster is in; ScreenManager.openScreenAsync hides the cover after.
        ;

        _proto.openScreenAsync = /*#__PURE__*/
        function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            var token;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  token = ++this.renderToken;
                  _context.next = 3;
                  return ScreenManager.instance.showLoadingScreen();
                case 3:
                  _context.next = 5;
                  return this.waitForRosterAsync();
                case 5:
                  if (!(token !== this.renderToken)) {
                    _context.next = 7;
                    break;
                  }
                  return _context.abrupt("return");
                case 7:
                  _context.next = 9;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 9:
                  this.framing = (data == null ? void 0 : data.framing) === 'result' ? 'result' : 'entry';
                  this.runScore = typeof (data == null ? void 0 : data.score) === 'number' ? data.score : null;
                  this.applyFraming();
                  this.animEntrance();
                  this.renderBoard();
                case 14:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  ++this.renderToken;
                  this.entrance.settle();
                  _context2.next = 4;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.waitForRosterAsync = function waitForRosterAsync() {
          var roster = TournamentRoster.loadOnceAsync().then(function () {
            return TournamentRoster.whenSubmitSettled();
          });
          var cap = new Promise(function (resolve) {
            return setTimeout(resolve, ROSTER_WAIT_MS);
          });
          return Promise.race([roster, cap]);
        };
        _proto.animEntrance = function animEntrance() {
          var _this$titleLabel, _this$actionButton;
          this.entrance.settle();
          this.entrance.pop((_this$titleLabel = this.titleLabel) == null ? void 0 : _this$titleLabel.node, 0, TITLE_POP);
          this.entrance.rise((_this$actionButton = this.actionButton) == null ? void 0 : _this$actionButton.node, this.node, ACTION_DELAY, ACTION_RISE);
        };
        _proto.applyFraming = function applyFraming() {
          var isResult = this.framing === 'result';
          if (this.titleLabel) this.titleLabel.string = isResult ? 'RESULT' : 'TOURNAMENT';
          if (this.actionLabel) this.actionLabel.string = isResult ? 'HOME' : 'JOIN';
          if (this.closeButton) this.closeButton.node.active = !isResult;
        };
        _proto.renderBoard = function renderBoard() {
          if (!this.list) return;
          var rows = TournamentRoster.getAllRows(this.playerScoreOverride());
          this.list.show(rows, rows.findIndex(function (row) {
            return row.isPlayer;
          }));
        };
        _proto.playerScoreOverride = function playerScoreOverride() {
          if (this.framing !== 'result' || this.runScore === null) return undefined;
          return this.runScore;
        };
        return LeaderboardScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "actionButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "actionLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "list", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LevelSelectScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AdventurePicture.ts', './ScreenManager.ts', './GameEvents.ts', './BaseScreen.ts', './AdventureLevelLoader.ts', './DataManager.ts', './ModeUtils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, _createClass, cclegacy, _decorator, Color, Button, Node, Label, UITransform, instantiate, Sprite, ADVENTURE_PICTURE, ScreenManager, GameEvents, BaseScreen, AdventureLevelLoader, DataManager, GAME_MODE;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Button = module.Button;
      Node = module.Node;
      Label = module.Label;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
    }, function (module) {
      ADVENTURE_PICTURE = module.ADVENTURE_PICTURE;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      AdventureLevelLoader = module.AdventureLevelLoader;
    }, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      GAME_MODE = module.GAME_MODE;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "a9960PjVaxONrhUT5OBs30f", "LevelSelectScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DEFAULT_SPACING = 6;
      var FALLBACK_CELL_SIZE = 78;

      // Sampled from the core of the seven board cell sprites the mosaic used to draw itself with, so the
      // picture comes up in its authored colours before anything is touched in the Inspector.
      var DEFAULT_REVEALED_COLORS = [new Color(215, 39, 42, 255), new Color(249, 110, 19, 255), new Color(248, 176, 29, 255), new Color(27, 176, 47, 255), new Color(3, 166, 230, 255), new Color(34, 78, 237, 255), new Color(126, 59, 217, 255)];

      // Pre-multiplied against the empty cell's old navy texture (36,42,83), which is now pure white —
      // without this the unrevealed mosaic tiles would jump several shades lighter.
      var DEFAULT_HIDDEN_COLOR = new Color(4, 6, 24, 255);
      var LevelSelectScreen = exports('LevelSelectScreen', (_dec = ccclass('LevelSelectScreen'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Node), _dec7 = property(Node), _dec8 = property(Label), _dec9 = property([Color]), _dec10 = property(Color), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(LevelSelectScreen, _BaseScreen);
        function LevelSelectScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "playButton", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "backButton", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "prevButton", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nextButton", _descriptor4, _assertThisInitialized(_this));
          /** One authored cell. Its sprite, size and tint are the mosaic's — every tile is a clone. */
          _initializerDefineProperty(_this, "cellTemplate", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "mosaicRoot", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "levelLabel", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spacing", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "revealedColors", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "hiddenColor", _descriptor10, _assertThisInitialized(_this));
          _this.cellSprites = [];
          _this.built = false;
          _this.selected = 1;
          _this.starting = false;
          _this.handleClickPlay = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!_this.starting) {
                    _context.next = 2;
                    break;
                  }
                  return _context.abrupt("return");
                case 2:
                  _this.starting = true;
                  _this.playClickSfx();

                  // The pack is the only thing the loading screen ever waits on, so once it is cached the
                  // screen would be pure ceremony — go straight into the level. It is not hidden here:
                  // starting the level only emits an event, so the game screen is still several awaits
                  // away — ScreenManager drops the cover once that screen is actually up.
                  if (AdventureLevelLoader.isReady()) {
                    _context.next = 9;
                    break;
                  }
                  _context.next = 7;
                  return ScreenManager.instance.showLoadingScreen();
                case 7:
                  _context.next = 9;
                  return AdventureLevelLoader.loadAll();
                case 9:
                  _this.startSelectedLevel();
                  _this.starting = false;
                case 11:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          _this.handleClickBack = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            _this.node.scene.emit(GameEvents.HANDLE_RETURN_TO_DASHBOARD);
          };
          return _this;
        }
        var _proto = LevelSelectScreen.prototype;
        _proto.__preload = function __preload() {
          this.registerEvents();
        };
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvents();
        };
        _proto.registerEvents = function registerEvents() {
          this.playButton.node.on(Button.EventType.CLICK, this.handleClickPlay, this);
          this.backButton.node.on(Button.EventType.CLICK, this.handleClickBack, this);
          this.prevButton.node.on(Button.EventType.CLICK, this.onPrevClicked, this);
          this.nextButton.node.on(Button.EventType.CLICK, this.onNextClicked, this);
        };
        _proto.unregisterEvents = function unregisterEvents() {
          this.playButton.node.off(Button.EventType.CLICK, this.handleClickPlay, this);
          this.backButton.node.off(Button.EventType.CLICK, this.handleClickBack, this);
          this.prevButton.node.off(Button.EventType.CLICK, this.onPrevClicked, this);
          this.nextButton.node.off(Button.EventType.CLICK, this.onNextClicked, this);
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  this.buildMosaic();
                  this.selected = DataManager.getPlayerData('adventure').unlocked;
                  this.refresh();
                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.onPrevClicked = function onPrevClicked() {
          this.playClickSfx();
          this.selected = Math.max(1, this.selected - 1);
          this.updateLevelControls();
        };
        _proto.onNextClicked = function onNextClicked() {
          this.playClickSfx();
          this.selected = Math.min(DataManager.getPlayerData('adventure').unlocked, this.selected + 1);
          this.updateLevelControls();
        };
        _proto.buildMosaic = function buildMosaic() {
          var _template$getComponen;
          var template = this.cellTemplate;
          if (this.built || !template || !this.mosaicRoot) return;
          var size = ((_template$getComponen = template.getComponent(UITransform)) == null ? void 0 : _template$getComponen.contentSize.width) || FALLBACK_CELL_SIZE;
          var cols = ADVENTURE_PICTURE.cols,
            rows = ADVENTURE_PICTURE.rows,
            cells = ADVENTURE_PICTURE.cells;
          var step = size + this.spacing;
          var left = -(cols * step - this.spacing) / 2 + size / 2;
          var top = (rows * step - this.spacing) / 2 - size / 2;
          for (var _iterator = _createForOfIteratorHelperLoose(cells), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              r = _step$value.r,
              c = _step$value.c;
            var node = instantiate(template);
            node.setParent(this.mosaicRoot);
            node.setPosition(left + c * step, top - r * step, 0);
            var sprite = node.getComponent(Sprite);
            if (!sprite) continue;
            // Enforced rather than inherited: on TRIMMED the tile snaps to the frame's own size and
            // the authored size is silently lost, which reads as broken spacing.
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            this.cellSprites.push(sprite);
          }

          // Cloned from while still active, then parked — it is the authoring handle, not a tile.
          template.active = false;
          this.built = true;
        };
        _proto.refresh = function refresh() {
          var completed = Object.keys(DataManager.getPlayerData('adventure').best).length;
          for (var i = 0; i < this.cellSprites.length; i++) {
            var revealed = i < completed;
            var colorIndex = ADVENTURE_PICTURE.cells[i].colorIndex;
            var color = revealed ? this.revealedColors[colorIndex] : this.hiddenColor;
            this.cellSprites[i].color = (color != null ? color : this.hiddenColor).clone();
          }
          this.updateLevelControls();
        };
        _proto.updateLevelControls = function updateLevelControls() {
          var unlocked = DataManager.getPlayerData('adventure').unlocked;
          this.selected = Math.min(Math.max(this.selected, 1), unlocked);
          if (this.levelLabel) this.levelLabel.string = "Level " + this.selected;
          if (this.prevButton) this.prevButton.interactable = this.selected > 1;
          if (this.nextButton) this.nextButton.interactable = this.selected < unlocked;
        };
        // This screen does not close itself: GameManager keeps it alive as the page turn's departing
        // screen and retires it once the turn finishes.
        _proto.startSelectedLevel = function startSelectedLevel() {
          this.node.scene.emit(GameEvents.HANDLE_START_GAME, GAME_MODE.ADVENTURE, this.selected);
        };
        _createClass(LevelSelectScreen, [{
          key: "isFullscreen",
          get: function get() {
            return true;
          }
        }]);
        return LevelSelectScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "backButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prevButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nextButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "cellTemplate", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "mosaicRoot", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "levelLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spacing", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return DEFAULT_SPACING;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "revealedColors", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return DEFAULT_REVEALED_COLORS.map(function (c) {
            return c.clone();
          });
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "hiddenColor", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return DEFAULT_HIDDEN_COLOR.clone();
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoseScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './GameEvents.ts', './BaseScreen.ts', './AdsUtils.ts', './ScreenEntrance.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Color, Label, Node, Button, Tween, tween, AudioManager, GameEvents, BaseScreen, AdsUtils, ScreenEntrance;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Label = module.Label;
      Node = module.Node;
      Button = module.Button;
      Tween = module.Tween;
      tween = module.tween;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      AdsUtils = module.AdsUtils;
    }, function (module) {
      ScreenEntrance = module.ScreenEntrance;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "03026B2LdBMgaYNEqjhQHl3", "LoseScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GOLD = new Color(255, 215, 0, 255);
      var WHITE = new Color(255, 255, 255, 255);
      var POP_TIME = 0.25;
      var POP_STAGGER = 0.08;
      var SCORE_COUNT_TIME = 1;
      var BUTTONS_DELAY = 0.4;
      var BUTTONS_RISE = 0.34;
      var LoseScreen = exports('LoseScreen', (_dec = ccclass('LoseScreen'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Node), _dec6 = property(Label), _dec7 = property(Button), _dec8 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(LoseScreen, _BaseScreen);
        function LoseScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "titleLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scoreLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bestLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "newBestBadge", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "newBestScoreLabel", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "restartButton", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "homeButton", _descriptor7, _assertThisInitialized(_this));
          _this.entrance = new ScreenEntrance();
          _this.scoreProxy = {
            v: 0
          };
          _this.handleClickHomeButton = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            _this.node.scene.emit(GameEvents.HANDLE_RETURN_TO_DASHBOARD);
          };
          _this.handleClickRestartButton = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            _this.node.scene.emit(GameEvents.HANDLE_GAME_RETRY);
          };
          return _this;
        }
        var _proto = LoseScreen.prototype;
        _proto.__preload = function __preload() {
          this.registerEvents();
        };
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvents();
        };
        _proto.registerEvents = function registerEvents() {
          this.restartButton.node.on(Button.EventType.CLICK, this.handleClickRestartButton, this);
          this.homeButton.node.on(Button.EventType.CLICK, this.handleClickHomeButton, this);
        };
        _proto.unregisterEvents = function unregisterEvents() {
          this.restartButton.node.off(Button.EventType.CLICK, this.handleClickRestartButton, this);
          this.homeButton.node.off(Button.EventType.CLICK, this.handleClickHomeButton, this);
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            var _this2 = this;
            var score, best, isNewBest, scoreReadout, labels, scoreDelay;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return AdsUtils.getInstance().showInterstitialAdAsync('run-end');
                case 2:
                  _context.next = 4;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 4:
                  if (data) {
                    _context.next = 6;
                    break;
                  }
                  return _context.abrupt("return");
                case 6:
                  score = data.score, best = data.best, isNewBest = data.isNewBest;
                  this.scoreLabel.node.active = !isNewBest;
                  this.bestLabel.node.active = !isNewBest;
                  this.newBestBadge.active = isNewBest;
                  this.newBestScoreLabel.node.active = isNewBest;
                  scoreReadout = isNewBest ? this.newBestScoreLabel : this.scoreLabel;
                  if (isNewBest) {
                    this.newBestScoreLabel.color = GOLD.clone();
                  } else {
                    this.scoreLabel.color = WHITE.clone();
                    this.bestLabel.string = "Best: " + best;
                    this.bestLabel.color = GOLD.clone();
                  }
                  labels = this.activeLabelsTopToBottom(isNewBest);
                  this.animLabelsIn(labels);
                  scoreDelay = Math.max(0, labels.indexOf(scoreReadout.node)) * POP_STAGGER;
                  scoreReadout.string = '0';
                  this.scheduleOnce(function () {
                    return _this2.animScoreCountUp(scoreReadout, score);
                  }, scoreDelay);
                case 18:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  Tween.stopAllByTarget(this.scoreProxy);
                  this.entrance.settle();
                  _context2.next = 4;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.activeLabelsTopToBottom = function activeLabelsTopToBottom(isNewBest) {
          var nodes = isNewBest ? [this.titleLabel.node, this.newBestBadge, this.newBestScoreLabel.node] : [this.titleLabel.node, this.scoreLabel.node, this.bestLabel.node];
          return nodes.filter(function (node) {
            return !!node && node.active;
          }).sort(function (a, b) {
            return b.worldPosition.y - a.worldPosition.y;
          });
        };
        _proto.animLabelsIn = function animLabelsIn(nodes) {
          var _this3 = this;
          this.entrance.settle();
          nodes.forEach(function (node, i) {
            _this3.entrance.pop(node, i * POP_STAGGER, POP_TIME);
          });
          this.entrance.rise(this.restartButton.node, this.node, BUTTONS_DELAY, BUTTONS_RISE);
          this.entrance.rise(this.homeButton.node, this.node, BUTTONS_DELAY, BUTTONS_RISE);
        };
        _proto.animScoreCountUp = function animScoreCountUp(label, target) {
          var _AudioManager$instanc,
            _AudioManager$instanc2,
            _this4 = this;
          // The count-up runs for exactly as long as the counter sound, so the two land together.
          var soundTime = (_AudioManager$instanc = (_AudioManager$instanc2 = AudioManager.instance) == null ? void 0 : _AudioManager$instanc2.playScoreCounter()) != null ? _AudioManager$instanc : 0;
          var countTime = soundTime > 0 ? soundTime : SCORE_COUNT_TIME;
          Tween.stopAllByTarget(this.scoreProxy);
          this.scoreProxy.v = 0;
          tween(this.scoreProxy).to(countTime, {
            v: target
          }, {
            easing: 'sineOut',
            onUpdate: function onUpdate() {
              label.string = Math.round(_this4.scoreProxy.v).toString();
            }
          }).call(function () {
            label.string = target.toString();
          }).start();
        };
        return LoseScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bestLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "newBestBadge", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "newBestScoreLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "restartButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "homeButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RandomWheelScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './WheelPrizes.ts', './GameEvents.ts', './CurrencyCounter.ts', './BaseScreen.ts', './AdsUtils.ts', './WalletService.ts', './WheelSpinService.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Button, Label, Sprite, Tween, tween, Vec3, sectorAngle, pickPrizeIndex, WHEEL_PRIZES, GameEvents, CurrencyCounter, BaseScreen, AdsUtils, WalletService, WheelSpinService, formatCountdown, spinNeedsAd;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Button = module.Button;
      Label = module.Label;
      Sprite = module.Sprite;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
    }, function (module) {
      sectorAngle = module.sectorAngle;
      pickPrizeIndex = module.pickPrizeIndex;
      WHEEL_PRIZES = module.WHEEL_PRIZES;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      CurrencyCounter = module.CurrencyCounter;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      AdsUtils = module.AdsUtils;
    }, function (module) {
      WalletService = module.WalletService;
    }, function (module) {
      WheelSpinService = module.WheelSpinService;
      formatCountdown = module.formatCountdown;
      spinNeedsAd = module.spinNeedsAd;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;
      cclegacy._RF.push({}, "3f7c2Gtm05NYooVbA57LU+B", "RandomWheelScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FULL_TURNS = 5;
      var SPIN_TIME = 3.2;
      var POPUP_POP_TIME = 0.3;
      var POPUP_HOLD = 1.8;
      var COUNTDOWN_TICK = 1;
      var COUNTDOWN_LABEL_Y = 6;
      var WATCH_TEXT = 'Watch Ad';
      var RandomWheelScreen = exports('RandomWheelScreen', (_dec = ccclass('RandomWheelScreen'), _dec2 = property(Node), _dec3 = property(Button), _dec4 = property(CurrencyCounter), _dec5 = property(Label), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Button), _dec9 = property(Label), _dec10 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(RandomWheelScreen, _BaseScreen);
        function RandomWheelScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "wheel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spinButton", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "coinCounter", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "heartLabel", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "prizePopup", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "prizeLabel", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeButton", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spinButtonLabel", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spinsLeftLabel", _descriptor9, _assertThisInitialized(_this));
          _this.spinning = false;
          _this.adPending = false;
          _this.landed = 0;
          _this.spinText = '';
          _this.spinTextY = Number.NaN;
          _this.buttonSprite = null;
          _this.buttonSpriteRead = false;
          _this.tickCooldown = function () {
            _this.renderSpinBudget();
          };
          _this.handleClickSpin = function () {
            if (_this.spinning || _this.adPending) return;
            void _this.spinAsync();
          };
          _this.handleClickClose = function () {
            if (_this.spinning) return;
            _this.playClickSfx();
            _this.closeScreenAsync();
          };
          return _this;
        }
        var _proto = RandomWheelScreen.prototype;
        _proto.__preload = function __preload() {
          var _this$spinButton, _this$closeButton;
          (_this$spinButton = this.spinButton) == null || _this$spinButton.node.on(Button.EventType.CLICK, this.handleClickSpin, this);
          (_this$closeButton = this.closeButton) == null || _this$closeButton.node.on(Button.EventType.CLICK, this.handleClickClose, this);
        };
        _proto.onDestroy = function onDestroy() {
          var _this$spinButton2, _this$closeButton2;
          (_this$spinButton2 = this.spinButton) == null || _this$spinButton2.node.off(Button.EventType.CLICK, this.handleClickSpin, this);
          (_this$closeButton2 = this.closeButton) == null || _this$closeButton2.node.off(Button.EventType.CLICK, this.handleClickClose, this);
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  if (this.prizePopup) this.prizePopup.active = false;
                  this.refreshCounters();
                  this.setSpinning(false);
                  this.unschedule(this.tickCooldown);
                  this.schedule(this.tickCooldown, COUNTDOWN_TICK);
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            var _this$node$scene;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.unschedule(this.tickCooldown);
                  this.stopSpin();
                  _context2.next = 4;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 4:
                  (_this$node$scene = this.node.scene) == null || _this$node$scene.emit(GameEvents.ON_WALLET_CHANGED);
                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.renderSpinBudget = function renderSpinBudget() {
          var state = WheelSpinService.get();
          var spins = state.spins;
          var waiting = spins <= 0;
          var busy = this.spinning || this.adPending;
          if (this.spinButton) this.spinButton.interactable = !busy && !waiting;
          var sprite = this.buttonGraphic();
          if (sprite) sprite.grayscale = waiting;
          var counter = this.spinsLeftLabel;
          if (counter) {
            counter.string = spins === 1 ? '1 spin left' : spins + " spins left";
            counter.node.active = !waiting;
          }
          var label = this.spinButtonLabel;
          if (!label) return;
          if (!this.spinText) this.spinText = label.string;
          if (Number.isNaN(this.spinTextY)) this.spinTextY = label.node.position.y;
          label.string = waiting ? formatCountdown(WheelSpinService.msUntilRefill()) : spinNeedsAd(state) ? WATCH_TEXT : this.spinText;
          var y = waiting && counter ? COUNTDOWN_LABEL_Y : this.spinTextY;
          label.node.setPosition(label.node.position.x, y, 0);
        };
        _proto.buttonGraphic = function buttonGraphic() {
          if (!this.buttonSpriteRead) {
            var _this$spinButton$node, _this$spinButton3;
            this.buttonSpriteRead = true;
            this.buttonSprite = (_this$spinButton$node = (_this$spinButton3 = this.spinButton) == null ? void 0 : _this$spinButton3.node.getComponent(Sprite)) != null ? _this$spinButton$node : null;
          }
          return this.buttonSprite;
        };
        _proto.spinAsync = /*#__PURE__*/function () {
          var _spinAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var _this2 = this;
            var state, index, prize;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  state = WheelSpinService.get();
                  if (!(state.spins <= 0)) {
                    _context3.next = 4;
                    break;
                  }
                  this.renderSpinBudget();
                  return _context3.abrupt("return");
                case 4:
                  this.playClickSfx();
                  _context3.t0 = spinNeedsAd(state);
                  if (!_context3.t0) {
                    _context3.next = 10;
                    break;
                  }
                  _context3.next = 9;
                  return this.watchAdAsync();
                case 9:
                  _context3.t0 = !_context3.sent;
                case 10:
                  if (!_context3.t0) {
                    _context3.next = 12;
                    break;
                  }
                  return _context3.abrupt("return");
                case 12:
                  if (WheelSpinService.spend()) {
                    _context3.next = 15;
                    break;
                  }
                  this.renderSpinBudget();
                  return _context3.abrupt("return");
                case 15:
                  this.setSpinning(true);
                  if (this.prizePopup) this.prizePopup.active = false;
                  index = pickPrizeIndex(Math.random());
                  prize = WHEEL_PRIZES[index];
                  this.award(prize);
                  this.animSpinTo(index, function () {
                    return _this2.settle(prize);
                  });
                case 21:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function spinAsync() {
            return _spinAsync.apply(this, arguments);
          }
          return spinAsync;
        }();
        _proto.watchAdAsync = /*#__PURE__*/function () {
          var _watchAdAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var result;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  this.adPending = true;
                  this.renderSpinBudget();
                  _context4.next = 4;
                  return AdsUtils.getInstance().showRewardedAdAsync();
                case 4:
                  result = _context4.sent;
                  this.adPending = false;
                  if (this.node.active) {
                    _context4.next = 8;
                    break;
                  }
                  return _context4.abrupt("return", false);
                case 8:
                  this.renderSpinBudget();
                  if (!(result === 'granted')) {
                    _context4.next = 11;
                    break;
                  }
                  return _context4.abrupt("return", true);
                case 11:
                  this.showNote(result === 'skipped' ? 'AD NOT FINISHED' : 'AD NOT AVAILABLE');
                  return _context4.abrupt("return", false);
                case 13:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function watchAdAsync() {
            return _watchAdAsync.apply(this, arguments);
          }
          return watchAdAsync;
        }();
        _proto.animSpinTo = function animSpinTo(index, onLanded) {
          var _this3 = this;
          var wheel = this.wheel;
          if (!wheel) {
            onLanded();
            return;
          }
          var target = sectorAngle(index);
          var from = this.landed;
          var clockwise = (from - target + 360) % 360;
          Tween.stopAllByTarget(wheel);
          wheel.angle = from;
          tween(wheel).to(SPIN_TIME, {
            angle: from - (FULL_TURNS * 360 + clockwise)
          }, {
            easing: 'cubicOut'
          }).call(function () {
            wheel.angle = target;
            _this3.landed = target;
            onLanded();
          }).start();
        };
        _proto.settle = function settle(prize) {
          var _this$coinCounter, _this$node$scene2;
          this.showPrize(prize);
          (_this$coinCounter = this.coinCounter) == null || _this$coinCounter.animToWallet();
          this.renderHearts();
          this.setSpinning(false);
          (_this$node$scene2 = this.node.scene) == null || _this$node$scene2.emit(GameEvents.ON_WALLET_CHANGED);
        };
        _proto.award = function award(prize) {
          if (prize.type === 'coin') {
            WalletService.addCoins(prize.amount);
            return;
          }
          WalletService.addHearts(prize.amount);
        };
        _proto.refreshCounters = function refreshCounters() {
          var _this$coinCounter2;
          (_this$coinCounter2 = this.coinCounter) == null || _this$coinCounter2.refresh();
          this.renderHearts();
        };
        _proto.renderHearts = function renderHearts() {
          if (this.heartLabel) this.heartLabel.string = "" + WalletService.get().hearts;
        };
        _proto.setSpinning = function setSpinning(value) {
          this.spinning = value;
          this.renderSpinBudget();
          if (this.closeButton) this.closeButton.interactable = !value;
        };
        _proto.showPrize = function showPrize(prize) {
          var left = WheelSpinService.get().spins;
          var note = left === 0 ? 'NO SPINS LEFT' : left === 1 ? '1 SPIN LEFT' : left + " SPINS LEFT";
          this.showNote(prize.label + "\n" + note);
        };
        _proto.showNote = function showNote(text) {
          var popup = this.prizePopup;
          if (this.prizeLabel) this.prizeLabel.string = text;
          if (!popup) return;
          Tween.stopAllByTarget(popup);
          popup.active = true;
          popup.setScale(Vec3.ZERO);
          tween(popup).to(POPUP_POP_TIME, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).delay(POPUP_HOLD).call(function () {
            popup.active = false;
          }).start();
        };
        _proto.stopSpin = function stopSpin() {
          if (this.wheel) Tween.stopAllByTarget(this.wheel);
          if (this.prizePopup) Tween.stopAllByTarget(this.prizePopup);
          this.setSpinning(false);
        };
        return RandomWheelScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "wheel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spinButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "coinCounter", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "heartLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "prizePopup", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "prizeLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spinButtonLabel", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spinsLeftLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ReviveScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts', './BaseScreen.ts', './AdsUtils.ts', './WalletService.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Button, Label, Sprite, GameEvents, BaseScreen, AdsUtils, WalletService;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Label = module.Label;
      Sprite = module.Sprite;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      AdsUtils = module.AdsUtils;
    }, function (module) {
      WalletService = module.WalletService;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "d70e63fY+9Pl67U+siRGngH", "ReviveScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var REVIVE_WINDOW = 5;
      var ReviveScreen = exports('ReviveScreen', (_dec = ccclass('ReviveScreen'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(ReviveScreen, _BaseScreen);
        function ReviveScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "reviveButton", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "heartButton", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "heartCountLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "timerLabel", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "ringFill", _descriptor5, _assertThisInitialized(_this));
          _this.reviveRemaining = 0;
          _this.counting = false;
          _this.adPending = false;
          _this.handleClickRevive = function () {
            _this.playClickSfx();
            _this.reviveWithAdAsync();
          };
          _this.handleClickHeartRevive = function () {
            if (WalletService.get().hearts <= 0) return;
            _this.playClickSfx();
            _this.node.scene.emit(GameEvents.HANDLE_GAME_REVIVE, 'heart');
          };
          return _this;
        }
        var _proto = ReviveScreen.prototype;
        _proto.__preload = function __preload() {
          var _this$heartButton;
          this.reviveButton.node.on(Button.EventType.CLICK, this.handleClickRevive, this);
          (_this$heartButton = this.heartButton) == null || _this$heartButton.node.on(Button.EventType.CLICK, this.handleClickHeartRevive, this);
        };
        _proto.onDestroy = function onDestroy() {
          var _this$heartButton2;
          this.reviveButton.node.off(Button.EventType.CLICK, this.handleClickRevive, this);
          (_this$heartButton2 = this.heartButton) == null || _this$heartButton2.node.off(Button.EventType.CLICK, this.handleClickHeartRevive, this);
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            var _heartReviveAvailable;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  this.reviveRemaining = REVIVE_WINDOW;
                  this.counting = true;
                  this.adPending = false;
                  this.reviveButton.interactable = true;
                  this.refreshCountdown();
                  this.refreshHearts((_heartReviveAvailable = data == null ? void 0 : data.heartReviveAvailable) != null ? _heartReviveAvailable : true);
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.refreshHearts = function refreshHearts(available) {
          if (!this.heartButton) return;
          this.heartButton.node.active = available;
          if (!available) return;
          var hearts = WalletService.get().hearts;
          if (this.heartCountLabel) this.heartCountLabel.string = "" + hearts;
          this.heartButton.interactable = hearts > 0;
        };
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.counting = false;
                  _context2.next = 3;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.update = function update(dt) {
          if (!this.counting) return;
          this.reviveRemaining -= dt;
          if (this.reviveRemaining <= 0) {
            this.reviveRemaining = 0;
            this.counting = false;
            this.refreshCountdown();
            this.node.scene.emit(GameEvents.HANDLE_REVIVE_TIMEOUT);
            return;
          }
          this.refreshCountdown();
        };
        _proto.refreshCountdown = function refreshCountdown() {
          if (this.timerLabel) {
            this.timerLabel.string = String(Math.max(1, Math.ceil(this.reviveRemaining)));
          }
          if (this.ringFill) this.ringFill.fillRange = -(this.reviveRemaining / REVIVE_WINDOW);
        };
        _proto.reviveWithAdAsync = /*#__PURE__*/function () {
          var _reviveWithAdAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var result;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (!this.adPending) {
                    _context3.next = 2;
                    break;
                  }
                  return _context3.abrupt("return");
                case 2:
                  this.adPending = true;
                  this.reviveButton.interactable = false;
                  this.counting = false;
                  _context3.next = 7;
                  return AdsUtils.getInstance().showRewardedAdAsync();
                case 7:
                  result = _context3.sent;
                  this.adPending = false;
                  if (this.node.active) {
                    _context3.next = 11;
                    break;
                  }
                  return _context3.abrupt("return");
                case 11:
                  this.reviveButton.interactable = true;
                  this.counting = this.reviveRemaining > 0;
                  if (!(result !== 'granted')) {
                    _context3.next = 15;
                    break;
                  }
                  return _context3.abrupt("return");
                case 15:
                  this.node.scene.emit(GameEvents.HANDLE_GAME_REVIVE, 'ad');
                case 16:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function reviveWithAdAsync() {
            return _reviveWithAdAsync.apply(this, arguments);
          }
          return reviveWithAdAsync;
        }();
        return ReviveScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "reviveButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "heartButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "heartCountLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ringFill", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/screens", ['./AdventureResultScreen.ts', './DailyQuestScreen.ts', './DashboardScreen.ts', './LeaderboardScreen.ts', './LevelSelectScreen.ts', './LoseScreen.ts', './RandomWheelScreen.ts', './ReviveScreen.ts', './SettingsScreen.ts', './ShopScreen.ts', './SkinScreen.ts', './TournamentWinScreen.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/SettingsScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './ScreenManager.ts', './GameEvents.ts', './BaseScreen.ts', './AdsUtils.ts', './DataManager.ts', './ModeUtils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, _extends, _createClass, cclegacy, _decorator, Button, Node, Sprite, SpriteFrame, AudioManager, ScreenManager, GameEvents, ScreenNames, BaseScreen, AdsUtils, DataManager, ModeUtils, GAME_MODE;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _extends = module.extends;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
      Node = module.Node;
      Sprite = module.Sprite;
      SpriteFrame = module.SpriteFrame;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }, function (module) {
      GameEvents = module.GameEvents;
      ScreenNames = module.ScreenNames;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      AdsUtils = module.AdsUtils;
    }, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      ModeUtils = module.default;
      GAME_MODE = module.GAME_MODE;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "8fad94SCXZKT7/OlH2SXalD", "SettingsScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SettingsScreen = exports('SettingsScreen', (_dec = ccclass('SettingsScreen'), _dec2 = property(Button), _dec3 = property(Button), _dec4 = property(Button), _dec5 = property(Button), _dec6 = property(Node), _dec7 = property(Sprite), _dec8 = property(Sprite), _dec9 = property(Sprite), _dec10 = property(SpriteFrame), _dec11 = property(SpriteFrame), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(SettingsScreen, _BaseScreen);
        function SettingsScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "closeButton", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "homeButton", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "replayButton", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "paletteButton", _descriptor4, _assertThisInitialized(_this));
          /** The whole Set Skin row. Adventure hides this, not just the button inside it. */
          _initializerDefineProperty(_this, "paletteRow", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "soundToggle", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bgmToggle", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "vibToggle", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toggleOnFrame", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toggleOffFrame", _descriptor10, _assertThisInitialized(_this));
          _this.soundOn = true;
          _this.bgmOn = true;
          _this.vibOn = true;
          _this.handleClickClose = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
          };
          _this.handleClickHome = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            var currentMode = ModeUtils.getInstance().getCurrentMode();
            if (currentMode === GAME_MODE.TOURNAMENT) {
              _this.node.scene.emit(GameEvents.HANDLE_TOURNAMENT_EXIT);
              return;
            }
            _this.node.scene.emit(GameEvents.HANDLE_RETURN_TO_DASHBOARD);
          };
          _this.handleClickReplay = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var currentMode;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return AdsUtils.getInstance().showInterstitialAdAsync();
                case 2:
                  _this.playClickSfx();
                  _this.closeScreenAsync();
                  currentMode = ModeUtils.getInstance().getCurrentMode();
                  if (!(currentMode === GAME_MODE.TOURNAMENT)) {
                    _context.next = 8;
                    break;
                  }
                  _this.node.scene.emit(GameEvents.HANDLE_TOURNAMENT_EXIT);
                  return _context.abrupt("return");
                case 8:
                  _this.node.scene.emit(GameEvents.HANDLE_GAME_RETRY);
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          _this.handleClickPalette = function () {
            _this.playClickSfx();
            ScreenManager.instance.openScreenAsync(ScreenNames.SKIN_SCREEN);
          };
          return _this;
        }
        var _proto = SettingsScreen.prototype;
        _proto.__preload = function __preload() {
          this.registerEvents();
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.syncSettings();
                  _context2.next = 3;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 3:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(data) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 2:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvents();
        };
        _proto.registerEvents = function registerEvents() {
          var _this$closeButton, _this$homeButton, _this$replayButton, _this$paletteButton, _this$soundToggle, _this$bgmToggle, _this$vibToggle;
          (_this$closeButton = this.closeButton) == null || _this$closeButton.node.on(Button.EventType.CLICK, this.handleClickClose, this);
          (_this$homeButton = this.homeButton) == null || _this$homeButton.node.on(Button.EventType.CLICK, this.handleClickHome, this);
          (_this$replayButton = this.replayButton) == null || _this$replayButton.node.on(Button.EventType.CLICK, this.handleClickReplay, this);
          (_this$paletteButton = this.paletteButton) == null || _this$paletteButton.node.on(Button.EventType.CLICK, this.handleClickPalette, this);
          (_this$soundToggle = this.soundToggle) == null || _this$soundToggle.node.on(Button.EventType.CLICK, this.onSoundToggled, this);
          (_this$bgmToggle = this.bgmToggle) == null || _this$bgmToggle.node.on(Button.EventType.CLICK, this.onBgmToggled, this);
          (_this$vibToggle = this.vibToggle) == null || _this$vibToggle.node.on(Button.EventType.CLICK, this.onVibToggled, this);
        };
        _proto.unregisterEvents = function unregisterEvents() {
          var _this$closeButton2, _this$homeButton2, _this$replayButton2, _this$paletteButton2, _this$soundToggle2, _this$bgmToggle2, _this$vibToggle2;
          (_this$closeButton2 = this.closeButton) == null || _this$closeButton2.node.off(Button.EventType.CLICK, this.handleClickClose, this);
          (_this$homeButton2 = this.homeButton) == null || _this$homeButton2.node.off(Button.EventType.CLICK, this.handleClickHome, this);
          (_this$replayButton2 = this.replayButton) == null || _this$replayButton2.node.off(Button.EventType.CLICK, this.handleClickReplay, this);
          (_this$paletteButton2 = this.paletteButton) == null || _this$paletteButton2.node.off(Button.EventType.CLICK, this.handleClickPalette, this);
          (_this$soundToggle2 = this.soundToggle) == null || _this$soundToggle2.node.off(Button.EventType.CLICK, this.onSoundToggled, this);
          (_this$bgmToggle2 = this.bgmToggle) == null || _this$bgmToggle2.node.off(Button.EventType.CLICK, this.onBgmToggled, this);
          (_this$vibToggle2 = this.vibToggle) == null || _this$vibToggle2.node.off(Button.EventType.CLICK, this.onVibToggled, this);
        };
        _proto.syncSettings = function syncSettings() {
          var settings = DataManager.getPlayerData('settings');
          this.soundOn = settings.sound;
          this.bgmOn = settings.music;
          this.vibOn = settings.vibrate;
          this.soundToggle.spriteFrame = this.soundOn ? this.toggleOnFrame : this.toggleOffFrame;
          this.bgmToggle.spriteFrame = this.bgmOn ? this.toggleOnFrame : this.toggleOffFrame;
          this.vibToggle.spriteFrame = this.vibOn ? this.toggleOnFrame : this.toggleOffFrame;

          // Adventure ignores the selected skin, so the row offers a choice that changes nothing.
          var isAdventure = ModeUtils.getInstance().getCurrentMode() === GAME_MODE.ADVENTURE;
          this.setPaletteRowVisible(!isAdventure);
        };
        _proto.setPaletteRowVisible = function setPaletteRowVisible(visible) {
          var _ref2, _this$paletteRow, _this$paletteButton3;
          // Hiding only the button leaves its icon and label in an empty row, so the row node is what
          // switches off. Falls back to the button's own row while `paletteRow` is unwired.
          var row = (_ref2 = (_this$paletteRow = this.paletteRow) != null ? _this$paletteRow : (_this$paletteButton3 = this.paletteButton) == null ? void 0 : _this$paletteButton3.node.parent) != null ? _ref2 : null;
          if (row) row.active = visible;else if (this.paletteButton) this.paletteButton.node.active = visible;
        };
        _proto.onSoundToggled = function onSoundToggled() {
          var _AudioManager$instanc;
          this.playClickSfx();
          this.soundOn = !this.soundOn;
          this.soundToggle.spriteFrame = this.soundOn ? this.toggleOnFrame : this.toggleOffFrame;
          (_AudioManager$instanc = AudioManager.instance) == null || _AudioManager$instanc.setMuted(!this.soundOn);
        };
        _proto.onBgmToggled = function onBgmToggled() {
          var _AudioManager$instanc2;
          this.playClickSfx();
          this.bgmOn = !this.bgmOn;
          this.bgmToggle.spriteFrame = this.bgmOn ? this.toggleOnFrame : this.toggleOffFrame;
          (_AudioManager$instanc2 = AudioManager.instance) == null || _AudioManager$instanc2.setBgmMuted(!this.bgmOn);
        };
        _proto.onVibToggled = function onVibToggled() {
          this.playClickSfx();
          this.vibOn = !this.vibOn;
          this.vibToggle.spriteFrame = this.vibOn ? this.toggleOnFrame : this.toggleOffFrame;
          DataManager.setPlayerData('settings', _extends({}, DataManager.getPlayerData('settings'), {
            vibrate: this.vibOn
          }));
        };
        _createClass(SettingsScreen, [{
          key: "isVibrationEnabled",
          get: function get() {
            return this.vibOn;
          }
        }]);
        return SettingsScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "homeButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "replayButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "paletteButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "paletteRow", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "soundToggle", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "bgmToggle", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "vibToggle", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "toggleOnFrame", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "toggleOffFrame", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ShopItems.ts', './GameEvents.ts', './CurrencyCounter.ts', './ShopItemCard.ts', './BaseScreen.ts', './AdsUtils.ts', './ShopService.ts', './WalletService.ts', './WheelSpinService.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Button, Label, Tween, Vec3, tween, findShopItem, SHOP_ITEMS, GameEvents, CurrencyCounter, ShopItemCard, BaseScreen, AdsUtils, msUntilNextDay, ShopService, WalletService, formatCountdown;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Button = module.Button;
      Label = module.Label;
      Tween = module.Tween;
      Vec3 = module.Vec3;
      tween = module.tween;
    }, function (module) {
      findShopItem = module.findShopItem;
      SHOP_ITEMS = module.SHOP_ITEMS;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      CurrencyCounter = module.CurrencyCounter;
    }, function (module) {
      ShopItemCard = module.ShopItemCard;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      AdsUtils = module.AdsUtils;
    }, function (module) {
      msUntilNextDay = module.msUntilNextDay;
      ShopService = module.ShopService;
    }, function (module) {
      WalletService = module.WalletService;
    }, function (module) {
      formatCountdown = module.formatCountdown;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "8c4d18nazlKWJ4CfWGlw7hA", "ShopScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      function perDayNote(item) {
        var perDay = item.limit.kind === 'daily' ? item.limit.perDay : 0;
        return perDay === 1 ? '1 PER DAY' : perDay + " PER DAY";
      }
      var TOAST_POP_TIME = 0.3;
      var TOAST_HOLD = 1.5;
      var COUNTDOWN_TICK = 1;
      var ShopScreen = exports('ShopScreen', (_dec = ccclass('ShopScreen'), _dec2 = property(CurrencyCounter), _dec3 = property(CurrencyCounter), _dec4 = property(Node), _dec5 = property(Button), _dec6 = property(Node), _dec7 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(ShopScreen, _BaseScreen);
        function ShopScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "coinCounter", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "heartCounter", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cardHolder", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeButton", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toast", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toastLabel", _descriptor6, _assertThisInitialized(_this));
          _this.stock = [];
          _this.stockTaken = false;
          _this.adPending = false;
          _this.tickCountdown = function () {
            _this.renderCards();
          };
          _this.handleClickClose = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
          };
          return _this;
        }
        var _proto = ShopScreen.prototype;
        _proto.__preload = function __preload() {
          var _this$closeButton;
          (_this$closeButton = this.closeButton) == null || _this$closeButton.node.on(Button.EventType.CLICK, this.handleClickClose, this);
        };
        _proto.onDestroy = function onDestroy() {
          var _this$closeButton2;
          (_this$closeButton2 = this.closeButton) == null || _this$closeButton2.node.off(Button.EventType.CLICK, this.handleClickClose, this);
          for (var _iterator = _createForOfIteratorHelperLoose(this.stock), _step; !(_step = _iterator()).done;) {
            var card = _step.value.card;
            card.onBuy = null;
          }
        };
        _proto.takeStock = function takeStock() {
          var _this2 = this;
          if (this.stockTaken) return;
          this.stockTaken = true;
          var _loop = function _loop() {
            var card = _step2.value;
            var item = findShopItem(card.getItemId());
            if (!item) {
              card.hide();
              console.warn("[Shop] card \"" + card.node.name + "\" has unknown Item Id \"" + card.getItemId() + "\". " + ("Valid ids: " + SHOP_ITEMS.map(function (entry) {
                return entry.id;
              }).join(', ')));
              return 1; // continue
            }

            card.onBuy = function () {
              return _this2.buy(item);
            };
            _this2.stock.push({
              card: card,
              item: item
            });
          };
          for (var _iterator2 = _createForOfIteratorHelperLoose((_this$cardHolder$getC = (_this$cardHolder = this.cardHolder) == null ? void 0 : _this$cardHolder.getComponentsInChildren(ShopItemCard)) != null ? _this$cardHolder$getC : []), _step2; !(_step2 = _iterator2()).done;) {
            var _this$cardHolder$getC, _this$cardHolder;
            if (_loop()) continue;
          }
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            var _this$coinCounter, _this$heartCounter;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  if (this.toast) this.toast.active = false;
                  this.takeStock();
                  (_this$coinCounter = this.coinCounter) == null || _this$coinCounter.refresh();
                  (_this$heartCounter = this.heartCounter) == null || _this$heartCounter.refresh();
                  this.renderCards();
                  this.unschedule(this.tickCountdown);
                  this.schedule(this.tickCountdown, COUNTDOWN_TICK);
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            var _this$node$scene;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.unschedule(this.tickCountdown);
                  if (this.toast) Tween.stopAllByTarget(this.toast);
                  _context2.next = 4;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 4:
                  (_this$node$scene = this.node.scene) == null || _this$node$scene.emit(GameEvents.ON_WALLET_CHANGED);
                case 5:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.renderCards = function renderCards() {
          var coins = WalletService.get().coins;
          var resetIn = formatCountdown(msUntilNextDay(Date.now()));
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.stock), _step3; !(_step3 = _iterator3()).done;) {
            var _step3$value = _step3.value,
              card = _step3$value.card,
              item = _step3$value.item;
            card.render(this.cardData(item, coins, resetIn));
          }
        };
        _proto.cardData = function cardData(item, coins, resetIn) {
          var soldOut = ShopService.remaining(item) <= 0;
          var once = item.limit.kind === 'once';
          if (soldOut) {
            return {
              label: item.label,
              note: once ? 'ALREADY YOURS' : 'COME BACK TOMORROW',
              priceText: once ? 'OWNED' : resetIn,
              showPriceIcon: false,
              buyable: false
            };
          }
          return {
            label: item.label,
            note: once ? 'ONE TIME' : perDayNote(item),
            priceText: item.ad ? 'WATCH' : "" + item.price,
            showPriceIcon: !item.ad,
            buyable: coins >= item.price
          };
        };
        _proto.buy = function buy(item) {
          this.playClickSfx();
          if (item.ad) {
            void this.buyWithAdAsync(item);
            return;
          }
          this.grant(item);
        };
        _proto.buyWithAdAsync = /*#__PURE__*/function () {
          var _buyWithAdAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
            var result;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (!this.adPending) {
                    _context3.next = 2;
                    break;
                  }
                  return _context3.abrupt("return");
                case 2:
                  if (!(ShopService.remaining(item) <= 0)) {
                    _context3.next = 5;
                    break;
                  }
                  this.showToast(this.toastText(item, 'limit'));
                  return _context3.abrupt("return");
                case 5:
                  this.adPending = true;
                  _context3.next = 8;
                  return AdsUtils.getInstance().showRewardedAdAsync();
                case 8:
                  result = _context3.sent;
                  this.adPending = false;
                  if (this.node.active) {
                    _context3.next = 12;
                    break;
                  }
                  return _context3.abrupt("return");
                case 12:
                  if (!(result === 'skipped')) {
                    _context3.next = 15;
                    break;
                  }
                  this.showToast('AD NOT FINISHED');
                  return _context3.abrupt("return");
                case 15:
                  if (!(result !== 'granted')) {
                    _context3.next = 18;
                    break;
                  }
                  this.showToast('AD NOT AVAILABLE');
                  return _context3.abrupt("return");
                case 18:
                  this.grant(item);
                case 19:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function buyWithAdAsync(_x3) {
            return _buyWithAdAsync.apply(this, arguments);
          }
          return buyWithAdAsync;
        }();
        _proto.grant = function grant(item) {
          var _this$coinCounter2, _this$heartCounter2, _this$node$scene2;
          var result = ShopService.buy(item);
          this.showToast(this.toastText(item, result));
          this.renderCards();
          if (result !== 'ok') return;
          (_this$coinCounter2 = this.coinCounter) == null || _this$coinCounter2.animToWallet();
          (_this$heartCounter2 = this.heartCounter) == null || _this$heartCounter2.animToWallet();
          (_this$node$scene2 = this.node.scene) == null || _this$node$scene2.emit(GameEvents.ON_WALLET_CHANGED);
        };
        _proto.toastText = function toastText(item, result) {
          var _ref, _item$grant$hearts;
          if (result === 'limit') {
            return item.limit.kind === 'once' ? 'ALREADY YOURS' : 'COME BACK TOMORROW';
          }
          if (result === 'poor') return 'NOT ENOUGH COINS';
          if (item.unlocks) return item.label + " UNLOCKED";
          var granted = (_ref = (_item$grant$hearts = item.grant.hearts) != null ? _item$grant$hearts : item.grant.coins) != null ? _ref : 0;
          return "+" + granted + " " + item.label;
        };
        _proto.showToast = function showToast(text) {
          if (this.toastLabel) this.toastLabel.string = text;
          var toast = this.toast;
          if (!toast) return;
          Tween.stopAllByTarget(toast);
          toast.active = true;
          toast.setScale(Vec3.ZERO);
          tween(toast).to(TOAST_POP_TIME, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).delay(TOAST_HOLD).call(function () {
            toast.active = false;
          }).start();
        };
        return ShopScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "coinCounter", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "heartCounter", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cardHolder", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "toast", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "toastLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SkinScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CellSkins.ts', './GameEvents.ts', './SkinRow.ts', './BaseScreen.ts', './SkinService.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, SpriteFrame, Button, Sprite, CELL_SKINS, RANDOM_SKIN, GameEvents, SkinRow, BaseScreen, SkinService;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      SpriteFrame = module.SpriteFrame;
      Button = module.Button;
      Sprite = module.Sprite;
    }, function (module) {
      CELL_SKINS = module.CELL_SKINS;
      RANDOM_SKIN = module.RANDOM_SKIN;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      SkinRow = module.SkinRow;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      SkinService = module.SkinService;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "2959dr5z+FGLp4s17RA6mTj", "SkinScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /** The buyable skins, in the order the rows sit under Default and Random. */
      var ROW_SKINS = CELL_SKINS.filter(function (skin) {
        return skin.price > 0;
      }).map(function (s) {
        return s.id;
      });
      var SkinScreen = exports('SkinScreen', (_dec = ccclass('SkinScreen'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property([SkinRow]), _dec5 = property(SpriteFrame), _dec6 = property(SpriteFrame), _dec7 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(SkinScreen, _BaseScreen);
        function SkinScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "defaultToggle", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "randomToggle", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "skinRows", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toggleOnFrame", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toggleOffFrame", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeButton", _descriptor6, _assertThisInitialized(_this));
          _this.rowHandlers = [];
          _this.plainButtons = [];
          _this.plainRead = false;
          _this.handleClickDefault = function () {
            _this.pick('default');
          };
          _this.handleClickRandom = function () {
            _this.pick(RANDOM_SKIN);
          };
          _this.handleClickClose = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
          };
          return _this;
        }
        var _proto = SkinScreen.prototype;
        _proto.__preload = function __preload() {
          var _this$closeButton,
            _this$plainButton,
            _this$plainButton2,
            _this2 = this;
          (_this$closeButton = this.closeButton) == null || _this$closeButton.node.on(Button.EventType.CLICK, this.handleClickClose, this);
          (_this$plainButton = this.plainButton(0)) == null || _this$plainButton.node.on(Button.EventType.CLICK, this.handleClickDefault, this);
          (_this$plainButton2 = this.plainButton(1)) == null || _this$plainButton2.node.on(Button.EventType.CLICK, this.handleClickRandom, this);
          var _loop = function _loop(i) {
            var _this2$skinRows$i;
            var handler = function handler() {
              return _this2.pick(ROW_SKINS[i]);
            };
            _this2.rowHandlers[i] = handler;
            (_this2$skinRows$i = _this2.skinRows[i]) == null || (_this2$skinRows$i = _this2$skinRows$i.toggleButton()) == null || _this2$skinRows$i.node.on(Button.EventType.CLICK, handler, _this2);
          };
          for (var i = 0; i < this.skinRows.length; i++) {
            _loop(i);
          }
        };
        _proto.onDestroy = function onDestroy() {
          var _this$closeButton2, _this$plainButton3, _this$plainButton4;
          (_this$closeButton2 = this.closeButton) == null || _this$closeButton2.node.off(Button.EventType.CLICK, this.handleClickClose, this);
          (_this$plainButton3 = this.plainButton(0)) == null || _this$plainButton3.node.off(Button.EventType.CLICK, this.handleClickDefault, this);
          (_this$plainButton4 = this.plainButton(1)) == null || _this$plainButton4.node.off(Button.EventType.CLICK, this.handleClickRandom, this);
          for (var i = 0; i < this.skinRows.length; i++) {
            var _this$skinRows$i;
            (_this$skinRows$i = this.skinRows[i]) == null || (_this$skinRows$i = _this$skinRows$i.toggleButton()) == null || _this$skinRows$i.node.off(Button.EventType.CLICK, this.rowHandlers[i], this);
          }
          this.rowHandlers = [];
        }

        /**
         * The wired node may be the row itself or the Toggle inside it — the Toggle lives in a nested
         * prefab instance, so dragging the row is the easy mistake and it carries no Button of its own.
         * Searching the subtree makes both wirings work.
         */;
        _proto.plainButton = function plainButton(index) {
          if (!this.plainRead) {
            this.plainRead = true;
            this.plainButtons = [this.defaultToggle, this.randomToggle].map(function (node) {
              var _ref, _node$getComponent;
              return (_ref = (_node$getComponent = node == null ? void 0 : node.getComponent(Button)) != null ? _node$getComponent : node == null ? void 0 : node.getComponentInChildren(Button)) != null ? _ref : null;
            });
          }
          return this.plainButtons[index];
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  this.render();
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.render = function render() {
          var active = SkinService.getSelection();
          this.renderPlain(0, active === 'default');
          this.renderPlain(1, active === RANDOM_SKIN);
          for (var i = 0; i < this.skinRows.length; i++) {
            var skin = ROW_SKINS[i];
            var row = this.skinRows[i];
            if (!skin || !row) continue;
            var locked = !SkinService.isOwned(skin);
            row.render(!locked && active === skin, locked, this.toggleOnFrame, this.toggleOffFrame);
          }
        }

        // Default and Random are always available, so their rows only ever swap the toggle graphic.
        ;

        _proto.renderPlain = function renderPlain(index, on) {
          var _this$plainButton5;
          var sprite = (_this$plainButton5 = this.plainButton(index)) == null ? void 0 : _this$plainButton5.node.getComponent(Sprite);
          var frame = on ? this.toggleOnFrame : this.toggleOffFrame;
          if (sprite && frame) sprite.spriteFrame = frame;
        }

        /**
         * Exactly one row is on at all times: picking a row turns the others off, and picking the row
         * that is already on does nothing — there is no state with no skin selected to fall back to.
         */;
        _proto.pick = function pick(selection) {
          var _this$node$scene;
          if (!selection) return;
          if (selection !== RANDOM_SKIN && !SkinService.isOwned(selection)) return;
          if (selection === SkinService.getSelection()) return;
          this.playClickSfx();
          SkinService.select(selection);
          this.render();
          // The board and tray belong to the run, not to this screen — GameManager repaints them.
          (_this$node$scene = this.node.scene) == null || _this$node$scene.emit(GameEvents.HANDLE_SKIN_CHANGED);
        };
        return SkinScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "randomToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "skinRows", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "toggleOnFrame", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "toggleOffFrame", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TournamentWinScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts', './BaseScreen.ts', './AvatarLoader.ts', './ScreenEntrance.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Label, Sprite, Button, SpriteFrame, Vec3, Tween, tween, GameEvents, BaseScreen, AvatarLoader, ScreenEntrance;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Sprite = module.Sprite;
      Button = module.Button;
      SpriteFrame = module.SpriteFrame;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      tween = module.tween;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }, function (module) {
      AvatarLoader = module.default;
    }, function (module) {
      ScreenEntrance = module.ScreenEntrance;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "b759eVPyPhB24/w+fU/2roU", "TournamentWinScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TITLE_POP = 0.3;
      var SUBTITLE_DELAY = 0.2;
      var SUBTITLE_POP = 0.22;
      var BUTTON_DELAY = 0.62;
      var BUTTON_RISE = 0.34;

      /** Derived, so retiming the entrance moves the kick with it instead of overlapping it. */
      var KICK_DELAY = BUTTON_DELAY + BUTTON_RISE + 0.25;
      var KICK_TIME = 0.6;
      var TournamentWinScreen = exports('TournamentWinScreen', (_dec = ccclass('TournamentWinScreen'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Sprite), _dec5 = property(Button), _dec6 = property(Button), _dec7 = property(SpriteFrame), _dec8 = property([SpriteFrame]), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(TournamentWinScreen, _BaseScreen);
        function TournamentWinScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "titleLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "subtitleLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "beatenAvatar", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "continueButton", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "closeButton", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "avatarPlaceholder", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "npcAvatarFrames", _descriptor7, _assertThisInitialized(_this));
          _this.onContinue = null;
          _this.avatarToken = 0;
          _this.entrance = new ScreenEntrance();
          _this.avatarHome = new Vec3();
          _this.avatarHomeCaptured = false;
          _this.handleContinue = function () {
            _this.playClickSfx();
            _this.closeScreenAsync();
            var callback = _this.onContinue;
            _this.onContinue = null;
            callback == null || callback();
          };
          _this.handleClose = function () {
            var _this$node$scene;
            _this.playClickSfx();
            _this.onContinue = null;
            _this.closeScreenAsync();
            (_this$node$scene = _this.node.scene) == null || _this$node$scene.emit(GameEvents.HANDLE_TOURNAMENT_EXIT);
          };
          return _this;
        }
        var _proto = TournamentWinScreen.prototype;
        _proto.__preload = function __preload() {
          this.continueButton.node.on(Button.EventType.CLICK, this.handleContinue, this);
          this.closeButton.node.on(Button.EventType.CLICK, this.handleClose, this);
        };
        _proto.onDestroy = function onDestroy() {
          this.continueButton.node.off(Button.EventType.CLICK, this.handleContinue, this);
          this.closeButton.node.off(Button.EventType.CLICK, this.handleClose, this);
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  if (data) {
                    _context.next = 4;
                    break;
                  }
                  return _context.abrupt("return");
                case 4:
                  this.onContinue = data.onContinue;
                  if (this.titleLabel) this.titleLabel.string = data.isChampion ? 'CHAMPION!' : 'RANK UP!';
                  if (this.subtitleLabel) {
                    this.subtitleLabel.string = data.isChampion ? "You defeated " + data.beatenName + " \u2014 nobody left above you!" : "You defeated " + data.beatenName + " (" + data.beatenScore + ")";
                  }
                  this.applyAvatar(data.beatenPhotoUrl, data.beatenAvatarIndex);
                  this.animEntrance();
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data) {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.unscheduleAllCallbacks();
                  this.entrance.settle();
                  _context2.next = 4;
                  return _BaseScreen.prototype.closeScreenAsync.call(this, data);
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x2) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.animEntrance = function animEntrance() {
          var _this$titleLabel,
            _this$subtitleLabel,
            _this$continueButton,
            _this2 = this;
          this.unscheduleAllCallbacks();
          this.entrance.settle();
          this.resetAvatar();
          this.entrance.pop((_this$titleLabel = this.titleLabel) == null ? void 0 : _this$titleLabel.node, 0, TITLE_POP);
          this.entrance.pop((_this$subtitleLabel = this.subtitleLabel) == null ? void 0 : _this$subtitleLabel.node, SUBTITLE_DELAY, SUBTITLE_POP);
          this.entrance.rise((_this$continueButton = this.continueButton) == null ? void 0 : _this$continueButton.node, this.node, BUTTON_DELAY, BUTTON_RISE);

          // The avatar holds still through the entrance — it is what gets punted, so it reads as
          // present first and kicked second.
          this.scheduleOnce(function () {
            return _this2.animateKickOut();
          }, KICK_DELAY);
        };
        _proto.resetAvatar = function resetAvatar() {
          var _this$beatenAvatar;
          var node = (_this$beatenAvatar = this.beatenAvatar) == null ? void 0 : _this$beatenAvatar.node;
          if (!node) return;
          if (!this.avatarHomeCaptured) {
            node.getPosition(this.avatarHome);
            this.avatarHomeCaptured = true;
          }
          // Re-shown here because the kick hides it at the end — a reopened screen must start
          // visible, at rest, and at full size.
          Tween.stopAllByTarget(node);
          node.active = true;
          node.setPosition(this.avatarHome);
          node.angle = 0;
          node.setScale(1, 1, 1);
        };
        _proto.animateKickOut = function animateKickOut() {
          var _this$beatenAvatar2;
          var node = (_this$beatenAvatar2 = this.beatenAvatar) == null ? void 0 : _this$beatenAvatar2.node;
          if (!node) return;
          tween(node).by(KICK_TIME, {
            angle: -720,
            position: new Vec3(700, 500, 0)
          }, {
            easing: 'quadIn'
          }).call(function () {
            node.active = false;
          }).start();
          tween(node).to(KICK_TIME, {
            scale: new Vec3(0.2, 0.2, 1)
          }, {
            easing: 'quadIn'
          }).start();
        };
        _proto.applyAvatar = function applyAvatar(photoUrl, avatarIndex) {
          var _this$npcAvatarFrames,
            _this3 = this;
          var sprite = this.beatenAvatar;
          if (!sprite) return;
          var token = ++this.avatarToken;
          var npcFrame = avatarIndex >= 0 ? (_this$npcAvatarFrames = this.npcAvatarFrames[avatarIndex]) != null ? _this$npcAvatarFrames : null : null;
          sprite.spriteFrame = npcFrame != null ? npcFrame : this.avatarPlaceholder;
          if (!photoUrl) return;
          AvatarLoader.load(photoUrl).then(function (frame) {
            if (frame && sprite.isValid && token === _this3.avatarToken) {
              sprite.spriteFrame = frame;
            }
          });
        };
        return TournamentWinScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "titleLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "subtitleLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "beatenAvatar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "continueButton", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "closeButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "avatarPlaceholder", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "npcAvatarFrames", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/screens', 'chunks:///_virtual/screens'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});