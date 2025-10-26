// 頁面滾動時高亮導覽列 - (JS 動態效果: 導航列 active 狀態切換)
window.addEventListener('scroll', () => {
    const sections = ['#profile-section', '#about-me-section', '#skills-section', '#experience-section', '#awards-section'];
    const navLinks = document.querySelectorAll('.nav-item');
    let current = '';

    sections.forEach(id => {
        const section = document.querySelector(id);
        if (section && window.scrollY >= section.offsetTop - 180) { 
            current = id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });

    const backToTopBtn = document.getElementById('back-to-top-btn');
    // JS 動態效果: 滾動超過 400px 顯示回頂部按鈕
    if (window.scrollY > 400) { 
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// 經歷標籤頁切換函數 - (JS 動態效果: Tab 內容切換顯示)
function showTab(tabId, clickedButton) {
    const tabContents = document.querySelectorAll('.experience-content');
    const tabButtons = document.querySelectorAll('.exp-tab-button');

    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    clickedButton.classList.add('active');
}

// 圓形進度條更新函數 (包含動畫邏輯) - (JS/CSS 動態效果: 圓形進度條動畫)
const CIRCUMFERENCE = 439.8; 

function updateSkillProgress(id, percentage, color, skillName) {
    const progressCircle = document.querySelector(`#${id} .skill-circle-progress`);
    const textName = document.querySelector(`#${id} .skill-percentage-text .name`);
    const textPercentage = document.querySelector(`#${id} .skill-percentage-text .percentage`);

    if (!progressCircle || !textPercentage) return; 

    progressCircle.style.stroke = color;
    const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

    // 設定動畫起始值 (進度條完整隱藏)
    progressCircle.style.strokeDashoffset = CIRCUMFERENCE; 
    textPercentage.textContent = '0%'; 
    textName.textContent = skillName; 

    // 觸發 CSS Transition 動畫 (將進度條從 0 填滿到目標值)
    requestAnimationFrame(() => {
        progressCircle.style.strokeDashoffset = offset;
    });
    
    // JS 動態效果: 數字跳動動畫
    let currentPercentage = 0;
    let startTime = null;

    function animatePercentage(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const duration = 1500; 
        
        const progress = Math.min(1, elapsed / duration);
        currentPercentage = Math.round(progress * percentage);
        textPercentage.textContent = `${currentPercentage}%`;

        if (elapsed < duration) {
            requestAnimationFrame(animatePercentage);
        } else {
            textPercentage.textContent = `${percentage}%`; 
        }
    }

    requestAnimationFrame(animatePercentage);
}

document.addEventListener('DOMContentLoaded', () => {
    // 頁面載入後更新技能進度 (觸發動畫)
    updateSkillProgress('skill-css', 70, '#3498DB', 'CSS');
    updateSkillProgress('skill-html', 80, '#E67E22', 'HTML');
    updateSkillProgress('skill-java', 85, '#2ECC71', 'Java');
    updateSkillProgress('skill-python', 70, '#FFD700', 'Python'); 
});

// 圖片切換函數 - (JS/CSS 動態效果: 圖片淡入淡出切換)
function switchImage(event, containerId, targetIndex) {
    event.preventDefault(); 

    const container = document.getElementById(containerId);
    if (!container) return;

    const images = container.querySelectorAll('.exp-card-image-wrapper img');
    const navLinks = container.querySelectorAll('.exp-image-nav a');

    images.forEach((img, index) => {
        img.classList.remove('active'); 
        if (index === targetIndex) {
            img.classList.add('active'); 
        }
    });

    navLinks.forEach((link, index) => {
        link.classList.remove('active'); 
        if (index === targetIndex) {
            link.classList.add('active'); 
        }
    });
}