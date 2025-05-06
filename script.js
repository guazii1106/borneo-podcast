// 等待DOM完全加載
document.addEventListener('DOMContentLoaded', function() {
    // 獲取DOM元素
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    // 漢堡選單點擊事件
    hamburger.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // 漢堡選單動畫
        const bars = document.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // 平滑捲動到指定區域
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 關閉行動裝置選單
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                hamburger.classList.remove('active');
                
                const bars = document.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
            
            // 獲取目標區域
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // 計算捲動位置（考慮導航欄高度）
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            // 平滑捲動動畫
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 添加按鈕點擊動畫效果
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    });
    
    // 捲動時改變導航欄樣式
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.scrollY;
        
        // 控制導航欄顯示/隱藏
        if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
            // 向下捲動且不在頁面頂部，隱藏導航欄
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上捲動或在頁面頂部，顯示導航欄
            navbar.style.transform = 'translateY(0)';
        }
        
        // 更新導航欄樣式
        if (currentScrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(26, 60, 42, 0.95)';
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-color)';
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        // 控制回到頂部按鈕的顯示/隱藏
        if (currentScrollTop > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
        
        lastScrollTop = currentScrollTop;
    });
    
    // 回到頂部按鈕功能
    const backToTopBtn = document.getElementById('back-to-top');
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 為所有按鈕添加懸停動畫效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
        
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // 為團隊成員卡片添加動畫效果
    const teamMembers = document.querySelectorAll('.member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // 為平台連結添加動畫效果
    const platformLinks = document.querySelectorAll('.platform-link');
    platformLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // 添加CSS樣式以支持按鈕點擊動畫
    const style = document.createElement('style');
    style.textContent = `
        .nav-btn.clicked {
            animation: pulse 0.3s ease-in-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});