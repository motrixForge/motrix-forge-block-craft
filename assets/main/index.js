System.register("chunks:///_virtual/AdsUtils.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts'], function (exports) {
  var _extends, _asyncToGenerator, _regeneratorRuntime, _inheritsLoose, _wrapNativeSuper, cclegacy, AudioManager;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _inheritsLoose = module.inheritsLoose;
      _wrapNativeSuper = module.wrapNativeSuper;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AudioManager = module.AudioManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "760549kr7hCDZGpl5OH8ue3", "AdsUtils", undefined);

      /** The active platform's requirements, from core/sdk/configs/config.<platform>.ts. */

      var DEFAULT_AD_CONFIG = {
        interstitialMoment: 'next-run',
        interstitialCooldownMs: 180000,
        firstInterstitialDelayMs: 120000,
        requiresPreroll: false,
        adStartTimeoutMs: 10000,
        adTimeoutMs: 90000
      };
      // The adapter arms its own deadline first, so this one only fires for a vendor that never answers
      // at all. It must outlast the adapter's, or it would cut a watched ad short of its reward.
      var TIMEOUT_GRACE_MS = 5000;
      var AdTimeoutError = /*#__PURE__*/function (_Error) {
        _inheritsLoose(AdTimeoutError, _Error);
        function AdTimeoutError() {
          return _Error.apply(this, arguments) || this;
        }
        return AdTimeoutError;
      }( /*#__PURE__*/_wrapNativeSuper(Error));
      function withDeadline(pending, timeoutMs) {
        if (timeoutMs <= 0) return pending;
        return new Promise(function (resolve, reject) {
          var timer = setTimeout(function () {
            return reject(new AdTimeoutError());
          }, timeoutMs);
          pending.then(function (value) {
            clearTimeout(timer);
            resolve(value);
          }, function (error) {
            clearTimeout(timer);
            reject(error);
          });
        });
      }

      // ScreenManager imports this file in __preload, so module load is the scene coming up.
      var LAUNCHED_AT = Date.now();
      var AdsUtils = exports('AdsUtils', /*#__PURE__*/function () {
        function AdsUtils() {
          this.adInFlight = false;
          this.prerollOwed = null;
          this.config = null;
          this.lastAdShownAt = 0;
          this.cover = null;
        }
        AdsUtils.getInstance = function getInstance() {
          if (!AdsUtils.instance) {
            AdsUtils.instance = new AdsUtils();
          }
          return AdsUtils.instance;
        };
        var _proto = AdsUtils.prototype;
        _proto.hasAdSupport = function hasAdSupport() {
          var _window$GameSDK$suppo, _window$GameSDK;
          return (_window$GameSDK$suppo = (_window$GameSDK = window.GameSDK) == null ? void 0 : _window$GameSDK.supports('ads')) != null ? _window$GameSDK$suppo : false;
        };
        _proto.setLoadingCover = function setLoadingCover(cover) {
          var _this$cover;
          if (!cover) (_this$cover = this.cover) == null || _this$cover.hide();
          this.cover = cover;
        };
        _proto.showRewardedAdAsync = /*#__PURE__*/function () {
          var _showRewardedAdAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var outcome;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (this.hasAdSupport()) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return", 'granted');
                case 2:
                  if (!this.adInFlight) {
                    _context2.next = 4;
                    break;
                  }
                  return _context2.abrupt("return", 'busy');
                case 4:
                  _context2.prev = 4;
                  _context2.next = 7;
                  return this.playAdAsync( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                    var _yield$window$GameSDK, _window$GameSDK2;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return (_window$GameSDK2 = window.GameSDK) == null ? void 0 : _window$GameSDK2.showRewardedVideoAsync();
                        case 2:
                          _context.t0 = _yield$window$GameSDK = _context.sent;
                          if (!(_context.t0 != null)) {
                            _context.next = 7;
                            break;
                          }
                          _context.t1 = _yield$window$GameSDK;
                          _context.next = 8;
                          break;
                        case 7:
                          _context.t1 = 'unavailable';
                        case 8:
                          return _context.abrupt("return", _context.t1);
                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }, _callee);
                  })));
                case 7:
                  outcome = _context2.sent;
                  _context2.next = 13;
                  break;
                case 10:
                  _context2.prev = 10;
                  _context2.t0 = _context2["catch"](4);
                  return _context2.abrupt("return", 'unavailable');
                case 13:
                  if (outcome !== 'unavailable') this.lastAdShownAt = Date.now();
                  return _context2.abrupt("return", outcome === 'rewarded' ? 'granted' : outcome);
                case 15:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this, [[4, 10]]);
          }));
          function showRewardedAdAsync() {
            return _showRewardedAdAsync.apply(this, arguments);
          }
          return showRewardedAdAsync;
        }();
        _proto.showInterstitialAdAsync = /*#__PURE__*/function () {
          var _showInterstitialAdAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(moment) {
            var shown;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  if (moment === void 0) {
                    moment = 'next-run';
                  }
                  if (this.canShowInterstitial(moment)) {
                    _context4.next = 3;
                    break;
                  }
                  return _context4.abrupt("return", false);
                case 3:
                  _context4.prev = 3;
                  _context4.next = 6;
                  return this.playAdAsync( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                    var _yield$window$GameSDK2, _window$GameSDK3;
                    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                      while (1) switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return (_window$GameSDK3 = window.GameSDK) == null ? void 0 : _window$GameSDK3.showInterstitialAsync();
                        case 2:
                          _context3.t0 = _yield$window$GameSDK2 = _context3.sent;
                          if (!(_context3.t0 != null)) {
                            _context3.next = 7;
                            break;
                          }
                          _context3.t1 = _yield$window$GameSDK2;
                          _context3.next = 8;
                          break;
                        case 7:
                          _context3.t1 = false;
                        case 8:
                          return _context3.abrupt("return", _context3.t1);
                        case 9:
                        case "end":
                          return _context3.stop();
                      }
                    }, _callee3);
                  })));
                case 6:
                  shown = _context4.sent;
                  if (shown) {
                    this.prerollOwed = false;
                    this.lastAdShownAt = Date.now();
                  }
                  return _context4.abrupt("return", shown);
                case 11:
                  _context4.prev = 11;
                  _context4.t0 = _context4["catch"](3);
                  return _context4.abrupt("return", false);
                case 14:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this, [[3, 11]]);
          }));
          function showInterstitialAdAsync(_x) {
            return _showInterstitialAdAsync.apply(this, arguments);
          }
          return showInterstitialAdAsync;
        }();
        _proto.canShowInterstitial = function canShowInterstitial(moment) {
          if (this.adInFlight) return false;
          var config = this.adConfig();
          if (config.interstitialMoment !== moment) return false;
          var now = Date.now();
          if (this.owesPreroll(config)) return true;
          if (now - LAUNCHED_AT < config.firstInterstitialDelayMs) return false;
          return !this.isCoolingDown(config.interstitialCooldownMs, now);
        };
        _proto.adConfig = function adConfig() {
          var _sdk$adConfig, _policy$moment, _policy$cooldownMs, _sdk$requiresPreroll;
          if (this.config) return this.config;
          var sdk = window.GameSDK;
          if (!sdk) return DEFAULT_AD_CONFIG;
          var policy = sdk.interstitialPolicy == null ? void 0 : sdk.interstitialPolicy();
          this.config = (_sdk$adConfig = sdk.adConfig == null ? void 0 : sdk.adConfig()) != null ? _sdk$adConfig : _extends({}, DEFAULT_AD_CONFIG, {
            interstitialMoment: (_policy$moment = policy == null ? void 0 : policy.moment) != null ? _policy$moment : DEFAULT_AD_CONFIG.interstitialMoment,
            interstitialCooldownMs: (_policy$cooldownMs = policy == null ? void 0 : policy.cooldownMs) != null ? _policy$cooldownMs : DEFAULT_AD_CONFIG.interstitialCooldownMs,
            requiresPreroll: (_sdk$requiresPreroll = sdk.requiresPreroll == null ? void 0 : sdk.requiresPreroll()) != null ? _sdk$requiresPreroll : false
          });
          return this.config;
        };
        _proto.owesPreroll = function owesPreroll(config) {
          if (this.prerollOwed === null) this.prerollOwed = config.requiresPreroll;
          return this.prerollOwed;
        };
        _proto.isCoolingDown = function isCoolingDown(cooldownMs, now) {
          if (cooldownMs <= 0 || this.lastAdShownAt === 0) return false;
          return now - this.lastAdShownAt < cooldownMs;
        };
        _proto.playAdAsync = /*#__PURE__*/function () {
          var _playAdAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(play) {
            var _window$__TOUCH_DEBUG, _this$cover2;
            var deadline, audio, _window$__TOUCH_DEBUG2, _this$cover3;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  deadline = this.adConfig().adTimeoutMs + TIMEOUT_GRACE_MS;
                  this.adInFlight = true;
                  (_window$__TOUCH_DEBUG = window.__TOUCH_DEBUG__) == null || _window$__TOUCH_DEBUG.log('ad start');
                  audio = AudioManager.instance;
                  audio == null || audio.setAdSuspended(true);
                  (_this$cover2 = this.cover) == null || _this$cover2.show();
                  _context5.prev = 6;
                  _context5.next = 9;
                  return withDeadline(play(), deadline);
                case 9:
                  return _context5.abrupt("return", _context5.sent);
                case 10:
                  _context5.prev = 10;
                  this.adInFlight = false;
                  (_window$__TOUCH_DEBUG2 = window.__TOUCH_DEBUG__) == null || _window$__TOUCH_DEBUG2.log('ad end');
                  (_this$cover3 = this.cover) == null || _this$cover3.hide();
                  audio == null || audio.setAdSuspended(false);
                  return _context5.finish(10);
                case 16:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this, [[6,, 10, 16]]);
          }));
          function playAdAsync(_x2) {
            return _playAdAsync.apply(this, arguments);
          }
          return playAdAsync;
        }();
        return AdsUtils;
      }());
      AdsUtils.instance = void 0;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdventureHud.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SpriteLoader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Color, Node, ProgressBar, Label, UITransform, Sprite, Tween, tween, Component, SpriteLoader;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Node = module.Node;
      ProgressBar = module.ProgressBar;
      Label = module.Label;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "64039YLc+ZOa4VYci2Q6YM7", "AdventureHud", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GEM_SIZE = 90;
      var TEXT_COLOR = new Color(255, 255, 255, 255);
      var TIMER_COLOR = new Color(255, 200, 50, 255);

      /** One slot per gem type a collect level can ask for (see MarkType). */
      var COLLECT_SLOTS = 5;

      /** Horizontal gap (px) between collect-goal gems; the active gems are centered around x=0. */
      var COLLECT_SPACING = 225;

      /**
       * Widest the gem row may span on the 1080-wide canvas. The row stays evenly spaced at every goal
       * count, so a full five-gem level narrows the gap rather than crowding both edges.
       */
      var COLLECT_ROW_WIDTH = 960;

      /**
       * Timer slot inside Header, mirroring SettingsBtn (x=465) across it. It is parented to Header
       * rather than to the hud because Header is top-aligned and the hud hangs below it, so a timer
       * under the hud drops onto the board on short canvases.
       */
      var TIMER_X = -465;
      var TIMER_Y = 150;

      /** Seconds the score bar takes to count up + slide the fill/circle to a new total, like Classic. */
      var SCORE_COUNT_TIME = 1;

      /**
       * Drives two authored score-bar nodes (wired in the Inspector); all styling lives on them:
       *  - `bar`: child `Track` (Sprite + ProgressBar whose barSprite = `Fill`), child `Fill`, child
       *    `TargetScore` (Label). The fill/circle travel is measured off the art by fitTravelToGoal.
       *  - `circle`: child `Score` (Label). Slides from its authored start to the target knob as it fills.
       * Collect gems + timer are built in code.
       */
      var AdventureHud = exports('AdventureHud', (_dec = ccclass('AdventureHud'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AdventureHud, _Component);
        function AdventureHud() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "bar", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "circle", _descriptor2, _assertThisInitialized(_this));
          _this.fillBar = null;
          _this.currentLabel = null;
          _this.targetLabel = null;
          _this.circleStartX = 0;
          _this.travel = 0;
          /** Goal for the active score level; held so the count-up can recompute progress each frame. */
          _this.scoreGoal = 0;
          /** Value the bar currently shows; the count-up tweens this toward each new total. */
          _this.displayedScore = 0;
          /** Tween target so the count-up can be stopped/restarted via Tween.stopAllByTarget. */
          _this.scoreProxy = {
            v: 0
          };
          _this.collectGroup = null;
          _this.collectItems = [];
          _this.collectLabels = [];
          _this.collectGems = [];
          _this.timerLabel = null;
          return _this;
        }
        var _proto = AdventureHud.prototype;
        _proto.onLoad = function onLoad() {
          this.wireScoreBar();
          this.buildCollectGroup();
          this.buildTimer();
          this.hide();
        };
        _proto.wireScoreBar = function wireScoreBar() {
          if (this.bar) {
            var _this$bar$getChildByN, _this$bar$getChildByN2;
            // ProgressBar can sit on any child under Bar (Track or Fill) — find it wherever it is.
            this.fillBar = this.bar.getComponentInChildren(ProgressBar);
            this.targetLabel = (_this$bar$getChildByN = (_this$bar$getChildByN2 = this.bar.getChildByName('TargetScore')) == null ? void 0 : _this$bar$getChildByN2.getComponent(Label)) != null ? _this$bar$getChildByN : null;
            this.travel = this.fillBar ? this.fillBar.totalLength : 0;
          } else {
            console.warn('[AdventureHud] "bar" node not wired on the AdventureHud component');
          }
          if (this.circle) {
            var _this$circle$getChild, _this$circle$getChild2;
            this.circleStartX = this.circle.position.x;
            this.currentLabel = (_this$circle$getChild = (_this$circle$getChild2 = this.circle.getChildByName('Score')) == null ? void 0 : _this$circle$getChild2.getComponent(Label)) != null ? _this$circle$getChild : null;
          } else {
            console.warn('[AdventureHud] "circle" node not wired on the AdventureHud component');
          }
          this.fitTravelToGoal();
          if (!this.fillBar) {
            console.warn('[AdventureHud] no ProgressBar found under the Bar node');
          } else if (this.travel <= 1) {
            console.warn("[AdventureHud] ProgressBar Total Length is " + this.travel + " \u2014 set it (e.g. 312)");
          }
        }

        /**
         * The track art ends in the goal bubble that holds the target score — drawn by the track
         * sprite's right 9-slice inset — so the fill and the knob have to stop where that bubble
         * starts, or the knob rides over the number it is counting toward.
         */;
        _proto.fitTravelToGoal = function fitTravelToGoal() {
          var _this$bar, _this$circle;
          var track = (_this$bar = this.bar) == null ? void 0 : _this$bar.getChildByName('Track');
          var trackUI = track == null ? void 0 : track.getComponent(UITransform);
          var sprite = track == null ? void 0 : track.getComponent(Sprite);
          var knob = (_this$circle = this.circle) == null ? void 0 : _this$circle.getComponent(UITransform);
          if (!this.fillBar || !this.bar || !trackUI || !knob) return;
          if (!(sprite != null && sprite.spriteFrame) || sprite.type !== Sprite.Type.SLICED) return;
          var trackRight = this.bar.position.x + track.position.x + trackUI.width * (1 - trackUI.anchorPoint.x);
          var goalLeft = trackRight - sprite.spriteFrame.insetRight;
          var travel = goalLeft - knob.width / 2 - this.circleStartX;
          if (travel <= 0) return;
          this.travel = travel;
          this.fillBar.totalLength = travel;
        };
        _proto.buildTimer = function buildTimer() {
          var _this$node$parent;
          var header = (_this$node$parent = this.node.parent) != null ? _this$node$parent : this.node;
          this.timerLabel = this.makeLabel('TimerLabel', header, TIMER_X, TIMER_Y, 60);
          this.timerLabel.color = TIMER_COLOR.clone();
        };
        _proto.buildCollectGroup = function buildCollectGroup() {
          var group = this.makeNode('CollectGroup', this.node, 0, 0);
          this.collectGroup = group;
          // Initial positions; showCollect re-centers the used items for the actual goal count.
          var spacing = this.collectSpacing(COLLECT_SLOTS);
          var startX = -((COLLECT_SLOTS - 1) * spacing) / 2;
          for (var t = 0; t < COLLECT_SLOTS; t++) {
            var item = this.makeNode("Item" + t, group, startX + t * spacing, 0);
            var gem = this.makeSpriteNode("Gem" + t, item, 0, 30, GEM_SIZE, GEM_SIZE, TEXT_COLOR);
            var label = this.makeLabel("Count" + t, item, 0, -51, 54);
            this.collectItems.push(item);
            this.collectGems.push(gem);
            this.collectLabels.push(label);
          }
        };
        _proto.hide = function hide() {
          Tween.stopAllByTarget(this.scoreProxy);
          this.setScoreVisible(false);
          if (this.collectGroup) this.collectGroup.active = false;
          if (this.timerLabel) this.timerLabel.node.active = false;
        };
        _proto.setScoreVisible = function setScoreVisible(visible) {
          if (this.bar) this.bar.active = visible;
          if (this.circle) this.circle.active = visible;
        };
        _proto.showTimer = function showTimer(seconds) {
          if (!this.timerLabel) return;
          this.timerLabel.node.active = true;
          this.updateTimer(seconds);
        };
        _proto.updateTimer = function updateTimer(remaining) {
          if (!this.timerLabel) return;
          var total = Math.max(0, Math.ceil(remaining));
          var mm = Math.floor(total / 60);
          var ss = total % 60;
          this.timerLabel.string = mm + ":" + ss.toString().padStart(2, '0');
        };
        _proto.showScore = function showScore(current, goal) {
          if (this.collectGroup) this.collectGroup.active = false;
          this.setScoreVisible(true);
          // Cleared here so a non-timed level after a timed one doesn't keep a stale countdown.
          if (this.timerLabel) this.timerLabel.node.active = false;
          // Snap to the starting value so a fresh level doesn't count down from the previous run.
          Tween.stopAllByTarget(this.scoreProxy);
          this.displayedScore = current;
          this.scoreGoal = goal;
          this.applyScore(current);
        }

        /**
         * Counts the readout up to `current` over SCORE_COUNT_TIME (like Classic), gliding the fill and
         * circle knob with it rather than teleporting. Snaps immediately when the value is unchanged.
         */;
        _proto.updateScore = function updateScore(current, goal) {
          var _this2 = this;
          this.scoreGoal = goal;
          Tween.stopAllByTarget(this.scoreProxy);
          if (current === this.displayedScore) {
            this.applyScore(current);
            return;
          }
          this.scoreProxy.v = this.displayedScore;
          tween(this.scoreProxy).to(SCORE_COUNT_TIME, {
            v: current
          }, {
            easing: 'sineOut',
            onUpdate: function onUpdate() {
              return _this2.applyScore(_this2.scoreProxy.v);
            }
          }).call(function () {
            return _this2.applyScore(current);
          }).start();
        };
        _proto.applyScore = function applyScore(value) {
          this.displayedScore = value;
          var goal = this.scoreGoal;
          var progress = goal > 0 ? Math.min(1, value / goal) : 0;
          if (this.fillBar) this.fillBar.progress = progress;
          if (this.circle) {
            var y = this.circle.position.y;
            this.circle.setPosition(this.circleStartX + progress * this.travel, y, 0);
          }
          if (this.currentLabel) this.currentLabel.string = "" + Math.round(value);
          if (this.targetLabel) this.targetLabel.string = "" + goal;
        };
        _proto.showCollect = function showCollect(goals) {
          this.setScoreVisible(false);
          if (this.collectGroup) this.collectGroup.active = true;
          if (this.timerLabel) this.timerLabel.node.active = false;
          var types = this.goalTypes(goals);
          // Center the used gems around x=0 so 1 gem sits in the middle and 2..5 spread symmetrically.
          var spacing = this.collectSpacing(types.length);
          var startX = -((types.length - 1) * spacing) / 2;
          for (var i = 0; i < this.collectItems.length; i++) {
            var used = i < types.length;
            this.collectItems[i].active = used;
            if (used) {
              this.collectItems[i].setPosition(startX + i * spacing, 0, 0);
              // Assigned even when the lookup misses: the slots outlive the level, so keeping
              // the old frame would label this level's goal with the previous level's gem.
              var loader = SpriteLoader.instance;
              if (loader) this.collectGems[i].spriteFrame = loader.getMarkSprite(types[i]);
            }
          }
        }

        /** Updates each used counter to the marks still needed (`remaining(type)`), 0 once met. */;
        _proto.updateCollect = function updateCollect(goals, remaining) {
          var types = this.goalTypes(goals);
          for (var i = 0; i < this.collectLabels.length; i++) {
            if (i >= types.length) continue;
            this.collectLabels[i].string = "" + remaining(types[i]);
          }
        }

        /** One gap for the whole row, so the gems are equidistant at any goal count. */;
        _proto.collectSpacing = function collectSpacing(count) {
          if (count <= 1) return COLLECT_SPACING;
          return Math.min(COLLECT_SPACING, (COLLECT_ROW_WIDTH - GEM_SIZE) / (count - 1));
        }

        /** The level's collect types, ascending by gem index (stable slot order for the counters). */;
        _proto.goalTypes = function goalTypes(goals) {
          return Object.keys(goals).map(function (k) {
            return Number(k);
          }).sort(function (a, b) {
            return a - b;
          });
        };
        _proto.makeNode = function makeNode(name, parent, x, y) {
          var node = new Node(name);
          node.addComponent(UITransform);
          node.setParent(parent);
          node.setPosition(x, y, 0);
          return node;
        };
        _proto.makeSpriteNode = function makeSpriteNode(name, parent, x, y, w, h, color) {
          var _node$getComponent, _SpriteLoader$instanc;
          var node = this.makeNode(name, parent, x, y);
          (_node$getComponent = node.getComponent(UITransform)) == null || _node$getComponent.setContentSize(w, h);
          var sprite = node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          var frame = (_SpriteLoader$instanc = SpriteLoader.instance) == null ? void 0 : _SpriteLoader$instanc.getCellSprite(0);
          if (frame) sprite.spriteFrame = frame;
          sprite.color = color.clone();
          return sprite;
        };
        _proto.makeLabel = function makeLabel(name, parent, x, y, fontSize) {
          var _node$getComponent2;
          var node = this.makeNode(name, parent, x, y);
          (_node$getComponent2 = node.getComponent(UITransform)) == null || _node$getComponent2.setContentSize(210, fontSize + 12);
          var label = node.addComponent(Label);
          label.fontSize = fontSize;
          label.lineHeight = fontSize + 6;
          label.isBold = true;
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.color = TEXT_COLOR.clone();
          label.string = '0';
          return label;
        };
        return AdventureHud;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bar", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "circle", [_dec3], {
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

System.register("chunks:///_virtual/AdventureLevelLoader.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, resources, JsonAsset, GRID_SIZE;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      resources = module.resources;
      JsonAsset = module.JsonAsset;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
    }],
    execute: function () {
      cclegacy._RF.push({}, "55958RfmjNPW5v0qjS7wcjC", "AdventureLevelLoader", undefined);
      var PACK_PATH = 'adventure-levels';
      var cache = new Map();
      var packLoaded = false;
      var inFlight = null;
      var inBounds = function inBounds(r, c) {
        return Number.isInteger(r) && Number.isInteger(c) && r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE;
      };
      function validate(data, id) {
        var level = data;
        if (!level || typeof level !== 'object' || level.id !== id) return fail(id, 'bad id/shape');
        if (level.timeLimit !== undefined && !(level.timeLimit > 0)) return fail(id, 'bad timeLimit');
        if (level.type === 'score') {
          if (!(level.goal > 0) || !Array.isArray(level.patternCells)) return fail(id, 'bad score');
          for (var _iterator = _createForOfIteratorHelperLoose(level.patternCells), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              r = _step$value[0],
              c = _step$value[1];
            if (!inBounds(r, c)) return fail(id, 'oob cell');
          }
          return level;
        }
        if (level.type === 'collect') {
          if (!level.goals || Object.keys(level.goals).length === 0) return fail(id, 'no goals');
          if (!Array.isArray(level.boardMarks)) return fail(id, 'bad marks');
          for (var _iterator2 = _createForOfIteratorHelperLoose(level.boardMarks), _step2; !(_step2 = _iterator2()).done;) {
            var _step2$value = _step2.value,
              _r2 = _step2$value[0],
              _c2 = _step2$value[1];
            if (!inBounds(_r2, _c2)) return fail(id, 'oob mark');
          }
          if (level.armorCells !== undefined) {
            if (!Array.isArray(level.armorCells)) return fail(id, 'bad armor');
            var markSet = new Set(level.boardMarks.map(function (_ref) {
              var r = _ref[0],
                c = _ref[1];
              return r * GRID_SIZE + c;
            }));
            for (var _iterator3 = _createForOfIteratorHelperLoose(level.armorCells), _step3; !(_step3 = _iterator3()).done;) {
              var _step3$value = _step3.value,
                _r = _step3$value[0],
                _c = _step3$value[1];
              if (!inBounds(_r, _c)) return fail(id, 'oob armor');
              if (!markSet.has(_r * GRID_SIZE + _c)) return fail(id, 'armor not on a mark');
            }
          }
          return level;
        }
        return fail(id, 'unknown type');
      }
      function fail(id, why) {
        console.error("AdventureLevelLoader: level " + id + " invalid (" + why + ")");
        return null;
      }
      function fetchPack() {
        return new Promise(function (resolve) {
          resources.load(PACK_PATH, JsonAsset, function (err, asset) {
            if (err || !asset) {
              console.error('AdventureLevelLoader: failed to load level pack', err);
              resolve(null);
              return;
            }
            var pack = asset.json;
            if (!pack || !Array.isArray(pack.levels)) {
              console.error('AdventureLevelLoader: level pack malformed');
              resolve(null);
              return;
            }
            resolve(pack.levels);
          });
        });
      }
      function cacheLevels(raw) {
        for (var _iterator4 = _createForOfIteratorHelperLoose(raw), _step4; !(_step4 = _iterator4()).done;) {
          var entry = _step4.value;
          var id = entry == null ? void 0 : entry.id;
          if (typeof id !== 'number') {
            console.error('AdventureLevelLoader: pack entry with no id');
            continue;
          }
          var level = validate(entry, id);
          if (level) cache.set(id, level);
        }
      }
      function fetchAndCache() {
        return _fetchAndCache.apply(this, arguments);
      }
      function _fetchAndCache() {
        _fetchAndCache = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var _yield$fetchPack;
          var raw;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetchPack();
              case 2:
                _context.t0 = _yield$fetchPack = _context.sent;
                if (!(_context.t0 != null)) {
                  _context.next = 7;
                  break;
                }
                _context.t1 = _yield$fetchPack;
                _context.next = 10;
                break;
              case 7:
                _context.next = 9;
                return fetchPack();
              case 9:
                _context.t1 = _context.sent;
              case 10:
                raw = _context.t1;
                if (raw) {
                  _context.next = 13;
                  break;
                }
                return _context.abrupt("return", false);
              case 13:
                cacheLevels(raw);
                packLoaded = true;
                return _context.abrupt("return", true);
              case 16:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return _fetchAndCache.apply(this, arguments);
      }
      function loadAll() {
        if (packLoaded) return Promise.resolve(true);
        if (inFlight) return inFlight;
        inFlight = fetchAndCache().then(function (ok) {
          inFlight = null;
          return ok;
        });
        return inFlight;
      }
      function load(_x) {
        return _load.apply(this, arguments);
      }
      function _load() {
        _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(id) {
          var _cache$get;
          var cached;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                cached = cache.get(id);
                if (!cached) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt("return", cached);
              case 3:
                _context2.next = 5;
                return loadAll();
              case 5:
                if (_context2.sent) {
                  _context2.next = 7;
                  break;
                }
                return _context2.abrupt("return", null);
              case 7:
                return _context2.abrupt("return", (_cache$get = cache.get(id)) != null ? _cache$get : null);
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return _load.apply(this, arguments);
      }
      var isReady = function isReady() {
        return packLoaded;
      };
      var AdventureLevelLoader = exports('AdventureLevelLoader', {
        loadAll: loadAll,
        load: load,
        isReady: isReady
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdventureLevels.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        adventureLevelType: adventureLevelType,
        difficultyFor: difficultyFor
      });
      cclegacy._RF.push({}, "53270j3AbpOWKlp4YVvKaQl", "AdventureLevels", undefined);
      var scoreForLines = exports('scoreForLines', function scoreForLines(n) {
        return n <= 0 ? 0 : 5 * n * (n + 1);
      });
      function difficultyFor(id) {
        if (id <= 10) return 'easy';
        if (id <= 20) return 'normal';
        return 'hard';
      }
      var TIME_LIMITS = exports('TIME_LIMITS', {
        10: 300,
        20: 300,
        30: 300,
        40: 300
      });
      function adventureLevelType(id) {
        if (id === 20 || id === 40) return 'collect';
        return Math.floor((id - 1) / 5) % 2 === 0 ? 'collect' : 'score';
      }

      /**
       * Collect levels gain a gem type every level decade (1-9 -> 1 type, 10-19 -> 2, ... 40 -> 5), and
       * each band raises how many of every type the level asks for. Level 40 is the only band-4 collect
       * level, so it is the five-gem finale. Mirrored by scripts/gen-adventure-levels.mjs.
       */
      var COLLECT_TYPE_COUNTS = [1, 2, 3, 4, 5];
      var COLLECT_GOALS = [5, 15, 25, 35, 50];
      var COLLECT_BOARD_MARKS = [3, 8, 12, 15, 18];
      var collectBand = function collectBand(id) {
        return Math.min(Math.max(Math.floor(id / 10), 0), COLLECT_TYPE_COUNTS.length - 1);
      };
      var collectTypeCountFor = exports('collectTypeCountFor', function collectTypeCountFor(id) {
        return COLLECT_TYPE_COUNTS[collectBand(id)];
      });
      var collectGoalFor = exports('collectGoalFor', function collectGoalFor(id) {
        return COLLECT_GOALS[collectBand(id)];
      });
      var collectBoardMarksFor = exports('collectBoardMarksFor', function collectBoardMarksFor(id) {
        return COLLECT_BOARD_MARKS[collectBand(id)];
      });

      /**
       * Share of a tray block's cells that carry that block's gem. The last band hands out blocks that
       * are almost all gem and makes a plain cell the rare thing; the first keeps gems occasional.
       */
      var COLLECT_GEM_DENSITY = [0.15, 0.3, 0.5, 0.75, 0.95];
      var collectGemDensityFor = exports('collectGemDensityFor', function collectGemDensityFor(id) {
        return COLLECT_GEM_DENSITY[collectBand(id)];
      });
      var ARMOR_COUNTS = exports('ARMOR_COUNTS', {
        21: 2,
        22: 3,
        23: 3,
        24: 4,
        25: 4,
        31: 4,
        32: 5,
        33: 5,
        34: 6,
        35: 6,
        40: 3
      });
      var armorCountFor = exports('armorCountFor', function armorCountFor(id) {
        var _ARMOR_COUNTS$id;
        return (_ARMOR_COUNTS$id = ARMOR_COUNTS[id]) != null ? _ARMOR_COUNTS$id : 0;
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdventureLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f0b98iW1AdFW5k6SbuNGtak", "AdventureLogic", undefined);
      var AdventureLogic = exports('AdventureLogic', /*#__PURE__*/function () {
        function AdventureLogic(gm) {
          this.gm = void 0;
          this.level = null;
          this.turns = 0;
          this.collected = new Map();
          this.lastCollected = 0;
          this.remainingTime = 0;
          this.timerActive = false;
          this.gm = gm;
        }
        var _proto = AdventureLogic.prototype;
        _proto.isActive = function isActive() {
          return this.level !== null;
        };
        _proto.getLevel = function getLevel() {
          return this.level;
        };
        _proto.getTurns = function getTurns() {
          return this.turns;
        };
        _proto.start = function start(level) {
          this.level = level;
          this.turns = 0;
          this.collected.clear();
          this.lastCollected = 0;
          this.remainingTime = 0;
          this.timerActive = false;
        };
        _proto.reset = function reset() {
          this.level = null;
          this.turns = 0;
          this.collected.clear();
          this.lastCollected = 0;
          this.remainingTime = 0;
          this.timerActive = false;
        };
        _proto.startTimer = function startTimer(seconds) {
          this.remainingTime = seconds;
          this.timerActive = true;
        };
        _proto.hasTimer = function hasTimer() {
          return this.timerActive;
        };
        _proto.getRemainingTime = function getRemainingTime() {
          return this.remainingTime;
        };
        _proto.tickTimer = function tickTimer(dt) {
          if (!this.timerActive) return false;
          this.remainingTime = Math.max(0, this.remainingTime - dt);
          if (this.remainingTime <= 0) {
            this.timerActive = false;
            return true;
          }
          return false;
        };
        _proto.onBlockPlaced = function onBlockPlaced() {
          if (this.level) this.turns++;
        };
        _proto.onTurnCleared = function onTurnCleared() {
          this.lastCollected = 0;
          if (!this.level || this.level.type !== 'collect') return;
          var cleared = this.gm.getGridLogic().takeClearedMarks();
          for (var _iterator = _createForOfIteratorHelperLoose(cleared), _step; !(_step = _iterator()).done;) {
            var _this$collected$get;
            var _step$value = _step.value,
              type = _step$value[0],
              count = _step$value[1];
            this.collected.set(type, ((_this$collected$get = this.collected.get(type)) != null ? _this$collected$get : 0) + count);
            this.lastCollected += count;
          }
        };
        _proto.getLastCollected = function getLastCollected() {
          return this.lastCollected;
        };
        _proto.getCollected = function getCollected(type) {
          var _this$collected$get2;
          return (_this$collected$get2 = this.collected.get(type)) != null ? _this$collected$get2 : 0;
        };
        _proto.getRemaining = function getRemaining(type, goal) {
          return Math.max(0, goal - this.getCollected(type));
        };
        _proto.isWon = function isWon() {
          if (!this.level) return false;
          if (this.level.type === 'score') {
            return this.gm.getScoreLogic().getTotal() >= this.level.goal;
          }
          for (var _i = 0, _Object$entries = Object.entries(this.level.goals); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _Object$entries[_i],
              typeStr = _Object$entries$_i[0],
              goal = _Object$entries$_i[1];
            var type = Number(typeStr);
            if (this.getCollected(type) < (goal != null ? goal : 0)) return false;
          }
          return true;
        };
        return AdventureLogic;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdventureMode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AdventureLevels.ts', './AdventurePicture.ts', './AudioManager.ts', './GameEvents.ts', './DataManager.ts', './ScreenManager.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, _asyncToGenerator, _regeneratorRuntime, cclegacy, scoreForLines, ADVENTURE_LEVEL_COUNT, AudioManager, SFX, ScreenNames, DataManager, ScreenManager;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      scoreForLines = module.scoreForLines;
    }, function (module) {
      ADVENTURE_LEVEL_COUNT = module.ADVENTURE_LEVEL_COUNT;
    }, function (module) {
      AudioManager = module.AudioManager;
      SFX = module.SFX;
    }, function (module) {
      ScreenNames = module.ScreenNames;
    }, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "67cf5horxdFZZqlu11JTaM+", "AdventureMode", undefined);
      var BOARD_REVEAL_HOLD = 0.25;
      var AdventureMode = exports('AdventureMode', /*#__PURE__*/function () {
        function AdventureMode(gm, level) {
          this.gm = void 0;
          this.level = void 0;
          this.outOfTime = false;
          this.timerTick = null;
          this.runGen = 0;
          this.gm = gm;
          this.level = level;
        }
        var _proto = AdventureMode.prototype;
        _proto.getLevel = function getLevel() {
          return this.level;
        };
        _proto.setup = function setup() {
          var _window$GameSDK, _screen$getVersusHud, _screen$getBestScoreU;
          var level = this.level;
          this.outOfTime = false;
          // Retry re-runs setup on this same instance, so this is what tells a celebration still
          // playing from the previous attempt that its result screen is no longer wanted.
          this.runGen += 1;
          this.applyBoard(level);
          this.gm.getAdventureLogic().start(level);
          (_window$GameSDK = window.GameSDK) == null || _window$GameSDK.updateLevel(level.id);
          var screen = this.gm.getGameScreen();
          var hud = screen.getAdventureHud();
          (_screen$getVersusHud = screen.getVersusHud()) == null || _screen$getVersusHud.hide();
          (_screen$getBestScoreU = screen.getBestScoreUI()) == null || _screen$getBestScoreU.setVisible(false);
          screen.getScoreUI().node.active = false;
          if (level.type === 'score') {
            this.gm.getScoreLogic().setLineScoreOverride(scoreForLines);
            hud == null || hud.showScore(0, level.goal);
          } else {
            this.gm.getScoreLogic().setLineScoreOverride(null);
            hud == null || hud.showCollect(level.goals);
            this.refreshHud();
          }
          if (level.timeLimit) {
            this.gm.getAdventureLogic().startTimer(level.timeLimit);
            hud == null || hud.showTimer(level.timeLimit);
            this.startCountdown();
          }
        };
        _proto.startCountdown = function startCountdown() {
          var _this = this;
          var logic = this.gm.getAdventureLogic();
          var tick = function tick() {
            var _this$gm$getGameScree;
            var expired = logic.tickTimer(1);
            (_this$gm$getGameScree = _this.gm.getGameScreen().getAdventureHud()) == null || _this$gm$getGameScree.updateTimer(logic.getRemainingTime());
            if (expired) {
              _this.stopCountdown();
              _this.outOfTime = true;
              _this.gm.failRun();
            }
          };
          this.timerTick = tick;
          this.gm.schedule(tick, 1);
        };
        _proto.stopCountdown = function stopCountdown() {
          if (!this.timerTick) return;
          this.gm.unschedule(this.timerTick);
          this.timerTick = null;
        };
        _proto.showsScorePopup = function showsScorePopup() {
          return this.level.type === 'score';
        };
        _proto.onBlockPlaced = function onBlockPlaced(block, def, startR, startC) {
          this.gm.getAdventureLogic().onBlockPlaced();
          for (var _iterator = _createForOfIteratorHelperLoose(block.marks), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              idx = _step$value[0],
              type = _step$value[1];
            var pos = def.shape[idx];
            if (pos) this.gm.getGridLogic().addBoardMark(startR + pos.y, startC + pos.x, type);
          }
        };
        _proto.onTurnCleared = function onTurnCleared() {
          this.gm.getAdventureLogic().onTurnCleared();
          this.refreshHud();
        };
        _proto.checkWin = function checkWin() {
          return this.gm.getAdventureLogic().isWon();
        };
        _proto.checkLose = function checkLose() {
          return this.outOfTime;
        };
        _proto.onWin = function onWin() {
          var _window$GameSDK2, _AudioManager$instanc;
          this.stopCountdown();
          // The celebration runs long before the result screen opens; without this the tray stays
          // live and a block can be picked up and dragged across the whole animation.
          this.gm.getBlockLogic().lockAll();
          var level = this.level;
          var turns = this.gm.getAdventureLogic().getTurns();
          // Recorded before the celebration, not after: an app kill mid-animation must not cost the
          // player the level they just cleared.
          var best = this.recordWin(level.id, turns);
          this.gm.getDailyQuests().onAdventureLevelCleared();
          (_window$GameSDK2 = window.GameSDK) == null || _window$GameSDK2.celebrate();
          var hasNext = level.id < ADVENTURE_LEVEL_COUNT;
          (_AudioManager$instanc = AudioManager.instance) == null || _AudioManager$instanc.play(SFX.NEW_BEST);
          void this.celebrateThenShowResultAsync({
            result: 'win',
            levelName: level.name,
            turns: turns,
            best: best,
            hasNext: hasNext
          });
        }

        /**
         * The celebration outlives the turn that triggered it, so a home or retry tap while it plays
         * would otherwise drop the result screen on top of wherever the player went instead.
         *
         * Two guards because the two exits look different: retry re-runs `setup()` on this same
         * instance, while home and Next leave it behind for another `GameModeRules` entirely.
         */;
        _proto.celebrateThenShowResultAsync = /*#__PURE__*/
        function () {
          var _celebrateThenShowResultAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            var gen, board;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  gen = this.runGen; // `finally`, because the win is already recorded by now: if the celebration throws, the
                  // player must still get their result screen rather than be stranded on a cleared board.
                  _context.prev = 1;
                  board = this.gm.getGameScreen().getBoard(); // The rain's host is passed in rather than started here: it has to hang above every
                  // screen to survive the change, but the celebration is what decides when it falls.
                  if (!board) {
                    _context.next = 6;
                    break;
                  }
                  _context.next = 6;
                  return this.gm.getEffectManager().playAdventureWinAsync(board, ScreenManager.instance.node);
                case 6:
                  _context.prev = 6;
                  if (!(gen === this.runGen && this.gm.getModeRules() === this)) {
                    _context.next = 11;
                    break;
                  }
                  _context.next = 10;
                  return ScreenManager.instance.openScreenAsync(ScreenNames.ADVENTURE_RESULT_SCREEN, data);
                case 10:
                  // The result screen may have only just been instantiated, which appends it after
                  // the rain. Put the rain back in front so it carries over the new screen.
                  this.gm.getEffectManager().raiseWinConfetti();
                case 11:
                  return _context.finish(6);
                case 12:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[1,, 6, 12]]);
          }));
          function celebrateThenShowResultAsync(_x) {
            return _celebrateThenShowResultAsync.apply(this, arguments);
          }
          return celebrateThenShowResultAsync;
        }();
        _proto.onGameOver = function onGameOver() {
          var _AudioManager$instanc2;
          this.stopCountdown();
          this.gm.getBlockLogic().lockAll();
          (_AudioManager$instanc2 = AudioManager.instance) == null || _AudioManager$instanc2.play(SFX.GAME_OVER);
          ScreenManager.instance.openScreenAsync(ScreenNames.ADVENTURE_RESULT_SCREEN, {
            result: 'fail',
            levelName: this.level.name,
            reason: this.outOfTime ? 'time' : 'moves'
          });
        };
        _proto.recordWin = function recordWin(levelId, turns) {
          var _extends2;
          var progress = DataManager.getPlayerData('adventure');
          var previous = progress.best[levelId];
          var isNewBest = typeof previous !== 'number' || turns < previous;
          var nextUnlock = Math.min(levelId + 1, ADVENTURE_LEVEL_COUNT);
          DataManager.setPlayerData('adventure', {
            unlocked: Math.max(progress.unlocked, nextUnlock),
            best: isNewBest ? _extends({}, progress.best, (_extends2 = {}, _extends2[levelId] = turns, _extends2)) : progress.best
          });
          return isNewBest ? turns : previous;
        };
        _proto.applyBoard = function applyBoard(level) {
          var _level$filledCells, _level$armorCells;
          if (level.type === 'score') {
            this.gm.getGridLogic().setStartingBoard(level.patternCells, []);
            this.revealBoard(level.patternCells);
            return;
          }
          var filled = ((_level$filledCells = level.filledCells) != null ? _level$filledCells : []).map(function (_ref) {
            var r = _ref[0],
              c = _ref[1];
            return [r, c, AdventureMode.OBSTACLE_COLOR];
          });
          this.gm.getGridLogic().setStartingBoard(filled, level.boardMarks, (_level$armorCells = level.armorCells) != null ? _level$armorCells : []);
          this.revealBoard([].concat(filled, level.boardMarks));
        };
        _proto.revealBoard = function revealBoard(seeded) {
          var cells = seeded.map(function (_ref2) {
            var r = _ref2[0],
              c = _ref2[1];
            return [r, c];
          });
          this.gm.getGameScreen().getBoard().animSeedIn(cells, BOARD_REVEAL_HOLD);
        };
        _proto.refreshHud = function refreshHud() {
          var _this2 = this;
          var level = this.level;
          var hud = this.gm.getGameScreen().getAdventureHud();
          if (!hud) return;
          if (level.type === 'score') {
            hud.updateScore(this.gm.getScoreLogic().getTotal(), level.goal);
          } else {
            var goals = level.goals;
            hud.updateCollect(goals, function (t) {
              var _goals$t;
              return _this2.gm.getAdventureLogic().getRemaining(t, (_goals$t = goals[t]) != null ? _goals$t : 0);
            });
          }
        };
        return AdventureMode;
      }());
      AdventureMode.OBSTACLE_COLOR = 4;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdventurePicture.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "74393Lo86BJvrg76hHmfDD0", "AdventurePicture", undefined);
      var BUTTERFLY_ROWS = ['2...5...2', '00..5..00', '002.5.200', '.00.5.00.', '...555...', '.11.5.11.', '112.5.211', '11..5..11'];
      function buildButterflyCells(rows) {
        var cells = [];
        for (var r = rows.length - 1; r >= 0; r--) {
          var row = rows[r];
          for (var c = 0; c < row.length; c++) {
            var ch = row[c];
            if (ch !== '.') cells.push({
              r: r,
              c: c,
              colorIndex: Number(ch)
            });
          }
        }
        return cells;
      }
      var ADVENTURE_PICTURE = exports('ADVENTURE_PICTURE', {
        cols: 9,
        rows: BUTTERFLY_ROWS.length,
        cells: buildButterflyCells(BUTTERFLY_ROWS)
      });
      var ADVENTURE_LEVEL_COUNT = exports('ADVENTURE_LEVEL_COUNT', ADVENTURE_PICTURE.cells.length);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DataManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _extends, _createClass, cclegacy, _decorator, AudioClip, AudioSource, input, Input, Component, DataManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _extends = module.extends;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      AudioClip = module.AudioClip;
      AudioSource = module.AudioSource;
      input = module.input;
      Input = module.Input;
      Component = module.Component;
    }, function (module) {
      DataManager = module.DataManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3;
      cclegacy._RF.push({}, "f5565if4zxDpr1QQu6g6STu", "AudioManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      // Indices are slots in the serialized `clips` array on GameManager.prefab; 1 and 2 hold the
      // retired clear/combo clips, so the rest keep their original positions.
      var SFX = exports('SFX', /*#__PURE__*/function (SFX) {
        SFX[SFX["PLACE"] = 0] = "PLACE";
        SFX[SFX["GAME_OVER"] = 3] = "GAME_OVER";
        SFX[SFX["NEW_BEST"] = 4] = "NEW_BEST";
        SFX[SFX["PICK_BLOCK"] = 5] = "PICK_BLOCK";
        SFX[SFX["CLICKBUTTON"] = 6] = "CLICKBUTTON";
        return SFX;
      }({}));
      var AudioManager = exports('AudioManager', (_dec = ccclass('AudioManager'), _dec2 = property([AudioClip]), _dec3 = property([AudioClip]), _dec4 = property(AudioClip), _dec5 = property(AudioSource), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AudioManager, _Component);
        function AudioManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "clips", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comboClips", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scoreCounterClip", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "audioSource", _descriptor4, _assertThisInitialized(_this));
          _this._muted = true;
          _this._bgmMuted = true;
          _this._adSuspended = false;
          _this.handleAudioUnlock = function () {
            if (_this._bgmMuted || _this._adSuspended || !_this.audioSource.clip) return;
            if (!_this.audioSource.playing) _this.audioSource.play();
            _this.unregisterAudioUnlock();
          };
          return _this;
        }
        var _proto = AudioManager.prototype;
        _proto.__preload = function __preload() {
          AudioManager._instance = this;
        };
        _proto.start = function start() {
          input.on(Input.EventType.TOUCH_START, this.handleAudioUnlock, this);
          input.on(Input.EventType.MOUSE_DOWN, this.handleAudioUnlock, this);
          this.applySavedSettings();
        };
        _proto.onDestroy = function onDestroy() {
          this.unregisterAudioUnlock();
          if (AudioManager._instance === this) AudioManager._instance = null;
        };
        _proto.applySavedSettings = function applySavedSettings() {
          var settings = DataManager.getPlayerData('settings');
          this._muted = !settings.sound;
          this.applyBgmMuted(!settings.music);
        };
        _proto.unregisterAudioUnlock = function unregisterAudioUnlock() {
          input.off(Input.EventType.TOUCH_START, this.handleAudioUnlock, this);
          input.off(Input.EventType.MOUSE_DOWN, this.handleAudioUnlock, this);
        };
        _proto.play = function play(sfx) {
          if (this.silent) return;
          var clip = this.clips[sfx];
          if (!clip) return;
          if (sfx === SFX.PLACE) {
            this.audioSource.playOneShot(clip, 0.7);
            return;
          }
          this.audioSource.playOneShot(clip, 1.0);
        };
        _proto.playScoreCounter = function playScoreCounter() {
          if (!this.scoreCounterClip) return 0;
          if (!this.silent) this.audioSource.playOneShot(this.scoreCounterClip, 1.0);
          return this.scoreCounterClip.getDuration();
        };
        _proto.playCombo = function playCombo(step) {
          if (this.silent || this.comboClips.length === 0) return;
          var index = Math.min(Math.max(step, 0), this.comboClips.length - 1);
          var clip = this.comboClips[index];
          if (!clip) return;
          this.audioSource.playOneShot(clip, 1.0);
        };
        // Silences the game for an advertisement without touching the player's saved sound settings,
        // which setMuted/setBgmMuted persist.
        _proto.setAdSuspended = function setAdSuspended(suspended) {
          if (this._adSuspended === suspended) return;
          this._adSuspended = suspended;
          this.applyBgmOutput();
        };
        _proto.setMuted = function setMuted(muted) {
          this._muted = muted;
          DataManager.setPlayerData('settings', _extends({}, DataManager.getPlayerData('settings'), {
            sound: !muted
          }));
        };
        _proto.toggleMute = function toggleMute() {
          this.setMuted(!this._muted);
          return this._muted;
        };
        _proto.setBgmMuted = function setBgmMuted(muted) {
          DataManager.setPlayerData('settings', _extends({}, DataManager.getPlayerData('settings'), {
            music: !muted
          }));
          this.applyBgmMuted(muted);
        };
        _proto.applyBgmMuted = function applyBgmMuted(muted) {
          this._bgmMuted = muted;
          this.applyBgmOutput();
        };
        _proto.applyBgmOutput = function applyBgmOutput() {
          if (this._bgmMuted || this._adSuspended) {
            this.audioSource.stop();
            return;
          }
          if (this.audioSource.clip) this.audioSource.play();
        };
        _proto.toggleBgmMute = function toggleBgmMute() {
          this.setBgmMuted(!this._bgmMuted);
          return this._bgmMuted;
        };
        _createClass(AudioManager, [{
          key: "silent",
          get: function get() {
            return this._muted || this._adSuspended;
          }
        }, {
          key: "muted",
          get: function get() {
            return this._muted;
          }
        }, {
          key: "bgmMuted",
          get: function get() {
            return this._bgmMuted;
          }
        }], [{
          key: "instance",
          get: function get() {
            return AudioManager._instance;
          }
        }]);
        return AudioManager;
      }(Component), _class3._instance = null, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "clips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "comboClips", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "scoreCounterClip", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AvatarLoader.ts", ['cc'], function (exports) {
  var cclegacy, assets, SpriteFrame;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      assets = module.assets;
      SpriteFrame = module.SpriteFrame;
    }],
    execute: function () {
      cclegacy._RF.push({}, "fd8375G1XtPabqZjcHnli8A", "AvatarLoader", undefined);
      var cache = new Map();
      var AvatarLoader = exports('default', /*#__PURE__*/function () {
        function AvatarLoader() {}
        AvatarLoader.load = function load(url) {
          var pending = cache.get(url);
          if (!pending) {
            pending = new Promise(function (resolve) {
              assets.loadRemote(url, {
                ext: '.png'
              }, function (err, image) {
                try {
                  resolve(err || !image ? null : SpriteFrame.createWithImage(image));
                } catch (_unused) {
                  resolve(null);
                }
              });
            });
            cache.set(url, pending);
          }
          return pending;
        };
        return AvatarLoader;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BandDrainSolver.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './RegionTiler.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, generateClearRecipe, bandCandidates, tileWithRetries, BAND_MIN_BLOCKS, RECIPE_TILE_BUDGET;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      generateClearRecipe = module.generateClearRecipe;
      bandCandidates = module.bandCandidates;
      tileWithRetries = module.tileWithRetries;
      BAND_MIN_BLOCKS = module.BAND_MIN_BLOCKS;
      RECIPE_TILE_BUDGET = module.RECIPE_TILE_BUDGET;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a3a90unGIBI1odkYl/piCgp", "BandDrainSolver", undefined);

      /**
       * Board-clear seek: the hand that empties the board outright, or nothing.
       *
       *   1. Empty board → a fresh 3-6 block tiling recipe.
       *   2. Occupied cells confined to ≤5 rows OR ≤5 cols → exact-cover the leftover of that
       *      band around the existing cells with 1-6 blocks. Completing the band's lines empties
       *      the board.
       *   3. Otherwise (cells over >5 rows AND >5 cols) → null. The caller falls back to the
       *      normal complexity-minimizing planner forced to the easiest tier, which simplifies
       *      the board over the following spawns; the window keeps re-checking this pipeline, so
       *      the board drains once it becomes band-eligible.
       *
       * Branch 2 is not gated on total board cell count — the band's own leftover and the DFS's
       * budget already bound the cost regardless of how full the rest of the board is. A cheap,
       * single-block win tucked in one corner is worth taking even when the board is packed.
       *
       * Every branch is an exact cover, so a returned set is always a perfect-fit hand. Pure:
       * holds no state and never touches the planner's queue or pacing.
       */
      var BandDrainSolver = exports('BandDrainSolver', /*#__PURE__*/function () {
        function BandDrainSolver() {}
        var _proto = BandDrainSolver.prototype;
        _proto.solve = function solve(boardMask) {
          if (boardMask === 0n) {
            var recipe = generateClearRecipe();
            return recipe ? recipe.map(function (p) {
              return p.def;
            }) : null;
          }

          // One budget for the whole seek, not one per band per retry: an undrainable band
          // would otherwise spend the full allowance four times over before the other
          // orientation — usually the cheaper one — got its turn.
          var budget = {
            nodes: RECIPE_TILE_BUDGET
          };
          for (var _iterator = _createForOfIteratorHelperLoose(bandCandidates(boardMask)), _step; !(_step = _iterator()).done;) {
            var band = _step.value;
            var pieces = tileWithRetries(band, boardMask, BAND_MIN_BLOCKS, budget);
            if (pieces) return pieces.map(function (p) {
              return p.def;
            });
          }
          return null;
        };
        return BandDrainSolver;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BaseScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './GameEvents.ts'], function (exports) {
  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Component, AudioManager, SFX, GameEvents;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      AudioManager = module.AudioManager;
      SFX = module.SFX;
    }, function (module) {
      GameEvents = module.GameEvents;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "b9841eMAkFIoKDChl4EUG2W", "BaseScreen", undefined);
      var ccclass = _decorator.ccclass;
      var BaseScreen = exports('BaseScreen', (_dec = ccclass('BaseScreen'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BaseScreen, _Component);
        function BaseScreen() {
          return _Component.apply(this, arguments) || this;
        }
        var _proto = BaseScreen.prototype;
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_data) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this.node.active = true;
                case 1:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }()
        /**
         * The single point every close funnels through, so ScreenManager can resync the
         * gameplay-suspended flag here rather than trusting each screen to close through it.
         * An event, not a direct call: ScreenManager imports GameScreen, which extends this class,
         * so importing ScreenManager back would leave BaseScreen undefined while that decorator runs.
         */;

        _proto.closeScreenAsync = /*#__PURE__*/
        function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(_data) {
            var _this$node$scene;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.node.active = false;
                  (_this$node$scene = this.node.scene) == null || _this$node$scene.emit(GameEvents.ON_SCREEN_CLOSED);
                case 2:
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
        _proto.playClickSfx = function playClickSfx() {
          var _AudioManager$instanc;
          (_AudioManager$instanc = AudioManager.instance) == null || _AudioManager$instanc.play(SFX.CLICKBUTTON);
        };
        _createClass(BaseScreen, [{
          key: "isFullscreen",
          get:
          /**
           * Fullscreen screens are mutually exclusive: opening one deactivates the others, so an
           * occluded screen stops costing draw calls (Cocos does no occlusion culling on UI).
           * Overlays — popups, results, anything meant to show the board behind it — stay false.
           */
          function get() {
            return false;
          }
        }]);
        return BaseScreen;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BestScoreUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DataManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Color, Sprite, Label, Node, UITransform, Tween, tween, Vec3, Component, DataManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Sprite = module.Sprite;
      Label = module.Label;
      Node = module.Node;
      UITransform = module.UITransform;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      DataManager = module.DataManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
      cclegacy._RF.push({}, "dbf55GR5f5Dd5qc6R4WoUTo", "BestScoreUI", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MAX_GREY = new Color(150, 150, 150, 255);
      var MAX_GOLD = new Color(255, 200, 50, 255);
      var SCORE_COUNT_TIME = 1;
      var CROWN_SCORE_GAP = 20;
      var BestScoreUI = exports('BestScoreUI', (_dec = ccclass('BestScoreUI'), _dec2 = property(Sprite), _dec3 = property(Label), _dec4 = property(Node), _dec5 = property(UITransform), _dec6 = property(UITransform), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BestScoreUI, _Component);
        function BestScoreUI() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "crownSprite", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "maxScoreLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "maxScoreNode", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "crownTransform", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "maxScoreTransform", _descriptor5, _assertThisInitialized(_this));
          _this.maxScore = 0;
          _this.reachedMax = false;
          _this.displayedScore = 0;
          _this.renderedText = '';
          _this.scoreProxy = {
            v: 0
          };
          return _this;
        }
        var _proto = BestScoreUI.prototype;
        _proto.onLoad = function onLoad() {
          this.maxScore = DataManager.getPlayerData('bestScore');
          this.refresh(0);
        };
        _proto.updateScore = function updateScore(total) {
          var _this2 = this;
          Tween.stopAllByTarget(this.scoreProxy);
          if (total === this.displayedScore) {
            this.apply(total);
            return;
          }
          this.scoreProxy.v = this.displayedScore;
          tween(this.scoreProxy).to(SCORE_COUNT_TIME, {
            v: total
          }, {
            easing: 'sineOut',
            onUpdate: function onUpdate() {
              return _this2.apply(Math.round(_this2.scoreProxy.v));
            }
          }).call(function () {
            return _this2.apply(total);
          }).start();
        };
        _proto.apply = function apply(value) {
          this.displayedScore = value;
          this.refresh(value);
        };
        _proto.refresh = function refresh(total) {
          if (!this.maxScoreLabel) return;
          var reached = total > 0 && total >= this.maxScore;
          var text = (reached ? total : this.maxScore).toString();
          var changed = text !== this.renderedText;
          if (changed) {
            this.renderedText = text;
            this.maxScoreLabel.string = text;
          }
          this.maxScoreLabel.color = reached ? MAX_GOLD : MAX_GREY;
          // The crown is placed off the label's measured width, and updateCrownPosition forces a
          // synchronous re-layout to get it. The count-up calls refresh every frame, so without this
          // guard the best-score label is re-laid-out 60x a second to produce the same width.
          if (changed) this.updateCrownPosition();
          if (reached && !this.reachedMax) this.animPop();
          this.reachedMax = reached;
        };
        _proto.updateCrownPosition = function updateCrownPosition() {
          if (!this.crownSprite || !this.crownTransform || !this.maxScoreLabel || !this.maxScoreTransform) return;
          this.maxScoreLabel.updateRenderData(true);
          var labelNode = this.maxScoreLabel.node;
          var crownNode = this.crownSprite.node;
          var labelLeft = labelNode.position.x - this.maxScoreTransform.contentSize.width * Math.abs(labelNode.scale.x) * this.maxScoreTransform.anchorPoint.x;
          var crownRightOffset = this.crownTransform.contentSize.width * Math.abs(crownNode.scale.x) * (1 - this.crownTransform.anchorPoint.x);
          crownNode.setPosition(labelLeft - CROWN_SCORE_GAP - crownRightOffset, crownNode.position.y);
        };
        _proto.animPop = function animPop() {
          var _this$maxScoreNode, _this$maxScoreLabel;
          var node = (_this$maxScoreNode = this.maxScoreNode) != null ? _this$maxScoreNode : (_this$maxScoreLabel = this.maxScoreLabel) == null ? void 0 : _this$maxScoreLabel.node;
          if (!node) return;
          Tween.stopAllByTarget(node);
          node.setScale(1, 1, 1);
          tween(node).to(0.12, {
            scale: new Vec3(1.25, 1.25, 1)
          }, {
            easing: 'backOut'
          }).to(0.1, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'sineIn'
          }).start();
        };
        _proto.setVisible = function setVisible(visible) {
          var _ref, _this$maxScoreNode2, _this$maxScoreLabel2;
          var container = (_ref = (_this$maxScoreNode2 = this.maxScoreNode) != null ? _this$maxScoreNode2 : (_this$maxScoreLabel2 = this.maxScoreLabel) == null ? void 0 : _this$maxScoreLabel2.node.parent) != null ? _ref : null;
          if (container) {
            container.active = visible;
            return;
          }
          if (this.maxScoreLabel) this.maxScoreLabel.node.active = visible;
          if (this.crownSprite) this.crownSprite.node.active = visible;
        };
        _proto.reset = function reset() {
          Tween.stopAllByTarget(this.scoreProxy);
          this.displayedScore = 0;
          this.reachedMax = false;
          this.maxScore = DataManager.getPlayerData('bestScore');
          this.refresh(0);
        };
        return BestScoreUI;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "crownSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "maxScoreLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxScoreNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "crownTransform", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maxScoreTransform", [_dec6], {
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

System.register("chunks:///_virtual/BitUtils.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, GRID_SIZE, MIN_SPAWN_CELLS;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
      MIN_SPAWN_CELLS = module.MIN_SPAWN_CELLS;
    }],
    execute: function () {
      exports({
        canPlaceSetWithArmor: canPlaceSetWithArmor,
        clearFullLines: clearFullLines,
        clearFullLinesWithArmor: clearFullLinesWithArmor,
        expandBits: expandBits,
        fragmentationScore: fragmentationScore,
        labelEmptyRegions: labelEmptyRegions,
        popCount: popCount,
        popCount32: popCount32,
        snugness: snugness
      });
      cclegacy._RF.push({}, "d45a5ixNspPYqkQwPLVY6HV", "BitUtils", undefined);
      var BOARD_CELLS = GRID_SIZE * GRID_SIZE;
      var GRID_BIG = BigInt(GRID_SIZE);
      var MASK_32 = exports('MASK_32', 0xffffffffn);
      var SHIFT_32 = exports('SHIFT_32', 32n);
      function popCount32(n) {
        n = n - (n >>> 1 & 0x55555555);
        n = (n & 0x33333333) + (n >>> 2 & 0x33333333);
        return (n + (n >>> 4) & 0x0f0f0f0f) * 0x01010101 >>> 24;
      }
      function popCount(bits) {
        var lo = Number(bits & MASK_32);
        var hi = Number(bits >> SHIFT_32 & MASK_32);
        return popCount32(lo) + popCount32(hi);
      }
      var FULL_BOARD = exports('FULL_BOARD', (1n << BigInt(BOARD_CELLS)) - 1n);
      var ROW_MASK = exports('ROW_MASK', (1n << GRID_BIG) - 1n);
      var ROW_SHIFTS = exports('ROW_SHIFTS', Array.from({
        length: GRID_SIZE
      }, function (_, i) {
        return BigInt(i * GRID_SIZE);
      }));
      var COL_MASKS = exports('COL_MASKS', Array.from({
        length: GRID_SIZE
      }, function (_, c) {
        var m = 0n;
        for (var r = 0; r < GRID_SIZE; r++) m |= 1n << BigInt(r * GRID_SIZE + c);
        return m;
      }));
      var ROW_MASKS = exports('ROW_MASKS', Array.from({
        length: GRID_SIZE
      }, function (_, r) {
        return ROW_MASK << ROW_SHIFTS[r];
      }));
      var CELL_SHIFTS = exports('CELL_SHIFTS', Array.from({
        length: BOARD_CELLS
      }, function (_, i) {
        return BigInt(i);
      }));
      var CELL_ROW = Array.from({
        length: BOARD_CELLS
      }, function (_, i) {
        return Math.floor(i / GRID_SIZE);
      });
      var CELL_COL = Array.from({
        length: BOARD_CELLS
      }, function (_, i) {
        return i % GRID_SIZE;
      });
      function labelEmptyRegions(mask) {
        var lo = Number(mask & MASK_32);
        var hi = Number(mask >> SHIFT_32 & MASK_32);
        var regionAt = new Int16Array(BOARD_CELLS).fill(-1);
        var sizes = [];
        var minR = [];
        var maxR = [];
        var minC = [];
        var maxC = [];
        var stack = [];
        for (var start = 0; start < BOARD_CELLS; start++) {
          if (regionAt[start] !== -1) continue;
          if (start < 32 ? lo >>> start & 1 : hi >>> start - 32 & 1) continue;
          var id = sizes.length;
          sizes.push(0);
          minR.push(Number.POSITIVE_INFINITY);
          maxR.push(Number.NEGATIVE_INFINITY);
          minC.push(Number.POSITIVE_INFINITY);
          maxC.push(Number.NEGATIVE_INFINITY);
          regionAt[start] = id;
          stack.push(start);
          while (stack.length > 0) {
            var cell = stack.pop();
            sizes[id]++;
            var r = CELL_ROW[cell];
            var c = CELL_COL[cell];
            if (r < minR[id]) minR[id] = r;
            if (r > maxR[id]) maxR[id] = r;
            if (c < minC[id]) minC[id] = c;
            if (c > maxC[id]) maxC[id] = c;
            var neighbors = [r > 0 ? cell - GRID_SIZE : -1, r < GRID_SIZE - 1 ? cell + GRID_SIZE : -1, c > 0 ? cell - 1 : -1, c < GRID_SIZE - 1 ? cell + 1 : -1];
            for (var _i = 0, _neighbors = neighbors; _i < _neighbors.length; _i++) {
              var n = _neighbors[_i];
              if (n < 0 || regionAt[n] !== -1) continue;
              if (n < 32 ? lo >>> n & 1 : hi >>> n - 32 & 1) continue;
              regionAt[n] = id;
              stack.push(n);
            }
          }
        }
        return {
          regionAt: regionAt,
          sizes: sizes,
          minR: minR,
          maxR: maxR,
          minC: minC,
          maxC: maxC
        };
      }
      function fragmentationScore(mask) {
        var _labelEmptyRegions = labelEmptyRegions(mask),
          sizes = _labelEmptyRegions.sizes;
        var totalEmpty = 0;
        var deadCells = 0;
        for (var _iterator = _createForOfIteratorHelperLoose(sizes), _step; !(_step = _iterator()).done;) {
          var size = _step.value;
          totalEmpty += size;
          if (size < MIN_SPAWN_CELLS) deadCells += size;
        }
        return totalEmpty > 0 ? deadCells / totalEmpty : 0;
      }
      function expandBits(bits) {
        var right = bits << 1n & ~COL_MASKS[0];
        var left = bits >> 1n & ~COL_MASKS[GRID_SIZE - 1];
        var down = bits << GRID_BIG & FULL_BOARD;
        var up = bits >> GRID_BIG;
        return right | left | down | up;
      }
      function snugness(placedBits, boardMask) {
        var halo = expandBits(placedBits) & ~placedBits;
        var filled = boardMask | placedBits;
        return popCount(halo & boardMask) - popCount(halo & ~filled & FULL_BOARD);
      }
      function clearFullLines(mask) {
        var clearMask = 0n;
        var lineCount = 0;
        for (var i = 0; i < GRID_SIZE; i++) {
          var rowMask = ROW_MASKS[i];
          if ((mask & rowMask) === rowMask) {
            clearMask |= rowMask;
            lineCount++;
          }
          var colMask = COL_MASKS[i];
          if ((mask & colMask) === colMask) {
            clearMask |= colMask;
            lineCount++;
          }
        }
        return {
          afterMask: mask & ~clearMask,
          lineCount: lineCount
        };
      }
      function canPlaceSetWithArmor(defs, mask, armorMask) {
        if (defs.length === 0) return true;
        for (var i = 0; i < defs.length; i++) {
          var def = defs[i];
          var rest = [].concat(defs.slice(0, i), defs.slice(i + 1));
          var maxR = GRID_SIZE - def.maxR;
          var maxC = GRID_SIZE - def.maxC;
          for (var r = 0; r < maxR; r++) {
            for (var c = 0; c < maxC; c++) {
              var shift = CELL_SHIFTS[r * GRID_SIZE + c];
              if ((mask & def.mask << shift) !== 0n) continue;
              var _clearFullLinesWithAr = clearFullLinesWithArmor(mask | def.mask << shift, armorMask),
                afterMask = _clearFullLinesWithAr.afterMask,
                newArmorMask = _clearFullLinesWithAr.newArmorMask;
              if (canPlaceSetWithArmor(rest, afterMask, newArmorMask)) return true;
            }
          }
        }
        return false;
      }
      function clearFullLinesWithArmor(mask, armorMask) {
        var clearedMask = 0n;
        var lineCount = 0;
        for (var i = 0; i < GRID_SIZE; i++) {
          var rowMask = ROW_MASKS[i];
          if ((mask & rowMask) === rowMask) {
            clearedMask |= rowMask;
            lineCount++;
          }
          var colMask = COL_MASKS[i];
          if ((mask & colMask) === colMask) {
            clearedMask |= colMask;
            lineCount++;
          }
        }
        var downgradedMask = clearedMask & armorMask;
        var removeMask = clearedMask & ~armorMask;
        return {
          afterMask: mask & ~removeMask,
          clearedMask: clearedMask,
          removeMask: removeMask,
          downgradedMask: downgradedMask,
          newArmorMask: armorMask & ~clearedMask,
          lineCount: lineCount
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Block.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './constants.ts', './GameEvents.ts', './SpriteLoader.ts', './TweenUtils.ts', './Cell.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Vec3, sys, Node, Vec2, UITransform, Tween, Component, tween, AudioManager, SFX, CELL_SIZE, GameEvents, SpriteLoader, runTweenAsync, Cell;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      sys = module.sys;
      Node = module.Node;
      Vec2 = module.Vec2;
      UITransform = module.UITransform;
      Tween = module.Tween;
      Component = module.Component;
      tween = module.tween;
    }, function (module) {
      AudioManager = module.AudioManager;
      SFX = module.SFX;
    }, function (module) {
      CELL_SIZE = module.CELL_SIZE;
    }, function (module) {
      GameEvents = module.GameEvents;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }, function (module) {
      runTweenAsync = module.runTweenAsync;
    }, function (module) {
      Cell = module.Cell;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _class3;
      cclegacy._RF.push({}, "05795JzC5dLF4eY9s3rHaop", "Block", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var TAP_DISTANCE_SQ = 10.5 * 10.5;

      // Touch samples arrive faster than the frame rate on mobile (often 120Hz against a 60Hz tick), and
      // every one runs in the browser's event handler, outside the engine tick. These scratch vectors and
      // the once-per-frame drag flush below keep that handler allocation-free and cap the preview
      // pipeline at one run per rendered frame.
      var TOUCH_SCRATCH = new Vec3();
      var LOCAL_SCRATCH = new Vec3();
      var ANCHOR_SCRATCH = new Vec3();
      var ANCHOR_WORLD_SCRATCH = new Vec3();
      var BlockState = exports('BlockState', /*#__PURE__*/function (BlockState) {
        BlockState[BlockState["IN_SLOT"] = 0] = "IN_SLOT";
        BlockState[BlockState["DRAGGING"] = 1] = "DRAGGING";
        BlockState[BlockState["STUCK"] = 2] = "STUCK";
        BlockState[BlockState["IN_GRID"] = 3] = "IN_GRID";
        return BlockState;
      }({}));
      var DRAG_EVENTS = exports('DRAG_EVENTS', ['DRAG_MOVE', 'DRAG_END', 'DRAG_CANCEL']);
      /**
       * `getID` is nullable; the sentinel keeps a platform that returns null from failing every
       * ownership test, leaving the single-drag guarantee to the owner check alone.
       */
      var touchIdOf = function touchIdOf(event) {
        var _event$getID;
        return (_event$getID = event.getID()) != null ? _event$getID : -1;
      };
      var VISUAL_OFFSET = exports('VISUAL_OFFSET', new Vec3(45, 450, 0));
      var DRAG_SPEED = sys.isMobile ? 1.35 : 1.1;
      var Block = exports('Block', (_dec = ccclass('Block'), _dec2 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Block, _Component);
        function Block() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "hitBox", _descriptor, _assertThisInitialized(_this));
          _this._colorIndex = 0;
          _this._marks = new Map();
          _this._state = BlockState.IN_SLOT;
          _this._cells = [];
          _this._blockData = null;
          _this._tapStartPoint = new Vec2();
          _this._slotOffsetPos = new Vec3();
          _this.tapPending = false;
          _this.dragOrigin = new Vec3();
          _this._locked = false;
          _this._suspended = false;
          _this.pendingDrag = false;
          _this.pendingTouch = new Vec2();
          /** Identifier of the finger that owns this drag; other fingers on the same block are ignored. */
          _this.touchId = -1;
          return _this;
        }
        var _proto = Block.prototype;
        _proto.getCells = function getCells() {
          return this._cells;
        }

        /** Re-reads the cell art without touching state — for a skin swap under a live tray. */;
        _proto.repaint = function repaint() {
          this.paintCells(this._state === BlockState.STUCK);
        };
        _proto.clearCells = function clearCells() {
          for (var _iterator = _createForOfIteratorHelperLoose(this._cells), _step; !(_step = _iterator()).done;) {
            var _cell$getComponent;
            var cell = _step.value;
            (_cell$getComponent = cell.getComponent(Cell)) == null || _cell$getComponent.reset();
            cell.removeFromParent();
          }
          this._cells = [];
        };
        _proto.__preload = function __preload() {
          this.hitBox.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.hitBox.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.hitBox.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.hitBox.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        }

        // A deactivated node gets no TOUCH_END, so without this a teardown mid-drag would leave the
        // claim standing and nothing could ever be picked up again.
        ;

        _proto.onDisable = function onDisable() {
          this.releaseDrag();
        };
        _proto.onDestroy = function onDestroy() {
          this.releaseDrag();
          this.hitBox.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.hitBox.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.hitBox.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.hitBox.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        };
        _proto.init = function init(data, cells) {
          this._blockData = data;
          this._cells = cells;
          this._colorIndex = Math.floor(Math.random() * SpriteLoader.instance.cellCount);
          for (var i = 0; i < data.shape.length; i++) {
            var cell = cells[i];
            if (!cell) continue;
            cell.setParent(this.node);
            cell.setPosition((data.shape[i].x - data.maxC / 2) * CELL_SIZE, (data.shape[i].y - data.maxR / 2) * CELL_SIZE, 0);
          }
          this.blockState = BlockState.IN_SLOT;
          this._slotOffsetPos.set(Vec3.ZERO);
          this.node.setPosition(this._slotOffsetPos);
          this.setUpHitBox(data);
        };
        _proto.setUpHitBox = function setUpHitBox(data) {
          var ui = this.hitBox.getComponent(UITransform);
          ui.setContentSize((data.maxC + 3) * CELL_SIZE, (data.maxR + 3) * CELL_SIZE);
          this.hitBox.setPosition(Vec3.ZERO);
          this.hitBox.setSiblingIndex(9999);
        };
        _proto.onTouchStart = function onTouchStart(event) {
          var _window$__TOUCH_DEBUG, _this$node$parent, _AudioManager$instanc;
          var refused = Block.dragOwner ? "dragOwner held by " + Block.dragOwner.node.name : this._locked ? 'locked' : this._suspended ? 'suspended' : !this._blockData ? 'no data' : this._state === BlockState.STUCK ? 'STUCK' : this._state === BlockState.IN_GRID ? 'IN_GRID' : null;
          (_window$__TOUCH_DEBUG = window.__TOUCH_DEBUG__) == null || _window$__TOUCH_DEBUG.log("cc Block START id=" + touchIdOf(event) + " " + (refused ? "REFUSED " + refused : 'lift'));
          if (refused) return;
          var parentUi = (_this$node$parent = this.node.parent) == null ? void 0 : _this$node$parent.getComponent(UITransform);
          if (!parentUi) return;

          // Claimed only once the drag is certain to start — a bail-out after this point would
          // leave the claim standing and no finger able to pick anything up again.
          Block.dragOwner = this;
          this.touchId = touchIdOf(event);
          (_AudioManager$instanc = AudioManager.instance) == null || _AudioManager$instanc.play(SFX.PICK_BLOCK);
          var touch = event.getUILocation();
          this.tapPending = true;
          this._tapStartPoint.set(touch);
          var localPos = parentUi.convertToNodeSpaceAR(TOUCH_SCRATCH.set(touch.x, touch.y, 0), LOCAL_SCRATCH);
          this.dragOrigin.set(localPos);
          this.blockState = BlockState.DRAGGING;
          this.node.setPosition(VISUAL_OFFSET);
          this.pendingDrag = false;
          var anchor = this.getAnchorWorldPos();
          this.node.scene.emit(GameEvents.ON_DRAG_BLOCK, this, anchor);
        }

        /**
         * Only records the sample — the follow and the preview run once per frame in `lateUpdate`.
         * Touch sampling outruns the frame rate on mobile, and everything this defers happens in the
         * browser's event handler outside the engine tick, where only the last sample of a frame matters.
         */;
        _proto.onTouchMove = function onTouchMove(event) {
          if (!this.ownsTouch(event)) return;
          if (!this._blockData) return;
          if (this._state !== BlockState.DRAGGING) return;
          var touch = event.getUILocation();
          if (this.tapPending) {
            var dx = touch.x - this._tapStartPoint.x;
            var dy = touch.y - this._tapStartPoint.y;
            if (dx * dx + dy * dy >= TAP_DISTANCE_SQ) this.tapPending = false;
          }
          this.pendingTouch.set(touch);
          this.pendingDrag = true;
        };
        _proto.lateUpdate = function lateUpdate() {
          if (this.pendingDrag) this.flushDrag();
        };
        _proto.flushDrag = function flushDrag() {
          var _this$node$parent2;
          this.pendingDrag = false;
          if (!this._blockData) return;
          if (this._state !== BlockState.DRAGGING) return;
          var parentUi = (_this$node$parent2 = this.node.parent) == null ? void 0 : _this$node$parent2.getComponent(UITransform);
          if (!parentUi) return;
          var localPos = parentUi.convertToNodeSpaceAR(TOUCH_SCRATCH.set(this.pendingTouch.x, this.pendingTouch.y, 0), LOCAL_SCRATCH);
          this.node.setPosition((localPos.x - this.dragOrigin.x) * DRAG_SPEED + VISUAL_OFFSET.x, (localPos.y - this.dragOrigin.y) * DRAG_SPEED + VISUAL_OFFSET.y, 0);
          var anchor = this.getAnchorWorldPos();
          this.node.scene.emit(GameEvents.ON_DRAG_BLOCK, this, anchor);
        };
        _proto.onTouchEnd = function onTouchEnd(event) {
          var _window$__TOUCH_DEBUG2, _this$node$parent3;
          (_window$__TOUCH_DEBUG2 = window.__TOUCH_DEBUG__) == null || _window$__TOUCH_DEBUG2.log("cc Block " + event.type + " id=" + touchIdOf(event) + " owns=" + this.ownsTouch(event) + " tap=" + this.tapPending + " state=" + this._state);
          if (!this.ownsTouch(event)) return;
          // Released up front so none of the early-outs below can strand the claim.
          this.releaseDrag();
          if (!this._blockData) return;
          if (this._state === BlockState.STUCK) return;
          if (this._state === BlockState.IN_GRID) return;
          var parentUi = (_this$node$parent3 = this.node.parent) == null ? void 0 : _this$node$parent3.getComponent(UITransform);
          if (!parentUi) return;

          // The drop cell is derived from the node's position, so an unflushed sample would place the
          // block a frame behind the finger.
          if (this.pendingDrag) this.flushDrag();
          var anchor = this.getAnchorWorldPos();
          if (this._state !== BlockState.DRAGGING) return;
          if (this.tapPending) {
            this.tapPending = false;
            this.resetToSlot();
            this.node.scene.emit(GameEvents.ON_DRAG_BLOCK_CANCEL, anchor);
          } else {
            this.node.scene.emit(GameEvents.ON_DRAG_BLOCK_END, this, anchor);
          }
        };
        _proto.ownsTouch = function ownsTouch(event) {
          return Block.dragOwner === this && touchIdOf(event) === this.touchId;
        };
        _proto.releaseDrag = function releaseDrag() {
          if (Block.dragOwner === this) Block.dragOwner = null;
          this.touchId = -1;
        };
        _proto.reset = function reset() {
          this.releaseDrag();
          this._state = BlockState.IN_SLOT;
          this._blockData = null;
          this._colorIndex = 0;
          this._cells = [];
          this._marks = new Map();
          this._slotOffsetPos.set(0, 0, 0);
          this.tapPending = false;
          this.dragOrigin.set(0, 0, 0);
          this._locked = false;
          this._suspended = false;
          this.pendingDrag = false;
        };
        _proto.resetToSlot = function resetToSlot() {
          this.pendingDrag = false;
          this.blockState = BlockState.IN_SLOT;
          this.animMoveToSlot();
        };
        _proto.lock = function lock() {
          this.cancelDrag();
          this._locked = true;
        };
        _proto.unlock = function unlock() {
          this._locked = false;
        }

        /**
         * A screen opened over the run. Kept apart from `lock` because the two have different owners:
         * a mode's lock must survive a popup opening and closing over it.
         */;
        _proto.setSuspended = function setSuspended(suspended) {
          this._suspended = suspended;
          if (suspended) this.cancelDrag();
        };
        _proto.cancelDrag = function cancelDrag() {
          this.releaseDrag();
          this.tapPending = false;
          this.pendingDrag = false;
          if (this._state === BlockState.DRAGGING) this.resetToSlot();
        };
        _proto.paintCells = function paintCells(stuck) {
          var loader = SpriteLoader.instance;
          var sf = loader.getPlayCellSprite(this._colorIndex);
          if (!sf) return;
          for (var i = 0; i < this._cells.length; i++) {
            var cellComp = this._cells[i].getComponent(Cell);
            if (!cellComp) continue;
            var type = this._marks.get(i);
            var gemCell = type !== undefined ? this.gemFrame(type, stuck) : null;
            var cellFrame = stuck && !gemCell ? loader.getStuckCellFrame() : gemCell != null ? gemCell : sf;
            cellComp.setSpriteFrame(cellFrame != null ? cellFrame : sf);
          }
        }

        /**
         * A stuck block puts its gem cells in stone too — a gold-framed gem on a greyed block reads as
         * still playable, and it is exactly the cell the player reaches for. Falls back to the lit gem
         * so a block is never blank if the stone art is missing.
         */;
        _proto.gemFrame = function gemFrame(type, stuck) {
          var _loader$getStuckGemCe;
          var loader = SpriteLoader.instance;
          var lit = loader.getGemCellFrame(type);
          if (!stuck) return lit;
          return (_loader$getStuckGemCe = loader.getStuckGemCellFrame(type)) != null ? _loader$getStuckGemCe : lit;
        };
        _proto.getAnchorWorldPos = function getAnchorWorldPos() {
          var _this$node$parent4;
          var data = this._blockData;
          if (!data) return null;
          var parentUi = (_this$node$parent4 = this.node.parent) == null ? void 0 : _this$node$parent4.getComponent(UITransform);
          if (!parentUi) return null;
          var shape0 = data.shape[0];
          var anchorLocal = ANCHOR_SCRATCH.set(this.node.position.x - VISUAL_OFFSET.x + (shape0.x - data.maxC / 2) * CELL_SIZE, this.node.position.y - VISUAL_OFFSET.y + (shape0.y - data.maxR / 2) * CELL_SIZE, 0);
          // Shared scratch: every listener consumes it synchronously inside the emit below.
          return parentUi.convertToWorldSpaceAR(anchorLocal, ANCHOR_WORLD_SCRATCH);
        };
        _proto.animPutBlockToGrid = /*#__PURE__*/function () {
          var _animPutBlockToGrid = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(targetWorldPos) {
            var _this$node$parent5;
            var data, shape0, parentUi, targetLocal, animMove;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  data = this._blockData;
                  shape0 = data == null ? void 0 : data.shape[0];
                  parentUi = (_this$node$parent5 = this.node.parent) == null ? void 0 : _this$node$parent5.getComponent(UITransform);
                  if (!(!data || !shape0 || !parentUi)) {
                    _context.next = 5;
                    break;
                  }
                  return _context.abrupt("return");
                case 5:
                  targetLocal = parentUi.convertToNodeSpaceAR(new Vec3(targetWorldPos.x - (shape0.x - data.maxC / 2) * CELL_SIZE, targetWorldPos.y - (shape0.y - data.maxR / 2) * CELL_SIZE, 0));
                  animMove = tween(this.node).to(0.07, {
                    position: targetLocal
                  }, {
                    easing: 'quadOut'
                  }).start();
                  _context.next = 9;
                  return runTweenAsync(animMove);
                case 9:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function animPutBlockToGrid(_x) {
            return _animPutBlockToGrid.apply(this, arguments);
          }
          return animPutBlockToGrid;
        }();
        _proto.animMoveToSlot = /*#__PURE__*/function () {
          var _animMoveToSlot = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var targetPos, animMove;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  targetPos = new Vec3(this._slotOffsetPos.x, this._slotOffsetPos.y, this._slotOffsetPos.z);
                  animMove = tween(this.node).to(0.1, {
                    position: targetPos
                  }, {
                    easing: 'cubicOut'
                  }).start();
                  _context2.next = 4;
                  return runTweenAsync(animMove);
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function animMoveToSlot() {
            return _animMoveToSlot.apply(this, arguments);
          }
          return animMoveToSlot;
        }();
        _createClass(Block, [{
          key: "data",
          get: function get() {
            return this._blockData;
          }
        }, {
          key: "colorIndex",
          get: function get() {
            return this._colorIndex;
          }
        }, {
          key: "blockState",
          get: function get() {
            return this._state;
          },
          set: function set(state) {
            this._state = state;
            switch (state) {
              case BlockState.IN_SLOT:
                this.node.setScale(0.5, 0.5, 1);
                this.paintCells(false);
                break;
              case BlockState.STUCK:
                this.node.setScale(0.5, 0.5, 1);
                this.paintCells(true);
                break;
              case BlockState.DRAGGING:
                Tween.stopAllByTarget(this.node);
                this.node.setScale(1, 1, 1);
                this.node.setSiblingIndex(999);
                this.paintCells(false);
                break;
              case BlockState.IN_GRID:
                break;
            }
          }
        }, {
          key: "marks",
          get: function get() {
            return this._marks;
          },
          set: function set(marks) {
            this._marks = marks;
            this.paintCells(this._state === BlockState.STUCK);
          }
        }]);
        return Block;
      }(Component), _class3.dragOwner = null, _class3), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "hitBox", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BlockCraftPool.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Block.ts', './Cell.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Prefab, instantiate, Vec3, Component, Block, Cell;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      Block = module.Block;
    }, function (module) {
      Cell = module.Cell;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "fd417JVnu1Kn6/i4yeVTTei", "BlockCraftPool", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var BlockCraftPool = exports('BlockCraftPool', (_dec = ccclass('BlockCraftPool'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BlockCraftPool, _Component);
        function BlockCraftPool() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "cell", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "block", _descriptor2, _assertThisInitialized(_this));
          _this.cells = [];
          _this.blocks = [];
          return _this;
        }
        var _proto = BlockCraftPool.prototype;
        _proto.onLoad = function onLoad() {
          while (this.blocks.length < 3) this.blocks.push(this.createBlock());
          while (this.cells.length < 27) this.cells.push(this.createCell());
        };
        _proto.createCell = function createCell() {
          var cell = instantiate(this.cell);
          cell.active = false;
          cell.layer = this.node.layer;
          return cell;
        };
        _proto.createBlock = function createBlock() {
          var block = instantiate(this.block);
          block.active = false;
          block.layer = this.node.layer;
          return block;
        };
        _proto.getCell = function getCell() {
          var found = this.cells.find(function (c) {
            return !c.active;
          });
          if (found) {
            found.active = true;
            return found;
          }
          var cell = this.createCell();
          cell.active = true;
          this.cells.push(cell);
          return cell;
        };
        _proto.releaseCell = function releaseCell(cell) {
          var _cell$getComponent;
          (_cell$getComponent = cell.getComponent(Cell)) == null || _cell$getComponent.reset();
          cell.setPosition(Vec3.ZERO);
          cell.setScale(Vec3.ONE);
          cell.removeFromParent();
          cell.active = false;
        };
        _proto.getBlock = function getBlock() {
          var found = this.blocks.find(function (b) {
            return !b.active;
          });
          if (found) {
            found.active = true;
            return found;
          }
          var block = this.createBlock();
          block.active = true;
          this.blocks.push(block);
          return block;
        };
        _proto.releaseBlock = function releaseBlock(node) {
          var _node$getComponent;
          (_node$getComponent = node.getComponent(Block)) == null || _node$getComponent.reset();
          node.setPosition(Vec3.ZERO);
          node.setScale(Vec3.ONE);
          node.removeFromParent();
          node.active = false;
        };
        return BlockCraftPool;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cell", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "block", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BlockLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AdventureLevels.ts', './constants.ts', './Difficulty.ts', './BitUtils.ts', './ModeUtils.ts', './PerformanceProfiler.ts', './SkinService.ts', './Block.ts', './SpawnPlanner.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, cclegacy, Vec3, tween, collectGemDensityFor, SPAWN_LIBRARY, BLOCK_LIBRARY, GRID_SIZE, getDirectorPacing, DIFFICULTY_TABLE, fragmentationScore, popCount, ModeUtils, GAME_MODE, PerformanceProfiler, SkinService, BlockState, Block, SpawnPlanner;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      tween = module.tween;
    }, function (module) {
      collectGemDensityFor = module.collectGemDensityFor;
    }, function (module) {
      SPAWN_LIBRARY = module.SPAWN_LIBRARY;
      BLOCK_LIBRARY = module.BLOCK_LIBRARY;
      GRID_SIZE = module.GRID_SIZE;
    }, function (module) {
      getDirectorPacing = module.getDirectorPacing;
      DIFFICULTY_TABLE = module.DIFFICULTY_TABLE;
    }, function (module) {
      fragmentationScore = module.fragmentationScore;
      popCount = module.popCount;
    }, function (module) {
      ModeUtils = module.default;
      GAME_MODE = module.GAME_MODE;
    }, function (module) {
      PerformanceProfiler = module.PerformanceProfiler;
    }, function (module) {
      SkinService = module.SkinService;
    }, function (module) {
      BlockState = module.BlockState;
      Block = module.Block;
    }, function (module) {
      SpawnPlanner = module.SpawnPlanner;
    }],
    execute: function () {
      cclegacy._RF.push({}, "80a9bbWg0NGfZQMoHsJ/aMc", "BlockLogic", undefined);
      var SPAWN_RETRIES = 10;
      var BOARD_CELLS = GRID_SIZE * GRID_SIZE;
      var EMPTY_BOARD_THRESHOLD = 0.25;

      /** Drops the assist-only small shapes, leaving what normal play is allowed to hand out. */
      function spawnable(pool) {
        return pool.filter(function (d) {
          return !d.reserved;
        });
      }
      var BlockLogic = exports('BlockLogic', /*#__PURE__*/function () {
        function BlockLogic(gm) {
          this.gm = void 0;
          this.activeBlocks = [];
          this.planner = new SpawnPlanner();
          this.suspended = false;
          this.locked = false;
          /** Which unmet gem type the next tray starts dealing from; see injectCollectMarks. */
          this.markRotation = 0;
          this.gm = gm;
        }

        /** Releases all active tray blocks without spawning a replacement set. */
        var _proto = BlockLogic.prototype;
        _proto.clearActive = function clearActive() {
          for (var _i = 0, _arr = [].concat(this.activeBlocks); _i < _arr.length; _i++) {
            var block = _arr[_i];
            this.releaseBlock(block);
          }
          this.activeBlocks = [];
        }

        /** Full teardown for starting a new game: clears tray and planner queue. */;
        _proto.resetForNewGame = function resetForNewGame() {
          this.clearActive();
          this.planner.reset();
          this.markRotation = 0;
        };
        _proto.init = function init() {
          this.handleSpawnNewBlocks();
        };
        _proto.getActiveBlocks = function getActiveBlocks() {
          this.activeBlocks = this.activeBlocks.filter(function (b) {
            var _b$node;
            return b == null || (_b$node = b.node) == null ? void 0 : _b$node.isValid;
          });
          return this.activeBlocks;
        };
        _proto.needsNewSet = function needsNewSet() {
          return this.activeBlocks.length === 0;
        }

        /**
         * Cancels any in-progress drag and refuses new ones — used while a result popup is up.
         * Remembered like `suspended`, so a refill landing inside the lock (the placement that trips
         * a rank-up refills the tray one step after the mode locks it) inherits it too.
         */;
        _proto.lockAll = function lockAll() {
          this.locked = true;
          for (var _iterator = _createForOfIteratorHelperLoose(this.getActiveBlocks()), _step; !(_step = _iterator()).done;) {
            var block = _step.value;
            block.lock();
          }
        };
        _proto.unlockAll = function unlockAll() {
          this.locked = false;
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.getActiveBlocks()), _step2; !(_step2 = _iterator2()).done;) {
            var block = _step2.value;
            block.unlock();
          }
        };
        _proto.repaintAll = function repaintAll() {
          for (var _iterator3 = _createForOfIteratorHelperLoose(this.getActiveBlocks()), _step3; !(_step3 = _iterator3()).done;) {
            var block = _step3.value;
            block.repaint();
          }
        }

        /** Mirrors whether a screen is open over the run; remembered so a refill inherits it. */;
        _proto.setSuspended = function setSuspended(suspended) {
          this.suspended = suspended;
          var blocks = this.getActiveBlocks();
          for (var _iterator4 = _createForOfIteratorHelperLoose(blocks), _step4; !(_step4 = _iterator4()).done;) {
            var block = _step4.value;
            block.setSuspended(suspended);
          }
          // Suspending settles any held block out of DRAGGING, which the fit test skips, so the
          // tray can come back from a screen showing a stale STUCK paint.
          if (!suspended && blocks.length > 0) this.updateStuckBlocks();
        };
        _proto.onBlockPlacedSuccess = function onBlockPlacedSuccess(block) {
          this.releaseBlock(block);
          this.activeBlocks = this.activeBlocks.filter(function (b) {
            return b !== block;
          });
        };
        _proto.handleSpawnNewBlocks = function handleSpawnNewBlocks() {
          var _this = this;
          var startedAt = PerformanceProfiler.now();
          PerformanceProfiler.measure('Spawn/create set', function () {
            return _this.spawnNewSet();
          });
          PerformanceProfiler.measure('Spawn/update stuck blocks', function () {
            return _this.updateStuckBlocks();
          });
          PerformanceProfiler.measure('Spawn/start tray animations', function () {
            return _this.animateBlocks();
          });
          PerformanceProfiler.log('Spawn/total', startedAt);
        }

        /**
         * Re-tests every tray block's fit. Held blocks are skipped so the state setter can't yank a
         * dragged block back to slot scale mid-gesture — so callers that settle a block out of
         * DRAGGING must re-run this once the board is stable, or it keeps a stale non-stuck paint.
         */;
        _proto.updateStuckBlocks = function updateStuckBlocks() {
          var _this$gm$getModeRules, _this$gm$getModeRules2, _this$gm$getModeRules3;
          // A scripted tray hands out blocks for a board that hasn't been seeded yet, so the fit
          // test would grey out perfectly good blocks the player is about to need. A single-palette
          // skin has no stuck art of its own, so it keeps its own cells and stays draggable.
          var marksStuck = ((_this$gm$getModeRules = (_this$gm$getModeRules2 = (_this$gm$getModeRules3 = this.gm.getModeRules()).allowsStuckMarking) == null ? void 0 : _this$gm$getModeRules2.call(_this$gm$getModeRules3)) != null ? _this$gm$getModeRules : true) && !SkinService.isSinglePalette();
          for (var _iterator5 = _createForOfIteratorHelperLoose(this.getActiveBlocks()), _step5; !(_step5 = _iterator5()).done;) {
            var block = _step5.value;
            if (block.blockState === BlockState.DRAGGING) continue;
            var canFit = !marksStuck || !!block.data && this.gm.getGridLogic().canPlaceAnywhere(block.data);
            block.blockState = canFit ? BlockState.IN_SLOT : BlockState.STUCK;
          }
        };
        _proto.animateBlocks = function animateBlocks() {
          for (var i = 0; i < this.activeBlocks.length; i++) {
            var block = this.activeBlocks[i];
            var node = block.node;
            node.setScale(new Vec3(0.01, 0.01, 1));
            tween(node).to(0.025, {
              scale: new Vec3(0.12, 0.12, 1)
            }, {
              easing: 'quadOut'
            }).to(0.075, {
              scale: new Vec3(0.5, 0.5, 1)
            }, {
              easing: 'cubicOut'
            }).start();
          }
        };
        _proto.spawnNewSet = function spawnNewSet() {
          var _this2 = this;
          this.activeBlocks = [];
          var boardMask = this.gm.getGridLogic().getBoardMask();
          var fragScore = fragmentationScore(boardMask);
          var config = this.gm.getScoreLogic().getDifficultyConfig();
          var plannerConfig = this.tunedPlannerConfig(config, fragScore);
          var moment = this.spawnMoment(boardMask);
          this.gm.getDirector().onSetSpawned();
          var slots = this.gm.getGameScreen().getSlots();
          var slotCount = slots.length;
          var picked = null;
          if (this.planner.hasQueue()) {
            picked = this.fillFromQueue(slotCount);
          }

          // Scheduled moments bypass the fill-ratio gate — the seek/burst planners
          // decide feasibility themselves and fall through to the normal path on failure.
          if (!picked && moment === 'boardClear') {
            if (PerformanceProfiler.measure('Planner/board clear search', function () {
              return _this2.planner.tryPlanBoardClear(boardMask);
            })) {
              picked = this.fillFromQueue(slotCount);
            } else if (PerformanceProfiler.measure('Planner/board clear fallback', function () {
              return _this2.planner.tryPlan(boardMask, _this2.boardClearFallbackConfig(plannerConfig));
            })) {
              // Not solvable yet — simplify at the easiest tier and re-check next
              // spawn. The window's own countdown (not a fail-streak) is the only
              // ceiling; it naturally reverts to the player's real tier once it closes.
              picked = this.fillFromQueue(slotCount);
            }
          }
          if (!picked && moment === 'combo' && PerformanceProfiler.measure('Planner/combo search', function () {
            return _this2.planner.tryPlan(boardMask, plannerConfig, true);
          })) {
            picked = this.fillFromQueue(slotCount);
          }
          if (!picked) {
            if (this.planner.tickAndShouldPlan(boardMask, plannerConfig)) {
              if (PerformanceProfiler.measure('Planner/normal search', function () {
                return _this2.planner.tryPlan(boardMask, plannerConfig);
              })) {
                picked = this.fillFromQueue(slotCount);
              }
            }
          }
          if (!picked) {
            picked = PerformanceProfiler.measure('Spawn/random fallback', function () {
              return _this2.pickRandom(slotCount, config);
            });
          }
          PerformanceProfiler.measure('Spawn/fill slots', function () {
            return _this2.fillSlots(picked);
          });
        };
        _proto.spawnMoment = function spawnMoment(boardMask) {
          if (ModeUtils.getInstance().getCurrentMode() === GAME_MODE.ADVENTURE) return null;
          var pacing = getDirectorPacing(this.gm.getScoreLogic().getTotal());
          var director = this.gm.getDirector();
          return director.nextMoment(popCount(boardMask), pacing);
        }

        /**
         * The board-clear window's simplify pass runs at the easiest tier whatever the player's
         * score, but `freshnessBand` must still come from their real tier: this path fires on every
         * spawn a window stays open, so inheriting tier 0's band would put every player back on the
         * lowest anti-repeat setting for 5-7 sets at a time — the same paths the endless-pattern
         * hands came from.
         */;
        _proto.boardClearFallbackConfig = function boardClearFallbackConfig(tuned) {
          return _extends({}, DIFFICULTY_TABLE[0].planner, {
            freshnessBand: tuned.freshnessBand
          });
        }

        /**
         * Adventure levels are authored around fixed goals — the director's pacing
         * (drain + pity, including the fragmentation pity) would fight the level design,
         * so only Classic and Tournament get the tuned config.
         */;
        _proto.tunedPlannerConfig = function tunedPlannerConfig(config, fragScore) {
          if (ModeUtils.getInstance().getCurrentMode() === GAME_MODE.ADVENTURE) {
            return config.planner;
          }
          return this.gm.getDirector().tunePlanner(config.planner, fragScore);
        }

        /** Replaces the tray with an authored set, bypassing the planner (Tutorial's scripted hand). */;
        _proto.forceTray = function forceTray(defs) {
          this.clearActive();
          this.fillSlots(defs);
          this.updateStuckBlocks();
          this.animateBlocks();
        };
        _proto.handleReviveSpawn = function handleReviveSpawn() {
          var _this3 = this;
          this.clearActive();
          var picked = PerformanceProfiler.measure('Planner/revive max-clears search', function () {
            return _this3.planner.planMaxClears(_this3.gm.getGridLogic().getBoardMask());
          });
          this.fillSlots(picked);
          this.updateStuckBlocks();
          this.animateBlocks();
        };
        _proto.fillSlots = function fillSlots(picked) {
          var slots = this.gm.getGameScreen().getSlots();
          for (var i = 0; i < slots.length; i++) {
            var slot = slots[i];
            if (!slot || !picked[i]) continue;
            slot.removeAllChildren();
            this.createSlotBlock(slot, picked[i]);
          }
          this.injectCollectMarks();
        }

        /**
         * Collect levels: keeps the mark supply flowing. A fresh set replaces the whole tray, so each
         * block is dealt one of the types still short of its goal and then fills with that gem at the
         * level's density — occasional in the first band, nearly every cell in the last.
         *
         * One type per block is deliberate: a block mixing two gems reads as noise on the tray, and a
         * player picking it up cannot tell which goal they are serving.
         *
         * Keyed on UNPLACED supply only — marks stranded on the board don't count — so a stranded mark
         * can never starve the supply and soft-lock the level. Best-effort (no winnability sim).
         */;
        _proto.injectCollectMarks = function injectCollectMarks() {
          var level = this.gm.getAdventureLogic().getLevel();
          if (!level || level.type !== 'collect' || this.activeBlocks.length === 0) return;
          var adventure = this.gm.getAdventureLogic();
          var unmet = Object.entries(level.goals).map(function (_ref) {
            var typeStr = _ref[0],
              goal = _ref[1];
            return [Number(typeStr), goal != null ? goal : 0];
          }).filter(function (_ref2) {
            var type = _ref2[0],
              goal = _ref2[1];
            return adventure.getCollected(type) < goal;
          }).map(function (_ref3) {
            var type = _ref3[0];
            return type;
          });
          if (unmet.length === 0) return;
          var density = collectGemDensityFor(level.id);
          var blocks = this.activeBlocks.filter(function (block) {
            return block.data;
          });
          var dealt = 0;
          for (var i = 0; i < blocks.length; i++) {
            var type = unmet[(this.markRotation + i) % unmet.length];
            dealt += this.fillBlockWithGem(blocks[i], type, density);
          }
          // More types than tray slots means a tray can only show some of them; rotating the deal is
          // what keeps the types it skips from being starved tray after tray.
          this.markRotation = (this.markRotation + blocks.length) % unmet.length;

          // A low-density level can roll an entirely plain tray; one guaranteed mark keeps the
          // supply from stalling without making gems any less rare in the bands that want them rare.
          if (dealt === 0) this.forceOneGem(blocks[0], unmet[this.markRotation % unmet.length]);
        }

        /** Marks each of the block's cells with `type` at the level's density. Returns marks added. */;
        _proto.fillBlockWithGem = function fillBlockWithGem(block, type, density) {
          var def = block.data;
          if (!def) return 0;
          var marks = new Map();
          for (var i = 0; i < def.shape.length; i++) {
            if (Math.random() < density) marks.set(i, type);
          }
          if (marks.size > 0) block.marks = marks;
          return marks.size;
        };
        _proto.forceOneGem = function forceOneGem(block, type) {
          var def = block == null ? void 0 : block.data;
          if (!block || !def) return;
          block.marks = new Map([[Math.floor(Math.random() * def.shape.length), type]]);
        }

        /**
         * Dequeues blocks from the planner and fills remaining slots
         * with random blocks. Validates the full set can be placed;
         * discards the queue and returns null if it can't.
         */;
        _proto.fillFromQueue = function fillFromQueue(count) {
          var queued = this.planner.dequeue(count);
          while (queued.length < count) {
            var _this$gm$getGridLogic = this.gm.getGridLogic().getSpawnPools(),
              poolNow = _this$gm$getGridLogic.now;
            var filtered = spawnable(poolNow);
            var pool = filtered.length > 0 ? filtered : [].concat(SPAWN_LIBRARY);
            queued.push(pool[Math.floor(Math.random() * pool.length)]);
          }
          if (this.gm.getGridLogic().canPlaceSet(queued)) return queued;
          this.planner.reset();
          return null;
        };
        _proto.pickRandom = function pickRandom(count, config) {
          var _this$gm$getGridLogic2 = this.gm.getGridLogic().getSpawnPools(),
            poolNow = _this$gm$getGridLogic2.now,
            poolOpt = _this$gm$getGridLogic2.optimistic;
          var filteredNow = spawnable(poolNow);
          var filteredOpt = spawnable(poolOpt);
          var tightPool = config.preferTightFit ? this.buildTightPool(filteredNow) : [];
          for (var attempt = 0; attempt <= SPAWN_RETRIES; attempt++) {
            var defs = this.pickDefs(count, config, filteredNow, filteredOpt, tightPool);
            if (this.gm.getGridLogic().canPlaceSet(defs)) return defs;
          }
          return this.pickSafeDefs(count, poolNow);
        };
        _proto.pickDefs = function pickDefs(count, config, poolNow, poolOpt, tightPool) {
          var picked = [];
          for (var i = 0; i < count; i++) {
            var pool = this.pickPool(i, config, poolNow, poolOpt, tightPool);
            picked.push(this.weightedRandom(pool));
          }
          return picked;
        }

        /**
         * Emergency fallback after every normal pick failed `canPlaceSet`: smallest blocks that
         * still fit. Reserved shapes are allowed here — if nothing from the spawn pool fits, a
         * small assist piece is the only thing standing between the player and a dead board.
         */;
        _proto.pickSafeDefs = function pickSafeDefs(count, poolNow) {
          var filtered = spawnable(poolNow);
          var sorted = [].concat(filtered.length > 0 ? filtered : poolNow).sort(function (a, b) {
            return a.shape.length - b.shape.length;
          });
          var pool = sorted.length > 0 ? sorted : BLOCK_LIBRARY.filter(function (d) {
            return d.reserved;
          });
          var picked = [];
          for (var i = 0; i < count; i++) {
            picked.push(pool[Math.floor(Math.random() * pool.length)]);
          }
          return picked;
        };
        _proto.pickPool = function pickPool(slotIndex, config, poolNow, poolOpt, tightPool) {
          if (config.preferTightFit && tightPool.length > 0) {
            var intersection = tightPool.filter(function (d) {
              return poolNow.includes(d);
            });
            return intersection.length > 0 ? intersection : tightPool;
          }
          var pool = slotIndex === 0 ? poolNow : poolOpt;
          if (pool.length === 0) pool = slotIndex === 0 ? [].concat(SPAWN_LIBRARY) : poolNow;
          if (pool.length === 0) pool = [].concat(SPAWN_LIBRARY);
          return pool;
        };
        _proto.buildTightPool = function buildTightPool(poolNow) {
          var _this4 = this;
          if (poolNow.length === 0) return [];
          var scored = poolNow.map(function (d) {
            return {
              def: d,
              positions: _this4.gm.getGridLogic().countValidPositions(d)
            };
          });
          scored.sort(function (a, b) {
            return a.positions - b.positions;
          });
          var median = scored[Math.floor(scored.length / 2)].positions;
          return scored.filter(function (s) {
            return s.positions <= median;
          }).map(function (s) {
            return s.def;
          });
        };
        _proto.createSlotBlock = function createSlotBlock(slot, def) {
          var blockNode = this.gm.getPool().getBlock();
          blockNode.setParent(slot);
          blockNode.setPosition(Vec3.ZERO);
          var block = blockNode.getComponent(Block);
          if (!block) return;
          block.init(def, this.allocCells(def.shape.length));
          block.setSuspended(this.suspended);
          if (this.locked) block.lock();
          this.activeBlocks.push(block);
          blockNode.setScale(new Vec3(0.5, 0.5, 1));
        }

        /**
         * On a nearly empty board (< 25% filled), big blocks get quadratic
         * weight boost so the board fills up fast. Otherwise weight is linear
         * in cell count, so big shapes still outnumber small filler without
         * drowning out variety.
         */;
        _proto.weightedRandom = function weightedRandom(defs) {
          var fillRatio = this.getBoardFillRatio();
          var boostBig = fillRatio < EMPTY_BOARD_THRESHOLD;
          var weightOf = function weightOf(d) {
            return boostBig ? d.shape.length * d.shape.length : d.shape.length;
          };
          var total = defs.reduce(function (sum, d) {
            return sum + weightOf(d);
          }, 0);
          var roll = Math.random() * total;
          for (var _iterator6 = _createForOfIteratorHelperLoose(defs), _step6; !(_step6 = _iterator6()).done;) {
            var d = _step6.value;
            roll -= weightOf(d);
            if (roll <= 0) return d;
          }
          return defs[0];
        };
        _proto.getBoardFillRatio = function getBoardFillRatio() {
          return popCount(this.gm.getGridLogic().getBoardMask()) / BOARD_CELLS;
        };
        _proto.allocCells = function allocCells(count) {
          var cells = [];
          for (var i = 0; i < count; i++) cells.push(this.gm.getPool().getCell());
          return cells;
        };
        _proto.releaseBlock = function releaseBlock(block) {
          var cells = block.getCells();
          block.clearCells();
          for (var _iterator7 = _createForOfIteratorHelperLoose(cells), _step7; !(_step7 = _iterator7()).done;) {
            var cell = _step7.value;
            this.gm.getPool().releaseCell(cell);
          }
          this.gm.getPool().releaseBlock(block.node);
        };
        return BlockLogic;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Board.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CellSkins.ts', './constants.ts', './SkinService.ts', './SpriteLoader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _createClass, cclegacy, _decorator, Color, Vec3, Prefab, UITransform, instantiate, Sprite, Tween, tween, Component, emptyColorFor, CELL_SIZE, GRID_SIZE, EFFECT_SPECTRUM, SkinService, SpriteLoader;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Vec3 = module.Vec3;
      Prefab = module.Prefab;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      emptyColorFor = module.emptyColorFor;
    }, function (module) {
      CELL_SIZE = module.CELL_SIZE;
      GRID_SIZE = module.GRID_SIZE;
      EFFECT_SPECTRUM = module.EFFECT_SPECTRUM;
    }, function (module) {
      SkinService = module.SkinService;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "93afbJgBlZLoq3qGe+uG7no", "Board", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SCRATCH_COLOR = new Color();
      var GRID_CENTER_SCRATCH = new Vec3();
      var BORDER_INSET = {
        top: 10,
        bottom: 12,
        left: 4,
        right: 4
      };
      var EMPTY_INSET = 4;
      var EDGE_GLOW_IN = 0.45;
      var EDGE_GLOW_HOLD = 0.15;
      var EDGE_GLOW_OUT = 0.45;
      var EDGE_GLOW_PEAK_ALPHA = 255;
      var EDGE_GLOW_RING_INSET = 4;
      var SEED_POP = 0.2;
      var SEED_STAGGER = 0.024;
      var SEED_FROM = 0.7;
      var Board = exports('Board', (_dec = ccclass('Board'), _dec2 = property(Prefab), _dec3 = property({
        tooltip: "Board art's outer stroke width (px), subtracted evenly from all sides"
      }), _dec4 = property({
        tooltip: 'Explicit cell size (px). 0 = auto-fit to the board art.'
      }), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Board, _Component);
        function Board() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "cellPrefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "strokeInset", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cellSizeOverride", _descriptor3, _assertThisInitialized(_this));
          _this.spacing = 2;
          _this.cellSize = CELL_SIZE;
          _this.paintedSize = CELL_SIZE;
          _this.emptySize = CELL_SIZE - 4;
          _this._gridEdgeX = 0;
          _this._gridEdgeY = 0;
          _this._gridSpan = 0;
          _this._frameSpan = 0;
          _this.cells = [];
          _this.iconNodes = [];
          _this.gemCells = [];
          _this.cellColors = [];
          _this.sprites = [];
          _this.uis = [];
          _this.defaultFrame = null;
          _this.emptyScratch = new Color();
          _this.boardSprite = null;
          _this.boardSpriteRead = false;
          _this.authoredBoardFrame = null;
          _this.previewCells = [];
          _this.lineCells = [];
          _this.previewBorders = [];
          _this.bordersShown = false;
          _this.boardRestPos = {
            x: 0,
            y: 0,
            z: 0
          };
          _this.shakeTarget = null;
          _this.edgeGlowNode = null;
          _this.edgeGlowSprite = null;
          _this.edgeGlowProxy = {
            a: 0
          };
          _this.edgeGlowScratch = new Color();
          return _this;
        }
        var _proto = Board.prototype;
        _proto.onLoad = function onLoad() {
          if (!this.cellPrefab) return;
          this.buildGrid();
          this.boardRestPos.x = this.node.position.x;
          this.boardRestPos.y = this.node.position.y;
          this.boardRestPos.z = this.node.position.z;
        };
        _proto.buildGrid = function buildGrid() {
          var boardUi = this.node.getComponent(UITransform);
          this._frameSpan = boardUi.contentSize.width;
          var strokeW = this.strokeInset * 2;
          var innerW = boardUi.contentSize.width - BORDER_INSET.left - BORDER_INSET.right - strokeW;
          var innerH = boardUi.contentSize.height - BORDER_INSET.top - BORDER_INSET.bottom - strokeW;
          var gridPixelSize = Math.min(innerW, innerH);

          // Whole-pixel cells prevent uneven seams from accumulated sub-pixel rounding.
          var fitted = Math.floor((gridPixelSize - (GRID_SIZE - 1) * this.spacing) / GRID_SIZE);
          this.cellSize = this.cellSizeOverride > 0 ? Math.min(this.cellSizeOverride, fitted) : fitted;
          this.paintedSize = this.cellSize + this.spacing;
          this.emptySize = this.paintedSize - EMPTY_INSET;
          var centerX = (BORDER_INSET.left - BORDER_INSET.right) / 2;
          var centerY = (BORDER_INSET.bottom - BORDER_INSET.top) / 2;
          var gridSpan = this.cellSize * GRID_SIZE + (GRID_SIZE - 1) * this.spacing;
          this._gridSpan = gridSpan;
          this._gridEdgeX = centerX - gridSpan / 2;
          this._gridEdgeY = centerY - gridSpan / 2;
          var firstCenterX = this._gridEdgeX + this.cellSize / 2;
          var firstCenterY = this._gridEdgeY + this.cellSize / 2;
          for (var r = 0; r < GRID_SIZE; r++) {
            this.cells[r] = [];
            this.sprites[r] = [];
            this.uis[r] = [];
            this.iconNodes[r] = [];
            this.gemCells[r] = [];
            this.cellColors[r] = [];
            for (var c = 0; c < GRID_SIZE; c++) {
              this.iconNodes[r][c] = null;
              this.gemCells[r][c] = false;
              this.cellColors[r][c] = -1;
              var cell = instantiate(this.cellPrefab);
              cell.setParent(this.node);
              cell.setPosition(firstCenterX + c * this.step, firstCenterY + r * this.step, 0);
              var sprite = cell.getComponent(Sprite);
              sprite.sizeMode = Sprite.SizeMode.CUSTOM;
              if (!this.defaultFrame) this.defaultFrame = sprite.spriteFrame;
              var ui = cell.getComponent(UITransform);
              ui.setContentSize(this.emptySize, this.emptySize);
              this.cells[r][c] = cell;
              this.sprites[r][c] = sprite;
              this.uis[r][c] = ui;
            }
          }
        };
        _proto.ensureEdgeGlow = function ensureEdgeGlow() {
          if (this.edgeGlowNode) return;
          var frame = SpriteLoader.instance.getLineClearBorder();
          if (!frame) return;
          var node = instantiate(this.cellPrefab);
          node.setParent(this.node);
          var sprite = node.getComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          sprite.type = Sprite.Type.SLICED;
          sprite.spriteFrame = frame;
          sprite.color = new Color(255, 255, 255, 0);
          node.setSiblingIndex(this.node.children.length - 1);
          this.edgeGlowNode = node;
          this.edgeGlowSprite = sprite;
          this.sizeEdgeGlow();
        };
        _proto.sizeEdgeGlow = function sizeEdgeGlow() {
          var node = this.edgeGlowNode;
          if (!node) return;
          var span = this._frameSpan + EDGE_GLOW_RING_INSET * 2;
          node.setPosition(0, 0, 0);
          node.getComponent(UITransform).setContentSize(span, span);
        };
        _proto.stopEdgeGlow = function stopEdgeGlow() {
          if (!this.edgeGlowSprite) return;
          Tween.stopAllByTarget(this.edgeGlowProxy);
          var c = this.edgeGlowSprite.color.clone();
          c.a = 0;
          this.edgeGlowSprite.color = c;
        };
        _proto.flashEdgeGlow = function flashEdgeGlow(color) {
          this.ensureEdgeGlow();
          var sprite = this.edgeGlowSprite;
          if (!sprite) return;
          var scratch = this.edgeGlowScratch;
          var proxy = this.edgeGlowProxy;
          var apply = function apply() {
            return sprite.color = scratch.set(color.r, color.g, color.b, proxy.a);
          };
          Tween.stopAllByTarget(proxy);
          proxy.a = 0;
          tween(proxy).to(EDGE_GLOW_IN, {
            a: EDGE_GLOW_PEAK_ALPHA
          }, {
            easing: 'expoOut',
            onUpdate: apply
          }).delay(EDGE_GLOW_HOLD).to(EDGE_GLOW_OUT, {
            a: 0
          }, {
            easing: 'cubicOut',
            onUpdate: apply
          }).start();
        };
        _proto.paint = function paint(r, c, colorIndex) {
          var sf = SpriteLoader.instance.getPlayCellSprite(colorIndex);
          if (!sf) return;
          this.setSpriteCustom(r, c, sf, Color.WHITE, this.paintedSize);
          this.gemCells[r][c] = false;
          this.cellColors[r][c] = colorIndex;
        };
        _proto.reset = function reset(r, c) {
          this.setSpriteCustom(r, c, this.defaultFrame, this.emptyColor(), this.emptySize);
          this.gemCells[r][c] = false;
          this.cellColors[r][c] = -1;
        }

        /**
         * The empty slot's sprite is pure white, so its whole appearance is this tint — which is what
         * lets a skin recolour the grid without needing its own empty-cell art.
         */;
        _proto.emptyColor = function emptyColor() {
          var _emptyColorFor = emptyColorFor(SkinService.active()),
            r = _emptyColorFor.r,
            g = _emptyColorFor.g,
            b = _emptyColorFor.b,
            a = _emptyColorFor.a;
          return this.emptyScratch.set(r, g, b, a);
        }

        /**
         * Swaps the board's own frame art with the skin. The authored frame is captured on the first
         * call and put back for the default skin, so an unwired skinBoardFrames array changes nothing.
         */;
        _proto.applySkinArt = function applySkinArt() {
          var _SpriteLoader$instanc, _SpriteLoader$instanc2;
          var sprite = this.boardGraphic();
          if (!sprite) return;
          if (!this.authoredBoardFrame) this.authoredBoardFrame = sprite.spriteFrame;
          sprite.spriteFrame = (_SpriteLoader$instanc = (_SpriteLoader$instanc2 = SpriteLoader.instance) == null ? void 0 : _SpriteLoader$instanc2.getSkinBoardFrame()) != null ? _SpriteLoader$instanc : this.authoredBoardFrame;
        }

        // Read off the node the component already lives on rather than wired as a @property, and looked
        // up once here instead of in a lifecycle hook.
        ;

        _proto.boardGraphic = function boardGraphic() {
          if (!this.boardSpriteRead) {
            this.boardSpriteRead = true;
            this.boardSprite = this.node.getComponent(Sprite);
          }
          return this.boardSprite;
        }

        /**
         * Re-applies the active skin to everything already on the board. Gem cells are skipped — an
         * Adventure mark is its own art, not a colour a skin can stand in for.
         */;
        _proto.repaintSkin = function repaintSkin() {
          for (var r = 0; r < GRID_SIZE; r++) {
            for (var c = 0; c < GRID_SIZE; c++) {
              if (this.gemCells[r][c]) continue;
              var colorIndex = this.cellColors[r][c];
              // Empty slots carry the skin too — their tint is the only thing that colours them.
              if (colorIndex < 0) {
                this.setSpriteCustom(r, c, this.defaultFrame, this.emptyColor(), this.emptySize);
                continue;
              }
              var sf = SpriteLoader.instance.getPlayCellSprite(colorIndex);
              if (sf) this.setSpriteCustom(r, c, sf, Color.WHITE, this.paintedSize);
            }
          }
        };
        _proto.paintGemCell = function paintGemCell(r, c, type, armored) {
          var loader = SpriteLoader.instance;
          var frame = armored ? loader.getArmorGemCellFrame(type) : loader.getGemCellFrame(type);
          if (!frame) return;
          this.setSpriteCustom(r, c, frame, Color.WHITE, this.paintedSize);
          this.hideIcon(r, c);
          this.gemCells[r][c] = true;
        };
        _proto.hideIcon = function hideIcon(r, c) {
          var node = this.iconNodes[r][c];
          if (node) node.active = false;
        };
        _proto.resetAll = function resetAll() {
          this.unscheduleAllCallbacks();
          this.stopShake();
          this.stopEdgeGlow();
          this.clearPreview();
          for (var r = 0; r < GRID_SIZE; r++) {
            for (var c = 0; c < GRID_SIZE; c++) {
              // A restart mid-reveal would otherwise strand cells at the scale animSeedIn left them.
              Tween.stopAllByTarget(this.cells[r][c]);
              this.cells[r][c].setScale(1, 1, 1);
              this.reset(r, c);
              this.hideIcon(r, c);
            }
          }
        }

        /**
         * Reveals a freshly seeded board as a diagonal wave. Each cell holds its empty slot until its
         * turn, then snaps back to what the caller painted with a pop — the grid stays whole
         * throughout, which is why this repaints on a timeline rather than scaling painted cells up
         * from nothing (the cell node draws the empty slot too, so hiding it leaves a hole).
         *
         * State is captured rather than recoloured, so gem and armored tiles come back as themselves.
         * Purely cosmetic: the caller has committed the cells to the board mask first, so gameplay
         * never sees the half-revealed board. Returns how long the wave takes, for callers that wait.
         */;
        _proto.animSeedIn = function animSeedIn(cells, startDelay) {
          var _this2 = this;
          if (startDelay === void 0) {
            startDelay = 0;
          }
          var lastDelay = 0;
          // A repeated cell would capture the empty state the first pass just wrote and restore to
          // that, leaving it invisible while still solid on the mask.
          var seen = new Set();
          var _loop = function _loop() {
            var _step$value = _step.value,
              r = _step$value[0],
              c = _step$value[1];
            if (seen.has(r * GRID_SIZE + c)) return 1; // continue
            seen.add(r * GRID_SIZE + c);
            var node = _this2.cells[r][c];
            Tween.stopAllByTarget(node);
            node.setScale(1, 1, 1);
            var seeded = _this2.getCellState(r, c);
            var wasGem = _this2.gemCells[r][c];
            var wasColor = _this2.cellColors[r][c];
            _this2.reset(r, c);
            var delay = startDelay + (r + c) * SEED_STAGGER;
            tween(node).delay(delay).call(function () {
              _this2.restoreCell(r, c, seeded);
              _this2.gemCells[r][c] = wasGem;
              _this2.cellColors[r][c] = wasColor;
              node.setScale(SEED_FROM, SEED_FROM, 1);
            }).to(SEED_POP, {
              scale: new Vec3(1, 1, 1)
            }, {
              easing: 'backOut'
            }).start();
            if (delay > lastDelay) lastDelay = delay;
          };
          for (var _iterator = _createForOfIteratorHelperLoose(cells), _step; !(_step = _iterator()).done;) {
            if (_loop()) continue;
          }
          return lastDelay + SEED_POP;
        };
        _proto.showPreview = function showPreview(positions, rows, cols, colorIndex, isRainbow) {
          this.clearPreview();
          var sf = SpriteLoader.instance.getPlayCellSprite(colorIndex);
          if (!sf) return;
          var lineCellKeys = new Set();
          for (var _iterator2 = _createForOfIteratorHelperLoose(rows), _step2; !(_step2 = _iterator2()).done;) {
            var r = _step2.value;
            for (var c = 0; c < GRID_SIZE; c++) lineCellKeys.add(r * GRID_SIZE + c);
          }
          for (var _iterator3 = _createForOfIteratorHelperLoose(cols), _step3; !(_step3 = _iterator3()).done;) {
            var _c = _step3.value;
            for (var _r = 0; _r < GRID_SIZE; _r++) lineCellKeys.add(_r * GRID_SIZE + _c);
          }
          var blockSet = new Set(positions.map(function (_ref) {
            var r = _ref.r,
              c = _ref.c;
            return r * GRID_SIZE + c;
          }));
          for (var _iterator4 = _createForOfIteratorHelperLoose(lineCellKeys), _step4; !(_step4 = _iterator4()).done;) {
            var key = _step4.value;
            if (blockSet.has(key)) continue;
            var _r2 = Math.floor(key / GRID_SIZE);
            var _c2 = key % GRID_SIZE;
            if (this.gemCells[_r2][_c2]) continue;
            var saved = this.getCellState(_r2, _c2);
            this.paintPreview(_r2, _c2, sf, 220);
            this.lineCells.push({
              r: _r2,
              c: _c2,
              saved: saved
            });
          }
          for (var _iterator5 = _createForOfIteratorHelperLoose(positions), _step5; !(_step5 = _iterator5()).done;) {
            var _step5$value = _step5.value,
              _r3 = _step5$value.r,
              _c3 = _step5$value.c;
            var _saved = this.getCellState(_r3, _c3);
            this.paintPreview(_r3, _c3, sf, 90);
            this.previewCells.push({
              r: _r3,
              c: _c3,
              saved: _saved
            });
          }
          this.drawLineBorders(rows, cols, colorIndex, isRainbow);
        }

        // Called on every drag frame the block sits off-grid, so it must cost nothing when there is
        // nothing to restore.
        ;

        _proto.clearPreview = function clearPreview() {
          if (this.lineCells.length === 0 && this.previewCells.length === 0 && !this.bordersShown) {
            return;
          }
          for (var _iterator6 = _createForOfIteratorHelperLoose(this.lineCells), _step6; !(_step6 = _iterator6()).done;) {
            var _step6$value = _step6.value,
              r = _step6$value.r,
              c = _step6$value.c,
              saved = _step6$value.saved;
            this.restoreCell(r, c, saved);
          }
          this.lineCells = [];
          for (var _iterator7 = _createForOfIteratorHelperLoose(this.previewCells), _step7; !(_step7 = _iterator7()).done;) {
            var _step7$value = _step7.value,
              _r4 = _step7$value.r,
              _c4 = _step7$value.c,
              _saved2 = _step7$value.saved;
            this.restoreCell(_r4, _c4, _saved2);
          }
          this.previewCells = [];
          this.hideLineBorders();
        }

        /**
         * Drops the preview bookkeeping without restoring the cells. Used when a kept preview hands
         * over to the line-clear wipe: the block's own cells were overpainted at commit, so restoring
         * their saved (empty) state would erase a placed block.
         *
         * `keepBorders` leaves the would-clear outline drawn over the now-empty slots — a normal clear
         * has no beam of its own, so this outline is what lights the line for the beat between the
         * cells vanishing and the debris flying. The caller must then call `hideLineBorders`.
         */;
        _proto.discardPreview = function discardPreview(keepBorders) {
          if (keepBorders === void 0) {
            keepBorders = false;
          }
          this.lineCells = [];
          this.previewCells = [];
          if (!keepBorders) this.hideLineBorders();
        };
        _proto.hideLineBorders = function hideLineBorders() {
          if (!this.bordersShown) return;
          for (var _iterator8 = _createForOfIteratorHelperLoose(this.previewBorders), _step8; !(_step8 = _iterator8()).done;) {
            var border = _step8.value;
            border.node.active = false;
          }
          this.bordersShown = false;
        };
        _proto.paintPreview = function paintPreview(r, c, sf, alpha) {
          SCRATCH_COLOR.set(255, 255, 255, alpha);
          this.setSpriteCustom(r, c, sf, SCRATCH_COLOR, this.paintedSize);
        };
        _proto.drawLineBorders = function drawLineBorders(rows, cols, colorIndex, isRainbow) {
          var loader = SpriteLoader.instance;
          var frame = isRainbow ? loader.getRainbowBorder() : loader.getLineClearBorder();
          if (!frame) return;
          var accent = SkinService.accent();
          var tint = isRainbow ? SCRATCH_COLOR.set(255, 255, 255, 255) : accent ? SCRATCH_COLOR.set(accent.r, accent.g, accent.b, accent.a) : SCRATCH_COLOR.set(EFFECT_SPECTRUM[colorIndex % EFFECT_SPECTRUM.length]);
          var first = this.cells[0][0].position;
          var lastX = this.cells[0][GRID_SIZE - 1].position.x;
          var lastY = this.cells[GRID_SIZE - 1][0].position.y;
          var span = lastX - first.x + this.cellSize;
          var midX = (first.x + lastX) / 2;
          // Only the vertical extents are sized to the line — a row's thickness and a column's
          // length. Horizontal extents, and the rainbow variant, keep their original padding.
          var midY = (first.y + lastY) / 2 - (isRainbow ? 2 : 0);
          var padThickness = this.cellSize * 1.2;
          var rowLength = span + (isRainbow ? 40 : 12);
          var rowThickness = isRainbow ? padThickness : this.cellSize * 1.1;
          var colLength = isRainbow ? span + 16 : span;
          for (var _iterator9 = _createForOfIteratorHelperLoose(rows), _step9; !(_step9 = _iterator9()).done;) {
            var r = _step9.value;
            var y = this.cells[r][0].position.y;
            this.placeBorder(frame, tint, midX, y, rowLength, rowThickness, 0, isRainbow);
          }
          for (var _iterator10 = _createForOfIteratorHelperLoose(cols), _step10; !(_step10 = _iterator10()).done;) {
            var c = _step10.value;
            var x = this.cells[0][c].position.x;
            this.placeBorder(frame, tint, x, midY, colLength, padThickness, 90, isRainbow);
          }
        };
        _proto.placeBorder = function placeBorder(frame, tint, x, y, length, thickness, angle, isRainbow) {
          var border = this.acquireBorder();
          border.sprite.spriteFrame = frame;
          border.sprite.type = isRainbow ? Sprite.Type.SIMPLE : Sprite.Type.SLICED;
          border.sprite.color = tint;
          border.ui.setContentSize(length, thickness);
          border.node.angle = angle;
          border.node.setPosition(x, y, 0);
          border.node.setSiblingIndex(this.node.children.length - 1);
          this.bordersShown = true;
        };
        _proto.acquireBorder = function acquireBorder() {
          var found = this.previewBorders.find(function (b) {
            return !b.node.active;
          });
          if (found) {
            found.node.active = true;
            return found;
          }
          var node = instantiate(this.cellPrefab);
          node.setParent(this.node);
          var sprite = node.getComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          var ui = node.getComponent(UITransform);
          var entry = {
            node: node,
            sprite: sprite,
            ui: ui
          };
          this.previewBorders.push(entry);
          return entry;
        };
        _proto.getCellState = function getCellState(r, c) {
          var sprite = this.sprites[r][c];
          return {
            frame: sprite.spriteFrame,
            color: sprite.color.clone()
          };
        };
        _proto.restoreCell = function restoreCell(r, c, state) {
          var size = state.frame !== this.defaultFrame ? this.paintedSize : this.emptySize;
          this.setSpriteCustom(r, c, state.frame, state.color, size);
        };
        _proto.wipeClearedCells = function wipeClearedCells(rows, cols, survivors) {
          var cellSet = new Set();
          for (var _iterator11 = _createForOfIteratorHelperLoose(rows), _step11; !(_step11 = _iterator11()).done;) {
            var r = _step11.value;
            for (var c = 0; c < GRID_SIZE; c++) cellSet.add(r * GRID_SIZE + c);
          }
          for (var _iterator12 = _createForOfIteratorHelperLoose(cols), _step12; !(_step12 = _iterator12()).done;) {
            var _c5 = _step12.value;
            for (var _r5 = 0; _r5 < GRID_SIZE; _r5++) cellSet.add(_r5 * GRID_SIZE + _c5);
          }
          for (var _iterator13 = _createForOfIteratorHelperLoose(cellSet), _step13; !(_step13 = _iterator13()).done;) {
            var idx = _step13.value;
            if (survivors != null && survivors.has(idx)) continue;
            var _r6 = Math.floor(idx / GRID_SIZE);
            var _c6 = idx % GRID_SIZE;
            this.setSpriteCustom(_r6, _c6, this.defaultFrame, this.emptyColor(), this.emptySize);
            this.hideIcon(_r6, _c6);
            this.gemCells[_r6][_c6] = false;
            this.cellColors[_r6][_c6] = -1;
          }
        };
        _proto.stopShake = function stopShake() {
          if (!this.shakeTarget) return;
          Tween.stopAllByTarget(this.shakeTarget);
          this.shakeTarget = null;
          var rest = this.boardRestPos;
          this.node.setPosition(rest.x, rest.y, rest.z);
        };
        _proto.getCellWorldPos = function getCellWorldPos(r, c, out) {
          var pos = this.cells[r][c].worldPosition;
          return out ? out.set(pos) : pos.clone();
        }

        /**
         * Centre of the playfield, not of the board art — BORDER_INSET offsets the grid inside the
         * node, so effects anchored on the node origin drift away from the cells whenever the insets
         * are not symmetric.
         */;
        _proto.getBoardWorldCenter = function getBoardWorldCenter(out) {
          var ui = this.node.getComponent(UITransform);
          if (!ui || this._gridSpan === 0) {
            var pos = this.node.worldPosition;
            return out ? out.set(pos) : pos.clone();
          }
          GRID_CENTER_SCRATCH.set(this._gridEdgeX + this._gridSpan / 2, this._gridEdgeY + this._gridSpan / 2, 0);
          return ui.convertToWorldSpaceAR(GRID_CENTER_SCRATCH, out != null ? out : new Vec3());
        };
        _proto.setSpriteCustom = function setSpriteCustom(r, c, frame, color, size) {
          var sprite = this.sprites[r][c];
          sprite.spriteFrame = frame;
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          sprite.color = color;
          this.uis[r][c].setContentSize(size, size);
        };
        _createClass(Board, [{
          key: "step",
          get: function get() {
            return this.cellSize + this.spacing;
          }
        }, {
          key: "gridEdgeX",
          get: function get() {
            return this._gridEdgeX;
          }
        }, {
          key: "gridEdgeY",
          get: function get() {
            return this._gridEdgeY;
          }
        }, {
          key: "gridSpan",
          get: function get() {
            return this._gridSpan;
          }
        }, {
          key: "frameSpan",
          get: function get() {
            return this._frameSpan;
          }
        }]);
        return Board;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cellPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "strokeInset", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "cellSizeOverride", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BoardGeometry.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6e9e2lDkrlEkoWPLd1397JW", "BoardGeometry", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BootLoader.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TutorialGate.ts'], function (exports) {
  var _inheritsLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, assetManager, Prefab, director, Component, TutorialGate;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      assetManager = module.assetManager;
      Prefab = module.Prefab;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      TutorialGate = module.TutorialGate;
    }],
    execute: function () {
      var _dec, _class;
      cclegacy._RF.push({}, "30f48Sg0MtNHZQ7SWqpYSz6", "BootLoader", undefined);
      var ccclass = _decorator.ccclass;
      var GAME_SCENE = 'GameScene';
      var SCREEN_BUNDLE = 'screens';
      var DASHBOARD_PREFAB = 'DashboardScreen';
      var PRELOAD_FLOOR = 40;
      var PRELOAD_CEILING = 99;
      var BootLoader = exports('BootLoader', (_dec = ccclass('BootLoader'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BootLoader, _Component);
        function BootLoader() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.reported = -1;
          _this.handleProgress = function (completedCount, totalCount) {
            if (totalCount <= 0) return;
            var ratio = Math.min(1, completedCount / totalCount);
            var percentage = Math.floor(PRELOAD_FLOOR + ratio * (PRELOAD_CEILING - PRELOAD_FLOOR));
            if (percentage <= _this.reported) return;
            _this.reported = percentage;
            window.GameSDK.setLoadingProgress(percentage);
          };
          return _this;
        }
        var _proto = BootLoader.prototype;
        _proto.start = function start() {
          this.bootAsync();
        };
        _proto.bootAsync = /*#__PURE__*/function () {
          var _bootAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return Promise.all([window.GameSDK.initializeAsync(), this.preloadGameSceneAsync()]);
                case 2:
                  _context.next = 4;
                  return Promise.all([window.GameSDK.loadPlayerDataAsync(), window.GameSDK.startGameAsync()]);
                case 4:
                  if (TutorialGate.shouldRun()) {
                    _context.next = 7;
                    break;
                  }
                  _context.next = 7;
                  return this.preloadDashboardAsync();
                case 7:
                  // Reported at 100 only once the scene is up, because that is what tears the platform's
                  // loading cover down: BootScene draws nothing, so retiring it before the swap uncovers an
                  // empty canvas. ScreenManager raises the in-game loading screen as this one goes.
                  director.loadScene(GAME_SCENE, function () {
                    return window.GameSDK.setLoadingProgress(100);
                  });
                case 8:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function bootAsync() {
            return _bootAsync.apply(this, arguments);
          }
          return bootAsync;
        }();
        _proto.preloadDashboardAsync = function preloadDashboardAsync() {
          return new Promise(function (resolve) {
            assetManager.loadBundle(SCREEN_BUNDLE, function (bundleError, bundle) {
              if (bundleError) {
                console.error(bundleError);
                resolve();
                return;
              }
              bundle.load(DASHBOARD_PREFAB, Prefab, function (error, prefab) {
                if (error) console.error(error);else prefab.addRef();
                resolve();
              });
            });
          });
        };
        _proto.preloadGameSceneAsync = function preloadGameSceneAsync() {
          var _this2 = this;
          return new Promise(function (resolve) {
            director.preloadScene(GAME_SCENE, _this2.handleProgress, function (error) {
              if (error) console.error(error);
              resolve();
            });
          });
        };
        return BootLoader;
      }(Component)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CameraUtils.ts", ['cc'], function (exports) {
  var cclegacy, Tween, tween, director, Camera;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Tween = module.Tween;
      tween = module.tween;
      director = module.director;
      Camera = module.Camera;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6f4871ge+lKMbpsh2qWBcTO", "CameraUtils", undefined);
      var SHAKE_PRESETS = {
        light: {
          amplitude: 8,
          duration: 0.16
        },
        medium: {
          amplitude: 12,
          duration: 0.26
        },
        heavy: {
          amplitude: 16,
          duration: 0.4
        }
      };

      // biome-ignore lint/complexity/noStaticOnlyClass: called as CameraUtils.shakeCamera() from screens/UI
      var CameraUtils = exports('CameraUtils', /*#__PURE__*/function () {
        function CameraUtils() {}
        CameraUtils.setShakeCamera = function setShakeCamera(node) {
          if (CameraUtils.cameraNode && CameraUtils.cameraNode !== node) {
            CameraUtils.stopShakeNode(CameraUtils.cameraNode);
          }
          CameraUtils.cameraNode = node;
        };
        CameraUtils.shakeCamera = function shakeCamera(options) {
          if (options === void 0) {
            options = {};
          }
          var node = CameraUtils.resolveCameraNode();
          if (!node) return;
          CameraUtils.shakeNode(node, options);
        };
        CameraUtils.stopShakeCamera = function stopShakeCamera() {
          if (CameraUtils.cameraNode) CameraUtils.stopShakeNode(CameraUtils.cameraNode);
        };
        CameraUtils.shakeNode = function shakeNode(node, options) {
          var _options$intensity, _options$duration, _options$amplitude;
          if (options === void 0) {
            options = {};
          }
          if (!(node != null && node.isValid)) return;
          var preset = SHAKE_PRESETS[(_options$intensity = options.intensity) != null ? _options$intensity : 'medium'];
          var duration = (_options$duration = options.duration) != null ? _options$duration : preset.duration;
          var requested = (_options$amplitude = options.amplitude) != null ? _options$amplitude : preset.amplitude;
          var running = CameraUtils.activeShakes.get(node);
          // A shake started mid-shake must reuse the original rest position, or the offset becomes the new rest.
          var rest = running ? running.rest : node.position.clone();
          if (running) Tween.stopAllByTarget(running.proxy);
          var amplitude = running ? Math.max(requested, running.amplitude) : requested;
          var proxy = {
            progress: 0
          };
          var state = {
            rest: rest,
            proxy: proxy,
            amplitude: amplitude
          };
          CameraUtils.activeShakes.set(node, state);
          tween(proxy).to(duration, {
            progress: 1
          }, {
            onUpdate: function onUpdate() {
              if (!node.isValid || CameraUtils.activeShakes.get(node) !== state) return;
              var envelope = 1 - proxy.progress;
              var ox = (Math.random() * 2 - 1) * amplitude * envelope;
              var oy = (Math.random() * 2 - 1) * amplitude * envelope;
              node.setPosition(rest.x + ox, rest.y + oy, rest.z);
            }
          }).call(function () {
            if (CameraUtils.activeShakes.get(node) !== state) return;
            CameraUtils.activeShakes["delete"](node);
            if (node.isValid) node.setPosition(rest);
          }).start();
        };
        CameraUtils.stopShakeNode = function stopShakeNode(node) {
          var state = CameraUtils.activeShakes.get(node);
          if (!state) return;
          Tween.stopAllByTarget(state.proxy);
          CameraUtils.activeShakes["delete"](node);
          if (node.isValid) node.setPosition(state.rest);
        };
        CameraUtils.resolveCameraNode = function resolveCameraNode() {
          var _CameraUtils$cameraNo, _director$getScene, _camera$node;
          if ((_CameraUtils$cameraNo = CameraUtils.cameraNode) != null && _CameraUtils$cameraNo.isValid) return CameraUtils.cameraNode;
          var camera = (_director$getScene = director.getScene()) == null ? void 0 : _director$getScene.getComponentInChildren(Camera);
          CameraUtils.cameraNode = (_camera$node = camera == null ? void 0 : camera.node) != null ? _camera$node : null;
          return CameraUtils.cameraNode;
        };
        return CameraUtils;
      }());
      CameraUtils.activeShakes = new WeakMap();
      CameraUtils.cameraNode = null;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Cell.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Color, Sprite, UITransform, Component, CELL_SIZE;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Sprite = module.Sprite;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      CELL_SIZE = module.CELL_SIZE;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "a802cn6QvlBv5Ftdp0YQ2Uc", "Cell", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var DEFAULT_COLOR = new Color(255, 255, 255, 255);
      var Cell = exports('Cell', (_dec = ccclass('Cell'), _dec2 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Cell, _Component);
        function Cell() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "sprite", _descriptor, _assertThisInitialized(_this));
          _this.defaultSpriteFrame = null;
          return _this;
        }
        var _proto = Cell.prototype;
        _proto.setSpriteFrame = function setSpriteFrame(sf) {
          var _this$node$getCompone;
          if (!this.sprite || !sf) return;
          if (!this.defaultSpriteFrame) this.defaultSpriteFrame = this.sprite.spriteFrame;
          this.sprite.spriteFrame = sf;
          this.sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          (_this$node$getCompone = this.node.getComponent(UITransform)) == null || _this$node$getCompone.setContentSize(CELL_SIZE, CELL_SIZE);
          this.sprite.color = DEFAULT_COLOR.clone();
          this.sprite.grayscale = false;
        };
        _proto.setColor = function setColor(color) {
          if (this.sprite) this.sprite.color = color.clone();
        };
        _proto.reset = function reset() {
          if (!this.sprite) return;
          if (this.defaultSpriteFrame) this.sprite.spriteFrame = this.defaultSpriteFrame;
          this.sprite.color = DEFAULT_COLOR.clone();
          this.sprite.grayscale = false;
        };
        return Cell;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CellSkins.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        accentFor: accentFor,
        emptyColorFor: emptyColorFor,
        isSkinId: isSkinId
      });
      cclegacy._RF.push({}, "ea307FJWF5O4ojaqSyaqON1", "CellSkins", undefined);
      var RANDOM_SKIN = exports('RANDOM_SKIN', 'random');
      var DEFAULT_SKIN = exports('DEFAULT_SKIN', 'default');

      /**
       * `multi` skins paint a cell per colour index, so effects can key off that index and the rainbow
       * reads. `single` skins are one sprite — the index is meaningless under them, so every effect uses
       * the skin's own `accent` and the rainbow variants are suppressed.
       */

      /**
       * What makes the grid readable: an empty slot sits this much lighter than the board art behind it,
       * and the inset between slots lets that darker board show through as the lines. Measured off the
       * classic board — its art is (21,32,67) and its empty slot renders (32,38,75) — so every skin gets
       * the same contrast rather than a colour guessed per skin.
       */
      var EMPTY_LIFT = {
        r: 11,
        g: 6,
        b: 8
      };
      function liftedFrom(boardR, boardG, boardB) {
        return {
          r: boardR + EMPTY_LIFT.r,
          g: boardG + EMPTY_LIFT.g,
          b: boardB + EMPTY_LIFT.b,
          a: 255
        };
      }
      var CELL_SKINS = exports('CELL_SKINS', [
      // The classic value is the old art (36,42,83) times its authored 233 tint, alpha included, so
      // whitening the sprite left the default board looking exactly as it did.
      {
        id: 'default',
        label: 'CLASSIC',
        price: 0,
        palette: 'multi',
        emptyColor: {
          r: 33,
          g: 38,
          b: 76,
          a: 239
        }
      },
      // Empty colours are lifted off each board recolor's interior: #2B4566, #253862, #12361A.
      // Accents are read off the cell art itself, except melon's — its sprite averages to the red
      // flesh, and a mint green off the rind reads far better against that dark green board.
      {
        id: 'brick',
        label: 'BRICK',
        price: 10,
        palette: 'single',
        emptyColor: liftedFrom(43, 69, 102),
        accent: {
          r: 232,
          g: 90,
          b: 40,
          a: 255
        }
      }, {
        id: 'ice',
        label: 'ICE',
        price: 10,
        palette: 'single',
        emptyColor: liftedFrom(37, 56, 98),
        accent: {
          r: 135,
          g: 222,
          b: 253,
          a: 255
        }
      }, {
        id: 'watermelon',
        label: 'MELON',
        price: 10,
        palette: 'single',
        emptyColor: liftedFrom(18, 54, 26),
        accent: {
          r: 110,
          g: 231,
          b: 166,
          a: 255
        }
      }]);
      var SKIN_BY_ID = new Map(CELL_SKINS.map(function (skin) {
        return [skin.id, skin];
      }));
      function emptyColorFor(id) {
        var _SKIN_BY_ID$get;
        return ((_SKIN_BY_ID$get = SKIN_BY_ID.get(id)) != null ? _SKIN_BY_ID$get : CELL_SKINS[0]).emptyColor;
      }

      /** The colour every effect uses under this skin, or null when the skin is multi-colour. */
      function accentFor(id) {
        var _skin$accent;
        var skin = SKIN_BY_ID.get(id);
        return (skin == null ? void 0 : skin.palette) === 'single' ? (_skin$accent = skin.accent) != null ? _skin$accent : null : null;
      }

      // Index into SpriteLoader's skinFrames array. 'default' has no frame — it falls back to the
      // per-colour cell sprites — so the paid skins start at 0.
      var SKIN_FRAME_INDEX = exports('SKIN_FRAME_INDEX', {
        "default": -1,
        brick: 0,
        ice: 1,
        watermelon: 2
      });
      function isSkinId(value) {
        return CELL_SKINS.some(function (skin) {
          return skin.id === value;
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClassicMode.ts", ['cc', './AudioManager.ts', './GameEvents.ts', './DataManager.ts', './ScreenManager.ts'], function (exports) {
  var cclegacy, AudioManager, SFX, ScreenNames, DataManager, ScreenManager;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AudioManager = module.AudioManager;
      SFX = module.SFX;
    }, function (module) {
      ScreenNames = module.ScreenNames;
    }, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "89cdc39YjFIdaMhFYpZId+F", "ClassicMode", undefined);
      var ClassicMode = exports('ClassicMode', /*#__PURE__*/function () {
        function ClassicMode(gm) {
          this.gm = void 0;
          this.gm = gm;
        }
        var _proto = ClassicMode.prototype;
        _proto.getLevel = function getLevel() {
          return null;
        };
        _proto.setup = function setup() {
          var _screen$getAdventureH, _screen$getVersusHud, _screen$getBestScoreU;
          this.gm.getAdventureLogic().reset();
          this.gm.getScoreLogic().setLineScoreOverride(null);
          var screen = this.gm.getGameScreen();
          (_screen$getAdventureH = screen.getAdventureHud()) == null || _screen$getAdventureH.hide();
          (_screen$getVersusHud = screen.getVersusHud()) == null || _screen$getVersusHud.hide();
          screen.getScoreUI().node.active = true;
          (_screen$getBestScoreU = screen.getBestScoreUI()) == null || _screen$getBestScoreU.setVisible(true);
        };
        _proto.onBlockPlaced = function onBlockPlaced() {};
        _proto.onTurnCleared = function onTurnCleared() {};
        _proto.checkWin = function checkWin() {
          return false;
        };
        _proto.checkLose = function checkLose() {
          return false;
        };
        _proto.onWin = function onWin() {};
        _proto.onGameOver = function onGameOver() {
          var _AudioManager$instanc;
          var total = this.gm.getScoreLogic().getTotal();
          var previousBest = DataManager.getPlayerData('bestScore');
          var isNewBest = total > previousBest;
          if (isNewBest) DataManager.setPlayerData('bestScore', total);
          (_AudioManager$instanc = AudioManager.instance) == null || _AudioManager$instanc.play(isNewBest ? SFX.NEW_BEST : SFX.GAME_OVER);
          var loseData = {
            score: total,
            best: isNewBest ? total : previousBest,
            isNewBest: isNewBest
          };
          if (this.gm.canRevive()) {
            this.gm.offerRevive(loseData);
          } else {
            ScreenManager.instance.openScreenAsync(ScreenNames.LOSE_SCREEN, loseData);
          }
        };
        return ClassicMode;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ClearBoardEffect.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './SpriteLoader.ts', './TweenUtils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, SpriteFrame, Node, Color, Tween, tween, Vec3, UITransform, Sprite, UIOpacity, Component, GRID_SIZE, SpriteLoader, runTweenAsync;
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
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      Color = module.Color;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }, function (module) {
      runTweenAsync = module.runTweenAsync;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "fbcbe3X2/pFYrMXZrwzzon8", "ClearBoardEffect", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FILL_ROW_STEP = 0.035;
      var FILL_RISE = 0.09;
      var FILL_RISE_DISTANCE = 1.4;
      var FILL_TOTAL = (GRID_SIZE - 1) * FILL_ROW_STEP + FILL_RISE;
      var ROW_STEP = 0.035;
      var ROW_RISE = 0.05;
      var ROW_RISE_HEIGHT = 0.3;
      var ROW_FALL = 0.1;
      var ROW_FALL_DROP = 1.4;
      var DESCEND_TOTAL = (GRID_SIZE - 1) * ROW_STEP + ROW_RISE + ROW_FALL;
      var BORDER_FLASH_THICKNESS = 1.5;
      var BORDER_BASE_THICKNESS = 1.15;
      var BORDER_FLASH_TIME = 0.18;
      var BORDER_GLOW_IN = 0.6;
      var BORDER_GLOW_OUT = 0.6;
      // Rainbow_border.png's bright ring sits 11px inside the sprite's box and the 9-slice edges draw
      // 1:1, so the box must overshoot the board art by that much for the ring to land on the border.
      var BORDER_RING_INSET = 11;
      var LETTER_SPREAD = 0.15;
      var LETTER_HOLD = 0.5;
      var FADE_OUT = 0.25;
      var LETTER_POP_UP = 0.1;
      var LETTER_POP_SETTLE = 0.05;
      var LETTER_POP_SCALE = 1.5;
      var ClearBoardEffect = exports('ClearBoardEffect', (_dec = ccclass('ClearBoardEffect'), _dec2 = property(SpriteFrame), _dec3 = property(Node), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ClearBoardEffect, _Component);
        function ClearBoardEffect() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "rainbowBorder", _descriptor, _assertThisInitialized(_this));
          // Parent of the authored praise letters — one Label child per character, positioned in the
          // editor. Collected once into `letters`; nothing is built or measured at runtime.
          _initializerDefineProperty(_this, "lettersRoot", _descriptor2, _assertThisInitialized(_this));
          _this.border = null;
          _this.lettersOpacity = null;
          _this.letters = [];
          _this.borderThickness = {
            s: 1
          };
          _this.particles = [];
          _this.particlesFree = [];
          _this.pColor = new Color();
          return _this;
        }
        var _proto = ClearBoardEffect.prototype;
        _proto.beginBorderNow = function beginBorderNow(geo) {
          this.stopAll();
          this.ensureLayers();
          this.node.setWorldPosition(geo.getBoardWorldCenter());
          var parent = this.node.parent;
          if (parent) this.node.setSiblingIndex(parent.children.length - 1);
          this.beginBorder(geo.frameSpan);
        }

        // `praise` is off for the Adventure win, which lands its own headline over the wipe — the
        // authored letters spell one fixed word and would read as a board clear.
        ;

        _proto.play = /*#__PURE__*/
        function () {
          var _play = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(geo, praise) {
            var _this2 = this;
            var parent;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (praise === void 0) {
                    praise = true;
                  }
                  this.ensureLayers();
                  this.node.setWorldPosition(geo.getBoardWorldCenter());
                  parent = this.node.parent;
                  if (parent) this.node.setSiblingIndex(parent.children.length - 1);
                  this.wipeRows(geo.step);
                  _context.next = 8;
                  return this.delay(ClearBoardEffect.IMPACT_DELAY);
                case 8:
                  this.fadeBorderOut();
                  if (praise) {
                    _context.next = 12;
                    break;
                  }
                  // Returns on the wave settling rather than on the border finishing, so the caller can
                  // land its headline the instant the blocks come to rest. The border keeps fading behind
                  // it; `stopAll` unschedules this along with everything else.
                  this.scheduleOnce(function () {
                    return _this2.hideAll();
                  }, BORDER_GLOW_OUT);
                  return _context.abrupt("return");
                case 12:
                  this.revealPraise();
                  _context.next = 15;
                  return this.delay(LETTER_SPREAD + LETTER_POP_UP + LETTER_POP_SETTLE + LETTER_HOLD);
                case 15:
                  _context.next = 17;
                  return this.animFadeOut();
                case 17:
                  this.hideAll();
                case 18:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function play(_x, _x2) {
            return _play.apply(this, arguments);
          }
          return play;
        }();
        _proto.stopAll = function stopAll() {
          this.unscheduleAllCallbacks();
          var targets = [].concat(this.letters);
          if (this.border) targets.push(this.border.node, this.border.opacity);
          if (this.lettersOpacity) targets.push(this.lettersOpacity);
          for (var _iterator = _createForOfIteratorHelperLoose(targets), _step; !(_step = _iterator()).done;) {
            var t = _step.value;
            Tween.stopAllByTarget(t);
          }
          Tween.stopAllByTarget(this.borderThickness);
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.particles), _step2; !(_step2 = _iterator2()).done;) {
            var p = _step2.value;
            if (!p.node.active) continue;
            Tween.stopAllByTarget(p.proxy);
            this.releaseParticle(p);
          }
          this.hideAll();
        };
        _proto.wipeRows = function wipeRows(step) {
          var _this3 = this;
          var loader = SpriteLoader.instance;
          if (!loader || loader.cellCount === 0) return;
          var centerOffset = (GRID_SIZE - 1) / 2;
          var cells = [];
          var prevIdx = -1;
          for (var r = 0; r < GRID_SIZE; r++) {
            for (var c = 0; c < GRID_SIZE; c++) {
              var idx = Math.floor(Math.random() * loader.cellCount);
              if (idx === prevIdx) idx = (idx + 1) % loader.cellCount;
              prevIdx = idx;
              // The randomised index only varies the art under a multi-colour skin; a single
              // one answers with its own cell whatever is asked for.
              var frame = loader.getPlayCellSprite(idx);
              if (!frame) continue;
              var x0 = (c - centerOffset) * step;
              var y0 = (r - centerOffset) * step;
              cells.push({
                p: this.acquireParticle(frame, step),
                x0: x0,
                y0: y0,
                row: r
              });
            }
          }
          this.fillRise(cells, step);
          this.scheduleOnce(function () {
            return _this3.descendRows(cells, step);
          }, FILL_TOTAL);
        };
        _proto.fillRise = function fillRise(cells, step) {
          var _this4 = this;
          var _loop = function _loop() {
            var _step3$value = _step3.value,
              p = _step3$value.p,
              x0 = _step3$value.x0,
              y0 = _step3$value.y0,
              row = _step3$value.row;
            var startY = y0 - step * FILL_RISE_DISTANCE;
            p.node.setPosition(x0, startY, 0);
            p.node.setScale(1, 1, 1);
            p.node.angle = 0;
            p.sprite.color = _this4.pColor.set(255, 255, 255, 0);
            p.proxy.t = 0;
            tween(p.proxy).delay(row * FILL_ROW_STEP).to(FILL_RISE, {
              t: 1
            }, {
              easing: 'backOut',
              onUpdate: function onUpdate() {
                var t = p.proxy.t;
                p.node.setPosition(x0, startY + (y0 - startY) * t, 0);
                p.sprite.color = _this4.pColor.set(255, 255, 255, Math.round(255 * Math.min(1, t * 1.3)));
              }
            }).call(function () {
              p.node.setPosition(x0, y0, 0);
              p.sprite.color = _this4.pColor.set(255, 255, 255, 255);
            }).start();
          };
          for (var _iterator3 = _createForOfIteratorHelperLoose(cells), _step3; !(_step3 = _iterator3()).done;) {
            _loop();
          }
        };
        _proto.descendRows = function descendRows(cells, step) {
          var _this5 = this;
          var _loop2 = function _loop2() {
            var _step4$value = _step4.value,
              p = _step4$value.p,
              x0 = _step4$value.x0,
              y0 = _step4$value.y0,
              row = _step4$value.row;
            var riseY = y0 + step * ROW_RISE_HEIGHT;
            var rowDelay = (GRID_SIZE - 1 - row) * ROW_STEP;
            p.proxy.t = 0;
            tween(p.proxy).delay(rowDelay).to(ROW_RISE, {
              t: 1
            }, {
              easing: 'quadOut',
              onUpdate: function onUpdate() {
                p.node.setPosition(x0, y0 + (riseY - y0) * p.proxy.t, 0);
              }
            }).call(function () {
              p.proxy.t = 0;
            }).to(ROW_FALL, {
              t: 1
            }, {
              easing: 'quadIn',
              onUpdate: function onUpdate() {
                var t = p.proxy.t;
                p.node.setPosition(x0, riseY - step * ROW_FALL_DROP * t, 0);
                var sc = Math.max(0, 1 - t * 0.3);
                p.node.setScale(sc, sc, 1);
                p.sprite.color = _this5.pColor.set(255, 255, 255, Math.round(255 * Math.max(0, 1 - t)));
              }
            }).call(function () {
              return _this5.releaseParticle(p);
            }).start();
          };
          for (var _iterator4 = _createForOfIteratorHelperLoose(cells), _step4; !(_step4 = _iterator4()).done;) {
            _loop2();
          }
        };
        _proto.beginBorder = function beginBorder(frameSpan) {
          var border = this.border;
          if (!border) return;
          var thickness = this.borderThickness;
          var apply = function apply() {
            var k = thickness.s;
            var size = frameSpan / k + BORDER_RING_INSET * 2;
            border.node.setScale(k, k, 1);
            border.ui.setContentSize(size, size);
          };
          thickness.s = BORDER_FLASH_THICKNESS;
          apply();
          border.opacity.opacity = 0;
          border.node.active = true;
          tween(thickness).to(BORDER_FLASH_TIME, {
            s: BORDER_BASE_THICKNESS
          }, {
            easing: 'quadOut',
            onUpdate: apply
          }).start();
          tween(border.opacity).to(BORDER_GLOW_IN, {
            opacity: 255
          }, {
            easing: 'quadOut'
          }).start();
        };
        _proto.fadeBorderOut = function fadeBorderOut() {
          var border = this.border;
          if (!border) return;
          Tween.stopAllByTarget(border.opacity);
          tween(border.opacity).to(BORDER_GLOW_OUT, {
            opacity: 0
          }, {
            easing: 'quadIn'
          }).start();
        };
        _proto.revealPraise = function revealPraise() {
          var root = this.lettersRoot;
          if (!root || this.letters.length === 0) return;
          if (this.lettersOpacity) this.lettersOpacity.opacity = 255;
          root.active = true;

          // Letters furthest from the centre wait longest, so the pop rolls outward from the middle.
          var maxAbsX = 0;
          for (var _iterator5 = _createForOfIteratorHelperLoose(this.letters), _step5; !(_step5 = _iterator5()).done;) {
            var letter = _step5.value;
            maxAbsX = Math.max(maxAbsX, Math.abs(letter.position.x));
          }
          for (var _iterator6 = _createForOfIteratorHelperLoose(this.letters), _step6; !(_step6 = _iterator6()).done;) {
            var _letter = _step6.value;
            _letter.setScale(0, 0, 1);
            var fraction = maxAbsX > 0 ? Math.abs(_letter.position.x) / maxAbsX : 0;
            tween(_letter).delay(fraction * LETTER_SPREAD).to(LETTER_POP_UP, {
              scale: new Vec3(LETTER_POP_SCALE, LETTER_POP_SCALE, 1)
            }, {
              easing: 'backOut'
            }).to(LETTER_POP_SETTLE, {
              scale: new Vec3(1, 1, 1)
            }, {
              easing: 'backIn'
            }).start();
          }
        };
        _proto.animFadeOut = /*#__PURE__*/function () {
          var _animFadeOut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (this.lettersOpacity) {
                    _context2.next = 2;
                    break;
                  }
                  return _context2.abrupt("return");
                case 2:
                  _context2.next = 4;
                  return runTweenAsync(tween(this.lettersOpacity).to(FADE_OUT, {
                    opacity: 0
                  }));
                case 4:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function animFadeOut() {
            return _animFadeOut.apply(this, arguments);
          }
          return animFadeOut;
        }();
        _proto.prewarm = function prewarm(count) {
          while (this.particles.length < count) this.particlesFree.push(this.createParticle());
        };
        _proto.createParticle = function createParticle() {
          var node = new Node('cb-particle');
          node.active = false;
          node.layer = this.node.layer;
          var ui = node.addComponent(UITransform);
          var sprite = node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          node.parent = this.node;
          var p = {
            node: node,
            sprite: sprite,
            ui: ui,
            proxy: {
              t: 0
            }
          };
          this.particles.push(p);
          return p;
        };
        _proto.acquireParticle = function acquireParticle(frame, size) {
          var _this$particlesFree$p;
          var p = (_this$particlesFree$p = this.particlesFree.pop()) != null ? _this$particlesFree$p : this.createParticle();
          p.node.active = true;
          p.node.setScale(1, 1, 1);
          p.sprite.spriteFrame = frame;
          p.ui.setContentSize(size, size);
          return p;
        }

        // The flight tween has already finished when this runs, so it skips `Tween.stopAllByTarget` —
        // that scans every live tween, making a 64-particle wipe O(n²). `stopAll` handles interrupts.
        ;

        _proto.releaseParticle = function releaseParticle(p) {
          if (!p.node.active) return;
          p.node.active = false;
          this.particlesFree.push(p);
        };
        _proto.ensureLayers = function ensureLayers() {
          if (this.border === null && this.rainbowBorder) {
            this.border = this.buildSpriteLayer('clear-board-border', this.rainbowBorder);
          }
          if (this.letters.length === 0 && this.lettersRoot) {
            var _root$getComponent;
            var root = this.lettersRoot;
            this.lettersOpacity = (_root$getComponent = root.getComponent(UIOpacity)) != null ? _root$getComponent : root.addComponent(UIOpacity);
            root.active = false;
            for (var _iterator7 = _createForOfIteratorHelperLoose(root.children), _step7; !(_step7 = _iterator7()).done;) {
              var letter = _step7.value;
              this.letters.push(letter);
            }
          }
        };
        _proto.buildSpriteLayer = function buildSpriteLayer(name, frame) {
          var node = new Node(name);
          node.layer = this.node.layer;
          var ui = node.addComponent(UITransform);
          var opacity = node.addComponent(UIOpacity);
          var sprite = node.addComponent(Sprite);
          sprite.spriteFrame = frame;
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          sprite.type = Sprite.Type.SLICED;
          node.parent = this.node;
          node.active = false;
          return {
            node: node,
            ui: ui,
            opacity: opacity
          };
        };
        _proto.hideAll = function hideAll() {
          if (this.border) this.border.node.active = false;
          if (this.lettersRoot) this.lettersRoot.active = false;
        };
        _proto.delay = function delay(seconds) {
          var _this6 = this;
          return new Promise(function (resolve) {
            return _this6.scheduleOnce(resolve, seconds);
          });
        };
        return ClearBoardEffect;
      }(Component), _class3.IMPACT_DELAY = FILL_TOTAL + DESCEND_TOTAL, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rainbowBorder", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lettersRoot", [_dec3], {
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

System.register("chunks:///_virtual/constants.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Color, Vec2;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Color = module.Color;
      Vec2 = module.Vec2;
    }],
    execute: function () {
      exports('getDef', getDef);
      cclegacy._RF.push({}, "aa1f6QVB4NJdLc5BMnmqAMt", "constants", undefined);
      var GRID_SIZE = exports('GRID_SIZE', 8);
      var CELL_SIZE = exports('CELL_SIZE', 120);
      var EFFECT_RED = exports('EFFECT_RED', new Color(232, 76, 61, 255));
      var EFFECT_ORANGE = exports('EFFECT_ORANGE', new Color(255, 165, 0, 255));
      var EFFECT_YELLOW = exports('EFFECT_YELLOW', new Color(255, 251, 51, 255));
      var EFFECT_GREEN = exports('EFFECT_GREEN', new Color(51, 255, 87, 255));
      var EFFECT_SKY_BLUE = exports('EFFECT_SKY_BLUE', new Color(80, 200, 255, 255));
      var EFFECT_BLUE = exports('EFFECT_BLUE', new Color(65, 105, 255, 255));
      var EFFECT_PURPLE = exports('EFFECT_PURPLE', new Color(180, 55, 235, 255));
      var EFFECT_SPECTRUM = exports('EFFECT_SPECTRUM', [EFFECT_RED, EFFECT_ORANGE, EFFECT_YELLOW, EFFECT_GREEN, EFFECT_SKY_BLUE, EFFECT_BLUE, EFFECT_PURPLE]);
      var RAINBOW_CELL_COLOR_INDEX = exports('RAINBOW_CELL_COLOR_INDEX', [6, 5, 4, 3, 3, 2, 1, 0]);
      var MIN_SPAWN_CELLS = exports('MIN_SPAWN_CELLS', 4);
      function buildDef(id, shape) {
        var mask = 0n;
        var maxR = 0;
        var maxC = 0;
        for (var _iterator = _createForOfIteratorHelperLoose(shape), _step; !(_step = _iterator()).done;) {
          var p = _step.value;
          mask |= 1n << BigInt(p.y * GRID_SIZE + p.x);
          if (p.y > maxR) maxR = p.y;
          if (p.x > maxC) maxC = p.x;
        }
        return {
          id: id,
          shape: shape,
          mask: mask,
          maxR: maxR,
          maxC: maxC,
          reserved: shape.length < MIN_SPAWN_CELLS
        };
      }
      var BLOCK_LIBRARY = exports('BLOCK_LIBRARY', [buildDef('1x1', [new Vec2(0, 0)]), buildDef('2x1_V', [new Vec2(0, 0), new Vec2(0, 1)]), buildDef('2x1_H', [new Vec2(0, 0), new Vec2(1, 0)]), buildDef('Diag2_R', [new Vec2(0, 1), new Vec2(1, 0)]), buildDef('Diag2_L', [new Vec2(0, 0), new Vec2(1, 1)]), buildDef('3x1_V', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2)]), buildDef('3x1_H', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0)]), buildDef('Diag3_R', [new Vec2(0, 2), new Vec2(1, 1), new Vec2(2, 0)]), buildDef('Diag3_L', [new Vec2(0, 0), new Vec2(1, 1), new Vec2(2, 2)]), buildDef('L3_1', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(0, 1)]), buildDef('L3_2', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(1, 1)]), buildDef('L3_3', [new Vec2(0, 1), new Vec2(1, 0), new Vec2(1, 1)]), buildDef('L3_4', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 1)]), buildDef('4x1_V', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(0, 3)]), buildDef('Sq_2x2', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(0, 1), new Vec2(1, 1)]), buildDef('T4_1', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(1, 1)]), buildDef('T4_2', [new Vec2(0, 1), new Vec2(1, 0), new Vec2(1, 1), new Vec2(1, 2)]), buildDef('T4_3', [new Vec2(0, 1), new Vec2(1, 0), new Vec2(1, 1), new Vec2(2, 1)]), buildDef('T4_4', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(1, 1)]), buildDef('Z4_1', [new Vec2(0, 1), new Vec2(1, 0), new Vec2(1, 1), new Vec2(2, 0)]), buildDef('Z4_2', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 1), new Vec2(1, 2)]), buildDef('S4_1', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(1, 1), new Vec2(2, 1)]), buildDef('S4_2', [new Vec2(1, 0), new Vec2(0, 1), new Vec2(1, 1), new Vec2(0, 2)]), buildDef('4x1_H', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(3, 0)]), buildDef('L4_1', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(1, 2)]), buildDef('L4_2', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(0, 1)]), buildDef('L4_3', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(1, 1), new Vec2(1, 2)]), buildDef('L4_4', [new Vec2(2, 0), new Vec2(0, 1), new Vec2(1, 1), new Vec2(2, 1)]), buildDef('J4_1', [new Vec2(1, 0), new Vec2(1, 1), new Vec2(0, 2), new Vec2(1, 2)]), buildDef('J4_2', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(1, 1), new Vec2(2, 1)]), buildDef('J4_3', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(0, 1), new Vec2(0, 2)]), buildDef('J4_4', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(2, 1)]), buildDef('5x1_V', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(0, 3), new Vec2(0, 4)]), buildDef('5x1_H', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(3, 0), new Vec2(4, 0)]), buildDef('BigL_1', [new Vec2(0, 0), new Vec2(0, 1), new Vec2(0, 2), new Vec2(1, 2), new Vec2(2, 2)]), buildDef('BigL_2', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(2, 1), new Vec2(2, 2)]), buildDef('BigL_3', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(0, 1), new Vec2(0, 2)]), buildDef('BigL_4', [new Vec2(2, 0), new Vec2(2, 1), new Vec2(0, 2), new Vec2(1, 2), new Vec2(2, 2)]), buildDef('Rect_3x2', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(0, 1), new Vec2(1, 1), new Vec2(2, 1)]), buildDef('Rect_2x3', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(0, 1), new Vec2(1, 1), new Vec2(0, 2), new Vec2(1, 2)]), buildDef('Sq_3x3', [new Vec2(0, 0), new Vec2(1, 0), new Vec2(2, 0), new Vec2(0, 1), new Vec2(1, 1), new Vec2(2, 1), new Vec2(0, 2), new Vec2(1, 2), new Vec2(2, 2)])]);
      var SPAWN_LIBRARY = exports('SPAWN_LIBRARY', BLOCK_LIBRARY.filter(function (d) {
        return !d.reserved;
      }));
      var BLOCK_BY_ID = new Map(BLOCK_LIBRARY.map(function (d) {
        return [d.id, d];
      }));
      function getDef(id) {
        var def = BLOCK_BY_ID.get(id);
        if (!def) throw new Error("Unknown block id: " + id);
        return def;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/CurrencyCounter.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './WalletService.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Enum, Label, Tween, tween, Component, WalletService;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      Label = module.Label;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      WalletService = module.WalletService;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "5a91eY8LUdLGJ5zDE+KG20p", "CurrencyCounter", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var COUNT_TIME = 0.6;
      var Currency = exports('Currency', /*#__PURE__*/function (Currency) {
        Currency[Currency["COIN"] = 0] = "COIN";
        Currency[Currency["HEART"] = 1] = "HEART";
        return Currency;
      }({}));
      Enum(Currency);
      var CurrencyCounter = exports('CurrencyCounter', (_dec = ccclass('CurrencyCounter'), _dec2 = property({
        type: Enum(Currency)
      }), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(CurrencyCounter, _Component);
        function CurrencyCounter() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "currency", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "valueLabel", _descriptor2, _assertThisInitialized(_this));
          _this.proxy = {
            v: 0
          };
          _this.shown = 0;
          return _this;
        }
        var _proto = CurrencyCounter.prototype;
        _proto.refresh = function refresh() {
          Tween.stopAllByTarget(this.proxy);
          this.shown = this.balance();
          this.render(this.shown);
        };
        _proto.animToWallet = function animToWallet() {
          this.animTo(this.balance());
        };
        _proto.animTo = function animTo(target) {
          var _this2 = this;
          Tween.stopAllByTarget(this.proxy);
          var from = this.shown;
          this.shown = target;
          if (target === from) {
            this.render(target);
            return;
          }
          this.proxy.v = from;
          tween(this.proxy).to(COUNT_TIME, {
            v: target
          }, {
            easing: 'sineOut',
            onUpdate: function onUpdate() {
              return _this2.render(Math.round(_this2.proxy.v));
            }
          }).call(function () {
            return _this2.render(target);
          }).start();
        };
        _proto.balance = function balance() {
          var wallet = WalletService.get();
          return this.currency === Currency.HEART ? wallet.hearts : wallet.coins;
        };
        _proto.render = function render(value) {
          if (this.valueLabel) this.valueLabel.string = "" + value;
        };
        return CurrencyCounter;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currency", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return Currency.COIN;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "valueLabel", [_dec3], {
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

System.register("chunks:///_virtual/DailyQuestLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DailyQuests.ts', './DailyQuestService.ts', './DataManager.ts', './ModeUtils.ts', './WalletService.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, toDayKey, pickForDay, getQuestDefinition, formatQuestLabel, rollOver, unclaimedReward, claimQuest, startRun, applyEvent, isDayComplete, EMPTY_DAILY_PROGRESS, DataManager, ModeUtils, GAME_MODE, WalletService;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      toDayKey = module.toDayKey;
      pickForDay = module.pickForDay;
      getQuestDefinition = module.getQuestDefinition;
      formatQuestLabel = module.formatQuestLabel;
    }, function (module) {
      rollOver = module.rollOver;
      unclaimedReward = module.unclaimedReward;
      claimQuest = module.claimQuest;
      startRun = module.startRun;
      applyEvent = module.applyEvent;
      isDayComplete = module.isDayComplete;
      EMPTY_DAILY_PROGRESS = module.EMPTY_DAILY_PROGRESS;
    }, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      ModeUtils = module.default;
      GAME_MODE = module.GAME_MODE;
    }, function (module) {
      WalletService = module.WalletService;
    }],
    execute: function () {
      cclegacy._RF.push({}, "ee145UxRMxG6YjOHXE8vgRX", "DailyQuestLogic", undefined);
      var TOAST_TEXT = 'Completed quest!';
      function sameQuestIds(a, b) {
        if (!b || a.questIds.length !== b.questIds.length) return false;
        return a.questIds.every(function (id, i) {
          return id === b.questIds[i];
        });
      }
      var DailyQuestLogic = exports('DailyQuestLogic', /*#__PURE__*/function () {
        function DailyQuestLogic(gm) {
          this.gm = void 0;
          this.state = void 0;
          this.dirty = false;
          this.gm = gm;
          this.state = EMPTY_DAILY_PROGRESS;
          this.rollTo(DataManager.getPlayerData('daily'));
        }
        var _proto = DailyQuestLogic.prototype;
        _proto.refreshDay = function refreshDay() {
          this.rollTo(this.state);
        }

        // Both entry points roll through here so a quest completed but never claimed pays out instead
        // of being wiped by the new day — the app-restart path is the common one.
        ;

        _proto.rollTo = function rollTo(stored) {
          var rolled = rollOver(stored, toDayKey(new Date()));
          if (rolled === this.state) return;

          // Also sweeps when the day's quest set changed under a stored record — a shipped change to
          // the quest line-up rebuilds it on the same day key, which would otherwise drop a completed
          // quest's unclaimed coins.
          var swept = stored ? unclaimedReward(stored) : 0;
          var rebuilt = rolled.dayKey !== (stored == null ? void 0 : stored.dayKey) || !sameQuestIds(rolled, stored);
          if (rebuilt && swept > 0) WalletService.addCoins(swept);
          this.state = rolled;
          this.dirty = true;
          // The sweep already paid into the wallet, so the rolled record has to hit disk now — a
          // session that never starts a run would otherwise replay yesterday's payout on next launch.
          this.flush();
        };
        _proto.claim = function claim(index) {
          var result = claimQuest(this.state, index);
          if (result.coinsGained === 0) return 0;
          this.state = result.state;
          this.dirty = true;
          WalletService.addCoins(result.coinsGained);
          this.flush();
          return result.coinsGained;
        };
        _proto.getState = function getState() {
          return this.state;
        };
        _proto.getTodayQuests = function getTodayQuests() {
          return pickForDay(this.state.dayKey);
        };
        _proto.onRunStarted = function onRunStarted() {
          this.refreshDay();
          this.state = startRun(this.state);
        };
        _proto.onTurnEnd = function onTurnEnd(lineCount, boardCleared, combo, total) {
          var mode = this.questMode();
          if (!mode) return;
          if (mode === 'classic') {
            if (lineCount > 0) this.record(mode, 'linesInMove', lineCount);
            if (combo > 0) this.record(mode, 'combo', combo);
            if (boardCleared) this.record(mode, 'boardClear', 1);
            this.record(mode, 'score', total);
            return;
          }
          var gems = this.gm.getAdventureLogic().getLastCollected();
          if (gems > 0) this.record(mode, 'gems', gems);
        };
        _proto.onAdventureLevelCleared = function onAdventureLevelCleared() {
          this.record('adventure', 'levels', 1);
          this.flush();
        };
        _proto.flush = function flush() {
          if (!this.dirty) return;
          DataManager.setPlayerData('daily', this.state);
          this.dirty = false;
        };
        _proto.questMode = function questMode() {
          switch (ModeUtils.getInstance().getCurrentMode()) {
            case GAME_MODE.CLASSIC:
              return 'classic';
            case GAME_MODE.ADVENTURE:
              return 'adventure';
            default:
              return null;
          }
        };
        _proto.record = function record(mode, metric, value) {
          var result = applyEvent(this.state, {
            mode: mode,
            metric: metric,
            value: value
          });
          if (result.state === this.state) return;
          this.state = result.state;
          this.dirty = true;
          for (var _iterator = _createForOfIteratorHelperLoose(result.completedIds), _step; !(_step = _iterator()).done;) {
            var id = _step.value;
            this.showToast(id);
          }
          if (result.dayCompleted) this.flush();
        };
        _proto.showToast = function showToast(questId) {
          if (!getQuestDefinition(questId)) return;
          var toast = this.gm.getGameScreen().getQuestToast();
          if (!toast) {
            console.warn("[DailyQuest] \"" + questId + "\" completed but GameScreen has no questToast ref");
            return;
          }
          toast.show(TOAST_TEXT);
        };
        _proto.isDayComplete = function isDayComplete$1() {
          return isDayComplete(this.state);
        };
        _proto.getCompletedCount = function getCompletedCount() {
          return this.state.completed.filter(Boolean).length;
        };
        _proto.getQuestCount = function getQuestCount() {
          return this.state.questIds.length;
        };
        _proto.buildScreenData = function buildScreenData() {
          var _this = this;
          this.refreshDay();
          return {
            rows: this.getTodayQuests().map(function (quest, i) {
              var _this$state$completed, _this$state$claimed$i, _this$state$progress$, _def$reward$amount;
              var def = getQuestDefinition(quest.id);
              var done = (_this$state$completed = _this.state.completed[i]) != null ? _this$state$completed : false;
              var claimed = (_this$state$claimed$i = _this.state.claimed[i]) != null ? _this$state$claimed$i : false;
              return {
                label: def ? formatQuestLabel(def, quest.target) : quest.id,
                progress: (_this$state$progress$ = _this.state.progress[i]) != null ? _this$state$progress$ : 0,
                target: quest.target,
                done: done,
                claimable: done && !claimed,
                claimed: claimed,
                reward: (_def$reward$amount = def == null ? void 0 : def.reward.amount) != null ? _def$reward$amount : 0
              };
            }),
            streak: this.state.streak,
            coins: WalletService.get().coins
          };
        };
        return DailyQuestLogic;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DailyQuestRow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Sprite, Button, Tween, Vec3, tween, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Sprite = module.Sprite;
      Button = module.Button;
      Tween = module.Tween;
      Vec3 = module.Vec3;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "ab1fe9gbO1L459vqGoDFjA5", "DailyQuestRow", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PULSE_TIME = 0.5;
      var PULSE_SCALE = 1.08;

      /**
       * One quest line in the daily quest screen. Owns its own refs, claim button and pulse, and reports
       * a claim through `onClaim` rather than emitting a scene event — the screen knows the row's index,
       * the row does not.
       */
      var DailyQuestRow = exports('DailyQuestRow', (_dec = ccclass('DailyQuestRow'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Sprite), _dec5 = property(Label), _dec6 = property(Button), _dec7 = property(Sprite), _dec8 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(DailyQuestRow, _Component);
        function DailyQuestRow() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "questLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "questCounter", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "questFill", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rewardLabel", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "claimButton", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "claimSprite", _descriptor6, _assertThisInitialized(_this));
          /** The button's face behind `claimSprite`. Greyed with it so the whole button reads as one. */
          _initializerDefineProperty(_this, "claimBackground", _descriptor7, _assertThisInitialized(_this));
          _this.onClaim = null;
          return _this;
        }
        var _proto = DailyQuestRow.prototype;
        _proto.__preload = function __preload() {
          var _this$claimButton;
          (_this$claimButton = this.claimButton) == null || _this$claimButton.node.on(Button.EventType.CLICK, this.handleClickClaim, this);
        };
        _proto.onDestroy = function onDestroy() {
          var _this$claimButton2;
          (_this$claimButton2 = this.claimButton) == null || _this$claimButton2.node.off(Button.EventType.CLICK, this.handleClickClaim, this);
        };
        _proto.render = function render(row) {
          this.node.active = true;
          if (this.questLabel) this.questLabel.string = row.label;
          if (this.questCounter) this.questCounter.string = row.progress + "/" + row.target;
          if (this.questFill) {
            this.questFill.fillRange = row.target > 0 ? row.progress / row.target : 0;
          }
          if (this.rewardLabel) this.rewardLabel.string = "x" + row.reward;
          this.renderClaim(row);
        };
        _proto.hide = function hide() {
          this.stopPulse();
          this.node.active = false;
        }

        /** Leaves the row visible; only drops the repeating tween so a closed screen animates nothing. */;
        _proto.rest = function rest() {
          this.stopPulse();
        }

        /** Greys the button the moment it is tapped, before the screen reopens with fresh data. */;
        _proto.markClaimPending = function markClaimPending() {
          this.stopPulse();
          this.setClaimGrayscale(true);
          if (this.claimButton) this.claimButton.interactable = false;
        };
        _proto.setClaimGrayscale = function setClaimGrayscale(gray) {
          if (this.claimSprite) this.claimSprite.grayscale = gray;
          if (this.claimBackground) this.claimBackground.grayscale = gray;
        }

        /**
         * The button is the row's only state indicator, and it stays on screen for all three:
         * greyed while the quest is in progress, lit and pulsing once it can be claimed, greyed
         * again after claiming.
         */;
        _proto.renderClaim = function renderClaim(row) {
          this.setClaimGrayscale(!row.claimable);
          var button = this.claimButton;
          if (!button) return;
          button.node.active = true;
          button.interactable = row.claimable;
          if (row.claimable) this.startPulse(button.node);else this.stopPulse();
        };
        _proto.startPulse = function startPulse(node) {
          Tween.stopAllByTarget(node);
          node.setScale(Vec3.ONE);
          tween(node).repeatForever(tween(node).to(PULSE_TIME, {
            scale: new Vec3(PULSE_SCALE, PULSE_SCALE, 1)
          }, {
            easing: 'sineOut'
          }).to(PULSE_TIME, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'sineIn'
          })).start();
        };
        _proto.stopPulse = function stopPulse() {
          var _this$claimButton3;
          var node = (_this$claimButton3 = this.claimButton) == null ? void 0 : _this$claimButton3.node;
          if (!node) return;
          Tween.stopAllByTarget(node);
          node.setScale(Vec3.ONE);
        };
        _proto.handleClickClaim = function handleClickClaim() {
          var _this$onClaim;
          this.markClaimPending();
          (_this$onClaim = this.onClaim) == null || _this$onClaim.call(this);
        };
        return DailyQuestRow;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "questLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "questCounter", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "questFill", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rewardLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "claimButton", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "claimSprite", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "claimBackground", [_dec8], {
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

System.register("chunks:///_virtual/DailyQuests.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        formatQuestLabel: formatQuestLabel,
        getQuestDebug: getQuestDebug,
        getQuestDefinition: getQuestDefinition,
        pickForDay: pickForDay,
        previousDayKey: previousDayKey,
        setQuestDebug: setQuestDebug,
        toDayKey: toDayKey
      });
      cclegacy._RF.push({}, "cf3b9QbHzdKE7Bt8+y6zfy0", "DailyQuests", undefined);
      var coins = function coins(amount) {
        return {
          type: 'coin',
          amount: amount
        };
      };
      var QUEST_LIBRARY = exports('QUEST_LIBRARY', [{
        id: 'classicScore',
        mode: 'classic',
        metric: 'score',
        scope: 'run',
        accumulate: 'max',
        targets: [30000, 40000, 50000, 60000, 70000],
        reward: coins(2),
        label: 'Score {n} in one run'
      }, {
        id: 'classicBigClear5',
        mode: 'classic',
        metric: 'linesInMove',
        scope: 'day',
        accumulate: 'count',
        threshold: 5,
        targets: [1],
        reward: coins(4),
        label: 'Clear 5 lines at once, {n}x'
      }, {
        id: 'classicBigClear4',
        mode: 'classic',
        metric: 'linesInMove',
        scope: 'day',
        accumulate: 'count',
        threshold: 4,
        targets: [3, 4],
        reward: coins(3),
        label: 'Clear 4 lines at once, {n}x'
      }, {
        id: 'classicCombo',
        mode: 'classic',
        metric: 'combo',
        scope: 'day',
        accumulate: 'max',
        targets: [4, 5, 6],
        reward: coins(1),
        label: 'Reach a x{n} combo'
      }, {
        id: 'classicBoardClear',
        mode: 'classic',
        metric: 'boardClear',
        scope: 'day',
        accumulate: 'count',
        targets: [5, 6, 7],
        reward: coins(2),
        label: 'Clear the board {n}x'
      }, {
        id: 'classicBoardClearRun',
        mode: 'classic',
        metric: 'boardClear',
        scope: 'run',
        accumulate: 'count',
        targets: [3, 4, 5],
        reward: coins(3),
        label: 'Clear the board {n}x in a run'
      }, {
        id: 'advGems',
        mode: 'adventure',
        metric: 'gems',
        scope: 'day',
        accumulate: 'count',
        targets: [10, 15, 20],
        reward: coins(1),
        label: 'Collect {n} Adventure gems'
      }, {
        id: 'advLevels',
        mode: 'adventure',
        metric: 'levels',
        scope: 'day',
        accumulate: 'count',
        targets: [1, 2, 3],
        reward: coins(2),
        label: 'Clear {n} Adventure levels'
      }]);
      var QUEST_BY_ID = new Map(QUEST_LIBRARY.map(function (q) {
        return [q.id, q];
      }));
      function getQuestDefinition(id) {
        return QUEST_BY_ID.get(id);
      }
      var CLASSIC_PER_DAY = exports('CLASSIC_PER_DAY', 2);
      var ADVENTURE_PER_DAY = exports('ADVENTURE_PER_DAY', 1);
      var QUESTS_PER_DAY = exports('QUESTS_PER_DAY', CLASSIC_PER_DAY + ADVENTURE_PER_DAY);
      var CLASSIC_POOL = QUEST_LIBRARY.filter(function (q) {
        return q.mode === 'classic';
      });
      var ADVENTURE_POOL = QUEST_LIBRARY.filter(function (q) {
        return q.mode === 'adventure';
      });
      var MS_PER_DAY = 86400000;
      function toDayKey(date) {
        var month = ("" + (date.getMonth() + 1)).padStart(2, '0');
        var day = ("" + date.getDate()).padStart(2, '0');
        return date.getFullYear() + "-" + month + "-" + day;
      }
      function previousDayKey(dayKey) {
        var _dayKey$split$map = dayKey.split('-').map(Number),
          year = _dayKey$split$map[0],
          month = _dayKey$split$map[1],
          day = _dayKey$split$map[2];
        var date = new Date(year, month - 1, day);
        date.setDate(date.getDate() - 1);
        return toDayKey(date);
      }
      function dayNumber(dayKey) {
        var _dayKey$split$map2 = dayKey.split('-').map(Number),
          year = _dayKey$split$map2[0],
          month = _dayKey$split$map2[1],
          day = _dayKey$split$map2[2];
        return Math.floor(Date.UTC(year, month - 1, day) / MS_PER_DAY);
      }
      function hashDayKey(dayKey) {
        var hash = 2166136261;
        for (var i = 0; i < dayKey.length; i++) {
          hash ^= dayKey.charCodeAt(i);
          hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
      }
      function createRng(seed) {
        var state = seed >>> 0;
        return function () {
          state = state + 0x6d2b79f5 >>> 0;
          var t = state;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
      }
      function pickOne(items, rng) {
        return items[Math.floor(rng() * items.length)];
      }
      function toDailyQuest(def, rng) {
        var _questDebug$target;
        var rolled = pickOne(def.targets, rng);
        return {
          id: def.id,
          target: (_questDebug$target = questDebug.target) != null ? _questDebug$target : rolled
        };
      }
      function shuffled(defs, rng) {
        var order = [].concat(defs);
        for (var i = order.length - 1; i > 0; i--) {
          var j = Math.floor(rng() * (i + 1));
          var _ref = [order[j], order[i]];
          order[i] = _ref[0];
          order[j] = _ref[1];
        }
        return order;
      }
      function cycleOrder(pool, key, cycle) {
        return shuffled(pool, createRng(hashDayKey(key + "-cycle-" + cycle)));
      }

      /**
       * Swaps any of today's picks that also appeared on the cycle's last day further down the order,
       * so a reshuffle can't hand the same quest twice running across a cycle boundary.
       */
      function avoidRepeat(order, previousTail, perDay) {
        for (var i = 0; i < perDay && i < order.length; i++) {
          if (!previousTail.includes(order[i].id)) continue;
          for (var j = perDay; j < order.length; j++) {
            if (previousTail.includes(order[j].id)) continue;
            var _ref2 = [order[j], order[i]];
            order[i] = _ref2[0];
            order[j] = _ref2[1];
            break;
          }
        }
      }

      /**
       * The `perDay` quests this pool hands out on `day`. Each cycle reshuffles the pool and walks it
       * `perDay` at a time, so every quest is dealt once before any repeats. A pool that doesn't divide
       * evenly drops its remainder from that cycle and reshuffles it into the next.
       */
      function rotationFor(pool, perDay, day, key) {
        var daysPerCycle = Math.floor(pool.length / perDay);
        if (daysPerCycle <= 0) return [].concat(pool).slice(0, perDay);
        var cycle = Math.floor(day / daysPerCycle);
        var slot = day - cycle * daysPerCycle;

        // Adjusted for the whole cycle, not just its first day: every slot re-derives this order, so
        // adjusting it only on slot 0 would deal the swapped quest twice in one cycle.
        var order = cycleOrder(pool, key, cycle);
        if (cycle > 0) {
          var previous = cycleOrder(pool, key, cycle - 1);
          var tailStart = (daysPerCycle - 1) * perDay;
          avoidRepeat(order, previous.slice(tailStart, tailStart + perDay).map(function (d) {
            return d.id;
          }), perDay);
        }
        return order.slice(slot * perDay, slot * perDay + perDay);
      }
      function defsForDay(day) {
        return [].concat(rotationFor(CLASSIC_POOL, CLASSIC_PER_DAY, day, 'classic'), rotationFor(ADVENTURE_POOL, ADVENTURE_PER_DAY, day, 'adventure'));
      }
      var questDebug = {
        questId: null,
        randomize: false,
        target: null
      };
      var randomizedDays = new Map();
      var debugResolved = false;
      function setQuestDebug(options) {
        Object.assign(questDebug, options);
        randomizedDays.clear();
        debugResolved = true;
      }
      function getQuestDebug() {
        resolveQuestDebug();
        return questDebug;
      }
      function resolveQuestDebug() {
        var _location$search, _params$get;
        if (debugResolved) return;
        debugResolved = true;
        var search = typeof location === 'undefined' ? '' : (_location$search = location.search) != null ? _location$search : '';
        if (!search) return;
        var params = new URLSearchParams(search);
        var forced = params.get('quest');
        if (forced && QUEST_BY_ID.has(forced)) questDebug.questId = forced;
        if (params.get('questRandom') === '1') questDebug.randomize = true;
        var target = Number.parseInt((_params$get = params.get('questTarget')) != null ? _params$get : '', 10);
        if (Number.isFinite(target) && target > 0) questDebug.target = target;
      }
      function pickForDay(dayKey) {
        resolveQuestDebug();
        var rng = createRng(hashDayKey(dayKey));
        var day = dayNumber(dayKey);
        if (questDebug.questId) {
          var forced = QUEST_BY_ID.get(questDebug.questId);
          if (forced) {
            var rest = defsForDay(day).filter(function (d) {
              return d.id !== forced.id;
            });
            return [forced].concat(rest.slice(0, QUESTS_PER_DAY - 1)).map(function (d) {
              return toDailyQuest(d, rng);
            });
          }
        }
        if (questDebug.randomize) {
          // Keep a randomized day stable for every caller in the current session.
          var cached = randomizedDays.get(dayKey);
          if (cached) return cached;
          var picked = [].concat(pickDistinct(CLASSIC_POOL, CLASSIC_PER_DAY), pickDistinct(ADVENTURE_POOL, ADVENTURE_PER_DAY)).map(function (d) {
            return toDailyQuest(d, rng);
          });
          randomizedDays.set(dayKey, picked);
          return picked;
        }
        return defsForDay(day).map(function (def) {
          return toDailyQuest(def, rng);
        });
      }
      function pickDistinct(pool, count) {
        var remaining = [].concat(pool);
        var picked = [];
        while (picked.length < count && remaining.length > 0) {
          picked.push(remaining.splice(Math.floor(Math.random() * remaining.length), 1)[0]);
        }
        return picked;
      }
      function formatQuestLabel(def, target) {
        return def.label.replace('{n}', "" + target);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DailyQuestService.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DailyQuests.ts'], function (exports) {
  var _extends, cclegacy, pickForDay, previousDayKey, getQuestDefinition;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      pickForDay = module.pickForDay;
      previousDayKey = module.previousDayKey;
      getQuestDefinition = module.getQuestDefinition;
      var _setter = {};
      _setter.previousDayKey = module.previousDayKey;
      _setter.toDayKey = module.toDayKey;
      exports(_setter);
    }],
    execute: function () {
      exports({
        applyEvent: applyEvent,
        claimQuest: claimQuest,
        createState: createState,
        isDayComplete: isDayComplete,
        rewardOf: rewardOf,
        rollOver: rollOver,
        startRun: startRun,
        unclaimedReward: unclaimedReward
      });
      cclegacy._RF.push({}, "ca367iSsExNM6dWXXbTyos+", "DailyQuestService", undefined);
      var HISTORY_LENGTH = exports('HISTORY_LENGTH', 7);
      var EMPTY_DAILY_PROGRESS = exports('EMPTY_DAILY_PROGRESS', {
        dayKey: '',
        questIds: [],
        progress: [],
        completed: [],
        claimed: [],
        streak: 0,
        lastEarnedDay: '',
        history: []
      });
      function questsOf(state) {
        return pickForDay(state.dayKey);
      }
      function createState(dayKey) {
        var quests = pickForDay(dayKey);
        return {
          dayKey: dayKey,
          questIds: quests.map(function (q) {
            return q.id;
          }),
          progress: quests.map(function () {
            return 0;
          }),
          completed: quests.map(function () {
            return false;
          }),
          claimed: quests.map(function () {
            return false;
          }),
          streak: 0,
          lastEarnedDay: '',
          history: []
        };
      }
      function isUsable(state) {
        return !!state && typeof state.dayKey === 'string' && state.dayKey.length > 0 && Array.isArray(state.questIds) && Array.isArray(state.progress) && Array.isArray(state.completed);
      }

      // Records saved before claiming existed have no `claimed` array, so every read of it goes through
      // here — an undefined one would make claim indexing silently do nothing.
      function claimedOf(state) {
        if (Array.isArray(state.claimed) && state.claimed.length === state.completed.length) {
          return state.claimed;
        }
        return state.completed.map(function (_, i) {
          var _state$claimed$i, _state$claimed;
          return (_state$claimed$i = (_state$claimed = state.claimed) == null ? void 0 : _state$claimed[i]) != null ? _state$claimed$i : false;
        });
      }
      function rollOver(state, todayKey) {
        var _state$lastEarnedDay, _state$history;
        if (!isUsable(state)) return createState(todayKey);
        var expected = pickForDay(state.dayKey).map(function (q) {
          return q.id;
        });
        var sameQuests = expected.length === state.questIds.length && expected.every(function (id, i) {
          return id === state.questIds[i];
        });
        if (state.dayKey === todayKey && sameQuests) {
          return state.claimed === claimedOf(state) ? state : _extends({}, state, {
            claimed: claimedOf(state)
          });
        }
        var kept = state.lastEarnedDay === previousDayKey(todayKey) ? state.streak : 0;
        return _extends({}, createState(todayKey), {
          streak: state.dayKey === todayKey ? state.streak : kept,
          lastEarnedDay: (_state$lastEarnedDay = state.lastEarnedDay) != null ? _state$lastEarnedDay : '',
          history: (_state$history = state.history) != null ? _state$history : []
        });
      }
      function startRun(state) {
        var quests = questsOf(state);
        var progress = state.progress.map(function (value, i) {
          var _quests$i$id, _quests$i;
          var def = getQuestDefinition((_quests$i$id = (_quests$i = quests[i]) == null ? void 0 : _quests$i.id) != null ? _quests$i$id : '');
          if (!def || def.scope !== 'run' || state.completed[i]) return value;
          return 0;
        });
        return _extends({}, state, {
          progress: progress
        });
      }
      function isDayComplete(state) {
        return state.completed.length > 0 && state.completed.every(Boolean);
      }
      function withEarnedDay(state) {
        var alreadyEarned = state.lastEarnedDay === state.dayKey;
        var history = state.history.filter(function (day) {
          return day !== state.dayKey;
        });
        history.push(state.dayKey);
        return _extends({}, state, {
          streak: alreadyEarned ? state.streak : state.streak + 1,
          lastEarnedDay: state.dayKey,
          history: history.slice(-HISTORY_LENGTH)
        });
      }
      function nextProgress(current, event, threshold, accumulate, metric) {
        if (metric === 'linesInMove') {
          return event.value >= (threshold != null ? threshold : 0) ? current + 1 : null;
        }
        if (accumulate === 'max') return Math.max(current, event.value);
        return current + event.value;
      }
      function rewardOf(state, index) {
        var _state$questIds$index, _def$reward$amount;
        var def = getQuestDefinition((_state$questIds$index = state.questIds[index]) != null ? _state$questIds$index : '');
        return (_def$reward$amount = def == null ? void 0 : def.reward.amount) != null ? _def$reward$amount : 0;
      }
      function unclaimedReward(state) {
        var claimed = claimedOf(state);
        return state.completed.reduce(function (total, done, i) {
          return done && !claimed[i] ? total + rewardOf(state, i) : total;
        }, 0);
      }
      function claimQuest(state, index) {
        var claimed = claimedOf(state);
        if (!state.completed[index] || claimed[index]) return {
          state: state,
          coinsGained: 0
        };
        var next = [].concat(claimed);
        next[index] = true;
        return {
          state: _extends({}, state, {
            claimed: next
          }),
          coinsGained: rewardOf(state, index)
        };
      }
      function applyEvent(state, event) {
        var quests = questsOf(state);
        var progress = [].concat(state.progress);
        var completed = [].concat(state.completed);
        var completedIds = [];
        for (var i = 0; i < quests.length; i++) {
          var _progress$i;
          if (completed[i]) continue;
          var quest = quests[i];
          var def = getQuestDefinition(quest.id);
          if (!def || def.mode !== event.mode || def.metric !== event.metric) continue;
          var _next = nextProgress((_progress$i = progress[i]) != null ? _progress$i : 0, event, def.threshold, def.accumulate, def.metric);
          if (_next === null) continue;
          progress[i] = Math.min(_next, quest.target);
          if (_next >= quest.target) {
            completed[i] = true;
            completedIds.push(def.id);
          }
        }
        var advanced = progress.some(function (value, i) {
          return value !== state.progress[i];
        });
        if (!advanced) return {
          state: state,
          completedIds: [],
          dayCompleted: false
        };
        var next = _extends({}, state, {
          progress: progress,
          completed: completed,
          claimed: claimedOf(state)
        });
        if (completedIds.length === 0) {
          return {
            state: next,
            completedIds: completedIds,
            dayCompleted: false
          };
        }

        // The streak counts days finished, not quests: it only advances once every quest is done.
        var dayCompleted = isDayComplete(next);
        return {
          state: dayCompleted ? withEarnedDay(next) : next,
          completedIds: completedIds,
          dayCompleted: dayCompleted
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DataManager.ts", ['cc', './DailyQuestService.ts'], function (exports) {
  var cclegacy, EMPTY_DAILY_PROGRESS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      EMPTY_DAILY_PROGRESS = module.EMPTY_DAILY_PROGRESS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d5c6bYi131GmJlupv0Z+f59", "DataManager", undefined);
      var DEFAULTS = {
        bestScore: 0,
        adventure: {
          unlocked: 1,
          best: {}
        },
        settings: {
          music: true,
          sound: true,
          vibrate: true
        },
        tutorialDone: false,
        daily: EMPTY_DAILY_PROGRESS,
        wallet: {
          coins: 0,
          hearts: 0
        }
      };
      var DataManager = exports('DataManager', {
        getPlayerData: function getPlayerData(key) {
          var _window$GameSDK;
          var data = (_window$GameSDK = window.GameSDK) == null ? void 0 : _window$GameSDK.getPlayerData();
          return data ? data[key] : DEFAULTS[key];
        },
        hasPlayerData: function hasPlayerData(key) {
          var _window$GameSDK2;
          var data = (_window$GameSDK2 = window.GameSDK) == null ? void 0 : _window$GameSDK2.getPlayerData();
          return !!data && data[key] !== undefined;
        },
        setPlayerData: function setPlayerData(key, value) {
          var _window$GameSDK3, _window$GameSDK3$setP;
          (_window$GameSDK3 = window.GameSDK) == null || _window$GameSDK3.setPlayerData((_window$GameSDK3$setP = {}, _window$GameSDK3$setP[key] = value, _window$GameSDK3$setP));
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Difficulty.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        getDifficultyConfig: getDifficultyConfig,
        getDirectorPacing: getDirectorPacing
      });
      cclegacy._RF.push({}, "52f6ezgJpRBq4gO8BPWs/dw", "Difficulty", undefined);
      var DIFFICULTY_TABLE = exports('DIFFICULTY_TABLE', [{
        preferTightFit: false,
        planner: {
          planInterval: 1,
          minBoardFill: 0.25,
          topK: 1,
          minClearsRequired: 2,
          hotSetupWeight: 40,
          freshnessBand: 20
        }
      }, {
        preferTightFit: false,
        planner: {
          planInterval: 1,
          minBoardFill: 0.25,
          topK: 1,
          minClearsRequired: 1,
          hotSetupWeight: 35,
          freshnessBand: 40
        }
      }, {
        preferTightFit: false,
        planner: {
          planInterval: 1,
          minBoardFill: 0.2,
          topK: 2,
          minClearsRequired: 1,
          hotSetupWeight: 25,
          freshnessBand: 60
        }
      }, {
        preferTightFit: true,
        planner: {
          planInterval: 2,
          minBoardFill: 0.2,
          topK: 3,
          minClearsRequired: 0,
          hotSetupWeight: 25,
          freshnessBand: 80
        }
      }]);
      var TIER_PEAKS = exports('TIER_PEAKS', [2999, 9999, 14999, 20000]);
      function lerp(a, b, t) {
        return a + (b - a) * t;
      }
      function getDifficultyConfig(score) {
        if (score <= TIER_PEAKS[0]) return DIFFICULTY_TABLE[0];
        var last = TIER_PEAKS.length - 1;
        if (score >= TIER_PEAKS[last]) return DIFFICULTY_TABLE[last];
        var hi = 1;
        while (score > TIER_PEAKS[hi]) hi++;
        var t = (score - TIER_PEAKS[hi - 1]) / (TIER_PEAKS[hi] - TIER_PEAKS[hi - 1]);
        var a = DIFFICULTY_TABLE[hi - 1];
        var b = DIFFICULTY_TABLE[hi];
        return {
          preferTightFit: (t < 0.5 ? a : b).preferTightFit,
          planner: {
            planInterval: Math.round(lerp(a.planner.planInterval, b.planner.planInterval, t)),
            minBoardFill: lerp(a.planner.minBoardFill, b.planner.minBoardFill, t),
            topK: Math.round(lerp(a.planner.topK, b.planner.topK, t)),
            minClearsRequired: Math.round(lerp(a.planner.minClearsRequired, b.planner.minClearsRequired, t)),
            hotSetupWeight: Math.round(lerp(a.planner.hotSetupWeight, b.planner.hotSetupWeight, t)),
            freshnessBand: Math.round(lerp(a.planner.freshnessBand, b.planner.freshnessBand, t))
          }
        };
      }
      var DIRECTOR_CONFIG = exports('DIRECTOR_CONFIG', {
        skillAlpha: 0.15,
        minSkillSamples: 10,
        lowSkill: 0.45,
        highSkill: 0.8,
        topKAdjust: 2,
        overdueRefSets: 10,
        minHotSetupWeight: 4,
        pityTurns: 2,
        minPercentileCandidates: 6,
        fragPityThreshold: 0.5,
        boardClearMaxCells: 28,
        comboTargetSets: 12,
        comboMinCells: 13,
        openingClearChance: 0.4,
        boardClearCooldownSets: 2
      });
      var DIRECTOR_PACING_TABLE = [{
        triggerBase: 0.2,
        triggerRamp: 0.1,
        windowSets: 7,
        maxClearsPerWindow: 5
      }, {
        triggerBase: 0.2,
        triggerRamp: 0.08,
        windowSets: 6,
        maxClearsPerWindow: 5
      }, {
        triggerBase: 0.15,
        triggerRamp: 0.05,
        windowSets: 5,
        maxClearsPerWindow: 4
      }, {
        triggerBase: 0.1,
        triggerRamp: 0.05,
        windowSets: 5,
        maxClearsPerWindow: 3
      }];
      function getDirectorPacing(score) {
        if (score <= TIER_PEAKS[0]) return DIRECTOR_PACING_TABLE[0];
        var last = TIER_PEAKS.length - 1;
        if (score >= TIER_PEAKS[last]) return DIRECTOR_PACING_TABLE[last];
        var hi = 1;
        while (score > TIER_PEAKS[hi]) hi++;
        var t = (score - TIER_PEAKS[hi - 1]) / (TIER_PEAKS[hi] - TIER_PEAKS[hi - 1]);
        var a = DIRECTOR_PACING_TABLE[hi - 1];
        var b = DIRECTOR_PACING_TABLE[hi];
        return {
          triggerBase: lerp(a.triggerBase, b.triggerBase, t),
          triggerRamp: lerp(a.triggerRamp, b.triggerRamp, t),
          windowSets: Math.round(lerp(a.windowSets, b.windowSets, t)),
          maxClearsPerWindow: Math.round(lerp(a.maxClearsPerWindow, b.maxClearsPerWindow, t))
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/DirectorLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './Difficulty.ts', './BitUtils.ts'], function (exports) {
  var _extends, cclegacy, GRID_SIZE, DIRECTOR_CONFIG, getDirectorPacing, CELL_SHIFTS, ROW_MASKS, COL_MASKS, snugness;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
    }, function (module) {
      DIRECTOR_CONFIG = module.DIRECTOR_CONFIG;
      getDirectorPacing = module.getDirectorPacing;
    }, function (module) {
      CELL_SHIFTS = module.CELL_SHIFTS;
      ROW_MASKS = module.ROW_MASKS;
      COL_MASKS = module.COL_MASKS;
      snugness = module.snugness;
    }],
    execute: function () {
      cclegacy._RF.push({}, "34c52TGOChMJbcQPyos32t7", "DirectorLogic", undefined);
      var MAX_TOP_K = 8;
      var DirectorLogic = exports('DirectorLogic', /*#__PURE__*/function () {
        function DirectorLogic() {
          this.skill = 0.5;
          this.skillSamples = 0;
          this.setsSinceBoardClear = 0;
          this.turnsSinceLineClear = 0;
          this.setsSinceCombo = 0;
          this.boardClearWindowLeft = 0;
          this.windowClears = 0;
          this.windowSetsCfg = 0;
          this.windowMaxClears = 0;
          this.boardClearCooldownLeft = 0;
        }
        var _proto = DirectorLogic.prototype;
        _proto.getSkill = function getSkill() {
          return this.skill;
        };
        _proto.getSetsSinceBoardClear = function getSetsSinceBoardClear() {
          return this.setsSinceBoardClear;
        };
        _proto.getTurnsSinceLineClear = function getTurnsSinceLineClear() {
          return this.turnsSinceLineClear;
        };
        _proto.getSetsSinceCombo = function getSetsSinceCombo() {
          return this.setsSinceCombo;
        };
        _proto.getBoardClearWindowLeft = function getBoardClearWindowLeft() {
          return this.boardClearWindowLeft;
        };
        _proto.getWindowClears = function getWindowClears() {
          return this.windowClears;
        };
        _proto.getBoardClearCooldownLeft = function getBoardClearCooldownLeft() {
          return this.boardClearCooldownLeft;
        };
        _proto.openWindow = function openWindow(pacing) {
          this.boardClearWindowLeft = pacing.windowSets;
          this.windowSetsCfg = pacing.windowSets;
          this.windowMaxClears = pacing.maxClearsPerWindow;
          this.windowClears = 0;
          this.setsSinceBoardClear = 0;
        };
        _proto.closeWindow = function closeWindow() {
          this.boardClearWindowLeft = 0;
          this.setsSinceBoardClear = 0;
          this.boardClearCooldownLeft = DIRECTOR_CONFIG.boardClearCooldownSets;
        };
        _proto.resetRun = function resetRun(openingRoll, pacing) {
          if (openingRoll === void 0) {
            openingRoll = Math.random();
          }
          if (pacing === void 0) {
            pacing = getDirectorPacing(0);
          }
          this.setsSinceBoardClear = 0;
          this.turnsSinceLineClear = 0;
          this.setsSinceCombo = 0;
          this.boardClearWindowLeft = 0;
          this.windowClears = 0;
          this.boardClearCooldownLeft = 0;
          if (openingRoll < DIRECTOR_CONFIG.openingClearChance) this.openWindow(pacing);
        };
        _proto.onSetSpawned = function onSetSpawned() {
          this.setsSinceCombo++;
          if (this.boardClearWindowLeft > 0) {
            this.boardClearWindowLeft--;
            if (this.boardClearWindowLeft === 0) this.closeWindow();
          } else if (this.boardClearCooldownLeft > 0) {
            this.boardClearCooldownLeft--;
          } else {
            this.setsSinceBoardClear++;
          }
        };
        _proto.onTurnCleared = function onTurnCleared(lines, boardCleared) {
          this.turnsSinceLineClear = lines > 0 ? 0 : this.turnsSinceLineClear + 1;
          if (lines >= 2) this.setsSinceCombo = 0;
          if (!boardCleared) return;
          this.setsSinceBoardClear = 0;
          if (this.boardClearWindowLeft > 0) {
            this.windowClears++;
            if (this.windowClears >= this.windowMaxClears) this.closeWindow();else this.boardClearWindowLeft = this.windowSetsCfg;
          }
        };
        _proto.nextMoment = function nextMoment(boardCells, pacing, roll) {
          if (roll === void 0) {
            roll = Math.random();
          }
          if (this.boardClearWindowLeft > 0) return 'boardClear';
          var drainable = this.boardClearCooldownLeft === 0 && boardCells > 0 && boardCells <= DIRECTOR_CONFIG.boardClearMaxCells;
          if (drainable) {
            var chance = Math.min(1, pacing.triggerBase + pacing.triggerRamp * this.setsSinceBoardClear);
            if (roll < chance) {
              this.openWindow(pacing);
              return 'boardClear';
            }
          }
          var comboDue = this.setsSinceCombo >= DIRECTOR_CONFIG.comboTargetSets && boardCells >= DIRECTOR_CONFIG.comboMinCells;
          if (comboDue) return 'combo';
          return null;
        };
        _proto.onPlayerPlacement = function onPlayerPlacement(boardMask, def, startR, startC) {
          var percentile = this.placementPercentile(boardMask, def, startR, startC);
          if (percentile === null) return;
          this.skill += (percentile - this.skill) * DIRECTOR_CONFIG.skillAlpha;
          this.skillSamples++;
        };
        _proto.tunePlanner = function tunePlanner(base, fragScore) {
          if (fragScore === void 0) {
            fragScore = 0;
          }
          var tuned = _extends({}, base);
          if (this.skillSamples >= DIRECTOR_CONFIG.minSkillSamples) {
            if (this.skill <= DIRECTOR_CONFIG.lowSkill) {
              tuned.topK = Math.max(1, base.topK - DIRECTOR_CONFIG.topKAdjust);
            } else if (this.skill >= DIRECTOR_CONFIG.highSkill) {
              tuned.topK = Math.min(MAX_TOP_K, base.topK + DIRECTOR_CONFIG.topKAdjust);
            }
          }
          var overdue = this.setsSinceBoardClear / DIRECTOR_CONFIG.overdueRefSets;
          if (overdue > 1) {
            tuned.hotSetupWeight = Math.max(DIRECTOR_CONFIG.minHotSetupWeight, Math.round(base.hotSetupWeight / overdue));
          }
          var fragPity = fragScore >= DIRECTOR_CONFIG.fragPityThreshold;
          if (this.turnsSinceLineClear >= DIRECTOR_CONFIG.pityTurns || fragPity) {
            tuned.topK = 1;
            tuned.minClearsRequired = Math.max(base.minClearsRequired, 1);
          }
          return tuned;
        };
        _proto.placementPercentile = function placementPercentile(boardMask, def, startR, startC) {
          if (startR < 0 || startC < 0) return null;
          if (startR + def.maxR >= GRID_SIZE || startC + def.maxC >= GRID_SIZE) return null;
          var chosenBits = def.mask << CELL_SHIFTS[startR * GRID_SIZE + startC];
          if ((boardMask & chosenBits) !== 0n) return null;
          var chosenScore = this.placementScore(boardMask, chosenBits);
          var total = 0;
          var below = 0;
          var tied = 0;
          var maxR = GRID_SIZE - def.maxR - 1;
          var maxC = GRID_SIZE - def.maxC - 1;
          for (var r = 0; r <= maxR; r++) {
            for (var c = 0; c <= maxC; c++) {
              var placedBits = def.mask << CELL_SHIFTS[r * GRID_SIZE + c];
              if ((boardMask & placedBits) !== 0n) continue;
              total++;
              var score = this.placementScore(boardMask, placedBits);
              if (score < chosenScore) below++;else if (score === chosenScore) tied++;
            }
          }
          if (total < DIRECTOR_CONFIG.minPercentileCandidates) return null;
          return (below + tied * 0.5) / total;
        };
        _proto.placementScore = function placementScore(boardMask, placedBits) {
          var filled = boardMask | placedBits;
          var lines = 0;
          for (var i = 0; i < GRID_SIZE; i++) {
            if ((filled & ROW_MASKS[i]) === ROW_MASKS[i]) lines++;
            if ((filled & COL_MASKS[i]) === COL_MASKS[i]) lines++;
          }
          return lines * 1000 + snugness(placedBits, boardMask);
        };
        return DirectorLogic;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EffectManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './PerformanceProfiler.ts', './SkinService.ts', './SpriteLoader.ts', './ClearBoardEffect.ts', './LineClear.ts', './ScreenConfetti.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Prefab, Node, Color, Vec3, instantiate, UITransform, Sprite, tween, Tween, Label, UIOpacity, Component, GRID_SIZE, CELL_SIZE, EFFECT_SPECTRUM, RAINBOW_CELL_COLOR_INDEX, PerformanceProfiler, SkinService, SpriteLoader, ClearBoardEffect, LineClear, ScreenConfetti;
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
      Prefab = module.Prefab;
      Node = module.Node;
      Color = module.Color;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      tween = module.tween;
      Tween = module.Tween;
      Label = module.Label;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
      CELL_SIZE = module.CELL_SIZE;
      EFFECT_SPECTRUM = module.EFFECT_SPECTRUM;
      RAINBOW_CELL_COLOR_INDEX = module.RAINBOW_CELL_COLOR_INDEX;
    }, function (module) {
      PerformanceProfiler = module.PerformanceProfiler;
    }, function (module) {
      SkinService = module.SkinService;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }, function (module) {
      ClearBoardEffect = module.ClearBoardEffect;
    }, function (module) {
      LineClear = module.LineClear;
    }, function (module) {
      ScreenConfetti = module.ScreenConfetti;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "a8f7dujzNlN57aJXx0540R9", "EffectManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SCORE_RISE_Y = 105;
      var SCORE_RISE_DURATION = 0.7;
      var SCORE_FADE_DELAY = 0.2;
      var SCORE_FADE_DURATION = 0.5;
      var COMBO_NUMBER_GAP = -2;
      var COMPLIMENT_NODE_BY_TEXT = {
        'Good!': 'Good',
        'Great!': 'Great',
        'Excellent!': 'Excellent',
        'Amazing!': 'Amazing',
        'Well Done!': 'WellDone'
      };
      var COMBO_POOL_MAX = 2;
      var TEXT_POOL_MAX = 2;
      var SCORE_POOL_MAX = 3;
      var DOT_PREWARM = 90;
      var LINE_CLEAR_PREWARM = 6;
      var CLEAR_BOARD_PREWARM = 70;
      var DEBRIS_PREWARM = 96;

      // A placement emits up to ~2 motes per exposed block edge, and they outlive the next placement, so
      // this covers a large block's outline twice over without instantiating mid-play.
      var SPARKLE_PREWARM = 48;
      var DEBRIS_PER_CELL = 2;
      var DEBRIS_SIZE_TIERS = [0.9, 1, 1.1, 1.2, 0.8];
      var DEBRIS_ORIGIN_JITTER = 0.35;
      var DEBRIS_GRAVITY = 300;
      var DEBRIS_POP = 16;
      var DEBRIS_POP_VAR = 12;
      var DEBRIS_SPREAD = 5;
      var DEBRIS_DRIFT = 3;
      var DEBRIS_ANGLE_SPAN = 28;
      var DEBRIS_SPIN_MIN = 160;
      var DEBRIS_SPIN_VAR = 260;
      var DEBRIS_SHRINK_RATE = 1.2;
      var DEBRIS_MIN_SCALE = 0.4;
      var DEBRIS_LIFETIME = 0.8;
      var COMPLIMENT_POP_IN = 0.18;
      var COMPLIMENT_SETTLE = 0.09;
      var COMPLIMENT_HOLD = 0.5;
      var COMPLIMENT_FADE = 0.38;
      /** How long a compliment is on screen before it starts fading — the win hands over on this. */
      var COMPLIMENT_TIME_TO_FADE = COMPLIMENT_POP_IN + COMPLIMENT_SETTLE + COMPLIMENT_HOLD;

      // Falls back to a compliment that is already authored, so the win reads correctly before anyone
      // adds a 'Well Done!' node to the text popup.
      var WIN_HEADLINES = ['Well Done!', 'Amazing!'];
      var GLOW_DOT_FRAME = 0;
      var SPARKLE_PER_EDGE = 1.5;
      var SPARKLE_SIZE_TIERS = [0.17, 0.2, 0.2];
      var SPARKLE_EDGE_FAN = 1.1;
      var SPARKLE_ANGLE_JITTER = 0.25;
      var SPARKLE_EDGE_DIRS = [{
        dx: 1,
        dy: 0
      }, {
        dx: -1,
        dy: 0
      }, {
        dx: 0,
        dy: 1
      }, {
        dx: 0,
        dy: -1
      }];
      // Travel distance is a fraction of the live cell pitch, so the burst scales with the board.
      var SPARKLE_FORCE = 1.3;
      var SPARKLE_FORCE_VAR = 0.75;
      var SPARKLE_SHRINK = 0.55;
      var SPARKLE_LIFETIME = 0.5;
      var SPARKLE_LIFETIME_VAR = 0.16;

      /** One cube knocked off a cleared line. Same shape as DotEntry, kept in its own pool. */

      /**
       * Static per-cell particle layout for an 8-cell line (15 particles total).
       * Size 1.0 is capped at exactly 4 — one per center cell (2,3,4,5), placed
       * on the inner edge so the largest particles sit nearest the line's center.
       * Outer cells step down in size; only cells 0 and 7 carry size 0.25.
       *
       *   cell 0,7 (edge)   → 2× size 0.25                speed 280
       *   cell 1,6 (near)   → 1× size 0.5                 speed 220
       *   cell 2,5 (inner)  → 1× size 0.75 + 1× size 1.0  speed 170
       *   cell 3 (center L) → 1× size 0.75 + 1× size 1.0  speed 120
       *   cell 4 (center R) → 1× size 1.0 + 1× size 0.75
       *                       + 1× size 0.25 (intersect)  speed 120
       *
       * Offsets are fractions of CELL_SIZE along the line axis. ±0.25 keeps the
       * two particles in a cell edge-to-edge (no overlap) and also stays ≤ 0.25
       * so neighboring cells' particles don't overlap across the cell boundary.
       * Cell 4's extra size-0.25 at +0.15 overlaps only the 0.75 at +0.25 →
       * exactly one intersecting pair in the whole line.
       */
      var PARTICLE_SPEC = [[{
        size: 0.25,
        offset: -0.2,
        speed: 280
      }, {
        size: 0.25,
        offset: 0.2,
        speed: 280
      }], [{
        size: 0.5,
        offset: 0,
        speed: 220
      }], [{
        size: 0.75,
        offset: -0.25,
        speed: 170
      }, {
        size: 1.0,
        offset: 0.25,
        speed: 170
      }], [{
        size: 0.75,
        offset: -0.25,
        speed: 120
      }, {
        size: 1.0,
        offset: 0.25,
        speed: 120
      }], [{
        size: 1.0,
        offset: -0.25,
        speed: 120
      }, {
        size: 0.75,
        offset: 0.25,
        speed: 120
      }, {
        size: 0.25,
        offset: 0.15,
        speed: 120
      }], [{
        size: 1.0,
        offset: -0.25,
        speed: 170
      }, {
        size: 0.75,
        offset: 0.25,
        speed: 170
      }], [{
        size: 0.5,
        offset: 0,
        speed: 220
      }], [{
        size: 0.25,
        offset: -0.2,
        speed: 280
      }, {
        size: 0.25,
        offset: 0.2,
        speed: 280
      }]];

      /** Recipe arrays built once from PARTICLE_SPEC; only alpha/rotation are re-rolled per clear. */
      function buildParticleBatches() {
        var batches = [];
        var flat = [];
        for (var c = 0; c < PARTICLE_SPEC.length; c++) {
          batches[c] = [];
          for (var _iterator = _createForOfIteratorHelperLoose(PARTICLE_SPEC[c]), _step; !(_step = _iterator()).done;) {
            var s = _step.value;
            var recipe = {
              size: s.size,
              alpha: 255,
              rotation: 0,
              offset: s.offset,
              speed: s.speed
            };
            batches[c].push(recipe);
            flat.push(recipe);
          }
        }
        return {
          batches: batches,
          flat: flat
        };
      }
      var EffectManager = exports('EffectManager', (_dec = ccclass('EffectManager'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec4 = property(ClearBoardEffect), _dec5 = property(Node), _dec6 = property(Node), _dec7 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectManager, _Component);
        function EffectManager() {
          var _this;
          _this = _Component.call(this) || this;
          _initializerDefineProperty(_this, "lineClearEffectPrefab", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "burstParticlePrefab", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "clearBoardEffect", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "comboPopup", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "textPopup", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scorePopup", _descriptor6, _assertThisInitialized(_this));
          _this.lineClearEffects = [];
          _this.comboPool = [];
          _this.textPool = [];
          _this.scorePool = [];
          _this.popupSeq = 0;
          // `*Pool` owns every entry (for the bulk interrupt paths); `*Free` is the stack acquire pops
          // from. A linear scan for a free entry made a clear O(poolSize) per particle.
          _this.dotPool = [];
          _this.dotFree = [];
          _this.debrisPool = [];
          _this.debrisFree = [];
          /** Kept apart from `dotPool` so a line clear can't swap a cell tile onto a live sparkle. */
          _this.sparklePool = [];
          _this.sparkleFree = [];
          _this.flashResolve = null;
          _this.winConfetti = null;
          /** Bumped by `reset`, so a clear interrupted mid-beat can't throw debris onto the new board. */
          _this.clearGen = 0;
          /** Reused each particle tween frame so onUpdate doesn't allocate a Color per tick. */
          _this.particleColorScratch = new Color();
          /** Reused for each line's beam center; the beam copies it before its first await. */
          _this.lineCenterScratch = new Vec3();
          /** Per-cell world/local scratch for the spawn loops — consumed before the next iteration. */
          _this.cellWorldScratch = new Vec3();
          _this.cellLocalScratch = new Vec3();
          _this.boardCenterScratch = new Vec3();
          // Line-burst recipes are built once and re-randomized in place per clear (alpha/rotation
          // only) — a clear allocates no recipe objects or arrays.
          _this.particleBatches = void 0;
          _this.particleFlat = void 0;
          /** Indices of the sub-1.0-size recipes, biggest first — the semi-opacity candidates. */
          _this.semiCandidateScratch = [];
          /** Reusable 0..n-1 index list shuffled per clear for the rotation assignment. */
          _this.indexScratch = [];
          _this.prewarmed = false;
          var _buildParticleBatches = buildParticleBatches(),
            batches = _buildParticleBatches.batches,
            flat = _buildParticleBatches.flat;
          _this.particleBatches = batches;
          _this.particleFlat = flat;
          for (var i = 0; i < flat.length; i++) {
            if (flat[i].size < 1.0) _this.semiCandidateScratch.push(i);
            _this.indexScratch.push(i);
          }
          _this.semiCandidateScratch.sort(function (a, b) {
            return flat[b].size - flat[a].size;
          });
          return _this;
        }

        // Templates are authored under EffectManager only as a styling source; hide them so the
        // authored copy never renders — the pools show clones, not these originals.
        var _proto = EffectManager.prototype;
        _proto.onLoad = function onLoad() {
          if (this.comboPopup) this.comboPopup.active = false;
          if (this.textPopup) this.textPopup.active = false;
          if (this.scorePopup) this.scorePopup.active = false;
          this.prewarm();
        }

        /** Pre-creates every pool at load time so no effect pays instantiate spikes mid-play. */;
        _proto.prewarm = function prewarm() {
          var _this$clearBoardEffec;
          while (this.dotPool.length < DOT_PREWARM) this.dotFree.push(this.createDot());
          while (this.debrisPool.length < DEBRIS_PREWARM) this.debrisFree.push(this.createDebris());
          while (this.sparklePool.length < SPARKLE_PREWARM) this.sparkleFree.push(this.createSparkle());
          while (this.lineClearEffects.length < LINE_CLEAR_PREWARM) this.createLineClearEffect();
          (_this$clearBoardEffec = this.clearBoardEffect) == null || _this$clearBoardEffec.prewarm(CLEAR_BOARD_PREWARM);
          if (this.comboPopup) this.buildPopup(this.comboPool, this.comboPopup);
          if (this.textPopup) this.buildPopup(this.textPool, this.textPopup);
          if (this.scorePopup) this.buildPopup(this.scorePool, this.scorePopup);
          this.prewarmed = true;
        }

        /** A pool miss after prewarm is an `instantiate` inside the celebration frame. */;
        _proto.countPoolMiss = function countPoolMiss(pool) {
          if (this.prewarmed) PerformanceProfiler.count("pool miss/" + pool);
        };
        _proto.getLineClearEffect = function getLineClearEffect() {
          var found = this.lineClearEffects.find(function (n) {
            return !n.active;
          });
          if (found) {
            found.active = true;
            return found;
          }
          var effect = this.createLineClearEffect();
          effect.active = true;
          return effect;
        };
        _proto.createLineClearEffect = function createLineClearEffect() {
          this.countPoolMiss('line clear effect');
          var effect = instantiate(this.lineClearEffectPrefab);
          effect.setParent(this.node);
          effect.active = false;
          this.lineClearEffects.push(effect);
          return effect;
        };
        _proto.releaseLineClearEffect = function releaseLineClearEffect(effect) {
          effect.active = false;
        };
        _proto.playLineClearEffect = /*#__PURE__*/function () {
          var _playLineClearEffect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(worldPos, isRow, lineLength, color, isRainbow) {
            var effect, lineClear;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (isRainbow === void 0) {
                    isRainbow = false;
                  }
                  effect = this.getLineClearEffect();
                  effect.setParent(this.node);
                  lineClear = effect.getComponent(LineClear);
                  _context.next = 6;
                  return lineClear.playLineClearEffect(worldPos, isRow, lineLength, color, isRainbow);
                case 6:
                  this.releaseLineClearEffect(effect);
                case 7:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function playLineClearEffect(_x, _x2, _x3, _x4, _x5) {
            return _playLineClearEffect.apply(this, arguments);
          }
          return playLineClearEffect;
        }()
        /**
         * BlockBlast-style line clear: per-line beam spear, a short beat, then the payoff — cubes
         * knocked off the line for a normal clear, the center-biased particle burst for a rainbow one.
         * The cell wipe itself stays in Board.wipeClearedCells; this owns only the overlay. Positions
         * are read from `geo` (world space).
         *
         * `onBurst` fires the instant the payoff covers the line, for repaints that should happen
         * under the overlay rather than in the open. It runs even when `withBurst` is off, so
         * callers can rely on it for state-carrying repaints, not just cosmetic ones.
         *
         * `survivors` are cleared-line cells that stay on the board (armored); they are still standing,
         * so they must not throw a cube.
         *
         */;

        _proto.playLineClear = /*#__PURE__*/
        function () {
          var _playLineClear = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(rows, cols, color, colorIndex, geo, isRainbow, withBurst, onBurst, survivors) {
            var _this2 = this;
            var gen, lineLength, boardCenter, center, _iterator2, _step2, r, _iterator3, _step3, c;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  if (isRainbow === void 0) {
                    isRainbow = false;
                  }
                  if (withBurst === void 0) {
                    withBurst = true;
                  }
                  if (!(rows.length === 0 && cols.length === 0)) {
                    _context2.next = 4;
                    break;
                  }
                  return _context2.abrupt("return");
                case 4:
                  gen = this.clearGen; // Rainbow only. A normal clear has no beam: in the reference the emptied line is lit by the
                  // would-clear outline it already had, at its original size, and nothing expands or thickens
                  // over it — the caller holds that outline through the beat below instead.
                  if (isRainbow) {
                    lineLength = GRID_SIZE * geo.step - 1;
                    boardCenter = geo.getBoardWorldCenter(this.boardCenterScratch); // The beam copies the position synchronously before its first await, so one scratch
                    // Vec3 can serve every line in the salvo.
                    center = this.lineCenterScratch;
                    for (_iterator2 = _createForOfIteratorHelperLoose(rows); !(_step2 = _iterator2()).done;) {
                      r = _step2.value;
                      center.set(boardCenter.x, geo.getCellWorldPos(r, 0, this.cellWorldScratch).y, 0);
                      this.playLineClearEffect(center, true, lineLength, color, true);
                    }
                    for (_iterator3 = _createForOfIteratorHelperLoose(cols); !(_step3 = _iterator3()).done;) {
                      c = _step3.value;
                      center.set(geo.getCellWorldPos(0, c, this.cellWorldScratch).x, boardCenter.y, 0);
                      this.playLineClearEffect(center, false, lineLength, color, true);
                    }
                  }

                  // The beat between the cells vanishing and the payoff — one frame of empty, still-outlined
                  // slots in the reference.
                  _context2.next = 8;
                  return new Promise(function (resolve) {
                    _this2.flashResolve = resolve;
                    _this2.scheduleOnce(resolve, 0.05);
                  });
                case 8:
                  // `onBurst` still runs on an interrupted clear — callers rely on it for state-carrying
                  // repaints, not just cosmetics — so only the visuals are skipped here.
                  if (withBurst && gen === this.clearGen) {
                    if (isRainbow) {
                      PerformanceProfiler.measure('Effects/spawn line bursts', function () {
                        for (var _iterator4 = _createForOfIteratorHelperLoose(rows), _step4; !(_step4 = _iterator4()).done;) {
                          var _r = _step4.value;
                          _this2.spawnLineBurst(_r, true, color, colorIndex, geo, true);
                        }
                        for (var _iterator5 = _createForOfIteratorHelperLoose(cols), _step5; !(_step5 = _iterator5()).done;) {
                          var _c = _step5.value;
                          _this2.spawnLineBurst(_c, false, color, colorIndex, geo, true);
                        }
                      });
                    } else {
                      PerformanceProfiler.measure('Effects/spawn line debris', function () {
                        for (var _iterator6 = _createForOfIteratorHelperLoose(rows), _step6; !(_step6 = _iterator6()).done;) {
                          var _r2 = _step6.value;
                          _this2.spawnLineDebris(_r2, true, colorIndex, geo, survivors);
                        }
                        for (var _iterator7 = _createForOfIteratorHelperLoose(cols), _step7; !(_step7 = _iterator7()).done;) {
                          var _c2 = _step7.value;
                          _this2.spawnLineDebris(_c2, false, colorIndex, geo, survivors);
                        }
                      });
                    }
                  }
                  onBurst == null || onBurst();
                  _context2.next = 12;
                  return new Promise(function (resolve) {
                    _this2.flashResolve = resolve;
                    _this2.scheduleOnce(function () {
                      _this2.flashResolve = null;
                      resolve();
                    }, 0.45);
                  });
                case 12:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function playLineClear(_x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14) {
            return _playLineClear.apply(this, arguments);
          }
          return playLineClear;
        }()
        /**
         * Board-clear celebration: the rainbow border and impact shake already landed at clearline time
         * (see `beginBoardClearBorder`, called from PlacementLogic in sync with the shake, before this
         * runs). Here rows wipe top-to-bottom, then the praise text lands the instant the wipe completes.
         */;

        _proto.playBoardClearCelebration = /*#__PURE__*/
        function () {
          var _playBoardClearCelebration = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(board) {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  if (this.clearBoardEffect) {
                    _context3.next = 2;
                    break;
                  }
                  return _context3.abrupt("return");
                case 2:
                  _context3.next = 4;
                  return this.clearBoardEffect.play(board);
                case 4:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function playBoardClearCelebration(_x15) {
            return _playBoardClearCelebration.apply(this, arguments);
          }
          return playBoardClearCelebration;
        }()
        /**
         * Flashes the rainbow board-clear frame on immediately — called from PlacementLogic at the
         * instant a clearing placement lands (in sync with the board's own impact shake), well before
         * `playBoardClearCelebration`'s wipe animation runs.
         */;

        _proto.beginBoardClearBorder = function beginBoardClearBorder(board) {
          var _this$clearBoardEffec2;
          (_this$clearBoardEffec2 = this.clearBoardEffect) == null || _this$clearBoardEffec2.beginBorderNow(board);
        }

        /**
         * Starts the win rain on `host`, which the caller supplies so it can hang above every screen
         * rather than under this one: the Adventure win spans the board celebration and the result
         * screen, and a rain parented here is hidden the moment the result panel draws over it.
         *
         * Owned here so `reset()` stops it — that is what already runs when the player goes home or
         * retries, and it is the only thing that fires on both.
         */;
        _proto.startWinConfetti = function startWinConfetti(host) {
          if (!this.winConfetti || !this.winConfetti.node.isValid) {
            this.winConfetti = new ScreenConfetti(host, 'WinConfetti');
          }
          this.winConfetti.start();
        }

        /** Re-asserts the rain's draw order after another screen has been opened over it. */;
        _proto.raiseWinConfetti = function raiseWinConfetti() {
          var _this$winConfetti;
          (_this$winConfetti = this.winConfetti) == null || _this$winConfetti.bringToFront();
        }

        /**
         * Adventure level-win payoff, played on the GameScreen before the result screen opens: the
         * board lights up row by row inside a glowing frame, confetti rains down, and a headline lands.
         *
         * The wipe runs without the board-clear praise word — this lands its own headline instead.
         */;
        _proto.playAdventureWinAsync = /*#__PURE__*/
        function () {
          var _playAdventureWinAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(board, confettiHost) {
            var headline;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  this.beginBoardClearBorder(board);
                  // A won board still holds whatever the player did not clear, and the wipe draws its bands
                  // over the top of it. Emptying first is what gives the rows a dark board to rise into —
                  // a board clear gets that for free, an Adventure win does not.
                  board.resetAll();
                  if (!this.clearBoardEffect) {
                    _context4.next = 5;
                    break;
                  }
                  _context4.next = 5;
                  return this.clearBoardEffect.play(board, false);
                case 5:
                  // One beat, the instant the wave has finished descending: the headline lands and the rain
                  // starts together. Resolving on `COMPLIMENT_TIME_TO_FADE` hands the result screen its cue
                  // exactly as the headline begins to fade, so the two read as one move rather than a pause.
                  this.startWinConfetti(confettiHost);
                  headline = this.pickWinHeadline();
                  if (headline) this.showComplimentAnim(headline, board.getBoardWorldCenter(), 0, 0);
                  _context4.next = 10;
                  return this.wait(COMPLIMENT_TIME_TO_FADE);
                case 10:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function playAdventureWinAsync(_x16, _x17) {
            return _playAdventureWinAsync.apply(this, arguments);
          }
          return playAdventureWinAsync;
        }();
        _proto.pickWinHeadline = function pickWinHeadline() {
          var template = this.textPopup;
          if (!template) return null;
          var _loop = function _loop() {
              var text = _WIN_HEADLINES[_i];
              var name = COMPLIMENT_NODE_BY_TEXT[text];
              if (template.children.some(function (child) {
                return child.name === name;
              })) return {
                v: text
              };
            },
            _ret;
          for (var _i = 0, _WIN_HEADLINES = WIN_HEADLINES; _i < _WIN_HEADLINES.length; _i++) {
            _ret = _loop();
            if (_ret) return _ret.v;
          }
          return null;
        };
        _proto.wait = function wait(seconds) {
          var _this3 = this;
          return new Promise(function (resolve) {
            return _this3.scheduleOnce(resolve, seconds);
          });
        }

        /**
         * Normal-clear payoff: every cleared cell throws `DEBRIS_PER_CELL` cubes that pop away from the
         * line's center, then fall off the bottom of the screen under gravity while tumbling. They are
         * drawn from the cleared block's own cell tile, so the line reads as the blocks themselves being
         * knocked off the board rather than as an abstract spray.
         *
         * Fire-and-forget by design: the fall outlives `playLineClear`'s awaited window, so the score
         * tally and tray refill stay on the clear's own beat instead of waiting for cubes to exit.
         */;
        _proto.spawnLineDebris = function spawnLineDebris(lineIdx, isRow, colorIndex, geo, survivors) {
          // The debris is the cleared cells falling, so it wears whatever the board was wearing.
          var frame = SpriteLoader.instance.getPlayCellSprite(colorIndex);
          if (!frame) return;
          var ui = this.node.getComponent(UITransform);
          var step = geo.step;
          for (var cellIdx = 0; cellIdx < GRID_SIZE; cellIdx++) {
            var r = isRow ? lineIdx : cellIdx;
            var c = isRow ? cellIdx : lineIdx;
            if (survivors != null && survivors.has(r * GRID_SIZE + c)) continue;
            var cellPos = ui.convertToNodeSpaceAR(geo.getCellWorldPos(r, c, this.cellWorldScratch), this.cellLocalScratch);
            // -1 at the line's first cell, +1 at its last, so cubes spray away from its center.
            var along = (cellIdx + 0.5) / GRID_SIZE * 2 - 1;
            for (var i = 0; i < DEBRIS_PER_CELL; i++) {
              this.spawnDebrisCube(cellPos.x, cellPos.y, frame, step, along, isRow);
            }
          }
        };
        _proto.spawnDebrisCube = function spawnDebrisCube(cellX, cellY, frame, step, along, isRow) {
          var _this4 = this;
          var entry = this.acquireDebris();
          var tier = DEBRIS_SIZE_TIERS[Math.floor(Math.random() * DEBRIS_SIZE_TIERS.length)];
          var size = step * tier;
          var originX = cellX + (Math.random() - 0.5) * step * DEBRIS_ORIGIN_JITTER;
          var originY = cellY + (Math.random() - 0.5) * step * DEBRIS_ORIGIN_JITTER;
          entry.sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          entry.sprite.spriteFrame = frame;
          entry.sprite.color = Color.WHITE;
          entry.ui.setContentSize(size, size);
          entry.node.setPosition(originX, originY, 0);
          entry.node.setScale(1, 1, 1);
          var startAngle = (Math.random() * 2 - 1) * DEBRIS_ANGLE_SPAN;
          var spin = (DEBRIS_SPIN_MIN + Math.random() * DEBRIS_SPIN_VAR) * (Math.random() < 0.5 ? -1 : 1);
          entry.node.angle = startAngle;
          var spread = along * DEBRIS_SPREAD * step;
          var drift = (Math.random() - 0.5) * DEBRIS_DRIFT * step;
          var pop = (DEBRIS_POP + Math.random() * DEBRIS_POP_VAR) * step;
          // A column's cells stack along the fall axis, so its outward spray lands on the vertical
          // velocity — the top of the column launches highest — while a row's lands on the horizontal.
          var vx = isRow ? spread + drift : drift;
          var vy = isRow ? pop : pop + spread;
          var gravity = DEBRIS_GRAVITY * step;
          var node = entry.node;
          var proxy = entry.proxy;
          proxy.prog = 0;
          tween(proxy).to(DEBRIS_LIFETIME, {
            prog: 1
          }, {
            onUpdate: function onUpdate() {
              var t = proxy.prog * DEBRIS_LIFETIME;
              var scale = Math.max(DEBRIS_MIN_SCALE, 1 - DEBRIS_SHRINK_RATE * t);
              node.setPosition(originX + vx * t, originY + vy * t - 0.5 * gravity * t * t, 0);
              node.setScale(scale, scale, 1);
              node.angle = startAngle + spin * t;
            }
          }).call(function () {
            return _this4.releaseDebris(entry);
          }).start();
        };
        _proto.acquireDebris = function acquireDebris() {
          var _this$debrisFree$pop;
          var entry = (_this$debrisFree$pop = this.debrisFree.pop()) != null ? _this$debrisFree$pop : this.createDebris();
          entry.node.active = true;
          PerformanceProfiler.gauge('live/debris', this.debrisPool.length - this.debrisFree.length);
          return entry;
        };
        _proto.createDebris = function createDebris() {
          this.countPoolMiss('debris');
          var node = instantiate(this.burstParticlePrefab);
          node.layer = this.node.layer;
          node.setParent(this.node);
          node.active = false;
          var entry = {
            node: node,
            sprite: node.getComponent(Sprite),
            ui: node.getComponent(UITransform),
            proxy: {
              prog: 0
            }
          };
          this.debrisPool.push(entry);
          return entry;
        };
        _proto.releaseDebris = function releaseDebris(entry) {
          if (!entry.node.active) return;
          entry.node.angle = 0;
          entry.node.setScale(1, 1, 1);
          entry.node.active = false;
          this.debrisFree.push(entry);
        };
        _proto.releaseAllDebris = function releaseAllDebris() {
          for (var _iterator8 = _createForOfIteratorHelperLoose(this.debrisPool), _step8; !(_step8 = _iterator8()).done;) {
            var entry = _step8.value;
            if (!entry.node.active) continue;
            Tween.stopAllByTarget(entry.proxy);
            this.releaseDebris(entry);
          }
        }

        /**
         * Phase-3 burst: one particle batch per cleared line.
         * Every cell spawns at least one particle, sized smaller the farther from
         * the line's center (size 1.0 only in the 4 inner cells). Positions within
         * each cell are deterministic so particles don't overlap — the single
         * exception is cell 4, which carries exactly one intersecting pair. Each
         * particle's outward speed grows with its distance from center, so edge
         * particles fling out while center particles drift.
         */;
        _proto.spawnLineBurst = function spawnLineBurst(lineIdx, isRow, color, colorIndex, geo, isRainbow) {
          var _this5 = this;
          var batches = this.randomizeParticleBatch();
          var ui = this.node.getComponent(UITransform);
          var _loop2 = function _loop2() {
            var particles = batches[cellIdx];
            if (particles.length === 0) return 1; // continue

            // Rainbow: each cell takes its color from a fixed violet->red spectrum keyed to its
            // position on the line (reusing the per-index particle frames), so the burst reads as a
            // spectrum rather than the placed block's single color.
            var cellColorIndex = isRainbow ? RAINBOW_CELL_COLOR_INDEX[cellIdx] : colorIndex;
            var frame = SpriteLoader.instance.getParticleFrame(cellColorIndex);
            var src = isRainbow ? EFFECT_SPECTRUM[cellColorIndex] : color;
            var br = frame ? 255 : src.r;
            var bg = frame ? 255 : src.g;
            var bb = frame ? 255 : src.b;
            var worldPos = isRow ? geo.getCellWorldPos(lineIdx, cellIdx, _this5.cellWorldScratch) : geo.getCellWorldPos(cellIdx, lineIdx, _this5.cellWorldScratch);
            var cellPos = ui.convertToNodeSpaceAR(worldPos, _this5.cellLocalScratch);

            // Cells in the left/bottom half move toward the lower edge (-1);
            // right/top half move toward the higher edge (+1). The 8-cell line
            // splits exactly in two so every particle heads to its nearer side.
            var dir = cellIdx < GRID_SIZE / 2 ? -1 : 1;

            // Rainbow staggers each cell by position so the spectrum cascades across the line.
            var cellDelay = isRainbow ? cellIdx * 0.03 : 0;
            var _loop3 = function _loop3() {
              var p = _step9.value;
              var along = p.offset * CELL_SIZE;
              var originX = isRow ? cellPos.x + along : cellPos.x;
              var originY = isRow ? cellPos.y : cellPos.y + along;

              // Recipes are shared and re-randomized per clear; snapshot the values now so a
              // delayed (rainbow-staggered) emit can't read a later clear's re-roll.
              var size = p.size,
                alpha = p.alpha,
                rotation = p.rotation,
                speed = p.speed;
              var emit = function emit() {
                return _this5.spawnSingleParticle(originX, originY, frame, br, bg, bb, isRow, dir, size, alpha, rotation, speed);
              };
              if (cellDelay > 0) _this5.scheduleOnce(emit, cellDelay);else emit();
            };
            for (var _iterator9 = _createForOfIteratorHelperLoose(particles), _step9; !(_step9 = _iterator9()).done;) {
              _loop3();
            }
          };
          for (var cellIdx = 0; cellIdx < GRID_SIZE; cellIdx++) {
            if (_loop2()) continue;
          }
        }

        /**
         * Re-rolls the shared recipe arrays' per-clear randomness in place (no allocation):
         *   - 4–5 semi-opacity (alpha 90), never on size 1.0, biggest sizes first
         *   - rotation strictly in {−5°, 0°, +5°}; exactly half at 0°
         */;
        _proto.randomizeParticleBatch = function randomizeParticleBatch() {
          var flat = this.particleFlat;
          for (var _iterator10 = _createForOfIteratorHelperLoose(flat), _step10; !(_step10 = _iterator10()).done;) {
            var p = _step10.value;
            p.alpha = 255;
            p.rotation = 0;
          }
          var semiCandidates = this.semiCandidateScratch;
          var semiTarget = Math.min(4 + Math.floor(Math.random() * 2), semiCandidates.length);
          for (var i = 0; i < semiTarget; i++) flat[semiCandidates[i]].alpha = 90;
          var indices = this.indexScratch;
          this.shuffleIndices(indices);
          var zeroCount = Math.ceil(flat.length / 2);
          for (var _i2 = zeroCount; _i2 < indices.length; _i2++) {
            flat[indices[_i2]].rotation = (_i2 - zeroCount) % 2 === 0 ? -5 : 5;
          }
          return this.particleBatches;
        };
        _proto.shuffleIndices = function shuffleIndices(arr) {
          for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
          }
        };
        _proto.spawnSingleParticle = function spawnSingleParticle(originX, originY, frame, br, bg, bb, isRow, dir, sizeTier, startAlpha, rotation, speed) {
          var _this6 = this;
          var SCALE_FACTOR = 0.5;
          var startScale = sizeTier * SCALE_FACTOR;
          var entry = this.acquireDot();
          entry.node.setPosition(originX, originY, 0);
          entry.node.setScale(startScale, startScale, 1);
          entry.node.angle = rotation;
          entry.sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          if (frame) entry.sprite.spriteFrame = frame;
          entry.sprite.color = this.particleColorScratch.set(br, bg, bb, startAlpha);
          entry.ui.setContentSize(CELL_SIZE, CELL_SIZE);
          var primarySpeed = speed * (0.9 + Math.random() * 0.2);
          var secondarySpeed = (Math.random() - 0.5) * 20;
          var vx = isRow ? dir * primarySpeed : secondarySpeed;
          var vy = isRow ? secondarySpeed : dir * primarySpeed;
          var duration = 0.32 + Math.random() * 0.08;
          var endScale = startScale * 0.55;
          var proxy = entry.proxy;
          proxy.prog = 0;
          var dot = entry.node;
          var sprite = entry.sprite;
          var scratch = this.particleColorScratch;
          tween(proxy).to(duration, {
            prog: 1
          }, {
            onUpdate: function onUpdate() {
              var p = proxy.prog;
              var t = p * duration;
              var x = originX + vx * t;
              var y = originY + vy * t;
              var scale = startScale + (endScale - startScale) * p;
              var alpha = Math.round(startAlpha * (1 - p));
              dot.setPosition(x, y, 0);
              dot.setScale(scale, scale, 1);
              sprite.color = scratch.set(br, bg, bb, alpha);
            }
          }).call(function () {
            return _this6.releaseDot(entry);
          }).start();
        };
        _proto.playPlacementSparkle = function playPlacementSparkle(def, startR, startC, geo) {
          var ui = this.node.getComponent(UITransform);
          var occupied = new Set();
          for (var _iterator11 = _createForOfIteratorHelperLoose(def.shape), _step11; !(_step11 = _iterator11()).done;) {
            var p = _step11.value;
            occupied.add(p.y * GRID_SIZE + p.x);
          }
          var half = geo.step / 2;
          for (var _iterator12 = _createForOfIteratorHelperLoose(def.shape), _step12; !(_step12 = _iterator12()).done;) {
            var _p = _step12.value;
            var cell = ui.convertToNodeSpaceAR(geo.getCellWorldPos(startR + _p.y, startC + _p.x, this.cellWorldScratch), this.cellLocalScratch);
            for (var _i3 = 0, _SPARKLE_EDGE_DIRS = SPARKLE_EDGE_DIRS; _i3 < _SPARKLE_EDGE_DIRS.length; _i3++) {
              var _SPARKLE_EDGE_DIRS$_i = _SPARKLE_EDGE_DIRS[_i3],
                dx = _SPARKLE_EDGE_DIRS$_i.dx,
                dy = _SPARKLE_EDGE_DIRS$_i.dy;
              // Only edges on the block's outline emit, so nothing spawns over its own tiles.
              if (occupied.has((_p.y + dy) * GRID_SIZE + (_p.x + dx))) continue;
              var normal = Math.atan2(dy, dx);
              // The fractional part is the odds of one extra mote, so 1.5 is a 50/50 of 1 or 2.
              var count = Math.floor(SPARKLE_PER_EDGE) + (Math.random() < SPARKLE_PER_EDGE % 1 ? 1 : 0);
              for (var i = 0; i < count; i++) {
                var fan = ((i + 0.5) / count - 0.5) * SPARKLE_EDGE_FAN;
                var jitter = (Math.random() - 0.5) * SPARKLE_ANGLE_JITTER;
                this.spawnSparkle(cell.x + dx * half, cell.y + dy * half, geo.step, normal + fan + jitter);
              }
            }
          }
        };
        _proto.spawnSparkle = function spawnSparkle(cellX, cellY, step, angle) {
          var _SpriteLoader$instanc,
            _SkinService$accent,
            _this7 = this;
          // glow_dot_64 is pure white with an alpha falloff, so the tint below reads as its colour.
          var frame = (_SpriteLoader$instanc = SpriteLoader.instance) == null ? void 0 : _SpriteLoader$instanc.getSparkleFrame(GLOW_DOT_FRAME);
          if (!frame) return;
          var entry = this.acquireSparkle();
          var tier = SPARKLE_SIZE_TIERS[Math.floor(Math.random() * SPARKLE_SIZE_TIERS.length)];
          var size = step * tier;
          // Under a single-palette skin there is no spectrum to sample from — every sparkle is the
          // skin's own colour.
          var _ref = (_SkinService$accent = SkinService.accent()) != null ? _SkinService$accent : EFFECT_SPECTRUM[Math.floor(Math.random() * EFFECT_SPECTRUM.length)],
            r = _ref.r,
            g = _ref.g,
            b = _ref.b;
          entry.sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          entry.sprite.spriteFrame = frame;
          entry.sprite.color = this.particleColorScratch.set(r, g, b, 255);
          entry.ui.setContentSize(size, size);
          entry.node.setPosition(cellX, cellY, 0);
          entry.node.setScale(1, 1, 1);
          var spread = 1 - SPARKLE_FORCE_VAR / 2 + Math.random() * SPARKLE_FORCE_VAR;
          var dist = step * SPARKLE_FORCE * spread;
          var vx = Math.cos(angle) * dist;
          var vy = Math.sin(angle) * dist;
          var duration = SPARKLE_LIFETIME + Math.random() * SPARKLE_LIFETIME_VAR;
          var node = entry.node;
          var sprite = entry.sprite;
          var scratch = this.particleColorScratch;
          var proxy = entry.proxy;
          proxy.prog = 0;
          tween(proxy).to(duration, {
            prog: 1
          }, {
            onUpdate: function onUpdate() {
              var t = proxy.prog;
              var scale = 1 - t * SPARKLE_SHRINK;
              node.setPosition(cellX + vx * t, cellY + vy * t, 0);
              node.setScale(scale, scale, 1);
              sprite.color = scratch.set(r, g, b, Math.round(255 * (1 - t * t)));
            }
          }).call(function () {
            return _this7.releaseSparkle(entry);
          }).start();
        };
        _proto.acquireSparkle = function acquireSparkle() {
          var _this$sparkleFree$pop;
          var entry = (_this$sparkleFree$pop = this.sparkleFree.pop()) != null ? _this$sparkleFree$pop : this.createSparkle();
          entry.node.active = true;
          PerformanceProfiler.gauge('live/sparkle', this.sparklePool.length - this.sparkleFree.length);
          return entry;
        };
        _proto.createSparkle = function createSparkle() {
          this.countPoolMiss('sparkle');
          var node = instantiate(this.burstParticlePrefab);
          node.layer = this.node.layer;
          node.setParent(this.node);
          node.active = false;
          var entry = {
            node: node,
            sprite: node.getComponent(Sprite),
            ui: node.getComponent(UITransform),
            proxy: {
              prog: 0
            }
          };
          this.sparklePool.push(entry);
          return entry;
        };
        _proto.releaseSparkle = function releaseSparkle(entry) {
          if (!entry.node.active) return;
          entry.node.active = false;
          this.sparkleFree.push(entry);
        };
        _proto.releaseAllSparkles = function releaseAllSparkles() {
          for (var _iterator13 = _createForOfIteratorHelperLoose(this.sparklePool), _step13; !(_step13 = _iterator13()).done;) {
            var entry = _step13.value;
            if (!entry.node.active) continue;
            Tween.stopAllByTarget(entry.proxy);
            this.releaseSparkle(entry);
          }
        };
        _proto.acquireDot = function acquireDot() {
          var _this$dotFree$pop;
          var entry = (_this$dotFree$pop = this.dotFree.pop()) != null ? _this$dotFree$pop : this.createDot();
          entry.node.active = true;
          PerformanceProfiler.gauge('live/dot', this.dotPool.length - this.dotFree.length);
          return entry;
        }

        // Dots stay parented under this node for their whole life — toggling `active` alone avoids
        // the children-array splice + transform dirtying a reparent per particle would cost.
        ;

        _proto.createDot = function createDot() {
          this.countPoolMiss('dot');
          var node = instantiate(this.burstParticlePrefab);
          node.layer = this.node.layer;
          node.setParent(this.node);
          node.active = false;
          var entry = {
            node: node,
            sprite: node.getComponent(Sprite),
            ui: node.getComponent(UITransform),
            proxy: {
              prog: 0
            }
          };
          this.dotPool.push(entry);
          return entry;
        }

        // No `Tween.stopAllByTarget` here: this runs from the flight tween's own completion, where the
        // action is already finished, and that call scans every live tween in the system — which made
        // releasing N particles cost O(N²). The interrupt path below stops them explicitly instead.
        ;

        _proto.releaseDot = function releaseDot(entry) {
          if (!entry.node.active) return;
          entry.node.angle = 0;
          entry.node.active = false;
          this.dotFree.push(entry);
        };
        _proto.releaseAllDots = function releaseAllDots() {
          for (var _iterator14 = _createForOfIteratorHelperLoose(this.dotPool), _step14; !(_step14 = _iterator14()).done;) {
            var entry = _step14.value;
            if (!entry.node.active) continue;
            Tween.stopAllByTarget(entry.proxy);
            this.releaseDot(entry);
          }
        }

        /**
         * Recycles every overlay (popups, beams, burst particles, falling debris) and resolves any
         * pending line-clear wait, so a restart/home/revive mid-salvo leaves nothing lingering on the
         * new board.
         */;
        _proto.reset = function reset() {
          var _this$winConfetti2;
          this.clearGen++;
          this.unscheduleAllCallbacks();
          this.clearPopups();
          for (var _iterator15 = _createForOfIteratorHelperLoose(this.lineClearEffects), _step15; !(_step15 = _iterator15()).done;) {
            var effect = _step15.value;
            effect.active = false;
          }
          this.releaseAllDots();
          this.releaseAllDebris();
          this.releaseAllSparkles();
          if (this.clearBoardEffect) this.clearBoardEffect.stopAll();
          (_this$winConfetti2 = this.winConfetti) == null || _this$winConfetti2.stop();
          if (this.flashResolve) {
            this.flashResolve();
            this.flashResolve = null;
          }
        };
        _proto.showPopAnim = function showPopAnim(value, worldPos, yOffset, delaySeconds) {
          var _p$node$getChildByNam,
            _this8 = this;
          if (yOffset === void 0) {
            yOffset = 0;
          }
          if (delaySeconds === void 0) {
            delaySeconds = 0;
          }
          var pool = this.comboPool;
          var p = this.acquirePopup(pool, this.comboPopup, COMBO_POOL_MAX, worldPos, yOffset);
          if (!p) return;
          p.node.setScale(0, 0, 1);
          var number = (_p$node$getChildByNam = p.node.getChildByName('number')) == null ? void 0 : _p$node$getChildByNam.getComponent(Label);
          if (number) {
            number.string = value;
            this.alignComboPopup(p.node, number.node);
          }
          tween(p.node).delay(delaySeconds).to(0.14, {
            scale: new Vec3(1.35, 1.35, 1)
          }, {
            easing: 'backOut'
          }).to(0.08, {
            scale: new Vec3(1, 1, 1)
          }).delay(0.22).call(function () {
            return _this8.fadeOutPopup(p, 0.22);
          }).start();
        };
        _proto.alignComboPopup = function alignComboPopup(popup, number) {
          var combo = popup.getChildByName('combo');
          var comboTransform = combo == null ? void 0 : combo.getComponent(UITransform);
          var numberTransform = number.getComponent(UITransform);
          if (!combo || !comboTransform || !numberTransform) return;
          var comboWidth = comboTransform.contentSize.width;
          var numberWidth = numberTransform.contentSize.width;
          var totalWidth = comboWidth + COMBO_NUMBER_GAP + numberWidth;
          var comboPosition = combo.getPosition();
          var numberPosition = number.getPosition();
          combo.setPosition(-totalWidth / 2 + comboWidth * comboTransform.anchorPoint.x, comboPosition.y, comboPosition.z);
          number.setPosition(-totalWidth / 2 + comboWidth + COMBO_NUMBER_GAP + numberWidth * numberTransform.anchorPoint.x, numberPosition.y, numberPosition.z);
          var popupTransform = popup.getComponent(UITransform);
          if (popupTransform) {
            popupTransform.setContentSize(totalWidth, Math.max(comboTransform.contentSize.height, numberTransform.contentSize.height));
          }
        };
        _proto.showComplimentAnim = function showComplimentAnim(text, worldPos, yOffset, delaySeconds) {
          var _this9 = this;
          if (yOffset === void 0) {
            yOffset = 0;
          }
          if (delaySeconds === void 0) {
            delaySeconds = 0;
          }
          var p = this.acquirePopup(this.textPool, this.textPopup, TEXT_POOL_MAX, worldPos, yOffset);
          if (!p) return;
          var selectedName = COMPLIMENT_NODE_BY_TEXT[text];
          if (!selectedName) {
            this.releasePopup(p);
            return;
          }
          for (var _iterator16 = _createForOfIteratorHelperLoose(p.node.children), _step16; !(_step16 = _iterator16()).done;) {
            var child = _step16.value;
            child.active = child.name === selectedName;
          }
          p.node.setScale(0, 0, 1);
          tween(p.node).delay(delaySeconds).to(COMPLIMENT_POP_IN, {
            scale: new Vec3(1.8, 1.8, 1)
          }, {
            easing: 'backOut'
          }).to(COMPLIMENT_SETTLE, {
            scale: new Vec3(1.5, 1.5, 1)
          }, {
            easing: 'sineIn'
          }).delay(COMPLIMENT_HOLD).call(function () {
            return _this9.fadeOutPopup(p, COMPLIMENT_FADE);
          }).start();
        };
        _proto.showScorePopup = function showScorePopup(text, worldPos, delaySeconds) {
          var _this10 = this;
          if (delaySeconds === void 0) {
            delaySeconds = 0;
          }
          var p = this.acquirePopup(this.scorePool, this.scorePopup, SCORE_POOL_MAX, worldPos, 0);
          if (!p || p.labels.length === 0) return;
          var label = p.labels[0];
          label.string = text;
          p.node.setScale(0, 0, 1);
          var startPos = p.node.getPosition();
          tween(p.node).delay(delaySeconds).set({
            scale: new Vec3(1, 1, 1)
          }).to(SCORE_RISE_DURATION, {
            position: new Vec3(startPos.x, startPos.y + SCORE_RISE_Y, 0)
          }, {
            easing: 'cubicOut'
          }).start();
          tween(p.opacity).delay(delaySeconds + SCORE_FADE_DELAY).to(SCORE_FADE_DURATION, {
            opacity: 0
          }).call(function () {
            return _this10.releasePopup(p);
          }).start();
        };
        _proto.acquirePopup = function acquirePopup(pool, template, max, worldPos, yOffset) {
          if (!template) return null;
          var popup = pool.find(function (p) {
            return !p.node.active;
          });
          if (!popup) {
            popup = pool.length < max ? this.buildPopup(pool, template) : this.oldestPopup(pool);
          }
          this.resetPopup(popup);
          popup.node.setWorldPosition(worldPos.x, worldPos.y + yOffset, 0);
          return popup;
        };
        _proto.buildPopup = function buildPopup(pool, template) {
          var _node$getComponent;
          var node = instantiate(template);
          node.setParent(this.node);
          var popup = {
            node: node,
            opacity: (_node$getComponent = node.getComponent(UIOpacity)) != null ? _node$getComponent : node.addComponent(UIOpacity),
            labels: node.getComponentsInChildren(Label),
            order: 0
          };
          pool.push(popup);
          return popup;
        };
        _proto.oldestPopup = function oldestPopup(pool) {
          var oldest = pool[0];
          for (var _iterator17 = _createForOfIteratorHelperLoose(pool), _step17; !(_step17 = _iterator17()).done;) {
            var p = _step17.value;
            if (p.order < oldest.order) oldest = p;
          }
          return oldest;
        };
        _proto.resetPopup = function resetPopup(p) {
          Tween.stopAllByTarget(p.node);
          Tween.stopAllByTarget(p.opacity);
          p.node.active = true;
          p.node.setScale(1, 1, 1);
          p.opacity.opacity = 255;
          p.order = this.popupSeq++;
        };
        _proto.fadeOutPopup = function fadeOutPopup(p, duration) {
          var _this11 = this;
          tween(p.opacity).to(duration, {
            opacity: 0
          }).call(function () {
            return _this11.releasePopup(p);
          }).start();
        };
        _proto.releasePopup = function releasePopup(p) {
          p.node.active = false;
        };
        _proto.clearPopups = function clearPopups() {
          this.clearPopupPool(this.comboPool);
          this.clearPopupPool(this.textPool);
          this.clearPopupPool(this.scorePool);
        };
        _proto.clearPopupPool = function clearPopupPool(pool) {
          for (var _iterator18 = _createForOfIteratorHelperLoose(pool), _step18; !(_step18 = _iterator18()).done;) {
            var p = _step18.value;
            if (!p.node.active) continue;
            Tween.stopAllByTarget(p.node);
            Tween.stopAllByTarget(p.opacity);
            this.releasePopup(p);
          }
        };
        return EffectManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lineClearEffectPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "burstParticlePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clearBoardEffect", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "comboPopup", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "textPopup", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "scorePopup", [_dec7], {
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

System.register("chunks:///_virtual/ForwardSimSolver.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './PlacementScoring.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, cclegacy, SPAWN_LIBRARY, SET_SIZE, buildPickContext, placementsFor, scoreForPick, DEFAULT_COMPLEXITY_WEIGHTS;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      SPAWN_LIBRARY = module.SPAWN_LIBRARY;
    }, function (module) {
      SET_SIZE = module.SET_SIZE;
      buildPickContext = module.buildPickContext;
      placementsFor = module.placementsFor;
      scoreForPick = module.scoreForPick;
      DEFAULT_COMPLEXITY_WEIGHTS = module.DEFAULT_COMPLEXITY_WEIGHTS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "221afZsj6ZJCaW6CA5tvRb0", "ForwardSimSolver", undefined);

      /** Number of independent simulations to run when topK > 1 (simulation search) */
      var SIMULATION_SEARCH_ATTEMPTS = 9;
      /** Largest topK any tier/director can request — pickPlacement only keeps this many candidates */
      var MAX_PLANNER_TOP_K = 5;
      /** Random tiebreaker among candidates that freshness leaves tied. */
      var TIE_JITTER = 3;
      /**
       * Clear-first forward simulation. For each of the 3 blocks in a spawn set, enumerates every
       * valid (block, placement) pair on the current simulated board and scores each by
       * `scoreForPick`, then samples from the top `topK` for variety.
       *
       * Pure with respect to planner state: `defHeat` is read for the freshness tiebreaker but
       * never written, and nothing here queues a hand or moves momentum. The caller decides
       * whether to commit the result, which is what makes a discarded search free of side effects.
       */
      var ForwardSimSolver = exports('ForwardSimSolver', /*#__PURE__*/function () {
        function ForwardSimSolver() {}
        var _proto = ForwardSimSolver.prototype;
        _proto.solve = function solve(boardMask, config, requireMultiClear, defHeat, relaxClearRequirement) {
          var attempts = config.topK === 1 && !requireMultiClear ? 1 : SIMULATION_SEARCH_ATTEMPTS;
          var effectiveMinClears = relaxClearRequirement && !requireMultiClear ? 0 : config.minClearsRequired;
          var best = null;
          var bestClears = -1;
          var bestBurst = -1;
          // Every attempt starts from the same boardMask, and topK>1 branches into only a
          // handful of distinct post-placement masks — scope the cache to this call so
          // repeated attempts reuse scores instead of re-running scoreForPick per mask.
          var scoreCache = new Map();
          var attemptsRun = 0;
          for (var attempt = 0; attempt < attempts; attempt++) {
            attemptsRun++;
            var chosen = [];
            var mask = boardMask;
            var clears = 0;
            var burst = 0;
            // Scoped to the attempt, not the call: a slot's pick must cool the shape for the
            // two slots after it (so a set can't come out as the same block three times),
            // without the abandoned attempts before it biasing this one.
            var attemptHeat = new Map();
            for (var i = 0; i < SET_SIZE; i++) {
              var _attemptHeat$get;
              var pick = this.pickPlacement(mask, config, scoreCache, attemptHeat, defHeat);
              if (!pick) break;
              chosen.push(pick.def);
              attemptHeat.set(pick.def.id, ((_attemptHeat$get = attemptHeat.get(pick.def.id)) != null ? _attemptHeat$get : 0) + 1);
              mask = pick.afterMask;
              if (pick.linesCleared > 0) clears++;
              if (pick.linesCleared > burst) burst = pick.linesCleared;
            }
            if (chosen.length < SET_SIZE) continue;
            var meets = requireMultiClear ? burst >= 2 : clears >= effectiveMinClears;
            var bestMeets = requireMultiClear ? bestBurst >= 2 : bestClears >= effectiveMinClears;
            var better = requireMultiClear ? burst > bestBurst : clears > bestClears;
            if (meets && !bestMeets || meets === bestMeets && better) {
              best = chosen;
              bestClears = clears;
              bestBurst = burst;
            }
            if (!requireMultiClear && bestClears >= SET_SIZE) break; // unbeatable: every slot clears
            if (requireMultiClear && bestBurst >= 3) break;
          }
          var candidates = 0;
          for (var _iterator = _createForOfIteratorHelperLoose(scoreCache.values()), _step; !(_step = _iterator()).done;) {
            var entries = _step.value;
            candidates += entries.length;
          }
          var stats = {
            boardStates: scoreCache.size,
            candidates: candidates,
            attempts: attemptsRun
          };
          if (requireMultiClear && bestBurst < 2) return null;
          if (!best) return null;
          return _extends({
            defs: best,
            clears: bestClears,
            burst: bestBurst
          }, stats);
        }

        /**
         * Deterministic per-(def, placement) scores for every valid candidate on `mask`. Pure
         * function of `mask` alone (the formula's weights are fixed, not read from
         * `PlannerConfig`) — so within one solve, every attempt's slot-1 board is the same
         * `boardMask`, and the second/third slots revisit a small, repeating set of
         * post-placement masks. The cache is scoped to the call so this expensive pass — board
         * complexity flood-fills included — runs once per distinct mask instead of once per
         * attempt.
         */;
        _proto.scoredCandidatesFor = function scoredCandidatesFor(mask, scoreCache) {
          var cached = scoreCache.get(mask);
          if (cached) return cached;
          var scored = [];
          var ctx = buildPickContext(mask);
          for (var _iterator2 = _createForOfIteratorHelperLoose(SPAWN_LIBRARY), _step2; !(_step2 = _iterator2()).done;) {
            var def = _step2.value;
            for (var _iterator3 = _createForOfIteratorHelperLoose(placementsFor(def)), _step3; !(_step3 = _iterator3()).done;) {
              var placement = _step3.value;
              if ((mask & placement.placedBits) !== 0n) continue;
              var result = scoreForPick(mask, def, placement, ctx, DEFAULT_COMPLEXITY_WEIGHTS);
              scored.push({
                def: def,
                afterMask: result.afterMask,
                linesCleared: result.lineCount,
                score: result.score
              });
            }
          }
          scoreCache.set(mask, scored);
          return scored;
        }

        /**
         * Samples from the top `topK` of `mask`'s deterministic candidate scores, with a fresh
         * freshness/noise tiebreaker each call — re-rolled every attempt even when the
         * deterministic scores came from the cache, so repeated attempts on the same mask still
         * explore different top-K memberships rather than freezing on one draw.
         */;
        _proto.pickPlacement = function pickPlacement(mask, config, scoreCache, attemptHeat, defHeat) {
          var scoredList = this.scoredCandidatesFor(mask, scoreCache);
          if (scoredList.length === 0) return null;
          var leaderScore = Number.NEGATIVE_INFINITY;
          var leaderLines = 0;
          for (var _iterator4 = _createForOfIteratorHelperLoose(scoredList), _step4; !(_step4 = _iterator4()).done;) {
            var entry = _step4.value;
            if (entry.score > leaderScore) {
              leaderScore = entry.score;
              leaderLines = entry.linesCleared;
            }
          }
          var band = config.freshnessBand;
          var candidates = [];
          for (var _iterator5 = _createForOfIteratorHelperLoose(scoredList), _step5; !(_step5 = _iterator5()).done;) {
            var _entry = _step5.value;
            var score = _entry.score + freshnessBonus(_entry, leaderScore - band, band, leaderLines, attemptHeat, defHeat) + Math.random() * TIE_JITTER;
            if (candidates.length === MAX_PLANNER_TOP_K && score <= candidates[candidates.length - 1].score) {
              continue;
            }
            var at = candidates.length;
            while (at > 0 && candidates[at - 1].score < score) at--;
            candidates.splice(at, 0, {
              def: _entry.def,
              afterMask: _entry.afterMask,
              linesCleared: _entry.linesCleared,
              score: score
            });
            if (candidates.length > MAX_PLANNER_TOP_K) candidates.pop();
          }
          if (candidates.length === 0) return null;
          var k = Math.min(config.topK, candidates.length);
          return candidates[Math.floor(Math.random() * k)];
        };
        return ForwardSimSolver;
      }());

      /**
       * Near-tie tiebreaker: lifts a candidate by how long it's been since its shape was handed.
       * Only ever adds, and never more than `band`, so a candidate outside the band can't overtake
       * one inside it — the structurally better half of the field is untouched and only genuine
       * near-ties reorder. Candidates that give up a line the leader would have cleared are
       * excluded outright, so freshness can never trade away a clear on the paths (pity,
       * board-clear fallback) that exist to hand one.
       */
      function freshnessBonus(entry, bandFloor, band, leaderLines, attemptHeat, defHeat) {
        var _defHeat$get, _attemptHeat$get2;
        if (entry.score < bandFloor || entry.linesCleared < leaderLines) return 0;
        var heat = ((_defHeat$get = defHeat.get(entry.def.id)) != null ? _defHeat$get : 0) + ((_attemptHeat$get2 = attemptHeat.get(entry.def.id)) != null ? _attemptHeat$get2 : 0);
        return heat >= 1 ? 0 : band * (1 - heat);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameEvents.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6a05dAUwbtKeIrQdFFEX12/", "GameEvents", undefined);
      var GameEvents = exports('GameEvents', {
        HANDLE_GAME_REVIVE: 'handleGameRevive',
        HANDLE_REVIVE_TIMEOUT: 'handleReviveTimeout',
        HANDLE_GAME_RETRY: 'handleGameRetry',
        HANDLE_START_GAME: 'handleStartGame',
        HANDLE_RETURN_TO_DASHBOARD: 'handleReturnToDashboard',
        HANDLE_OPEN_DAILY_QUESTS: 'handleOpenDailyQuests',
        HANDLE_CLAIM_QUEST: 'handleClaimQuest',
        HANDLE_TOURNAMENT_EXIT: 'handleTournamentExit',
        HANDLE_SKIN_CHANGED: 'handleSkinChanged',
        ON_WALLET_CHANGED: 'onWalletChanged',
        ON_GAMEPLAY_SUSPENDED: 'onGameplaySuspended',
        ON_SCREEN_CLOSED: 'onScreenClosed',
        ON_DRAG_BLOCK: 'onDragBlock',
        ON_DRAG_BLOCK_END: 'onDragBlockEnd',
        ON_DRAG_BLOCK_CANCEL: 'onDragBlockCancel'
      });
      var ScreenEvents = exports('ScreenEvents', {
        OPEN_SCREEN_ASYNC: 'openScreenAsync',
        CLOSE_SCREEN_ASYNC: 'closeScreenAsync'
      });
      var ScreenNames = exports('ScreenNames', {
        GAME_SCREEN: 'GameScreen',
        LOSE_SCREEN: 'LoseScreen',
        DASHBOARD_SCREEN: 'DashboardScreen',
        SETTING_SCREEN: 'SettingsScreen',
        LEVEL_SELECT_SCREEN: 'LevelSelectScreen',
        LOADING_SCREEN: 'LoadingScreen',
        ADVENTURE_RESULT_SCREEN: 'AdventureResultScreen',
        REVIVE_SCREEN: 'ReviveScreen',
        LEADERBOARD_SCREEN: 'LeaderboardScreen',
        TOURNAMENT_WIN_SCREEN: 'TournamentWinScreen',
        DAILY_QUEST_SCREEN: 'DailyQuestScreen',
        RANDOM_WHEEL_SCREEN: 'RandomWheelScreen',
        SHOP_SCREEN: 'ShopScreen',
        SKIN_SCREEN: 'SkinScreen'
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './GameEvents.ts', './TransitionLayer.ts', './AdventureLevelLoader.ts', './DataManager.ts', './ModeUtils.ts', './PerformanceProfiler.ts', './SpriteLoader.ts', './TutorialGate.ts', './WalletService.ts', './BlockCraftPool.ts', './EffectManager.ts', './AdventureLogic.ts', './BlockLogic.ts', './DailyQuestLogic.ts', './DirectorLogic.ts', './GridLogic.ts', './PlacementLogic.ts', './ScoreLogic.ts', './AdventureMode.ts', './ClassicMode.ts', './TournamentMode.ts', './TutorialMode.ts', './ScreenManager.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, _decorator, Component, AudioManager, ScreenNames, GameEvents, TransitionLayer, AdventureLevelLoader, DataManager, GAME_MODE, ModeUtils, PerformanceProfiler, SpriteLoader, TutorialGate, WalletService, BlockCraftPool, EffectManager, AdventureLogic, BlockLogic, DailyQuestLogic, DirectorLogic, GridLogic, PlacementLogic, ScoreLogic, AdventureMode, ClassicMode, TournamentMode, TutorialMode, ScreenManager;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      ScreenNames = module.ScreenNames;
      GameEvents = module.GameEvents;
    }, function (module) {
      TransitionLayer = module.TransitionLayer;
    }, function (module) {
      AdventureLevelLoader = module.AdventureLevelLoader;
    }, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      GAME_MODE = module.GAME_MODE;
      ModeUtils = module.default;
    }, function (module) {
      PerformanceProfiler = module.PerformanceProfiler;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }, function (module) {
      TutorialGate = module.TutorialGate;
    }, function (module) {
      WalletService = module.WalletService;
    }, function (module) {
      BlockCraftPool = module.BlockCraftPool;
    }, function (module) {
      EffectManager = module.EffectManager;
    }, function (module) {
      AdventureLogic = module.AdventureLogic;
    }, function (module) {
      BlockLogic = module.BlockLogic;
    }, function (module) {
      DailyQuestLogic = module.DailyQuestLogic;
    }, function (module) {
      DirectorLogic = module.DirectorLogic;
    }, function (module) {
      GridLogic = module.GridLogic;
    }, function (module) {
      PlacementLogic = module.PlacementLogic;
    }, function (module) {
      ScoreLogic = module.ScoreLogic;
    }, function (module) {
      AdventureMode = module.AdventureMode;
    }, function (module) {
      ClassicMode = module.ClassicMode;
    }, function (module) {
      TournamentMode = module.TournamentMode;
    }, function (module) {
      TutorialMode = module.TutorialMode;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "ecbadykOutC6rD+89NiQn+i", "GameManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var MAX_REVIVES = 3;
      var GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(BlockCraftPool), _dec3 = property(EffectManager), _dec4 = property(SpriteLoader), _dec5 = property(ScreenManager), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(GameManager, _Component);
        function GameManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "pool", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "effectManager", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "spriteLoader", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "screenManager", _descriptor4, _assertThisInitialized(_this));
          _this.scoreLogic = void 0;
          _this.gridLogic = void 0;
          _this.blocksLogic = void 0;
          _this.adventureLogic = void 0;
          _this.placement = void 0;
          _this.director = void 0;
          _this.dailyQuests = void 0;
          _this.modeRules = void 0;
          _this.reviveCount = 0;
          _this.heartReviveUsed = false;
          _this.runPrepared = false;
          _this.pendingLoseData = null;
          _this.sceneBindings = [];
          _this.startFirstRunAsync = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!TutorialGate.shouldRun()) {
                    _context.next = 4;
                    break;
                  }
                  _context.next = 3;
                  return _this.handleStartGameAsync(GAME_MODE.TUTORIAL);
                case 3:
                  return _context.abrupt("return");
                case 4:
                  _context.next = 6;
                  return _this.screenManager.openScreenAsync(ScreenNames.DASHBOARD_SCREEN, {
                    best: DataManager.getPlayerData('bestScore')
                  });
                case 6:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          _this.handleStartGameAsync = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(mode, levelId) {
            var resolved, _this$modeRules$getLe, _this$modeRules$getLe2, level, departing;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  resolved = mode === GAME_MODE.CLASSIC && TutorialGate.shouldRun() ? GAME_MODE.TUTORIAL : mode;
                  ModeUtils.getInstance().startMode(resolved);
                  _context2.t0 = resolved;
                  _context2.next = _context2.t0 === GAME_MODE.CLASSIC ? 5 : _context2.t0 === GAME_MODE.TOURNAMENT ? 7 : _context2.t0 === GAME_MODE.TUTORIAL ? 9 : _context2.t0 === GAME_MODE.ADVENTURE ? 11 : 18;
                  break;
                case 5:
                  _this.modeRules = new ClassicMode(_assertThisInitialized(_this));
                  return _context2.abrupt("break", 20);
                case 7:
                  _this.modeRules = new TournamentMode(_assertThisInitialized(_this));
                  return _context2.abrupt("break", 20);
                case 9:
                  _this.modeRules = new TutorialMode(_assertThisInitialized(_this));
                  return _context2.abrupt("break", 20);
                case 11:
                  _context2.next = 13;
                  return AdventureLevelLoader.load(levelId != null ? levelId : ((_this$modeRules$getLe = (_this$modeRules$getLe2 = _this.modeRules.getLevel()) == null ? void 0 : _this$modeRules$getLe2.id) != null ? _this$modeRules$getLe : 0) + 1);
                case 13:
                  level = _context2.sent;
                  if (level) {
                    _context2.next = 16;
                    break;
                  }
                  return _context2.abrupt("return");
                case 16:
                  _this.modeRules = new AdventureMode(_assertThisInitialized(_this), level);
                  return _context2.abrupt("break", 20);
                case 18:
                  _this.modeRules = new ClassicMode(_assertThisInitialized(_this));
                  return _context2.abrupt("break", 20);
                case 20:
                  _context2.next = 22;
                  return _this.screenManager.closeScreenAsync(ScreenNames.LEADERBOARD_SCREEN);
                case 22:
                  departing = _this.screenManager.getActiveFullscreen(ScreenNames.GAME_SCREEN);
                  _context2.next = 25;
                  return _this.screenManager.openScreenAsync(ScreenNames.GAME_SCREEN, undefined, departing == null ? void 0 : departing.node.name);
                case 25:
                  _this.prepareRun();
                  if (!departing) {
                    _context2.next = 29;
                    break;
                  }
                  _context2.next = 29;
                  return _this.screenManager.ensureTransitionLayerAsync();
                case 29:
                  _context2.next = 31;
                  return _this.playEntryTurnAsync(departing);
                case 31:
                  if (!departing) {
                    _context2.next = 34;
                    break;
                  }
                  _context2.next = 34;
                  return _this.screenManager.closeScreenAsync(departing.node.name);
                case 34:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          _this.handleReviveTimeout = function () {
            var data = _this.pendingLoseData;
            if (!data) return;
            _this.pendingLoseData = null;
            ScreenManager.instance.closeScreenAsync(ScreenNames.REVIVE_SCREEN);
            ScreenManager.instance.openScreenAsync(ScreenNames.LOSE_SCREEN, data);
          };
          _this.handleReturnToDashboard = function () {
            if (_this.runPrepared) {
              _this.restGameState();
              _this.runPrepared = false;
            }
            _this.dailyQuests.flush();
            _this.modeRules = new ClassicMode(_assertThisInitialized(_this));
            _this.screenManager.openScreenAsync(ScreenNames.DASHBOARD_SCREEN, {
              best: DataManager.getPlayerData('bestScore')
            });
          };
          _this.handleGameplaySuspended = function (suspended) {
            _this.blocksLogic.setSuspended(suspended);
          };
          _this.handleTournamentExit = function () {
            _this.modeRules.onExitRun == null || _this.modeRules.onExitRun();
          };
          _this.handleOpenDailyQuests = function () {
            _this.screenManager.openScreenAsync(ScreenNames.DAILY_QUEST_SCREEN, _this.dailyQuests.buildScreenData());
          };
          _this.handleClaimQuest = function (index) {
            if (_this.dailyQuests.claim(index) > 0) _this.node.scene.emit(GameEvents.ON_WALLET_CHANGED);
            _this.handleOpenDailyQuests();
          };
          _this.handleSkinChanged = function () {
            _this.getGameScreen().applySkin();
            _this.blocksLogic.repaintAll();
            _this.blocksLogic.updateStuckBlocks();
          };
          _this.launch = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  _this.prepareRun();
                  _context3.next = 3;
                  return _this.startRun();
                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
          }));
          return _this;
        }
        var _proto = GameManager.prototype;
        _proto.getGameScreen = function getGameScreen() {
          return this.screenManager.getGameScreen();
        };
        _proto.getEffectManager = function getEffectManager() {
          return this.effectManager;
        };
        _proto.getPool = function getPool() {
          return this.pool;
        };
        _proto.getGridLogic = function getGridLogic() {
          return this.gridLogic;
        };
        _proto.getScoreLogic = function getScoreLogic() {
          return this.scoreLogic;
        };
        _proto.getAdventureLogic = function getAdventureLogic() {
          return this.adventureLogic;
        };
        _proto.getBlockLogic = function getBlockLogic() {
          return this.blocksLogic;
        };
        _proto.getModeRules = function getModeRules() {
          return this.modeRules;
        };
        _proto.getDailyQuests = function getDailyQuests() {
          return this.dailyQuests;
        };
        _proto.getDirector = function getDirector() {
          return this.director;
        };
        _proto.__preload = function __preload() {
          this.init();
          this.registerEvents();
          this.registerPlatformSuspend();
        }

        // The port has no unsubscribe, so this registers once. AudioManager.instance is resolved
        // inside the callbacks because both components preload off the same prefab.
        ;

        _proto.registerPlatformSuspend = function registerPlatformSuspend() {
          var _window$GameSDK, _window$GameSDK2;
          (_window$GameSDK = window.GameSDK) == null || _window$GameSDK.onPause(function () {
            var _AudioManager$instanc;
            return (_AudioManager$instanc = AudioManager.instance) == null ? void 0 : _AudioManager$instanc.setAdSuspended(true);
          });
          (_window$GameSDK2 = window.GameSDK) == null || _window$GameSDK2.onResume(function () {
            var _AudioManager$instanc2;
            return (_AudioManager$instanc2 = AudioManager.instance) == null ? void 0 : _AudioManager$instanc2.setAdSuspended(false);
          });
        };
        _proto.start = /*#__PURE__*/function () {
          var _start = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return this.startFirstRunAsync();
                case 2:
                  this.screenManager.queueScreenPreload();
                case 3:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function start() {
            return _start.apply(this, arguments);
          }
          return start;
        }();
        _proto.update = function update(dt) {
          PerformanceProfiler.onFrame(dt);
        };
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvents();
        };
        _proto.registerEvents = function registerEvents() {
          this.sceneBindings = [[GameEvents.HANDLE_START_GAME, this.handleStartGameAsync, this], [GameEvents.HANDLE_GAME_REVIVE, this.handleReviveGame, this], [GameEvents.HANDLE_REVIVE_TIMEOUT, this.handleReviveTimeout, this], [GameEvents.HANDLE_GAME_RETRY, this.handleGameRetry, this], [GameEvents.HANDLE_RETURN_TO_DASHBOARD, this.handleReturnToDashboard, this], [GameEvents.HANDLE_TOURNAMENT_EXIT, this.handleTournamentExit, this], [GameEvents.HANDLE_OPEN_DAILY_QUESTS, this.handleOpenDailyQuests, this], [GameEvents.HANDLE_CLAIM_QUEST, this.handleClaimQuest, this], [GameEvents.HANDLE_SKIN_CHANGED, this.handleSkinChanged, this], [GameEvents.ON_GAMEPLAY_SUSPENDED, this.handleGameplaySuspended, this], [GameEvents.ON_DRAG_BLOCK, this.placement.onRequestPreview, this.placement], [GameEvents.ON_DRAG_BLOCK_END, this.placement.onDragEnd, this.placement], [GameEvents.ON_DRAG_BLOCK_CANCEL, this.placement.onClearPreview, this.placement]];
          for (var _iterator = _createForOfIteratorHelperLoose(this.sceneBindings), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              _event = _step$value[0],
              _handler = _step$value[1],
              _target = _step$value[2];
            this.node.scene.on(_event, _handler, _target);
          }
        };
        _proto.unregisterEvents = function unregisterEvents() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.sceneBindings), _step2; !(_step2 = _iterator2()).done;) {
            var _step2$value = _step2.value,
              _event2 = _step2$value[0],
              _handler2 = _step2$value[1],
              _target2 = _step2$value[2];
            this.node.scene.off(_event2, _handler2, _target2);
          }
          this.sceneBindings = [];
        };
        _proto.init = function init() {
          this.spriteLoader.register();
          this.scoreLogic = new ScoreLogic();
          this.gridLogic = new GridLogic(this);
          this.blocksLogic = new BlockLogic(this);
          this.adventureLogic = new AdventureLogic(this);
          this.placement = new PlacementLogic(this);
          this.director = new DirectorLogic();
          this.dailyQuests = new DailyQuestLogic(this);
          this.modeRules = new ClassicMode(this);
        };
        _proto.playEntryTurnAsync = /*#__PURE__*/function () {
          var _playEntryTurnAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(departing) {
            var _TransitionLayer$inst,
              _this2 = this;
            var turn;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  turn = departing ? (_TransitionLayer$inst = TransitionLayer.instance) == null ? void 0 : _TransitionLayer$inst.playPageTurn(departing.node, function () {
                    return void _this2.startRun();
                  }) : null;
                  if (!turn) {
                    _context5.next = 5;
                    break;
                  }
                  _context5.next = 4;
                  return turn;
                case 4:
                  return _context5.abrupt("return");
                case 5:
                  _context5.next = 7;
                  return this.startRun();
                case 7:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this);
          }));
          function playEntryTurnAsync(_x3) {
            return _playEntryTurnAsync.apply(this, arguments);
          }
          return playEntryTurnAsync;
        }();
        _proto.handleGameRetry = function handleGameRetry() {
          this.launch();
        };
        _proto.handleReviveGame = function handleReviveGame(source) {
          if (source === void 0) {
            source = 'ad';
          }
          if (!this.placement.isGameOver() || !this.canRevive()) return;
          if (source === 'heart') {
            if (!this.hasHeartReviveLeft()) return;
            if (!WalletService.spendHeart()) return;
            this.heartReviveUsed = true;
          }
          this.pendingLoseData = null;
          ScreenManager.instance.closeScreenAsync(ScreenNames.REVIVE_SCREEN);
          this.reviveCount++;
          this.placement.revive();
          this.blocksLogic.handleReviveSpawn();
          if (source === 'heart') this.node.scene.emit(GameEvents.ON_WALLET_CHANGED);
        };
        _proto.offerRevive = function offerRevive(loseData) {
          this.pendingLoseData = loseData;
          if (this.canRevive() && ScreenManager.instance.hasScreen(ScreenNames.REVIVE_SCREEN)) {
            var data = {
              heartReviveAvailable: this.hasHeartReviveLeft()
            };
            ScreenManager.instance.openScreenAsync(ScreenNames.REVIVE_SCREEN, data);
            return;
          }
          this.pendingLoseData = null;
          ScreenManager.instance.openScreenAsync(ScreenNames.LOSE_SCREEN, loseData);
        };
        _proto.canRevive = function canRevive() {
          return this.reviveCount < MAX_REVIVES;
        };
        _proto.hasHeartReviveLeft = function hasHeartReviveLeft() {
          return !this.heartReviveUsed;
        };
        _proto.restGameState = function restGameState() {
          var _TransitionLayer$inst2, _this$screenManager$g, _this$screenManager$g2;
          this.unscheduleAllCallbacks();
          (_TransitionLayer$inst2 = TransitionLayer.instance) == null || _TransitionLayer$inst2.stop();
          ScreenManager.instance.closeScreenAsync(ScreenNames.REVIVE_SCREEN);
          this.pendingLoseData = null;
          this.effectManager.reset();
          (_this$screenManager$g = this.screenManager.getGameScreen().getHandHint()) == null || _this$screenManager$g.hide();
          this.placement.reset();
          this.reviveCount = 0;
          this.heartReviveUsed = false;
          this.scoreLogic.reset();
          this.blocksLogic.resetForNewGame();
          this.director.resetRun();
          this.gridLogic.reset();
          this.adventureLogic.reset();
          this.screenManager.getGameScreen().getScoreUI().resetDisplay();
          (_this$screenManager$g2 = this.screenManager.getGameScreen().getBestScoreUI()) == null || _this$screenManager$g2.reset();
        };
        _proto.prepareRun = function prepareRun() {
          this.runPrepared = true;
          this.restGameState();
          this.dailyQuests.onRunStarted();
          this.modeRules.setup();
        };
        _proto.startRun = /*#__PURE__*/function () {
          var _startRun = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            var _this$modeRules$onRun, _this$modeRules;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.playIntroAsync();
                case 2:
                  PerformanceProfiler.reset();
                  this.blocksLogic.init();
                  (_this$modeRules$onRun = (_this$modeRules = this.modeRules).onRunStarted) == null || _this$modeRules$onRun.call(_this$modeRules);
                case 5:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this);
          }));
          function startRun() {
            return _startRun.apply(this, arguments);
          }
          return startRun;
        }();
        _proto.playIntroAsync = /*#__PURE__*/function () {
          var _playIntroAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            var screen;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  if (this.modeRules.playIntroAsync) {
                    _context7.next = 2;
                    break;
                  }
                  return _context7.abrupt("return");
                case 2:
                  screen = this.getGameScreen();
                  screen.setSettingsEnabled(false);
                  _context7.prev = 4;
                  _context7.next = 7;
                  return this.modeRules.playIntroAsync();
                case 7:
                  _context7.prev = 7;
                  screen.setSettingsEnabled(true);
                  return _context7.finish(7);
                case 10:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this, [[4,, 7, 10]]);
          }));
          function playIntroAsync() {
            return _playIntroAsync.apply(this, arguments);
          }
          return playIntroAsync;
        }();
        _proto.failRun = function failRun() {
          this.placement.failRun();
        };
        return GameManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pool", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "effectManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spriteLoader", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "screenManager", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameModeRules.ts", ['cc'], function () {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "725bdBdH8ZFW76XxX3E3La+", "GameModeRules", undefined);
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './ScreenManager.ts', './GameEvents.ts', './AdventureHud.ts', './BestScoreUI.ts', './Board.ts', './HandHint.ts', './QuestToast.ts', './ScoreUI.ts', './VersusHud.ts', './SpriteLoader.ts', './BaseScreen.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, Node, Button, Sprite, AudioManager, SFX, ScreenManager, ScreenNames, AdventureHud, BestScoreUI, Board, HandHint, QuestToast, ScoreUI, VersusHud, SpriteLoader, BaseScreen;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Button = module.Button;
      Sprite = module.Sprite;
    }, function (module) {
      AudioManager = module.AudioManager;
      SFX = module.SFX;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }, function (module) {
      ScreenNames = module.ScreenNames;
    }, function (module) {
      AdventureHud = module.AdventureHud;
    }, function (module) {
      BestScoreUI = module.BestScoreUI;
    }, function (module) {
      Board = module.Board;
    }, function (module) {
      HandHint = module.HandHint;
    }, function (module) {
      QuestToast = module.QuestToast;
    }, function (module) {
      ScoreUI = module.ScoreUI;
    }, function (module) {
      VersusHud = module.VersusHud;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10;
      cclegacy._RF.push({}, "dbe44M9PW1Bt4Eql9bwT0kB", "GameScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GameScreen = exports('GameScreen', (_dec = ccclass('GameScreen'), _dec2 = property(Board), _dec3 = property(ScoreUI), _dec4 = property(BestScoreUI), _dec5 = property(AdventureHud), _dec6 = property(VersusHud), _dec7 = property(HandHint), _dec8 = property(QuestToast), _dec9 = property([Node]), _dec10 = property(Button), _dec11 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(GameScreen, _BaseScreen);
        function GameScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "board", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scoreUI", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "bestScoreUI", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "adventureHud", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "versusHud", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "handHint", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "questToast", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "slots", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "settingsButton", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "background", _descriptor10, _assertThisInitialized(_this));
          _this.authoredBackground = null;
          _this.handleClickSettings = function () {
            var _AudioManager$instanc;
            (_AudioManager$instanc = AudioManager.instance) == null || _AudioManager$instanc.play(SFX.CLICKBUTTON);
            ScreenManager.instance.openScreenAsync(ScreenNames.SETTING_SCREEN);
          };
          return _this;
        }
        var _proto = GameScreen.prototype;
        _proto.__preload = function __preload() {
          this.registerEvents();
        };
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvents();
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 2:
                  this.applySkin();
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
        _proto.registerEvents = function registerEvents() {
          this.settingsButton.node.on(Button.EventType.CLICK, this.handleClickSettings, this);
        };
        _proto.unregisterEvents = function unregisterEvents() {
          this.settingsButton.node.off(Button.EventType.CLICK, this.handleClickSettings, this);
        };
        _proto.getBoard = function getBoard() {
          return this.board;
        };
        _proto.applySkin = function applySkin() {
          this.board.repaintSkin();
          this.board.applySkinArt();
          this.applyBackground();
        };
        _proto.applyBackground = function applyBackground() {
          var _SpriteLoader$instanc, _SpriteLoader$instanc2;
          var sprite = this.background;
          if (!sprite) return;
          if (!this.authoredBackground) this.authoredBackground = sprite.spriteFrame;
          sprite.spriteFrame = (_SpriteLoader$instanc = (_SpriteLoader$instanc2 = SpriteLoader.instance) == null ? void 0 : _SpriteLoader$instanc2.getSkinBackgroundFrame()) != null ? _SpriteLoader$instanc : this.authoredBackground;
        };
        _proto.getScoreUI = function getScoreUI() {
          return this.scoreUI;
        };
        _proto.getBestScoreUI = function getBestScoreUI() {
          return this.bestScoreUI;
        };
        _proto.getAdventureHud = function getAdventureHud() {
          return this.adventureHud;
        };
        _proto.getVersusHud = function getVersusHud() {
          return this.versusHud;
        };
        _proto.getHandHint = function getHandHint() {
          return this.handHint;
        };
        _proto.getQuestToast = function getQuestToast() {
          return this.questToast;
        };
        _proto.getSlots = function getSlots() {
          return this.slots;
        }

        /**
         * Disables the Button component rather than clearing `interactable`, which would grey the icon
         * through the button's disabled transition for as long as the intro runs.
         */;
        _proto.setSettingsEnabled = function setSettingsEnabled(enabled) {
          this.settingsButton.enabled = enabled;
        };
        _createClass(GameScreen, [{
          key: "isFullscreen",
          get: function get() {
            return true;
          }
        }]);
        return GameScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "board", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreUI", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bestScoreUI", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "adventureHud", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "versusHud", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "handHint", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "questToast", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "slots", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "settingsButton", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "background", [_dec11], {
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

System.register("chunks:///_virtual/GridLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './BitUtils.ts', './PerformanceProfiler.ts', './SkinService.ts', './Block.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, Vec3, Color, UITransform, GRID_SIZE, BLOCK_LIBRARY, CELL_SHIFTS, clearFullLinesWithArmor, ROW_SHIFTS, ROW_MASK, COL_MASKS, canPlaceSetWithArmor, popCount, PerformanceProfiler, SkinService, VISUAL_OFFSET;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      Vec3 = module.Vec3;
      Color = module.Color;
      UITransform = module.UITransform;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
      BLOCK_LIBRARY = module.BLOCK_LIBRARY;
    }, function (module) {
      CELL_SHIFTS = module.CELL_SHIFTS;
      clearFullLinesWithArmor = module.clearFullLinesWithArmor;
      ROW_SHIFTS = module.ROW_SHIFTS;
      ROW_MASK = module.ROW_MASK;
      COL_MASKS = module.COL_MASKS;
      canPlaceSetWithArmor = module.canPlaceSetWithArmor;
      popCount = module.popCount;
    }, function (module) {
      PerformanceProfiler = module.PerformanceProfiler;
    }, function (module) {
      SkinService = module.SkinService;
    }, function (module) {
      VISUAL_OFFSET = module.VISUAL_OFFSET;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4e1d1nkYm1CELEvDEWqcfjC", "GridLogic", undefined);
      var LOCAL_SCRATCH = new Vec3();
      var EFFECT_COLORS = [new Color(255, 87, 51, 255), new Color(255, 165, 0, 255), new Color(255, 251, 51, 255), new Color(51, 255, 87, 255), new Color(80, 200, 255, 255), new Color(65, 105, 255, 255), new Color(180, 55, 235, 255)];

      /**
       * A single-palette skin makes the colour index meaningless, so its accent stands in for it. Returns
       * a fresh Color rather than a scratch: the result outlives this call inside the clear animation.
       */
      function effectColor(colorIndex) {
        var accent = SkinService.accent();
        if (!accent) return EFFECT_COLORS[colorIndex % EFFECT_COLORS.length];
        return new Color(accent.r, accent.g, accent.b, accent.a);
      }
      var GridLogic = exports('GridLogic', /*#__PURE__*/function () {
        function GridLogic(gm) {
          this.gm = void 0;
          this.boardMask = 0n;
          this.markMask = 0n;
          this.markTypeAt = new Map();
          this.lastClearedMarks = new Map();
          this.armorMask = 0n;
          /** Set while a clear is pending: the outcome the board settles to once the effect finishes. */
          this.pendingClear = null;
          this.lastPlacedColorIndex = 0;
          this.boardUi = null;
          this.lastPreviewR = -1;
          this.lastPreviewC = -1;
          this.gm = gm;
        }
        var _proto = GridLogic.prototype;
        _proto.getNearestCell = function getNearestCell(worldPos) {
          var board = this.gm.getGameScreen().getBoard();
          if (!this.boardUi) this.boardUi = board.getComponent(UITransform);
          var ui = this.boardUi;
          if (!ui) return null;
          var local = ui.convertToNodeSpaceAR(worldPos, LOCAL_SCRATCH);
          var c = Math.floor((local.x - board.gridEdgeX + VISUAL_OFFSET.x) / board.step);
          var r = Math.floor((local.y - board.gridEdgeY + VISUAL_OFFSET.y) / board.step);
          return r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE ? {
            r: r,
            c: c
          } : null;
        };
        _proto.canPlace = function canPlace(def, startR, startC) {
          if (startR < 0 || startC < 0) return false;
          if (startR + def.maxR >= GRID_SIZE || startC + def.maxC >= GRID_SIZE) return false;
          var shift = CELL_SHIFTS[startR * GRID_SIZE + startC];
          return (this.boardMask & def.mask << shift) === 0n;
        };
        _proto.canPlaceAnywhere = function canPlaceAnywhere(def) {
          return this.fitsMask(def, this.settledMask());
        }

        /**
         * The mask the board settles to once a pending clear finishes. The live mask still holds the
         * lines that are about to vanish, so fit-testing against it would call a block stuck that the
         * clear is about to make room for.
         */;
        _proto.settledMask = function settledMask() {
          var _this$pendingClear$af, _this$pendingClear;
          return (_this$pendingClear$af = (_this$pendingClear = this.pendingClear) == null ? void 0 : _this$pendingClear.afterMask) != null ? _this$pendingClear$af : this.boardMask;
        }

        /**
         * Resolves the clear the just-committed placement triggers, before any of it animates. The
         * tray is repainted immediately after commit, so without this the fit test runs against a
         * board still holding the full lines and every block that only fits *because* of the clear
         * flashes STUCK until the animation ends. `checkAndClearLines` reuses this result rather than
         * recomputing: a second pass over an armoured full line would clear the row the first spared.
         */;
        _proto.settlePendingClear = function settlePendingClear() {
          this.pendingClear = this.hasFullLine(this.boardMask) ? clearFullLinesWithArmor(this.boardMask, this.armorMask) : null;
        };
        _proto.placeBlock = function placeBlock(def, startR, startC, colorIndex) {
          this.boardMask |= def.mask << CELL_SHIFTS[startR * GRID_SIZE + startC];
          this.lastPlacedColorIndex = colorIndex;
          var board = this.gm.getGameScreen().getBoard();
          for (var _iterator = _createForOfIteratorHelperLoose(def.shape), _step; !(_step = _iterator()).done;) {
            var pos = _step.value;
            board.paint(startR + pos.y, startC + pos.x, colorIndex);
          }
        };
        _proto.findFullLines = function findFullLines(mask) {
          var rows = [];
          var cols = [];
          for (var i = 0; i < GRID_SIZE; i++) {
            if ((mask >> ROW_SHIFTS[i] & ROW_MASK) === ROW_MASK) rows.push(i);
            if ((mask & COL_MASKS[i]) === COL_MASKS[i]) cols.push(i);
          }
          return {
            rows: rows,
            cols: cols
          };
        };
        _proto.countFullLines = function countFullLines() {
          var _this$findFullLines = this.findFullLines(this.boardMask),
            rows = _this$findFullLines.rows,
            cols = _this$findFullLines.cols;
          return rows.length + cols.length;
        };
        _proto.willClearLines = function willClearLines(def, startR, startC) {
          return this.hasFullLine(this.boardMask | def.mask << CELL_SHIFTS[startR * GRID_SIZE + startC]);
        };
        _proto.wouldClearBoard = function wouldClearBoard() {
          return clearFullLinesWithArmor(this.boardMask, this.armorMask).afterMask === 0n;
        };
        _proto.checkAndClearLines = /*#__PURE__*/function () {
          var _checkAndClearLines = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(onAnimStart, isRainbow) {
            var _this$pendingClear2,
              _this = this;
            var setupStartedAt, _this$findFullLines2, rows, cols, lineCount, board, boardCenter, sumX, sumY, _iterator2, _step2, r, _iterator3, _step3, c, clearCenter, color, result, survivors, i, effectPromise, effectStartedAt, finalizeStartedAt, collectedMask, _i, type, _this$lastClearedMark;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (isRainbow === void 0) {
                    isRainbow = false;
                  }
                  setupStartedAt = PerformanceProfiler.now();
                  _this$findFullLines2 = this.findFullLines(this.boardMask), rows = _this$findFullLines2.rows, cols = _this$findFullLines2.cols;
                  lineCount = rows.length + cols.length;
                  if (!(lineCount === 0)) {
                    _context.next = 8;
                    break;
                  }
                  this.pendingClear = null;
                  PerformanceProfiler.logSlow('Clear/check without lines', setupStartedAt);
                  return _context.abrupt("return", {
                    lineCount: 0,
                    clearCenter: null
                  });
                case 8:
                  PerformanceProfiler.markEvent("clear " + lineCount + " lines");
                  board = this.gm.getGameScreen().getBoard();
                  boardCenter = board.getBoardWorldCenter();
                  sumX = 0, sumY = 0;
                  for (_iterator2 = _createForOfIteratorHelperLoose(rows); !(_step2 = _iterator2()).done;) {
                    r = _step2.value;
                    sumY += board.getCellWorldPos(r, 0).y;
                  }
                  for (_iterator3 = _createForOfIteratorHelperLoose(cols); !(_step3 = _iterator3()).done;) {
                    c = _step3.value;
                    sumX += board.getCellWorldPos(0, c).x;
                  }
                  clearCenter = new Vec3(cols.length > 0 ? sumX / cols.length : boardCenter.x, rows.length > 0 ? sumY / rows.length : boardCenter.y, 0);
                  color = effectColor(this.lastPlacedColorIndex);
                  onAnimStart == null || onAnimStart(lineCount, color);
                  result = (_this$pendingClear2 = this.pendingClear) != null ? _this$pendingClear2 : clearFullLinesWithArmor(this.boardMask, this.armorMask);
                  this.pendingClear = result;
                  survivors = new Set();
                  for (i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
                    if ((result.downgradedMask >> CELL_SHIFTS[i] & 1n) === 1n) survivors.add(i);
                  }
                  this.clearPreviewCache();
                  board.discardPreview(!isRainbow);
                  board.wipeClearedCells(rows, cols, survivors);
                  effectPromise = this.gm.getEffectManager().playLineClear(rows, cols, color, this.lastPlacedColorIndex, board, isRainbow, true, function () {
                    board.hideLineBorders();
                    _this.repaintDowngradedSurvivors(result.downgradedMask);
                  }, survivors);
                  PerformanceProfiler.log('Clear/setup and start effects', setupStartedAt, {
                    columns: cols.length,
                    rainbow: isRainbow,
                    rows: rows.length
                  });
                  effectStartedAt = PerformanceProfiler.now();
                  _context.next = 29;
                  return effectPromise;
                case 29:
                  PerformanceProfiler.log('Clear/effect timeline', effectStartedAt, {
                    lineCount: lineCount
                  });
                  finalizeStartedAt = PerformanceProfiler.now();
                  this.boardMask = result.afterMask;
                  this.armorMask = result.newArmorMask;
                  this.pendingClear = null;
                  collectedMask = result.removeMask & this.markMask;
                  if (!(collectedMask !== 0n)) {
                    _context.next = 46;
                    break;
                  }
                  _i = 0;
                case 37:
                  if (!(_i < GRID_SIZE * GRID_SIZE)) {
                    _context.next = 45;
                    break;
                  }
                  if (!((collectedMask >> CELL_SHIFTS[_i] & 1n) === 0n)) {
                    _context.next = 40;
                    break;
                  }
                  return _context.abrupt("continue", 42);
                case 40:
                  type = this.markTypeAt.get(_i);
                  if (type !== undefined) {
                    this.lastClearedMarks.set(type, ((_this$lastClearedMark = this.lastClearedMarks.get(type)) != null ? _this$lastClearedMark : 0) + 1);
                    this.markTypeAt["delete"](_i);
                  }
                case 42:
                  _i++;
                  _context.next = 37;
                  break;
                case 45:
                  this.markMask &= ~collectedMask;
                case 46:
                  PerformanceProfiler.logSlow('Clear/finalize state', finalizeStartedAt, {
                    lineCount: lineCount
                  });
                  return _context.abrupt("return", {
                    lineCount: lineCount,
                    clearCenter: clearCenter
                  });
                case 48:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function checkAndClearLines(_x, _x2) {
            return _checkAndClearLines.apply(this, arguments);
          }
          return checkAndClearLines;
        }();
        _proto.repaintDowngradedSurvivors = function repaintDowngradedSurvivors(downgradedMask) {
          if (downgradedMask === 0n) return;
          var board = this.gm.getGameScreen().getBoard();
          for (var i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
            if ((downgradedMask >> CELL_SHIFTS[i] & 1n) === 0n) continue;
            var markType = this.markTypeAt.get(i);
            if (markType === undefined) continue;
            board.paintGemCell(Math.floor(i / GRID_SIZE), i % GRID_SIZE, markType, false);
          }
        };
        _proto.showPreview = function showPreview(def, worldPos, colorIndex) {
          var gridPos = this.getNearestCell(worldPos);
          if (!gridPos) {
            this.clearPreview();
            return;
          }
          this.showPreviewAt(def, gridPos.r - def.shape[0].y, gridPos.c - def.shape[0].x, colorIndex);
        }

        /** Same as `showPreview` for callers that already resolved the drop cell. */;
        _proto.showPreviewAt = function showPreviewAt(def, startR, startC, colorIndex) {
          var board = this.gm.getGameScreen().getBoard();
          if (startR === this.lastPreviewR && startC === this.lastPreviewC) return;
          if (!this.canPlace(def, startR, startC)) {
            this.clearPreviewCache();
            board.clearPreview();
            return;
          }
          this.lastPreviewR = startR;
          this.lastPreviewC = startC;
          var positions = def.shape.map(function (p) {
            return {
              r: startR + p.y,
              c: startC + p.x
            };
          });
          var simMask = this.boardMask | def.mask << CELL_SHIFTS[startR * GRID_SIZE + startC];
          var _this$findFullLines3 = this.findFullLines(simMask),
            rows = _this$findFullLines3.rows,
            cols = _this$findFullLines3.cols;
          var predictedCombo = this.gm.getScoreLogic().getCombo() + rows.length + cols.length;
          // A single-palette skin has no spectrum for the rainbow to echo, so it stays on the plain
          // border in its own accent.
          var isRainbow = predictedCombo >= 5 && !SkinService.isSinglePalette();
          board.showPreview(positions, rows, cols, colorIndex, isRainbow);
        };
        _proto.clearPreview = function clearPreview() {
          this.clearPreviewCache();
          this.gm.getGameScreen().getBoard().clearPreview();
        };
        _proto.clearPreviewCache = function clearPreviewCache() {
          this.lastPreviewR = -1;
          this.lastPreviewC = -1;
        };
        _proto.countValidPositions = function countValidPositions(def) {
          var count = 0;
          var maxR = GRID_SIZE - def.maxR;
          var maxC = GRID_SIZE - def.maxC;
          for (var r = 0; r < maxR; r++) {
            for (var c = 0; c < maxC; c++) {
              if ((this.boardMask & def.mask << CELL_SHIFTS[r * GRID_SIZE + c]) === 0n) count++;
            }
          }
          return count;
        };
        _proto.hasFullLine = function hasFullLine(mask) {
          for (var i = 0; i < GRID_SIZE; i++) {
            if ((mask >> ROW_SHIFTS[i] & ROW_MASK) === ROW_MASK) return true;
            if ((mask & COL_MASKS[i]) === COL_MASKS[i]) return true;
          }
          return false;
        };
        _proto.getSpawnPools = function getSpawnPools() {
          var optMask = this.buildOptimisticMask();
          var now = [];
          var optimistic = [];
          for (var _iterator4 = _createForOfIteratorHelperLoose(BLOCK_LIBRARY), _step4; !(_step4 = _iterator4()).done;) {
            var def = _step4.value;
            var fitsNow = this.fitsMask(def, this.boardMask);
            if (fitsNow) now.push(def);
            if (fitsNow || this.fitsMask(def, optMask)) optimistic.push(def);
          }
          return {
            now: now,
            optimistic: optimistic
          };
        };
        _proto.reset = function reset() {
          this.boardMask = 0n;
          this.markMask = 0n;
          this.markTypeAt.clear();
          this.lastClearedMarks.clear();
          this.armorMask = 0n;
          this.pendingClear = null;
          this.lastPlacedColorIndex = 0;
          this.clearPreviewCache();
          this.gm.getGameScreen().getBoard().resetAll();
        };
        _proto.setStartingBoard = function setStartingBoard(filled, marks, armor) {
          if (marks === void 0) {
            marks = [];
          }
          if (armor === void 0) {
            armor = [];
          }
          this.boardMask = 0n;
          this.markMask = 0n;
          this.markTypeAt.clear();
          this.lastClearedMarks.clear();
          this.armorMask = 0n;
          this.pendingClear = null;
          var board = this.gm.getGameScreen().getBoard();
          var armorBits = new Set(armor.map(function (_ref) {
            var r = _ref[0],
              c = _ref[1];
            return r * GRID_SIZE + c;
          }));
          for (var _iterator5 = _createForOfIteratorHelperLoose(filled), _step5; !(_step5 = _iterator5()).done;) {
            var _step5$value = _step5.value,
              r = _step5$value[0],
              c = _step5$value[1],
              colorIndex = _step5$value[2];
            this.boardMask |= 1n << CELL_SHIFTS[r * GRID_SIZE + c];
            board.paint(r, c, colorIndex);
          }
          for (var _iterator6 = _createForOfIteratorHelperLoose(marks), _step6; !(_step6 = _iterator6()).done;) {
            var _step6$value = _step6.value,
              _r = _step6$value[0],
              _c = _step6$value[1],
              type = _step6$value[2];
            var bit = _r * GRID_SIZE + _c;
            this.boardMask |= 1n << CELL_SHIFTS[bit];
            var armored = armorBits.has(bit);
            if (armored) this.armorMask |= 1n << CELL_SHIFTS[bit];
            this.addBoardMark(_r, _c, type, armored);
          }
          this.clearPreviewCache();
        };
        _proto.addBoardMark = function addBoardMark(r, c, type, armored) {
          if (armored === void 0) {
            armored = false;
          }
          var bit = r * GRID_SIZE + c;
          this.markMask |= 1n << CELL_SHIFTS[bit];
          this.markTypeAt.set(bit, type);
          this.gm.getGameScreen().getBoard().paintGemCell(r, c, type, armored);
        };
        _proto.takeClearedMarks = function takeClearedMarks() {
          var out = this.lastClearedMarks;
          this.lastClearedMarks = new Map();
          return out;
        };
        _proto.canPlaceSet = function canPlaceSet(defs) {
          return canPlaceSetWithArmor(defs, this.boardMask, this.armorMask);
        };
        _proto.isBoardEmpty = function isBoardEmpty() {
          return this.boardMask === 0n;
        };
        _proto.getBoardMask = function getBoardMask() {
          return this.boardMask;
        };
        _proto.getBoardWorldCenter = function getBoardWorldCenter() {
          return this.gm.getGameScreen().getBoard().getBoardWorldCenter();
        };
        _proto.getLastPlacedColor = function getLastPlacedColor() {
          return effectColor(this.lastPlacedColorIndex).clone();
        };
        _proto.fitsMask = function fitsMask(def, mask) {
          var maxR = GRID_SIZE - def.maxR;
          var maxC = GRID_SIZE - def.maxC;
          for (var r = 0; r < maxR; r++) {
            for (var c = 0; c < maxC; c++) {
              if ((mask & def.mask << CELL_SHIFTS[r * GRID_SIZE + c]) === 0n) return true;
            }
          }
          return false;
        };
        _proto.buildOptimisticMask = function buildOptimisticMask() {
          var mask = this.boardMask;
          for (var i = 0; i < GRID_SIZE; i++) {
            var rowFilled = popCount(this.boardMask >> ROW_SHIFTS[i] & ROW_MASK);
            if (rowFilled >= GRID_SIZE - 2) mask &= ~(ROW_MASK << ROW_SHIFTS[i]);
            var colFilled = popCount(this.boardMask & COL_MASKS[i]);
            if (colFilled >= GRID_SIZE - 2) mask &= ~COL_MASKS[i];
          }
          return mask;
        };
        return GridLogic;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/HandHint.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, UIOpacity, Vec3, tween, Tween, Component, GameEvents;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UIOpacity = module.UIOpacity;
      Vec3 = module.Vec3;
      tween = module.tween;
      Tween = module.Tween;
      Component = module.Component;
    }, function (module) {
      GameEvents = module.GameEvents;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "4cb68BCzGRBR7MCZ8+OmtWY", "HandHint", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var GLIDE_SECONDS = 0.85;
      var PRESS_SECONDS = 0.18;
      var FADE_SECONDS = 0.2;
      var GAP_SECONDS = 0.35;
      var PRESSED_SCALE = 0.82;
      var HandHint = exports('HandHint', (_dec = ccclass('HandHint'), _dec2 = property(UIOpacity), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(HandHint, _Component);
        function HandHint() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "opacity", _descriptor, _assertThisInitialized(_this));
          /** Shifts the whole glide sideways: the fingertip lands this far right of what it points at. */
          _initializerDefineProperty(_this, "xOffset", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "yOffset", _descriptor3, _assertThisInitialized(_this));
          _this.from = new Vec3();
          _this.to = new Vec3();
          _this.hasTarget = false;
          _this.suspend = function () {
            if (!_this.hasTarget) return;
            _this.stop();
          };
          _this.resume = function () {
            if (!_this.hasTarget) return;
            _this.play();
          };
          return _this;
        }
        var _proto = HandHint.prototype;
        _proto.__preload = function __preload() {
          this.registerEvents();
          if (!this.hasTarget) this.node.active = false;
        };
        _proto.onDestroy = function onDestroy() {
          this.unregisterEvents();
        };
        _proto.registerEvents = function registerEvents() {
          this.node.scene.on(GameEvents.ON_DRAG_BLOCK, this.suspend, this);
          this.node.scene.on(GameEvents.ON_DRAG_BLOCK_END, this.resume, this);
          this.node.scene.on(GameEvents.ON_DRAG_BLOCK_CANCEL, this.resume, this);
        };
        _proto.unregisterEvents = function unregisterEvents() {
          this.node.scene.off(GameEvents.ON_DRAG_BLOCK, this.suspend, this);
          this.node.scene.off(GameEvents.ON_DRAG_BLOCK_END, this.resume, this);
          this.node.scene.off(GameEvents.ON_DRAG_BLOCK_CANCEL, this.resume, this);
        };
        _proto.showDrag = function showDrag(slotWorldPos, cellWorldPos) {
          this.from.set(slotWorldPos.x + this.xOffset, slotWorldPos.y + this.yOffset, slotWorldPos.z);
          this.to.set(cellWorldPos.x + this.xOffset, cellWorldPos.y + this.yOffset, 0);
          this.hasTarget = true;
          this.play();
        };
        _proto.hide = function hide() {
          this.hasTarget = false;
          this.stop();
        };
        _proto.play = function play() {
          var _this2 = this;
          this.stop();
          var fade = this.opacity;
          this.node.active = true;
          tween(this.node).repeatForever(tween(this.node).call(function () {
            _this2.node.setWorldPosition(_this2.from);
            _this2.node.setScale(1, 1, 1);
            if (fade) fade.opacity = 255;
          }).to(PRESS_SECONDS, {
            scale: new Vec3(PRESSED_SCALE, PRESSED_SCALE, 1)
          }).to(GLIDE_SECONDS, {
            worldPosition: this.to.clone()
          }, {
            easing: 'quadInOut'
          }).to(PRESS_SECONDS, {
            scale: new Vec3(1, 1, 1)
          }).delay(GAP_SECONDS)).start();
          if (!fade) return;
          tween(fade).repeatForever(tween(fade).delay(PRESS_SECONDS * 2 + GLIDE_SECONDS).to(FADE_SECONDS, {
            opacity: 0
          }).delay(GAP_SECONDS - FADE_SECONDS).set({
            opacity: 255
          })).start();
        };
        _proto.stop = function stop() {
          Tween.stopAllByTarget(this.node);
          if (this.opacity) Tween.stopAllByTarget(this.opacity);
          this.node.active = false;
        };
        return HandHint;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "opacity", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "xOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 60;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "yOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -50;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LayoutManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, screen, ResolutionPolicy, view, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      screen = module.screen;
      ResolutionPolicy = module.ResolutionPolicy;
      view = module.view;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "a771euKiM5ITZNcK01TS0Bq", "LayoutManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var LayoutManager = exports('LayoutManager', (_dec = ccclass('LayoutManager'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LayoutManager, _Component);
        function LayoutManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "designWidth", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "designHeight", _descriptor2, _assertThisInitialized(_this));
          _this.currentPolicy = -1;
          return _this;
        }
        var _proto = LayoutManager.prototype;
        _proto.onLoad = function onLoad() {
          this.applyLayout();
          screen.on('window-resize', this.applyLayout, this);
          screen.on('orientation-change', this.applyLayout, this);
          screen.on('fullscreen-change', this.applyLayout, this);
        };
        _proto.onDestroy = function onDestroy() {
          screen.off('window-resize', this.applyLayout, this);
          screen.off('orientation-change', this.applyLayout, this);
          screen.off('fullscreen-change', this.applyLayout, this);
        };
        _proto.applyLayout = function applyLayout() {
          var _screen$windowSize = screen.windowSize,
            width = _screen$windowSize.width,
            height = _screen$windowSize.height;
          var policy = width > height ? ResolutionPolicy.FIXED_HEIGHT : ResolutionPolicy.FIXED_WIDTH;
          if (policy === this.currentPolicy) return;
          this.currentPolicy = policy;
          view.setDesignResolutionSize(this.designWidth, this.designHeight, policy);
        };
        return LayoutManager;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "designWidth", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1080;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "designHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1920;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LeaderboardList.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ListWindow.ts', './PlayerLine.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, ScrollView, Prefab, UITransform, instantiate, Component, firstVisibleRow, contentHeightFor, centreOffsetFor, poolSizeFor, PlayerLine;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      ScrollView = module.ScrollView;
      Prefab = module.Prefab;
      UITransform = module.UITransform;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      firstVisibleRow = module.firstVisibleRow;
      contentHeightFor = module.contentHeightFor;
      centreOffsetFor = module.centreOffsetFor;
      poolSizeFor = module.poolSizeFor;
    }, function (module) {
      PlayerLine = module.PlayerLine;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "3af52TqidRCdar3+x+gSiPr", "LeaderboardList", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var NAME_MAX_LENGTH = 8;
      var NAME_CUT_MARK = '_';
      function displayName(name) {
        if (name.length <= NAME_MAX_LENGTH) return name;
        return name.slice(0, NAME_MAX_LENGTH - NAME_CUT_MARK.length) + NAME_CUT_MARK;
      }
      var LeaderboardList = exports('LeaderboardList', (_dec = ccclass('LeaderboardList'), _dec2 = property(ScrollView), _dec3 = property(Prefab), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LeaderboardList, _Component);
        function LeaderboardList() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "scrollView", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rowTemplate", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rowStride", _descriptor3, _assertThisInitialized(_this));
          _this.rows = [];
          _this.pool = [];
          _this.boundFirst = -1;
          _this.pendingFocus = -1;
          _this.cached = null;
          return _this;
        }
        var _proto = LeaderboardList.prototype;
        _proto.show = function show(rows, focusIndex) {
          this.rows = rows;
          this.pendingFocus = focusIndex;
          var geo = this.geometry();
          if (geo && geo.viewBox.height > 0) this.layout(geo, focusIndex);
        };
        _proto.update = function update() {
          if (this.rows.length === 0) return;
          var geo = this.geometry();
          if (!geo || geo.viewBox.height <= 0) return;
          if (this.pendingFocus >= 0) {
            this.layout(geo, this.pendingFocus);
            return;
          }
          if (this.pool.length < this.wantedPoolSize(geo)) this.growPool(geo);
          var first = firstVisibleRow(this.offsetOf(geo), this.rowStride, this.rows.length, this.pool.length);
          if (first !== this.boundFirst) this.bind(geo, first);
        };
        _proto.layout = function layout(geo, focusIndex) {
          this.pendingFocus = -1;
          this.scrollView.stopAutoScroll();
          geo.contentBox.setContentSize(geo.contentBox.width, contentHeightFor(this.rows.length, this.rowStride));
          this.growPool(geo);
          // Content has to be sized before the offset is clamped, or the snap measures against a
          // stale height and drops the player at the top of the board.
          var offset = centreOffsetFor(focusIndex, this.rowStride, geo.viewBox.height, this.rows.length);
          this.applyOffset(geo, offset);
          this.boundFirst = -1;
          this.bind(geo, firstVisibleRow(offset, this.rowStride, this.rows.length, this.pool.length));
        }

        // Resolved from the ScrollView rather than wired as properties of their own: these are its
        // nodes, and a separate reference could drift from whatever `scrollView.content` points at.
        ;

        _proto.geometry = function geometry() {
          var _this$scrollView;
          if (this.cached) return this.cached;
          var content = (_this$scrollView = this.scrollView) == null ? void 0 : _this$scrollView.content;
          var view = content == null ? void 0 : content.parent;
          var contentBox = content == null ? void 0 : content.getComponent(UITransform);
          var viewBox = view == null ? void 0 : view.getComponent(UITransform);
          if (!content || !contentBox || !viewBox) return null;
          this.cached = {
            content: content,
            contentBox: contentBox,
            viewBox: viewBox
          };
          return this.cached;
        };
        _proto.topEdgeOf = function topEdgeOf(box) {
          return box.height * (1 - box.anchorY);
        };
        _proto.offsetOf = function offsetOf(geo) {
          var contentTop = geo.content.position.y + this.topEdgeOf(geo.contentBox);
          return contentTop - this.topEdgeOf(geo.viewBox);
        };
        _proto.applyOffset = function applyOffset(geo, offset) {
          var y = offset + this.topEdgeOf(geo.viewBox) - this.topEdgeOf(geo.contentBox);
          geo.content.setPosition(geo.content.position.x, y);
        };
        _proto.wantedPoolSize = function wantedPoolSize(geo) {
          return poolSizeFor(geo.viewBox.height, this.rowStride, this.rows.length);
        };
        _proto.growPool = function growPool(geo) {
          var wanted = this.wantedPoolSize(geo);
          while (this.pool.length < wanted) {
            var line = instantiate(this.rowTemplate).getComponent(PlayerLine);
            if (!line) return;
            line.node.parent = geo.content;
            this.pool.push(line);
          }
          for (var i = wanted; i < this.pool.length; i++) this.pool[i].setVisible(false);
        };
        _proto.bind = function bind(geo, first) {
          this.boundFirst = first;
          var top = this.topEdgeOf(geo.contentBox);
          var centreX = geo.contentBox.width * (0.5 - geo.contentBox.anchorX);
          for (var slot = 0; slot < this.pool.length; slot++) {
            var index = first + slot;
            var line = this.pool[slot];
            var row = this.rows[index];
            if (!row) {
              line.setVisible(false);
              continue;
            }
            line.setVisible(true);
            line.node.setPosition(centreX, top - (index * this.rowStride + this.rowStride / 2));
            line.set("" + (index + 1), displayName(row.name), row.score > 0 ? "" + row.score : '-', row.photoUrl, row.isPlayer);
          }
        };
        return LeaderboardList;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "rowTemplate", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "rowStride", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 240;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LineClear.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './TweenUtils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, _decorator, Sprite, UITransform, UIOpacity, Node, Component, tween, CELL_SIZE, runTweenAsync;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      UITransform = module.UITransform;
      UIOpacity = module.UIOpacity;
      Node = module.Node;
      Component = module.Component;
      tween = module.tween;
    }, function (module) {
      CELL_SIZE = module.CELL_SIZE;
    }, function (module) {
      runTweenAsync = module.runTweenAsync;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "d0a54qgGOxCcKLk+9/8sosN", "LineClear", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      // The beam sprite (9-sliced board.png) has feathered edges, so its visible core falls short of the
      // node's content size. Oversize the beam by this much so the visible beam reaches the board edges.
      var BEAM_EDGE_PAD = 18;
      var LineClear = exports('LineClear', (_dec = ccclass('LineClear'), _dec2 = property(Sprite), _dec3 = property(UITransform), _dec4 = property(UIOpacity), _dec5 = property(Node), _dec6 = property(UITransform), _dec7 = property(Node), _dec8 = property(UITransform), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LineClear, _Component);
        function LineClear() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "sprite", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "uiTransform", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "opacity", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rainbowStreakNode", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rainbowStreakTransform", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rainbowBorderNode", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rainbowBorderTransform", _descriptor7, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = LineClear.prototype;
        /**
         * BlockBlast-style beam:
         *   Phase 2 — a short colored slash appears at the line's center and rapidly
         *   spears outward along the line to reach both ends (1–3 frames).
         *   Phase 3 — the now full-length beam thickens slightly (wave to edges) while
         *   fading out, synchronized with the particle burst on the Board side.
         *
         * Rainbow clears swap the single-color beam for a rainbow wash + glowing rainbow outline
         * (the two Rainbow_* assets) — see playRainbowBeam.
         */
        _proto.playLineClearEffect = /*#__PURE__*/
        function () {
          var _playLineClearEffect = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(worldPos, isRow, lineLength, color, isRainbow) {
            var _this2 = this;
            var startLength, startThickness, midThickness, endThickness, fullLength, size, updateSize, spearLength, spearThickness, waveThickness, fadeOut;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (isRainbow === void 0) {
                    isRainbow = false;
                  }
                  // Both setters copy their value, so the caller's scratch Vec3/Color are safe to assign.
                  this.node.worldPosition = worldPos;
                  if (!isRainbow) {
                    _context.next = 6;
                    break;
                  }
                  _context.next = 5;
                  return this.playRainbowBeam(isRow, lineLength);
                case 5:
                  return _context.abrupt("return");
                case 6:
                  this.setRainbowLayersActive(false);
                  this.sprite.enabled = true;
                  startLength = lineLength * 0.2;
                  startThickness = CELL_SIZE * 0.4;
                  midThickness = CELL_SIZE * 0.7;
                  endThickness = CELL_SIZE;
                  fullLength = lineLength + BEAM_EDGE_PAD;
                  this.uiTransform.setContentSize(isRow ? startLength : startThickness, isRow ? startThickness : startLength);
                  this.sprite.color = color;
                  this.opacity.opacity = 255;
                  size = {
                    main: startLength,
                    cross: startThickness
                  };
                  updateSize = function updateSize() {
                    _this2.uiTransform.setContentSize(isRow ? size.main : size.cross, isRow ? size.cross : size.main);
                  }; // Phase 2: spear lengthwise from center to full line length (very fast)
                  spearLength = runTweenAsync(tween(size).to(0.05, {
                    main: fullLength
                  }, {
                    easing: 'expoOut',
                    onUpdate: updateSize
                  }));
                  spearThickness = runTweenAsync(tween(size).to(0.04, {
                    cross: midThickness
                  }, {
                    easing: 'sineOut',
                    onUpdate: updateSize
                  }));
                  _context.next = 22;
                  return Promise.all([spearLength, spearThickness]);
                case 22:
                  // Phase 3: wave thickens to full cell and opacity fades — synced with particles
                  waveThickness = runTweenAsync(tween(size).to(0.2, {
                    cross: endThickness
                  }, {
                    easing: 'expoOut',
                    onUpdate: updateSize
                  }));
                  fadeOut = runTweenAsync(tween(this.opacity).to(0.28, {
                    opacity: 0
                  }, {
                    easing: 'quadIn'
                  }));
                  _context.next = 26;
                  return Promise.all([waveThickness, fadeOut]);
                case 26:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function playLineClearEffect(_x, _x2, _x3, _x4, _x5) {
            return _playLineClearEffect.apply(this, arguments);
          }
          return playLineClearEffect;
        }()
        /**
         * Rainbow variant: the wash and the outline are horizontal images sized to the line and rotated
         * for columns; both spear out from center and thicken while the node opacity fades. The border
         * sits slightly outside the wash so its rainbow glow reads as an outline around the cleared line.
         */;

        _proto.playRainbowBeam = /*#__PURE__*/
        function () {
          var _playRainbowBeam = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(isRow, lineLength) {
            var startLength, startThickness, midThickness, endThickness, angle, layers, _iterator, _step, layer, size, apply, spearLength, spearThickness, waveThickness, fadeOut;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  this.sprite.enabled = false;
                  this.opacity.opacity = 255;
                  startLength = lineLength * 0.2;
                  startThickness = CELL_SIZE * 0.4;
                  midThickness = CELL_SIZE * 0.7;
                  endThickness = CELL_SIZE;
                  angle = isRow ? 0 : 90;
                  layers = this.getRainbowLayers();
                  for (_iterator = _createForOfIteratorHelperLoose(layers); !(_step = _iterator()).done;) {
                    layer = _step.value;
                    layer.node.active = true;
                    layer.node.angle = angle;
                  }
                  size = {
                    main: startLength,
                    cross: startThickness
                  };
                  apply = function apply() {
                    for (var _iterator2 = _createForOfIteratorHelperLoose(layers), _step2; !(_step2 = _iterator2()).done;) {
                      var layer = _step2.value;
                      layer.ui.setContentSize(size.main + layer.lengthPad, size.cross * layer.thicknessScale);
                    }
                  };
                  apply();
                  spearLength = runTweenAsync(tween(size).to(0.05, {
                    main: lineLength
                  }, {
                    easing: 'expoOut',
                    onUpdate: apply
                  }));
                  spearThickness = runTweenAsync(tween(size).to(0.04, {
                    cross: midThickness
                  }, {
                    easing: 'sineOut',
                    onUpdate: apply
                  }));
                  _context2.next = 16;
                  return Promise.all([spearLength, spearThickness]);
                case 16:
                  waveThickness = runTweenAsync(tween(size).to(0.2, {
                    cross: endThickness
                  }, {
                    easing: 'expoOut',
                    onUpdate: apply
                  }));
                  fadeOut = runTweenAsync(tween(this.opacity).to(0.28, {
                    opacity: 0
                  }, {
                    easing: 'quadIn'
                  }));
                  _context2.next = 20;
                  return Promise.all([waveThickness, fadeOut]);
                case 20:
                  this.setRainbowLayersActive(false);
                  this.sprite.enabled = true;
                case 22:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function playRainbowBeam(_x6, _x7) {
            return _playRainbowBeam.apply(this, arguments);
          }
          return playRainbowBeam;
        }();
        _proto.getRainbowLayers = function getRainbowLayers() {
          return [{
            node: this.rainbowStreakNode,
            ui: this.rainbowStreakTransform,
            thicknessScale: 1,
            lengthPad: 0
          }, {
            node: this.rainbowBorderNode,
            ui: this.rainbowBorderTransform,
            thicknessScale: 1.2,
            lengthPad: CELL_SIZE * 0.5 - 30
          }];
        };
        _proto.setRainbowLayersActive = function setRainbowLayersActive(active) {
          this.rainbowStreakNode.active = active;
          this.rainbowBorderNode.active = active;
        };
        return LineClear;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uiTransform", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "opacity", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rainbowStreakNode", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rainbowStreakTransform", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "rainbowBorderNode", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "rainbowBorderTransform", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ListWindow.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        centreOffsetFor: centreOffsetFor,
        contentHeightFor: contentHeightFor,
        firstVisibleRow: firstVisibleRow,
        poolSizeFor: poolSizeFor
      });
      cclegacy._RF.push({}, "6926dvIjnlOx6jR0pATL37v", "ListWindow", undefined);
      var EDGE_SLACK_ROWS = 2;
      function contentHeightFor(total, rowStride) {
        return total * rowStride;
      }
      function poolSizeFor(viewHeight, rowStride, total) {
        return Math.min(total, Math.ceil(viewHeight / rowStride) + EDGE_SLACK_ROWS);
      }
      function firstVisibleRow(offsetY, rowStride, total, poolSize) {
        var last = Math.max(0, total - poolSize);
        return Math.min(last, Math.max(0, Math.floor(offsetY / rowStride)));
      }
      function centreOffsetFor(index, rowStride, viewHeight, total) {
        var rowCentre = index * rowStride + rowStride / 2;
        var maxOffset = Math.max(0, contentHeightFor(total, rowStride) - viewHeight);
        return Math.min(maxOffset, Math.max(0, rowCentre - viewHeight / 2));
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LoadingScreen.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BaseScreen.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, SpriteFrame, Node, UITransform, Sprite, BaseScreen;
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
      SpriteFrame = module.SpriteFrame;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
    }, function (module) {
      BaseScreen = module.BaseScreen;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "dcd9fB7Wa1H5IH2SEgyakrv", "LoadingScreen", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var PIVOT_X = 0.5;
      var PIVOT_Y = 0.5;
      var POSE_SQUARE = [[0, 0], [1, 0], [0, 1], [1, 1]];
      var POSE_L_VERTICAL = [[0, -1], [1, 1], [0, 0], [0, 1]];
      var POSE_L_HORIZONTAL = [[2, 0], [0, 1], [1, 0], [0, 0]];
      var CYCLE_REMAP = [1, 3, 0, 2];
      var MOVE_LENGTH = 2.5;
      var RETURN_CTRL_X = 1.1;
      var RETURN_CTRL_Y = 1.35;
      var CELL_COUNT = 4;
      var SEGMENT_COUNT = 6;
      function easeInOutQuad(u) {
        return u < 0.5 ? 2 * u * u : 1 - 2 * (1 - u) * (1 - u);
      }
      var LoadingScreen = exports('LoadingScreen', (_dec = ccclass('LoadingScreen'), _dec2 = property(SpriteFrame), _dec3 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseScreen) {
        _inheritsLoose(LoadingScreen, _BaseScreen);
        function LoadingScreen() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _BaseScreen.call.apply(_BaseScreen, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "blockSprite", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "blockContainer", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "movingSpeed", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cellSize", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "cellSpacing", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "holdDuration", _descriptor6, _assertThisInitialized(_this));
          _this.cells = [];
          _this.tilts = [];
          _this.isLoading = false;
          _this.cycleTime = 0;
          return _this;
        }
        var _proto = LoadingScreen.prototype;
        _proto.onLoad = function onLoad() {
          this.buildCells();
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data) {
            var parent;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // ScreenManager appends every lazily loaded screen after this one, so it has to claim the
                  // last sibling slot on each open or it opens behind them.
                  parent = this.node.parent;
                  if (parent) this.node.setSiblingIndex(parent.children.length - 1);
                  _context.next = 4;
                  return _BaseScreen.prototype.openScreenAsync.call(this, data);
                case 4:
                  this.startLoading();
                case 5:
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
                  this.isLoading = false;
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
        _proto.startLoading = function startLoading() {
          this.isLoading = true;
          this.cycleTime = 0;
          this.tilts = [0, 0, 0, 0];
          for (var i = 0; i < this.cells.length; i++) {
            this.setCell(i, POSE_SQUARE[i][0], POSE_SQUARE[i][1], 0);
          }
        };
        _proto.update = function update(dt) {
          if (!this.isLoading || !this.blockContainer || this.cells.length < CELL_COUNT) return;
          if (this.movingSpeed <= 0) return;
          var durations = this.segmentDurations();
          var cycle = 0;
          for (var _iterator = _createForOfIteratorHelperLoose(durations), _step; !(_step = _iterator()).done;) {
            var d = _step.value;
            cycle += d;
          }
          if (cycle <= 0) return;
          this.cycleTime += dt;
          while (this.cycleTime >= cycle) {
            this.cycleTime -= cycle;
            this.onCycleEnd();
          }
          var t = this.cycleTime;
          var segment = 0;
          while (segment < SEGMENT_COUNT - 1 && t >= durations[segment]) {
            t -= durations[segment];
            segment++;
          }
          var p = durations[segment] > 0 ? easeInOutQuad(t / durations[segment]) : 1;
          this.renderSegment(segment, p);
        }

        /** [hold, sq→L, hold, turn 90°, hold, L→sq] — all three moves share one duration. */;
        _proto.segmentDurations = function segmentDurations() {
          var move = MOVE_LENGTH / this.movingSpeed;
          return [this.holdDuration, move, this.holdDuration, move, this.holdDuration, move];
        };
        _proto.renderSegment = function renderSegment(segment, p) {
          switch (segment) {
            case 0:
              this.applyPose(POSE_SQUARE, segment);
              break;
            case 1:
              {
                var _POSE_SQUARE$ = POSE_SQUARE[0],
                  ax = _POSE_SQUARE$[0],
                  ay = _POSE_SQUARE$[1];
                var _POSE_L_VERTICAL$ = POSE_L_VERTICAL[0],
                  tx = _POSE_L_VERTICAL$[0],
                  ty = _POSE_L_VERTICAL$[1];
                this.setCell(0, ax + (tx - ax) * p, ay + (ty - ay) * p, this.roleAngle(0, segment));
                this.orbitRoles(1, POSE_SQUARE, segment, p);
                break;
              }
            case 2:
              this.applyPose(POSE_L_VERTICAL, segment);
              break;
            case 3:
              this.orbitRoles(0, POSE_L_VERTICAL, segment, p);
              break;
            case 4:
              this.applyPose(POSE_L_HORIZONTAL, segment);
              break;
            default:
              {
                var _POSE_L_HORIZONTAL$ = POSE_L_HORIZONTAL[0],
                  sx = _POSE_L_HORIZONTAL$[0],
                  sy = _POSE_L_HORIZONTAL$[1];
                var ex = 0,
                  ey = 1;
                var inv = 1 - p;
                var bx = inv * inv * sx + 2 * inv * p * RETURN_CTRL_X + p * p * ex;
                var by = inv * inv * sy + 2 * inv * p * RETURN_CTRL_Y + p * p * ey;
                this.setCell(0, bx, by, this.roleAngle(0, segment));
                this.orbitRoles(1, POSE_L_HORIZONTAL, segment, p);
                break;
              }
          }
        };
        _proto.applyPose = function applyPose(pose, segment) {
          for (var i = 0; i < CELL_COUNT; i++) {
            this.setCell(i, pose[i][0], pose[i][1], this.roleAngle(i, segment));
          }
        };
        _proto.orbitRoles = function orbitRoles(first, from, segment, p) {
          var phi = Math.PI / 2 * p;
          var cos = Math.cos(phi);
          var sin = Math.sin(phi);
          for (var i = first; i < CELL_COUNT; i++) {
            var rx = from[i][0] - PIVOT_X;
            var ry = from[i][1] - PIVOT_Y;
            var gx = PIVOT_X + rx * cos - ry * sin;
            var gy = PIVOT_Y + rx * sin + ry * cos;
            this.setCell(i, gx, gy, this.roleAngle(i, segment) - 90 * p);
          }
        };
        _proto.roleAngle = function roleAngle(role, segment) {
          var done = 0;
          if (role === 0) {
            if (segment > 3) done = 1;
          } else {
            if (segment > 1) done++;
            if (segment > 3) done++;
          }
          return this.tilts[role] - 90 * done;
        };
        _proto.onCycleEnd = function onCycleEnd() {
          var _this2 = this;
          this.tilts[0] = (this.tilts[0] - 90) % 360;
          for (var i = 1; i < CELL_COUNT; i++) this.tilts[i] = (this.tilts[i] - 270) % 360;
          var nodes = CYCLE_REMAP.map(function (r) {
            return _this2.cells[r];
          });
          var tilts = CYCLE_REMAP.map(function (r) {
            return _this2.tilts[r];
          });
          this.cells = nodes;
          this.tilts = tilts;
        };
        _proto.setCell = function setCell(i, gx, gy, angle) {
          var step = this.cellSize + this.cellSpacing;
          var cell = this.cells[i];
          cell.setPosition((gx - PIVOT_X) * step, -(gy - PIVOT_Y) * step, 0);
          cell.angle = angle;
        };
        _proto.buildCells = function buildCells() {
          if (this.cells.length > 0 || !this.blockContainer || !this.blockSprite) return;
          for (var i = 0; i < CELL_COUNT; i++) {
            var cell = new Node('cell');
            cell.setParent(this.blockContainer);
            var ui = cell.addComponent(UITransform);
            ui.setContentSize(this.cellSize, this.cellSize);
            var sprite = cell.addComponent(Sprite);
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            sprite.spriteFrame = this.blockSprite;
            this.cells.push(cell);
          }
        };
        return LoadingScreen;
      }(BaseScreen), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "blockSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "blockContainer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "movingSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "cellSize", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 66;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "cellSpacing", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 6;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "holdDuration", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.35;
        }
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./BootLoader.ts', './AdventureLevels.ts', './AdventurePicture.ts', './AudioManager.ts', './CellSkins.ts', './DailyQuests.ts', './Difficulty.ts', './ShopItems.ts', './TournamentNpcs.ts', './TournamentRoster.ts', './WheelPrizes.ts', './constants.ts', './Block.ts', './BlockCraftPool.ts', './Cell.ts', './BoardGeometry.ts', './ClearBoardEffect.ts', './LineClear.ts', './PageTurnTransition.ts', './ScreenConfetti.ts', './TouchRipple.ts', './EffectManager.ts', './GameManager.ts', './LayoutManager.ts', './ScreenManager.ts', './AdventureLogic.ts', './BlockLogic.ts', './DailyQuestLogic.ts', './DirectorLogic.ts', './GridLogic.ts', './PlacementLogic.ts', './ScoreLogic.ts', './SpawnPlanner.ts', './BandDrainSolver.ts', './ForwardSimSolver.ts', './PlacementScoring.ts', './RegionTiler.ts', './ReviveSolver.ts', './AdventureMode.ts', './ClassicMode.ts', './GameModeRules.ts', './TournamentMode.ts', './TutorialMode.ts', './TutorialScript.ts', './GameEvents.ts', './AdventureHud.ts', './BestScoreUI.ts', './Board.ts', './CurrencyCounter.ts', './DailyQuestRow.ts', './HandHint.ts', './LeaderboardList.ts', './PlayerLine.ts', './QuestToast.ts', './ScoreUI.ts', './ShopItemCard.ts', './SkinRow.ts', './TransitionLayer.ts', './VersusHud.ts', './BaseScreen.ts', './GameScreen.ts', './LoadingScreen.ts', './AdsUtils.ts', './AdventureLevelLoader.ts', './AvatarLoader.ts', './BitUtils.ts', './CameraUtils.ts', './DailyQuestService.ts', './DataManager.ts', './ListWindow.ts', './ModeUtils.ts', './PageTurnGeometry.ts', './PerformanceProfiler.ts', './ScreenEntrance.ts', './ScreenEntranceGeometry.ts', './ShopService.ts', './SkinService.ts', './SpriteLoader.ts', './TournamentProgressService.ts', './TutorialGate.ts', './TweenUtils.ts', './WalletService.ts', './WheelSpinService.ts'], function () {
  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/ModeUtils.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "04f2ddeXZZPLbEf6P3v2r1Q", "ModeUtils", undefined);
      var GAME_MODE = exports('GAME_MODE', {
        CLASSIC: 'classic',
        TOURNAMENT: 'tournament',
        ADVENTURE: 'adventure',
        TUTORIAL: 'tutorial'
      });
      var ModeUtils = exports('default', /*#__PURE__*/function () {
        function ModeUtils() {
          this.currentMode = GAME_MODE.CLASSIC;
        }
        ModeUtils.getInstance = function getInstance() {
          if (!ModeUtils.instance) {
            ModeUtils.instance = new ModeUtils();
          }
          return ModeUtils.instance;
        };
        var _proto = ModeUtils.prototype;
        _proto.startMode = function startMode(mode) {
          this.currentMode = mode;
        };
        _proto.getCurrentMode = function getCurrentMode() {
          return this.currentMode;
        };
        return ModeUtils;
      }());
      ModeUtils.instance = void 0;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PageTurnGeometry.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        riseDuration: riseDuration,
        riseTraveled: riseTraveled,
        waveMaskPolygon: waveMaskPolygon
      });
      cclegacy._RF.push({}, "5b2aegeCc1EWKrsTiJkjSEY", "PageTurnGeometry", undefined);
      function riseDuration(v0, brake, dist) {
        var b = Math.min(1, Math.max(0, brake));
        if (b === 0) return dist / v0;
        var a = b * v0 * v0 / (2 * dist);
        return (v0 - Math.sqrt(Math.max(0, v0 * v0 - 2 * a * dist))) / a;
      }
      function riseTraveled(tSec, v0, brake, dist) {
        if (tSec <= 0) return 0;
        var b = Math.min(1, Math.max(0, brake));
        if (tSec >= riseDuration(v0, b, dist)) return dist;
        var a = b * v0 * v0 / (2 * dist);
        return Math.min(dist, v0 * tSec - a * tSec * tSec / 2);
      }
      function waveMaskPolygon(xs, ys, reach) {
        if (xs.length === 0 || xs.length !== ys.length) return [];
        var last = xs.length - 1;
        var poly = [{
          x: xs[0] - reach,
          y: ys[0]
        }];
        for (var i = 0; i < xs.length; i++) {
          poly.push({
            x: xs[i],
            y: ys[i]
          });
        }
        poly.push({
          x: xs[last] + reach,
          y: ys[last]
        });
        poly.push({
          x: xs[last] + reach,
          y: ys[last] + reach
        });
        poly.push({
          x: xs[0] - reach,
          y: ys[0] + reach
        });
        return poly;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PageTurnTransition.ts", ['cc'], function (exports) {
  var cclegacy, tween, Tween;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      tween = module.tween;
      Tween = module.Tween;
    }],
    execute: function () {
      cclegacy._RF.push({}, "d72fcgIpftA4qC5lrYKO0RO", "PageTurnTransition", undefined);
      var PageTurnTransition = exports('PageTurnTransition', /*#__PURE__*/function () {
        function PageTurnTransition() {
          this.proxy = {
            t: 0
          };
          this.active = null;
          this.resolver = null;
        }
        var _proto = PageTurnTransition.prototype;
        _proto.run = function run(target, duration, frame) {
          var _this = this;
          this.stop();
          var mask = target.getComponent('cc.Mask');
          var graphics = target.getComponent('cc.Graphics');
          if (!mask || !graphics) return Promise.resolve();
          this.active = {
            target: target,
            mask: mask,
            graphics: graphics
          };
          mask.enabled = true;
          graphics.enabled = true;
          this.proxy.t = 0;
          var apply = function apply() {
            return _this.draw(graphics, frame(_this.proxy.t));
          };
          apply();
          return new Promise(function (resolve) {
            _this.resolver = resolve;
            tween(_this.proxy).to(duration, {
              t: 1
            }, {
              onUpdate: apply
            }).call(function () {
              return _this.finish();
            }).start();
          });
        };
        _proto.stop = function stop() {
          Tween.stopAllByTarget(this.proxy);
          this.finish();
        };
        _proto.finish = function finish() {
          if (this.active) {
            // Releasing the mask first would flash the full screen for one frame.
            this.active.target.active = false;
            this.active.graphics.clear();
            this.active.graphics.enabled = false;
            this.active.mask.enabled = false;
            this.active = null;
          }
          var resolve = this.resolver;
          this.resolver = null;
          resolve == null || resolve();
        };
        _proto.draw = function draw(g, poly) {
          g.clear();
          if (poly.length < 3) return;
          g.moveTo(poly[0].x, poly[0].y);
          for (var i = 1; i < poly.length; i++) {
            g.lineTo(poly[i].x, poly[i].y);
          }
          g.close();
          g.fill();
        };
        return PageTurnTransition;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PerformanceProfiler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "8f5e7btSYRMlJyG/CcKzU7Y", "PerformanceProfiler", undefined);
      var SLOW_FRAME_MS = 24;
      var TRACE_FRAMES = 90;
      var FRAME_BUCKETS_MS = [17, 25, 34, 50, 84];
      var SLOW_FRAME_SAMPLES = 40;
      var stats = new Map();
      var counters = new Map();
      var gauges = new Map();
      var frameBuckets = new Array(FRAME_BUCKETS_MS.length + 1).fill(0);
      var slowFrames = [];
      var frameCount = 0;
      var frameTotalMs = 0;
      var frameWorstMs = 0;
      var lastFrameAt = 0;
      var clampedFrames = 0;
      var traceLabel = '';
      var traceLeft = 0;
      var traceSkipped = 0;
      var trace = [];
      var topLabel = '';
      var topMs = 0;
      function now() {
        return performance.now();
      }
      function statFor(label) {
        var stat = stats.get(label);
        if (!stat) {
          stat = {
            count: 0,
            total: 0,
            max: 0,
            frame: 0
          };
          stats.set(label, stat);
        }
        return stat;
      }
      function record(label, elapsedMs) {
        var stat = statFor(label);
        stat.count++;
        stat.total += elapsedMs;
        stat.frame += elapsedMs;
        if (elapsedMs > stat.max) stat.max = elapsedMs;
      }

      /**
       * Accumulates instead of printing. The previous implementation logged every marker
       * unconditionally, which cost more on a low-end WebView than most of what it measured —
       * and game code keeps its console calls in the shipped build (only the SDK bundle is
       * built with `--drop:console`).
       */
      function log(label, startedAt, _details, _minimumMs) {
        if (!PerformanceProfiler.enabled) return 0;
        var elapsedMs = now() - startedAt;
        record(label, elapsedMs);
        return elapsedMs;
      }
      function logSlow(label, startedAt, details) {
        return log(label, startedAt);
      }
      function measure(label, operation, details) {
        if (!PerformanceProfiler.enabled) return operation();
        var startedAt = now();
        try {
          return operation();
        } finally {
          log(label, startedAt);
        }
      }
      function count(label, amount) {
        var _counters$get;
        if (amount === void 0) {
          amount = 1;
        }
        if (!PerformanceProfiler.enabled) return;
        counters.set(label, ((_counters$get = counters.get(label)) != null ? _counters$get : 0) + amount);
      }

      /** Keeps the high-water mark for `label` — used for peak live particle/tween counts. */
      function gauge(label, value) {
        var _gauges$get;
        if (!PerformanceProfiler.enabled) return;
        if (value > ((_gauges$get = gauges.get(label)) != null ? _gauges$get : 0)) gauges.set(label, value);
      }

      /** Starts recording per-frame durations so a hitch can be told apart from a slow stretch. */
      function markEvent(label) {
        if (!PerformanceProfiler.enabled) return;
        if (traceLeft > 0) {
          traceSkipped++;
          return;
        }
        traceLabel = label;
        traceLeft = TRACE_FRAMES;
        trace = [];
      }

      /** Sums this frame's markers into `topMs` and names the biggest in `topLabel`. */
      function measureFrameMarkers() {
        topLabel = '';
        topMs = 0;
        var bestMs = 0;
        for (var _iterator = _createForOfIteratorHelperLoose(stats), _step; !(_step = _iterator()).done;) {
          var _step$value = _step.value,
            label = _step$value[0],
            stat = _step$value[1];
          topMs += stat.frame;
          if (stat.frame > bestMs) {
            bestMs = stat.frame;
            topLabel = label;
          }
        }
        if (bestMs > 0) topLabel = topLabel + " " + bestMs.toFixed(1) + "ms";else topLabel = 'no marker';
      }
      function onFrame(dt) {
        if (!PerformanceProfiler.enabled) return;

        // Cocos clamps `dt`, so a long hitch reports short. The wall-clock delta between updates
        // is the honest number; keep the larger and count the divergences.
        var nowMs = now();
        var engineMs = dt * 1000;
        var wallMs = lastFrameAt > 0 ? nowMs - lastFrameAt : engineMs;
        lastFrameAt = nowMs;
        var frameMs = wallMs > engineMs ? wallMs : engineMs;
        if (wallMs > engineMs * 1.5 && wallMs - engineMs > 4) clampedFrames++;
        frameCount++;
        frameTotalMs += frameMs;
        if (frameMs > frameWorstMs) frameWorstMs = frameMs;
        var bucket = FRAME_BUCKETS_MS.length;
        for (var i = 0; i < FRAME_BUCKETS_MS.length; i++) {
          if (frameMs < FRAME_BUCKETS_MS[i]) {
            bucket = i;
            break;
          }
        }
        frameBuckets[bucket]++;
        var slow = frameMs >= SLOW_FRAME_MS;
        if (slow || traceLeft > 0) measureFrameMarkers();
        if (slow && slowFrames.length < SLOW_FRAME_SAMPLES) {
          slowFrames.push({
            ms: frameMs,
            top: topLabel,
            markerMs: topMs
          });
        }
        if (traceLeft > 0) {
          trace.push({
            ms: frameMs,
            top: topLabel,
            markerMs: topMs
          });
          traceLeft--;
          if (traceLeft === 0) reportTrace();
        }
        for (var _iterator2 = _createForOfIteratorHelperLoose(stats.values()), _step2; !(_step2 = _iterator2()).done;) {
          var stat = _step2.value;
          stat.frame = 0;
        }
      }

      /**
       * Markers only cover code wrapped in `measure`. Tween callbacks, rendering and GC are not,
       * so the marker share is what says whether the named label actually explains the frame.
       */
      function describe(frame) {
        var share = frame.markerMs / Math.max(0.001, frame.ms) * 100;
        var verdict = share < 50 ? '  <-- mostly UNMEASURED (tween/render/GC)' : '';
        return frame.ms.toFixed(1) + " ms, markers " + frame.markerMs.toFixed(1) + " ms " + ("(" + share.toFixed(0) + "%), top: " + frame.top + verdict);
      }
      function reportTrace() {
        var frames = trace;
        if (frames.length === 0) return;
        var worst = frames.reduce(function (a, b) {
          return b.ms > a.ms ? b : a;
        });
        var overBudget = frames.filter(function (f) {
          return f.ms >= SLOW_FRAME_MS;
        });
        var totalMs = frames.reduce(function (sum, f) {
          return sum + f.ms;
        }, 0);
        console.log("[Perf] trace \"" + traceLabel + "\": " + frames.length + " frames, " + totalMs.toFixed(0) + " ms total, " + ("avg " + (totalMs / frames.length).toFixed(1) + " ms, worst " + worst.ms.toFixed(1) + " ms, ") + (overBudget.length + " frames >= " + SLOW_FRAME_MS + " ms"));
        console.log("[Perf] trace \"" + traceLabel + "\" frames: " + frames.map(function (f) {
          return f.ms.toFixed(0);
        }).join(' '));
        for (var _iterator3 = _createForOfIteratorHelperLoose(overBudget), _step3; !(_step3 = _iterator3()).done;) {
          var frame = _step3.value;
          console.log("[Perf]   slow frame " + describe(frame));
        }
      }
      function report() {
        if (!PerformanceProfiler.enabled) return;
        var rows = [];
        for (var _iterator4 = _createForOfIteratorHelperLoose(stats), _step4; !(_step4 = _iterator4()).done;) {
          var _step4$value = _step4.value,
            label = _step4$value[0],
            stat = _step4$value[1];
          rows.push({
            label: label,
            count: stat.count,
            avg: (stat.total / stat.count).toFixed(3),
            max: stat.max.toFixed(2),
            total: stat.total.toFixed(1)
          });
        }
        rows.sort(function (a, b) {
          return Number(b.total) - Number(a.total);
        });
        var avgFrame = frameCount > 0 ? frameTotalMs / frameCount : 0;
        var labels = ['<17', '17-25', '25-34', '34-50', '50-84', '>=84'];
        var histogram = frameBuckets.map(function (n, i) {
          return labels[i] + "ms: " + n + " (" + (n / Math.max(1, frameCount) * 100).toFixed(1) + "%)";
        }).join('  ');
        console.log("[Perf] FRAMES  n=" + frameCount + "  avg=" + avgFrame.toFixed(1) + "ms " + ("(" + (1000 / Math.max(0.001, avgFrame)).toFixed(1) + " fps)  worst=" + frameWorstMs.toFixed(1) + "ms"));
        console.log("[Perf] HISTOGRAM  " + histogram);
        console.log("[Perf] SANITY  wall-clock " + (frameTotalMs / 1000).toFixed(1) + "s of frames counted; " + (clampedFrames + " frames where engine dt under-reported; " + traceSkipped + " traces skipped (overlapping clears)"));
        for (var _iterator5 = _createForOfIteratorHelperLoose(slowFrames), _step5; !(_step5 = _iterator5()).done;) {
          var frame = _step5.value;
          console.log("[Perf]   slow frame " + describe(frame));
        }
        console.log('[Perf] MARKERS (ms, sorted by total)');
        console.table(rows);
        if (counters.size > 0) {
          console.log('[Perf] COUNTERS');
          console.table([].concat(counters).map(function (_ref) {
            var label = _ref[0],
              value = _ref[1];
            return {
              label: label,
              value: value
            };
          }));
        }
        if (gauges.size > 0) {
          console.log('[Perf] PEAKS');
          console.table([].concat(gauges).map(function (_ref2) {
            var label = _ref2[0],
              value = _ref2[1];
            return {
              label: label,
              peak: value
            };
          }));
        }
      }
      function reset() {
        stats.clear();
        counters.clear();
        gauges.clear();
        frameBuckets.fill(0);
        slowFrames.length = 0;
        frameCount = 0;
        frameTotalMs = 0;
        frameWorstMs = 0;
        lastFrameAt = 0;
        clampedFrames = 0;
        traceLeft = 0;
        traceSkipped = 0;
      }
      function detectEnabled() {
        try {
          if (typeof location !== 'undefined' && /[?&]perf=1/.test(location.search)) return true;
          return globalThis.__PERF__ === true;
        } catch (_unused) {
          return false;
        }
      }
      var PerformanceProfiler = exports('PerformanceProfiler', {
        enabled: detectEnabled(),
        log: log,
        logSlow: logSlow,
        measure: measure,
        count: count,
        gauge: gauge,
        markEvent: markEvent,
        now: now,
        onFrame: onFrame,
        report: report,
        reset: reset
      });
      globalThis.Perf = PerformanceProfiler;
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlacementLogic.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './constants.ts', './CameraUtils.ts', './PerformanceProfiler.ts', './SkinService.ts', './Block.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _asyncToGenerator, _regeneratorRuntime, cclegacy, AudioManager, SFX, GRID_SIZE, CameraUtils, PerformanceProfiler, SkinService, BlockState;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AudioManager = module.AudioManager;
      SFX = module.SFX;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
    }, function (module) {
      CameraUtils = module.CameraUtils;
    }, function (module) {
      PerformanceProfiler = module.PerformanceProfiler;
    }, function (module) {
      SkinService = module.SkinService;
    }, function (module) {
      BlockState = module.BlockState;
    }],
    execute: function () {
      cclegacy._RF.push({}, "4335cYNKoBGDaJgjg0rTh2V", "PlacementLogic", undefined);
      var COMBO_POPUP_DELAY = 0.35;
      var COMPLIMENT_GAP = 0.12;
      var SCORE_POPUP_DELAY = 0.25;
      var NO_PREVIEW_CELL = -1;
      var PlacementLogic = exports('PlacementLogic', /*#__PURE__*/function () {
        function PlacementLogic(gm) {
          this.gm = void 0;
          this.isOver = false;
          /** True while an async placement is in-flight — blocks concurrent previews/placements. */
          this.isPlacing = false;
          /** Bumped on reset/restart/home/revive so an in-flight placement can detect it and bail. */
          this.placementGen = 0;
          /** Last valid preview cell, so onRequestPreview only pulses haptics on cell changes, not every drag tick. */
          this.lastPreviewCell = NO_PREVIEW_CELL;
          this.gm = gm;
        }
        var _proto = PlacementLogic.prototype;
        _proto.isGameOver = function isGameOver() {
          return this.isOver;
        }

        /** Full reset for a new run: aborts any in-flight placement and clears the turn flags. */;
        _proto.reset = function reset() {
          this.placementGen++;
          this.isPlacing = false;
          this.isOver = false;
          this.lastPreviewCell = NO_PREVIEW_CELL;
          this.gm.getBlockLogic().unlockAll();
        }

        /** Revive: clears the over flag and bumps the generation so a stale placement can't undo it. */;
        _proto.revive = function revive() {
          this.placementGen++;
          this.isOver = false;
          this.gm.getBlockLogic().unlockAll();
        }

        /**
         * Resolves the hovered cell once and reuses it for the mode veto, the preview and the haptic
         * pulse — each of those used to resolve it again, so a drag frame paid four world-space
         * conversions instead of one.
         */;
        _proto.onRequestPreview = function onRequestPreview(block, worldPos) {
          var _this$gm$getModeRules, _this$gm$getModeRules2, _this$gm$getModeRules3;
          if (this.isOver || this.isPlacing || !block.data) return;
          // Runs every drag frame, so the timer and its details object stay behind the flag.
          var startedAt = PerformanceProfiler.enabled ? PerformanceProfiler.now() : 0;
          var def = block.data;
          var grid = this.gm.getGridLogic();
          var cell = grid.getNearestCell(worldPos);
          var startR = cell ? cell.r - def.shape[0].y : -1;
          var startC = cell ? cell.c - def.shape[0].x : -1;

          // Scripted modes (Tutorial) accept one cell only; every other mode has no opinion and
          // every legal cell passes.
          var allowed = cell !== null && ((_this$gm$getModeRules = (_this$gm$getModeRules2 = (_this$gm$getModeRules3 = this.gm.getModeRules()).isPlacementAllowed) == null ? void 0 : _this$gm$getModeRules2.call(_this$gm$getModeRules3, def, startR, startC)) != null ? _this$gm$getModeRules : true);
          if (allowed) grid.showPreviewAt(def, startR, startC, block.colorIndex);else grid.clearPreview();

          // Pulse only when the hovered valid drop cell changes, not on every drag tick.
          var key = allowed && grid.canPlace(def, startR, startC) ? startR * GRID_SIZE + startC : -1;
          if (key !== this.lastPreviewCell) {
            var _window$GameSDK;
            this.lastPreviewCell = key;
            (_window$GameSDK = window.GameSDK) == null || _window$GameSDK.pulseHapticsAsync();
          }
          if (PerformanceProfiler.enabled) {
            PerformanceProfiler.logSlow('Drag/preview frame', startedAt, {
              block: def.id,
              cell: key
            });
          }
        };
        _proto.onClearPreview = function onClearPreview() {
          // A tap on another tray block emits DRAG_CANCEL; mid-placement that must not restore the
          // kept line preview (the placed block's cells were already overpainted at commit).
          if (this.isPlacing) return;
          this.gm.getGridLogic().clearPreview();
          this.lastPreviewCell = NO_PREVIEW_CELL;
          this.gm.getBlockLogic().updateStuckBlocks();
        };
        _proto.onDragEnd = function onDragEnd(block, worldPos) {
          this.onRequestPlace(block, worldPos);
        };
        _proto.onRequestPlace = /*#__PURE__*/function () {
          var _onRequestPlace = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(block, worldPos) {
            var _this = this;
            var _window$__TOUCH_DEBUG, spot, def, startR, startC, gen, screen, board, scoreUI, bestScoreUI, grid, score, cellWorldPos, popupPos, upcomingLines, predictedCombo, boardWillClear, _AudioManager$instanc, isRainbow, _yield$grid$checkAndC, lineCount, clearCenter, boardCleared, _window$GameSDK2, gained, combo;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!(this.isOver || this.isPlacing)) {
                    _context.next = 6;
                    break;
                  }
                  (_window$__TOUCH_DEBUG = window.__TOUCH_DEBUG__) == null || _window$__TOUCH_DEBUG.log("cc place REFUSED isOver=" + this.isOver + " isPlacing=" + this.isPlacing);
                  this.onClearPreview();
                  block.resetToSlot();
                  // resetToSlot settles it out of DRAGGING, which the fit test skips — so this block
                  // was passed over by the repaint that ran while it was still held.
                  this.gm.getBlockLogic().updateStuckBlocks();
                  return _context.abrupt("return");
                case 6:
                  this.isPlacing = true;
                  _context.prev = 7;
                  spot = this.resolvePlacement(block, worldPos);
                  if (spot) {
                    _context.next = 13;
                    break;
                  }
                  block.resetToSlot();
                  // Nothing was committed, so the board is settled and safe to re-test against —
                  // unlike the mid-placement paths, which resolveTurnEnd covers instead.
                  this.gm.getBlockLogic().updateStuckBlocks();
                  return _context.abrupt("return");
                case 13:
                  def = spot.def, startR = spot.startR, startC = spot.startC;
                  gen = this.placementGen;
                  screen = this.gm.getGameScreen();
                  board = screen.getBoard();
                  scoreUI = screen.getScoreUI();
                  bestScoreUI = screen.getBestScoreUI();
                  grid = this.gm.getGridLogic();
                  score = this.gm.getScoreLogic(); // 1. Animate the block snapping into its grid cell.
                  block.blockState = BlockState.IN_GRID;
                  cellWorldPos = board.getCellWorldPos(startR + def.shape[0].y, startC + def.shape[0].x);
                  _context.next = 25;
                  return block.animPutBlockToGrid(cellWorldPos);
                case 25:
                  if (!(gen !== this.placementGen)) {
                    _context.next = 27;
                    break;
                  }
                  return _context.abrupt("return");
                case 27:
                  // 2. Commit to the board and award placement points.
                  PerformanceProfiler.measure('Placement/commit', function () {
                    return _this.commitPlacement(block, def, startR, startC);
                  });

                  // Repainted against the new board here rather than at resolveTurnEnd: that runs
                  // behind the clear animation, leaving the tray showing a stale fit for the whole of
                  // it. The fit test accounts for the pending clear, so this paint is already final.
                  PerformanceProfiler.measure('Placement/update stuck blocks', function () {
                    return _this.gm.getBlockLogic().updateStuckBlocks();
                  });

                  // Start the score count-up immediately so it ticks up the moment the block lands,
                  // rather than waiting for the clear animation to finish at step 4.
                  scoreUI.updateScore(score.getTotal());
                  bestScoreUI == null || bestScoreUI.updateScore(score.getTotal());

                  // 3. Predict the outcome, then run the clear with its celebration overlapping it.
                  popupPos = this.getPopupAnchor(def, startR, startC);
                  upcomingLines = grid.countFullLines();
                  predictedCombo = score.getCombo() + upcomingLines;
                  boardWillClear = upcomingLines > 0 && grid.wouldClearBoard(); // A clearing placement plays the combo step instead of PLACE — never both.
                  if (upcomingLines === 0) {
                    (_AudioManager$instanc = AudioManager.instance) == null || _AudioManager$instanc.play(SFX.PLACE);
                  }

                  // Light the combo glow now (the line prediction is exact) so it appears the instant the
                  // block lands rather than after the clear animation; step 4 only handles the no-clear case.
                  if (upcomingLines > 0) {
                    scoreUI.animGlow(predictedCombo);
                  }

                  // A board clear takes the rainbow beam on the same combo threshold as any other clear,
                  // and plays it identically — ClearBoardEffect's whole-board frame runs over the top on
                  // its own, longer timeline.
                  isRainbow = predictedCombo >= 5 && !SkinService.isSinglePalette();
                  _context.next = 40;
                  return grid.checkAndClearLines(function (lines) {
                    return PerformanceProfiler.measure('Effects/start clear celebration', function () {
                      return _this.playClearCelebration(lines, predictedCombo, boardWillClear, popupPos);
                    });
                  }, isRainbow);
                case 40:
                  _yield$grid$checkAndC = _context.sent;
                  lineCount = _yield$grid$checkAndC.lineCount;
                  clearCenter = _yield$grid$checkAndC.clearCenter;
                  if (!(gen !== this.placementGen)) {
                    _context.next = 45;
                    break;
                  }
                  return _context.abrupt("return");
                case 45:
                  // 4. Tally the turn and show its rewards.
                  boardCleared = lineCount > 0 && grid.isBoardEmpty();
                  if (boardCleared) {
                    this.rollSkin();
                    (_window$GameSDK2 = window.GameSDK) == null || _window$GameSDK2.celebrate();
                  }
                  gained = score.onTurnEnd(lineCount, boardCleared);
                  this.gm.getDirector().onTurnCleared(lineCount, boardCleared);
                  this.gm.getModeRules().onTurnCleared();
                  combo = score.getCombo(); // After onTurnCleared, so an Adventure turn's collected marks have been drained.
                  this.gm.getDailyQuests().onTurnEnd(lineCount, boardCleared, combo, score.getTotal());
                  scoreUI.updateScore(score.getTotal());
                  bestScoreUI == null || bestScoreUI.updateScore(score.getTotal());
                  PerformanceProfiler.measure('Effects/start turn rewards', function () {
                    return _this.showTurnRewards(lineCount, combo, gained, boardCleared, popupPos, clearCenter);
                  });

                  // 5. Resolve how the turn ends: win, refill the tray, or game over.
                  PerformanceProfiler.measure('Placement/resolve turn end', function () {
                    return _this.resolveTurnEnd();
                  });
                case 56:
                  _context.prev = 56;
                  this.isPlacing = false;
                  return _context.finish(56);
                case 59:
                case "end":
                  return _context.stop();
              }
            }, _callee, this, [[7,, 56, 59]]);
          }));
          function onRequestPlace(_x, _x2) {
            return _onRequestPlace.apply(this, arguments);
          }
          return onRequestPlace;
        }();
        _proto.failRun = function failRun() {
          if (!this.isPlacing) this.endRun('lose');
        };
        _proto.resolveTurnEnd = function resolveTurnEnd() {
          var modeRules = this.gm.getModeRules();
          if (modeRules.checkWin()) {
            this.endRun('win');
            return;
          }
          if (modeRules.checkLose()) {
            this.endRun('lose');
            return;
          }
          var blocksLogic = this.gm.getBlockLogic();
          if (blocksLogic.needsNewSet()) {
            blocksLogic.handleSpawnNewBlocks();
          } else {
            blocksLogic.updateStuckBlocks();
          }
          this.checkGameOver();
        };
        _proto.checkGameOver = function checkGameOver() {
          var blocks = this.gm.getBlockLogic().getActiveBlocks();
          if (blocks.length === 0) return;
          for (var _iterator = _createForOfIteratorHelperLoose(blocks), _step; !(_step = _iterator()).done;) {
            var block = _step.value;
            if (!!block.data && this.gm.getGridLogic().canPlaceAnywhere(block.data)) return;
          }
          this.endRun('lose');
        };
        _proto.endRun = function endRun(outcome) {
          var _window$GameSDK3;
          if (this.isOver) return;
          this.isOver = true;
          this.gm.getGridLogic().clearPreview();
          this.lastPreviewCell = NO_PREVIEW_CELL;
          (_window$GameSDK3 = window.GameSDK) == null || _window$GameSDK3.updateScore(this.gm.getScoreLogic().getTotal());
          if (outcome === 'win') this.gm.getModeRules().onWin();else this.gm.getModeRules().onGameOver();
          this.gm.getDailyQuests().flush();
          PerformanceProfiler.report();
        };
        _proto.resolvePlacement = function resolvePlacement(block, worldPos) {
          var _this$gm$getModeRules4, _this$gm$getModeRules5, _this$gm$getModeRules6;
          var grid = this.gm.getGridLogic();
          var def = block.data;
          if (!def) {
            grid.clearPreview();
            return null;
          }
          var cell = grid.getNearestCell(worldPos);
          var startR = cell ? cell.r - def.shape[0].y : -1;
          var startC = cell ? cell.c - def.shape[0].x : -1;
          var allowedByMode = (_this$gm$getModeRules4 = (_this$gm$getModeRules5 = (_this$gm$getModeRules6 = this.gm.getModeRules()).isPlacementAllowed) == null ? void 0 : _this$gm$getModeRules5.call(_this$gm$getModeRules6, def, startR, startC)) != null ? _this$gm$getModeRules4 : true;
          if (!cell || !grid.canPlace(def, startR, startC) || !allowedByMode) {
            grid.clearPreview();
            return null;
          }

          // When the drop completes lines, the unified line tint + border stays up through the snap
          // animation until the clear wipe takes over (GridLogic discards it there). Re-show rather
          // than trust the last drag preview so it always matches the final drop cell.
          if (grid.willClearLines(def, startR, startC)) {
            grid.showPreviewAt(def, startR, startC, block.colorIndex);
          } else {
            grid.clearPreview();
          }
          return {
            def: def,
            startR: startR,
            startC: startC
          };
        };
        _proto.commitPlacement = function commitPlacement(block, def, startR, startC) {
          var _window$GameSDK4;
          // Skill sample needs the pre-placement mask, so it must run before placeBlock.
          this.gm.getDirector().onPlayerPlacement(this.gm.getGridLogic().getBoardMask(), def, startR, startC);
          this.gm.getGridLogic().placeBlock(def, startR, startC, block.colorIndex);
          this.gm.getModeRules().onBlockPlaced(block, def, startR, startC);
          // Before the tray repaint below, so a block that only fits once this clear lands is never
          // painted STUCK for the length of the clear animation.
          this.gm.getGridLogic().settlePendingClear();
          this.gm.getBlockLogic().onBlockPlacedSuccess(block);
          (_window$GameSDK4 = window.GameSDK) == null || _window$GameSDK4.pulseHapticsAsync();
          this.lastPreviewCell = NO_PREVIEW_CELL;
          this.gm.getScoreLogic().onBlockPlaced(def.shape.length);
          this.gm.getEffectManager().playPlacementSparkle(def, startR, startC, this.gm.getGameScreen().getBoard());
        };
        _proto.getPopupAnchor = function getPopupAnchor(def, startR, startC) {
          var board = this.gm.getGameScreen().getBoard();
          var centerRow = startR + Math.round(def.maxR / 2);
          var centerCol = startC + Math.round(def.maxC / 2);
          var pos = board.getCellWorldPos(centerRow, centerCol);
          if (centerCol <= 1) pos.x += board.step;else if (centerCol >= 6) pos.x -= board.step;
          return pos;
        };
        _proto.playClearCelebration = function playClearCelebration(lines, predictedCombo, boardWillClear, popupPos) {
          var _AudioManager$instanc2;
          var board = this.gm.getGameScreen().getBoard();
          if (boardWillClear) {
            CameraUtils.shakeCamera({
              intensity: 'heavy',
              duration: 0.32,
              amplitude: 20
            });
            this.gm.getEffectManager().beginBoardClearBorder(board);
          } else if (predictedCombo >= 5) {
            CameraUtils.shakeCamera({
              intensity: 'medium',
              duration: 0.25,
              amplitude: 16
            });
            var color = this.gm.getGridLogic().getLastPlacedColor();
            board.flashEdgeGlow(color);
          } else {
            CameraUtils.shakeCamera({
              intensity: 'light',
              duration: 0.16,
              amplitude: 12
            });
          }
          (_AudioManager$instanc2 = AudioManager.instance) == null || _AudioManager$instanc2.playCombo(predictedCombo - 1);
          if (predictedCombo > 1) {
            this.gm.getEffectManager().showPopAnim("" + predictedCombo, popupPos, 0, COMBO_POPUP_DELAY);
          }
          var compliment = boardWillClear ? null : this.getComplimentText(lines);
          if (compliment) {
            this.gm.getEffectManager().showComplimentAnim(compliment, popupPos, -50, COMBO_POPUP_DELAY + COMPLIMENT_GAP);
          }
        };
        _proto.getComplimentText = function getComplimentText(lineCount) {
          if (lineCount >= 5) return 'Amazing!';
          if (lineCount === 4) return 'Excellent!';
          if (lineCount === 3) return 'Great!';
          if (lineCount === 2) return 'Good!';
          return null;
        }

        // The board is empty at this point, so the tray is what the player actually sees change.
        ;

        _proto.rollSkin = function rollSkin() {
          if (!SkinService.roll()) return;
          this.gm.getGameScreen().applySkin();
          this.gm.getBlockLogic().repaintAll();
        };
        _proto.showTurnRewards = function showTurnRewards(lines, combo, gained, boardCleared, popupPos, clearCenter) {
          var _this$gm$getModeRules7, _this$gm$getModeRules8;
          var scoreUI = this.gm.getGameScreen().getScoreUI();
          if (lines === 0) {
            if (combo === 0) scoreUI.stopGlow();
            return;
          }
          if (boardCleared) {
            this.gm.getEffectManager().playBoardClearCelebration(this.gm.getGameScreen().getBoard());
          }
          if (gained > 0 && ((_this$gm$getModeRules7 = (_this$gm$getModeRules8 = this.gm.getModeRules()).showsScorePopup) == null ? void 0 : _this$gm$getModeRules7.call(_this$gm$getModeRules8)) !== false) {
            var clearPos = clearCenter != null ? clearCenter : this.gm.getGridLogic().getBoardWorldCenter();
            var scorePos = popupPos.clone();
            scorePos.x = (popupPos.x + clearPos.x) / 2;
            scorePos.y = (popupPos.y + clearPos.y) / 2;
            scorePos.z = 0;
            this.gm.getEffectManager().showScorePopup("" + gained, scorePos, SCORE_POPUP_DELAY);
          }
        };
        return PlacementLogic;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlacementScoring.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './BitUtils.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _extends, cclegacy, GRID_SIZE, SPAWN_LIBRARY, popCount32, CELL_SHIFTS, expandBits, MASK_32, SHIFT_32, labelEmptyRegions, clearFullLines, ROW_MASKS, COL_MASKS, snugness, popCount;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
      SPAWN_LIBRARY = module.SPAWN_LIBRARY;
    }, function (module) {
      popCount32 = module.popCount32;
      CELL_SHIFTS = module.CELL_SHIFTS;
      expandBits = module.expandBits;
      MASK_32 = module.MASK_32;
      SHIFT_32 = module.SHIFT_32;
      labelEmptyRegions = module.labelEmptyRegions;
      clearFullLines = module.clearFullLines;
      ROW_MASKS = module.ROW_MASKS;
      COL_MASKS = module.COL_MASKS;
      snugness = module.snugness;
      popCount = module.popCount;
    }],
    execute: function () {
      exports({
        boardComplexity: boardComplexity,
        buildPickContext: buildPickContext,
        gapFitFromLabels: gapFitFromLabels,
        isHotFill: isHotFill,
        lineProfile: lineProfile,
        lowestBitIndex: lowestBitIndex,
        minBlocksForRegion: minBlocksForRegion,
        placementAtCell: placementAtCell,
        placementsFor: placementsFor,
        scoreByComplexity: scoreByComplexity,
        scoreForPick: scoreForPick,
        splitWords: splitWords
      });
      cclegacy._RF.push({}, "690a5AnTAdANY1BZtGnUZGC", "PlacementScoring", undefined);
      var BOARD_CELLS = exports('BOARD_CELLS', GRID_SIZE * GRID_SIZE);
      /**
       * Tray size, not a scoring quantity — it lives here because both solvers need it and this is
       * the module they already share. Change it here, not in SpawnPlanner.
       */
      var SET_SIZE = exports('SET_SIZE', 3);
      /** Row/col fill count that qualifies as a hot setup line (nearly clearable) */
      var HOT_SETUP_MIN = exports('HOT_SETUP_MIN', GRID_SIZE - 3);
      /** Max leftover empty cells in a gap region before the gap-fit bonus is zero */
      var GAP_FIT_CAP = exports('GAP_FIT_CAP', GRID_SIZE);

      /**
       * No SPAWN_LIBRARY shape needs more than a 3x3 bounding box (Sq_3x3, BigL_*),
       * so any region with thinness >= 3 has the full shape set available — thinness never
       * needs to be checked past this.
       */
      var MAX_RELEVANT_THINNESS = 3;

      /**
       * Every distinct cell count in SPAWN_LIBRARY, mapped to the smallest bounding-box
       * dimension (thinness) any shape of that size needs. A shape's own thinness is
       * `min(height, width)` of its bounding box: a straight line is 1, a rectangle or
       * tetromino/pentomino spanning 2 rows/cols is 2, Sq_3x3/BigL_* (full 3x3 box) is 3.
       * Derived from the library itself so it can't silently go stale if shapes change.
       */
      function computeMinThinnessBySize() {
        var result = new Map();
        for (var _iterator = _createForOfIteratorHelperLoose(SPAWN_LIBRARY), _step; !(_step = _iterator()).done;) {
          var def = _step.value;
          var thinness = Math.min(def.maxR + 1, def.maxC + 1);
          var size = def.shape.length;
          var current = result.get(size);
          if (current === undefined || thinness < current) result.set(size, thinness);
        }
        return result;
      }
      var MIN_THINNESS_BY_SIZE = computeMinThinnessBySize();

      /** Every block size whose shape fits within a region of the given thinness (or thinner-needed). */
      function sizesAtThinness(thinness) {
        return [].concat(MIN_THINNESS_BY_SIZE.entries()).filter(function (_ref) {
          var needed = _ref[1];
          return needed <= thinness;
        }).map(function (_ref2) {
          var size = _ref2[0];
          return size;
        });
      }

      /**
       * Minimum number of blocks (from `sizes`) that sum exactly to each n in [0, maxN],
       * or Infinity where no combination reaches it exactly. Unbounded-coin-change DP —
       * built once, not per-region: a size like 16 needs 3 blocks (4+6+6), not the 2 a
       * cell-count-only glance would suggest, since no pair in {4,5,6,9} sums to 16.
       */
      function buildMinBlocksTable(sizes, maxN) {
        var table = new Array(maxN + 1).fill(Number.POSITIVE_INFINITY);
        table[0] = 0;
        for (var n = 1; n <= maxN; n++) {
          for (var _iterator2 = _createForOfIteratorHelperLoose(sizes), _step2; !(_step2 = _iterator2()).done;) {
            var size = _step2.value;
            if (size <= n && table[n - size] + 1 < table[n]) table[n] = table[n - size] + 1;
          }
        }
        return table;
      }

      /**
       * Sized to BOARD_CELLS (64), not a band's own 40-cell cap — `minBlocksForRegion` is
       * shared by the band search (regions never exceed 40 there) AND `boardComplexity`
       * (which can see a single connected region spanning the whole empty board). Sizing
       * this to the band's own smaller cap would silently return Infinity — "stuck" — for
       * any larger region simply because the table never computed that far, not because
       * the region is actually untileable.
       */
      var MAX_REGION_SIZE = BOARD_CELLS;

      /** Index 0 unused (thinness is always >= 1); index 3 also serves every thinness beyond it. */
      var MIN_BLOCKS_BY_THINNESS = [[], buildMinBlocksTable(sizesAtThinness(1), MAX_REGION_SIZE), buildMinBlocksTable(sizesAtThinness(2), MAX_REGION_SIZE), buildMinBlocksTable(sizesAtThinness(3), MAX_REGION_SIZE)];

      /**
       * Morphological (shape-aware) feasibility: the fewest blocks that could exactly cover a
       * region of `size` cells confined to a bounding box of `thinness` (the smaller of its
       * height/width) — or Infinity if no combination of shapes that actually fit that thinness
       * can reach it. A region that's only 1 cell wide (thinness 1) can only accept the two
       * straight-line shapes, so e.g. a clean 6-cell strip is genuinely untileable even though a
       * cell-count-only check would call 6 trivially solvable (mistaking the 2D Rect_3x2/2x3 for
       * something that fits a 1-wide corridor).
       */
      function minBlocksForRegion(size, thinness) {
        var _MIN_BLOCKS_BY_THINNE;
        var tier = Math.min(Math.max(thinness, 1), MAX_RELEVANT_THINNESS);
        return (_MIN_BLOCKS_BY_THINNE = MIN_BLOCKS_BY_THINNESS[tier][size]) != null ? _MIN_BLOCKS_BY_THINNE : Number.POSITIVE_INFINITY;
      }

      /**
       * Column guards for the bitboard flood fill: a row is 8 bits, so a sideways shift would
       * otherwise wrap column 7 of one row into column 0 of the next. Clearing the departing
       * column before the shift is what keeps rows independent.
       */
      var NOT_COL_0 = 0xfefefefe | 0;
      var NOT_COL_7 = 0x7f7f7f7f | 0;

      /**
       * Board "complexity": how many disconnected empty regions exist, and how many of them
       * are provably stuck (no SPAWN_LIBRARY block can ever fill them — the same
       * `minBlocksForRegion` check the complex-board search uses, just read as a scoring
       * signal instead of a search filter). A board with fewer, larger, all-feasible regions
       * is "simple"; one fragmented into many small or dead pockets is "complex" and heading
       * toward a stuck tray. Read by both `scoreByComplexity` (reference) and `scoreForPick`
       * (the hot-path copy `pickPlacement` actually calls, up to a few thousand times per
       * spawn) — so this recomputes the flood-fill inline against the pooled scratch buffers
       * above rather than calling `labelEmptyRegions` (which allocates fresh arrays every call).
       */
      function boardComplexity(mask) {
        var emptyLo = ~(Number(mask & MASK_32) | 0);
        var emptyHi = ~(Number(mask >> SHIFT_32 & MASK_32) | 0);
        var regions = 0;
        var stuckRegions = 0;
        while (emptyLo !== 0 || emptyHi !== 0) {
          var lo = 0;
          var hi = 0;
          if (emptyLo !== 0) lo = 1 << lowestBitIndex(emptyLo);else hi = 1 << lowestBitIndex(emptyHi);

          // Grow the seed one ring at a time until it stops changing. Vertical moves are the
          // only ones that cross the 32-bit word boundary, since rows 0-3 live entirely in
          // `lo` and rows 4-7 entirely in `hi`.
          for (;;) {
            var nextLo = (lo | (lo >>> 8 | hi << 24) | lo << 8 | (lo & NOT_COL_0) >>> 1 | (lo & NOT_COL_7) << 1) & emptyLo;
            var nextHi = (hi | hi >>> 8 | (hi << 8 | lo >>> 24) | (hi & NOT_COL_0) >>> 1 | (hi & NOT_COL_7) << 1) & emptyHi;
            if (nextLo === lo && nextHi === hi) break;
            lo = nextLo;
            hi = nextHi;
          }
          var minR = GRID_SIZE;
          var maxR = -1;
          var colUnion = 0;
          for (var row = 0; row < GRID_SIZE; row++) {
            var rowBits = row < 4 ? lo >>> row * 8 & 0xff : hi >>> (row - 4) * 8 & 0xff;
            if (rowBits === 0) continue;
            if (row < minR) minR = row;
            maxR = row;
            colUnion |= rowBits;
          }
          var thinness = Math.min(maxR - minR + 1, 31 - Math.clz32(colUnion) - lowestBitIndex(colUnion) + 1);
          regions++;
          if (minBlocksForRegion(popCount32(lo) + popCount32(hi), thinness) === Number.POSITIVE_INFINITY) {
            stuckRegions++;
          }
          emptyLo &= ~lo;
          emptyHi &= ~hi;
        }
        return {
          regions: regions,
          stuckRegions: stuckRegions
        };
      }

      /** Tunable weights for `scoreByComplexity` — placeholder values for the A/B comparison. */

      var DEFAULT_COMPLEXITY_WEIGHTS = exports('DEFAULT_COMPLEXITY_WEIGHTS', {
        complexityWeight: 100,
        stuckPenalty: 3,
        adjacencyWeight: 20,
        gapFitWeight: 50,
        multiLineBonus: 1500
      });

      /** Cells per row/col offset of a shape — static per def, lets the hot loops trade
       *  bigint popCounts for integer adds against per-mask fill tables. */

      var LINE_PROFILES = new Map();
      function lineProfile(def) {
        var profile = LINE_PROFILES.get(def.id);
        if (!profile) {
          var rows = new Array(def.maxR + 1).fill(0);
          var cols = new Array(def.maxC + 1).fill(0);
          for (var _iterator3 = _createForOfIteratorHelperLoose(def.shape), _step3; !(_step3 = _iterator3()).done;) {
            var p = _step3.value;
            rows[p.y]++;
            cols[p.x]++;
          }
          profile = {
            rows: rows,
            cols: cols
          };
          LINE_PROFILES.set(def.id, profile);
        }
        return profile;
      }

      /**
       * Every valid (r, c) placement of a shape, with its board-mask bits and adjacency halo
       * precomputed — both are pure functions of (def, r, c), never of the live board, but
       * `pickPlacement` re-derives them from scratch (bigint shifts) on every one of its
       * ~1-2k candidate evaluations, once per spawn attempt. Precomputing once at first use
       * turns that into an array read; this table (not board masks) is the cache that's safe
       * to keep for the process lifetime.
       */

      var PLACEMENTS_BY_DEF = new Map();

      /** Exported so tests can assert its entries agree with a direct, unmemoized recomputation. */
      function placementsFor(def) {
        var list = PLACEMENTS_BY_DEF.get(def.id);
        if (!list) {
          list = [];
          var maxR = GRID_SIZE - def.maxR - 1;
          var maxC = GRID_SIZE - def.maxC - 1;
          for (var r = 0; r <= maxR; r++) {
            for (var c = 0; c <= maxC; c++) {
              var placedBits = def.mask << CELL_SHIFTS[r * GRID_SIZE + c];
              var halo = expandBits(placedBits) & ~placedBits;
              var haloWords = splitWords(halo);
              list.push(_extends({
                r: r,
                c: c,
                placedBits: placedBits,
                halo: halo
              }, splitWords(placedBits), {
                haloLo: haloWords.lo,
                haloHi: haloWords.hi
              }));
            }
          }
          PLACEMENTS_BY_DEF.set(def.id, list);
        }
        return list;
      }
      function splitWords(bits) {
        return {
          lo: Number(bits & MASK_32) | 0,
          hi: Number(bits >> SHIFT_32 & MASK_32) | 0
        };
      }
      var PLACEMENT_AT_CELL = new Map();

      /** `placementsFor` indexed by anchor cell, so the tiler can look one up without scanning. */
      function placementAtCell(def) {
        var index = PLACEMENT_AT_CELL.get(def.id);
        if (!index) {
          index = new Array(BOARD_CELLS);
          for (var _iterator4 = _createForOfIteratorHelperLoose(placementsFor(def)), _step4; !(_step4 = _iterator4()).done;) {
            var placement = _step4.value;
            index[placement.r * GRID_SIZE + placement.c] = placement;
          }
          PLACEMENT_AT_CELL.set(def.id, index);
        }
        return index;
      }

      /** Index of the lowest set bit. Callers must guard against 0, which has no such bit. */
      function lowestBitIndex(word) {
        return 31 - Math.clz32(word & -word);
      }
      function lineFills(mask) {
        var rowFill = new Array(GRID_SIZE);
        var colFill = new Array(GRID_SIZE);
        for (var i = 0; i < GRID_SIZE; i++) {
          rowFill[i] = popCount(mask & ROW_MASKS[i]);
          colFill[i] = popCount(mask & COL_MASKS[i]);
        }
        return {
          rowFill: rowFill,
          colFill: colFill
        };
      }
      function isHotFill(fill) {
        return fill >= HOT_SETUP_MIN && fill < GRID_SIZE;
      }

      /** Per-mask context shared by every candidate scored on that mask. */

      function buildPickContext(mask) {
        var _lineFills = lineFills(mask),
          rowFill = _lineFills.rowFill,
          colFill = _lineFills.colFill;
        var hotBase = 0;
        for (var i = 0; i < GRID_SIZE; i++) {
          if (isHotFill(rowFill[i])) hotBase++;
          if (isHotFill(colFill[i])) hotBase++;
        }
        return _extends({
          labels: labelEmptyRegions(mask),
          rowFill: rowFill,
          colFill: colFill,
          hotBase: hotBase
        }, splitWords(mask));
      }

      /**
       * Gap-fit bonus: how snugly the block fills the connected empty region(s) it lands in,
       * measured before placement. A perfect fit — nothing left over — scores GAP_FIT_CAP; each
       * leftover empty cell deducts 1, clamped to 0.
       *
       * Region structure is a property of the mask, so it's labeled once per pick
       * (labelEmptyRegions) and each candidate just sums the sizes of the distinct regions under
       * its cells — diagonal blocks can straddle more than one.
       */
      function gapFitFromLabels(labels, def, r, c) {
        var regionSize = 0;
        var seen = [];
        for (var _iterator5 = _createForOfIteratorHelperLoose(def.shape), _step5; !(_step5 = _iterator5()).done;) {
          var cell = _step5.value;
          var id = labels.regionAt[(r + cell.y) * GRID_SIZE + (c + cell.x)];
          if (seen.includes(id)) continue;
          seen.push(id);
          regionSize += labels.sizes[id];
        }
        var leftover = regionSize - def.shape.length;
        return Math.max(0, GAP_FIT_CAP - leftover);
      }

      /**
       * Hot-path production version of `scoreByComplexity`'s formula — same math, but reused by
       * `pickPlacement`'s ~1-2k-candidate-per-pick loop, so it takes the mask-wide `PickContext`
       * (rowFill/colFill/labels/mask words, computed once per mask) and the placement's
       * precomputed halo words (from `placementsFor`, computed once per process lifetime — they
       * depend only on (def, r, c), never on the live board) instead of rederiving either per
       * candidate. `adjacency` is `snugness(placedBits, mask)` expanded out algebraically so the
       * mask-independent `expandBits` call it normally makes doesn't run per candidate: since the
       * halo already excludes the placement's own cells by construction, `halo & ~(mask|placedBits)`
       * reduces to `halo & ~mask`. Splitting the halo into words also drops the off-board bit 64
       * that a rightward `expandBits` shift can produce, which is what the bigint form needed
       * `& FULL_BOARD` for.
       *
       * Exported so tests can assert it agrees with `scoreByComplexity` — the two must stay
       * mathematically identical.
       */
      function scoreForPick(mask, def, placement, ctx, weights) {
        var r = placement.r,
          c = placement.c;
        var profile = lineProfile(def);
        var lineCount = 0;
        for (var y = 0; y <= def.maxR; y++) {
          if (ctx.rowFill[r + y] + profile.rows[y] === GRID_SIZE) lineCount++;
        }
        for (var x = 0; x <= def.maxC; x++) {
          if (ctx.colFill[c + x] + profile.cols[x] === GRID_SIZE) lineCount++;
        }
        var filled = mask | placement.placedBits;
        var afterMask = lineCount > 0 ? clearFullLines(filled).afterMask : filled;
        var _boardComplexity = boardComplexity(afterMask),
          regions = _boardComplexity.regions,
          stuckRegions = _boardComplexity.stuckRegions;
        var complexityScore = -(regions + stuckRegions * weights.stuckPenalty);
        var gapFit = gapFitFromLabels(ctx.labels, def, r, c);
        var adjacency = popCount32(placement.haloLo & ctx.lo) + popCount32(placement.haloHi & ctx.hi) - (popCount32(placement.haloLo & ~ctx.lo) + popCount32(placement.haloHi & ~ctx.hi));
        var multiLineBonus = lineCount >= 2 ? weights.multiLineBonus : 0;
        var score = weights.complexityWeight * complexityScore + weights.adjacencyWeight * adjacency + gapFit * weights.gapFitWeight + multiLineBonus;
        return {
          afterMask: afterMask,
          lineCount: lineCount,
          score: score
        };
      }

      /**
       * Clear-First Forward Simulation planner.
       *
       * For each of the 3 blocks in a spawn set, enumerates every valid (block, placement)
       * pair on the current simulated board and scores each by `scoreForPick` (see
       * `scoreByComplexity` for the reference formula): board complexity after the
       * placement (region count + stuck-region penalty, to minimize) dominates, then
       * adjacency/snugness, gap-fit, and a flat bonus for clearing 2+ lines at once.
       *
       * Samples from the top `topK` candidates for variety; topK=1 is always optimal.
       * Falls back to random spawn when the board is too empty for meaningful scoring.
       /**
       * Reference implementation of the complexity-based scoring formula that `scoreForPick`
       * implements on the hot path (the two must stay mathematically identical). Complexity is
       * measured on the post-placement, post-auto-clear board: clearing a line only ever removes
       * cells, so it can only merge or shrink regions, never add one — a preference for clearing
       * falls out of minimizing complexity without needing an explicit per-line bonus.
       * `multiLineBonus` is the one exception: region count alone can't tell a single-line clear
       * from a quad, so it's kept as a small explicit signal.
       *
       * Kept unoptimized (recomputes region labels internally, uses bigint snugness) so tests can
       * assert against it directly without needing a `PickContext`.
       */
      function scoreByComplexity(mask, def, placedBits, r, c, weights) {
        if (weights === void 0) {
          weights = DEFAULT_COMPLEXITY_WEIGHTS;
        }
        var filled = mask | placedBits;
        var lineCount = 0;
        for (var i = 0; i < GRID_SIZE; i++) {
          if ((filled & ROW_MASKS[i]) === ROW_MASKS[i]) lineCount++;
          if ((filled & COL_MASKS[i]) === COL_MASKS[i]) lineCount++;
        }
        var afterMask = lineCount > 0 ? clearFullLines(filled).afterMask : filled;
        var _boardComplexity2 = boardComplexity(afterMask),
          regions = _boardComplexity2.regions,
          stuckRegions = _boardComplexity2.stuckRegions;
        var complexityScore = -(regions + stuckRegions * weights.stuckPenalty);
        var gapFit = gapFitFromLabels(labelEmptyRegions(mask), def, r, c);
        var adjacency = snugness(placedBits, mask);
        var multiLineBonus = lineCount >= 2 ? weights.multiLineBonus : 0;
        var score = weights.complexityWeight * complexityScore + weights.adjacencyWeight * adjacency + gapFit * weights.gapFitWeight + multiLineBonus;
        return {
          afterMask: afterMask,
          lineCount: lineCount,
          score: score
        };
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PlayerLine.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AvatarLoader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Color, Label, Sprite, Component, AvatarLoader;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Label = module.Label;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      AvatarLoader = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
      cclegacy._RF.push({}, "930538AHq5F54Cd+Nyh/Iak", "PlayerLine", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var HIGHLIGHT_COLOR = new Color(255, 205, 40, 255);
      var PlayerLine = exports('PlayerLine', (_dec = ccclass('PlayerLine'), _dec2 = property(Label), _dec3 = property(Sprite), _dec4 = property(Label), _dec5 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PlayerLine, _Component);
        function PlayerLine() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "rankLabel", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "avatar", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nameLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scoreLabel", _descriptor4, _assertThisInitialized(_this));
          _this.defaultAvatar = null;
          _this.defaultColors = null;
          _this.token = 0;
          return _this;
        }
        var _proto = PlayerLine.prototype;
        _proto.onLoad = function onLoad() {
          var _this$avatar$spriteFr, _this$avatar;
          this.defaultAvatar = (_this$avatar$spriteFr = (_this$avatar = this.avatar) == null ? void 0 : _this$avatar.spriteFrame) != null ? _this$avatar$spriteFr : null;
        };
        _proto.setVisible = function setVisible(visible) {
          this.node.active = visible;
        };
        _proto.set = function set(rank, name, score, photoUrl, highlight) {
          if (highlight === void 0) {
            highlight = false;
          }
          if (this.rankLabel) this.rankLabel.string = rank;
          if (this.nameLabel) this.nameLabel.string = name;
          if (this.scoreLabel) this.scoreLabel.string = score;
          this.setHighlight(highlight);
          this.setAvatar(photoUrl);
        };
        _proto.labels = function labels() {
          return [this.rankLabel, this.nameLabel, this.scoreLabel].filter(function (label) {
            return label !== null;
          });
        }

        // Captured lazily because set() can run on a fresh row before its onLoad.
        ;

        _proto.setHighlight = function setHighlight(highlight) {
          var _this$defaultColors;
          var labels = this.labels();
          (_this$defaultColors = this.defaultColors) != null ? _this$defaultColors : this.defaultColors = labels.map(function (label) {
            return label.color.clone();
          });
          var defaults = this.defaultColors;
          labels.forEach(function (label, i) {
            label.color = highlight ? HIGHLIGHT_COLOR : defaults[i];
          });
        };
        _proto.setAvatar = function setAvatar(photoUrl) {
          var _this2 = this;
          var sprite = this.avatar;
          if (!sprite) return;
          var token = ++this.token;
          sprite.spriteFrame = this.defaultAvatar;
          if (!photoUrl) return;
          AvatarLoader.load(photoUrl).then(function (frame) {
            if (frame && sprite.isValid && token === _this2.token) {
              sprite.spriteFrame = frame;
            }
          });
        };
        return PlayerLine;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "rankLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "avatar", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nameLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec5], {
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

System.register("chunks:///_virtual/QuestToast.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Tween, tween, Vec3, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor;
      cclegacy._RF.push({}, "0d83c4VR1NG0qqlyJ5VHXMA", "QuestToast", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SLIDE_IN = 0.6;
      var SLIDE_OUT = 0.5;
      var HOLD = 2.2;
      var OFFSCREEN = 720;
      var QuestToast = exports('QuestToast', (_dec = ccclass('QuestToast'), _dec2 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(QuestToast, _Component);
        function QuestToast() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "label", _descriptor, _assertThisInitialized(_this));
          _this.restingX = 0;
          _this.restingY = 0;
          _this.hiddenX = 0;
          _this.measured = false;
          _this.showing = false;
          return _this;
        }
        var _proto = QuestToast.prototype;
        _proto.onLoad = function onLoad() {
          this.measure();
          if (!this.showing) this.node.active = false;
        };
        _proto.measure = function measure() {
          if (this.measured) return;
          this.measured = true;
          this.restingX = this.node.position.x;
          this.restingY = this.node.position.y;
          this.hiddenX = this.restingX - OFFSCREEN;
        };
        _proto.show = function show(text) {
          var _this2 = this;
          if (this.label) this.label.string = text;
          this.measure();
          this.showing = true;
          this.node.active = true;
          Tween.stopAllByTarget(this.node);
          this.node.setPosition(this.hiddenX, this.restingY, 0);
          tween(this.node).to(SLIDE_IN, {
            position: new Vec3(this.restingX, this.restingY, 0)
          }, {
            easing: 'cubicOut'
          }).delay(HOLD).to(SLIDE_OUT, {
            position: new Vec3(this.hiddenX, this.restingY, 0)
          }, {
            easing: 'cubicIn'
          }).call(function () {
            _this2.showing = false;
            _this2.node.active = false;
          }).start();
        };
        _proto.hideImmediately = function hideImmediately() {
          Tween.stopAllByTarget(this.node);
          this.showing = false;
          this.node.active = false;
        };
        return QuestToast;
      }(Component), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/RegionTiler.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './BitUtils.ts', './PlacementScoring.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, GRID_SIZE, SPAWN_LIBRARY, COL_MASKS, ROW_MASKS, popCount, popCount32, placementAtCell, splitWords, BOARD_CELLS, placementsFor, lowestBitIndex;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      GRID_SIZE = module.GRID_SIZE;
      SPAWN_LIBRARY = module.SPAWN_LIBRARY;
    }, function (module) {
      COL_MASKS = module.COL_MASKS;
      ROW_MASKS = module.ROW_MASKS;
      popCount = module.popCount;
      popCount32 = module.popCount32;
    }, function (module) {
      placementAtCell = module.placementAtCell;
      splitWords = module.splitWords;
      BOARD_CELLS = module.BOARD_CELLS;
      placementsFor = module.placementsFor;
      lowestBitIndex = module.lowestBitIndex;
    }],
    execute: function () {
      exports({
        bandCandidates: bandCandidates,
        generateClearRecipe: generateClearRecipe,
        sizeBiasedOrder: sizeBiasedOrder,
        tileWithRetries: tileWithRetries
      });
      cclegacy._RF.push({}, "abf63qQ/yJD36ATJpOnFWPZ", "RegionTiler", undefined);

      /** Generated recipes target a band this many lines tall/wide (never 1 — too cheap) */
      var RECIPE_MIN_LINES = 2;
      var RECIPE_MAX_LINES = 5;
      /** Block-count range per recipe; 4-6 block recipes span two tray sets via the queue */
      var RECIPE_MIN_BLOCKS = 3;
      var RECIPE_MAX_BLOCKS = 6;
      var RECIPE_TILE_BUDGET = exports('RECIPE_TILE_BUDGET', 2000);
      var LARGEST_BLOCK_CELLS = 9;
      /** Partial-board band tiling accepts a single finishing piece (min 1), unlike empty-board recipes. */
      var BAND_MIN_BLOCKS = exports('BAND_MIN_BLOCKS', 1);
      /** Occupied cells must sit within this many lines (rows OR cols) for a band drain to exist. */
      var BAND_MAX_LINES = 5;
      /**
       * Procedural board-clear recipe: picks a target band of 2-5 complete lines
       * (rows or columns), then tiles it exactly with 3-6 library blocks via a
       * first-empty-cell DFS over a shuffled block order. Served on an EMPTY board
       * while a board-clear window is open, so the hightime chains into an immediate
       * re-clear. Returns the placements so tests can verify the tiling is exact;
       * gameplay only uses the block defs.
       */
      function generateClearRecipe() {
        var lineSpan = RECIPE_MAX_LINES - RECIPE_MIN_LINES + 1;
        var lines = RECIPE_MIN_LINES + Math.floor(Math.random() * lineSpan);
        var vertical = Math.random() < 0.5;
        var region = 0n;
        for (var i = 0; i < lines; i++) region |= vertical ? COL_MASKS[i] : ROW_MASKS[i];
        return tileWithRetries(region, 0n, RECIPE_MIN_BLOCKS);
      }

      /**
       * Jitter width for `sizeBiasedOrder`. Must exceed the largest gap between consecutive
       * SPAWN_LIBRARY sizes (6→9, a gap of 3) — otherwise the top size tier mathematically
       * never loses the ordering (its minimum key would always exceed every smaller tier's
       * maximum), producing the same big block every time a region is roomy enough for it,
       * however many DFS retries run.
       */
      var SIZE_BIAS_JITTER = 8;

      /**
       * Size-biased jittered block order: big blocks are USUALLY tried first (keeps the
       * exact-cover search shallow — a pure shuffle can lead with 2-cell blocks and blow the
       * budget on a wide band), but the jitter is wide enough that any size can occasionally
       * win, so the same top-tier block isn't a mathematically guaranteed pick every time.
       */
      function sizeBiasedOrder(pool) {
        return pool.map(function (def) {
          return {
            def: def,
            key: def.shape.length + Math.random() * SIZE_BIAS_JITTER
          };
        }).sort(function (a, b) {
          return b.key - a.key;
        }).map(function (entry) {
          return entry.def;
        });
      }

      /**
       * Exact-tiles `region & ~filled` with `[minBlocks, RECIPE_MAX_BLOCKS]` blocks. An
       * unlucky order can strand the tiler on a wide region, so re-roll a few times.
       * `filled` seeds the region's already-occupied cells (board cells for a band drain,
       * 0 for an empty-board recipe).
       *
       * Draws from the spawn pool only, so a board-clear hand looks like the rest of the game.
       * A leftover that no big-block cover fits (a lone notch, anything of size 1-3 or 7) simply
       * fails here; `tryPlanBoardClear` then tries the next-cheapest band, which is why the seek
       * ranks many candidates instead of committing to one.
       */
      function tileWithRetries(region, filled, minBlocks, shared, orderFor) {
        if (orderFor === void 0) {
          orderFor = function orderFor() {
            return sizeBiasedOrder(SPAWN_LIBRARY);
          };
        }
        var regionWords = splitWords(region);
        var filledWords = splitWords(filled);
        for (var attempt = 0; attempt < 4; attempt++) {
          var pieces = [];
          var budget = shared != null ? shared : {
            nodes: RECIPE_TILE_BUDGET
          };
          var tiled = tileRegion(regionWords.lo, regionWords.hi, filledWords.lo, filledWords.hi, orderFor(), pieces, budget, minBlocks);
          if (tiled) return pieces;
          // A shared budget is spent across bands, so an exhausted one means every
          // remaining attempt would bail at the first node — stop instead of spinning.
          if (shared && shared.nodes < 0) return null;
        }
        return null;
      }

      /**
       * The bands whose completion would empty the board: the occupied rows, the occupied
       * columns, or both. Each is only a candidate when its orientation confines the blocks to
       * at most BAND_MAX_LINES.
       *
       * Ordered by fewest leftover cells: whichever band has less to cover is both likelier to
       * tile and cheaper to rule out. That stands on its own (it strictly reduces search nodes),
       * and it is what makes the tiler's shared node budget safe — without it a hopeless band
       * spends the allowance the other orientation needed.
       */
      function bandCandidates(boardMask) {
        var occRows = [];
        var occCols = [];
        for (var i = 0; i < GRID_SIZE; i++) {
          if ((boardMask & ROW_MASKS[i]) !== 0n) occRows.push(i);
          if ((boardMask & COL_MASKS[i]) !== 0n) occCols.push(i);
        }
        var bands = [];
        if (occRows.length >= 1 && occRows.length <= BAND_MAX_LINES) {
          bands.push(buildBand(occRows, ROW_MASKS));
        }
        if (occCols.length >= 1 && occCols.length <= BAND_MAX_LINES) {
          bands.push(buildBand(occCols, COL_MASKS));
        }
        return bands.sort(function (a, b) {
          return popCount(a & ~boardMask) - popCount(b & ~boardMask);
        });
      }

      /**
       * Band mask for a set of occupied line indices (ascending). Contiguous span within
       * BAND_MAX_LINES → the adjacent band [min..max] (tidier, may include empty lines); a
       * wider span → exactly the occupied lines (island band).
       */
      function buildBand(lines, masks) {
        var min = lines[0];
        var max = lines[lines.length - 1];
        var band = 0n;
        if (max - min + 1 <= BAND_MAX_LINES) {
          for (var i = min; i <= max; i++) band |= masks[i];
        } else {
          for (var _iterator = _createForOfIteratorHelperLoose(lines), _step; !(_step = _iterator()).done;) {
            var _i = _step.value;
            band |= masks[_i];
          }
        }
        return band;
      }

      /**
       * Exact-cover DFS over two signed int32 words rather than bigints. This is the hottest
       * function in the board-clear seek — a failing region visits thousands of nodes, and each
       * node used to spend ~600-900 bigint ops on the first-empty-cell scan and the per-shape
       * fit tests. The search itself is unchanged: same node order, same pruning, same budget.
       */
      function tileRegion(regionLo, regionHi, filledLo, filledHi, order, pieces, budget, minBlocks) {
        // Covered means "no region cell left", not "filled equals region": a sub-band drain
        // seeds `filled` with the whole board, including cells outside the target band.
        var uncoveredLo = regionLo & ~filledLo;
        var uncoveredHi = regionHi & ~filledHi;
        if (uncoveredLo === 0 && uncoveredHi === 0) return pieces.length >= minBlocks;
        if (pieces.length === RECIPE_MAX_BLOCKS) return false;
        if (--budget.nodes < 0) return false;
        var remaining = popCount32(uncoveredLo) + popCount32(uncoveredHi);
        if (remaining > (RECIPE_MAX_BLOCKS - pieces.length) * LARGEST_BLOCK_CELLS) return false;
        var target = mostConstrainedCell(uncoveredLo, uncoveredHi, regionLo, regionHi, filledLo, filledHi);
        if (target < 0) return false;
        var targetR = target >> 3;
        var targetC = target & 7;
        for (var _iterator2 = _createForOfIteratorHelperLoose(order), _step2; !(_step2 = _iterator2()).done;) {
          var def = _step2.value;
          var index = placementAtCell(def);
          for (var _iterator3 = _createForOfIteratorHelperLoose(def.shape), _step3; !(_step3 = _iterator3()).done;) {
            var cell = _step3.value;
            var r = targetR - cell.y;
            var c = targetC - cell.x;
            if (r < 0 || c < 0 || r + def.maxR >= GRID_SIZE || c + def.maxC >= GRID_SIZE) continue;
            var placement = index[r * GRID_SIZE + c];
            if (!placement) continue;
            var lo = placement.lo,
              hi = placement.hi;
            if ((lo & ~regionLo) !== 0 || (hi & ~regionHi) !== 0) continue;
            if ((lo & filledLo) !== 0 || (hi & filledHi) !== 0) continue;
            pieces.push({
              def: def,
              placedBits: placement.placedBits
            });
            if (tileRegion(regionLo, regionHi, filledLo | lo, filledHi | hi, order, pieces, budget, minBlocks)) return true;
            pieces.pop();
          }
        }
        return false;
      }
      /** Every (def, placement) that covers a given board cell — the tiler's constraint counts. */
      var coveringByCell = null;
      function placementsCovering(cell) {
        if (!coveringByCell) {
          var table = Array.from({
            length: BOARD_CELLS
          }, function () {
            return [];
          });
          for (var _iterator4 = _createForOfIteratorHelperLoose(SPAWN_LIBRARY), _step4; !(_step4 = _iterator4()).done;) {
            var def = _step4.value;
            for (var _iterator5 = _createForOfIteratorHelperLoose(placementsFor(def)), _step5; !(_step5 = _iterator5()).done;) {
              var placement = _step5.value;
              for (var _iterator6 = _createForOfIteratorHelperLoose(def.shape), _step6; !(_step6 = _iterator6()).done;) {
                var p = _step6.value;
                table[(placement.r + p.y) * GRID_SIZE + (placement.c + p.x)].push(placement);
              }
            }
          }
          coveringByCell = table;
        }
        return coveringByCell[cell];
      }

      /**
       * Most-constrained-first cell selection: the uncovered cell with the fewest placements
       * still able to cover it. Filling the tightest cell first collapses the branching factor,
       * and a cell that nothing can cover kills the branch here instead of being rediscovered
       * further down every sibling. Returns -1 for such a dead cell.
       */
      function mostConstrainedCell(uncoveredLo, uncoveredHi, regionLo, regionHi, filledLo, filledHi) {
        var target = -1;
        var fewest = Number.POSITIVE_INFINITY;
        var restLo = uncoveredLo;
        var restHi = uncoveredHi;
        while (restLo !== 0 || restHi !== 0) {
          var cell = void 0;
          if (restLo !== 0) {
            cell = lowestBitIndex(restLo);
            restLo &= restLo - 1;
          } else {
            cell = 32 + lowestBitIndex(restHi);
            restHi &= restHi - 1;
          }
          var count = 0;
          for (var _iterator7 = _createForOfIteratorHelperLoose(placementsCovering(cell)), _step7; !(_step7 = _iterator7()).done;) {
            var p = _step7.value;
            if ((p.lo & ~regionLo) !== 0 || (p.hi & ~regionHi) !== 0) continue;
            if ((p.lo & filledLo) !== 0 || (p.hi & filledHi) !== 0) continue;
            if (++count >= fewest) break;
          }
          if (count === 0) return -1;
          if (count < fewest) {
            fewest = count;
            target = cell;
            // A forced cell cannot be beaten, so stop scanning the rest.
            if (count === 1) break;
          }
        }
        return target;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ReviveSolver.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './BitUtils.ts', './PlacementScoring.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, BLOCK_LIBRARY, GRID_SIZE, CELL_SHIFTS, clearFullLines, popCount, ROW_MASKS, COL_MASKS, SET_SIZE, buildPickContext, lineProfile, gapFitFromLabels, HOT_SETUP_MIN, BOARD_CELLS, isHotFill, GAP_FIT_CAP;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      BLOCK_LIBRARY = module.BLOCK_LIBRARY;
      GRID_SIZE = module.GRID_SIZE;
    }, function (module) {
      CELL_SHIFTS = module.CELL_SHIFTS;
      clearFullLines = module.clearFullLines;
      popCount = module.popCount;
      ROW_MASKS = module.ROW_MASKS;
      COL_MASKS = module.COL_MASKS;
    }, function (module) {
      SET_SIZE = module.SET_SIZE;
      buildPickContext = module.buildPickContext;
      lineProfile = module.lineProfile;
      gapFitFromLabels = module.gapFitFromLabels;
      HOT_SETUP_MIN = module.HOT_SETUP_MIN;
      BOARD_CELLS = module.BOARD_CELLS;
      isHotFill = module.isHotFill;
      GAP_FIT_CAP = module.GAP_FIT_CAP;
    }],
    execute: function () {
      cclegacy._RF.push({}, "33a494g0r1P/IAzg08ftP0y", "ReviveSolver", undefined);

      /** Bonus multiplier applied to gap score when a block perfectly fills its empty region */
      var EXACT_FIT_MULTIPLIER = 5;
      /** Per-line score for a clearing placement; the multi-line (combo) bonus is half of this */
      var LINE_CLEAR_WEIGHT = 500;
      /**
       * The revive solver keeps the original clear-dominant weight: a revived player needs the
       * board dug out, not artfully filled — perfect fits must never outrank clears there.
       */
      var REVIVE_LINE_WEIGHT = 1000;
      /** How strongly board tension boosts hot-setup weighting (tension ∈ [0,1]) */
      var TENSION_HOT_BOOST = 1.5;
      /** Hot-setup weight used by the revive solver — matches the most aggressive difficulty tier */
      var REVIVE_HOT_SETUP_WEIGHT = 40;

      /**
       * Deterministic score for a single (block, placement) on `mask`. No randomness.
       *
       * Score = linesCleared*lineWeight + multiBonus + hotSetup*weight*tension + gapFit
       */
      function scorePlacement(mask, def, placedBits, tensionBoost, hotSetupWeight, ctx, r, c, lineWeight) {
        if (lineWeight === void 0) {
          lineWeight = LINE_CLEAR_WEIGHT;
        }
        // Hot path: line completions and hot-setup deltas come from integer adds against the
        // per-mask fill tables — no bigint scans. Only the minority of placements that complete
        // a line pay for clearFullLines.
        var profile = lineProfile(def);
        var lineCount = 0;
        var hotDelta = 0;
        for (var y = 0; y <= def.maxR; y++) {
          var before = ctx.rowFill[r + y];
          var after = before + profile.rows[y];
          if (after === GRID_SIZE) lineCount++;else hotDelta += (isHotFill(after) ? 1 : 0) - (isHotFill(before) ? 1 : 0);
        }
        for (var x = 0; x <= def.maxC; x++) {
          var _before = ctx.colFill[c + x];
          var _after = _before + profile.cols[x];
          if (_after === GRID_SIZE) lineCount++;else hotDelta += (isHotFill(_after) ? 1 : 0) - (isHotFill(_before) ? 1 : 0);
        }
        var filled = mask | placedBits;
        var afterMask = filled;
        var hotSetup = ctx.hotBase + hotDelta;
        if (lineCount > 0) {
          afterMask = clearFullLines(filled).afterMask;
          hotSetup = countHotLines(afterMask);
        }
        var gapFit = gapFitFromLabels(ctx.labels, def, r, c);
        // gapFit === GAP_FIT_CAP means leftover === 0 — the block exactly fills its connected
        // empty region with nothing wasted. The "hand-picked for the hole" feel; boost it hard.
        var gapScore = gapFit === GAP_FIT_CAP ? gapFit * 50 * EXACT_FIT_MULTIPLIER : gapFit * 50;
        // ScoreLogic pays factorial(lines) (1/2/6/24x) and compounds the combo on top, so a
        // bonus linear in lineCount left the planner with no reason to hold out for the double
        // or triple. Squaring tracks that curve far more closely than lineCount did.
        var multiBonus = lineCount >= 2 ? lineCount * lineCount * (lineWeight / 2) : 0;
        var score = lineCount * lineWeight + multiBonus + hotSetup * hotSetupWeight * tensionBoost + gapScore;
        return {
          afterMask: afterMask,
          lineCount: lineCount,
          score: score
        };
      }
      function countHotLines(mask) {
        var count = 0;
        for (var i = 0; i < GRID_SIZE; i++) {
          var rowFill = popCount(mask & ROW_MASKS[i]);
          if (rowFill >= HOT_SETUP_MIN && rowFill < GRID_SIZE) count++;
          var colFill = popCount(mask & COL_MASKS[i]);
          if (colFill >= HOT_SETUP_MIN && colFill < GRID_SIZE) count++;
        }
        return count;
      }
      function computeTension(mask) {
        var tension = 0;
        for (var i = 0; i < GRID_SIZE; i++) {
          var rowFill = popCount(mask & ROW_MASKS[i]);
          if (rowFill >= HOT_SETUP_MIN && rowFill < GRID_SIZE) {
            tension += (rowFill - HOT_SETUP_MIN + 1) * 0.06;
          }
          var colFill = popCount(mask & COL_MASKS[i]);
          if (colFill >= HOT_SETUP_MIN && colFill < GRID_SIZE) {
            tension += (colFill - HOT_SETUP_MIN + 1) * 0.06;
          }
        }
        var fillRatio = popCount(mask) / BOARD_CELLS;
        tension += fillRatio * 0.3;
        return tension > 1 ? 1 : tension;
      }
      function fitsAnywhere(mask, def) {
        var maxR = GRID_SIZE - def.maxR - 1;
        var maxC = GRID_SIZE - def.maxC - 1;
        for (var r = 0; r <= maxR; r++) {
          for (var c = 0; c <= maxC; c++) {
            if ((mask & def.mask << CELL_SHIFTS[r * GRID_SIZE + c]) === 0n) return true;
          }
        }
        return false;
      }

      /** Highest deterministic-score placement of any `pool` block on `mask`, or null if none fit. */
      function bestPlacement(mask, pool) {
        var tensionBoost = 1 + computeTension(mask) * TENSION_HOT_BOOST;
        var ctx = buildPickContext(mask);
        var best = null;
        for (var _iterator = _createForOfIteratorHelperLoose(pool), _step; !(_step = _iterator()).done;) {
          var def = _step.value;
          var maxR = GRID_SIZE - def.maxR - 1;
          var maxC = GRID_SIZE - def.maxC - 1;
          for (var r = 0; r <= maxR; r++) {
            for (var c = 0; c <= maxC; c++) {
              var placedBits = def.mask << CELL_SHIFTS[r * GRID_SIZE + c];
              if ((mask & placedBits) !== 0n) continue;
              var scored = scorePlacement(mask, def, placedBits, tensionBoost, REVIVE_HOT_SETUP_WEIGHT, ctx, r, c, REVIVE_LINE_WEIGHT);
              if (!best || scored.score > best.score) {
                best = {
                  def: def,
                  afterMask: scored.afterMask,
                  linesCleared: scored.lineCount,
                  score: scored.score
                };
              }
            }
          }
        }
        return best;
      }

      /**
       * Returns 3 blocks for the AD_revive second-chance flow.
       *
       * Hard guarantee: every returned block individually fits the current board, so none renders
       * STUCK/gray when it appears in the tray. The candidate pool is restricted up-front to
       * fitting blocks; the greedy then picks, at each of 3 steps, the single highest-scoring
       * (block, placement) on the rolling post-clear mask — clears dominate the score, so the set
       * clears as many lines as possible while staying all-fitting. The 1x1 is in the pool, so
       * with ≥1 empty cell a fitting block is always found.
       *
       * Pure: holds no state and never touches the planner's queue or pacing.
       */
      var ReviveSolver = exports('ReviveSolver', /*#__PURE__*/function () {
        function ReviveSolver() {}
        var _proto = ReviveSolver.prototype;
        _proto.solve = function solve(boardMask) {
          var pool = BLOCK_LIBRARY.filter(function (def) {
            return fitsAnywhere(boardMask, def);
          });
          if (pool.length === 0) return [];
          var chosen = [];
          var mask = boardMask;
          for (var i = 0; i < SET_SIZE; i++) {
            var pick = bestPlacement(mask, pool);
            if (!pick) break;
            chosen.push(pick.def);
            mask = pick.afterMask;
          }

          // Pad rare short results (board filled up mid-simulation) with fitting blocks so the
          // tray always shows 3 non-gray blocks. These fit the current board even though the
          // simulation couldn't seat them.
          while (chosen.length < SET_SIZE) {
            chosen.push(pool[chosen.length % pool.length]);
          }
          return chosen;
        };
        return ReviveSolver;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScoreLogic.ts", ['cc', './Difficulty.ts'], function (exports) {
  var cclegacy, getDifficultyConfig;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      getDifficultyConfig = module.getDifficultyConfig;
    }],
    execute: function () {
      cclegacy._RF.push({}, "2d403Iit09JNKTX8Oif+N5Q", "ScoreLogic", undefined);
      var COMBO_GRACE = 3;
      var FULL_BOARD_BONUS = 1000;
      var BASE_PT = 30;
      var COMBO_PT = 31;
      var STREAK_PT = 10;
      var ScoreLogic = exports('ScoreLogic', /*#__PURE__*/function () {
        function ScoreLogic() {
          this.total = 0;
          this.combo = 0;
          this.missedTurns = 0;
          this.lineScoreOverride = null;
          this.flatClearScore = null;
        }
        var _proto = ScoreLogic.prototype;
        _proto.setLineScoreOverride = function setLineScoreOverride(fn) {
          this.lineScoreOverride = fn;
        };
        _proto.setFlatClearScore = function setFlatClearScore(points) {
          this.flatClearScore = points;
        };
        _proto.onBlockPlaced = function onBlockPlaced(cellCount) {
          if (this.lineScoreOverride || this.flatClearScore !== null) return;
          this.total += cellCount;
        };
        _proto.onTurnEnd = function onTurnEnd(linesCleared, boardCleared) {
          if (linesCleared === 0) {
            this.missedTurns++;
            if (this.missedTurns >= COMBO_GRACE) {
              this.combo = 0;
              this.missedTurns = 0;
            }
            return 0;
          }
          this.missedTurns = 0;
          if (this.flatClearScore !== null) {
            this.combo += linesCleared;
            this.total += this.flatClearScore;
            return this.flatClearScore;
          }
          var gained;
          if (this.lineScoreOverride) {
            gained = this.lineScoreOverride(linesCleared);
          } else {
            var comboPt = this.combo * COMBO_PT;
            gained = (BASE_PT + comboPt) * this.factorial(linesCleared);
          }
          this.combo += linesCleared;
          if (this.lineScoreOverride) {
            gained += this.combo * STREAK_PT;
          } else if (boardCleared) {
            gained += FULL_BOARD_BONUS;
          }
          this.total += gained;
          return gained;
        };
        _proto.factorial = function factorial(n) {
          var result = 1;
          for (var i = 2; i <= n; i++) result *= i;
          return result;
        };
        _proto.reset = function reset() {
          this.total = 0;
          this.combo = 0;
          this.missedTurns = 0;
          this.lineScoreOverride = null;
          this.flatClearScore = null;
        };
        _proto.getTotal = function getTotal() {
          return this.total;
        };
        _proto.getCombo = function getCombo() {
          return this.combo;
        };
        _proto.getMissedTurns = function getMissedTurns() {
          return this.missedTurns;
        };
        _proto.getDifficultyConfig = function getDifficultyConfig$1() {
          return getDifficultyConfig(this.total);
        };
        return ScoreLogic;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScoreUI.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SpriteLoader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, cclegacy, _decorator, Sprite, Label, Color, Tween, tween, Vec3, Node, UITransform, UIOpacity, Component, SpriteLoader;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Label = module.Label;
      Color = module.Color;
      Tween = module.Tween;
      tween = module.tween;
      Vec3 = module.Vec3;
      Node = module.Node;
      UITransform = module.UITransform;
      UIOpacity = module.UIOpacity;
      Component = module.Component;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "06f51XDOWpJkpjSlmyU+FA5", "ScoreUI", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SCORE_COUNT_TIME = 1;
      var BORDER_IDLE_FACTOR = 0.5;
      var BORDER_EXPAND_SCALE = 1.7;
      var BORDER_EXPAND_TIME = 0.45;
      var GLOW_MIN_COMBO = 3;
      var SPARKLE_SIZE = 32;
      var STAR_SPARKLE_INDEX = 1;
      var SPARKLE_EDGE_MIN = 66;
      var SPARKLE_EDGE_MAX = 77;
      var SPARKLE_VARIANTS = [{
        px: 16,
        life: 0.6
      }, {
        px: 24,
        life: 0.48
      }, {
        px: 32,
        life: 0.36
      }];
      var BEAT_TABLE = [{
        minCombo: 1,
        interval: 0.8,
        peak: 1.1
      }, {
        minCombo: 2,
        interval: 0.7,
        peak: 1.12
      }, {
        minCombo: 3,
        interval: 0.55,
        peak: 1.15
      }, {
        minCombo: 6,
        interval: 0.42,
        peak: 1.18
      }, {
        minCombo: 10,
        interval: 0.32,
        peak: 1.18
      }, {
        minCombo: 15,
        interval: 0.25,
        peak: 1.2
      }];
      function getBeatConfig(combo) {
        var cfg = BEAT_TABLE[0];
        for (var _i = 0, _BEAT_TABLE = BEAT_TABLE; _i < _BEAT_TABLE.length; _i++) {
          var entry = _BEAT_TABLE[_i];
          if (combo >= entry.minCombo) cfg = entry;
        }
        return cfg;
      }
      var ScoreUI = exports('ScoreUI', (_dec = ccclass('ScoreUI'), _dec2 = property(Sprite), _dec3 = property(Label), _dec4 = property(Sprite), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScoreUI, _Component);
        function ScoreUI() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "glowSprite", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "scoreLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "borderSprite", _descriptor3, _assertThisInitialized(_this));
          _this.displayedScore = 0;
          _this.scoreProxy = {
            v: 0
          };
          _this.beatNode = null;
          _this.scheduledBeat = null;
          _this.baseColor = new Color(255, 255, 255, 255);
          _this.peakColor = new Color(255, 255, 255, 255);
          _this.colorProxy = {
            t: 0
          };
          _this.beatColor = new Color();
          _this.borderBaseColor = new Color(255, 255, 255, 255);
          _this.borderIdleAlpha = 128;
          _this.borderProxy = {
            t: 0
          };
          _this.borderColor = new Color();
          _this.sparklePool = [];
          return _this;
        }
        var _proto = ScoreUI.prototype;
        _proto.onLoad = function onLoad() {
          if (this.glowSprite) {
            this.glowSprite.node.active = false;
            this.baseColor = this.glowSprite.color.clone();
            this.peakColor = new Color(Math.min(255, this.baseColor.r + Math.round((255 - this.baseColor.r) * 0.7)), Math.min(255, this.baseColor.g + Math.round((255 - this.baseColor.g) * 0.7)), Math.min(255, this.baseColor.b + Math.round((255 - this.baseColor.b) * 0.7)), this.baseColor.a);
          }
          while (this.sparklePool.length < 8) this.createSparkle();
          if (this.borderSprite) {
            this.borderBaseColor = this.borderSprite.color.clone();
            this.borderIdleAlpha = Math.round(this.borderBaseColor.a * BORDER_IDLE_FACTOR);
          }
        };
        _proto.onEnable = function onEnable() {
          Tween.stopAllByTarget(this.borderProxy);
          this.resetBorderIdle();
        };
        _proto.onDisable = function onDisable() {
          this.stopBorderAndSparkles();
        };
        _proto.updateScore = function updateScore(total) {
          var _this2 = this;
          Tween.stopAllByTarget(this.scoreProxy);
          if (total === this.displayedScore) {
            this.applyScore(total);
            return;
          }
          this.scoreProxy.v = this.displayedScore;
          tween(this.scoreProxy).to(SCORE_COUNT_TIME, {
            v: total
          }, {
            easing: 'sineOut',
            onUpdate: function onUpdate() {
              return _this2.applyScore(Math.round(_this2.scoreProxy.v));
            }
          }).call(function () {
            return _this2.applyScore(total);
          }).start();
        };
        _proto.applyScore = function applyScore(value) {
          if (value === this.displayedScore) return;
          this.displayedScore = value;
          this.scoreLabel.string = value.toString();
        };
        _proto.animGlow = function animGlow(combo) {
          var _this3 = this;
          if (!this.glowSprite) return;
          if (combo < GLOW_MIN_COMBO) return;
          var node = this.glowSprite.node;
          this.clearBeat(node);
          this.animBorderExpand();
          node.active = true;
          node.setScale(1, 1, 1);
          this.glowSprite.color = this.baseColor.clone();
          var _getBeatConfig = getBeatConfig(combo),
            interval = _getBeatConfig.interval,
            peak = _getBeatConfig.peak;
          var beat = function beat() {
            return _this3.fireBeat(node, peak);
          };
          this.beatNode = node;
          this.scheduledBeat = beat;
          beat();
          this.schedule(beat, interval);
        };
        _proto.fireBeat = function fireBeat(node, peak) {
          Tween.stopAllByTarget(node);
          Tween.stopAllByTarget(this.colorProxy);
          node.setScale(1, 1, 1);
          this.colorProxy.t = 0;
          tween(node).to(0.1, {
            scale: new Vec3(peak, peak, 1)
          }, {
            easing: 'sineOut'
          }).to(0.12, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'sineIn'
          }).start();
          var sprite = this.glowSprite;
          var base = this.baseColor;
          var pk = this.peakColor;
          var proxy = this.colorProxy;
          var scratch = this.beatColor;
          var applyBeatColor = function applyBeatColor() {
            sprite.color = scratch.set(Math.round(base.r + (pk.r - base.r) * proxy.t), Math.round(base.g + (pk.g - base.g) * proxy.t), Math.round(base.b + (pk.b - base.b) * proxy.t), base.a);
          };
          tween(proxy).to(0.1, {
            t: 1
          }, {
            easing: 'sineOut',
            onUpdate: applyBeatColor
          }).to(0.12, {
            t: 0
          }, {
            easing: 'sineIn',
            onUpdate: applyBeatColor
          }).start();
        };
        _proto.stopGlow = function stopGlow() {
          this.clearBeat(this.beatNode);
          if (this.glowSprite) {
            this.glowSprite.node.setScale(1, 1, 1);
            this.glowSprite.color = this.baseColor.clone();
            this.glowSprite.node.active = false;
          }
          Tween.stopAllByTarget(this.borderProxy);
          this.resetBorderIdle();
        };
        _proto.clearBeat = function clearBeat(node) {
          if (this.scheduledBeat) {
            this.unschedule(this.scheduledBeat);
            this.scheduledBeat = null;
          }
          if (node) Tween.stopAllByTarget(node);
          Tween.stopAllByTarget(this.colorProxy);
          this.beatNode = null;
        };
        _proto.resetDisplay = function resetDisplay() {
          this.stopGlow();
          Tween.stopAllByTarget(this.scoreProxy);
          this.displayedScore = 0;
          this.scoreLabel.string = '0';
          this.resetBorderIdle();
          this.clearSparkles();
        };
        _proto.animBorderExpand = function animBorderExpand() {
          var _this4 = this;
          if (!this.borderSprite) return;
          Tween.stopAllByTarget(this.borderProxy);
          this.borderProxy.t = 0;
          var apply = function apply() {
            return _this4.applyBorderExpand(_this4.borderProxy.t);
          };
          tween(this.borderProxy).to(BORDER_EXPAND_TIME, {
            t: 1
          }, {
            easing: 'sineOut',
            onUpdate: apply
          }).call(function () {
            return _this4.resetBorderIdle();
          }).start();
          this.burstSparkles();
        };
        _proto.applyBorderExpand = function applyBorderExpand(t) {
          if (!this.borderSprite) return;
          var scale = 1 + (BORDER_EXPAND_SCALE - 1) * t;
          this.borderSprite.node.setScale(scale, scale, 1);
          var fade = 1 - t;
          this.applyBorderAlpha(Math.round(this.borderBaseColor.a * fade));
        }

        // Also reached from the expand tween's own completion, so it must not stop `borderProxy` —
        // that would re-enter the action manager while it is stepping this very target. Callers that
        // interrupt a live expand stop it themselves.
        ;

        _proto.resetBorderIdle = function resetBorderIdle() {
          if (!this.borderSprite) return;
          this.borderSprite.node.setScale(1, 1, 1);
          this.applyBorderAlpha(this.borderIdleAlpha);
        };
        _proto.applyBorderAlpha = function applyBorderAlpha(alpha) {
          if (!this.borderSprite) return;
          var c = this.borderBaseColor;
          this.borderSprite.color = this.borderColor.set(c.r, c.g, c.b, alpha);
        };
        _proto.burstSparkles = function burstSparkles() {
          var loader = SpriteLoader.instance;
          var frame = loader == null ? void 0 : loader.getSparkleFrame(STAR_SPARKLE_INDEX);
          if (!frame) return;
          var count = 5 + Math.floor(Math.random() * 4);
          var baseAngle = Math.random() * Math.PI * 2;
          for (var i = 0; i < count; i++) {
            var angle = baseAngle + i / count * Math.PI * 2 + (Math.random() - 0.5);
            var radius = SPARKLE_EDGE_MIN + Math.random() * (SPARKLE_EDGE_MAX - SPARKLE_EDGE_MIN);
            this.spawnSparkle(frame, angle, radius);
          }
        };
        _proto.spawnSparkle = function spawnSparkle(frame, angle, radius) {
          var entry = this.acquireSparkle();
          entry.sprite.spriteFrame = frame;
          entry.opacity.opacity = 255;
          entry.node.angle = Math.random() * 360;
          entry.node.setScale(0, 0, 1);
          var cos = Math.cos(angle);
          var sin = Math.sin(angle);
          entry.node.setPosition(cos * radius, sin * radius, 0);
          var variant = SPARKLE_VARIANTS[Math.floor(Math.random() * SPARKLE_VARIANTS.length)];
          var size = variant.px / SPARKLE_SIZE;
          var node = entry.node;
          var opacity = entry.opacity;
          var proxy = entry.proxy;
          Tween.stopAllByTarget(proxy);
          proxy.t = 0;
          tween(proxy).to(variant.life, {
            t: 1
          }, {
            onUpdate: function onUpdate() {
              var lin = proxy.t;
              var eased = Math.sin(lin * Math.PI / 2);
              var rr = radius * (1 + (BORDER_EXPAND_SCALE - 1) * eased);
              node.setPosition(cos * rr, sin * rr, 0);
              var s = size * Math.min(1, lin / 0.2);
              node.setScale(s, s, 1);
              opacity.opacity = lin < 0.5 ? 255 : Math.round(255 * (1 - (lin - 0.5) / 0.5));
            }
          }).call(function () {
            node.active = false;
          }).start();
        };
        _proto.acquireSparkle = function acquireSparkle() {
          var found = this.sparklePool.find(function (e) {
            return !e.node.active;
          });
          if (found) {
            found.node.active = true;
            return found;
          }
          var entry = this.createSparkle();
          entry.node.active = true;
          return entry;
        };
        _proto.createSparkle = function createSparkle() {
          var node = new Node('ScoreSparkle');
          node.active = false;
          node.layer = this.node.layer;
          node.setParent(this.node);
          node.addComponent(UITransform).setContentSize(SPARKLE_SIZE, SPARKLE_SIZE);
          var sprite = node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          var opacity = node.addComponent(UIOpacity);
          var entry = {
            node: node,
            sprite: sprite,
            opacity: opacity,
            proxy: {
              t: 0
            }
          };
          this.sparklePool.push(entry);
          return entry;
        };
        _proto.clearSparkles = function clearSparkles() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.sparklePool), _step; !(_step = _iterator()).done;) {
            var entry = _step.value;
            if (!entry.node.active) continue;
            Tween.stopAllByTarget(entry.proxy);
            Tween.stopAllByTarget(entry.node);
            Tween.stopAllByTarget(entry.opacity);
            entry.node.active = false;
          }
        };
        _proto.stopBorderAndSparkles = function stopBorderAndSparkles() {
          if (this.borderSprite) {
            Tween.stopAllByTarget(this.borderSprite.node);
            Tween.stopAllByTarget(this.borderProxy);
            this.resetBorderIdle();
          }
          this.clearSparkles();
        };
        return ScoreUI;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "glowSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "borderSprite", [_dec4], {
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

System.register("chunks:///_virtual/ScreenConfetti.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SpriteLoader.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, _createClass, cclegacy, view, Color, Vec3, tween, Node, UITransform, Sprite, Tween, SpriteLoader;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      view = module.view;
      Color = module.Color;
      Vec3 = module.Vec3;
      tween = module.tween;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Tween = module.Tween;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }],
    execute: function () {
      cclegacy._RF.push({}, "15a21MaSNFHbLscnwTnMb6G", "ScreenConfetti", undefined);
      var WAVES = 12;
      var PER_WAVE = 7;
      var WAVE_GAP = 0.3;
      var FALL_TIME = 2.2;
      var FALL_TIME_VAR = 0.8;
      var SIZE = 30;
      var SIZE_VAR = 24;
      var BAND_WIDTH = 1.05;
      var SPAWN_ABOVE = 0.02;
      var STAGGER = 0.25;
      var DRIFT = 0.18;
      var SPIN_MIN = 90;
      var SPIN_VAR = 320;
      var FADE_FROM = 0.82;
      /**
       * A confetti rain that outlives the screen it was started from.
       *
       * The Adventure win spans two screens — the board celebration on `GameScreen`, then the result
       * screen — and the rain has to read as one continuous fall across that change. So this parents
       * itself above every screen (the node `ScreenManager` hangs its overlays from) rather than to the
       * screen that started it: a rain parented to `GameScreen` is hidden the moment the result screen's
       * full-screen panel draws over it, and one restarted by the result screen reads as a second burst.
       *
       * Emission runs `WAVES * WAVE_GAP` seconds and each piece falls for another `FALL_TIME`, so the
       * window covers the celebration, the transition and the result screen's entrance.
       *
       * Sizes itself from the visible screen and paints from the `SpriteLoader` singleton, so there is
       * nothing to add to a prefab and no `@property` to fill in.
       */
      var ScreenConfetti = exports('ScreenConfetti', /*#__PURE__*/function () {
        function ScreenConfetti(parent, name) {
          if (name === void 0) {
            name = 'Confetti';
          }
          this.root = void 0;
          this.pieces = [];
          this.color = new Color();
          this.root = new Node(name);
          this.root.layer = parent.layer;
          this.root.setParent(parent);
          this.root.addComponent(UITransform).setContentSize(0, 0);
        }
        var _proto = ScreenConfetti.prototype;
        /**
         * Puts the rain in front of its siblings. Screens are instantiated lazily and parented with
         * `setParent`, which appends — so a screen opening for the first time lands after this node and
         * would draw its full-screen panel over the rain. Re-asserted once the next screen is up.
         */
        _proto.bringToFront = function bringToFront() {
          var parent = this.root.parent;
          if (parent) this.root.setSiblingIndex(parent.children.length - 1);
        }

        /** Restarts the rain from the top; any pieces still falling keep going. */;
        _proto.start = function start() {
          this.bringToFront();
          var visible = view.getVisibleSize();
          for (var wave = 0; wave < WAVES; wave++) {
            for (var i = 0; i < PER_WAVE; i++) {
              this.spawn(visible.width, visible.height, wave * WAVE_GAP);
            }
          }
        };
        _proto.stop = function stop() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.pieces), _step; !(_step = _iterator()).done;) {
            var piece = _step.value;
            this.release(piece);
          }
        };
        _proto.destroy = function destroy() {
          this.stop();
          this.root.destroy();
          this.pieces = [];
        };
        _proto.spawn = function spawn(width, height, delay) {
          var _this = this;
          var loader = SpriteLoader.instance;
          if (!loader || loader.cellCount === 0) return;
          var frame = loader.getPlayCellSprite(Math.floor(Math.random() * loader.cellCount));
          if (!frame) return;
          var piece = this.acquire();
          var size = SIZE + Math.random() * SIZE_VAR;
          piece.sprite.spriteFrame = frame;
          piece.sprite.color = Color.WHITE;
          piece.ui.setContentSize(size, size);
          var originX = (Math.random() - 0.5) * width * BAND_WIDTH;
          var originY = height * (0.5 + SPAWN_ABOVE + Math.random() * STAGGER);
          // Driven past the bottom edge from wherever it started, so no piece freezes mid-screen
          // when its tween ends.
          var fall = -(originY + height * 0.6);
          var drift = (Math.random() - 0.5) * width * DRIFT;
          var startAngle = Math.random() * 360;
          var spin = (SPIN_MIN + Math.random() * SPIN_VAR) * (Math.random() < 0.5 ? -1 : 1);
          var duration = FALL_TIME + Math.random() * FALL_TIME_VAR;
          var node = piece.node;
          node.setPosition(originX, originY, 0);
          node.setScale(Vec3.ONE);
          node.angle = startAngle;
          node.active = false;
          piece.proxy.t = 0;
          tween(piece.proxy).delay(delay).call(function () {
            node.active = true;
          }).to(duration, {
            t: 1
          }, {
            onUpdate: function onUpdate() {
              var t = piece.proxy.t;
              node.setPosition(originX + drift * t, originY + fall * t * t, 0);
              node.angle = startAngle + spin * t * duration;
              if (t < FADE_FROM) return;
              var fade = (t - FADE_FROM) / (1 - FADE_FROM);
              piece.sprite.color = _this.color.set(255, 255, 255, Math.round(255 * (1 - fade)));
            }
          }).call(function () {
            return _this.release(piece);
          }).start();
        };
        _proto.acquire = function acquire() {
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.pieces), _step2; !(_step2 = _iterator2()).done;) {
            var _piece = _step2.value;
            if (!_piece.busy) {
              _piece.busy = true;
              return _piece;
            }
          }
          var node = new Node('confetti');
          node.layer = this.root.layer;
          var ui = node.addComponent(UITransform);
          var sprite = node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          sprite.type = Sprite.Type.SIMPLE;
          node.setParent(this.root);
          var piece = {
            node: node,
            sprite: sprite,
            ui: ui,
            proxy: {
              t: 0
            },
            busy: true
          };
          this.pieces.push(piece);
          return piece;
        };
        _proto.release = function release(piece) {
          Tween.stopAllByTarget(piece.proxy);
          piece.node.active = false;
          piece.busy = false;
        };
        _createClass(ScreenConfetti, [{
          key: "node",
          get: function get() {
            return this.root;
          }
        }]);
        return ScreenConfetti;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenEntrance.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './ScreenEntranceGeometry.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, Tween, Vec3, tween, UITransform, offscreenDrop;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      Tween = module.Tween;
      Vec3 = module.Vec3;
      tween = module.tween;
      UITransform = module.UITransform;
    }, function (module) {
      offscreenDrop = module.offscreenDrop;
    }],
    execute: function () {
      cclegacy._RF.push({}, "6b5e7sCz6dCpZPk7RsSibmv", "ScreenEntrance", undefined);
      var POP_OVERSHOOT = 1.12;
      var POP_SETTLE = 0.1;

      /**
       * Staggered entrance for a screen's contents: elements pop from nothing, a row rises from off the
       * bottom edge. Scale and position only — fading would mean adding a `UIOpacity` to every authored
       * node at runtime.
       *
       * One instance per screen, held for the screen's life. It remembers what it moved so `settle()`
       * can put everything back: an entrance interrupted mid-pop would otherwise leave a node at scale 0.
       */
      var ScreenEntrance = exports('ScreenEntrance', /*#__PURE__*/function () {
        function ScreenEntrance() {
          this.popped = [];
          this.risen = new Map();
        }
        var _proto = ScreenEntrance.prototype;
        _proto.pop = function pop(node, delay, duration) {
          if (!node) return;
          if (!this.popped.includes(node)) this.popped.push(node);
          Tween.stopAllByTarget(node);
          node.setScale(Vec3.ZERO);
          tween(node).delay(delay).to(duration, {
            scale: new Vec3(POP_OVERSHOOT, POP_OVERSHOOT, 1)
          }, {
            easing: 'backOut'
          }).to(POP_SETTLE, {
            scale: new Vec3(1, 1, 1)
          }, {
            easing: 'sineOut'
          }).start();
        }

        /**
         * Rises `root` — a Layout parent, not its children, which would fight the Layout for their
         * positions. `screen` is the full-screen node the row has to clear.
         */;
        _proto.rise = function rise(root, screen, delay, duration) {
          var _screen$getComponent$, _screen$getComponent, _root$getComponent$he, _root$getComponent;
          if (!root) return;
          // Captured once: a replay must rise to where the Layout put the row, not to wherever the
          // previous entrance was interrupted.
          var home = this.risen.get(root);
          if (!home) {
            home = new Vec3(root.position);
            this.risen.set(root, home);
          }
          var screenHeight = (_screen$getComponent$ = (_screen$getComponent = screen.getComponent(UITransform)) == null ? void 0 : _screen$getComponent.height) != null ? _screen$getComponent$ : 0;
          var rootHeight = (_root$getComponent$he = (_root$getComponent = root.getComponent(UITransform)) == null ? void 0 : _root$getComponent.height) != null ? _root$getComponent$he : 0;
          // Measured against the screen's centre, not the parent's: a row nested inside an offset
          // panel would otherwise be dropped by its local y and stop short of the bottom edge.
          var restY = root.worldPosition.y - screen.worldPosition.y;
          Tween.stopAllByTarget(root);
          root.setPosition(home.x, home.y - offscreenDrop(screenHeight, restY, rootHeight), home.z);
          tween(root).delay(delay).to(duration, {
            position: new Vec3(home)
          }, {
            easing: 'backOut'
          }).start();
        }

        /** Leaves every node this entrance touched at its resting state. */;
        _proto.settle = function settle() {
          for (var _iterator = _createForOfIteratorHelperLoose(this.popped), _step; !(_step = _iterator()).done;) {
            var node = _step.value;
            if (!node.isValid) continue;
            Tween.stopAllByTarget(node);
            node.setScale(1, 1, 1);
          }
          for (var _iterator2 = _createForOfIteratorHelperLoose(this.risen), _step2; !(_step2 = _iterator2()).done;) {
            var _step2$value = _step2.value,
              _node = _step2$value[0],
              home = _step2$value[1];
            if (!_node.isValid) continue;
            Tween.stopAllByTarget(_node);
            _node.setPosition(home);
          }
        };
        return ScreenEntrance;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenEntranceGeometry.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('offscreenDrop', offscreenDrop);
      cclegacy._RF.push({}, "76364y+GglIcaiepoxdhFDm", "ScreenEntranceGeometry", undefined);
      /** Extra travel past the bottom edge, so a risen node starts fully clear of it. */
      var CLEARANCE = 40;

      /**
       * How far below its resting place a node must start to be off the bottom of a `screenHeight`-tall
       * screen. Derived rather than fixed: a row sitting only ~185px below centre stays visible under
       * any drop short of half the screen.
       */
      function offscreenDrop(screenHeight, homeY, nodeHeight) {
        return Math.max(0, screenHeight / 2 + homeY + nodeHeight / 2 + CLEARANCE);
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ScreenManager.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './GameEvents.ts', './GameScreen.ts', './LoadingScreen.ts', './AdsUtils.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, assetManager, Prefab, Component, instantiate, ScreenNames, GameEvents, GameScreen, LoadingScreen, AdsUtils;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      assetManager = module.assetManager;
      Prefab = module.Prefab;
      Component = module.Component;
      instantiate = module.instantiate;
    }, function (module) {
      ScreenNames = module.ScreenNames;
      GameEvents = module.GameEvents;
    }, function (module) {
      GameScreen = module.GameScreen;
    }, function (module) {
      LoadingScreen = module.LoadingScreen;
    }, function (module) {
      AdsUtils = module.AdsUtils;
    }],
    execute: function () {
      var _SCREEN_PREFABS, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _class3;
      cclegacy._RF.push({}, "14549WXz9FH5rrFK9NCQZzd", "ScreenManager", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SCREEN_BUNDLE = 'screens';
      var TRANSITION_LAYER_PREFAB = 'TransitionLayer';

      // Order doubles as the background warm-up order, so the screens wanted soonest come first.
      var SCREEN_PREFABS = (_SCREEN_PREFABS = {}, _SCREEN_PREFABS[ScreenNames.LOSE_SCREEN] = 'LoseScreen', _SCREEN_PREFABS[ScreenNames.DASHBOARD_SCREEN] = 'DashboardScreen', _SCREEN_PREFABS[ScreenNames.SETTING_SCREEN] = 'SettingsScreen', _SCREEN_PREFABS[ScreenNames.LEVEL_SELECT_SCREEN] = 'LevelSelectScreen', _SCREEN_PREFABS[ScreenNames.ADVENTURE_RESULT_SCREEN] = 'AdventureResultScreen', _SCREEN_PREFABS[ScreenNames.REVIVE_SCREEN] = 'ReviveScreen', _SCREEN_PREFABS[ScreenNames.LEADERBOARD_SCREEN] = 'LeaderboardScreen', _SCREEN_PREFABS[ScreenNames.TOURNAMENT_WIN_SCREEN] = 'TournamentWinScreen', _SCREEN_PREFABS[ScreenNames.DAILY_QUEST_SCREEN] = 'DailyQuestScreen', _SCREEN_PREFABS[ScreenNames.RANDOM_WHEEL_SCREEN] = 'RandomWheelScreen', _SCREEN_PREFABS[ScreenNames.SHOP_SCREEN] = 'ShopScreen', _SCREEN_PREFABS[ScreenNames.SKIN_SCREEN] = 'SkinScreen', _SCREEN_PREFABS);
      var ScreenManager = exports('ScreenManager', (_dec = ccclass('ScreenManager'), _dec2 = property(GameScreen), _dec3 = property(LoadingScreen), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ScreenManager, _Component);
        function ScreenManager() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // Both live in the scene hierarchy instead of the lazy bundle: the game screen is always
          // needed, and the loading screen is what covers the wait while that bundle downloads.
          _initializerDefineProperty(_this, "gameScreen", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "loadingScreen", _descriptor2, _assertThisInitialized(_this));
          _this.screenMap = {};
          _this.pendingScreens = new Map();
          _this.bundlePromise = null;
          _this.transitionLayerPromise = null;
          _this.adCovering = false;
          _this.adCover = {
            show: function show() {
              _this.adCovering = true;
              void _this.showLoadingScreen();
            },
            hide: function hide() {
              _this.adCovering = false;
              void _this.hideLoadingScreen();
            }
          };
          return _this;
        }
        var _proto = ScreenManager.prototype;
        // ---- lifecycle ----
        _proto.__preload = function __preload() {
          var _this$node$scene;
          ScreenManager._instance = this;
          this.screenMap[ScreenNames.GAME_SCREEN] = this.gameScreen;
          this.screenMap[ScreenNames.LOADING_SCREEN] = this.loadingScreen;
          (_this$node$scene = this.node.scene) == null || _this$node$scene.on(GameEvents.ON_SCREEN_CLOSED, this.handleScreenClosed, this);
          AdsUtils.getInstance().setLoadingCover(this.adCover);
          this.showLoadingScreen();
        };
        _proto.onDestroy = function onDestroy() {
          var _this$node$scene2;
          (_this$node$scene2 = this.node.scene) == null || _this$node$scene2.off(GameEvents.ON_SCREEN_CLOSED, this.handleScreenClosed, this);
          AdsUtils.getInstance().setLoadingCover(null);
          if (ScreenManager._instance === this) ScreenManager._instance = null;
        };
        _proto.openScreenAsync = /*#__PURE__*/function () {
          var _openScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(name, data, keepFullscreen) {
            var screen;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  if (!this.needsFetch(name)) {
                    _context.next = 3;
                    break;
                  }
                  _context.next = 3;
                  return this.showLoadingScreen();
                case 3:
                  _context.next = 5;
                  return this.ensureScreenAsync(name);
                case 5:
                  screen = _context.sent;
                  if (!screen) {
                    _context.next = 11;
                    break;
                  }
                  if (screen.isFullscreen) this.hideFullscreenExcept(name, keepFullscreen);
                  this.syncGameplaySuspended(name);
                  _context.next = 11;
                  return screen.openScreenAsync(data);
                case 11:
                  _context.next = 13;
                  return this.hideLoadingScreen();
                case 13:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function openScreenAsync(_x, _x2, _x3) {
            return _openScreenAsync.apply(this, arguments);
          }
          return openScreenAsync;
        }();
        _proto.closeScreenAsync = /*#__PURE__*/function () {
          var _closeScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(name, data) {
            var screen;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  screen = this.screenMap[name];
                  if (screen) {
                    _context2.next = 3;
                    break;
                  }
                  return _context2.abrupt("return");
                case 3:
                  _context2.next = 5;
                  return screen.closeScreenAsync(data);
                case 5:
                  this.syncGameplaySuspended();
                case 6:
                case "end":
                  return _context2.stop();
              }
            }, _callee2, this);
          }));
          function closeScreenAsync(_x4, _x5) {
            return _closeScreenAsync.apply(this, arguments);
          }
          return closeScreenAsync;
        }();
        _proto.showLoadingScreen = /*#__PURE__*/function () {
          var _showLoadingScreen = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            var _window$__TOUCH_DEBUG, _this$loadingScreen;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  (_window$__TOUCH_DEBUG = window.__TOUCH_DEBUG__) == null || _window$__TOUCH_DEBUG.log('loading screen show');
                  _context3.next = 3;
                  return (_this$loadingScreen = this.loadingScreen) == null ? void 0 : _this$loadingScreen.openScreenAsync();
                case 3:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, this);
          }));
          function showLoadingScreen() {
            return _showLoadingScreen.apply(this, arguments);
          }
          return showLoadingScreen;
        }();
        _proto.hideLoadingScreen = /*#__PURE__*/function () {
          var _hideLoadingScreen = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            var _this$loadingScreen2, _window$__TOUCH_DEBUG2;
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) switch (_context4.prev = _context4.next) {
                case 0:
                  if (!(this.adCovering || !((_this$loadingScreen2 = this.loadingScreen) != null && _this$loadingScreen2.node.active))) {
                    _context4.next = 2;
                    break;
                  }
                  return _context4.abrupt("return");
                case 2:
                  (_window$__TOUCH_DEBUG2 = window.__TOUCH_DEBUG__) == null || _window$__TOUCH_DEBUG2.log('loading screen hide');
                  _context4.next = 5;
                  return this.loadingScreen.closeScreenAsync();
                case 5:
                case "end":
                  return _context4.stop();
              }
            }, _callee4, this);
          }));
          function hideLoadingScreen() {
            return _hideLoadingScreen.apply(this, arguments);
          }
          return hideLoadingScreen;
        }() // ---- queries ----
        ;

        _proto.getGameScreen = function getGameScreen() {
          if (!this.gameScreen) throw new Error('GameScreen accessed before it was loaded.');
          return this.gameScreen;
        };
        _proto.hasScreen = function hasScreen(name) {
          return this.screenMap[name] !== undefined || SCREEN_PREFABS[name] !== undefined;
        };
        _proto.getActiveFullscreen = function getActiveFullscreen(except) {
          for (var _i = 0, _Object$values = Object.values(this.screenMap); _i < _Object$values.length; _i++) {
            var screen = _Object$values[_i];
            if (screen.node.name === except) continue;
            if (screen.isFullscreen && screen.node.activeInHierarchy) return screen;
          }
          return null;
        }

        // ---- preloading ----
        ;

        _proto.queueScreenPreload = function queueScreenPreload() {
          var _this2 = this;
          var _loop = function _loop() {
            var _Object$entries$_i = _Object$entries[_i2],
              name = _Object$entries$_i[0],
              path = _Object$entries$_i[1];
            if (!_this2.needsFetch(name)) return 1; // continue
            _this2.loadPrefabAsync(path)["catch"](function (error) {
              console.error("Failed to preload screen " + name + ".", error);
            });
          };
          for (var _i2 = 0, _Object$entries = Object.entries(SCREEN_PREFABS); _i2 < _Object$entries.length; _i2++) {
            if (_loop()) continue;
          }
        };
        _proto.ensureTransitionLayerAsync = /*#__PURE__*/function () {
          var _ensureTransitionLayerAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
            var _this3 = this;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  if (!this.transitionLayerPromise) {
                    _context5.next = 2;
                    break;
                  }
                  return _context5.abrupt("return", this.transitionLayerPromise);
                case 2:
                  this.transitionLayerPromise = this.loadPrefabAsync(TRANSITION_LAYER_PREFAB).then(function (prefab) {
                    var node = instantiate(prefab);
                    node.active = true;
                    node.setParent(_this3.node);
                  });
                  _context5.prev = 3;
                  _context5.next = 6;
                  return this.transitionLayerPromise;
                case 6:
                  _context5.next = 12;
                  break;
                case 8:
                  _context5.prev = 8;
                  _context5.t0 = _context5["catch"](3);
                  this.transitionLayerPromise = null;
                  console.error("Failed to load " + TRANSITION_LAYER_PREFAB + ".", _context5.t0);
                case 12:
                case "end":
                  return _context5.stop();
              }
            }, _callee5, this, [[3, 8]]);
          }));
          function ensureTransitionLayerAsync() {
            return _ensureTransitionLayerAsync.apply(this, arguments);
          }
          return ensureTransitionLayerAsync;
        }() /** False once the prefab is built or already cached, so a warm open shows no loading screen. */;
        _proto.needsFetch = function needsFetch(name) {
          var _assetManager$getBund;
          if (this.screenMap[name]) return false;
          var path = SCREEN_PREFABS[name];
          if (!path) return false;
          return !((_assetManager$getBund = assetManager.getBundle(SCREEN_BUNDLE)) != null && _assetManager$getBund.get(path, Prefab));
        }

        // ---- building screens ----
        ;

        _proto.ensureScreenAsync = function ensureScreenAsync(name) {
          var _this4 = this;
          var loaded = this.screenMap[name];
          if (loaded) return Promise.resolve(loaded);
          var pending = this.pendingScreens.get(name);
          if (pending) return pending;
          var path = SCREEN_PREFABS[name];
          if (!path) {
            console.warn("Screen with name " + name + " is not configured.");
            return Promise.resolve(null);
          }
          var loading = this.createScreenAsync(name, path)["catch"](function (error) {
            console.error("Failed to load screen " + name + ".", error);
            return null;
          })["finally"](function () {
            return _this4.pendingScreens["delete"](name);
          });
          this.pendingScreens.set(name, loading);
          return loading;
        };
        _proto.createScreenAsync = /*#__PURE__*/function () {
          var _createScreenAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(name, path) {
            var _this$loadingScreen3;
            var prefab, node, component, screen;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return this.loadPrefabAsync(path);
                case 2:
                  prefab = _context6.sent;
                  node = instantiate(prefab);
                  node.active = false;
                  node.setParent(this.node);
                  // Appended screens land above the loading screen, so it must be raised back over them.
                  if ((_this$loadingScreen3 = this.loadingScreen) != null && _this$loadingScreen3.node.active) {
                    this.loadingScreen.node.setSiblingIndex(this.node.children.length - 1);
                  }
                  component = node.getComponent('BaseScreen');
                  if (component) {
                    _context6.next = 11;
                    break;
                  }
                  node.destroy();
                  throw new Error(path + " does not contain a BaseScreen component.");
                case 11:
                  screen = component;
                  this.screenMap[name] = screen;
                  return _context6.abrupt("return", screen);
                case 14:
                case "end":
                  return _context6.stop();
              }
            }, _callee6, this);
          }));
          function createScreenAsync(_x6, _x7) {
            return _createScreenAsync.apply(this, arguments);
          }
          return createScreenAsync;
        }() // ---- asset loading ----
        ;

        _proto.loadPrefabAsync = /*#__PURE__*/
        function () {
          var _loadPrefabAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(path) {
            var bundle;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return this.loadBundleAsync();
                case 2:
                  bundle = _context7.sent;
                  return _context7.abrupt("return", new Promise(function (resolve, reject) {
                    bundle.load(path, Prefab, function (error, prefab) {
                      if (error) reject(error);else resolve(prefab);
                    });
                  }));
                case 4:
                case "end":
                  return _context7.stop();
              }
            }, _callee7, this);
          }));
          function loadPrefabAsync(_x8) {
            return _loadPrefabAsync.apply(this, arguments);
          }
          return loadPrefabAsync;
        }();
        _proto.loadBundleAsync = function loadBundleAsync() {
          var _this5 = this;
          if (this.bundlePromise) return this.bundlePromise;
          this.bundlePromise = new Promise(function (resolve, reject) {
            assetManager.loadBundle(SCREEN_BUNDLE, function (error, bundle) {
              if (error) reject(error);else resolve(bundle);
            });
          })["catch"](function (error) {
            // Cleared so a failed download can be retried instead of caching the rejection.
            _this5.bundlePromise = null;
            throw error;
          });
          return this.bundlePromise;
        }

        // ---- visibility ----
        ;

        _proto.handleScreenClosed = function handleScreenClosed() {
          this.syncGameplaySuspended();
        }

        /** `opening` counts as suspending before it is active, so the flag lands on the same frame. */;
        _proto.syncGameplaySuspended = function syncGameplaySuspended(opening) {
          var _this$node$scene3;
          var suspended = opening !== undefined && opening !== ScreenNames.GAME_SCREEN || Object.values(this.screenMap).some(function (screen) {
            return screen.node.name !== ScreenNames.GAME_SCREEN && screen.node.activeInHierarchy;
          });
          (_this$node$scene3 = this.node.scene) == null || _this$node$scene3.emit(GameEvents.ON_GAMEPLAY_SUSPENDED, suspended);
        };
        _proto.hideFullscreenExcept = function hideFullscreenExcept(name, keep) {
          for (var _i3 = 0, _Object$values2 = Object.values(this.screenMap); _i3 < _Object$values2.length; _i3++) {
            var screen = _Object$values2[_i3];
            var other = screen.node.name;
            if (other === name || other === keep) continue;
            if (screen.isFullscreen && screen.node.active) void screen.closeScreenAsync();
          }
        };
        _createClass(ScreenManager, null, [{
          key: "instance",
          get: function get() {
            if (!ScreenManager._instance) {
              throw new Error('ScreenManager accessed before it was initialized.');
            }
            return ScreenManager._instance;
          }
        }]);
        return ScreenManager;
      }(Component), _class3._instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gameScreen", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "loadingScreen", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopItemCard.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Label, Node, Button, Sprite, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      Node = module.Node;
      Button = module.Button;
      Sprite = module.Sprite;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;
      cclegacy._RF.push({}, "2e70bnUXxhMY6cdm0jm8CwV", "ShopItemCard", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * One item for sale. Owns its refs and its buy button, and reports a purchase through `onBuy`
       * rather than a scene event.
       */
      var ShopItemCard = exports('ShopItemCard', (_dec = ccclass('ShopItemCard'), _dec2 = property(Label), _dec3 = property(Label), _dec4 = property(Node), _dec5 = property(Label), _dec6 = property(Button), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShopItemCard, _Component);
        function ShopItemCard() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          // Names the SHOP_ITEMS entry this card sells; the screen hides any card whose id it cannot
          // resolve, so a reordered catalogue can never re-point a card at the wrong item.
          _initializerDefineProperty(_this, "itemId", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "nameLabel", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "priceLabel", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "priceIcon", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "limitLabel", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "buyButton", _descriptor6, _assertThisInitialized(_this));
          _this.onBuy = null;
          _this.buttonSprite = null;
          _this.buttonSpriteRead = false;
          _this.priceX = Number.NaN;
          return _this;
        }
        var _proto = ShopItemCard.prototype;
        _proto.getItemId = function getItemId() {
          return this.itemId;
        };
        _proto.__preload = function __preload() {
          var _this$buyButton;
          (_this$buyButton = this.buyButton) == null || _this$buyButton.node.on(Button.EventType.CLICK, this.handleClickBuy, this);
        };
        _proto.onDestroy = function onDestroy() {
          var _this$buyButton2;
          (_this$buyButton2 = this.buyButton) == null || _this$buyButton2.node.off(Button.EventType.CLICK, this.handleClickBuy, this);
        };
        _proto.render = function render(item) {
          this.node.active = true;
          if (this.nameLabel) this.nameLabel.string = item.label;
          if (this.limitLabel) this.limitLabel.string = item.note;
          this.renderPrice(item);
          this.renderState(item);
        };
        _proto.hide = function hide() {
          this.node.active = false;
        };
        _proto.renderPrice = function renderPrice(item) {
          var label = this.priceLabel;
          if (label) label.string = item.priceText;
          if (this.priceIcon) this.priceIcon.active = item.showPriceIcon;
          if (!label || !this.priceIcon) return;

          // The price is authored offset to leave room for the coin icon; with the icon gone the
          // text would read as floating right, so it drops back to the middle of the button.
          if (Number.isNaN(this.priceX)) this.priceX = label.node.position.x;
          label.node.setPosition(item.showPriceIcon ? this.priceX : 0, label.node.position.y, 0);
        };
        _proto.renderState = function renderState(item) {
          if (this.buyButton) this.buyButton.interactable = item.buyable;
          var sprite = this.buttonGraphic();
          if (sprite) sprite.grayscale = !item.buyable;
        }

        // Read off the button the card already holds rather than wired as a second @property, and
        // looked up once here instead of in a lifecycle hook.
        ;

        _proto.buttonGraphic = function buttonGraphic() {
          if (!this.buttonSpriteRead) {
            var _this$buyButton$node$, _this$buyButton3;
            this.buttonSpriteRead = true;
            this.buttonSprite = (_this$buyButton$node$ = (_this$buyButton3 = this.buyButton) == null ? void 0 : _this$buyButton3.node.getComponent(Sprite)) != null ? _this$buyButton$node$ : null;
          }
          return this.buttonSprite;
        };
        _proto.handleClickBuy = function handleClickBuy() {
          var _this$onBuy;
          (_this$onBuy = this.onBuy) == null || _this$onBuy.call(this);
        };
        return ShopItemCard;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "itemId", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nameLabel", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "priceLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "priceIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "limitLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "buyButton", [_dec6], {
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

System.register("chunks:///_virtual/ShopItems.ts", ['cc', './CellSkins.ts'], function (exports) {
  var cclegacy, CELL_SKINS;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      CELL_SKINS = module.CELL_SKINS;
    }],
    execute: function () {
      exports('findShopItem', findShopItem);
      cclegacy._RF.push({}, "b1f8aJgPUdOlYwCal99keO0", "ShopItems", undefined);
      var COIN_AD_ITEM = exports('COIN_AD_ITEM', {
        id: 'CoinAd',
        label: 'COINS',
        price: 0,
        grant: {
          coins: 5
        },
        ad: true,
        limit: {
          kind: 'daily',
          perDay: 3
        }
      });
      var HEART_ITEM = exports('HEART_ITEM', {
        id: 'heart',
        label: 'HEART',
        price: 3,
        grant: {
          hearts: 1
        },
        limit: {
          kind: 'daily',
          perDay: 1
        }
      });
      var SKIN_ITEMS = CELL_SKINS.filter(function (skin) {
        return skin.price > 0;
      }).map(function (skin) {
        return {
          id: "skin." + skin.id,
          label: skin.label,
          price: skin.price,
          grant: {},
          unlocks: skin.id,
          limit: {
            kind: 'once'
          }
        };
      });
      var SHOP_ITEMS = exports('SHOP_ITEMS', [COIN_AD_ITEM, HEART_ITEM].concat(SKIN_ITEMS));
      function findShopItem(id) {
        var _SHOP_ITEMS$find;
        return (_SHOP_ITEMS$find = SHOP_ITEMS.find(function (item) {
          return item.id === id;
        })) != null ? _SHOP_ITEMS$find : null;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/ShopService.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DailyQuestService.ts', './DataManager.ts', './SkinService.ts', './WalletService.ts', './DailyQuests.ts'], function (exports) {
  var _extends, cclegacy, DataManager, SkinService, WalletService, toDayKey;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, null, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      SkinService = module.SkinService;
    }, function (module) {
      WalletService = module.WalletService;
    }, function (module) {
      toDayKey = module.toDayKey;
    }],
    execute: function () {
      exports({
        boughtEver: boughtEver,
        boughtOn: boughtOn,
        msUntilNextDay: msUntilNextDay,
        recordBuy: recordBuy,
        remainingFor: remainingFor,
        sanitize: sanitize
      });
      cclegacy._RF.push({}, "7d3c56BmiZPcLFYTiB5xq0/", "ShopService", undefined);
      function toBuy(value) {
        if (!value || typeof value !== 'object') return null;
        var record = value;
        if (typeof record.day !== 'string' || record.day === '') return null;
        var count = typeof record.count === 'number' && Number.isFinite(record.count) ? Math.max(0, Math.floor(record.count)) : 0;
        return count > 0 ? {
          day: record.day,
          count: count
        } : null;
      }
      function sanitize(value) {
        var stored = value == null ? void 0 : value.buys;
        var buys = {};
        if (stored && typeof stored === 'object') {
          for (var _i = 0, _Object$entries = Object.entries(stored); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _Object$entries[_i],
              id = _Object$entries$_i[0],
              entry = _Object$entries$_i[1];
            var buy = toBuy(entry);
            if (buy) buys[id] = buy;
          }
        }
        return {
          buys: buys
        };
      }
      function boughtOn(state, id, day) {
        var buy = state.buys[id];
        return buy && buy.day === day ? buy.count : 0;
      }
      function boughtEver(state, id) {
        var _state$buys$id$count, _state$buys$id;
        return (_state$buys$id$count = (_state$buys$id = state.buys[id]) == null ? void 0 : _state$buys$id.count) != null ? _state$buys$id$count : 0;
      }

      // The two limit kinds read the same ledger; an owned-once item just ignores the day it was stamped
      // with and counts against all time instead of against today.
      function remainingFor(state, item, day) {
        if (item.limit.kind === 'once') return boughtEver(state, item.id) > 0 ? 0 : 1;
        return Math.max(0, item.limit.perDay - boughtOn(state, item.id, day));
      }
      function recordBuy(state, id, day) {
        var _extends2;
        var count = boughtOn(state, id, day) + 1;
        return {
          buys: _extends({}, state.buys, (_extends2 = {}, _extends2[id] = {
            day: day,
            count: count
          }, _extends2))
        };
      }

      // Must land on the same local midnight `toDayKey` rolls over at, or the countdown hits zero on the
      // wrong side of the boundary.
      function msUntilNextDay(now) {
        var date = new Date(now);
        var midnight = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).getTime();
        return Math.max(0, midnight - now);
      }
      var cached = null;
      function load() {
        if (!cached) cached = sanitize(DataManager.getPlayerData('shop'));
        return cached;
      }
      function save(next) {
        cached = next;
        DataManager.setPlayerData('shop', next);
        return next;
      }
      function today() {
        return toDayKey(new Date());
      }
      var ShopService = exports('ShopService', {
        get: function get() {
          return {
            buys: _extends({}, load().buys)
          };
        },
        remaining: function remaining(item, day) {
          if (day === void 0) {
            day = today();
          }
          return remainingFor(load(), item, day);
        },
        check: function check(item, day) {
          if (day === void 0) {
            day = today();
          }
          if (ShopService.remaining(item, day) <= 0) return 'limit';
          return WalletService.get().coins >= item.price ? 'ok' : 'poor';
        },
        // The day is stamped only once the wallet write has gone through: a stamp ahead of a refused
        // debit would cost the player the day for nothing.
        buy: function buy(item, day) {
          if (day === void 0) {
            day = today();
          }
          var verdict = ShopService.check(item, day);
          if (verdict !== 'ok') return verdict;
          if (!WalletService.trade(item.price, item.grant)) return 'poor';
          if (item.unlocks) SkinService.unlock(item.unlocks);
          save(recordBuy(load(), item.id, day));
          return 'ok';
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SkinRow.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Sprite, Node, Button, Component;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Node = module.Node;
      Button = module.Button;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;
      cclegacy._RF.push({}, "78a5eCUJWBOg4oiMVFfKGjz", "SkinRow", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;

      /**
       * One buyable skin in the picker: its preview icon, its lock badge and its toggle. Default and
       * Random have no icon or lock, so they stay plain toggles on the screen itself.
       */
      var SkinRow = exports('SkinRow', (_dec = ccclass('SkinRow'), _dec2 = property(Sprite), _dec3 = property(Sprite), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SkinRow, _Component);
        function SkinRow() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "icon", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lock", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "toggle", _descriptor3, _assertThisInitialized(_this));
          _this.button = null;
          _this.toggleSprite = null;
          _this.read = false;
          return _this;
        }
        var _proto = SkinRow.prototype;
        /** Tolerates `toggle` being wired to the row instead of the Toggle node inside it. */
        _proto.toggleButton = function toggleButton() {
          this.resolve();
          return this.button;
        }

        /** Locked rows can never be the selected one, so `on` is only ever true for an owned skin. */;
        _proto.render = function render(on, locked, onFrame, offFrame) {
          this.resolve();
          var frame = on ? onFrame : offFrame;
          if (this.toggleSprite && frame) this.toggleSprite.spriteFrame = frame;
          if (this.button) this.button.interactable = !locked;
          if (this.icon) this.icon.grayscale = locked;
          if (this.lock) this.lock.node.active = locked;
        }

        // Read off the toggle node the row already holds rather than wired as two more properties, and
        // looked up once here instead of in a lifecycle hook.
        ;

        _proto.resolve = function resolve() {
          var _ref, _this$toggle$getCompo, _this$toggle, _this$toggle2, _this$button$node$get, _this$button;
          if (this.read) return;
          this.read = true;
          this.button = (_ref = (_this$toggle$getCompo = (_this$toggle = this.toggle) == null ? void 0 : _this$toggle.getComponent(Button)) != null ? _this$toggle$getCompo : (_this$toggle2 = this.toggle) == null ? void 0 : _this$toggle2.getComponentInChildren(Button)) != null ? _ref : null;
          this.toggleSprite = (_this$button$node$get = (_this$button = this.button) == null ? void 0 : _this$button.node.getComponent(Sprite)) != null ? _this$button$node$get : null;
        };
        return SkinRow;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lock", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "toggle", [_dec4], {
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

System.register("chunks:///_virtual/SkinService.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CellSkins.ts', './DataManager.ts', './ModeUtils.ts'], function (exports) {
  var _extends, _createForOfIteratorHelperLoose, cclegacy, RANDOM_SKIN, isSkinId, DEFAULT_SKIN, accentFor, DataManager, ModeUtils, GAME_MODE;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      RANDOM_SKIN = module.RANDOM_SKIN;
      isSkinId = module.isSkinId;
      DEFAULT_SKIN = module.DEFAULT_SKIN;
      accentFor = module.accentFor;
    }, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      ModeUtils = module.default;
      GAME_MODE = module.GAME_MODE;
    }],
    execute: function () {
      exports({
        rollSkin: rollSkin,
        sanitize: sanitize,
        select: _select,
        unlock: _unlock
      });
      cclegacy._RF.push({}, "d19e5HKghBE5ISYHaYGPX3N", "SkinService", undefined);
      // `default` is owned unconditionally, whatever the record says — a damaged save must never leave
      // the player with no skin to fall back on.
      function sanitizeOwned(value) {
        var owned = [DEFAULT_SKIN];
        if (!Array.isArray(value)) return owned;
        for (var _iterator = _createForOfIteratorHelperLoose(value), _step; !(_step = _iterator()).done;) {
          var entry = _step.value;
          if (typeof entry === 'string' && isSkinId(entry) && !owned.includes(entry)) owned.push(entry);
        }
        return owned;
      }
      function sanitize(value) {
        var owned = sanitizeOwned(value == null ? void 0 : value.owned);
        var active = value == null ? void 0 : value.active;
        var selectable = active === RANDOM_SKIN || typeof active === 'string' && isSkinId(active) && owned.includes(active);
        return {
          owned: owned,
          active: selectable ? active : DEFAULT_SKIN
        };
      }
      function _unlock(state, id) {
        if (state.owned.includes(id)) return state;
        return _extends({}, state, {
          owned: [].concat(state.owned, [id])
        });
      }
      function _select(state, selection) {
        if (selection !== RANDOM_SKIN && !state.owned.includes(selection)) return state;
        return _extends({}, state, {
          active: selection
        });
      }
      function rollSkin(pool, current, roll) {
        var _pool$;
        if (pool.length <= 1) return (_pool$ = pool[0]) != null ? _pool$ : DEFAULT_SKIN;
        var others = pool.filter(function (id) {
          return id !== current;
        });
        var index = Math.min(others.length - 1, Math.floor(roll * others.length));
        return others[index];
      }
      var cached = null;
      // The live roll while `random` is selected. Session state on purpose: a reload starts on default and
      // takes the next board clear to move, which is what "starts at default" means.
      var rolled = DEFAULT_SKIN;
      function load() {
        if (!cached) cached = sanitize(DataManager.getPlayerData('skins'));
        return cached;
      }
      function save(next) {
        cached = next;
        DataManager.setPlayerData('skins', next);
        return next;
      }
      var SkinService = exports('SkinService', {
        get: function get() {
          var state = load();
          return {
            owned: [].concat(state.owned),
            active: state.active
          };
        },
        isOwned: function isOwned(id) {
          return load().owned.includes(id);
        },
        unlock: function unlock(id) {
          var state = load();
          var next = _unlock(state, id);
          if (next !== state) save(next);
        },
        select: function select(selection) {
          var state = load();
          var next = _select(state, selection);
          if (next === state) return;
          // Switching to random keeps whatever is on screen until the next board clear moves it —
          // seeding the roll with the old selection instead of leaving it where the last one left it.
          var showing = SkinService.active();
          save(next);
          rolled = selection === RANDOM_SKIN ? showing : selection;
        },
        getSelection: function getSelection() {
          return load().active;
        },
        isRandom: function isRandom() {
          return load().active === RANDOM_SKIN;
        },
        /**
         * The one colour effects should use, or null to keep the per-colour spectrum. A single-palette
         * skin paints every cell the same, so a colour index no longer means anything under it.
         */
        accent: function accent() {
          return accentFor(SkinService.active());
        },
        /** Single-palette skins suppress the rainbow variants — there is no spectrum to echo. */isSinglePalette: function isSinglePalette() {
          return accentFor(SkinService.active()) !== null;
        },
        /**
         * The skin actually rendering right now — the selection, or the current roll under `random`.
         * Adventure always renders default: its gem, armor and mark art is authored against the classic
         * cells, and a skin replacing everything around it leaves the marks unreadable. The selection is
         * untouched, so it comes back the moment another mode starts.
         */
        active: function active() {
          if (ModeUtils.getInstance().getCurrentMode() === GAME_MODE.ADVENTURE) return DEFAULT_SKIN;
          var selection = load().active;
          return selection === RANDOM_SKIN ? rolled : selection;
        },
        /** Re-rolls under `random`. Returns whether the rendered skin changed. */roll: function roll(random) {
          if (random === void 0) {
            random = Math.random();
          }
          if (!SkinService.isRandom()) return false;
          var next = rollSkin(load().owned, rolled, random);
          if (next === rolled) return false;
          rolled = next;
          return true;
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpawnPlanner.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './BitUtils.ts', './PerformanceProfiler.ts', './BandDrainSolver.ts', './ForwardSimSolver.ts', './PlacementScoring.ts', './ReviveSolver.ts', './RegionTiler.ts'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy, popCount, PerformanceProfiler, BandDrainSolver, ForwardSimSolver, BOARD_CELLS, ReviveSolver;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      popCount = module.popCount;
    }, function (module) {
      PerformanceProfiler = module.PerformanceProfiler;
    }, function (module) {
      BandDrainSolver = module.BandDrainSolver;
    }, function (module) {
      ForwardSimSolver = module.ForwardSimSolver;
    }, function (module) {
      BOARD_CELLS = module.BOARD_CELLS;
      var _setter = {};
      _setter.DEFAULT_COMPLEXITY_WEIGHTS = module.DEFAULT_COMPLEXITY_WEIGHTS;
      _setter.boardComplexity = module.boardComplexity;
      _setter.buildPickContext = module.buildPickContext;
      _setter.minBlocksForRegion = module.minBlocksForRegion;
      _setter.placementsFor = module.placementsFor;
      _setter.scoreByComplexity = module.scoreByComplexity;
      _setter.scoreForPick = module.scoreForPick;
      exports(_setter);
    }, function (module) {
      ReviveSolver = module.ReviveSolver;
    }, function (module) {
      var _setter = {};
      _setter.bandCandidates = module.bandCandidates;
      _setter.generateClearRecipe = module.generateClearRecipe;
      _setter.sizeBiasedOrder = module.sizeBiasedOrder;
      _setter.tileWithRetries = module.tileWithRetries;
      exports(_setter);
    }],
    execute: function () {
      cclegacy._RF.push({}, "602f5iTdIhCX4voCzOyRKFk", "SpawnPlanner", undefined);

      /** Retention of a shape's "recently handed" heat per committed plan (1 = handed last set). */
      var HEAT_DECAY = 0.5;
      /** Heat below this is forgotten, keeping the heat map to the genuinely recent shapes. */
      var HEAT_FLOOR = 0.05;

      /** Momentum EMA retention per set — higher = slower decay, longer combo memory */
      var MOMENTUM_DECAY = 0.7;
      /** Momentum EMA update weight for the current set's clears */
      var MOMENTUM_WEIGHT = 0.3;
      /** Above this momentum the planner enters cooldown (stops forcing clears) */
      var MOMENTUM_BURST_THRESHOLD = 1.8;

      /**
       * Owns the spawn queue and the pacing state (momentum, per-shape heat, plan cooldown), and
       * routes each spawn to one of three stateless solvers:
       *
       *   - `BandDrainSolver`   — the board-clear window's exact-cover drain.
       *   - `ForwardSimSolver`  — the normal clear-first forward simulation.
       *   - `ReviveSolver`      — the all-fitting hand for the second-chance flow.
       *
       * The solvers compute; this class decides whether to commit. Keeping that split means a
       * search whose result is thrown away leaves no trace in the pacing state.
       */
      var SpawnPlanner = exports('SpawnPlanner', /*#__PURE__*/function () {
        function SpawnPlanner() {
          this.queue = [];
          this.setsUntilPlan = 0;
          /**
           * EMA of clears per committed plan. Above MOMENTUM_BURST_THRESHOLD the planner enters
           * cooldown mode — it stops forcing clears so the "god burst" naturally fades, mirroring
           * Block Blast's burst → cooldown → burst rhythm.
           */
          this.momentum = 0;
          /**
           * Per-shape "recently handed" heat in (0,1], decayed once per committed plan. Without it
           * the whole planner is a pure function of the board mask: at topK === 1 the search runs a
           * single attempt and returns the argmax, so the same board always produced the same hand
           * — and since a hand's own best placements tend to return the board to a mask already
           * seen, the planner settled into handing one set forever. topK collapses to 1 on the
           * board-clear window's tier-0 fallback, on the director's pity plan, and on tier 0, which
           * together own roughly half of all spawns.
           */
          this.defHeat = new Map();
          this.bandDrain = new BandDrainSolver();
          this.forwardSim = new ForwardSimSolver();
          this.revive = new ReviveSolver();
        }
        var _proto = SpawnPlanner.prototype;
        _proto.hasQueue = function hasQueue() {
          return this.queue.length > 0;
        };
        _proto.dequeue = function dequeue(count) {
          return this.queue.splice(0, count);
        };
        _proto.reset = function reset() {
          this.queue = [];
          this.setsUntilPlan = 0;
          this.momentum = 0;
          this.defHeat.clear();
        };
        _proto.tickAndShouldPlan = function tickAndShouldPlan(boardMask, config) {
          if (this.queue.length > 0) return false;
          if (this.setsUntilPlan > 0) {
            this.setsUntilPlan--;
            return false;
          }
          // Skip planning on a nearly empty board — scoring is meaningless when no clears are
          // possible and gap regions span the whole grid. Let the random fallback in BlockLogic
          // handle early-game variety instead.
          return popCount(boardMask) / BOARD_CELLS >= config.minBoardFill;
        }

        /**
         * Runs the forward simulation and commits the best set found.
         *
         * Sets meeting `minClearsRequired` are preferred over those that don't; among sets in the
         * same tier, higher clears wins.
         *
         * With `requireMultiClear` (the director's combo moment) the acceptance test changes to
         * "some single placement clears 2+ lines at once", and a failed search neither sets the
         * plan cooldown nor touches momentum, so the normal plan can still run in the same spawn
         * cycle.
         */;
        _proto.tryPlan = function tryPlan(boardMask, config, requireMultiClear) {
          if (requireMultiClear === void 0) {
            requireMultiClear = false;
          }
          var startedAt = PerformanceProfiler.now();
          // Cooldown: when momentum is high the player is mid-burst — relax the clear
          // requirement so the next set doesn't keep force-feeding combos. This creates a
          // natural burst/cooldown rhythm instead of constant god sequences.
          var cooldown = this.momentum >= MOMENTUM_BURST_THRESHOLD;
          var result = this.forwardSim.solve(boardMask, config, requireMultiClear, this.defHeat, cooldown);
          var finish = function finish(success) {
            var _result$attempts, _result$boardStates, _result$candidates;
            PerformanceProfiler.log('Planner/try plan details', startedAt, {
              attempts: (_result$attempts = result == null ? void 0 : result.attempts) != null ? _result$attempts : 0,
              boardStates: (_result$boardStates = result == null ? void 0 : result.boardStates) != null ? _result$boardStates : 0,
              candidates: (_result$candidates = result == null ? void 0 : result.candidates) != null ? _result$candidates : 0,
              multiClear: requireMultiClear,
              result: success
            });
            return success;
          };
          if (!result) {
            if (requireMultiClear) return finish(false);
            this.setsUntilPlan = config.planInterval;
            // Still decay momentum on failed plans so the session trends toward calm.
            this.momentum *= MOMENTUM_DECAY;
            return finish(false);
          }

          // EMA update: rolling clear rate over recent sets drives the cooldown gate.
          this.momentum = this.momentum * MOMENTUM_DECAY + result.clears * MOMENTUM_WEIGHT;
          this.queueDefs(shuffle([].concat(result.defs)));
          return finish(true);
        }

        /**
         * Board-clear seek (window open). Returns false when the board is too spread to drain,
         * leaving the caller to fall back to the normal planner at the easiest tier.
         */;
        _proto.tryPlanBoardClear = function tryPlanBoardClear(boardMask) {
          if (this.queue.length > 0) return false;
          var defs = this.bandDrain.solve(boardMask);
          if (!defs) return false;
          this.queueDefs(defs);
          return true;
        }

        /** Three blocks for the revive flow, every one of which fits the current board. */;
        _proto.planMaxClears = function planMaxClears(boardMask) {
          return this.revive.solve(boardMask);
        }

        /** Commits a planned hand and marks its shapes as just-handed for the freshness bonus. */;
        _proto.queueDefs = function queueDefs(defs) {
          this.queue = defs;
          for (var _iterator = _createForOfIteratorHelperLoose(this.defHeat), _step; !(_step = _iterator()).done;) {
            var _step$value = _step.value,
              id = _step$value[0],
              heat = _step$value[1];
            var next = heat * HEAT_DECAY;
            if (next < HEAT_FLOOR) this.defHeat["delete"](id);else this.defHeat.set(id, next);
          }
          for (var _iterator2 = _createForOfIteratorHelperLoose(defs), _step2; !(_step2 = _iterator2()).done;) {
            var def = _step2.value;
            this.defHeat.set(def.id, 1);
          }
        };
        return SpawnPlanner;
      }());
      function shuffle(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var _ref = [arr[j], arr[i]];
          arr[i] = _ref[0];
          arr[j] = _ref[1];
        }
        return arr;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SpriteLoader.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './CellSkins.ts', './SkinService.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createClass, cclegacy, _decorator, SpriteFrame, Component, SKIN_FRAME_INDEX, SkinService;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }, function (module) {
      SKIN_FRAME_INDEX = module.SKIN_FRAME_INDEX;
    }, function (module) {
      SkinService = module.SkinService;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _class3;
      cclegacy._RF.push({}, "f4267hjM7NLF7yM1l9M7PnV", "SpriteLoader", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SpriteLoader = exports('SpriteLoader', (_dec = ccclass('SpriteLoader'), _dec2 = property([SpriteFrame]), _dec3 = property([SpriteFrame]), _dec4 = property([SpriteFrame]), _dec5 = property([SpriteFrame]), _dec6 = property([SpriteFrame]), _dec7 = property([SpriteFrame]), _dec8 = property([SpriteFrame]), _dec9 = property([SpriteFrame]), _dec10 = property([SpriteFrame]), _dec11 = property(SpriteFrame), _dec12 = property(SpriteFrame), _dec13 = property(SpriteFrame), _dec(_class = (_class2 = (_class3 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SpriteLoader, _Component);
        function SpriteLoader() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "cellSprites", _descriptor, _assertThisInitialized(_this));
          /** Paid cell skins, ordered by SKIN_FRAME_INDEX. The default skin has no entry here. */
          _initializerDefineProperty(_this, "skinFrames", _descriptor2, _assertThisInitialized(_this));
          /** Board art per paid skin, same order. Empty leaves the board on its authored art. */
          _initializerDefineProperty(_this, "skinBoardFrames", _descriptor3, _assertThisInitialized(_this));
          /** Gameplay background per paid skin, same order. */
          _initializerDefineProperty(_this, "skinBackgroundFrames", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "particleFrames", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "markSprites", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "sparkleFrames", _descriptor7, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "gemCellFrames", _descriptor8, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "armorGemCellFrames", _descriptor9, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "stuckCellFrame", _descriptor10, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "lineClearBorder", _descriptor11, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "rainbowBorder", _descriptor12, _assertThisInitialized(_this));
          return _this;
        }
        var _proto = SpriteLoader.prototype;
        _proto.register = function register() {
          SpriteLoader._instance = this;
        };
        _proto.getCellSprites = function getCellSprites() {
          return this.cellSprites;
        };
        _proto.getCellSprite = function getCellSprite(index) {
          var _this$cellSprites$ind;
          return (_this$cellSprites$ind = this.cellSprites[index]) != null ? _this$cellSprites$ind : null;
        }

        /**
         * The frame for a cell the player is playing with — tray blocks, the board, the preview. Separate
         * from `getCellSprite` on purpose: `AdventureHud` borrows frame 0 there as a generic rounded
         * square for its chrome and tints it itself, so that path must keep returning the authored cell
         * whatever skin is active.
         */;
        _proto.getPlayCellSprite = function getPlayCellSprite(colorIndex) {
          var _this$getSkinFrame;
          return (_this$getSkinFrame = this.getSkinFrame()) != null ? _this$getSkinFrame : this.getCellSprite(colorIndex);
        };
        _proto.getSkinFrame = function getSkinFrame() {
          return this.frameForActiveSkin(this.skinFrames);
        }

        /** Null on the default skin, or when the array is unwired — callers restore their own art. */;
        _proto.getSkinBoardFrame = function getSkinBoardFrame() {
          return this.frameForActiveSkin(this.skinBoardFrames);
        };
        _proto.getSkinBackgroundFrame = function getSkinBackgroundFrame() {
          return this.frameForActiveSkin(this.skinBackgroundFrames);
        };
        _proto.frameForActiveSkin = function frameForActiveSkin(frames) {
          var _frames$index;
          var index = SKIN_FRAME_INDEX[SkinService.active()];
          return index >= 0 ? (_frames$index = frames[index]) != null ? _frames$index : null : null;
        };
        _proto.getParticleFrame = function getParticleFrame(index) {
          var _this$particleFrames$;
          return (_this$particleFrames$ = this.particleFrames[index]) != null ? _this$particleFrames$ : null;
        };
        _proto.getMarkSprite = function getMarkSprite(type) {
          var _this$markSprites$typ;
          return (_this$markSprites$typ = this.markSprites[type]) != null ? _this$markSprites$typ : null;
        };
        _proto.getGemCellFrame = function getGemCellFrame(type) {
          var _this$gemCellFrames$t;
          return (_this$gemCellFrames$t = this.gemCellFrames[type]) != null ? _this$gemCellFrames$t : null;
        };
        _proto.getArmorGemCellFrame = function getArmorGemCellFrame(type) {
          var _this$armorGemCellFra;
          return (_this$armorGemCellFra = this.armorGemCellFrames[type]) != null ? _this$armorGemCellFra : null;
        }

        /**
         * A gem on a stuck tray block reuses the armor art — the same stone frame around its gem. The
         * two never share a surface (armor is a board cell, stuck is a tray block), so one set covers
         * both and nothing extra needs wiring.
         */;
        _proto.getStuckGemCellFrame = function getStuckGemCellFrame(type) {
          var _this$armorGemCellFra2;
          return (_this$armorGemCellFra2 = this.armorGemCellFrames[type]) != null ? _this$armorGemCellFra2 : null;
        };
        _proto.getStuckCellFrame = function getStuckCellFrame() {
          return this.stuckCellFrame;
        };
        _proto.getSparkleFrame = function getSparkleFrame(index) {
          var _this$sparkleFrames$i;
          return (_this$sparkleFrames$i = this.sparkleFrames[index]) != null ? _this$sparkleFrames$i : null;
        };
        _proto.getLineClearBorder = function getLineClearBorder() {
          return this.lineClearBorder;
        };
        _proto.getRainbowBorder = function getRainbowBorder() {
          return this.rainbowBorder;
        };
        _createClass(SpriteLoader, [{
          key: "sparkleFrameCount",
          get: function get() {
            return this.sparkleFrames.length;
          }
        }, {
          key: "cellCount",
          get: function get() {
            return this.cellSprites.length;
          }
        }], [{
          key: "instance",
          get: function get() {
            return SpriteLoader._instance;
          }
        }]);
        return SpriteLoader;
      }(Component), _class3._instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cellSprites", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "skinFrames", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "skinBoardFrames", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "skinBackgroundFrames", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "particleFrames", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "markSprites", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sparkleFrames", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "gemCellFrames", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "armorGemCellFrames", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "stuckCellFrame", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "lineClearBorder", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "rainbowBorder", [_dec13], {
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

System.register("chunks:///_virtual/TouchRipple.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './SpriteLoader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Color, SpriteFrame, Vec2, Input, randomRangeInt, Node, UITransform, Sprite, tween, randomRange, Component, SpriteLoader;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      SpriteFrame = module.SpriteFrame;
      Vec2 = module.Vec2;
      Input = module.Input;
      randomRangeInt = module.randomRangeInt;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      tween = module.tween;
      randomRange = module.randomRange;
      Component = module.Component;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;
      cclegacy._RF.push({}, "1e928Mg2ARCbpMG+g6J0IM5", "TouchRipple", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var FALLBACK_TINT = new Color(120, 220, 255, 255);
      var GOLD = new Color(255, 216, 120, 255);
      var CUBE_TINTS = [new Color(235, 80, 210, 255), new Color(150, 100, 245, 255), new Color(50, 130, 245, 255), new Color(80, 205, 240, 255), new Color(120, 205, 50, 255), new Color(250, 185, 40, 255), new Color(245, 125, 40, 255), new Color(235, 70, 60, 255)];
      var TOTAL_DURATION = 0.45;
      var HERO_IN = 0.06;
      var BURST_AT = 0.08;
      var HERO_OUT = 0.16;
      var HERO_SCALE = 0.24;
      var HERO_OVERSHOOT = 1.25;
      var GLOW_AUTHORED_PX = 64;
      var GLOW_START_PX = 48;
      var GLOW_END_PX = 96;
      var STAR_SPARKLE_INDEX = 1;
      var SPARKLE_AUTHORED_PX = 32;
      var STAR_LIFE = 0.26;
      var STAR_PX = 136;
      var TWINKLE_COUNT = 7;
      var TWINKLE_PX_MIN = 13;
      var TWINKLE_PX_MAX = 26;
      var TWINKLE_DIST_MIN = 60;
      var TWINKLE_DIST_MAX = 120;
      var TWINKLE_SPIN_MAX = 240;
      var CUBE_COUNT_MIN = 4;
      var CUBE_COUNT_MAX = 6;
      var CUBE_DURATION = 0.45;
      var CUBE_SPEED_MIN = 220;
      var CUBE_SPEED_MAX = 390;
      var CUBE_UP_KICK = 90;
      var CUBE_GRAVITY = 1250;
      var CUBE_SPIN_MAX = 540;
      var CUBE_SCALE_MIN = 0.12;
      var CUBE_SCALE_MAX = 0.18;
      var CUBE_FADE_START = 0.55;
      var DEDUP_MS = 50;
      var DEDUP_DIST_SQ = 16 * 16;
      var MAX_CONCURRENT_BURSTS = 2;
      var TouchRipple = exports('TouchRipple', (_dec = ccclass('TouchRipple'), _dec2 = property([SpriteFrame]), _dec3 = property(SpriteFrame), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TouchRipple, _Component);
        function TouchRipple() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "cubeFrames", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "glowFrame", _descriptor2, _assertThisInitialized(_this));
          _this.ripplePool = [];
          _this.spritePool = [];
          _this.scratch = new Color();
          _this.lastSpawnMs = 0;
          _this.lastSpawnPos = new Vec2();
          return _this;
        }
        var _proto = TouchRipple.prototype;
        _proto.onLoad = function onLoad() {
          var _this$node$parent, _this$node$parent2;
          this.node.setSiblingIndex(-1);
          (_this$node$parent = this.node.parent) == null || _this$node$parent.on(Input.EventType.TOUCH_START, this.onPress, this, true);
          (_this$node$parent2 = this.node.parent) == null || _this$node$parent2.on(Input.EventType.MOUSE_DOWN, this.onPress, this, true);
          while (this.ripplePool.length < MAX_CONCURRENT_BURSTS) this.createRipple();
          var spriteBudget = (2 + TWINKLE_COUNT + CUBE_COUNT_MAX) * MAX_CONCURRENT_BURSTS;
          while (this.spritePool.length < spriteBudget) this.createSprite();
        };
        _proto.onDestroy = function onDestroy() {
          var _this$node$parent3, _this$node$parent4;
          (_this$node$parent3 = this.node.parent) == null || _this$node$parent3.off(Input.EventType.TOUCH_START, this.onPress, this, true);
          (_this$node$parent4 = this.node.parent) == null || _this$node$parent4.off(Input.EventType.MOUSE_DOWN, this.onPress, this, true);
        };
        _proto.onPress = function onPress(event) {
          var loc = event.getUILocation();
          this.spawnRipple(loc.x, loc.y);
        };
        _proto.spawnRipple = function spawnRipple(x, y) {
          var _CUBE_TINTS$leadIdx,
            _SpriteLoader$instanc,
            _this2 = this;
          var now = Date.now();
          var dx = x - this.lastSpawnPos.x;
          var dy = y - this.lastSpawnPos.y;
          if (now - this.lastSpawnMs < DEDUP_MS && dx * dx + dy * dy < DEDUP_DIST_SQ) return;
          this.lastSpawnMs = now;
          this.lastSpawnPos.set(x, y);
          var leadIdx = this.cubeFrames.length ? randomRangeInt(0, this.cubeFrames.length) : -1;
          var glowColor = (_CUBE_TINTS$leadIdx = CUBE_TINTS[leadIdx]) != null ? _CUBE_TINTS$leadIdx : FALLBACK_TINT;
          var ripple = this.getRipple();
          if (ripple) {
            ripple.node.setWorldPosition(x, y, 0);
            this.animate(ripple, glowColor);
          }
          if (leadIdx >= 0) this.animateHero(x, y, leadIdx);
          var starFrame = (_SpriteLoader$instanc = SpriteLoader.instance) == null ? void 0 : _SpriteLoader$instanc.getSparkleFrame(STAR_SPARKLE_INDEX);
          this.scheduleOnce(function () {
            _this2.spawnCubes(x, y);
            if (starFrame) {
              _this2.animateStar(x, y, starFrame);
              _this2.spawnTwinkles(x, y, starFrame);
            }
          }, BURST_AT);
        };
        _proto.getRipple = function getRipple() {
          var found = this.ripplePool.find(function (r) {
            return !r.node.active;
          });
          if (found) {
            found.node.active = true;
            return found;
          }
          return null;
        };
        _proto.createRipple = function createRipple() {
          var node = new Node('Ripple');
          node.active = false;
          node.layer = this.node.layer;
          var ui = node.addComponent(UITransform);
          ui.setAnchorPoint(0.5, 0.5);
          ui.setContentSize(GLOW_AUTHORED_PX, GLOW_AUTHORED_PX);
          var sprite = node.addComponent(Sprite);
          sprite.spriteFrame = this.glowFrame;
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          node.parent = this.node;
          this.ripplePool.push({
            node: node,
            sprite: sprite,
            ui: ui
          });
        };
        _proto.animate = function animate(ripple, glow) {
          var _this3 = this;
          var state = {
            t: 0
          };
          var step = function step() {
            var scale = (GLOW_START_PX + (GLOW_END_PX - GLOW_START_PX) * state.t) / GLOW_AUTHORED_PX;
            ripple.node.setScale(scale, scale, 1);
            ripple.sprite.color = _this3.scratch.set(glow.r, glow.g, glow.b, (1 - state.t) * 180);
          };
          step();
          tween(state).to(TOTAL_DURATION, {
            t: 1
          }, {
            onUpdate: step
          }).call(function () {
            return _this3.release(ripple);
          }).start();
        };
        _proto.release = function release(_ref) {
          var node = _ref.node;
          node.active = false;
        };
        _proto.animateHero = function animateHero(x, y, frameIdx) {
          var _this4 = this;
          var hero = this.getSprite();
          if (!hero) return;
          hero.sprite.spriteFrame = this.cubeFrames[frameIdx];
          hero.sprite.sizeMode = Sprite.SizeMode.TRIMMED;
          hero.node.setWorldPosition(x, y, 0);
          hero.node.angle = randomRange(-12, 12);
          var state = {
            t: 0
          };
          var step = function step() {
            var s = state.t * HERO_OUT;
            if (s < HERO_IN) {
              var k = s / HERO_IN;
              var pop = (1 - Math.pow(1 - k, 2)) * HERO_OVERSHOOT;
              hero.node.setScale(HERO_SCALE * pop, HERO_SCALE * pop, 1);
              hero.sprite.color = _this4.scratch.set(255, 255, 255, 255);
            } else {
              var u = (s - HERO_IN) / (HERO_OUT - HERO_IN);
              var blow = HERO_SCALE * HERO_OVERSHOOT * (1 + 0.35 * u);
              hero.node.setScale(blow, blow, 1);
              hero.sprite.color = _this4.scratch.set(255, 255, 255, (1 - u) * 255);
            }
          };
          step();
          tween(state).to(HERO_OUT, {
            t: 1
          }, {
            onUpdate: step
          }).call(function () {
            hero.node.active = false;
          }).start();
        };
        _proto.animateStar = function animateStar(x, y, frame) {
          var _this5 = this;
          var star = this.getSprite();
          if (!star) return;
          star.sprite.spriteFrame = frame;
          star.sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          star.ui.setContentSize(SPARKLE_AUTHORED_PX, SPARKLE_AUTHORED_PX);
          star.node.setWorldPosition(x, y, 0);
          var maxScale = STAR_PX / SPARKLE_AUTHORED_PX;
          var state = {
            t: 0
          };
          var step = function step() {
            var u = state.t;
            var grow = 1 - Math.pow(1 - u, 2);
            star.node.setScale(maxScale * grow, maxScale * grow, 1);
            star.node.angle = 35 * u;
            star.sprite.color = _this5.scratch.set(GOLD.r, GOLD.g, GOLD.b, (1 - u) * 255);
          };
          step();
          tween(state).to(STAR_LIFE, {
            t: 1
          }, {
            onUpdate: step
          }).call(function () {
            star.node.active = false;
          }).start();
        };
        _proto.spawnTwinkles = function spawnTwinkles(x, y, frame) {
          var _this6 = this;
          var life = TOTAL_DURATION - BURST_AT;
          var _loop = function _loop() {
              var tw = _this6.getSprite();
              if (!tw) return {
                v: void 0
              };
              tw.sprite.spriteFrame = frame;
              tw.sprite.sizeMode = Sprite.SizeMode.CUSTOM;
              tw.ui.setContentSize(SPARKLE_AUTHORED_PX, SPARKLE_AUTHORED_PX);
              var angle = (i + randomRange(-0.3, 0.3)) / TWINKLE_COUNT * Math.PI * 2;
              var dist = randomRange(TWINKLE_DIST_MIN, TWINKLE_DIST_MAX);
              var scale = randomRange(TWINKLE_PX_MIN, TWINKLE_PX_MAX) / SPARKLE_AUTHORED_PX;
              var spin = randomRange(-TWINKLE_SPIN_MAX, TWINKLE_SPIN_MAX);
              var phase = randomRange(0, Math.PI * 2);
              var tint = i % 2 === 0 ? GOLD : Color.WHITE;
              var state = {
                t: 0
              };
              var step = function step() {
                var u = state.t;
                var move = 1 - Math.pow(1 - u, 3);
                tw.node.setWorldPosition(x + Math.cos(angle) * dist * move, y + Math.sin(angle) * dist * move, 0);
                tw.node.angle = spin * u;
                var size = scale * (1 - u * 0.5);
                tw.node.setScale(size, size, 1);
                var flicker = 0.55 + 0.45 * Math.sin(u * 18 + phase);
                tw.sprite.color = _this6.scratch.set(tint.r, tint.g, tint.b, (1 - u) * flicker * 255);
              };
              step();
              tween(state).to(life, {
                t: 1
              }, {
                onUpdate: step
              }).call(function () {
                tw.node.active = false;
              }).start();
            },
            _ret;
          for (var i = 0; i < TWINKLE_COUNT; i++) {
            _ret = _loop();
            if (_ret) return _ret.v;
          }
        };
        _proto.spawnCubes = function spawnCubes(x, y) {
          if (!this.cubeFrames.length) return;
          var count = randomRangeInt(CUBE_COUNT_MIN, CUBE_COUNT_MAX + 1);
          for (var i = 0; i < count; i++) {
            var frameIdx = randomRangeInt(0, this.cubeFrames.length);
            var angle = (i + randomRange(-0.3, 0.3)) / count * Math.PI * 2;
            var cube = this.getSprite();
            if (!cube) return;
            this.animateCube(cube, x, y, frameIdx, angle);
          }
        };
        _proto.getSprite = function getSprite() {
          var found = this.spritePool.find(function (c) {
            return !c.node.active;
          });
          if (found) {
            found.node.active = true;
            return found;
          }
          return null;
        };
        _proto.createSprite = function createSprite() {
          var node = new Node('RippleSprite');
          node.active = false;
          node.layer = this.node.layer;
          var ui = node.addComponent(UITransform);
          ui.setAnchorPoint(0.5, 0.5);
          var sprite = node.addComponent(Sprite);
          node.parent = this.node;
          this.spritePool.push({
            node: node,
            sprite: sprite,
            ui: ui
          });
        };
        _proto.animateCube = function animateCube(cube, originX, originY, frameIdx, angle) {
          var _this7 = this;
          cube.sprite.spriteFrame = this.cubeFrames[frameIdx];
          cube.sprite.sizeMode = Sprite.SizeMode.TRIMMED;
          var speed = randomRange(CUBE_SPEED_MIN, CUBE_SPEED_MAX);
          var vx = Math.cos(angle) * speed;
          var vy = Math.sin(angle) * speed + CUBE_UP_KICK;
          var spin = randomRange(-CUBE_SPIN_MAX, CUBE_SPIN_MAX);
          var size = randomRange(CUBE_SCALE_MIN, CUBE_SCALE_MAX);
          cube.node.setWorldPosition(originX, originY, 0);
          var state = {
            t: 0
          };
          var step = function step() {
            var t = state.t;
            var s = t * CUBE_DURATION;
            cube.node.setWorldPosition(originX + vx * s, originY + vy * s - 0.5 * CUBE_GRAVITY * s * s, 0);
            cube.node.angle = spin * s;
            var grow = t < 0.2 ? 0.55 + 2.25 * t : 1 - 0.45 * ((t - 0.2) / 0.8);
            cube.node.setScale(size * grow, size * grow, 1);
            var fade = t < CUBE_FADE_START ? 1 : 1 - (t - CUBE_FADE_START) / (1 - CUBE_FADE_START);
            cube.sprite.color = _this7.scratch.set(255, 255, 255, fade * 255);
          };
          step();
          tween(state).to(CUBE_DURATION, {
            t: 1
          }, {
            onUpdate: step
          }).call(function () {
            cube.node.active = false;
          }).start();
        };
        return TouchRipple;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cubeFrames", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "glowFrame", [_dec3], {
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

System.register("chunks:///_virtual/TournamentMode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './AudioManager.ts', './TournamentRoster.ts', './GameEvents.ts', './DataManager.ts', './TournamentProgressService.ts', './ScreenManager.ts'], function (exports) {
  var _asyncToGenerator, _regeneratorRuntime, cclegacy, AudioManager, SFX, TournamentRoster, ScreenNames, DataManager, TournamentProgressService, ScreenManager;
  return {
    setters: [function (module) {
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      AudioManager = module.AudioManager;
      SFX = module.SFX;
    }, function (module) {
      TournamentRoster = module.TournamentRoster;
    }, function (module) {
      ScreenNames = module.ScreenNames;
    }, function (module) {
      DataManager = module.DataManager;
    }, function (module) {
      TournamentProgressService = module.default;
    }, function (module) {
      ScreenManager = module.ScreenManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "a97f8IkHvJB2L8izYmbMqyn", "TournamentMode", undefined);
      var TournamentMode = exports('TournamentMode', /*#__PURE__*/function () {
        function TournamentMode(gm) {
          this.gm = void 0;
          this.opponent = null;
          this.submitted = false;
          this.winScreenOpen = false;
          this.beaten = 0;
          this.gm = gm;
        }
        var _proto = TournamentMode.prototype;
        _proto.getLevel = function getLevel() {
          return null;
        };
        _proto.setup = function setup() {
          var _screen$getAdventureH, _screen$getBestScoreU, _window$GameSDK$getPl, _window$GameSDK;
          this.gm.getScoreLogic().setLineScoreOverride(null);
          var screen = this.gm.getGameScreen();
          (_screen$getAdventureH = screen.getAdventureHud()) == null || _screen$getAdventureH.hide();
          screen.getScoreUI().node.active = false;
          (_screen$getBestScoreU = screen.getBestScoreUI()) == null || _screen$getBestScoreU.setVisible(false);
          this.submitted = false;
          this.winScreenOpen = false;
          this.beaten = 0;
          this.opponent = TournamentRoster.firstOpponent();
          var hud = screen.getVersusHud();
          hud == null || hud.show((_window$GameSDK$getPl = (_window$GameSDK = window.GameSDK) == null ? void 0 : _window$GameSDK.getPlayerProfile().photoUrl) != null ? _window$GameSDK$getPl : null);
          hud == null || hud.setOpponent(this.opponent);
        };
        _proto.playIntroAsync = function playIntroAsync() {
          var _this$gm$getGameScree, _this$gm$getGameScree2;
          return (_this$gm$getGameScree = (_this$gm$getGameScree2 = this.gm.getGameScreen().getVersusHud()) == null ? void 0 : _this$gm$getGameScree2.playIntroAsync()) != null ? _this$gm$getGameScree : Promise.resolve();
        };
        _proto.onBlockPlaced = function onBlockPlaced() {
          this.pushScore();
        };
        _proto.onTurnCleared = function onTurnCleared() {
          this.pushScore();
          this.checkDefeat();
        };
        _proto.checkWin = function checkWin() {
          return false;
        };
        _proto.checkLose = function checkLose() {
          return false;
        };
        _proto.onWin = function onWin() {};
        _proto.onGameOver = function onGameOver() {
          var _AudioManager$instanc;
          var total = this.gm.getScoreLogic().getTotal();
          var isNewBest = total > DataManager.getPlayerData('bestScore');
          if (isNewBest) DataManager.setPlayerData('bestScore', total);
          (_AudioManager$instanc = AudioManager.instance) == null || _AudioManager$instanc.play(isNewBest ? SFX.NEW_BEST : SFX.GAME_OVER);
          this.finishRun(total);
        };
        _proto.onExitRun = function onExitRun() {
          var total = this.gm.getScoreLogic().getTotal();
          if (total > DataManager.getPlayerData('bestScore')) {
            DataManager.setPlayerData('bestScore', total);
          }
          this.finishRun(total);
        };
        _proto.pushScore = function pushScore() {
          var _this$gm$getGameScree3;
          (_this$gm$getGameScree3 = this.gm.getGameScreen().getVersusHud()) == null || _this$gm$getGameScree3.setPlayerScore(this.gm.getScoreLogic().getTotal());
        };
        _proto.checkDefeat = function checkDefeat() {
          var _this$gm$getGameScree4,
            _AudioManager$instanc2,
            _window$GameSDK2,
            _this = this;
          if (this.winScreenOpen || !this.opponent) return;
          var total = this.gm.getScoreLogic().getTotal();
          if (total <= this.opponent.score) return;
          var beatenOpponent = this.opponent;
          this.winScreenOpen = true;
          this.beaten++;
          var next = TournamentRoster.nextOpponent(total, this.beaten);
          (_this$gm$getGameScree4 = this.gm.getGameScreen().getVersusHud()) == null || _this$gm$getGameScree4.setInputBlocked(true);
          this.gm.getBlockLogic().lockAll();
          (_AudioManager$instanc2 = AudioManager.instance) == null || _AudioManager$instanc2.play(SFX.NEW_BEST);
          (_window$GameSDK2 = window.GameSDK) == null || _window$GameSDK2.logEvent('tournament_rank_up', beatenOpponent.score);
          ScreenManager.instance.openScreenAsync(ScreenNames.TOURNAMENT_WIN_SCREEN, {
            beatenName: beatenOpponent.name,
            beatenScore: beatenOpponent.score,
            beatenPhotoUrl: beatenOpponent.photoUrl,
            beatenAvatarIndex: beatenOpponent.avatarIndex,
            isChampion: next === null,
            onContinue: function onContinue() {
              return _this.advance(next);
            }
          });
        };
        _proto.advance = /*#__PURE__*/function () {
          var _advance = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(next) {
            var hud;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  this.winScreenOpen = false;
                  this.opponent = next;
                  hud = this.gm.getGameScreen().getVersusHud();
                  if (next) {
                    _context.next = 8;
                    break;
                  }
                  hud == null || hud.setChampion();
                  hud == null || hud.setInputBlocked(false);
                  this.gm.getBlockLogic().unlockAll();
                  return _context.abrupt("return");
                case 8:
                  _context.next = 10;
                  return hud == null ? void 0 : hud.playSwapAsync(next);
                case 10:
                  this.gm.getBlockLogic().unlockAll();
                  this.checkDefeat();
                case 12:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function advance(_x) {
            return _advance.apply(this, arguments);
          }
          return advance;
        }();
        _proto.finishRun = function finishRun(total) {
          TournamentProgressService.tryUpdateScore(total);
          this.gm.getBlockLogic().lockAll();
          if (this.winScreenOpen) {
            this.winScreenOpen = false;
            ScreenManager.instance.closeScreenAsync(ScreenNames.TOURNAMENT_WIN_SCREEN);
          }
          this.submitScore(total);
          ScreenManager.instance.openScreenAsync(ScreenNames.LEADERBOARD_SCREEN, {
            framing: 'result',
            score: total
          });
        };
        _proto.submitScore = function submitScore(total) {
          if (this.submitted || total <= 0) return;
          this.submitted = true;
          TournamentRoster.trackSubmit(this.performSubmitAsync(total));
        };
        _proto.performSubmitAsync = /*#__PURE__*/function () {
          var _performSubmitAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(total) {
            var sdk, entry;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  sdk = window.GameSDK;
                  if (sdk) {
                    _context2.next = 3;
                    break;
                  }
                  return _context2.abrupt("return");
                case 3:
                  _context2.next = 5;
                  return sdk.submitLeaderboardScoreAsync(total);
                case 5:
                  entry = _context2.sent;
                  if (entry) TournamentRoster.applySubmitResult(entry);
                  _context2.next = 9;
                  return sdk.postTournamentScoreAsync(total);
                case 9:
                  sdk.logEvent('tournament_run_end', total);
                case 10:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }));
          function performSubmitAsync(_x2) {
            return _performSubmitAsync.apply(this, arguments);
          }
          return performSubmitAsync;
        }();
        return TournamentMode;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TournamentNpcs.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "78062h8F9BDxpmc0GQB/52Q", "TournamentNpcs", undefined);
      // Reaches below the weakest NPC so the opening opponent is always the bottom rung; the ladder
      // starts at NPC_MIN_SCORE and the next rung is a full step above it.
      var FIRST_OPPONENT_MIN = exports('FIRST_OPPONENT_MIN', 900);
      var FIRST_OPPONENT_MAX = exports('FIRST_OPPONENT_MAX', 1600);
      /**
       * Added to the bar for every opponent already beaten this run, so the second rung sits ~1000
       * above the player, the third ~2000, and so on — a climb that gets steeper instead of flat.
       */
      var NEXT_GAP_STEP = exports('NEXT_GAP_STEP', 1000);
      var NPC_MIN_SCORE = exports('NPC_MIN_SCORE', 999);
      var NPC_MAX_SCORE = exports('NPC_MAX_SCORE', 150000);

      // TournamentWinScreen.npcAvatarFrames holds this many frames, so avatarIndex cycles rather than
      // running off the end and falling back to the placeholder for most of the ladder.
      var NPC_AVATAR_VARIANTS = exports('NPC_AVATAR_VARIANTS', 11);
      var NPC_NAMES = ['Blocky', 'Pixel', 'Slate', 'Rocko', 'Tetra', 'Chip', 'Dot', 'Nibble', 'Patch', 'Scrap', 'Bolt', 'Wedge', 'Prism', 'Quirk', 'Fizz', 'Gizmo', 'Widget', 'Cobble', 'Pebble', 'Flint', 'Ember', 'Cinder', 'Ash', 'Soot', 'Smolder', 'Kindle', 'Blaze', 'Torch', 'Beacon', 'Lantern', 'Glimmer', 'Shimmer', 'Sparkle', 'Glint', 'Gleam', 'Radiant', 'Lumen', 'Lux', 'Aurora', 'Zenith', 'Crusher', 'Grinder', 'Masher', 'Breaker', 'Smasher', 'Wrecker', 'Ripper', 'Shredder', 'Crusader', 'Warden', 'Sentry', 'Guardian', 'Bastion', 'Rampart', 'Citadel', 'Fortress', 'Keystone', 'Obelisk', 'Monolith', 'Megalith', 'Magnus', 'Vertex', 'Apex', 'Summit', 'Pinnacle', 'Crest', 'Ridge', 'Peak', 'Spire', 'Tower', 'Titan', 'Colossus', 'Goliath', 'Behemoth', 'Leviathan', 'Juggernaut', 'Onslaught', 'Rampage', 'Havoc', 'Chaos', 'Nova', 'Supernova', 'Pulsar', 'Quasar', 'Nebula', 'Comet', 'Meteor', 'Eclipse', 'Solstice', 'Equinox', 'Orion', 'Vega', 'Sirius', 'Rigel', 'Altair', 'Antares', 'Polaris', 'Andromeda', 'Celestia', 'Omega'];
      var NPC_COUNT = exports('NPC_COUNT', NPC_NAMES.length);

      // The rung spacing widens gently up the ladder, but every gap stays inside 1000-2000 points so no
      // two opponents feel interchangeable and no single climb ever stalls.
      var NPC_MIN_GAP = 1050;
      var NPC_MAX_GAP = 1960;

      /**
       * Gaps are a linear ramp scaled to land exactly on NPC_MAX_SCORE, so the endpoints stay pinned
       * however the ramp is retuned.
       */
      function ladderScores() {
        var gaps = [];
        for (var i = 0; i < NPC_COUNT - 1; i++) {
          var t = i / (NPC_COUNT - 2);
          gaps.push(NPC_MIN_GAP + (NPC_MAX_GAP - NPC_MIN_GAP) * t);
        }
        var ramp = gaps.reduce(function (sum, gap) {
          return sum + gap;
        }, 0);
        var span = NPC_MAX_SCORE - NPC_MIN_SCORE;
        var scores = [NPC_MIN_SCORE];
        var climbed = 0;
        for (var _i = 0, _gaps = gaps; _i < _gaps.length; _i++) {
          var gap = _gaps[_i];
          climbed += gap;
          scores.push(Math.round(NPC_MIN_SCORE + span * climbed / ramp));
        }
        return scores;
      }
      var LADDER = ladderScores();
      var NPC_OPPONENTS = exports('NPC_OPPONENTS', NPC_NAMES.map(function (name, i) {
        return {
          id: "npc-" + i,
          name: name,
          photoUrl: null,
          score: LADDER[i],
          rank: null,
          isNpc: true,
          avatarIndex: i % NPC_AVATAR_VARIANTS
        };
      }));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TournamentProgressService.ts", ['cc'], function (exports) {
  var cclegacy, sys;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }],
    execute: function () {
      cclegacy._RF.push({}, "3159ajLT0dFBKWsxnamfnCT", "TournamentProgressService", undefined);
      var SCORE_KEY = 'blockscraft_tournament_score';
      var TournamentProgressService = exports('default', /*#__PURE__*/function () {
        function TournamentProgressService() {}
        TournamentProgressService.getScore = function getScore() {
          var saved = sys.localStorage.getItem(SCORE_KEY);
          var value = saved ? Number.parseInt(saved, 10) : Number.NaN;
          return Number.isFinite(value) && value > 0 ? value : 0;
        };
        TournamentProgressService.tryUpdateScore = function tryUpdateScore(score) {
          if (score > TournamentProgressService.getScore()) {
            sys.localStorage.setItem(SCORE_KEY, "" + Math.floor(score));
            return true;
          }
          return false;
        };
        return TournamentProgressService;
      }());
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TournamentRoster.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TournamentProgressService.ts', './TournamentNpcs.ts'], function (exports) {
  var _extends, _asyncToGenerator, _regeneratorRuntime, _createForOfIteratorHelperLoose, cclegacy, TournamentProgressService, NPC_OPPONENTS, FIRST_OPPONENT_MAX, FIRST_OPPONENT_MIN, NEXT_GAP_STEP;
  return {
    setters: [function (module) {
      _extends = module.extends;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      TournamentProgressService = module.default;
    }, function (module) {
      NPC_OPPONENTS = module.NPC_OPPONENTS;
      FIRST_OPPONENT_MAX = module.FIRST_OPPONENT_MAX;
      FIRST_OPPONENT_MIN = module.FIRST_OPPONENT_MIN;
      NEXT_GAP_STEP = module.NEXT_GAP_STEP;
    }],
    execute: function () {
      cclegacy._RF.push({}, "5879ejFCX1N/JHbCcTOEWNI", "TournamentRoster", undefined);
      var TOP_FETCH_COUNT = 10;
      var WINDOW_FETCH_COUNT = 30;
      var loadPromise = null;
      var playerEntry = null;
      var opponents = withSyntheticRanks(NPC_OPPONENTS.map(function (n) {
        return _extends({}, n);
      }));
      var submitPromise = null;
      function defaultSource() {
        return typeof window !== 'undefined' ? window.GameSDK : undefined;
      }
      function toOpponent(e) {
        return {
          id: e.playerId,
          name: e.name,
          photoUrl: e.photoUrl,
          score: e.score,
          rank: e.rank,
          isNpc: false,
          avatarIndex: -1
        };
      }
      function withSyntheticRanks(ascending) {
        var desc = [].concat(ascending).reverse();
        desc.forEach(function (opp, i) {
          var _assigned;
          if (!opp.isNpc) return;
          var assigned = null;
          for (var j = i + 1; j < desc.length; j++) {
            var real = desc[j];
            if (!real.isNpc && real.rank !== null) {
              assigned = real.rank - (j - i);
              break;
            }
          }
          if (assigned === null) {
            for (var _j = i - 1; _j >= 0; _j--) {
              var _real = desc[_j];
              if (!_real.isNpc && _real.rank !== null) {
                assigned = _real.rank + (i - _j);
                break;
              }
            }
          }
          opp.rank = Math.max(1, (_assigned = assigned) != null ? _assigned : i + 1);
        });
        return ascending;
      }
      function rebuild(real, player) {
        playerEntry = player;
        var seen = new Set();
        var merged = [];
        for (var _iterator = _createForOfIteratorHelperLoose(real), _step; !(_step = _iterator()).done;) {
          var e = _step.value;
          if (seen.has(e.playerId)) continue;
          if (player && e.playerId === player.playerId) continue;
          seen.add(e.playerId);
          merged.push(toOpponent(e));
        }
        merged.push.apply(merged, NPC_OPPONENTS.map(function (n) {
          return _extends({}, n);
        }));
        merged.sort(function (a, b) {
          return a.score - b.score;
        });
        opponents = withSyntheticRanks(merged);
      }
      function doLoad(_x) {
        return _doLoad.apply(this, arguments);
      }
      function _doLoad() {
        _doLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(source) {
          var player, top, windowAbove;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (source) {
                  _context.next = 3;
                  break;
                }
                rebuild([], null);
                return _context.abrupt("return");
              case 3:
                _context.next = 5;
                return source.getLeaderboardPlayerEntryAsync();
              case 5:
                player = _context.sent;
                _context.next = 8;
                return source.getLeaderboardEntriesAsync(TOP_FETCH_COUNT, 0);
              case 8:
                top = _context.sent;
                windowAbove = [];
                if (!(player && player.rank > TOP_FETCH_COUNT)) {
                  _context.next = 14;
                  break;
                }
                _context.next = 13;
                return source.getLeaderboardEntriesAsync(WINDOW_FETCH_COUNT, Math.max(0, player.rank - WINDOW_FETCH_COUNT - 1));
              case 13:
                windowAbove = _context.sent;
              case 14:
                rebuild([].concat(top, windowAbove), player);
              case 15:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return _doLoad.apply(this, arguments);
      }
      function pickInBand(min, max) {
        var _opponents$find;
        return (_opponents$find = opponents.find(function (o) {
          return o.score >= min && o.score <= max;
        })) != null ? _opponents$find : null;
      }
      function _rankForScore(score) {
        if (score <= 0) return null;
        return opponents.filter(function (o) {
          return o.score > score;
        }).length + 1;
      }

      /**
       * The local best outranks the last submitted entry, and stands in for it entirely when the
       * platform has no leaderboard: the podium and the rank must agree on this one number, or the
       * player is told they placed while the board still shows only opponents.
       */
      function playerStanding() {
        var _playerEntry$score, _playerEntry;
        return Math.max(TournamentProgressService.getScore(), (_playerEntry$score = (_playerEntry = playerEntry) == null ? void 0 : _playerEntry.score) != null ? _playerEntry$score : 0);
      }
      function buildPlayerRow(score) {
        var base = playerEntry ? toOpponent(playerEntry) : {
          id: 'player',
          name: 'You',
          photoUrl: null,
          score: score,
          rank: null,
          isNpc: false,
          avatarIndex: -1
        };
        return _extends({}, base, {
          score: score,
          isPlayer: true
        });
      }
      function playerRow() {
        var score = playerStanding();
        if (score <= 0) return null;
        return buildPlayerRow(score);
      }
      function opponentRows() {
        return opponents.map(function (o) {
          return _extends({}, o, {
            isPlayer: false
          });
        });
      }

      // rankForScore counts only opponents strictly above, so a tie has to seat the player first or the
      // row index and the reported rank disagree.
      function byScoreThenPlayer(a, b) {
        if (a.score !== b.score) return b.score - a.score;
        if (a.isPlayer === b.isPlayer) return 0;
        return a.isPlayer ? -1 : 1;
      }
      var TournamentRoster = exports('TournamentRoster', {
        loadOnceAsync: function loadOnceAsync(source) {
          if (!loadPromise) loadPromise = doLoad(source != null ? source : defaultSource());
          return loadPromise;
        },
        firstOpponent: function firstOpponent() {
          var _pickInBand;
          // opponents is ascending, so the fallback is the weakest rung — taking the last entry
          // would open the run against the champion.
          return (_pickInBand = pickInBand(FIRST_OPPONENT_MIN, FIRST_OPPONENT_MAX)) != null ? _pickInBand : opponents[0];
        },
        /**
         * The rung to climb to after `beaten` wins this run. `opponents` is ascending, so this takes
         * the cheapest rung clearing the bar. The fallback keeps the top of the ladder reachable: once
         * the bar overshoots NPC_MAX_SCORE, a player below the champion must still be offered them
         * rather than handed the crown.
         */
        nextOpponent: function nextOpponent(currentScore, beaten) {
          var _ref, _opponents$find2;
          var bar = currentScore + beaten * NEXT_GAP_STEP;
          return (_ref = (_opponents$find2 = opponents.find(function (o) {
            return o.score >= bar;
          })) != null ? _opponents$find2 : opponents.find(function (o) {
            return o.score > currentScore;
          })) != null ? _ref : null;
        },
        getDisplayTop: function getDisplayTop(n) {
          var rows = opponentRows();
          var player = playerRow();
          if (player) rows.push(player);
          rows.sort(byScoreThenPlayer);
          return rows.slice(0, n);
        },
        // Unlike getDisplayTop, this always carries a player row: the scroll list snaps to it, so a
        // player who has never scored still needs a seat at the bottom.
        getAllRows: function getAllRows(playerScoreOverride) {
          var score = Math.max(0, playerScoreOverride != null ? playerScoreOverride : playerStanding());
          var rows = opponentRows();
          rows.push(buildPlayerRow(score));
          rows.sort(byScoreThenPlayer);
          return rows;
        },
        getPlayerEntry: function getPlayerEntry() {
          return playerEntry;
        },
        getPlayerRank: function getPlayerRank() {
          return _rankForScore(playerStanding());
        },
        rankForScore: function rankForScore(score) {
          return _rankForScore(score);
        },
        applySubmitResult: function applySubmitResult(entry) {
          playerEntry = entry;
        },
        trackSubmit: function trackSubmit(p) {
          submitPromise = p["catch"](function () {
            return undefined;
          });
        },
        whenSubmitSettled: function whenSubmitSettled() {
          var _submitPromise;
          return (_submitPromise = submitPromise) != null ? _submitPromise : Promise.resolve();
        },
        resetForTests: function resetForTests() {
          loadPromise = null;
          playerEntry = null;
          submitPromise = null;
          opponents = withSyntheticRanks(NPC_OPPONENTS.map(function (n) {
            return _extends({}, n);
          }));
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TransitionLayer.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './PageTurnTransition.ts', './PageTurnGeometry.ts', './SpriteLoader.ts'], function (exports) {
  var _inheritsLoose, _createClass, _asyncToGenerator, _regeneratorRuntime, cclegacy, _decorator, view, Node, UITransform, Sprite, Component, Widget, CELL_SIZE, PageTurnTransition, riseDuration, riseTraveled, waveMaskPolygon, SpriteLoader;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createClass = module.createClass;
      _asyncToGenerator = module.asyncToGenerator;
      _regeneratorRuntime = module.regeneratorRuntime;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      view = module.view;
      Node = module.Node;
      UITransform = module.UITransform;
      Sprite = module.Sprite;
      Component = module.Component;
      Widget = module.Widget;
    }, function (module) {
      CELL_SIZE = module.CELL_SIZE;
    }, function (module) {
      PageTurnTransition = module.PageTurnTransition;
    }, function (module) {
      riseDuration = module.riseDuration;
      riseTraveled = module.riseTraveled;
      waveMaskPolygon = module.waveMaskPolygon;
    }, function (module) {
      SpriteLoader = module.SpriteLoader;
    }],
    execute: function () {
      var _dec, _class, _class2;
      cclegacy._RF.push({}, "eb979j9UU9D/LdxfJtT1rjd", "TransitionLayer", undefined);
      var ccclass = _decorator.ccclass;

      /** Extra travel past both screen edges so cells enter and exit fully off-screen. */
      var SWEEP_MARGIN = CELL_SIZE * 3;
      /**
       * How far the mask front sits below each cell's center — inside the cell, so the departing
       * screen's cut edge hides under the block instead of showing as a bare seam.
       */
      var MASK_LAG = CELL_SIZE * 0.35;
      /** Launch speed of every block, px/s — the master speed control. */
      var LAUNCH_SPEED = 5400;
      /** Seconds between neighboring launches, right to left — the whip's delay spread. */
      var LAUNCH_INTERVAL = 0.033;
      /**
       * Brake of the leading (rightmost) block: 1 = decelerates to a standstill exactly at the top
       * (taking twice the unbraked time), 0 = constant speed. Braked blocks genuinely arrive later.
       */
      var BRAKE_LEAD = 0.95;
      /** Brake left for the trailing (leftmost) block — the braking fades across the row. */
      var BRAKE_TAIL = 0.1;
      /**
       * Wall-clock length of one turn, seconds. Fixed rather than taken from the motion's natural
       * span, which grows with both screen width (more blocks to stagger) and height (longer rise) —
       * a 2560-wide desktop ran ~1.1s against portrait's ~0.9s. The span still normalizes the curve,
       * so the shape is unchanged and only its playback rate is pinned.
       */
      var TURN_DURATION = 0.9;
      /**
       * Fraction of the turn at which `onReveal` fires. By here the wavefront has uncovered enough of
       * the incoming screen that its own intro reads as part of the reveal rather than a sequel to it.
       */
      var REVEAL_HANDOFF = 0.45;

      /**
       * Full-screen node above every screen: owns the block row riding the page-turn's curved
       * wavefront and (via BlockInputEvents on the same node) shields all input while a turn runs.
       * Active only during the sweep.
       */
      var TransitionLayer = exports('TransitionLayer', (_dec = ccclass('TransitionLayer'), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TransitionLayer, _Component);
        function TransitionLayer() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.turn = new PageTurnTransition();
          _this.line = null;
          _this.cells = [];
          /** Bumped on every play/stop so a superseded turn's continuation can't hide a newer one. */
          _this.playGen = 0;
          return _this;
        }
        var _proto = TransitionLayer.prototype;
        _proto.__preload = function __preload() {
          TransitionLayer._instance = this;
          // Warm the cell pool while the scene loads: the node is inactive between turns, so a
          // lazily built row would materialize mid-frame on the first play.
          this.buildLine(view.getVisibleSize().width);
          this.node.active = false;
        };
        _proto.onDestroy = function onDestroy() {
          if (TransitionLayer._instance === this) {
            TransitionLayer._instance = null;
          }
          this.turn.stop();
        }

        /**
         * Erodes `target` bottom-up behind a right-to-left whip of rising blocks, revealing
         * whatever is underneath. Resolves when the sweep completes (or is stopped); the target
         * node ends deactivated.
         *
         * `onReveal` fires once partway through — see REVEAL_HANDOFF. It is guaranteed to fire
         * exactly once even when the turn cannot play, so a caller may gate real work on it.
         */;
        _proto.playPageTurn = /*#__PURE__*/
        function () {
          var _playPageTurn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(target, onReveal) {
            var _this$getComponent,
              _this2 = this;
            var revealed, reveal, ui, gen, parent, _ui$contentSize, width, height, count, yStart, yEnd, dist, starts, brakes, span, i, rank, fade, xs, fronts, frame;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  revealed = false;
                  reveal = function reveal() {
                    if (revealed) return;
                    revealed = true;
                    onReveal == null || onReveal();
                  };
                  ui = this.getComponent(UITransform);
                  if (ui) {
                    _context.next = 6;
                    break;
                  }
                  reveal();
                  return _context.abrupt("return");
                case 6:
                  this.turn.stop();
                  gen = ++this.playGen;
                  this.node.active = true;
                  // ScreenManager appends every lazily loaded screen after this layer, so it has to retake
                  // the last sibling slot each turn. A departing screen built after it draws over the block
                  // row instead of under it, leaving only the sliver above the mask front visible.
                  parent = this.node.parent;
                  if (parent) this.node.setSiblingIndex(parent.children.length - 1);
                  // The node is inactive between turns, so the Widget has never aligned on the first
                  // play — force it before measuring, or the row is sized from the editor's stale size.
                  (_this$getComponent = this.getComponent(Widget)) == null || _this$getComponent.updateAlignment();
                  _ui$contentSize = ui.contentSize, width = _ui$contentSize.width, height = _ui$contentSize.height;
                  count = this.buildLine(width);
                  yStart = -(height / 2 + SWEEP_MARGIN);
                  yEnd = height / 2 + SWEEP_MARGIN;
                  dist = yEnd - yStart; // Rank counts down from the right end so the rightmost cell launches first; the run
                  // lasts until the slowest cell lands, so the total duration derives from the knobs.
                  starts = [];
                  brakes = [];
                  span = 0;
                  for (i = 0; i < count; i++) {
                    rank = count - 1 - i;
                    fade = count > 1 ? rank / (count - 1) : 0;
                    starts[i] = rank * LAUNCH_INTERVAL;
                    brakes[i] = BRAKE_LEAD + (BRAKE_TAIL - BRAKE_LEAD) * fade;
                    span = Math.max(span, starts[i] + riseDuration(LAUNCH_SPEED, brakes[i], dist));
                  }
                  xs = [];
                  fronts = [];
                  frame = function frame(t) {
                    // Deferred a microtask: this runs inside the tween's onUpdate, and a handler that
                    // starts tweens of its own must not reenter the tween system mid-step.
                    if (t >= REVEAL_HANDOFF) void Promise.resolve().then(reveal);
                    xs.length = 0;
                    fronts.length = 0;
                    var now = t * span;
                    for (var _i = 0; _i < count; _i++) {
                      var y = yStart + riseTraveled(now - starts[_i], LAUNCH_SPEED, brakes[_i], dist);
                      var x = (_i - (count - 1) / 2) * CELL_SIZE;
                      _this2.cells[_i].node.setPosition(x, y, 0);
                      xs.push(x);
                      fronts.push(y - MASK_LAG);
                    }
                    return waveMaskPolygon(xs, fronts, width + height);
                  };
                  _context.next = 26;
                  return this.turn.run(target, TURN_DURATION, frame);
                case 26:
                  reveal();
                  if (gen === this.playGen) this.node.active = false;
                case 28:
                case "end":
                  return _context.stop();
              }
            }, _callee, this);
          }));
          function playPageTurn(_x, _x2) {
            return _playPageTurn.apply(this, arguments);
          }
          return playPageTurn;
        }() /** Snaps a running turn to done and hides the layer (restart/home safety). */;
        _proto.stop = function stop() {
          this.playGen++;
          this.turn.stop();
          this.node.active = false;
        }

        /**
         * (Re)builds the block row to span the screen width, re-rolling colors. Positions are set
         * per-frame by the sweep; this only shapes and paints the pool.
         */;
        _proto.buildLine = function buildLine(width) {
          var _loader$getCellSprite;
          if (!this.line) {
            var line = new Node('page-turn-line');
            line.layer = this.node.layer;
            line.addComponent(UITransform);
            line.parent = this.node;
            this.line = line;
          }
          var count = Math.ceil(width / CELL_SIZE) + 2;
          var loader = SpriteLoader.instance;
          var frames = (_loader$getCellSprite = loader == null ? void 0 : loader.getCellSprites()) != null ? _loader$getCellSprite : [];
          for (var i = 0; i < count; i++) {
            var cell = this.cells[i];
            if (!cell) {
              var node = new Node('page-turn-cell');
              node.layer = this.node.layer;
              node.addComponent(UITransform).setContentSize(CELL_SIZE, CELL_SIZE);
              cell = node.addComponent(Sprite);
              cell.sizeMode = Sprite.SizeMode.CUSTOM;
              node.parent = this.line;
              this.cells.push(cell);
            }
            cell.node.active = true;
            cell.spriteFrame = frames[Math.floor(Math.random() * frames.length)];
          }
          for (var _i2 = count; _i2 < this.cells.length; _i2++) {
            this.cells[_i2].node.active = false;
          }
          return count;
        };
        _createClass(TransitionLayer, null, [{
          key: "instance",
          get: /** Null until the editor node exists — callers must use `?.` and degrade to no transition. */
          function get() {
            return TransitionLayer._instance;
          }
        }]);
        return TransitionLayer;
      }(Component), _class2._instance = null, _class2)) || _class));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TutorialGate.ts", ['cc', './DataManager.ts'], function (exports) {
  var cclegacy, DataManager;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DataManager = module.DataManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "27ab2DWugROVac3zePpT6GN", "TutorialGate", undefined);
      var TutorialGate = exports('TutorialGate', {
        shouldRun: function shouldRun() {
          // The editor preview has no persistent SDK record and must not replay onboarding.
          if (!window.GameSDK) return false;
          return !DataManager.getPlayerData('tutorialDone');
        },
        markDone: function markDone() {
          DataManager.setPlayerData('tutorialDone', true);
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TutorialMode.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './constants.ts', './ModeUtils.ts', './TutorialGate.ts', './ClassicMode.ts', './TutorialScript.ts'], function (exports) {
  var _inheritsLoose, _createForOfIteratorHelperLoose, cclegacy, getDef, ModeUtils, GAME_MODE, TutorialGate, ClassicMode, TUTORIAL_CLEAR_SCORE, TUTORIAL_STEPS, TUTORIAL_TRAY_IDS;
  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      getDef = module.getDef;
    }, function (module) {
      ModeUtils = module.default;
      GAME_MODE = module.GAME_MODE;
    }, function (module) {
      TutorialGate = module.TutorialGate;
    }, function (module) {
      ClassicMode = module.ClassicMode;
    }, function (module) {
      TUTORIAL_CLEAR_SCORE = module.TUTORIAL_CLEAR_SCORE;
      TUTORIAL_STEPS = module.TUTORIAL_STEPS;
      TUTORIAL_TRAY_IDS = module.TUTORIAL_TRAY_IDS;
    }],
    execute: function () {
      cclegacy._RF.push({}, "1575fXw1JNKpbYmV2Sy1ppS", "TutorialMode", undefined);
      var SEED_COLOR_INDEX = 2;
      var BOARD_CLEAR_SETTLE = 1.2;
      var OPENING_HOLD = 0.35;
      var TutorialMode = exports('TutorialMode', /*#__PURE__*/function (_ClassicMode) {
        _inheritsLoose(TutorialMode, _ClassicMode);
        function TutorialMode() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _ClassicMode.call.apply(_ClassicMode, [this].concat(args)) || this;
          _this.stepIndex = null;
          _this.completed = false;
          _this.openingReveal = 0;
          return _this;
        }
        var _proto = TutorialMode.prototype;
        _proto.setup = function setup() {
          _ClassicMode.prototype.setup.call(this);
          if (this.completed) return;
          this.stepIndex = null;
          this.gm.getScoreLogic().setFlatClearScore(TUTORIAL_CLEAR_SCORE);
          this.openingReveal = this.seed(TUTORIAL_STEPS[0].seedPattern, OPENING_HOLD);
        };
        _proto.onRunStarted = function onRunStarted() {
          if (this.completed) return;
          this.gm.getBlockLogic().forceTray(TUTORIAL_TRAY_IDS.map(function (id) {
            return getDef(id);
          }));
          this.beginStep(0, this.openingReveal);
        };
        _proto.isPlacementAllowed = function isPlacementAllowed(def, startR, startC) {
          var step = this.currentStep();
          if (!step) return true;
          return def.id === step.blockId && startR === step.targetR && startC === step.targetC;
        };
        _proto.allowsStuckMarking = function allowsStuckMarking() {
          return this.currentStep() === null;
        };
        _proto.onBlockPlaced = function onBlockPlaced() {
          var _this$gm$getGameScree;
          // Handed off here, not in finish(): PlacementLogic tallies daily quests after
          // onTurnCleared, so flipping inside finish() would credit the last scripted clear.
          if (this.completed) ModeUtils.getInstance().startMode(GAME_MODE.CLASSIC);
          (_this$gm$getGameScree = this.gm.getGameScreen().getHandHint()) == null || _this$gm$getGameScree.hide();
        };
        _proto.onTurnCleared = function onTurnCleared() {
          var _this$stepIndex,
            _this2 = this;
          var step = this.currentStep();
          if (!step) return;
          var next = ((_this$stepIndex = this.stepIndex) != null ? _this$stepIndex : 0) + 1;
          if (next >= TUTORIAL_STEPS.length) {
            this.finish();
            return;
          }
          var pattern = TUTORIAL_STEPS[next].seedPattern;
          if (!pattern) {
            this.beginStep(next);
            return;
          }
          this.gm.getBlockLogic().lockAll();
          this.gm.scheduleOnce(function () {
            _this2.beginStep(next, _this2.seed(pattern));
          }, BOARD_CLEAR_SETTLE);
        };
        _proto.currentStep = function currentStep() {
          return this.stepIndex === null ? null : TUTORIAL_STEPS[this.stepIndex];
        };
        _proto.seed = function seed(pattern, startDelay) {
          if (startDelay === void 0) {
            startDelay = 0;
          }
          if (!pattern) return 0;
          var filled = pattern.map(function (_ref) {
            var r = _ref[0],
              c = _ref[1];
            return [r, c, SEED_COLOR_INDEX];
          });
          this.gm.getGridLogic().setStartingBoard(filled);
          return this.gm.getGameScreen().getBoard().animSeedIn(pattern, startDelay);
        };
        _proto.beginStep = function beginStep(index, handDelay) {
          var _this3 = this;
          if (handDelay === void 0) {
            handDelay = 0;
          }
          this.stepIndex = index;
          var step = TUTORIAL_STEPS[index];
          var taught = null;
          for (var _iterator = _createForOfIteratorHelperLoose(this.gm.getBlockLogic().getActiveBlocks()), _step; !(_step = _iterator()).done;) {
            var _block$data;
            var _block = _step.value;
            if (!taught && ((_block$data = _block.data) == null ? void 0 : _block$data.id) === step.blockId) {
              taught = _block;
              _block.unlock();
            } else {
              _block.lock();
            }
          }
          if (!taught) return;
          var block = taught;
          if (handDelay > 0) this.gm.scheduleOnce(function () {
            return _this3.pointAt(block, step);
          }, handDelay);else this.pointAt(block, step);
        };
        _proto.pointAt = function pointAt(block, step) {
          var hand = this.gm.getGameScreen().getHandHint();
          var def = block.data;
          if (!hand || !def) return;
          var board = this.gm.getGameScreen().getBoard();
          var cellPos = board.getCellWorldPos(step.targetR + Math.round(def.maxR / 2), step.targetC + Math.round(def.maxC / 2));
          hand.showDrag(block.node.worldPosition, cellPos);
        };
        _proto.finish = function finish() {
          var _this$gm$getGameScree2;
          this.completed = true;
          this.stepIndex = null;
          this.gm.getScoreLogic().setFlatClearScore(null);
          (_this$gm$getGameScree2 = this.gm.getGameScreen().getHandHint()) == null || _this$gm$getGameScree2.hide();
          this.gm.getBlockLogic().unlockAll();
          TutorialGate.markDone();
        };
        return TutorialMode;
      }(ClassicMode));
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TutorialScript.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  var _createForOfIteratorHelperLoose, cclegacy;
  return {
    setters: [function (module) {
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('patternToMask', patternToMask);
      cclegacy._RF.push({}, "0c9e18O4WVCnILjVk/5vGuS", "TutorialScript", undefined);
      var GRID = 8;
      var TUTORIAL_CLEAR_SCORE = exports('TUTORIAL_CLEAR_SCORE', 12345);
      function buildCrossPattern() {
        var cells = [];
        for (var r = 3; r <= 5; r++) {
          for (var _i = 0, _arr = [0, 1, 5, 6, 7]; _i < _arr.length; _i++) {
            var c = _arr[_i];
            cells.push([r, c]);
          }
        }
        for (var _i2 = 0, _arr2 = [0, 1, 2, 6, 7]; _i2 < _arr2.length; _i2++) {
          var _r = _arr2[_i2];
          for (var _c = 2; _c <= 4; _c++) cells.push([_r, _c]);
        }
        return cells;
      }
      function buildColumnGapPattern() {
        var cells = [];
        for (var r = 0; r <= 4; r++) {
          for (var _i3 = 0, _arr3 = [0, 1, 2, 4, 6, 7]; _i3 < _arr3.length; _i3++) {
            var c = _arr3[_i3];
            cells.push([r, c]);
          }
        }
        return cells;
      }
      var TUTORIAL_PATTERN_CROSS = exports('TUTORIAL_PATTERN_CROSS', buildCrossPattern());
      var TUTORIAL_PATTERN_COLUMNS = exports('TUTORIAL_PATTERN_COLUMNS', buildColumnGapPattern());
      var TUTORIAL_STEPS = exports('TUTORIAL_STEPS', [{
        blockId: 'Sq_3x3',
        targetR: 3,
        targetC: 2,
        seedPattern: TUTORIAL_PATTERN_CROSS
      }, {
        blockId: '5x1_V',
        targetR: 0,
        targetC: 3,
        seedPattern: TUTORIAL_PATTERN_COLUMNS
      }, {
        blockId: '5x1_V',
        targetR: 0,
        targetC: 5,
        seedPattern: null
      }]);
      var TUTORIAL_TRAY_IDS = exports('TUTORIAL_TRAY_IDS', ['Sq_3x3', '5x1_V', '5x1_V']);
      function patternToMask(pattern) {
        var mask = 0n;
        for (var _iterator = _createForOfIteratorHelperLoose(pattern), _step; !(_step = _iterator()).done;) {
          var _step$value = _step.value,
            r = _step$value[0],
            c = _step$value[1];
          mask |= 1n << BigInt(r * GRID + c);
        }
        return mask;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TweenUtils.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports('runTweenAsync', runTweenAsync);
      cclegacy._RF.push({}, "02bcckE/qtLYJ+S91GUTj5J", "TweenUtils", undefined);
      function runTweenAsync(tween) {
        return new Promise(function (resolve) {
          tween.call(function () {
            return resolve();
          }).start();
        });
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/VersusHud.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './TournamentRoster.ts', './AvatarLoader.ts'], function (exports) {
  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, SpriteFrame, Sprite, Label, BlockInputEvents, Vec3, Tween, tween, Component, TournamentRoster, AvatarLoader;
  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Label = module.Label;
      BlockInputEvents = module.BlockInputEvents;
      Vec3 = module.Vec3;
      Tween = module.Tween;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      TournamentRoster = module.TournamentRoster;
    }, function (module) {
      AvatarLoader = module.default;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;
      cclegacy._RF.push({}, "b73d4x5elRGsZUm87Rcib+V", "VersusHud", undefined);
      var ccclass = _decorator.ccclass,
        property = _decorator.property;
      var SCORE_COUNT_TIME = 1;
      var APPEAR_TIME = 0.5;
      var HOLD_TIME = 1;
      var EXIT_TIME = 0.5;
      var VersusHud = exports('VersusHud', (_dec = ccclass('VersusHud'), _dec2 = property(SpriteFrame), _dec3 = property(Sprite), _dec4 = property(Sprite), _dec5 = property(Sprite), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(BlockInputEvents), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(VersusHud, _Component);
        function VersusHud() {
          var _this;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _initializerDefineProperty(_this, "championFrame", _descriptor, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "carpet", _descriptor2, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playerAvatar", _descriptor3, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "opponentAvatar", _descriptor4, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "playerScoreLabel", _descriptor5, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "opponentScoreLabel", _descriptor6, _assertThisInitialized(_this));
          _initializerDefineProperty(_this, "inputBlocker", _descriptor7, _assertThisInitialized(_this));
          _this.opponent = null;
          _this.displayedScore = 0;
          _this.restPos = new Vec3();
          _this.restCaptured = false;
          _this.scoreProxy = {
            v: 0
          };
          _this.carpetAlpha = {
            a: 255
          };
          _this.avatarDefaults = new Map();
          _this.avatarTokens = new Map();
          return _this;
        }
        var _proto = VersusHud.prototype;
        _proto.hide = function hide() {
          this.node.active = false;
        };
        _proto.setInputBlocked = function setInputBlocked(blocked) {
          if (this.inputBlocker) this.inputBlocker.enabled = blocked;
        };
        _proto.show = function show(playerPhotoUrl) {
          this.node.active = true;
          Tween.stopAllByTarget(this.scoreProxy);
          this.displayedScore = 0;
          this.assignAvatar(this.playerAvatar, playerPhotoUrl);
        };
        _proto.setOpponent = function setOpponent(opp) {
          this.opponent = opp;
          this.assignAvatar(this.opponentAvatar, opp.photoUrl);
        };
        _proto.playIntroAsync = function playIntroAsync() {
          var _this2 = this;
          this.prepFaceOff();
          return new Promise(function (resolve) {
            return _this2.runCeremony(resolve);
          });
        };
        _proto.playSwapAsync = function playSwapAsync(opp) {
          var _this3 = this;
          this.setOpponent(opp);
          this.prepFaceOff();
          return new Promise(function (resolve) {
            return _this3.runCeremony(resolve);
          });
        };
        _proto.prepFaceOff = function prepFaceOff() {
          var _this$carpet;
          if (!this.restCaptured) {
            this.node.getPosition(this.restPos);
            this.restCaptured = true;
          }
          Tween.stopAllByTarget(this.node);
          Tween.stopAllByTarget(this.carpetAlpha);
          if (this.carpet) Tween.stopAllByTarget(this.carpet.node);
          this.node.setPosition(this.stagePos());
          (_this$carpet = this.carpet) == null || _this$carpet.node.setScale(0, 1, 1);
          this.carpetAlpha.a = 255;
          this.setCarpetAlpha(255);
          this.setInputBlocked(true);
          this.showRanks();
        };
        _proto.runCeremony = function runCeremony(resolve) {
          var _this4 = this;
          if (this.carpet) {
            tween(this.carpet.node).to(APPEAR_TIME, {
              scale: new Vec3(1, 1, 1)
            }).start();
          }
          tween(this.carpetAlpha).delay(APPEAR_TIME + HOLD_TIME).to(EXIT_TIME, {
            a: 0
          }, {
            onUpdate: function onUpdate() {
              return _this4.setCarpetAlpha(_this4.carpetAlpha.a);
            }
          }).start();
          tween(this.node).delay(APPEAR_TIME + HOLD_TIME).to(EXIT_TIME, {
            position: this.restPos.clone()
          }).call(function () {
            return _this4.settle(resolve);
          }).start();
        };
        _proto.setCarpetAlpha = function setCarpetAlpha(a) {
          if (!this.carpet) return;
          var c = this.carpet.color.clone();
          c.a = a;
          this.carpet.color = c;
        };
        _proto.setPlayerScore = function setPlayerScore(score) {
          var _this5 = this;
          Tween.stopAllByTarget(this.scoreProxy);
          if (score === this.displayedScore) {
            this.applyScoreLabel(score);
            return;
          }
          this.scoreProxy.v = this.displayedScore;
          tween(this.scoreProxy).to(SCORE_COUNT_TIME, {
            v: score
          }, {
            easing: 'sineOut',
            onUpdate: function onUpdate() {
              return _this5.applyScoreLabel(Math.round(_this5.scoreProxy.v));
            }
          }).call(function () {
            return _this5.applyScoreLabel(score);
          }).start();
        };
        _proto.setChampion = function setChampion() {
          this.opponent = null;
          if (this.opponentScoreLabel) this.opponentScoreLabel.string = 'TOP 1';
          if (this.opponentAvatar) {
            var _this$championFrame;
            this.bumpToken(this.opponentAvatar);
            this.opponentAvatar.spriteFrame = (_this$championFrame = this.championFrame) != null ? _this$championFrame : this.defaultFor(this.opponentAvatar);
          }
        };
        _proto.stagePos = function stagePos() {
          return new Vec3(this.restPos.x, 0, 0);
        };
        _proto.settle = function settle(resolve) {
          this.showScores();
          this.setInputBlocked(false);
          resolve();
        };
        _proto.showRanks = function showRanks() {
          if (this.playerScoreLabel) {
            this.playerScoreLabel.string = this.playerName();
          }
          if (this.opponentScoreLabel) {
            var _this$opponent, _this$opponent$name, _this$opponent2;
            var rank = (_this$opponent = this.opponent) == null ? void 0 : _this$opponent.rank;
            this.opponentScoreLabel.string = ((_this$opponent$name = (_this$opponent2 = this.opponent) == null ? void 0 : _this$opponent2.name) != null ? _this$opponent$name : '') + "\n" + (rank != null ? "#" + rank : '');
          }
        };
        _proto.showScores = function showScores() {
          if (this.playerScoreLabel) {
            this.playerScoreLabel.string = this.playerName() + "\n" + this.displayedScore;
          }
          if (this.opponentScoreLabel) {
            var _this$opponent$name2, _this$opponent3, _this$opponent$score, _this$opponent4;
            this.opponentScoreLabel.string = ((_this$opponent$name2 = (_this$opponent3 = this.opponent) == null ? void 0 : _this$opponent3.name) != null ? _this$opponent$name2 : '') + "\n" + ((_this$opponent$score = (_this$opponent4 = this.opponent) == null ? void 0 : _this$opponent4.score) != null ? _this$opponent$score : 0);
          }
        };
        _proto.playerName = function playerName() {
          var _TournamentRoster$get, _TournamentRoster$get2;
          return (_TournamentRoster$get = (_TournamentRoster$get2 = TournamentRoster.getPlayerEntry()) == null ? void 0 : _TournamentRoster$get2.name) != null ? _TournamentRoster$get : 'You';
        };
        _proto.bumpToken = function bumpToken(sprite) {
          var _this$avatarTokens$ge;
          var token = ((_this$avatarTokens$ge = this.avatarTokens.get(sprite)) != null ? _this$avatarTokens$ge : 0) + 1;
          this.avatarTokens.set(sprite, token);
          return token;
        };
        _proto.defaultFor = function defaultFor(sprite) {
          var _this$avatarDefaults$;
          if (!this.avatarDefaults.has(sprite)) {
            this.avatarDefaults.set(sprite, sprite.spriteFrame);
          }
          return (_this$avatarDefaults$ = this.avatarDefaults.get(sprite)) != null ? _this$avatarDefaults$ : null;
        };
        _proto.assignAvatar = function assignAvatar(sprite, photoUrl) {
          var _this6 = this;
          if (!sprite) return;
          var token = this.bumpToken(sprite);
          sprite.spriteFrame = this.defaultFor(sprite);
          if (!photoUrl) return;
          AvatarLoader.load(photoUrl).then(function (frame) {
            if (frame && sprite.isValid && _this6.avatarTokens.get(sprite) === token) {
              sprite.spriteFrame = frame;
            }
          });
        };
        _proto.applyScoreLabel = function applyScoreLabel(value) {
          this.displayedScore = value;
          if (this.playerScoreLabel) this.playerScoreLabel.string = this.playerName() + "\n" + value;
        };
        return VersusHud;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "championFrame", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "carpet", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "playerAvatar", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "opponentAvatar", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "playerScoreLabel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "opponentScoreLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "inputBlocker", [_dec8], {
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

System.register("chunks:///_virtual/WalletService.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DataManager.ts'], function (exports) {
  var _extends, cclegacy, DataManager;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DataManager = module.DataManager;
    }],
    execute: function () {
      cclegacy._RF.push({}, "e646dGk5PFB5qeodtZtzXZ/", "WalletService", undefined);

      // Saves written before the coin/heart rename hold `stars`/`totems`, and pre-wallet saves held the
      // star total on the daily-quest record. Both are read back so the rename cannot zero a live balance.
      var EMPTY = {
        coins: 0,
        hearts: 0
      };
      var cached = null;
      function count(value) {
        return Math.max(0, Math.floor(value != null ? value : 0));
      }
      function sanitize(value) {
        var _value$coins, _value$hearts;
        if (!value) return _extends({}, EMPTY);
        return {
          coins: count((_value$coins = value.coins) != null ? _value$coins : value.stars),
          hearts: count((_value$hearts = value.hearts) != null ? _value$hearts : value.totems)
        };
      }

      // This detection only works while `wallet` stays out of the SDK's DefaultPlayerData.
      function migrate() {
        var legacy = DataManager.getPlayerData('daily');
        var seeded = {
          coins: count(legacy == null ? void 0 : legacy.stars),
          hearts: 0
        };
        DataManager.setPlayerData('wallet', seeded);
        return seeded;
      }
      function load() {
        if (cached) return cached;
        cached = DataManager.hasPlayerData('wallet') ? sanitize(DataManager.getPlayerData('wallet')) : migrate();
        return cached;
      }
      function save(next) {
        cached = next;
        DataManager.setPlayerData('wallet', next);
        return next;
      }
      var WalletService = exports('WalletService', {
        get: function get() {
          return _extends({}, load());
        },
        addCoins: function addCoins(amount) {
          if (amount <= 0) return WalletService.get();
          var current = load();
          return _extends({}, save(_extends({}, current, {
            coins: current.coins + Math.floor(amount)
          })));
        },
        addHearts: function addHearts(amount) {
          if (amount <= 0) return WalletService.get();
          var current = load();
          return _extends({}, save(_extends({}, current, {
            hearts: current.hearts + Math.floor(amount)
          })));
        },
        // One guard and one write: a debit followed by a separate grant would leave a window where the
        // coins are gone and the purchase has not arrived.
        trade: function trade(cost, grant) {
          var price = count(cost);
          var current = load();
          if (current.coins < price) return false;
          save({
            coins: current.coins - price + count(grant.coins),
            hearts: current.hearts + count(grant.hearts)
          });
          return true;
        },
        spendHeart: function spendHeart() {
          var current = load();
          if (current.hearts <= 0) return false;
          save(_extends({}, current, {
            hearts: current.hearts - 1
          }));
          return true;
        }
      });
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WheelPrizes.ts", ['cc'], function (exports) {
  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      exports({
        pickPrizeIndex: pickPrizeIndex,
        sectorAngle: sectorAngle
      });
      cclegacy._RF.push({}, "fc8e3Ie8k5AaoEPM2f1eClq", "WheelPrizes", undefined);
      // faceAngle is where this prize is painted on Spinning_Fans.png, measured clockwise from the top:
      // 45 = top-right, 135 = bottom-right, 225 = bottom-left, 315 = top-left. Move an icon on the disc
      // and its number here has to move with it, or the wheel pays a prize it did not land on.
      var WHEEL_PRIZES = exports('WHEEL_PRIZES', [{
        id: 'coin1',
        type: 'coin',
        amount: 1,
        weight: 40,
        label: '1 COIN',
        faceAngle: 315
      }, {
        id: 'coin2',
        type: 'coin',
        amount: 2,
        weight: 25,
        label: '2 COINS',
        faceAngle: 225
      }, {
        id: 'heart',
        type: 'heart',
        amount: 1,
        weight: 20,
        label: 'REVIVE HEART',
        faceAngle: 45
      }, {
        id: 'coin3',
        type: 'coin',
        amount: 3,
        weight: 15,
        label: '3 COINS',
        faceAngle: 135
      }]);
      var SECTOR_COUNT = exports('SECTOR_COUNT', WHEEL_PRIZES.length);
      var SECTOR_SPAN = exports('SECTOR_SPAN', 360 / SECTOR_COUNT);
      var TOTAL_WEIGHT = WHEEL_PRIZES.reduce(function (sum, prize) {
        return sum + prize.weight;
      }, 0);
      function pickPrizeIndex(roll) {
        var clamped = roll < 0 ? 0 : roll >= 1 ? 0.999999 : roll;
        var cursor = clamped * TOTAL_WEIGHT;
        for (var i = 0; i < WHEEL_PRIZES.length; i++) {
          cursor -= WHEEL_PRIZES[i].weight;
          if (cursor < 0) return i;
        }
        return WHEEL_PRIZES.length - 1;
      }

      // A sector painted at clockwise angle f arrives under the pointer once the disc has turned f
      // counter-clockwise, which is what Cocos `angle` measures.
      function sectorAngle(index) {
        var _WHEEL_PRIZES$index$f, _WHEEL_PRIZES$index;
        return (_WHEEL_PRIZES$index$f = (_WHEEL_PRIZES$index = WHEEL_PRIZES[index]) == null ? void 0 : _WHEEL_PRIZES$index.faceAngle) != null ? _WHEEL_PRIZES$index$f : 0;
      }
      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/WheelSpinService.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './DataManager.ts'], function (exports) {
  var _extends, cclegacy, DataManager;
  return {
    setters: [function (module) {
      _extends = module.extends;
    }, function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      DataManager = module.DataManager;
    }],
    execute: function () {
      exports({
        formatCountdown: formatCountdown,
        fullSpins: fullSpins,
        refillIfDue: refillIfDue,
        remainingMs: remainingMs,
        sanitize: sanitize,
        spendSpin: spendSpin,
        spinNeedsAd: spinNeedsAd
      });
      cclegacy._RF.push({}, "b8c88aLd/lMiIGbWQAeEtE8", "WheelSpinService", undefined);
      var MAX_SPINS = exports('MAX_SPINS', 3);
      var REFILL_MS = exports('REFILL_MS', 5 * 60 * 60 * 1000);
      function fullSpins() {
        return {
          spins: MAX_SPINS,
          refillAt: 0
        };
      }
      function _int(value, fallback) {
        return typeof value === 'number' && Number.isFinite(value) ? Math.floor(value) : fallback;
      }
      function sanitize(value) {
        if (!value) return fullSpins();
        return {
          spins: Math.min(MAX_SPINS, Math.max(0, _int(value.spins, MAX_SPINS))),
          refillAt: Math.max(0, _int(value.refillAt, 0))
        };
      }

      // A timer further out than one full cooldown was written under a clock that has since moved back;
      // trusting it would strand the player well past the five hours. A partial bank with no timer was
      // saved back when only an empty bank refilled, and would otherwise never refill at all.
      function refillIfDue(state, now) {
        if (state.refillAt <= 0) {
          return state.spins < MAX_SPINS ? _extends({}, state, {
            refillAt: now + REFILL_MS
          }) : state;
        }
        if (now >= state.refillAt) return fullSpins();
        if (state.refillAt - now > REFILL_MS) return _extends({}, state, {
          refillAt: now + REFILL_MS
        });
        return state;
      }
      function spendSpin(state, now) {
        var ready = refillIfDue(state, now);
        if (ready.spins <= 0) return ready;
        return {
          spins: ready.spins - 1,
          refillAt: now + REFILL_MS
        };
      }

      // Only the first spin of a full bank is free; the rest of that bank are paid for with an ad, and a
      // refill makes the next one free again.
      function spinNeedsAd(state) {
        return state.spins < MAX_SPINS;
      }
      function remainingMs(state, now) {
        var ready = refillIfDue(state, now);
        if (ready.spins > 0 || ready.refillAt <= 0) return 0;
        return Math.max(0, ready.refillAt - now);
      }
      function pad(value) {
        return value < 10 ? "0" + value : "" + value;
      }
      function formatCountdown(ms) {
        var total = Math.ceil(Math.max(0, ms) / 1000);
        return Math.floor(total / 3600) + ":" + pad(Math.floor(total % 3600 / 60)) + ":" + pad(total % 60);
      }
      var cached = null;
      function save(next) {
        cached = next;
        DataManager.setPlayerData('wheel', next);
        return next;
      }
      function load(now) {
        var _cached;
        var stored = (_cached = cached) != null ? _cached : sanitize(DataManager.getPlayerData('wheel'));
        var ready = refillIfDue(stored, now);
        if (ready !== stored) return save(ready);
        cached = stored;
        return stored;
      }
      var WheelSpinService = exports('WheelSpinService', {
        get: function get(now) {
          if (now === void 0) {
            now = Date.now();
          }
          return _extends({}, load(now));
        },
        spend: function spend(now) {
          if (now === void 0) {
            now = Date.now();
          }
          var current = load(now);
          if (current.spins <= 0) return false;
          save(spendSpin(current, now));
          return true;
        },
        msUntilRefill: function msUntilRefill(now) {
          if (now === void 0) {
            now = Date.now();
          }
          return remainingMs(load(now), now);
        }
      });
      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
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