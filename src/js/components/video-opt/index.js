function videoOptimization() {
   function unwrapExports (x) {
      return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
   }

   function createCommonjsModule(fn, module) {
      return module = { exports: {} }, fn(module, module.exports), module.exports;
   }

   var Animation_1 = createCommonjsModule(function (module, exports) {

      Object.defineProperty(exports, "__esModule", { value: true });
      var Animation = /** @class */function () {
         function Animation(element, from, to, options) {
            if (options === void 0) {
               options = {};
            }
            this.element = element;
            this.from = from;
            this.to = to;
            this.options = options;
            this.progress = -1;
            this.style = element.style;
            this.easing = this.validateOption('easing', function (n) {
               return n;
            });
         }
         Animation.prototype.validateOption = function (option, placeholder) {
            var field = this.options[option];
            return field !== undefined ? field : placeholder;
         };
         Animation.prototype.update = function () {
            window.requestAnimationFrame(this.render.bind(this));
         };
         Animation.prototype.render = function () {};
         Animation.prototype.calcProgress = function (position, from, to) {
            var progress = 0;
            if (position > from) {
               progress = position < to ? (position - from) / (to - from) : 1;
            }
            return this.easing(progress);
         };
         Animation.prototype.animate = function (position) {
            var newProgress = this.calcProgress(position, this.from, this.to);
            if (newProgress !== this.progress) {
               this.progress = newProgress;
               this.render();
            }
         };
         return Animation;
      }();
      exports.Animation = Animation;

   });

   unwrapExports(Animation_1);
   var Animation_2 = Animation_1.Animation;

   var Container_1 = createCommonjsModule(function (module, exports) {

      Object.defineProperty(exports, "__esModule", { value: true });
      var Container = /** @class */function () {
         function Container(position, parts) {
            if (parts === void 0) {
               parts = [];
            }
            this.position = position;
            this.parts = parts;
            this.lastPosition = -1;
            this.progress = position.getPosition.bind(position);
         }
         Container.prototype.animate = function (scroll) {
            if (scroll === void 0) {
               scroll = window.pageYOffset;
            }
            var position = this.progress(scroll);
            if (position !== this.lastPosition) {
               this.lastPosition = position;
               this.parts.forEach(function (part) {
                  return part.animate(position);
               });
            }
         };
         Container.prototype.update = function () {
            this.position.update();
            this.parts.forEach(function (part) {
               return part.update();
            });
            this.animate();
         };
         return Container;
      }();
      exports.Container = Container;

   });

   unwrapExports(Container_1);
   var Container_2 = Container_1.Container;

   var utils = createCommonjsModule(function (module, exports) {

      Object.defineProperty(exports, "__esModule", { value: true });
      exports.debounce = function (fn, timeout) {
         var id = -1;
         return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
               args[_i] = arguments[_i];
            }
            clearTimeout(id);
            id = setTimeout(function () {
               fn.apply(void 0, args);
               id = -1;
            }, timeout);
         };
      };

   });

   unwrapExports(utils);
   var utils_1 = utils.debounce;

   var Renderer_1 = createCommonjsModule(function (module, exports) {

      Object.defineProperty(exports, "__esModule", { value: true });

      var Renderer = /** @class */function () {
         function Renderer(containers) {
            this.containers = containers;
         }
         Renderer.prototype.render = function (time) {
            var scroll = window.pageYOffset;
            var difference = time - this.lastTime;
            difference = difference > 0 ? difference : 0;
            this.containers.forEach(function (container) {
               return container.animate(scroll, difference);
            });
            this.lastTime = time;
         };
         Renderer.prototype.update = function () {
            this.containers.forEach(function (container) {
               return container.update();
            });
         };
         Renderer.prototype.loop = function () {
            var _this = this;
            this.update();
            window.addEventListener('resize', utils.debounce(this.update.bind(this), 100));
            var tick = function tick() {
               window.requestAnimationFrame(function (time) {
                  _this.render(time);
                  tick();
               });
            };
            tick();
         };
         return Renderer;
      }();
      exports.Renderer = Renderer;

   });

   unwrapExports(Renderer_1);
   var Renderer_2 = Renderer_1.Renderer;

   var Position_1 = createCommonjsModule(function (module, exports) {

      Object.defineProperty(exports, "__esModule", { value: true });
      var Position = /** @class */function () {
         function Position(element, fromFn, toFn) {
            this.element = element;
            this.fromFn = fromFn;
            this.toFn = toFn;
            this.from = 0;
            this.to = 0;
         }
         Position.prototype.update = function () {
            var env = {
               width: window.innerWidth,
               height: window.innerHeight
            };
            var boundingClientRect = this.element.getBoundingClientRect();
            var pageYOffset = window.pageYOffset;
            var offset = {
               height: boundingClientRect.height,
               bottom: boundingClientRect.bottom + pageYOffset,
               top: boundingClientRect.top + pageYOffset
            };
            this.from = this.fromFn(offset, env);
            this.to = this.toFn(offset, env);
         };
         Position.prototype.getPosition = function (scroll) {
            if (scroll <= this.from) {
               return 0;
            }
            if (scroll >= this.to) {
               return 1;
            }
            return (scroll - this.from) / (this.to - this.from);
         };
         return Position;
      }();
      exports.Position = Position;

   });

   unwrapExports(Position_1);
   var Position_2 = Position_1.Position;

   var lib = createCommonjsModule(function (module, exports) {

      Object.defineProperty(exports, "__esModule", { value: true });

      exports.Animation = Animation_1.Animation;

      exports.Container = Container_1.Container;

      exports.Renderer = Renderer_1.Renderer;

      exports.Position = Position_1.Position;

   });

   unwrapExports(lib);
   var lib_1 = lib.Animation;
   var lib_2 = lib.Container;
   var lib_3 = lib.Renderer;
   var lib_4 = lib.Position;

   var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   };

   var createClass = function () {
      function defineProperties(target, props) {
         for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
         }
      }

      return function (Constructor, protoProps, staticProps) {
         if (protoProps) defineProperties(Constructor.prototype, protoProps);
         if (staticProps) defineProperties(Constructor, staticProps);
         return Constructor;
      };
   }();

   var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
         throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
         constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
         }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
   };

   var possibleConstructorReturn = function (self, call) {
      if (!self) {
         throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
   };

   var Player = function () {
      function Player(element) {
         classCallCheck(this, Player);

         this.element = element;
         this.isObservable = true;

         this.position = new lib_4(element, function (offset, env) {
            return offset.top - env.height;
         }, function (offset) {
            return offset.bottom;
         });

         this.update();
      }

      createClass(Player, [{
         key: "update",
         value: function update() {
            if (this.isObservable) {
               this.position.update();
            }
         }
      }, {
         key: "toggle",
         value: function toggle(scroll) {
            if (this.isObservable) {
               var pos = this.position.getPosition(scroll);
               if (this.element.paused) {
                  if (pos > 0.2 && pos < 0.8) {
                     this.element.play();
                  }
               } else if (pos === 0 || pos === 1) {
                  this.element.pause();
               }
            }
         }
      }]);
      return Player;
   }();

   var _document$querySelect = document.querySelector("video"),
      playsInline = _document$querySelect.playsInline,
      webkitPlaysInline = _document$querySelect.webkitPlaysInline;

   var canPlayInline = !(playsInline === undefined && webkitPlaysInline === undefined && /(iPhone)|(iPod)|(iPad)/gi.test(navigator.appVersion));

   var players = [];

   var init = function init() {
      if (canPlayInline) {
         var prepareVideo = function prepareVideo(video) {
            var cl = video.classList;

            /* eslint-disable */
            video.muted = true;
            video.webkitPlaysInline = true;
            video.playsInline = true;
            // video.loop = !cl.contains("noloop");
            /* eslint-enable */

            // костыль для айфонов
            try {
               video.play().then(video.pause()).catch(function () {});
               // eslint-disable-next-line
            } catch (e) {}

            if (cl.contains("initial-play")) {
               video.play();
            }

            if (!cl.contains("noautoplay")) {
               var player = new Player(video);

               players.push(player);

               if (!video.loop) {
                  video.addEventListener("ended", function () {
                     player.isObservable = false;

                     window.addEventListener("focus", function () {
                        // eslint-disable-next-line
                        video.currentTime = video.duration;
                     });
                  });
               }
            }
         };

         [].forEach.call(document.querySelectorAll("video"), function (video) {
            return prepareVideo(video);
         });

         var update = function update() {
            return players.forEach(function (player) {
               return player.update();
            });
         };

         update();
         window.addEventListener("resize", update);

         var lastScroll = -1;

         setInterval(function () {
            var scroll = window.pageYOffset;
            if (scroll !== lastScroll) {
               lastScroll = scroll;
               players.forEach(function (player) {
                  return player.toggle(scroll);
               });
            }
         }, 150);
      }
   };

   setTimeout(init, 1000);

   var Stripe = function (_Animation) {
      inherits(Stripe, _Animation);

      function Stripe() {
         classCallCheck(this, Stripe);
         return possibleConstructorReturn(this, (Stripe.__proto__ || Object.getPrototypeOf(Stripe)).apply(this, arguments));
      }

      createClass(Stripe, [{
         key: "update",
         value: function update() {
            var el = this.element;
            this.offset = el.parentElement.clientWidth - el.clientWidth;
            this.render();
         }
      }, {
         key: "render",
         value: function render() {
            this.style.transform = "translateX(" + this.progress * this.offset + "px)";
         }
      }]);
      return Stripe;
   }(lib_1);


   setTimeout(function () {
      // var switcher = new Switcher(document.querySelector(".seasons"));
      // console.log(switcher);
      // switcher.next();

      // var stripes = [].map.call(document.querySelectorAll(".rpl-teams__row"), function (stripe) {
      //    return new lib_2(new lib_4(stripe, function (offset, env) {
      //       var result = offset.top - env.height;
      //       return result > 0 ? result : 0;
      //    }, function (offset) {
      //       return offset.bottom;
      //    }), [new Stripe(stripe, 0, 1)]);
      // });

      // var renderer = new lib_3(stripes);
      // renderer.loop();
   }, 1000);
}

export {videoOptimization}
