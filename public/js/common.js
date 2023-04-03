"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if(!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
		document.addEventListener("click", function (event) {
			const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
			const menu = document.querySelector(".menu-mobile--js");
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		const toggle = document.querySelectorAll(".toggle-menu-mobile--js");
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		if (menu.classList.contains("active")) {
			toggle.forEach(element => element.classList.remove("on"));
			menu.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
			document.querySelector('.aside__body').classList.remove('active2');
		}

	},
	mobileMenu() { 
		const menu = document.querySelector(".menu-mobile--js");
		if (!menu) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			let link = event.target.closest(".menu-mobile .menu a"); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js.on'); //
			let catalogContainer = event.target.closest('.aside__body'); // (1)
			if (!container && !toggle && !catalogContainer) this.closeMenu();
		}, { passive: true });

		window.addEventListener('resize', () => {
			if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		}, { passive: true });
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+7(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	// /inputMask
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$(document).on('submit', "form", function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				Fancybox.close();
				Fancybox.show([{ src: "#modal-thanks", type: "inline" }]);
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		let parents = document.querySelectorAll('.dd-group-js');
		for (let parent of parents) {
			if (parent) {
				// childHeads, kind of funny))
				let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
				$(ChildHeads).click(function () {
					let clickedHead = this;

					$(ChildHeads).each(function () {
						if (this === clickedHead) {
							//parent element gain toggle class, style head change via parent
							$(this.parentElement).toggleClass('active');
							$(this.parentElement).find('.dd-content-js').slideToggle(function () {
								$(this).toggleClass('active');
							});
						}
						else {
							$(this.parentElement).removeClass('active');
							$(this.parentElement).find('.dd-content-js').slideUp(function () {
								$(this).removeClass('active');
							});
						}
					});

				});
			}
		}
	},
	imgToSVG() {
    const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);
	
			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;
	
						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};
	
		convertImages('.img-svg-js');
  },
};
const $ = jQuery;

