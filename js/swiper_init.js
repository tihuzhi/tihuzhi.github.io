// swiper_init.js - 增强版防重复初始化
(function() {
    // 全局标记，确保只初始化一次
    if (window.swiperInitialized) {
        console.log('Swiper已初始化，跳过重复执行');
        return;
    }
    
    // 等待DOM完全加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSwiper);
    } else {
        initSwiper();
    }
    
    function initSwiper() {
        // 再次检查，防止重复
        if (window.swiperInitialized) return;
        
        var swiperContainer = document.querySelector('.blog-slider');
        if (!swiperContainer) {
            console.warn('未找到Swiper容器');
            return;
        }
        
        // 检查是否已经初始化过
        if (swiperContainer.classList.contains('swiper-initialized')) {
            console.warn('Swiper容器已标记为初始化过');
            return;
        }
        
        // 确保Swiper库已加载
        if (typeof Swiper === 'undefined') {
            console.error('Swiper库未加载');
            setTimeout(initSwiper, 100); // 100ms后重试
            return;
        }
        
        try {
            var swiper = new Swiper('.blog-slider', {
                passiveListeners: true,
                spaceBetween: 30,
                effect: 'fade',
                loop: false,
                autoplay: {
                    disableOnInteraction: true,
                    delay: 3000
                },
                mousewheel: false,
                pagination: {
                    el: '.blog-slider__pagination',
                    clickable: true,
                }
            });
            
            // 标记为已初始化
            swiperContainer.classList.add('swiper-initialized');
            window.swiperInitialized = true;
            console.log('Swiper初始化成功');
            
            // 鼠标悬停控制
            var container = document.getElementById('swiper_container');
            if (container) {
                container.onmouseenter = function() {
                    swiper.autoplay.stop();
                };
                container.onmouseleave = function() {
                    swiper.autoplay.start();
                };
            }
            
        } catch (error) {
            console.error('Swiper初始化失败:', error);
        }
    }
})();