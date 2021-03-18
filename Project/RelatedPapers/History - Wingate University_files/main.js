 /**
 *
 * Wingate University - default_17
 * @link http://wingateedu.finalsite.com
 * Site Template : newclientcustom
 * Built By: Ryan Reese
 * Project Manager: Michelle Walker
 * Designer: Julianne Hamilton
 * ==== Git Info ====
 * Branch Name: clients/wingateedu
 * Build version: 3.2.6
 * Git Tag: v3.0-265-gb181278889
 * Last build by: Chris Mazurski
 *
 **/

// Build package info 
window.buildinfo = {
  buildname : 'fs-composer-build',
  ver : '3.2.6',
  template : 'newclientcustom'
};

var $campusCommunitySpotlight = $(".campus-community-spotlight");
var notComposeMode = !$('.fsComposeMode').length;

window.addEventListener("load", function() {
  if($campusCommunitySpotlight.length && notComposeMode) {
    $campusCommunitySpotlight.find("article.fsResource").each( function() {
      $(this).find(".fsTitle, .fsDescription").wrapAll("<div class='campus-community-spotlight-caption'/>")
    });
  }
});
/*!
 * global_vars is a file particular to your site
 * it contains base functions that are likely but not always used
 **/

// configure fonts to load from vendors
// check src/js/plugins/fontLoader.js for reference
WebFontConfig = {
  typekit: {
    id: 'elx3owa'
  }
};