function eventHandler() { 
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.getCurrentYear('.footer .footer__info p span');
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = 'screen/'+document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}
	
	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});
	
	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

	// modal window

	var asideSticky = new hcSticky('.aside', {
		mobileFirst: true,
		disable: true,
		stickTo: '.aside-wrap',
		responsive: {
			992: {
				disable: false,
			},
		}
  });

	var headerSticky = new hcSticky('header', {
		mobileFirst: true,
		disable: true,
		stickTo: '.main-center-wrap',
		responsive: {
			992: {
				disable: false,
			},
		}
  });

	const sOurProjectsswiper = new Swiper('.sOurProjects__swiper--js', {
		slidesPerView: 'auto',
		spaceBetween: 8,
		breakpoints: {
			768: {
				spaceBetween: 0,
			}
		}
	});
	const sNewssswiper = new Swiper('.sNews__swiper--js', {
		slidesPerView: 'auto',
		loop: true,
		spaceBetween: 4,
		navigation: {
			nextEl: '.sNews .swiper-button-next',
			prevEl: '.sNews .swiper-button-prev',
		},
	});

	let catalogBtn = document.querySelector('.top-btns__btn--js');
	let catalogContainer = document.querySelector('.aside__body');
	let catalogBackBtn = document.querySelector('.aside__close--js');
	let menuItemJs = document.querySelector('.menu-item--js');
	let toggleMenuItemJs = document.querySelector('.toggle-menu-mobile--js');
	if(catalogBtn) {
		catalogBtn.addEventListener('click', function(e) {
			e.preventDefault();
			this.classList.toggle('active');
			catalogContainer.classList.toggle('active');
			catalogBackBtn.classList.remove('active');
			$('body').toggleClass('fixed2');
		});
	}
	if(menuItemJs) {
		menuItemJs.addEventListener('click', function(e) {
			e.preventDefault();
			this.classList.toggle('active');
			catalogContainer.classList.toggle('active2');
			catalogBackBtn.classList.add('active');
		});
		toggleMenuItemJs.addEventListener('click', function() {
			catalogBackBtn.classList.remove('active');
			if(toggleMenuItemJs.classList.contains('on')) {
				catalogContainer.classList.remove('active2');
			}
		});
		catalogBackBtn.addEventListener('click', function() {
			catalogContainer.classList.remove('active2');
		});
		document.addEventListener('click', function(e) {
			let targetBtn = e.target.closest('.top-btns__btn--js'); 
			let targetCatalogActive = e.target.closest('.aside__body.active'); 
			if(!targetBtn && !targetCatalogActive) {
				catalogContainer.classList.remove('active');
				catalogBtn.classList.remove('active');
				$('body').removeClass('fixed2');
			}
		})
	};

	let sOurPartnersSwiperWraps = document.querySelectorAll('.sOurPartners__slider-wrap');
	if (sOurPartnersSwiperWraps){
		for (const sOurPartnersSwiperWrap of sOurPartnersSwiperWraps) {
			const sOurPartnersswiper = new Swiper((sOurPartnersSwiperWrap.querySelector('.sOurPartners__swiper--js')), {
				slidesPerView: 'auto',
				rewind: true, 
				// loop: true,
				effect: 'fade',
				fadeEffect: {
					crossFade: true
				},
				navigation: {
					nextEl: sOurPartnersSwiperWrap.querySelector('.swiper-button-next'),
					prevEl: sOurPartnersSwiperWrap.querySelector('.swiper-button-prev'),
				},
			});
		}
	};

	let defaultSliders = document.querySelectorAll('.defaultSwiper-js');
	if(defaultSliders) {
		for (const defaultSlider of defaultSliders) {
			const defaultSwiper = new Swiper(defaultSlider, {
				slidesPerView: 'auto',
				navigation: {
					nextEl: defaultSlider.querySelector('.swiper-button-next'),
					prevEl: defaultSlider.querySelector('.swiper-button-prev'),
				},
			});
		}
	}

	const sOurServicesSwiper = new Swiper('.sOurServices__swiper--js', {
		slidesPerView: 'auto',
		spaceBetween: 16,
		grid: {
			rows: 4,
		},
		navigation: {
			nextEl: '.sOurServices__swiper--js .swiper-button-next',
			prevEl: '.sOurServices__swiper--js .swiper-button-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 'auto',
				spaceBetween: 0,
				grid: {
					rows: 'auto',
				},
			}
		}
	});

	let mapLinks = document.querySelectorAll('[data-bs-toggle="popover"]');
	if(mapLinks) {
		for (const mapLink of mapLinks) {
			mapLink.addEventListener('click', function(e) {
				e.preventDefault();
				let mapPinCitys = document.querySelectorAll('.sMap__pin');
				for (let mapLink2 of mapLinks) {
					mapLink2.classList.remove('active');
				}
				for (let mapPinCity of mapPinCitys) {
					mapPinCity.classList.remove('active');
				}
				this.classList.toggle('active');

				function getCurrentMapPin(arr) {
					for (const item of arr) {
						if(mapLink.dataset.bsContent === item.dataset.city) {
							item.classList.add('active');
							return;
						}
					}
				};
				getCurrentMapPin(mapPinCitys);

			})
		}
		

	}
	
	var popoverTriggerList =  document.querySelectorAll('[data-bs-toggle="popover"]');
		for (const popoverTriggerEl of popoverTriggerList) {
 
		let popoverContent = {
			title: popoverTriggerEl.dataset.bsContent,
			projects: popoverTriggerEl.dataset.projects,
			href: popoverTriggerEl.dataset.href,
			linkText: popoverTriggerEl.dataset.linkText,
			// smu: popoverTriggerEl.dataset.smu,
			// sno: popoverTriggerEl.dataset.sno,
			// mu: popoverTriggerEl.dataset.mu, 
			// link: popoverTriggerEl.dataset.link, 
		}
			let link = (href, linkText) => {
				if (linkText && href) {
					return `<a href="${href}">${linkText}</a>`;
				}
				else {
					return '';
				}
			};
		let popoverInner = 
		`
			<div class="sMap__popover">
				<div class="sMap__title">${popoverContent.title}</div>
				<div class="sMap__text">${popoverContent.projects}</div>
				${link(popoverContent.href, popoverContent.linkText)}
			</div>
		`;
		const popover =  new bootstrap.Popover(popoverTriggerEl, {
			template:
				`
					<div class="popover" role="tooltip">
						<div class="popover-arrow"></div> 
						<h1 class="popover-header"></h1>
						${popoverInner}
					</div>`,
			trigger: 'focus',
			placement: 'top',
			delay: { "show": 100, "hide": 100 },
		})
		if (popoverTriggerEl.dataset.bsContent == "Москва"){
			bootstrap.Popover.getInstance(popoverTriggerEl).show();
			popoverTriggerEl.classList.add("active");
			document.querySelector('[data-city="Москва" ]').classList.add("active");
		}
		else{
			popoverTriggerEl.addEventListener('show.bs.popover', () => {
				bootstrap.Popover.getInstance('[data-bs-content="Москва"]').hide();
			})
		}
		// bootstrap.Popover.getOrCreateInstance(popoverTriggerEl).hide();
		};



	// document.addEventListener('mouseup', function (event) {
	// 	let popoverLink = event.target.closest('[data-bs-toggle="popover"]');
	// 	let mapPinCitys = document.querySelectorAll('.sMap__pin');
	// 	if (!popoverLink) {
	// 		for (let mapLink of mapLinks) {
	// 			mapLink.classList.remove('active');
	// 		}
	// 		for (let mapPinCity of mapPinCitys) {
	// 			mapPinCity.classList.remove('active');
	// 		}
	// 	}
	// })
 



	let showMoreText = document.querySelector('.toggle-text-js');
	if(showMoreText) {
		showMoreText.querySelector('a').addEventListener('click', function(e) {
			// let showMoreText = document.querySelector('.showMoreText-js');
			e.preventDefault();
			$('.showMoreText-js').toggle();
			$(showMoreText).toggleClass('active');
		})
	};

	AOS.init();

	var sProdCardThumbSwiper = new Swiper(".sProdCard__thumb-slider--js", {
		// spaceBetween: 10,
		slidesPerView: 'auto',
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});
	var sProdCardSwiper = new Swiper(".sProdCard__slider--js", {
		// spaceBetween: 10,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: sProdCardThumbSwiper,
		},
	});

	let closeJsBtns = document.querySelectorAll('.close-js');
	if (closeJsBtns) {
		for (let closeJsBtn of closeJsBtns) {
			closeJsBtn.addEventListener('click', function() {
				$(closeJsBtn).parent().fadeOut();
			})
		}
	}

};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }