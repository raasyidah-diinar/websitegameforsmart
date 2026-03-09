/*
02 -> sidebar toggle
03 -> search toggle
04 -> Box hover effect Style
05 -> Connect wallet toggle
06 -> chat box height adjust
07 -> input file
08 -> chat list toggle
09 -> notification toggle
10 -> header profile toggle
11 -> hide toggle items
13 -> top player slider
14 -> game swiper
16 -> custom tab list
17 -> custom accordion list
18 -> count down timer
19 -> earning chart (apex line chart)
20 -> Current Year
21 -> preloader
*/

window.initMainJS = () => {
  "use strict";

  // 02 -> sidebar toggle
  $(".sidebar-toggle-btn").off("click").on("click", function () {
    $(".sidebar").toggleClass("open");
    $(this).toggleClass("open");
  });

  // 03 -> search toggle
  $(".search-toggle-btn").off("click").on("click", function () {
    $(".search-bar").toggleClass("open");
  });

  // 04 -> Box hover effect Style 
  const targetBtn = document.querySelectorAll('.box-style')
  if (targetBtn) {
    targetBtn.forEach((element) => {
      element.addEventListener('mousemove', (e) => {
        const x = e.offsetX + 'px';
        const y = e.offsetY + 'px';
        element.style.setProperty('--x', x);
        element.style.setProperty('--y', y);
      })
    })
  }

  // 05 -> Connect wallet toggle
  $(".wallet-btn").off("click").on("click", function () {
    $(".connect-wallet-section").toggleClass("active");
  })
  $(".wallet-close-btn").off("click").on("click", function () {
    $(".connect-wallet-section").toggleClass("active");
  })

  $(".connect-wallet-overlay").off("click").on("click", function (e) {
    if ($(e.target).hasClass("connect-wallet-overlay")) {
      $(".connect-wallet-section").toggleClass("active");
    }
  })

  // 06 -> chat box height adjust
  $('.chat-body').scrollTop($(document).height());

  // 07 -> input file 
  $(".add-file-btn").off("click").on("click", function () {
    $("#add-file-input").click()
  })

  // 08 -> chat list toggle 
  $(".chat-list-toggle-btn").off("click").on("click", function () {
    $(".chat-list-area").toggleClass("open");
  })

  // 09 -> notification toggle
  $(".ntf-btn").off("click").on("click", function () {
    $(".notification-area").toggleClass("open");
  })

  // 10 -> header profile toggle
  $(".header-profile").off("click").on("click", function () {
    $(".user-account-popup").toggleClass("open");
  })

  // 11 -> hide toggle items
  $(document).off("click.hideToggle").on("click.hideToggle", function (event) {
    // sidebar hide
    if (!$(event.target).closest(".sidebar, .sidebar-toggle-btn").length) {
      $(".sidebar").removeClass("open");
      $(".sidebar-toggle-btn").removeClass("open");
    }
    // search bar hide
    if (!$(event.target).closest(".search-bar, .search-toggle-btn").length) {
      $(".search-bar").removeClass("open");
    }
    // notification hide
    if (!$(event.target).closest(".notification-area, .ntf-btn").length) {
      $(".notification-area").removeClass("open");
    }
    // profile popup hide
    if (!$(event.target).closest(".user-account-popup, .header-profile").length) {
      $(".user-account-popup").removeClass("open");
    }
    // chat list hide
    if (!$(event.target).closest(".chat-list-area, .chat-list-toggle-btn").length) {
      $(".chat-list-area").removeClass("open");
    }
  })

  // 14 -> game swiper
  if ($('.game-swiper').length > 0) {
    new Swiper('.game-swiper', {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 24,
      speed: 1000,
      freeMode: true,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: ".game-swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1200: { slidesPerView: 4 },
        1024: { slidesPerView: 3 },
        575: { slidesPerView: 2 },
      }
    });
  }

  if ($('.game-swiper2').length > 0) {
    new Swiper('.game-swiper2', {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 24,
      speed: 5000,
      freeMode: true,
      autoplay: {
        delay: 1,
      },
      pagination: {
        el: ".game-swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1400: { slidesPerView: 6 },
        1024: { slidesPerView: 4 },
        768: { slidesPerView: 3 },
        575: { slidesPerView: 2 },
      }
    });
  }

  // 16 -> custom tab list
  $(".tablinks .nav-links").off("click").on("click", function () {
    var targetTab = $(this).closest(".singletab");
    var navBtn = targetTab.find(".tablinks .nav-links");
    navBtn.removeClass('active');
    $(this).addClass('active');
    var indexNum = $(this).closest("li").index();
    var tabcontent = targetTab.find(".tabcontents .tabitem");
    $(tabcontent).removeClass('active');
    $(tabcontent).eq(indexNum).addClass('active');
  });

  // 17 -> custom accordion list
  $(".accordion-single .acc-header-area").off("click").on("click", function () {
    if ($(this).closest(".accordion-single").hasClass("active")) {
      $(this).closest(".accordion-single").removeClass("active");
      $(this).next(".acc-content-area").slideUp();
    } else {
      $(".accordion-single").removeClass("active");
      $(this).closest(".accordion-single").addClass("active");
      $(".acc-content-area").not($(this).next(".acc-content-area")).slideUp();
      $(this).next(".acc-content-area").slideToggle();
    }
  });

  // 19 -> earning chart (apex line chart)
  if (document.querySelector("#earning-chart")) {
    var options = {
      colors: ['#F62F1A', '#F6471C'],
      tooltip: {
        theme: 'dark',
        y: { formatter: (val) => "$" + val, title: { show: false } },
        x: { show: false }
      },
      series: [{ name: "Earnings", data: [0, 0, 150, 0, 0, 0, 0, 0, 0, 50, 0, 0] }],
      chart: {
        height: 150,
        type: 'line',
        zoom: { enabled: false },
        toolbar: { show: false },
        sparkline: { enabled: true, height: 100, width: '100%' }
      },
      grid: { show: false },
      xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], labels: { show: false } },
      yaxis: { labels: { show: false } },
      markers: { colors: ['#F76D1F'] },
    };
    var chart = new ApexCharts(document.querySelector("#earning-chart"), options);
    chart.render();
  }

  // 20 -> Current Year
  $(".currentYear").text(new Date().getFullYear());
};

$(document).ready(() => {
  window.initMainJS();
  
  // 21 -> preloader (handled in React now, but keeping for legacy compatibility if needed)
  setTimeout(() => {
    if (document.querySelector(".preloader")) {
      document.querySelector(".preloader").style.display = "none";
    }
  }, 1000);
});