jQuery(function($) {

  'use strict';

  var HOME;
  var OFFCANVAS;
  var SUBNAV;
  var TREATMENTS;
  var UTIL;

  var $html = $('html');
  var $body = $('body');
  var $navMain = $('.nav-main');
  var $navSub = $('.nav-sub');
  var $navTier = $('.nav-tier');
  var $navMain_level1 = $('#fsHeader').find('.nav-main .fsNavLevel1');
  var sectionTitle = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').text();
  var sectionURL = $navMain_level1.find('> li[class*="fsNavCurrentPage"] > a').attr("href");
  var $navSub_title = $navSub.find('> header > .fsElementTitle');
  var bpMobile = 600;
  var bpTablet = 800;
  var isHome = $('.home').length;
  var $touch = $('html.touch');
  var notDraftMode = !$('.fsDraftMode').length; // if (isHome && notDraftMode)....
  var notComposeMode = !$('.fsComposeMode').length; // if (isHome && notDraftMode)....

  //check if browser supports placeholders for placeholder()
  $.support.placeholder = (function() {
    var i = document.createElement('input');
    return 'placeholder' in i;
  })();


  // check for buildinfo and add classes to body tag
  (function(){
    if ( window.buildinfo !== undefined ){
      var b = document.getElementsByTagName('body')[0];
      b.setAttribute( 'data-buildver', window.buildinfo.ver );
      b.setAttribute( 'data-sitetemplate', window.buildinfo.template );
    }
  })();

  // ================================
  // Home
  // ================================

  HOME = {
    init: function() {
      this.loading();
      this.heroCollage();
      this.programGrid();
      this.schoolNews();
      this.fixedNavigation();
      this.customPostModal();
      this.socialFeeds();
      this.fixedBG();
    },
    loading: function() {
      $(window).load(function() {
        $('.home:not(.fsDraftMode)').addClass('is-loaded');
      });
      setTimeout(function(){
        $('.home:not(.fsDraftMode)').addClass('is-loaded');
      }, 4000);
    },
    heroCollage: function() {
      $(".hero-collage .fsPostElement article").each(function(i) {
        var thumbnail = $(this).find(".fsThumbnail");
        $(this).wrapInner('<div class="content-overlay"></div>');
        thumbnail.prependTo($(this));
        $('a').parentFocus($(this), function() {
          $(this).addClass("engaged");
        }, function() {
          $(this).removeClass("engaged");
        });
        $(this).find(".content-overlay").dotdotdot({
          watch: true
        });
      });
      $(window).on('resize load', debounce(function() {
        var totalHeight = $(".hero-collage .fsResourceElement").outerHeight()
         + $(".hero-collage .fsPostElement article:nth-child(2)").outerHeight()
         + 28;
        $(".hero-text").css("top", totalHeight+"px");
        if($(window).width() < 1400 && $(window).width() >= 1000) {
          var vidHeight = $(".hero-collage .fsResourceElement").height() + 51;
          $(".hero-collage article:nth-child(2)").css("top",vidHeight+"px");
        }
      }, 200));
    },
    programGrid: function() {
      $(".program-grid .fsElement.fsContent").each(function() {
        var anchor = $(this).find("> header a").first().clone().addClass("overlay")[0].outerHTML;
        $(anchor).prependTo($(this));
      });
      var $slick_slider = $("body:not(.fsComposeMode) .program-grid > .fsElementContent");
      $(window).on("load resize", function() {
        if($(window).width() >= 1000) {
          if($slick_slider.hasClass('slick-initialized')) {
            $slick_slider.slick('unslick');
          }
          return;
        }
        if(!$slick_slider.hasClass('slick-initialized')) {
          $slick_slider.slick({
            mobileFirst: true,
            responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2
              }
            }, {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
              }
            }, {
              breakpoint: 1000,
              settings: "unslick"
            }]
          });
        }
      });
    },
    schoolNews: function() {
      $(".school-news article").each(function() {
        var thumbnail = $(this).find(".fsThumbnail");
        $(this).wrapInner('<div class="content-overlay"></div>');
        thumbnail.prependTo($(this));
        $(this).find(".content-overlay .fsSummary").dotdotdot({
          watch: true
        });
      });
      var checkSchoolNews = setInterval(function() {
        if($(".school-news .slick-slider.slick-initialized").length) {
          clearInterval(checkSchoolNews);
          $(".school-news .slick-slider.slick-initialized").slick("destroy");
          $(".school-news .fsLeftArrow, .school-news .fsRightArrow").remove();
          $('<div class="arrows-container"></div>').appendTo($(".school-news > .fsElementContent"));
          $(".school-news .fsElementSlideshow").on('init', function(event, slick) {
            $(".school-news .slick-arrow").appendTo($(".school-news .arrows-container"));
          });
          $(".school-news .fsElementSlideshow").slick({
            mobileFirst: true,
            adaptiveHeight: true,
            responsive: [
              {
                breakpoint: 1240,
                settings: {
                  centerMode: true,
                  centerPadding: ($(window).width() - 1240) / 2+"px"
                }
              }
            ]
          });
          $(window).on("resize", debounce(function() {
            var checkArrowsContainer = $(".school-news .arrows-container").length;
            var bottomOffset = $(".school-news article.slick-active .content-overlay").outerHeight() + 75 - 50;
            if(checkArrowsContainer.length === 0) {
              $('<div class="arrows-container"></div>').appendTo($(".school-news > .fsElementContent"));
            }
            if($(".school-news .arrows-container .slick-arrow").length !== 2) {
              $(".school-news .slick-arrow").appendTo($(".school-news .arrows-container"));
            }
            $(".school-news .arrows-container").css("top", bottomOffset+"px");
            var slider = $(".school-news .slick-slider.slick-initialized");
            var paddingAmount = ($(window).width() - 1240) / 2;
            if($(window).width() >= 1240) {
              slider.slick("slickSetOption", "centerPadding", paddingAmount+"px");
            } else {
              slider.slick("slickSetOption", "centerMode", false);
            }
          }, 200));
          $(window).resize();
        }
      }, 200);
    },
    fixedNavigation: function() {
      $(".nav-hp-fixed .fsNavLevel1 > li.fsNavParentPage").each(function() {
        $('<button class="toggle-sublist">Toggle Sublist</button>').appendTo($(this).find("> a"));
      });
      $(".nav-hp-fixed .fsNavLevel2").columns({
        columns: 3,
        addWrapper: true
      });
      if(notDraftMode) {
        $(".nav-hp-fixed .fsNavLevel1 > li.fsNavParentPage").doubleTapToGo();
        $(".nav-hp-fixed .fsNavLevel1").accessibility_menu({
          mainMenuLabel: "School Programs Menu"
        });
      }
      $(".nav-hp-fixed .fsNavLevel1 > li > a > .toggle-sublist").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).parents("li").toggleClass("opened").find("> .fsNavPageInfo").slideToggle();
      });
    },
    customPostModal: function() {
      FS.events.onElementDialogShown('post', function(ele){
        $(ele).find("article").each(function() {
          $(this).find(".fsTags").prependTo($(this));
          $(this).find(".fsBody").prependTo($(this));
          $(this).find(".fsDateTime").prependTo($(this));
          $(this).find(".fsTitle").prependTo($(this));
          $(this).find(".fsThumbnail").prependTo($(this));
          $(this).find(".fsCategories").prependTo($(this));
        });
      });
    },
    socialFeeds: function() {
      var checkFeeds = setInterval(function() {
        if($(".wu-life .fsFeeds.fsSlideshow .j-initialized.loaded").length) {
          clearInterval(checkFeeds);
          $(".wu-life .fsFeeds.fsSlideshow .feed-item .j-message").dotdotdot({
            watch: true
          });
        }
      }, 200);
    },
    fixedBG: function() {
      if(navigator.userAgent.match(/Trident\/7\./)) {
        $("body").on("mousewheel", function () {
          event.preventDefault();
          var wheelDelta = event.wheelDelta;
          var currentScrollPosition = window.pageYOffset;
          window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
      }
    }
  };

  if(isHome) {
    HOME.init();
  }

  // ================================
  // Off Canvas Menu
  // ================================

  OFFCANVAS = {
    init: function() {
      this.clickHandler();
      this.expandCollapse();
    },
    clickHandler: function() {
      $('.drawer-trigger').click(function() {
        $html.toggleClass('drawer-is-active');
      });
    },
    expandCollapse: function() {
      $("#fsMenu .nav-main .fsNavLevel1 > li.fsNavParentPage").each(function() {
        $('<button class="level-trigger">Open level 2 pages</button>').appendTo($(this));
        if($(this).hasClass("fsNavCurrentPage") || $(this).hasClass("fsNavCurrentPageAncestor")) {
          $(this).addClass("opened");
          $(this).find("> .fsNavPageInfo").animate({
            "max-height": "100%",
            "opacity": "1"
          });
        }
        $(this).find(".level-trigger").on("click", function() {
          if($(this).parent().hasClass("opened")) {
            $(this).parent().removeClass("opened");
            $(this).parent().find("> .fsNavPageInfo").animate({
              "max-height": "15px",
              "opacity": "0"
            });
          } else {
            $(this).parent().addClass("opened");
            $(this).parent().find("> .fsNavPageInfo").animate({
              "max-height": "100%",
              "opacity": "1"
            });
          }
        });
      });
    }
  };

  OFFCANVAS.init();

  // ================================
  // Sub Navigation
  // ================================

  SUBNAV = {
    init: function() {
        this.expandCollapse();
        this.title();
        this.mobileNav();
    },
    expandCollapse: function() {
      $navSub.find("li").each(function() {
        if($(this).hasClass("fsNavParentPage")) {
          $('<button class="expand-sublist">Expand SubMenu</button>').insertAfter($(this).find("> a"));
        }
      });
      $navSub.find(".expand-sublist").on("click", function() {
        $(this).parent().toggleClass("expanded");
        $(this).parent().find("> .fsNavPageInfo").animate({
          height: 'toggle'
        }, 400);
      });
    },
    title: function() {
      // if(sectionTitle.length !== 0) {
      //   $navSub_title.html(sectionTitle);
      // }
      if($navSub.find('nav .fsNavLevel1').length !== 0) {
        $navSub.removeClass('nav-sub-empty');
      } else {
        $navSub.addClass('nav-sub-empty');
      }
      if($navTier.find('nav .fsNavLevel1').length !== 0) {
        $navTier.removeClass('nav-tier-empty');
      } else {
        $navTier.addClass('nav-tier-empty');
      }
    },
    mobileNav: function() {
      $navSub_title.click(function() {
        $(this).closest($navSub).toggleClass('active-nav');
      });
      $(document).on('click', function(event) {
        if (!$(event.target).closest($navSub).length) {
          $navSub.removeClass('active-nav');
        }
      });
    }
  };

  SUBNAV.init();

  // ================================
  // Treatments / Anything special
  // ================================

  TREATMENTS = {
    init: function() {
      this.wingatePictures();
      this.socialMastheadSlideshow();
      this.micrositeHeroSlideshow();
      this.infograph();
      this.linkLists();
      this.mastheadHero();
      this.imageButtons();
      this.contentImageModule();
      this.tableOverflow();
      this.customSearch();
    },
    wingatePictures: function() {
      $(".wingate-pictures article").each(function() {
        backgroundImage($(this).find("picture"));
      });
    },
    socialMastheadSlideshow: function() {
      var checkFeeds = setInterval(function() {
        if($(".fsFeeds.fsSlideshow.social-hero .j-initialized.loaded").length) {
          clearInterval(checkFeeds);
          $(".fsFeeds.fsSlideshow.social-hero .feed-item .j-message").dotdotdot({
            watch: true
          });
        }
      }, 200);
    },
    micrositeHeroSlideshow: function() {
      var checkHeroSlideshow = setInterval(function() {
        if($(".microsite-hero-slideshow .slick-slider.slick-initialized").length) {
          clearInterval(checkHeroSlideshow);
          $(".microsite-hero-slideshow .slick-slider").slick('slickSetOption', 'pauseOnHover', false, false);
          $(".microsite-hero-slideshow .slick-slider").slick('slickSetOption', 'pauseOnFocus', false, false);
          $(".microsite-hero-slideshow article").each(function() {
            if($(this).find(".fsTitle").length) {
              if($(this).find("figcaption").length == 0) {
                $('<figcaption></figcaption>').appendTo($(this).find("figure"));
              }
              $(this).find(".fsTitle").prependTo($(this).find("figcaption"));
            }
          });
        }
      }, 100);
    },
    infograph: function() {
      backgroundImage($(".infograph-container .stat-slide.large .fsElement.fsContent:nth-child(2) > .fsElementContent"));
      backgroundImage($(".infograph-container .stat-slide.small .fsElement.fsContent:nth-child(1) > .fsElementContent"));
      $("body:not(.fsComposeMode) .infograph-container > .fsElementContent").slick({
        mobileFirst: true,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      });
    },
    linkLists: function() {
      if($(".fsTwoColumnLayout > .fsDiv > .link-list").length) {
        $(".fsTwoColumnLayout > .fsDiv > .link-list").parent().parent().addClass("has-link-list");
      }
      if($(".fsThreeColumnLayout > .fsDiv > .link-list").length) {
        $(".fsThreeColumnLayout > .fsDiv > .link-list").parent().parent().addClass("has-link-list");
      }
      if($(".fsFourColumnLayout > .fsDiv > .link-list").length) {
        $(".fsFourColumnLayout > .fsDiv > .link-list").parent().parent().addClass("has-link-list");
      }
    },
    mastheadHero: function() {
      var checkHero = setInterval(function() {
        if($(".masthead-hero .slick-slider.slick-initialized").length) {
          clearInterval(checkHero);
          $(".masthead-hero .slick-slider").slick('slickSetOption', 'adaptiveHeight', true, false);
          $(".masthead-hero .slick-slider").slick('slickSetOption', 'pauseOnHover', false, false);
          $(".masthead-hero .slick-slider").slick('slickSetOption', 'pauseOnFocus', false, false);
          $(".masthead-hero article").each(function() {
            backgroundImage($(this).find("picture"));
            if($(this).find(".fsTitle").length) {
              if($(this).find("figcaption").length == 0) {
                $('<figcaption></figcaption>').appendTo($(this).find("figure"));
              }
              $(this).find(".fsTitle").prependTo($(this).find("figcaption"));
            }
          });
        }
      }, 100);
    },
    imageButtons: function() {
      if($(".fsTwoColumnLayout > .fsDiv > .image-button").length) {
        $(".fsTwoColumnLayout > .fsDiv > .image-button").parent().parent().addClass("has-image-button");
      }
      if($(".fsThreeColumnLayout > .fsDiv > .image-button").length) {
        $(".fsThreeColumnLayout > .fsDiv > .image-button").parent().parent().addClass("has-image-button");
      }
      if($(".fsFourColumnLayout > .fsDiv > .image-button").length) {
        $(".fsFourColumnLayout > .fsDiv > .image-button").parent().parent().addClass("has-image-button");
      }
      $(".image-button").each(function() {
        var header = $(this).find("> header")[0].outerHTML;
        var content = $(this).find("> .fsElementContent")[0].outerHTML;
        $('<div class="wrapper">'+header+content+'</div>').appendTo($(this));
      });
      $('a').parentFocus('.image-button', function () {
        $(".image-button").removeClass("opened");
        $(this).addClass("opened");
      }, function() {
        $(".image-button").removeClass("opened");
      });
    },
    contentImageModule: function() {
      $("body:not(.fsComposeMode) #fsPageContent .module.navy.image").each(function() {
        $(this).find("> footer").prependTo($(this));
      });
    },
    tableOverflow: function() {
      $(".fsPageBody .fsElement:not(.fsSearch) table").each(function() {
        $(this).wrap('<div style="overflow-x: auto;"></div>');
      });
    },
    customSearch: function() {
      $ ("#fsHeader .site-search > .fsElementContent").hide();
      $ ("#fsHeader .site-search > .fsElementContent").addClass("loaded");
      $("#fsHeader .site-search").on("click", ".search-trigger", function(e) {
        $("#fsHeader .site-search > .fsElementContent").slideToggle();
        $body.toggleClass('search-is-open');
      });
      $(document).on('click', function(event) {
        if (!$(event.target).closest('#fsHeader .site-search').length) {
          $("#fsHeader .site-search > .fsElementContent").slideUp();
          $body.removeClass('search-is-open');
        }
      });
    }
  };

  TREATMENTS.init();

  // ================================
  // Utility & milliseconds Functions
  // ================================

  UTIL = {
    init: function() {
      this.siteMenus();
      this.sectionLabel();
      if($('.fsSlideshowHorizontal').length) {
        var checkSlider = setInterval(function() {
          var totalSlideshowLength = $(".fsSlideshowHorizontal").length;
          if( $('.fsSlideshowHorizontal .slick-initialized').length === totalSlideshowLength) {
            clearInterval(checkSlider);
            UTIL.responsiveSlideshows();
          }
        }, 100);
      }
      if ($('.profile-19').length) {
        this.constituentProfile();
      }
    },
    responsiveSlideshows: function() {
      var _$slideshowSubtypeHorizontal,
        options
      ;
      _$slideshowSubtypeHorizontal = $('.fsSlideshow.fsSlideshowHorizontal');
      _$slideshowSubtypeHorizontal.each(function (index, element ) {
        var _$carousel = $(element).find( '.fsElementSlideshow.slick-initialized');
        var slidesToShow = _$carousel.data('slides-to-show');
        var stsTwo = slidesToShow < 2 ? slidesToShow : 2;
        var stsThree =  slidesToShow < 3 ? slidesToShow : 3;
        var stsFour = slidesToShow < 4 ? slidesToShow : 4;
        var stsFive =  slidesToShow < 5 ? slidesToShow : 5;
        options = {
          'arrows': true,
          'mobileFirst': true,
          'slidesToShow': 1,
          'slidesToScroll': 1,
          'adaptiveHeight': true,
          'responsive': [
            {
              'breakpoint': 700,
              'settings': {
                'slidesToShow': stsTwo,
                'slidesToScroll': stsTwo
              }
            },
            {
              'breakpoint': 800,
              'settings': {
                'slidesToShow': stsThree,
                'slidesToScroll': stsThree
              }
            },
            {
              'breakpoint': 1000,
              'settings': {
                'slidesToShow': stsFour,
                'slidesToScroll': stsFour
              }
            },
            {
              'breakpoint': 1200,
              'settings': {
                'slidesToShow': stsFive,
                'slidesToScroll': stsFive
              }
            }
          ]
        };
        _$carousel.slick('slickSetOption', options, true);
      });
    },
    siteMenus: function() {
      $(".nav-utility-header .fsNavLevel1 > li.mygate > a").each(function() {
        var firstTwo = $(this).text().substr(0,2);
        var textLength = $(this).text().length;
        var rest = $(this).text().substr(2,textLength);
        $(this).empty();
        $(this).prepend('<span>'+firstTwo+'</span>'+rest);
      });
      $("#fsHeader .nav-main .fsNavLevel2").columns({
        columns: 2
      });
      if(notDraftMode) {
        $("#fsHeader .nav-main .fsNavLevel1 > li.fsNavParentPage").doubleTapToGo();
        $("#fsHeader .nav-utility-header .fsNavLevel1 > li.fsNavParentPage").doubleTapToGo();
        $("#fsHeader .nav-main .fsNavLevel1").accessibility_menu();
        $("#fsHeader .nav-utility-header .fsNavLevel1").accessibility_menu({
          mainMenuLabel: "Header Utility Menu"
        });
      }
    },

    constituentProfile: function() {
      //var seo = $('.fsConstituent.fsProfile .fsFullName').text().replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ").trim();
      var fullName = $('.fsFullName'),
      titles = $('.fsTitle'), //position
      degree = $('.fsDegreeInformation'),
      biography = $('.fsBiography'),
      employedSince = $('.fsEmployedSince'),
      personalUrl = $('.fsPersonalURL'),
      publications = $('.fsCustom5'), //list of publications
      presentations = $('.fsCustom7'), //list of presentations
      awards = $('.fsCustom8'), //list of awards
      coursesTaught = $('.fsCustom9'), //list of courses
      funFact = $('.fsCustom3'), //fun fact
      profileMain = $('.profile-output .fsElementContent'), //destination for above  
 
      contact = $('.fsContacts'),
      location = $('.fsRoom'),
      department = $('.fsDepartment'),
      socialFollow = $('.fsCustom10'), //social follows
      wingateLove = $('.fsCustom2'); //what I love about wingate

      //Main Directory Profile output
      profileMain.append(fullName).append(titles).append(degree).append(biography).append(funFact).append(publications).append(presentations).append(awards).append(coursesTaught);

      
       //H1 and SEO
       $('.profile-19 .profile-output .fsElementContent .fsFullName').replaceWith(function() {
        return $('<h1 class="fsFullName">'+ $(this).text().replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ").trim() + '</h1>');  
      });
      document.title = $('h1.fsFullName').text();


      //Degree cleanup
      if (degree.length) {
      var degrees = document.querySelector(".fsDegreeInformation .fsProfileSectionFieldValue").childNodes;
       for (var i=0,len=degrees.length;i<len;i++){
           if (degrees[i].nodeName == '#text'){
               $(degrees[i]).wrap('<li/>');
           }
         }
       }
       //end degree cleanup


      //contact info box
      contact.insertAfter('.fsConstituentProfile');
      contact.append(location).append(department).append(socialFollow).append(personalUrl).append(employedSince);

      if(wingateLove.length) {
        wingateLove.appendTo('.quote-box .fsElementContent');
      }
      else {
        $('.quote-box').css('display','none');
      }

      //Department Cleanup
      department.find('.fsProfileSectionFieldValue').append('<ul></ul');
      var departmentList = $('.fsDepartment .fsProfileSectionFieldValue').text();
      departmentList = departmentList.split(',');

      for (var k=0; k < departmentList.length; k++) {
        $('<li>'+ departmentList[k] + '</li>').appendTo('.fsDepartment ul');
      }
      //department cleanup end

      //display output
      $(window).load(function() {  
        $body.addClass('profile-loaded');
      });

        //trunacate long urls 
       $(".profile-19 .fsConstituent .fsPersonalURL .fsProfileSectionFieldValue").dotdotdot({
       height: 30,
        });
    },
    sectionLabel: function() {
      var $section = $('section');
      $section.each(function(){
        var sectionEleTitle = $(this).find('> header .fsElementTitle').text();
        if(!$(this).attr('aria-label')) {
          $(this).attr('aria-label', sectionEleTitle);
        }
      });
    }
  };

  UTIL.init();

}); //jQuery 
 

function backgroundImage(e){backgroundElement=e,$(backgroundElement).each(function(){var e=$(this).find("img").attr("src");$(this).css("background-image",'url("'+e+'")')})}function debounce(e,t,n){var i;return function(){var a=this,s=arguments,r=function(){i=null,n||e.apply(a,s)},o=n&&!i;clearTimeout(i),i=setTimeout(r,t),o&&e.apply(a,s)}}function placeholder(e,t){"use strict";var n,i,a=100,s=100;n=function r(){e.find("input.gsc-input").length?$.support.placeholder?e.find("input.gsc-input").attr("placeholder",t):e.find("input.gsc-input").attr("value",t):a>0&&(i=setTimeout(r,s),a-=1)},i=setTimeout(n,s)}function nano(e,t){return e.replace(/\{([\w\.]*)\}/g,function(e,n){for(var i=n.split("."),a=t[i.shift()],s=0,r=i.length;s<r;s++)a=a[i[s]];return"undefined"!=typeof a&&null!==a?a:""})}if($(".fsCalendar.fsGrid").length){$(".fsCalendar.fsGrid").addClass("smallCal");var eventview,scrollUp,onClickGridEvent=function(e){var t,n,i=$(e.target).closest(".fsCalendarDaybox");n=i.clone(),t=eventview.offset().top-16,$(".fsCalendarEventGrid .fsCalendarDaybox, .fsCalendarWeekendDayBox>div").removeClass("selected"),eventview.empty().append(n),i.addClass("selected"),$("html,body").animate({scrollTop:t},450)},onClickScrollUp=function(){var e=$(".fsCalendarMonthBrowser").offset().top-16;$("html,body").animate({scrollTop:e},450)},onAJAXSuccess=function(e,t,n,i){var a=$(i).hasClass("fsCalendar fsGrid");a&&initCalendar()},initCalendar=function(){eventview=$('<div id="event-view" />').insertAfter(".fsCalendarEventGrid"),scrollUp=$('<div class="scroll-up"><span>Back Up To Calendar</span></div>').insertAfter(eventview),scrollUp.on("click",onClickScrollUp),$(".fsCalendarDaybox").has(".fsCalendarInfo").addClass("has-info"),$(".fsCalendarEventGrid").on("click",".fsCalendarDaybox:not(.fsCalendarWeekendDayBox),.fsCalendarWeekendDayBox>div ",onClickGridEvent)};$(document).ajaxSuccess(onAJAXSuccess),initCalendar()}!function(e){"use strict";function t(t,n){var i=this;i.wrapper,i.numOfCol,i.menuTag,i.newCol,i.itemsPerColumn,i.element=e(t),i.defaults={columns:2,breakAt:0,itemsInColumn:!1,addWrapper:!1,wrapper:"<div class='col-wrap' />"},i.settings=e.extend({},i.defaults,n),i.init()}t.prototype={init:function(){var e=this;e.items=e.element.children(),e.classList=e.element.attr("class")?e.element.attr("class"):"",e.elementTag=e.element.prop("tagName").toLowerCase(),e.items.length<e.settings.breakAt||(e.columnPrep(),e.createColumns(),e.distributeItems())},columnPrep:function(){var t=this;t.element.addClass("menu-col column-1"),t.settings.addWrapper&&(t.wrapper=e(t.settings.wrapper),t.wrapper.insertBefore(t.element),t.element.appendTo(t.wrapper)),t.settings.itemsInColumn?t.itemsPerColumn=t.settings.columns:t.itemsPerColumn=Math.ceil(t.items.length/t.settings.columns),t.numOfCol=Math.ceil(t.items.length/t.itemsPerColumn)},createColumns:function(){for(var t=this,n=t.numOfCol;n>1;n--)t.newCol=e("<"+t.elementTag+">",{"class":t.classList+" menu-col column-"+n}),t.newCol.insertAfter(t.element)},distributeItems:function(){var t,n,i=this,a=1;e.each(i.items,function(s){s+1>i.itemsPerColumn&&(n=(s+1)%i.itemsPerColumn,(1==n||1==i.itemsPerColumn&&0==n)&&(a++,t=i.settings.addWrapper?i.wrapper.find(".column-"+a):i.element.siblings(".column-"+a)),e(this).appendTo(t))})}},e.fn.columns=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e,t,n,i){e.fn.doubleTapToGo=function(i){return!!("ontouchstart"in t||navigator.msMaxTouchPoints||navigator.userAgent.toLowerCase().match(/windows phone os 7/i))&&(t.isTouching=!1,this.each(function(i){var a=!1;e(this).on("touchstart",function(e){"touchstart"===e.type&&(t.isTouching=!0)}),e(this).on("click",function(n){var i=e(this);i[0]!=a[0]&&t.isTouching===!0&&(n.preventDefault(),a=i),t.isTouching=!1}),e(n).on("click touchstart MSPointerDown",function(t){for(var n=!0,i=e(t.target).parents(),s=0;s<i.length;s++)i[s]==a[0]&&(n=!1);n&&(a=!1)})}),this)}}(jQuery,window,document),function(e,t,n){var i=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=n(i):"function"==typeof define&&define.amd?define(function(){return t[e]=n(i)}):t[e]=n(i)}("enquire",this,function(e){"use strict";function t(e,t){var n,i=0,a=e.length;for(i;i<a&&(n=t(e[i],i),n!==!1);i++);}function n(e){return"[object Array]"===Object.prototype.toString.apply(e)}function i(e){return"function"==typeof e}function a(e){this.options=e,!e.deferSetup&&this.setup()}function s(t,n){this.query=t,this.isUnconditional=n,this.handlers=[],this.mql=e(t);var i=this;this.listener=function(e){i.mql=e,i.assess()},this.mql.addListener(this.listener)}function r(){if(!e)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!e("only all").matches}return a.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(e){return this.options===e||this.options.match===e}},s.prototype={addHandler:function(e){var t=new a(e);this.handlers.push(t),this.matches()&&t.on()},removeHandler:function(e){var n=this.handlers;t(n,function(t,i){if(t.equals(e))return t.destroy(),!n.splice(i,1)})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){t(this.handlers,function(e){e.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var e=this.matches()?"on":"off";t(this.handlers,function(t){t[e]()})}},r.prototype={register:function(e,a,r){var o=this.queries,l=r&&this.browserIsIncapable;return o[e]||(o[e]=new s(e,l)),i(a)&&(a={match:a}),n(a)||(a=[a]),t(a,function(t){i(t)&&(t={match:t}),o[e].addHandler(t)}),this},unregister:function(e,t){var n=this.queries[e];return n&&(t?n.removeHandler(t):(n.clear(),delete this.queries[e])),this}},new r}),function(e){function t(e){var t=e.createElement("script"),n=e.scripts[0];t.src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js",t.async=!0,n.parentNode.insertBefore(t,n)}t(e);var n,i=e.getElementsByClassName("fsForm");if(i.length)for(var a=0;a<i.length;a++)n=i[a].getElementsByTagName("iframe")[0],n.onload=function(){this.contentWindow.WebFontConfig=window.WebFontConfig,t(this.contentDocument)}}(document),function(e){"use strict";function t(t,n){var i=this,a={mediaTemplate:['<article class="universal-slide">','<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />','<div class="caption-wrapper">','<div class="caption-title">{captionTitle}</div>','<div class="caption-desc">{captionDesc}</div>',"</div>","</article>"],bp:600,callback:null,url:null};i.element=t,i.container=t,i.settings=e.extend(!0,{},a,n),i.url="",i.init()}function n(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}t.prototype={init:function(){var e=this;e.element.classList.contains("fsMedia")?(e.container=e.element.getElementsByClassName("fsMediaCustomPlayer")[0],e.url=e.container.getAttribute("data-playlisturl")):e.settings.url&&(e.url=e.settings.url),e.html=Array.isArray(e.settings.mediaTemplate)?e.settings.mediaTemplate.join("\n"):e.settings.mediaTemplate,e.getContent()},getContent:function(){var t=this;e.getJSON(t.url).done(function(e){for(var i=e.objects,a=0;a<i.length;a++){var s=n(nano(t.html,{imgSrc:window.innerWidth>t.settings.bp?i[a].full_path:i[a].mobile_path,captionTitle:i[a].object_title,captionDesc:i[a].object_description}));0==s.textContent.trim().length&&s.getElementsByClassName("caption-wrapper").length&&s.getElementsByClassName("caption-wrapper")[0].classList.add("is-empty"),t.container.appendChild(s)}t.callback()})},callback:function(){var e=this;"function"==typeof e.settings.callback&&e.settings.callback.call()}},e.fn.mediaPull=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e){"use strict";function t(t,n){function i(){e.getJSON(r.url).done(function(e){s.initialSlide=parseInt(Math.ceil(Math.random()*e.objects.length)),a()})}function a(){r.settings=e.extend(!0,{},r.defaults,n),r.init()}var s,r=this;r.element=t,r.isMedia=!1,r.autoplay=!1,r.randomize=!1,r.html="",r.element.classList.contains("fsMedia")?r.isMedia=!0:r.element.classList.contains("fsMediaCustomPlayer")&&(r.element=e(r.element).parents(".fsMedia")[0],r.isMedia=!0),r.isMedia&&(r.autoplay=e.parseJSON(e(r.element).find(".fsMediaCustomPlayer").attr("data-autoplay")),r.randomize=e.parseJSON(e(r.element).find(".fsMediaCustomPlayer").attr("data-randomstart")),r.url=e(r.element).find(".fsMediaCustomPlayer").attr("data-playlisturl")),s={slidesToShow:1,accessibility:!0,dots:!0,arrows:!0,autoplay:r.autoplay,pauseOnHover:!1,adaptiveHeight:!0,initialSlide:r.randomize?i():0},r.defaults={mediaTemplate:['<article class="universal-slide">','<img src="{imgSrc}" alt="{captionTitle}" class="universal-img" />','<div class="caption-wrapper">','<div class="caption-title">{captionTitle}</div>','<div class="caption-desc">{captionDesc}</div>',"</div>","</article>"],slick:s,bp:600,preSlickCallback:null,callback:null},r.randomize||a()}function n(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes[0]}function i(t){t.classList.toggle("slider-playing"),t.classList.toggle("slider-paused"),t.classList.contains("slider-playing")?e(t).slick("slickPlay"):e(t).slick("slickPause")}t.prototype={init:function(){var e=this;e.slider=e.isMedia?e.element.getElementsByClassName("fsMediaCustomPlayer")[0]:e.element,e.slider.classList.add("fsCustomSlider"),e.html=Array.isArray(e.settings.mediaTemplate)?e.settings.mediaTemplate.join("\n"):e.settings.mediaTemplate,e.isMedia?e.sliderPrep():document.body.classList.contains("fsDraftMode")||e.slickInit()},sliderPrep:function(){var t=this;e(t.element).mediaPull({mediaTemplate:t.settings.mediaTemplate,bp:t.settings.bp,callback:function(){t.slickInit()}})},slickInit:function(){var t=this,a=e(t.slider);a.on("init",function(e,a){if(t.settings.slick.autoplay&&a.$slides.length>1){var s=n("<button class='slider-play-btn'>Play</button>");s.addEventListener("click",function(){i(t.slider)}),t.slider.insertBefore(s,t.slider.firstChild),a.options.autoplay?t.slider.classList.add("slider-playing"):t.slider.classList.add("slider-paused")}"function"==typeof t.settings.callback&&t.settings.callback.call(t,t.element)}),"function"==typeof t.settings.preSlickCallback&&t.settings.preSlickCallback.call(t,t.element),a.slick(t.settings.slick)}},e.fn.mediaSlider=function(e){this.each(function(){new t(this,e)})}}(jQuery),function(e,t){function n(e,t,n){var i=e.children(),a=!1;e.empty();for(var r=0,o=i.length;r<o;r++){var l=i.eq(r);if(e.append(l),n&&e.append(n),s(e,t)){l.remove(),a=!0;break}n&&n.detach()}return a}function i(t,n,r,o,l){var c=!1,d="a, table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",u="script, .dotdotdot-keep";return t.contents().detach().each(function(){var f=this,p=e(f);if("undefined"==typeof f)return!0;if(p.is(u))t.append(p);else{if(c)return!0;t.append(p),!l||p.is(o.after)||p.find(o.after).length||t[t.is(d)?"after":"append"](l),s(r,o)&&(c=3==f.nodeType?a(p,n,r,o,l):i(p,n,r,o,l)),c||l&&l.detach()}}),n.addClass("is-truncated"),c}function a(t,n,i,a,o){var d=t[0];if(!d)return!1;var f=c(d),p=f.indexOf(" ")!==-1?" ":"　",h="letter"==a.wrap?"":p,m=f.split(h),v=-1,g=-1,y=0,C=m.length-1;for(a.fallbackToLetter&&0==y&&0==C&&(h="",m=f.split(h),C=m.length-1);y<=C&&(0!=y||0!=C);){var b=Math.floor((y+C)/2);if(b==g)break;g=b,l(d,m.slice(0,g+1).join(h)+a.ellipsis),i.children().each(function(){e(this).toggle().toggle()}),s(i,a)?(C=g,a.fallbackToLetter&&0==y&&0==C&&(h="",m=m[0].split(h),v=-1,g=-1,y=0,C=m.length-1)):(v=g,y=g)}if(v==-1||1==m.length&&0==m[0].length){var w=t.parent();t.detach();var x=o&&o.closest(w).length?o.length:0;if(w.contents().length>x?d=u(w.contents().eq(-1-x),n):(d=u(w,n,!0),x||w.detach()),d&&(f=r(c(d),a),l(d,f),x&&o)){var T=o.parent();e(d).parent().append(o),e.trim(T.html())||T.remove()}}else f=r(m.slice(0,v+1).join(h),a),l(d,f);return!0}function s(e,t){return e.innerHeight()>t.maxHeight}function r(t,n){for(;e.inArray(t.slice(-1),n.lastCharacter.remove)>-1;)t=t.slice(0,-1);return e.inArray(t.slice(-1),n.lastCharacter.noEllipsis)<0&&(t+=n.ellipsis),t}function o(e){return{width:e.innerWidth(),height:e.innerHeight()}}function l(e,t){e.innerText?e.innerText=t:e.nodeValue?e.nodeValue=t:e.textContent&&(e.textContent=t)}function c(e){return e.innerText?e.innerText:e.nodeValue?e.nodeValue:e.textContent?e.textContent:""}function d(e){do e=e.previousSibling;while(e&&1!==e.nodeType&&3!==e.nodeType);return e}function u(t,n,i){var a,s=t&&t[0];if(s){if(!i){if(3===s.nodeType)return s;if(e.trim(t.text()))return u(t.contents().last(),n)}for(a=d(s);!a;){if(t=t.parent(),t.is(n)||!t.length)return!1;a=d(t[0])}if(a)return u(e(a),n)}return!1}function f(t,n){return!!t&&("string"==typeof t?(t=e(t,n),!!t.length&&t):!!t.jquery&&t)}function p(e){for(var t=e.innerHeight(),n=["paddingTop","paddingBottom"],i=0,a=n.length;i<a;i++){var s=parseInt(e.css(n[i]),10);isNaN(s)&&(s=0),t-=s}return t}if(!e.fn.dotdotdot){e.fn.dotdotdot=function(t){if(0==this.length)return e.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){e(this).dotdotdot(t)});var a=this,r=a.contents();a.data("dotdotdot")&&a.trigger("destroy.dot"),a.data("dotdotdot-style",a.attr("style")||""),a.css("word-wrap","break-word"),"nowrap"===a.css("white-space")&&a.css("white-space","normal"),a.bind_events=function(){return a.bind("update.dot",function(t,o){switch(a.removeClass("is-truncated"),t.preventDefault(),t.stopPropagation(),typeof l.height){case"number":l.maxHeight=l.height;break;case"function":l.maxHeight=l.height.call(a[0]);break;default:l.maxHeight=p(a)}l.maxHeight+=l.tolerance,"undefined"!=typeof o&&(("string"==typeof o||"nodeType"in o&&1===o.nodeType)&&(o=e("<div />").append(o).contents()),o instanceof e&&(r=o)),m=a.wrapInner('<div class="dotdotdot" />').children(),m.contents().detach().end().append(r.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",width:"auto",border:"none",padding:0,margin:0});var d=!1,u=!1;return c.afterElement&&(d=c.afterElement.clone(!0),d.show(),c.afterElement.detach()),s(m,l)&&(u="children"==l.wrap?n(m,l,d):i(m,a,m,l,d)),m.replaceWith(m.contents()),m=null,e.isFunction(l.callback)&&l.callback.call(a[0],u,r),c.isTruncated=u,u}).bind("isTruncated.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(a[0],c.isTruncated),c.isTruncated}).bind("originalContent.dot",function(e,t){return e.preventDefault(),e.stopPropagation(),"function"==typeof t&&t.call(a[0],r),r}).bind("destroy.dot",function(e){e.preventDefault(),e.stopPropagation(),a.unwatch().unbind_events().contents().detach().end().append(r).attr("style",a.data("dotdotdot-style")||"").removeClass("is-truncated").data("dotdotdot",!1)}),a},a.unbind_events=function(){return a.unbind(".dot"),a},a.watch=function(){if(a.unwatch(),"window"==l.watch){var t=e(window),n=t.width(),i=t.height();t.bind("resize.dot"+c.dotId,function(){n==t.width()&&i==t.height()&&l.windowResizeFix||(n=t.width(),i=t.height(),u&&clearInterval(u),u=setTimeout(function(){a.trigger("update.dot")},100))})}else d=o(a),u=setInterval(function(){if(a.is(":visible")){var e=o(a);d.width==e.width&&d.height==e.height||(a.trigger("update.dot"),d=e)}},500);return a},a.unwatch=function(){return e(window).unbind("resize.dot"+c.dotId),u&&clearInterval(u),a};var l=e.extend(!0,{},e.fn.dotdotdot.defaults,t),c={},d={},u=null,m=null;return l.lastCharacter.remove instanceof Array||(l.lastCharacter.remove=e.fn.dotdotdot.defaultArrays.lastCharacter.remove),l.lastCharacter.noEllipsis instanceof Array||(l.lastCharacter.noEllipsis=e.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis),c.afterElement=f(l.after,a),c.isTruncated=!1,c.dotId=h++,a.data("dotdotdot",!0).bind_events().trigger("update.dot"),l.watch&&a.watch(),a},e.fn.dotdotdot.defaults={ellipsis:"... ",wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0},e.fn.dotdotdot.defaultArrays={lastCharacter:{remove:[" ","　",",",";",".","!","?"],noEllipsis:[]}},e.fn.dotdotdot.debug=function(e){};var h=1,m=e.fn.html;e.fn.html=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?this.trigger("update",[n]):m.apply(this,arguments)};var v=e.fn.text;e.fn.text=function(n){return n!=t&&!e.isFunction(n)&&this.data("dotdotdot")?(n=e("<div />").text(n).html(),this.trigger("update",[n])):v.apply(this,arguments)}}}(jQuery),jQuery(document).ready(function(e){e(".dot-ellipsis").each(function(){var t=e(this).hasClass("dot-resize-update"),n=e(this).hasClass("dot-timer-update"),i=0,a=e(this).attr("class").split(/\s+/);e.each(a,function(e,t){var n=t.match(/^dot-height-(\d+)$/);null!==n&&(i=Number(n[1]))});var s=new Object;n&&(s.watch=!0),t&&(s.watch="window"),i>0&&(s.height=i),e(this).dotdotdot(s)})}),jQuery(window).on("load",function(){jQuery(".dot-ellipsis.dot-load-update").trigger("update.dot")}),function(e){var t=(e("body"),!e(".fsComposeMode").length),n=(e(window),e(".fsSlideshow.map-slideshow-element"),900),i={init:function(){t&&(e(".campus-map.point-plotter").length?this.plotPoints():(this.legend(),this.mapContainer()),this.arrangePoints())},legend:function(){var t=e(".map-legend .fsListLevel1 > li").length;t<5?e(".map-legend .fsListLevel1").addClass("small"):t<11?e(".map-legend .fsListLevel1").addClass("medium"):e(".map-legend .fsListLevel1").addClass("large")},plotPoints:function(){e(document).on("click",".copyButton",function(){var t=e("<input>");e("body").append(t),t.val(e(".html-markup").text()).select(),document.execCommand("copy"),t.remove(),e(".copyButton").addClass("success").html("Copied")}),e(window).on("load",function(){function t(t,n){e(".coordinates-popup").length&&e(".coordinates-popup").remove();var s=n.offset().left,r=n.offset().top;finalX=((t.pageX-s)/i*100).toFixed(2),finalY=((t.pageY-r)/a*100).toFixed(2),console.log(finalY),e('<div class="coordinates-popup"><span class="html-markup">&lt;div data-posx="'+finalX+'" data-posy="'+finalY+'"&gt;LOCATION TITLE&lt;/div&gt;</span><button class="copyButton">Copy</button></div>').prependTo(".map-container")}var n=e(".map-container > header"),i=n.width(),a=n.height();e(".point-plotter .map-container > header").on("click",function(e){t(e,n)})})},arrangePoints:function(){e(".map-points .fsElementFooterContent > div").addClass("point-coordinates"),e(".map-points .fsResourceCollectionLink").wrapInner("<span />"),e(".map-points .point-coordinates").each(function(t){var n=e(this).attr("data-posx"),i=e(this).attr("data-posy");e(".map-points .fsListLevel1 > li.fsListItem").eq(t).css({left:n+"%",top:i+"%"})}),e(".map-points").appendTo(".map-container > header"),e(".map-legend .fsListLevel1 > li.fsListItem").each(function(t){e(this).on("click",function(){e(".map-points .fsListLevel1 > li.fsListItem").removeClass("active-point"),e(".map-points .fsListLevel1 > li.fsListItem").eq(t).addClass("active-point")})})},mapContainer:function(){e(".map-container > .fsElementContent").prepend('<button class="close-map">close</button>'),e(".fsResourceCollectionLink").on("click",function(){e(".map-container").addClass("active"),e("html, body").animate({scrollTop:e(".map-slideshow-element").offset().top-30},700)}),e(document).on("click",function(t){e(t.target).closest(".map-slideshow-element, .map-legend .fsStyleDefaultList, .fsResourceCollectionLink").length||(e(".map-container").removeClass("active"),e(".map-points .fsListLevel1 > li.fsListItem").removeClass("active-point"))})},gridSlideshow:function(){var t=e(".map-slideshow-element");t.find("article.fsResource").each(function(){var t=e(this).find("figure > picture"),n=e(this).find(".fsTitle");e(this).find("figcaption"),e(this).find("figure");t.append(n)});var i=setInterval(function(){e(".map-slideshow-element article img").length?(clearInterval(i),t.find(".fsListItems.fsStyleOneColumn").slick({infinite:!0,slidesToShow:1,slidesToScroll:1,speed:400,fade:!0,cssEase:"linear",responsive:[{breakpoint:n,settings:{adaptiveHeight:!0}}]}),t.addClass("show")):t.addClass("empty")},250)}};i.init(),slideshowAJAXSuccess=function(e,t,n,a){i.gridSlideshow()},e(document).ajaxSuccess(slideshowAJAXSuccess)}(jQuery),function(e){"use strict";var t={48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};e.fn.accessibility_menu=function(n){var i=e.extend({menuClass:"menu-item-open",mainMenuLabel:"Main Menu",mainMenuRole:"navigation",topMenuRole:"menubar",listItemsRole:"menuitem",subNavRole:"menu",firstTab:"level2"},n),a=e(this),s=".fsNavPageInfo",r=".fsNavLevel1",o='ul[class^="fsNavLevel"]',l=".fsNavPageDescription",c=a.find("> li > a");e(this).parent().attr("role",i.mainMenuRole).attr("aria-label",i.mainMenuLabel),e(this).attr("role",i.topMenuRole).find("li").attr("role",i.listItemsRole),e(this).find(o).attr("role",i.subNavRole),e(this).find(s).find("a").attr("tabIndex",-1),e(c).each(function(){e(this).next(s).length>0&&e(this).parent("li").attr("aria-haspopup","true").find(s).attr("aria-hidden","true")}),e(c).bind("focus mouseenter mouseleave",function(){var t=new Array;if(e(this).parents(r).find("> li > a").removeAttr("tabindex"),e(this).parents(r).find("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true").find("a").attr("tabindex",-1),e(this).next(s).attr("aria-hidden","false").parent("li").addClass(i.menuClass),t.push(e(this)[0]),"level2"==i.firstTab){if(e(this).next(s).find(o).find("a").length)for(var n=0;n<e(this).next(s).find(o).find("a").length;n++)t.push(e(this).next(s).find(o).find("a")[n]);if(e(this).next(s).find(l).find("a").length)for(var a=0;a<e(this).next(s).find(l).find("a").length;a++)t.push(e(this).next(s).find(l).find("a")[a])}else if("pagedesc"==i.firstTab){if(e(this).next(s).find(l).find("a").length)for(var c=0;c<e(this).next(s).find(l).find("a").length;c++)t.push(e(this).next(s).find(l).find("a")[c]);if(e(this).next(s).find(o).find("a").length)for(var d=0;d<e(this).next(s).find(o).find("a").length;d++)t.push(e(this).next(s).find(o).find("a")[d])}for(var u=0;u<t.length;u++)t[u].setAttribute("tabindex",u)}),e(this).on("mouseleave",function(){e(this).find("> li > a").removeAttr("tabindex"),e(this).find("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true").find("a").attr("tabIndex",-1)}),e(c).keydown(function(n){var a=e(this).parent("li").find(s).find("a").length;if(38==n.keyCode)n.preventDefault(),e(this).parent("li").find(s).find("a").length&&e(this).parent("li").find(s).find("a[tabindex="+a+"]").focus();else if(39==n.keyCode)n.preventDefault(),0==e(this).parent("li").next("li").length?e(this).parents(r).find("> li").first().find("a").first().focus():e(this).parent("li").next("li").find("a").first().focus();else if(40==n.keyCode)e(this).parent("li").find(s).find("a").length&&(n.preventDefault(),e(this).parent("li").addClass(i.menuClass).find(s).attr("aria-hidden","false"),e(this).parent("li").find("a[tabindex=1]").focus());else if(37==n.keyCode)n.preventDefault(),0==e(this).parent("li").prev("li").length?e(this).parents(r).find("> li").last().find("a").first().focus():e(this).parent("li").prev("li").find("a").first().focus();else if(9==n.keyCode)if(n.shiftKey)if(0==e(this).parent("li").prev("li").length)e(this).parents(r).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true").find("a").attr("tabIndex",-1);else if(e(this).parent("li").prev("li").length){n.preventDefault();var o=e(this).parent("li").prev("li").find(s).find("a").length;e(this).parents(r).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true").find("a").attr("tabIndex",-1),e(this).parent("li").prev("li").addClass(i.menuClass).find(s).attr("aria-hidden","false"),e(this).parent("li").prev("li").find(">a").focus().parent().find(s).find("a[tabindex="+o+"]").focus()}else e(this).parents(r).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true").find("a").attr("tabIndex",-1);else e(this).parent("li").find(s).find("a").length&&(n.preventDefault(),e(this).parent("li").addClass(i.menuClass).find(s).attr("aria-hidden","false"),e(this).parent("li").find("a[tabindex=1]").focus());else 32==n.keyCode?(n.preventDefault(),window.location=e(this).attr("href")):27==n.keyCode?(n.preventDefault(),e("."+i.menuClass).removeClass(i.menuClass).find("> a").removeAttr("tabindex").parent("li").find(s).attr("aria-hidden","true").find("a").attr("tabIndex",-1)):e(this).parent("li").find(s+"[aria-hidden=false] a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),!1})});var d=e(this).find(s).find("a");e(d).bind("focus mouseenter mouseleave",function(){e(this).parent().parent().find("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true"),e(this).next(s).attr("aria-hidden","false").parentsUntil(r,"li").addClass(i.menuClass)}),e(d).keydown(function(n){var a=e(this).parents(s).find("a").length,o=parseInt(e(this).attr("tabindex"));if(38==n.keyCode)n.preventDefault(),1==o?e(this).parents(s).parent("li").find("a").first().focus():e(this).parents(s).find("a[tabindex="+(o-1)+"]").parentsUntil(r,"li").addClass(i.menuClass).find("a[tabindex="+(o-1)+"]").focus();else if(39==n.keyCode)n.preventDefault(),0==e(this).parents(r).find("a[tabindex='0']").parent("li").next("li").length?e(this).parents(r).find("> li").first().find("a").first().focus():e(this).parents(r).find("a[tabindex='0']").parent("li").next("li").find("a").first().focus();else if(40==n.keyCode)n.preventDefault(),o==a?e(this).parents(s).parent("li").find("a").first().focus():e(this).parents(s).find("a[tabindex="+(o+1)+"]").focus();else if(27==n.keyCode||37==n.keyCode)n.preventDefault(),e("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true"),e(this).parentsUntil(r,"li").find("a").first().focus();else if(9==n.keyCode)n.shiftKey?(n.preventDefault(),1==o?e(this).parents(s).parent("li").find("a").first().focus():e(this).parents(s).find("a[tabindex="+(o-1)+"]").parentsUntil(r,"li").addClass(i.menuClass).find("a[tabindex="+(o-1)+"]").focus()):o==a?e(this).parents(s).parent("li").next("li").length?(n.preventDefault(),e(this).parents(s).parent("li").next("li").find("a").first().focus()):(e(this).parents(r).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true").find("a").attr("tabIndex",-1)):(n.preventDefault(),e(this).parents(s).find("a[tabindex="+(o+1)+"]").focus());else if(32==n.keyCode)n.preventDefault(),window.location=e(this).attr("href");else{var l=!1;e(this).parent("li").nextAll("li").find("a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),l=!0,!1}),l||e(this).parent("li").prevAll("li").find("a").each(function(){if(e(this).text().substring(0,1).toLowerCase()==t[n.keyCode])return e(this).focus(),!1})}}),e(document).click(function(){e(this).parents(r).find("> li > a").removeAttr("tabindex"),e("."+i.menuClass).removeClass(i.menuClass).find(s).attr("aria-hidden","true").find("a").attr("tabIndex",-1)}),e(this).click(function(e){e.stopPropagation()})}}(jQuery),!function(e,t,n){function i(e,t){return typeof e===t}function a(){var e,t,n,a,s,r,o;for(var l in b)if(b.hasOwnProperty(l)){if(e=[],t=b[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(a=i(t.fn,"function")?t.fn():t.fn,s=0;s<e.length;s++)r=e[s],o=r.split("."),1===o.length?x[o[0]]=a:(!x[o[0]]||x[o[0]]instanceof Boolean||(x[o[0]]=new Boolean(x[o[0]])),x[o[0]][o[1]]=a),C.push((a?"":"no-")+o.join("-"))}}function s(e){var t=k.className,n=x._config.classPrefix||"";if(S&&(t=t.baseVal),x._config.enableJSClass){var i=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(i,"$1"+n+"js$2")}x._config.enableClasses&&(t+=" "+n+e.join(" "+n),S?k.className.baseVal=t:k.className=t)}function r(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):S?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function o(){var e=t.body;return e||(e=r(S?"svg":"body"),e.fake=!0),e}function l(e,n,i,a){var s,l,c,d,u="modernizr",f=r("div"),p=o();if(parseInt(i,10))for(;i--;)c=r("div"),c.id=a?a[i]:u+(i+1),f.appendChild(c);return s=r("style"),s.type="text/css",s.id="s"+u,(p.fake?p:f).appendChild(s),p.appendChild(f),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(t.createTextNode(e)),f.id=u,p.fake&&(p.style.background="",p.style.overflow="hidden",d=k.style.overflow,k.style.overflow="hidden",k.appendChild(p)),l=n(f,e),p.fake?(p.parentNode.removeChild(p),k.style.overflow=d,k.offsetHeight):f.parentNode.removeChild(f),!!l}function c(e,t){return!!~(""+e).indexOf(t)}function d(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function u(e,t){return function(){return e.apply(t,arguments)}}function f(e,t,n){var a;for(var s in e)if(e[s]in t)return n===!1?e[s]:(a=t[e[s]],i(a,"function")?u(a,n||t):a);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function h(t,n,i){var a;if("getComputedStyle"in e){a=getComputedStyle.call(e,t,n);var s=e.console;if(null!==a)i&&(a=a.getPropertyValue(i));else if(s){var r=s.error?"error":"log";s[r].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else a=!n&&t.currentStyle&&t.currentStyle[i];return a}function m(t,i){var a=t.length;if("CSS"in e&&"supports"in e.CSS){for(;a--;)if(e.CSS.supports(p(t[a]),i))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];a--;)s.push("("+p(t[a])+":"+i+")");return s=s.join(" or "),l("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==h(e,null,"position")})}return n}function v(e,t,a,s){function o(){u&&(delete $.style,delete $.modElem)}if(s=!i(s,"undefined")&&s,!i(a,"undefined")){var l=m(e,a);if(!i(l,"undefined"))return l}for(var u,f,p,h,v,g=["modernizr","tspan","samp"];!$.style&&g.length;)u=!0,$.modElem=r(g.shift()),$.style=$.modElem.style;for(p=e.length,f=0;p>f;f++)if(h=e[f],v=$.style[h],c(h,"-")&&(h=d(h)),$.style[h]!==n){if(s||i(a,"undefined"))return o(),"pfx"!=t||h;try{$.style[h]=a}catch(y){}if($.style[h]!=v)return o(),"pfx"!=t||h}return o(),!1}function g(e,t,n,a,s){var r=e.charAt(0).toUpperCase()+e.slice(1),o=(e+" "+D.join(r+" ")+r).split(" ");return i(t,"string")||i(t,"undefined")?v(o,t,a,s):(o=(e+" "+L.join(r+" ")+r).split(" "),f(o,t,n))}function y(e,t,i){return g(e,n,n,t,i)}var C=[],b=[],w={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){b.push({name:e,fn:t,options:n})},addAsyncTest:function(e){b.push({name:null,fn:e})}},x=function(){};x.prototype=w,x=new x,x.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect);var T=w._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];w._prefixes=T;var k=t.documentElement,S="svg"===k.nodeName.toLowerCase();S||!function(e,t){function n(e,t){var n=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var e=C.elements;return"string"==typeof e?e.split(" "):e;
}function a(e,t){var n=C.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),C.elements=n+" "+e,c(t)}function s(e){var t=y[e[v]];return t||(t={},g++,e[v]=g,y[g]=t),t}function r(e,n,i){if(n||(n=t),u)return n.createElement(e);i||(i=s(n));var a;return a=i.cache[e]?i.cache[e].cloneNode():m.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e),!a.canHaveChildren||h.test(e)||a.tagUrn?a:i.frag.appendChild(a)}function o(e,n){if(e||(e=t),u)return e.createDocumentFragment();n=n||s(e);for(var a=n.frag.cloneNode(),r=0,o=i(),l=o.length;l>r;r++)a.createElement(o[r]);return a}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return C.shivMethods?r(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(C,t.frag)}function c(e){e||(e=t);var i=s(e);return!C.shivCSS||d||i.hasCSS||(i.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),u||l(e,i),e}var d,u,f="3.7.3",p=e.html5||{},h=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,m=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,v="_html5shiv",g=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",d="hidden"in e,u=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){d=!0,u=!0}}();var C={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:f,shivCSS:p.shivCSS!==!1,supportsUnknownElements:u,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:c,createElement:r,createDocumentFragment:o,addElements:a};e.html5=C,c(t),"object"==typeof module&&module.exports&&(module.exports=C)}("undefined"!=typeof e?e:this,t);var E="Moz O ms Webkit",L=w._config.usePrefixes?E.toLowerCase().split(" "):[];w._domPrefixes=L,x.addTest("audio",function(){var e=r("audio"),t=!1;try{t=!!e.canPlayType,t&&(t=new Boolean(t),t.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),t.mp3=e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/,""),t.opus=e.canPlayType('audio/ogg; codecs="opus"')||e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/,""),t.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),t.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(n){}return t}),x.addTest("video",function(){var e=r("video"),t=!1;try{t=!!e.canPlayType,t&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),x.addTest("inlinesvg",function(){var e=r("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var P="CSS"in e&&"supports"in e.CSS,M="supportsCSS"in e;x.addTest("supports",P||M);var A={}.toString;x.addTest("svgclippaths",function(){return!!t.createElementNS&&/SVGClipPath/.test(A.call(t.createElementNS("http://www.w3.org/2000/svg","clipPath")))});var I=function(){var t=e.matchMedia||e.msMatchMedia;return t?function(e){var n=t(e);return n&&n.matches||!1}:function(t){var n=!1;return l("@media "+t+" { #modernizr { position: absolute; } }",function(t){n="absolute"==(e.getComputedStyle?e.getComputedStyle(t,null):t.currentStyle).position}),n}}();w.mq=I;var j=w.testStyles=l;x.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var i=["@media (",T.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");j(i,function(e){n=9===e.offsetTop})}return n});var D=w._config.usePrefixes?E.split(" "):[];w._cssomPrefixes=D;var N={elem:r("modernizr")};x._q.push(function(){delete N.elem});var $={style:N.elem.style};x._q.unshift(function(){delete $.style}),w.testProp=function(e,t,i){return v([e],n,t,i)},w.testAllProps=g,w.testAllProps=y,x.addTest("cssanimations",y("animationName","a",!0)),function(){x.addTest("csscolumns",function(){var e=!1,t=y("columnCount");try{e=!!t,e&&(e=new Boolean(e))}catch(n){}return e});for(var e,t,n=["Width","Span","Fill","Gap","Rule","RuleColor","RuleStyle","RuleWidth","BreakBefore","BreakAfter","BreakInside"],i=0;i<n.length;i++)e=n[i].toLowerCase(),t=y("column"+n[i]),("breakbefore"===e||"breakafter"===e||"breakinside"==e)&&(t=t||y(n[i])),x.addTest("csscolumns."+e,t)}(),x.addTest("flexbox",y("flexBasis","1px",!0)),x.addTest("flexboxlegacy",y("boxDirection","reverse",!0)),x.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&y("transform","scale(1)",!0)}),x.addTest("csstransforms3d",function(){return!!y("perspective","1px",!0)}),x.addTest("csstransitions",y("transition","all",!0));var B=function(t){var i,a=T.length,s=e.CSSRule;if("undefined"==typeof s)return n;if(!t)return!1;if(t=t.replace(/^@/,""),i=t.replace(/-/g,"_").toUpperCase()+"_RULE",i in s)return"@"+t;for(var r=0;a>r;r++){var o=T[r],l=o.toUpperCase()+"_"+i;if(l in s)return"@-"+o.toLowerCase()+"-"+t}return!1};w.atRule=B;var q=w.prefixed=function(e,t,n){return 0===e.indexOf("@")?B(e):(-1!=e.indexOf("-")&&(e=d(e)),t?g(e,t,n):g(e,"pfx"))};x.addTest("objectfit",!!q("objectFit"),{aliases:["object-fit"]}),a(),s(C),delete w.addTest,delete w.addAsyncTest;for(var _=0;_<x._q.length;_++)x._q[_]();e.Modernizr=x}(window,document),function(e){"use strict";e.fn.parentFocus=function(t,n,i){return this.each(function(){var a=e(this),s=a.closest(t);a.focus(function(){s.each(n)}).blur(function(){s.each(i||n)})})}}(jQuery),jQuery(function(e){"use strict";var t=e(".pub-browse"),n=e(".cat-toggle"),i=e("body");e(".pub-skip-link").insertBefore(".publications-2 #fsPageWrapper"),e(".pub-drawer-ribbon").insertBefore(".publications-2 #fsPageWrapper"),e(".pub-drawer-trigger").click(function(){e("body").toggleClass("drawer-active")}),e(document).on("click",function(t){e(t.target).closest("#fsMenu, .pub-drawer-trigger").length||i.removeClass("drawer-active")}),e(".publication2-search .fsElementToolsSearchButton").click(function(){i.removeClass("drawer-active")}),t.click(function(){i.toggleClass("issue-browser-open")}),n.click(function(){i.toggleClass("category-menu-open")}),e(".publications-2 .top-stories article").each(function(){var t=e(this).find(".fsTitle"),n=e(this).find(".fsReadMoreLink");e(this).append('<div class="top-story-caption"><div class="caption-inner"></div></div>'),t.appendTo(e(this).find(".top-story-caption .caption-inner")),n.appendTo(e(this).find(".top-story-caption .caption-inner"))});var a=setInterval(function(){e(".publications-2 .top-stories .fsPager").length&&(e(".publications-2 .top-stories .fsPager").wrapAll('<div class="paging-wrapper"></div>'),clearInterval(a))},100);e(".publications-2 .fsPostElement.fsPost").each(function(){var t=e(this).find(".fsTitle"),n=(e(this).find(".fsAuthor"),e(this).find(".fsDateTime"));t.insertAfter(n)});var s=e(".publications-2.post-page .fsComments .fsCommentCount").text().split(" ").shift()||0;e(".publications-2.post-page .share-comment-box .comment-count").text(s),e(".publications-2.post-page .fsSharingButtonsContainer").appendTo(".publications-2.post-page .share"),e(".post-page").on("click",".share-comment-box .share",function(t){e(".share-comment-box .share").addClass("open")}),e(".publications-2 .search-trigger a").click(function(e){e.preventDefault(),i.toggleClass("pub-search-active")}),e(document).on("click",function(t){e(t.target).closest(".share-comment-box .share").length||e(".post-page .share-comment-box .share").removeClass("open"),e(t.target).closest(".pub-browse, .issue-browser *").length||i.removeClass("issue-browser-open"),e(t.target).closest(".cat-toggle, .pub-categories *").length||i.removeClass("category-menu-open"),e(t.target).closest(".publications-2 .search-trigger *, .publication2-search").length||i.removeClass("pub-search-active")}),enquire.register("screen and (max-width:900px)",{match:function(){e("body:not(.fsComposeMode) .publication2-search").prependTo(".publications-2 .fsMenu")},unmatch:function(){e("body:not(.fsComposeMode) .publication2-search").appendTo(".publications-2 .header-top-section > .fsElementContent")},setup:function(){e("body:not(.fsComposeMode) .publication2-search").appendTo(".publications-2 .header-top-section > .fsElementContent")},deferSetup:!1,destroy:function(){}})}),$.fn.randomize=function(e){var t=e?$(this).find(e):$(this).children(),n=t.parent();return n.each(function(){$(this).children(e).sort(function(){return Math.round(Math.random())-.5}).detach().appendTo(this)}),this},function(e){var t=e({});e.subscribe=function(){t.on.apply(t,arguments)},e.unsubscribe=function(){t.off.apply(t,arguments)},e.publish=function(){t.trigger.apply(t,arguments)}}(jQuery);