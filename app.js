
const introScreen = document.getElementById('intro-screen');
const introVideo = document.getElementById('intro-video');
const enterBtn = document.getElementById('enter-btn');

function enterCafe() {
    if (introScreen) {
        introScreen.classList.add('hidden');
    }
    if (introVideo) {
        introVideo.pause();
    }

    const homeSection = document.getElementById('home');
    if (homeSection) {
        setTimeout(() => {
            homeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
}

if (enterBtn) {
    enterBtn.addEventListener('click', enterCafe);
}

if (introVideo) {
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {});
    }
    introVideo.addEventListener('loadedmetadata', () => {
        introVideo.currentTime = 0;
    });
    introVideo.addEventListener('ended', enterCafe);
}

    /* ==========================================
       2. LIGHT/DARK THEME TOGGLER
       ========================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlEl = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    /* ==========================================
       3. NAVIGATION ACTIONS (STICKY, MOBILE NAV, ACTIVE LINKS)
       ========================================== */
    const header = document.getElementById('main-header');
    const scrollTopBtn = document.getElementById('scroll-top');
    const navMenu = document.getElementById('nav-menu');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar and Scroll-to-Top button toggle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }

        // Active link tracking during scroll
        let currentSection = '';
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Mobile hamburger menu toggle
    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpened = navMenu.classList.contains('active');
            menuToggleBtn.innerHTML = isOpened ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close menu on nav link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Scroll to Top action
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ==========================================
       4. MENU DATA & FILTERING SYSTEM
       ========================================== */
    const menuItems = [
        // ☕ Coffee & Espresso
        {
            id: 'c1',
            category: 'coffee',
            name: 'Classic Espresso',
            description: 'Intense and full-bodied single shot of espresso extracted from premium Arabica beans.',
            price: 99,
            image: 'assets/classic_espresso.jpg',
            rating: 4.5
        },
        {
            id: 'c2',
            category: 'coffee',
            name: 'Americano',
            description: 'Double espresso shot diluted with hot purified water for a bold black coffee experience.',
            price: 119,
            image: 'assets/americano.jpg',
            rating: 4.4
        },
        {
            id: 'c3',
            category: 'coffee',
            name: 'Signature Cappuccino',
            description: 'Double shot of dark roasted espresso with silky textured steamed milk, dusted with organic cocoa powder.',
            price: 149,
            image: 'assets/sig_cappuccino.png',
            rating: 5.0,
            tag: 'Best Seller'
        },
        {
            id: 'c4',
            category: 'coffee',
            name: 'Cafe Latte',
            description: 'Espresso combined with steamed milk and topped with a thin layer of velvety microfoam.',
            price: 159,
            image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
            rating: 4.6
        },
        {
            id: 'c5',
            category: 'coffee',
            name: 'Belgian Chocolate Mocha',
            description: 'Espresso combined with dark Belgian chocolate sauce and steamed milk, finished with whipped cream.',
            price: 179,
            image: 'assets/belgian_chocolate_mocha.jpg',
            rating: 4.8
        },
        {
            id: 'c6',
            category: 'coffee',
            name: 'Flat White',
            description: 'Stronger double espresso shot topped with smooth steamed milk and ultra-thin microfoam.',
            price: 169,
            image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80',
            rating: 4.7
        },
        {
            id: 'c7',
            category: 'coffee',
            name: 'Espresso Macchiato',
            description: 'Classic double shot of espresso marked with a small dollop of warm milk foam.',
            price: 139,
            image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80',
            rating: 4.5
        },
        {
            id: 'c8',
            category: 'coffee',
            name: 'Hazelnut Cold Brew',
            description: 'Smooth 18-hour slow-steeped cold brew infused with roasted hazelnut syrup, served over block ice.',
            price: 159,
            image: 'assets/hazelnut_cold_brew.jpg',
            rating: 4.7,
            tag: 'New'
        },
        {
            id: 'c9',
            category: 'coffee',
            name: 'Iced Cafe Latte',
            description: 'Chilled espresso shot poured over ice cubes and fresh cold milk.',
            price: 169,
            image: 'assets/iced_cafe_latte.jpg',
            rating: 4.6
        },
        {
            id: 'c10',
            category: 'coffee',
            name: 'Iced Mocha Fudge',
            description: 'Chilled espresso combined with premium chocolate syrup, cold milk, and crushed ice, topped with hot fudge.',
            price: 189,
            image: 'assets/iced_mocha_fudge.jpg',
            rating: 4.8
        },

        // 🥤 Refreshers & Beverages
        {
            id: 'b1',
            category: 'beverages',
            name: 'Lemon Iced Tea',
            description: 'Classic sweet black tea chilled to perfection and infused with fresh lemon juice.',
            price: 129,
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80',
            rating: 4.4
        },
        {
            id: 'b2',
            category: 'beverages',
            name: 'Peach Iced Tea',
            description: 'Chilled brewed black tea infused with sweet peach pulp syrup and fresh mint leaves.',
            price: 139,
            image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
            rating: 4.5
        },
        {
            id: 'b3',
            category: 'beverages',
            name: 'Mint Lime Mojito',
            description: 'Refreshing crush of fresh mint leaves, lime wedges, sugar syrup, and carbonated sparkling soda water.',
            price: 159,
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
            rating: 4.6
        },
        {
            id: 'b4',
            category: 'beverages',
            name: 'Fresh Lime Soda',
            description: 'Freshly squeezed lime juice served with sweet or salted sparkling soda water.',
            price: 99,
            image: 'assets/fresh_lime_soda.jpg',
            rating: 4.3
        },
        {
            id: 'b5',
            category: 'beverages',
            name: 'Cold Coffee Classic',
            description: 'Rich blended cold coffee with premium vanilla ice cream, topped with heavy chocolate cream and syrup.',
            price: 179,
            image: 'assets/cold_coffee.png',
            rating: 5.0,
            tag: 'Best Seller'
        },
        {
            id: 'b6',
            category: 'beverages',
            name: 'Double Chocolate Shake',
            description: 'Thick creamy milkshake blended with dark cocoa powder, chocolate syrup, and vanilla ice cream.',
            price: 189,
            image: 'assets/double_chocolate_shake.jpg',
            rating: 4.7
        },
        {
            id: 'b7',
            category: 'beverages',
            name: 'Oreo Fudge Milkshake',
            description: 'Creamy milkshake blended with crushed Oreo cookies, rich chocolate ice cream, and dark fudge sauce.',
            price: 199,
            image: 'assets/oreo_fudge_milkshake.jpg',
            rating: 4.9
        },
        {
            id: 'b8',
            category: 'beverages',
            name: 'Strawberry Shake',
            description: 'Creamy blended shake made with sweet strawberry pulp, milk, and premium vanilla ice cream.',
            price: 189,
            image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=400&q=80',
            rating: 4.6
        },
        {
            id: 'b9',
            category: 'beverages',
            name: 'Fresh Mango Smoothie',
            description: 'Creamy yogurt smoothie blended with ripe sweet Alphonso mango pulp and ice.',
            price: 199,
            image: 'assets/fresh_mango_smoothie.jpg',
            rating: 4.8
        },

        // 🍔 Burgers
        {
            id: 'bu1',
            category: 'burgers',
            name: 'Classic Veg Burger',
            description: 'Gourmet potato-herb patty topped with sliced tomatoes, onions, lettuce, and classic mayonnaise.',
            price: 149,
            image: 'https://i.pinimg.com/736x/95/ae/be/95aebe4f4f23854beb99bab1d64a4ee5.jpg',
            rating: 4.4
        },
        {
            id: 'bu2',
            category: 'burgers',
            name: 'Cheddar Cheese Burger',
            description: 'Classic veg burger loaded with a melting slice of premium cheddar cheese and herb spread.',
            price: 179,
            image: 'https://i.pinimg.com/736x/12/19/2b/12192b9312b0e6f39b3c038638dff455.jpg',
            rating: 4.6
        },
        {
            id: 'bu3',
            category: 'burgers',
            name: 'Crispy Veggie Burger',
            description: 'Crispy battered mix vegetable patty fried golden brown, layered with spicy mayo and lettuce.',
            price: 169,
            image: 'https://i.pinimg.com/736x/62/99/01/62990174a9e5241867525db5939cd07b.jpg',
            rating: 4.5
        },
        {
            id: 'bu4',
            category: 'burgers',
            name: 'Paneer Tikka Burger',
            description: 'Tandoori-spiced grilled paneer steak layered with crunchy lettuce, onions, tandoori mayonnaise, and melted cheese.',
            price: 249,
            image: 'assets/paneer_burger.png',
            rating: 5.0,
            tag: 'Best Seller'
        },
        {
            id: 'bu5',
            category: 'burgers',
            name: 'Double Cheese Crunch Burger',
            description: 'Double crispy herb veg patty, double slice of cheddar cheese, sliced tomato, jalapeno, and garlic spread.',
            price: 219,
            image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80',
            rating: 4.7
        },
        {
            id: 'bu6',
            category: 'burgers',
            name: 'Spicy Mexican Burger',
            description: 'Spicy black bean and veg patty topped with hot jalapenos, salsa, cheese, and chipotle mayo.',
            price: 199,
            image: 'assets/spicy_mexican_burger.jpg',
            rating: 4.6
        },

        // 🍕 Pizza
        {
            id: 'p1',
            category: 'pizza',
            name: 'Margherita Pizza Classic',
            description: 'Classic rich hand-stretched thin crust topped with fresh mozzarella cheese and basil leaves.',
            price: 299,
            image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80',
            rating: 4.8
        },
        {
            id: 'p2',
            category: 'pizza',
            name: 'Farmhouse Garden Pizza',
            description: 'Fresh hand-stretched base topped with tangy marinara sauce, button mushrooms, colorful bell peppers, sweet corn, olives.',
            price: 399,
            image: 'assets/farmhouse_pizza.png',
            rating: 5.0,
            tag: 'Best Seller'
        },
        {
            id: 'p3',
            category: 'pizza',
            name: 'Veggie Delight Pizza',
            description: 'Hand-tossed base loaded with fresh onions, green capsicum, juicy tomatoes, and baby corn, topped with mozzarella.',
            price: 349,
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80',
            rating: 4.6
        },
        {
            id: 'p4',
            category: 'pizza',
            name: 'Paneer Tikka Tandoori Pizza',
            description: 'Tandoori-spiced grilled paneer cubes, red onions, capsicum, and fresh coriander over sweet tandoori sauce and mozzarella.',
            price: 389,
            image: 'assets/paneer_tikka_pizza.jpg',
            rating: 4.8
        },
        {
            id: 'p5',
            category: 'pizza',
            name: 'Cheese Burst Pizza Margherita',
            description: 'Loaded cheese burst crust pizza oozing with liquid cheese, topped with extra mozzarella and Italian seasoning.',
            price: 449,
            image: 'assets/cheese_burst_margherita.jpg',
            rating: 4.9
        },

        // 🥪 Sandwiches & Wraps
        {
            id: 's1',
            category: 'sandwiches',
            name: 'Veg Grilled Sandwich',
            description: 'Bombay-style double layered sandwich filled with potato slices, cucumber, tomatoes, onions, green chutney, and sandwich masala.',
            price: 149,
            image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80',
            rating: 4.5
        },
        {
            id: 's2',
            category: 'sandwiches',
            name: 'Cheese Corn Sandwich',
            description: 'Crispy grilled sandwich loaded with golden sweet corn kernels, green chillies, mozzarella, and cheddar cheese.',
            price: 169,
            image: 'assets/cheese_corn_sandwich.jpg',
            rating: 4.6
        },
        {
            id: 's3',
            category: 'sandwiches',
            name: 'Grated Paneer Sandwich',
            description: 'Spiced grated paneer filling mixed with red onions and fresh coriander, grilled in butter.',
            price: 189,
            image: 'assets/grated_paneer_sandwich.jpg',
            rating: 4.7
        },
        {
            id: 's4',
            category: 'sandwiches',
            name: 'Veg Club Triple Sandwich',
            description: 'Triple layered sandwich filled with sliced cucumber, tomato, potato, green chutney, and melted mozzarella cheese.',
            price: 199,
            image: 'assets/veg_club_sandwich.jpg',
            rating: 4.6
        },
        {
            id: 's5',
            category: 'sandwiches',
            name: 'Paneer Tikka Roll Wrap',
            description: 'Spiced tandoori paneer cubes tossed with capsicum and onions wrapped in a soft grilled flatbread with mint mayo.',
            price: 229,
            image: 'assets/paneer_tikka_roll.jpg',
            rating: 4.7
        },
        {
            id: 's6',
            category: 'sandwiches',
            name: 'Mexican Veg Roll Wrap',
            description: 'Spiced red kidney beans, sweet corn, shredded lettuce, salsa, and cheese wrapped in a grilled tortilla.',
            price: 199,
            image: 'assets/mexican_veg_roll.jpg',
            rating: 4.5
        },

        // 🍟 Sides & Snacks
        {
            id: 'sd1',
            category: 'sides',
            name: 'Classic French Fries',
            description: 'Double-fried potato fries cut daily, salted and served crispy golden with tomato ketchup.',
            price: 129,
            image: 'assets/classic_french_fries.jpg',
            rating: 4.5
        },
        {
            id: 'sd2',
            category: 'sides',
            name: 'Peri Peri Crispy Fries',
            description: 'Freshly cut potato fries fried golden brown and tossed liberally in spicy, tangy African peri peri seasoning.',
            price: 149,
            image: 'assets/peri_peri_fries.png',
            rating: 5.0,
            tag: 'Best Seller'
        },
        {
            id: 'sd3',
            category: 'sides',
            name: 'Loaded Cheese Fries',
            description: 'Crispy salted fries drenched in warm home-made cheddar cheese sauce and garnished with spring onions.',
            price: 179,
            image: 'assets/loaded_cheese_fries.jpg',
            rating: 4.8
        },
        {
            id: 'sd4',
            category: 'sides',
            name: 'Baked Garlic Bread Slices',
            description: 'Gourmet French loaf slices topped with garlic-infused butter and fresh parsley, baked to a light crisp.',
            price: 139,
            image: 'assets/garlic_bread.jpg',
            rating: 4.6
        },
        {
            id: 'sd5',
            category: 'sides',
            name: 'Nachos with Cheese Dip',
            description: 'Crisp salted tortilla chips served with warm melted cheddar cheese sauce dip and green jalapeños.',
            price: 169,
            image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80',
            rating: 4.6
        },
        {
            id: 'sd6',
            category: 'sides',
            name: 'Crispy Seasoned Potato Wedges',
            description: 'Coarsely cut skin-on potato wedges seasoned with herbs and garlic powder, fried to a crunch.',
            price: 149,
            image: 'assets/potato_wedges.jpg',
            rating: 4.5
        },
        {
            id: 'sd7',
            category: 'sides',
            name: 'Crispy Golden Onion Rings',
            description: 'Batter-fried crispy onion rings served with tandoori mayo dip.',
            price: 139,
            image: 'assets/onion_rings.jpg',
            rating: 4.4
        },

        // 🍝 Pasta
        {
            id: 'pa1',
            category: 'pasta',
            name: 'Creamy White Sauce Pasta',
            description: 'Penne pasta tossed in white creamy butter and cream sauce, infused with Italian garlic, herbs, and parmesan.',
            price: 299,
            image: 'assets/white_pasta.png',
            rating: 5.0,
            tag: 'Best Seller'
        },
        {
            id: 'pa2',
            category: 'pasta',
            name: 'Tangy Red Sauce Pasta',
            description: 'Penne pasta cooked in rich spicy red tomato sauce, loaded with fresh garlic, chili flakes, olives, and basil.',
            price: 269,
            image: 'assets/red_sauce_pasta.jpg',
            rating: 4.6
        },
        {
            id: 'pa3',
            category: 'pasta',
            name: 'Mixed Pink Sauce Pasta',
            description: 'Penne pasta tossed in a harmonious blend of creamy Alfredo and tangy tomato sauces, garnished with parmesan.',
            price: 289,
            image: 'assets/pink_sauce_pasta.jpg',
            rating: 4.8
        },
        {
            id: 'pa4',
            category: 'pasta',
            name: 'Gourmet Alfredo Mushroom Pasta',
            description: 'Penne cooked in rich butter cream sauce with sliced button mushrooms, garlic, and fresh ground black pepper.',
            price: 319,
            image: 'assets/alfredo_mushroom_pasta.jpg',
            rating: 4.9
        },
        {
            id: 'pa5',
            category: 'pasta',
            name: 'Spicy Tomato Arrabbiata Pasta',
            description: 'Penne pasta tossed in a spicy, fiery red tomato sauce cooked with extra garlic, chili flakes, and black olives.',
            price: 279,
            image: 'assets/arrabbiata_pasta.jpg',
            rating: 4.7
        },

        // 🍰 Desserts
        {
            id: 'd1',
            category: 'desserts',
            name: 'Classic Chocolate Brownie',
            description: 'Eggless, rich, and fudgy dark chocolate brownie slice with dense chocolate chips.',
            price: 149,
            image: 'assets/chocolate_brownie.jpg',
            rating: 4.8
        },
        {
            id: 'd2',
            category: 'desserts',
            name: 'Warm Brownie with Ice Cream',
            description: 'Warm, gooey, rich dark chocolate fudge brownie served with a scoop of premium vanilla bean ice cream and hot fudge.',
            price: 199,
            image: 'assets/brownie_ice_cream.jpg',
            rating: 5.0,
            tag: 'Best Seller'
        },
        {
            id: 'd3',
            category: 'desserts',
            name: 'Chocolate Lava Choclate Cake',
            description: 'Soft-baked chocolate muffin containing a warm, oozing liquid chocolate center, served warm.',
            price: 169,
            image: 'assets/lava_cake.jpg',
            rating: 4.9
        },
        {
            id: 'd4',
            category: 'desserts',
            name: 'Strawberry NY Cheesecake Slice',
            description: 'Dense, smooth, and creamy cheesecake baked on a graham cracker crust, topped with fresh strawberry compote.',
            price: 249,
            image: 'assets/cheesecake.jpg',
            rating: 4.9
        },
        {
            id: 'd5',
            category: 'desserts',
            name: 'Double Chocolate Chip Muffin',
            description: 'Fluffy freshly-baked chocolate muffin studded with dark and milk chocolate chips.',
            price: 129,
            image: 'assets/chocolate_muffin.jpg',
            rating: 4.5
        },
        {
            id: 'd6',
            category: 'desserts',
            name: 'Espresso Mascarpone Tiramisu',
            description: 'Traditional Italian dessert made with ladyfingers dipped in our signature espresso, layered with whipped mascarpone cream.',
            price: 229,
            image: 'assets/tiramisu.jpg',
            rating: 4.8
        },
        {
            id: 'd7',
            category: 'desserts',
            name: 'Fresh Hot Waffles',
            description: 'Thick Belgian waffles baked fresh and served topped with dark chocolate drizzle and warm maple syrup.',
            price: 199,
            image: 'assets/hot_waffles.jpg',
            rating: 4.7
        }
    ];

    const categories = [
        { id: 'all', name: 'All Dishes' },
        { id: 'best-seller', name: '⭐ Best Sellers' },
        { id: 'coffee', name: 'Coffee' },
        { id: 'beverages', name: 'Beverages' },
        { id: 'burgers', name: 'Burgers' },
        { id: 'pizza', name: 'Pizza' },
        { id: 'sandwiches', name: 'Sandwiches & Wraps' },
        { id: 'sides', name: 'Sides & Snacks' },
        { id: 'pasta', name: 'Pasta' },
        { id: 'desserts', name: 'Desserts' }
    ];

    const menuGrid = document.getElementById('menu-grid-container');
    const categoriesTabs = document.getElementById('menu-categories-tabs');
    const menuSearchInput = document.getElementById('menu-search-input');
    const menuViewAllBtn = document.getElementById('menu-view-all-btn');
    const menuViewAllWrapper = document.getElementById('menu-view-all-wrapper');

    let activeCategory = 'all';
    let searchQuery = '';
    let showFullMenu = false;
    const MENU_INITIAL_COUNT = 12;

    /* ── Favourites — declared here so renderMenuItems can use it ── */
    let favourites = new Set(JSON.parse(localStorage.getItem('brew-favs') || '[]'));

    function saveFavourites() {
        localStorage.setItem('brew-favs', JSON.stringify([...favourites]));
    }

    function shouldLimitMenu() {
        return activeCategory === 'all' && !searchQuery.trim();
    }

    function updateMenuViewAllButton(totalCount) {
        if (!menuViewAllWrapper) return;
        const hasMore = shouldLimitMenu() && !showFullMenu && totalCount > MENU_INITIAL_COUNT;
        menuViewAllWrapper.hidden = !hasMore;
    }

    // Render category tab buttons
    function renderCategoryTabs() {
        if (!categoriesTabs) return;
        categoriesTabs.innerHTML = '';
        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = `tab-btn ${category.id === activeCategory ? 'active' : ''}`;
            btn.textContent = category.name;
            btn.setAttribute('data-category-id', category.id);
            btn.addEventListener('click', () => {
                activeCategory = category.id;
                showFullMenu = false;
                // Update active class
                document.querySelectorAll('#menu-categories-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderMenuItems();
            });
            categoriesTabs.appendChild(btn);
        });
    }

    // Filter and Render Menu cards
    function renderMenuItems() {
        if (!menuGrid) return;
        menuGrid.innerHTML = '';

        const filtered = menuItems.filter(item => {
            const matchesCategory = activeCategory === 'all' || 
                                    (activeCategory === 'best-seller' && item.tag === 'Best Seller') ||
                                    item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            menuGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fas fa-mug-hot" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No dishes found matching your request. Try searching another delicious bite!</p>
                </div>
            `;
            updateMenuViewAllButton(0);
            return;
        }

        const itemsToShow = shouldLimitMenu() && !showFullMenu
            ? filtered.slice(0, MENU_INITIAL_COUNT)
            : filtered;

        itemsToShow.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.setAttribute('data-id', item.id);

            // Generate rating stars
            let starsHTML = '';
            const fullStars = Math.floor(item.rating);
            const hasHalf = item.rating % 1 !== 0;
            for(let i=1; i<=5; i++) {
                if(i <= fullStars) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else if(i === fullStars + 1 && hasHalf) {
                    starsHTML += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }

            card.innerHTML = `
                <div class="menu-card-img">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    ${item.tag ? `<span class="menu-card-tag">${item.tag}</span>` : ''}
                    <button class="btn-fav-card ${favourites.has(item.id) ? 'is-faved' : ''}" data-id="${item.id}" aria-label="Add to favourites">
                        <i class="${favourites.has(item.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                <div class="menu-card-content">
                    <div class="menu-card-rating">${starsHTML}</div>
                    <h4 class="menu-card-title">${item.name}</h4>
                    <p class="menu-card-desc">${item.description}</p>
                    <div class="menu-card-footer">
                        <span class="menu-card-price">₹${item.price}</span>
                        <button class="btn-add-cart" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;

            // Setup Add to Cart Event
            card.querySelector('.btn-add-cart').addEventListener('click', () => {
                addToCart(item.id);
            });

            // Favourite toggle
            card.querySelector('.btn-fav-card').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavourite(item.id);
            });

            menuGrid.appendChild(card);
        });

        updateMenuViewAllButton(filtered.length);
    }

    if (menuViewAllBtn) {
        menuViewAllBtn.addEventListener('click', () => {
            showFullMenu = true;
            renderMenuItems();
            menuViewAllWrapper?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Search input handler
    if (menuSearchInput) {
        menuSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            showFullMenu = false;
            renderMenuItems();
        });
    }

    // Initialize Menu
    renderCategoryTabs();
    renderMenuItems();


    /* ==========================================
       4b. FEATURED SPECIALS BENTO GRID
       ========================================== */
    const featuredSpecials = [
        {
            id: 'fs1',
            layoutClass: 'featured-card-main',
            badge: 'Most Popular',
            badgeClass: 'badge-popular',
            name: 'Ultimate Brew Burger',
            description: 'Double crispy patty, cheddar cheese, lettuce, tomato, signature café sauce, served with fries.',
            price: 399,
            image: 'assets/paneer_burger.png'
        },
        {
            id: 'fs2',
            layoutClass: '',
            badge: "Chef's Signature",
            badgeClass: 'badge-signature',
            name: 'Caramel Hazelnut Latte',
            description: 'Rich espresso blended with steamed milk, caramel drizzle, and roasted hazelnut flavor.',
            price: 249,
            image: 'assets/sig_cappuccino.png'
        },
        {
            id: 'fs3',
            layoutClass: '',
            badge: 'Seasonal Special',
            badgeClass: 'badge-seasonal',
            name: 'Cold Brew Affogato',
            description: 'Smooth cold brew coffee poured over creamy vanilla ice cream.',
            price: 299,
            image: 'assets/iced_cafe_latte.jpg'
        },
        {
            id: 'fs4',
            layoutClass: 'featured-card-bottom-left',
            badge: 'Award Winning',
            badgeClass: 'badge-award',
            name: 'Chocolate Brownie Delight',
            description: 'Warm chocolate brownie topped with vanilla ice cream and chocolate sauce.',
            price: 249,
            image: 'assets/brownie_ice_cream.jpg'
        },
        {
            id: 'fs5',
            layoutClass: 'featured-card-bottom-right',
            badge: '🥪 New Arrival',
            badgeClass: 'badge-new',
            name: 'Mediterranean Paneer Wrap',
            description: 'Grilled paneer, fresh vegetables, feta cheese, and creamy garlic dressing wrapped in a toasted tortilla.',
            price: 229,
            image: 'assets/paneer_tikka_roll.jpg'
        }
    ];

    const featuredBento = document.getElementById('featured-bento-container');

    function renderFeaturedSpecials() {
        if (!featuredBento) return;
        featuredBento.innerHTML = '';

        featuredSpecials.forEach(item => {
            const card = document.createElement('article');
            card.className = `featured-card ${item.layoutClass}`.trim();
            const isSplitLayout = item.layoutClass.includes('featured-card-wide') || item.layoutClass.includes('featured-card-bottom-left');

            card.innerHTML = isSplitLayout ? `
                <span class="premium-badge ${item.badgeClass}">${item.badge}</span>
                <div class="featured-card-media">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="featured-card-overlay featured-card-overlay-inline">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <div class="featured-card-footer">
                        <span class="featured-card-price">₹${item.price}</span>
                        <button class="btn-add-cart" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            ` : `
                <span class="premium-badge ${item.badgeClass}">${item.badge}</span>
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="featured-card-overlay">
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                    <div class="featured-card-footer">
                        <span class="featured-card-price">₹${item.price}</span>
                        <button class="btn-add-cart" data-id="${item.id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            `;
            card.querySelector('.btn-add-cart').addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(item.id);
            });
            featuredBento.appendChild(card);
        });
    }

    renderFeaturedSpecials();


    /* ==========================================
       5. SHOPPING CART LOGIC (STATE & DRAWERS)
       ========================================== */
    let cart = [];

    function toggleFavourite(itemId) {
        if (favourites.has(itemId)) {
            favourites.delete(itemId);
        } else {
            favourites.add(itemId);
            showToast('Added to Favourites ❤️', 'success');
        }
        saveFavourites();
        updateFavBadge();
        updateFavDrawer();
        // Refresh heart icon on visible cards without full re-render
        document.querySelectorAll(`.btn-fav-card[data-id="${itemId}"]`).forEach(btn => {
            const isFaved = favourites.has(itemId);
            btn.classList.toggle('is-faved', isFaved);
            btn.querySelector('i').className = isFaved ? 'fas fa-heart' : 'far fa-heart';
        });
    }

    function updateFavBadge() {
        const badge = document.getElementById('fav-count');
        if (badge) badge.textContent = favourites.size;
    }

    function updateFavDrawer() {
        const container = document.getElementById('fav-items-container');
        if (!container) return;
        container.innerHTML = '';
        if (favourites.size === 0) {
            container.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fas fa-heart-broken"></i>
                    <p>No favourites yet.</p>
                    <p style="font-size:0.8rem;margin-top:0.5rem;">Tap the ♥ on any menu item to save it here!</p>
                </div>`;
            return;
        }
        [...favourites].forEach(id => {
            const item = findProductById(id);
            if (!item) return;
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <span class="cart-item-price">₹${item.price}</span>
                    <button class="btn-add-cart" style="margin-top:0.4rem;font-size:0.78rem;padding:0.35rem 0.8rem;" data-id="${item.id}">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
                <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove favourite"><i class="fas fa-heart-broken"></i></button>
            `;
            row.querySelector('.btn-add-cart').addEventListener('click', () => addToCart(item.id));
            row.querySelector('.btn-remove-item').addEventListener('click', () => toggleFavourite(item.id));
            container.appendChild(row);
        });
    }

    // Favourite drawer toggle
    const favToggleBtn = document.getElementById('fav-toggle-btn');
    const favCloseBtn  = document.getElementById('fav-close-btn');
    const favDrawer    = document.getElementById('fav-drawer');

    if (favToggleBtn) favToggleBtn.addEventListener('click', () => favDrawer?.classList.toggle('active'));
    if (favCloseBtn)  favCloseBtn.addEventListener('click',  () => favDrawer?.classList.remove('active'));

    // Init badge on load
    updateFavBadge();

    const cartToggleBtn = document.getElementById('cart-toggle-btn');
    const cartCloseBtn = document.getElementById('cart-close-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartCount = document.getElementById('cart-count');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');
    const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const checkoutModalCloseBtn = document.getElementById('checkout-modal-close-btn');
    const checkoutOrderRef = document.getElementById('checkout-order-ref');
    const checkoutOrderTotal = document.getElementById('checkout-order-total');

    function toggleCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.toggle('active');
        }
    }

    if (cartToggleBtn) cartToggleBtn.addEventListener('click', toggleCartDrawer);
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', toggleCartDrawer);

    // Add item to cart
    function findProductById(itemId) {
        return menuItems.find(item => item.id === itemId)
            || featuredSpecials.find(item => item.id === itemId);
    }

    function addToCart(itemId) {
        const menuItem = findProductById(itemId);
        if (!menuItem) return;

        const existingItem = cart.find(item => item.id === itemId);
        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                image: menuItem.image,
                qty: 1
            });
        }
        updateCartUI();
        
        // Open cart drawer so user sees their item added
        if (cartDrawer && !cartDrawer.classList.contains('active')) {
            cartDrawer.classList.add('active');
        }
    }

    // Update quantities
    function changeQty(itemId, amount) {
        const item = cart.find(item => item.id === itemId);
        if (!item) return;

        item.qty += amount;
        if (item.qty <= 0) {
            cart = cart.filter(c => c.id !== itemId);
        }
        updateCartUI();
    }

    // Remove item
    function removeItem(itemId) {
        cart = cart.filter(c => c.id !== itemId);
        updateCartUI();
    }

    // Calculate details and update UI
    function updateCartUI() {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';

        let subtotal = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Your cart is empty.</p>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem;">Add some aromatic coffees and snacks from our menu to start ordering!</p>
                </div>
            `;
        } else {
            cart.forEach(item => {
                const itemTotal = item.price * item.qty;
                subtotal += itemTotal;
                totalItems += item.qty;

                const itemRow = document.createElement('div');
                itemRow.className = 'cart-item';
                itemRow.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <span class="cart-item-price">₹${item.price}</span>
                        <div class="cart-item-controls">
                            <button class="btn-qty btn-minus" data-id="${item.id}"><i class="fas fa-minus"></i></button>
                            <span class="qty-val">${item.qty}</span>
                            <button class="btn-qty btn-plus" data-id="${item.id}"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <button class="btn-remove-item" data-id="${item.id}" aria-label="Remove item"><i class="far fa-trash-alt"></i></button>
                `;

                // Add button listeners
                itemRow.querySelector('.btn-minus').addEventListener('click', () => changeQty(item.id, -1));
                itemRow.querySelector('.btn-plus').addEventListener('click', () => changeQty(item.id, 1));
                itemRow.querySelector('.btn-remove-item').addEventListener('click', () => removeItem(item.id));

                cartItemsContainer.appendChild(itemRow);
            });
        }

        // Cart counters and maths
        const taxRate = 0.18; // 18% GST (CGST 9% + SGST 9%)
        const taxValue = subtotal * taxRate;
        const totalBill = subtotal + taxValue;

        if (cartCount) cartCount.textContent = totalItems;
        if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        if (cartTax) cartTax.textContent = `₹${taxValue.toFixed(2)}`;
        if (cartTotal) cartTotal.textContent = `₹${totalBill.toFixed(2)}`;

        // Disable/enable checkout button
        if (cartCheckoutBtn) {
            cartCheckoutBtn.disabled = cart.length === 0;
            cartCheckoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
            cartCheckoutBtn.style.cursor = cart.length === 0 ? 'not-allowed' : 'pointer';
        }
    }

    // Checkout button → show delivery choice
    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            cartDrawer.classList.remove('active');
            document.getElementById('delivery-choice-modal').classList.add('active');
        });
    }

    // Delivery choice — cancel
    document.getElementById('delivery-choice-cancel')?.addEventListener('click', () => {
        document.getElementById('delivery-choice-modal').classList.remove('active');
    });

    // Delivery choice — Dine-in (original flow)
    document.getElementById('choose-dine-in')?.addEventListener('click', () => {
        document.getElementById('delivery-choice-modal').classList.remove('active');
        const orderId    = `BB-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        const finalTotal = cartTotal.textContent;
        if (checkoutOrderRef)   checkoutOrderRef.textContent   = orderId;
        if (checkoutOrderTotal) checkoutOrderTotal.textContent = finalTotal;
        if (checkoutModal) checkoutModal.classList.add('active');
        cart = [];
        updateCartUI();
    });

    // Delivery choice — Home Delivery → open form
    document.getElementById('choose-home-delivery')?.addEventListener('click', () => {
        document.getElementById('delivery-choice-modal').classList.remove('active');
        document.getElementById('delivery-form-modal').classList.add('active');
    });

    // Delivery form — back
    document.getElementById('delivery-form-back')?.addEventListener('click', () => {
        document.getElementById('delivery-form-modal').classList.remove('active');
        document.getElementById('delivery-choice-modal').classList.add('active');
    });

    // Delivery form — phone live filter
    const delPhoneInput = document.getElementById('del-phone');
    if (delPhoneInput) {
        delPhoneInput.addEventListener('input', () => {
            delPhoneInput.value = delPhoneInput.value.replace(/\D/g, '').slice(0, 10);
        });
    }

    // Delivery form — submit
    document.getElementById('delivery-form-submit')?.addEventListener('click', () => {
        const name    = document.getElementById('del-name').value.trim();
        const phone   = document.getElementById('del-phone').value.trim();
        const address = document.getElementById('del-address').value.trim();

        if (!name) { showToast('Please enter your name.', 'error'); return; }
        if (!phone || !/^[0-9]{10}$/.test(phone)) { showToast('Please enter a valid 10-digit number.', 'error'); return; }
        if (!address) { showToast('Please enter your delivery address.', 'error'); return; }

        const orderId    = `BB-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        const finalTotal = cartTotal.textContent;

        document.getElementById('del-order-ref').textContent      = orderId;
        document.getElementById('del-success-name').textContent   = name;
        document.getElementById('del-success-address').textContent = address;
        document.getElementById('del-success-total').textContent  = finalTotal;

        document.getElementById('delivery-form-modal').classList.remove('active');
        document.getElementById('delivery-success-modal').classList.add('active');

        cart = [];
        updateCartUI();

        // Reset form
        document.getElementById('del-name').value    = '';
        document.getElementById('del-phone').value   = '';
        document.getElementById('del-address').value = '';
        document.getElementById('del-landmark').value = '';
    });

    document.getElementById('delivery-success-close')?.addEventListener('click', () => {
        document.getElementById('delivery-success-modal').classList.remove('active');
    });

    if (checkoutModalCloseBtn && checkoutModal) {
        checkoutModalCloseBtn.addEventListener('click', () => {
            checkoutModal.classList.remove('active');
        });
    }


    /* ==========================================
       6. INTERACTIVE TABLE BOOKING & FLOOR MAP
       ========================================== */
    const floorGrid = document.getElementById('seating-floor-grid');
    const bookingTableInput = document.getElementById('booking-table');
    const reservationForm = document.getElementById('reservation-form');
    const ticketModal = document.getElementById('ticket-modal');
    const ticketModalCloseBtn = document.getElementById('ticket-modal-close-btn');

    // Layout configuration: 29 Tables across 2 floors
    const floorsData = [
        {
            id: 'ground',
            label: 'Ground Floor',
            sublabel: '14 Tables · 42 Seats',
            zones: [
                {
                    name: 'Window Area',
                    icon: 'fas fa-window-maximize',
                    tables: [
                        { id: 'G1', capacity: 2, status: 'available' },
                        { id: 'G2', capacity: 2, status: 'reserved' },
                        { id: 'G3', capacity: 4, status: 'available' },
                        { id: 'G4', capacity: 4, status: 'available' }
                    ]
                },
                {
                    name: 'Center Area',
                    icon: 'fas fa-th',
                    tables: [
                        { id: 'G5', capacity: 4, status: 'available' },
                        { id: 'G6', capacity: 4, status: 'reserved' },
                        { id: 'G7', capacity: 6, status: 'available' },
                        { id: 'G8', capacity: 6, status: 'available' }
                    ]
                },
                {
                    name: 'Lounge Area',
                    icon: 'fas fa-couch',
                    tables: [
                        { id: 'G9',  capacity: 2, status: 'available' },
                        { id: 'G10', capacity: 2, status: 'available' },
                        { id: 'G11', capacity: 3, status: 'reserved' },
                        { id: 'G12', capacity: 3, status: 'available' }
                    ]
                },
                {
                    name: 'Near Counter',
                    icon: 'fas fa-store',
                    tables: [
                        { id: 'G13', capacity: 2, status: 'available' },
                        { id: 'G14', capacity: 2, status: 'available' }
                    ]
                }
            ]
        },
        {
            id: 'first',
            label: 'First Floor',
            sublabel: '15 Tables · 50 Seats',
            zones: [
                {
                    name: 'Balcony Seating',
                    icon: 'fas fa-sun',
                    tables: [
                        { id: 'F1', capacity: 2, status: 'available' },
                        { id: 'F2', capacity: 2, status: 'reserved' },
                        { id: 'F3', capacity: 4, status: 'available' },
                        { id: 'F4', capacity: 4, status: 'available' }
                    ]
                },
                {
                    name: 'Premium Seating',
                    icon: 'fas fa-star',
                    tables: [
                        { id: 'F5', capacity: 6, status: 'available', premium: true },
                        { id: 'F6', capacity: 6, status: 'reserved', premium: true },
                        { id: 'F7', capacity: 8, status: 'available', premium: true }
                    ]
                },
                {
                    name: 'Group & Family Area',
                    icon: 'fas fa-users',
                    tables: [
                        { id: 'F8',  capacity: 4, status: 'available' },
                        { id: 'F9',  capacity: 4, status: 'available' },
                        { id: 'F10', capacity: 6, status: 'reserved' },
                        { id: 'F11', capacity: 4, status: 'available' }
                    ]
                },
                {
                    name: 'Quiet Work Zone',
                    icon: 'fas fa-laptop',
                    tables: [
                        { id: 'F12', capacity: 1, status: 'available' },
                        { id: 'F13', capacity: 1, status: 'available' },
                        { id: 'F14', capacity: 2, status: 'available' },
                        { id: 'F15', capacity: 2, status: 'reserved' }
                    ]
                }
            ]
        }
    ];

    // Flat list for quick lookup
    const tablesData = floorsData.flatMap(floor => floor.zones.flatMap(zone => zone.tables));

    let selectedTableId  = null;   // which table is confirmed
    let selectedSeatNums = [];     // which seat numbers within that table
    let activeFloor      = 'ground';

    // ── Seat Picker Modal ───────────────────────────────────────────────────
    // Build once and reuse
    const seatPickerOverlay = document.createElement('div');
    seatPickerOverlay.id = 'seat-picker-modal';
    seatPickerOverlay.className = 'modal-overlay';
    seatPickerOverlay.innerHTML = `
        <div class="modal-card seat-picker-card" id="seat-picker-card">
            <div class="seat-picker-header">
                <div class="seat-picker-title-row">
                    <span class="seat-picker-table-id" id="sp-table-id"></span>
                    <span class="seat-picker-zone"      id="sp-table-zone"></span>
                </div>
                <button class="seat-picker-close" id="sp-close-btn" aria-label="Close"><i class="fas fa-times"></i></button>
            </div>
            <div class="seat-picker-body">
                <p class="seat-picker-hint">Click individual seats to select them.</p>
                <div class="seat-picker-grid" id="sp-seat-grid"></div>
                <div class="seat-picker-legend">
                    <span><i class="fas fa-chair" style="color:var(--success)"></i> Available</span>
                    <span><i class="fas fa-chair" style="color:var(--accent)"></i> Selected</span>
                    <span><i class="fas fa-chair" style="color:#ef4444;opacity:.5"></i> Taken</span>
                </div>
                <div class="seat-picker-summary" id="sp-summary">No seats selected</div>
            </div>
            <div class="seat-picker-footer">
                <button class="sp-btn sp-btn-cancel" id="sp-cancel-btn">Cancel</button>
                <button class="sp-btn sp-btn-confirm" id="sp-confirm-btn" disabled>Confirm Selection</button>
            </div>
        </div>
    `;
    document.body.appendChild(seatPickerOverlay);

    // Active table being picked
    let pickerTable    = null;   // table object
    let pickerSelected = new Set(); // selected seat indices (1-based)

    function openSeatPicker(table, zoneName) {
        pickerTable = table;

        // Pre-fill with already-confirmed seats for this table so they show as chosen
        pickerSelected = (selectedTableId === table.id && selectedSeatNums.length > 0)
            ? new Set(selectedSeatNums)
            : new Set();

        document.getElementById('sp-table-id').textContent   = `Table ${table.id}`;
        document.getElementById('sp-table-zone').textContent = zoneName;

        renderSeatPickerGrid();
        seatPickerOverlay.classList.add('active');
    }

    function renderSeatPickerGrid() {
        const grid    = document.getElementById('sp-seat-grid');
        const summary = document.getElementById('sp-summary');
        const confirmBtn = document.getElementById('sp-confirm-btn');
        grid.innerHTML = '';

        for (let s = 1; s <= pickerTable.capacity; s++) {
            const btn = document.createElement('button');
            // Mark some seats as already taken based on a deterministic fake pattern
            // (real system would track per-seat reservations; here reserved tables are
            //  fully taken and available tables have all seats open)
            const isTaken    = pickerTable.status === 'reserved';
            const isSelected = pickerSelected.has(s);

            btn.className = `sp-seat-btn ${isTaken ? 'taken' : isSelected ? 'chosen' : 'free'}`;
            btn.disabled  = isTaken;
            btn.setAttribute('aria-label', `Seat ${s}`);
            btn.innerHTML = `<i class="fas fa-chair"></i><span>${s}</span>`;

            if (!isTaken) {
                btn.addEventListener('click', () => {
                    if (pickerSelected.has(s)) {
                        pickerSelected.delete(s);
                    } else {
                        pickerSelected.add(s);
                    }
                    renderSeatPickerGrid();
                });
            }
            grid.appendChild(btn);
        }

        // Update summary & confirm button
        const arr = [...pickerSelected].sort((a, b) => a - b);
        if (arr.length === 0) {
            summary.textContent = 'No seats selected';
            confirmBtn.disabled = true;
        } else {
            summary.textContent = `Selected: Seat${arr.length > 1 ? 's' : ''} ${arr.join(', ')}  (${arr.length} of ${pickerTable.capacity})`;
            confirmBtn.disabled = false;
        }
    }

    function closeSeatPicker() {
        seatPickerOverlay.classList.remove('active');
        pickerTable    = null;
        pickerSelected = new Set();
    }

    document.getElementById('sp-close-btn').addEventListener('click', closeSeatPicker);
    document.getElementById('sp-cancel-btn').addEventListener('click', closeSeatPicker);

    // Click outside card to close
    seatPickerOverlay.addEventListener('click', (e) => {
        if (e.target === seatPickerOverlay) closeSeatPicker();
    });

    document.getElementById('sp-confirm-btn').addEventListener('click', () => {
        if (!pickerTable || pickerSelected.size === 0) return;

        // Commit the selection
        selectedTableId  = pickerTable.id;
        selectedSeatNums = [...pickerSelected].sort((a, b) => a - b);
        closeSeatPicker();
        updateFloorMapUI();
    });

    // ── Floor Map Render ────────────────────────────────────────────────────
    function renderFloorMap() {
        if (!floorGrid) return;
        floorGrid.innerHTML = '';

        const currentFloor = floorsData.find(f => f.id === activeFloor);

        // Floor tab switcher
        const tabBar = document.createElement('div');
        tabBar.className = 'floor-tab-bar';
        floorsData.forEach(floor => {
            const tab = document.createElement('button');
            tab.className = `floor-tab-btn ${floor.id === activeFloor ? 'active' : ''}`;
            tab.innerHTML = `<i class="fas fa-${floor.id === 'ground' ? 'door-open' : 'stairs'}"></i> ${floor.label} <span class="floor-tab-sub">${floor.sublabel}</span>`;
            tab.addEventListener('click', () => {
                activeFloor = floor.id;
                renderFloorMap();
            });
            tabBar.appendChild(tab);
        });
        floorGrid.appendChild(tabBar);

        // Stats row
        const statsRow = document.createElement('div');
        statsRow.className = 'floor-stats-row';
        const totalTables     = currentFloor.zones.reduce((s, z) => s + z.tables.length, 0);
        const availableTables = currentFloor.zones.reduce((s, z) => s + z.tables.filter(t => t.status === 'available').length, 0);
        statsRow.innerHTML = `
            <span><i class="fas fa-chair"></i> ${totalTables} Tables</span>
            <span><i class="fas fa-check-circle" style="color:var(--success)"></i> ${availableTables} Available</span>
        `;
        floorGrid.appendChild(statsRow);

        // Render each zone
        currentFloor.zones.forEach(zone => {
            const zoneWrap = document.createElement('div');
            zoneWrap.className = 'floor-zone';

            const zoneLabel = document.createElement('div');
            zoneLabel.className = 'floor-zone-label';
            zoneLabel.innerHTML = `<i class="${zone.icon}"></i> ${zone.name}`;
            zoneWrap.appendChild(zoneLabel);

            const tableGrid = document.createElement('div');
            tableGrid.className = 'floor-zone-grid';

            zone.tables.forEach(table => {
                const isConfirmed = table.id === selectedTableId;
                const seatClass   = isConfirmed ? 'selected' : table.status;
                const tableDiv    = document.createElement('div');
                tableDiv.className = `table-seat ${seatClass}`;

                // Chair icons — each icon maps to a seat number.
                // Confirmed (booked) seats glow gold; others inherit the status colour.
                let seatsHTML = '';
                for (let s = 1; s <= table.capacity; s++) {
                    const confirmedSeat = isConfirmed && selectedSeatNums.includes(s);
                    seatsHTML += `<i class="seat-icon fas fa-chair${confirmedSeat ? ' seat-confirmed' : ''}" data-seat="${s}" title="Seat ${s}${confirmedSeat ? ' ✓ selected' : ''}"></i>`;
                }

                tableDiv.innerHTML = `
                    ${table.premium ? '<span class="table-premium-badge">⭐</span>' : ''}
                    <span class="table-number">${table.id}</span>
                    <div class="table-seats-visual">${seatsHTML}</div>
                    <span class="table-capacity">${isConfirmed ? selectedSeatNums.length + '/' + table.capacity + ' seats' : table.capacity + ' Seat' + (table.capacity > 1 ? 's' : '')}</span>
                `;

                if (table.status === 'available') {
                    tableDiv.addEventListener('click', () => openSeatPicker(table, zone.name));
                }

                tableGrid.appendChild(tableDiv);
            });

            zoneWrap.appendChild(tableGrid);
            floorGrid.appendChild(zoneWrap);
        });
    }

    // Refresh layout + booking input
    function updateFloorMapUI() {
        renderFloorMap();
        if (bookingTableInput) {
            if (selectedTableId && selectedSeatNums.length > 0) {
                const tableInfo = tablesData.find(t => t.id === selectedTableId);
                const seatList  = selectedSeatNums.join(', ');
                bookingTableInput.value = `Table ${tableInfo.id} — Seat${selectedSeatNums.length > 1 ? 's' : ''} ${seatList} (${selectedSeatNums.length} of ${tableInfo.capacity})${tableInfo.premium ? ' ⭐' : ''}`;
            } else {
                bookingTableInput.value = '';
            }
        }
    }

    renderFloorMap();

    // Booking form submission handler with validations
    // Live phone input: strip non-digits and cap at 10 characters
    const phoneInput = document.getElementById('booking-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
        });
    }

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name    = document.getElementById('booking-name').value.trim();
            const email   = document.getElementById('booking-email').value.trim();
            const phone   = document.getElementById('booking-phone').value.trim();
            const guests  = document.getElementById('booking-guests').value;
            const date    = document.getElementById('booking-date').value;
            const time    = document.getElementById('booking-time').value;

            // Form validations
            if (!name) {
                showToast('Please enter your full name.', 'error');
                document.getElementById('booking-name').focus();
                return;
            }
            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                document.getElementById('booking-email').focus();
                return;
            }
            if (!phone || !/^[0-9]{10}$/.test(phone)) {
                showToast('Please enter a valid 10-digit mobile number.', 'error');
                document.getElementById('booking-phone').focus();
                return;
            }
            if (!guests) {
                showToast('Please specify the number of guests.', 'error');
                return;
            }
            if (!date) {
                showToast('Please select a reservation date.', 'error');
                return;
            }
            if (!time) {
                showToast('Please select a preferred time slot.', 'error');
                return;
            }
            if (!selectedTableId) {
                showToast('Please select a table from the interactive layout map.', 'error');
                return;
            }

            // Confirm seat selection exists
            if (!selectedSeatNums || selectedSeatNums.length === 0) {
                showToast('Please select at least one seat from the table picker.', 'error');
                return;
            }

            // Confirm guest count vs seats selected
            const chosenTable = tablesData.find(t => t.id === selectedTableId);
            const guestNum = parseInt(guests);
            if (guestNum > selectedSeatNums.length) {
                showToast(`You selected ${selectedSeatNums.length} seat(s) but entered ${guestNum} guest(s). Please select enough seats or adjust the guest count.`, 'error');
                return;
            }

            // Generate Confirm Ticket details
            const ticketCode = `BB-${Math.floor(1000 + Math.random() * 9000)}-${selectedTableId}`;
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Populate ticket details
            document.getElementById('ticket-res-name').textContent = name;
            document.getElementById('ticket-res-datetime').textContent = `${formattedDate} at ${time}`;
            document.getElementById('ticket-res-table').textContent = `Table ${chosenTable.id} — Seat${selectedSeatNums.length > 1 ? 's' : ''} ${selectedSeatNums.join(', ')}${chosenTable.premium ? ' ⭐' : ''}`;
            document.getElementById('ticket-res-guests').textContent = `${guests} Guests`;
            document.getElementById('ticket-res-code').textContent = ticketCode;

            // Open Confirmed Ticket modal
            if (ticketModal) {
                ticketModal.classList.add('active');
            }

            // Mark table as reserved in system state
            chosenTable.status = 'reserved';
            selectedTableId = null;
            updateFloorMapUI();

            // Clear booking form fields
            reservationForm.reset();
        });
    }

    if (ticketModalCloseBtn && ticketModal) {
        ticketModalCloseBtn.addEventListener('click', () => {
            ticketModal.classList.remove('active');
        });
    }


    /* ==========================================
       7. GALLERY MASONRY CATEGORY FILTER & LIGHTBOX
       ========================================== */
    const galleryItems = [
        // 1. Local Images (12 items)
        { title: 'Modern Cozy Interior', category: 'interior', image: 'https://i.pinimg.com/736x/ef/a7/17/efa71710c265da6b99c8ad8436a9b958.jpg', layout: 'tall' },
        { title: 'Gourmet Cheese Burst Pizza', category: 'food', image: 'assets/farmhouse_pizza.png', layout: 'wide' },
        { title: 'Tandoori Paneer Tikka Burger', category: 'food', image: 'assets/paneer_burger.png', layout: 'normal' },
        { title: 'Chilled Oreo Shake Dessert', category: 'food', image: 'https://i.pinimg.com/736x/5c/cf/30/5ccf30aa834dfc5db200ddeff614152d.jpg', layout: 'tall' },
        { title: 'Coffee Counter Lighting', category: 'interior', image: 'https://i.pinimg.com/736x/ec/68/5b/ec685bc81f77cda5bbfa198b0d3841a6.jpg', layout: 'normal' },
        { title: 'Fresh Lime Mojito Cooler', category: 'food', image: 'https://i.pinimg.com/736x/f6/b5/23/f6b523d641f61e29f1902d2e441228a4.jpg', layout: 'normal' },
        { title: 'Creamy Cold Coffee Blend', category: 'coffee', image: 'assets/cold_coffee.png', layout: 'normal' },
        { title: 'Fresh Berry Tart Dessert', category: 'food', image: 'assets/dessert.jpg', layout: 'normal' },
        { title: 'Crispy Peri Peri Fries Platter', category: 'food', image: 'assets/peri_peri_fries.png', layout: 'wide' },
        { title: 'Fresh Mango Smoothie', category: 'food', image: 'https://i.pinimg.com/736x/5c/c6/e1/5cc6e106f6cddd4030d042ac40c1badc.jpg', layout: 'normal' },
        { title: 'Strawberry Shake', category: 'food', image: 'https://i.pinimg.com/736x/b3/89/3a/b3893a326e679ec4591204f0e063a114.jpg', layout: 'normal' },
        { title: 'Baked Garlic Bread Slices', category: 'food', image: 'https://i.pinimg.com/736x/13/75/53/137553d9da1595918bb3ed6869a08fd6.jpg', layout: 'normal' },
        { title: 'Crispy Seasoned Potato Wedges', category: 'food', image: 'https://i.pinimg.com/736x/ed/fa/89/edfa8955574698e775d8b6e95431b5cf.jpg', layout: 'wide' },
        { title: 'Crispy Golden Onion Rings', category: 'food', image: 'https://i.pinimg.com/736x/bd/30/da/bd30da8cb3826c68698d16acf6d88a97.jpg', layout: 'normal' },
        { title: 'Nachos with Cheese Dip', category: 'food', image: 'https://i.pinimg.com/236x/74/ab/83/74ab8374017d5ca8b07b112c10c99bed.jpg', layout: 'normal' },
        { title: 'Veggie Delight Pizza', category: 'food', image: 'https://i.pinimg.com/736x/14/2d/d2/142dd2c786a30d533a72a9d1de93d571.jpg', layout: 'wide' },
        { title: 'Paneer Tikka Burger', category: 'food', image: 'https://i.pinimg.com/736x/3a/8c/3b/3a8c3b929c602553a42d1684d0d4a1c8.jpg', layout: 'normal' },
        { title: 'Spicy Mexican Burger', category: 'food', image: 'https://i.pinimg.com/736x/d9/3a/0e/d93a0ea4b71d139a015fe5eec7192a5d.jpg', layout: 'normal' },
        { title: 'Cozy Evening Seating Corner', category: 'interior', image: 'assets/hero_bg.jpg', layout: 'tall' },

        // 2. Coffee Category Unsplash (14 items)
        { title: 'Classic Espresso Shot', category: 'coffee', image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Aromatic Latte Pour', category: 'coffee', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Hazelnut Cold Brew', category: 'coffee', image: 'https://i.pinimg.com/236x/01/8d/7a/018d7a7a73b745eb13a1ac5a59484aec.jpg', layout: 'wide' },
        { title: 'Artisanal V60 Pour Over', category: 'coffee', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', layout: 'tall' },
        { title: 'Cozy Study Book & Coffee', category: 'coffee', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Belgian Chocolate Mocha', category: 'coffee', image: 'https://i.pinimg.com/736x/34/bd/69/34bd69eac3656bf32e0c6b5b7cf1b774.jpg', layout: 'normal' },
        { title: 'Cafe Latte', category: 'coffee', image: 'https://i.pinimg.com/736x/80/e2/0a/80e20ade3f26efeda7d18959547e23ad.jpg', layout: 'normal' },
        { title: 'Silky Textured Cappuccino foam', category: 'coffee', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Refreshing Ice Cold Coffee', category: 'coffee', image: 'https://i.pinimg.com/736x/28/bc/35/28bc352ca1546d67a2180232022dfb46.jpg', layout: 'wide' },
        { title: 'Rich Infused French Press', category: 'coffee', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', layout: 'tall' },
        { title: 'Morning Barista Prep Station', category: 'coffee', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Specialty Espresso Machine Extract', category: 'coffee', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Layered Caramel Macchiato', category: 'coffee', image: 'https://i.pinimg.com/736x/b5/5c/06/b55c06b03724413fb48baac017f4ac0d.jpg', layout: 'normal' },
        { title: 'Chilled Frappuccino & Cream', category: 'coffee', image: 'https://i.pinimg.com/736x/50/60/2d/50602ddd459e90d3737a70f6c99b383a.jpg', layout: 'normal' },

        // 3. Food Category Unsplash (12 items)
        { title: 'Gourmet Chef Penne Pasta', category: 'food', image: 'https://i.pinimg.com/736x/f5/8b/02/f58b02db03d5e4b818c01bb271f86f32.jpg', layout: 'normal' },
        { title: 'Woodfired Margherita Slices', category: 'food', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', layout: 'wide' },
        { title: 'Crispy Double Decker Veggie Burger', category: 'food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', layout: 'tall' },
        { title: 'Fresh Nutritious Garden Salad', category: 'food', image: 'https://i.pinimg.com/736x/3d/bd/ad/3dbdad55b61dcb7af27b4e1bdccd30ab.jpg', layout: 'normal' },
        { title: 'Decadent Chocolate Fudge Cake', category: 'food', image: 'https://i.pinimg.com/736x/1c/11/a9/1c11a988850690944de241f93e63290c.jpg', layout: 'normal' },
        { title: 'Traditional Italian Tiramisu Cup', category: 'food', image: 'https://i.pinimg.com/736x/81/24/9e/81249e70999e360eff43b749aa6cc14d.jpg', layout: 'normal' },
        { title: 'Crispy Herb Baked Garlic Bread', category: 'food', image: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Cheesy Penne Alfredo Pasta Bowl', category: 'food', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80', layout: 'wide' },
        { title: 'Golden Salted French Fries Basket', category: 'food', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Loaded Cheddar Cheese Veg Burger', category: 'food', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Warm Chocolate Lava Fudge Cake', category: 'food', image: 'https://i.pinimg.com/736x/2b/0d/59/2b0d597114f8886681b3e3ab4d3a4ee1.jpg', layout: 'tall' },
        { title: 'Sweet Sugar Waffles & Syrup', category: 'food', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Red Sauce Pasta', category: 'food', image: 'https://i.pinimg.com/736x/14/de/16/14de167494267101264a4ddf8932f156.jpg', layout: 'normal' },
        { title: 'White Sauce Pasta', category: 'food', image: 'https://i.pinimg.com/736x/ff/44/89/ff448958c62c5159b35a044f5ff62c1e.jpg', layout: 'normal' },
        { title: 'Pink Sauce Pasta', category: 'food', image: 'https://i.pinimg.com/736x/38/82/62/388262299d6a2117481e95c932263d47.jpg', layout: 'normal' },
        { title: 'Cheese Corn Sandwich', category: 'food', image: 'https://i.pinimg.com/736x/7e/33/ec/7e33ecf3009c1a7b10e52a91175bf63c.jpg', layout: 'normal' },
        { title: 'Paneer Tikka Roll Wrap', category: 'food', image: 'https://i.pinimg.com/736x/4f/18/6a/4f186a2a2144fbab5da57a2fd3e0be9f.jpg', layout: 'normal' },

        // 4. Interior Category Unsplash (12 items)
        { title: 'Sunny Afternoon Glass Windows', category: 'interior', image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&q=80', layout: 'tall' },
        { title: 'Rustic Brick Wall Dining Booths', category: 'interior', image: 'https://i.pinimg.com/736x/37/55/db/3755db773de2d54071b2549bf044627a.jpg', layout: 'wide' },
        { title: 'Cozy Warm Lounge Seating', category: 'interior', image: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Luxurious Velvet Booth Dining', category: 'interior', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Lively Social Café Environment', category: 'interior', image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Warm Outdoor Wooden Patio', category: 'interior', image: 'https://i.pinimg.com/736x/bc/16/b2/bc16b25093906b74e722a6867419eed2.jpg', layout: 'wide' },
        { title: 'Minimalist Study Room Corner', category: 'interior', image: 'https://i.pinimg.com/736x/8e/73/cb/8e73cbfec657cffd826afcc7e353ff59.jpg', layout: 'tall' },
        { title: 'Modern Neon Light Sign Wall', category: 'interior', image: 'https://i.pinimg.com/736x/43/3f/12/433f12238107fe3b8b04533d673a0c39.jpg', layout: 'normal' },
        { title: 'Sleek Italian Espresso Bar Counter', category: 'interior', image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Ambient Soft Golden Cafe Lights', category: 'interior', image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Spacious Group Dining Layout', category: 'interior', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', layout: 'normal' },
        { title: 'Professional Coffee Brewing Area', category: 'interior', image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80', layout: 'normal' }
    ];

    const galleryGrid = document.getElementById('gallery-grid-container');
    const galleryFilterBtns = document.querySelectorAll('[data-gallery-filter]');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title-text');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const galleryViewAllBtn = document.getElementById('gallery-view-all-btn');
    const galleryViewAllWrapper = document.getElementById('gallery-view-all-wrapper');

    let activeGalleryFilter = 'all';
    let showAllPhotos = false;
    const GALLERY_INITIAL_COUNT = 12;

    function updateGalleryViewAllButton(totalCount) {
        if (!galleryViewAllWrapper) return;
        const hasMore = !showAllPhotos && totalCount > GALLERY_INITIAL_COUNT;
        galleryViewAllWrapper.hidden = !hasMore;
    }

    function renderGallery() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = '';

        const filtered = galleryItems.filter(item => activeGalleryFilter === 'all' || item.category === activeGalleryFilter);
        const itemsToShow = showAllPhotos ? filtered : filtered.slice(0, GALLERY_INITIAL_COUNT);

        itemsToShow.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `gallery-item ${item.layout || 'normal'}`;
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-item-overlay">
                    <span class="gallery-item-tag">${item.category}</span>
                    <h4 class="gallery-item-title">${item.title}</h4>
                </div>
            `;

            // Open Lightbox on click
            itemDiv.addEventListener('click', () => {
                if (lightboxImg && lightboxTitle && lightbox) {
                    lightboxImg.src = item.image;
                    lightboxTitle.textContent = item.title;
                    lightbox.classList.add('active');
                }
            });

            galleryGrid.appendChild(itemDiv);
        });

        updateGalleryViewAllButton(filtered.length);
    }

    if (galleryViewAllBtn) {
        galleryViewAllBtn.addEventListener('click', () => {
            showAllPhotos = true;
            renderGallery();
        });
    }

    // Setup filter click buttons
    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeGalleryFilter = btn.getAttribute('data-gallery-filter');
            showAllPhotos = false;
            renderGallery();
        });
    });

    if (lightboxCloseBtn && lightbox) {
        lightboxCloseBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        // Click overlay to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    renderGallery();


    /* ==========================================
       8. TESTIMONIALS SLIDER CAROUSEL & NEW REVIEWS
       ========================================== */
    const testimonialsData = [
        {
            comment: "Hands down the best cappuccino in the city! The latte art is gorgeous and the tandoori paneer burger was extremely soft and fresh. The cozy glassmorphism dark theme makes it a perfect workspace.",
            name: "Priya Sharma",
            role: "Software Engineer",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            comment: "Wonderful ambience and food. We reserved a table online using the interactive layout map and got a cozy window booth seat. The Penne Alfredo White Pasta is so creamy and delicious. Highly recommended!",
            name: "Rohit Malhotra",
            role: "Food Blogger",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            comment: "Great customer service and fantastic cold coffee. The dark chocolate lava cake brownie with ice cream was rich, chocolatey, and melted in the mouth. Love their dark theme aesthetic and smooth jazz music background.",
            name: "Sneha Patel",
            role: "Design Lead",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            comment: "As a coffee connoisseur, I am extremely picky. Their pour-over and flat white are outstanding. The single-origin Coorg beans are roasted to perfection. The flavor profile is complex and satisfying.",
            name: "Vikram Malhotra",
            role: "Software Architect",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            comment: "We hosted a small birthday celebration here. The staff was incredibly helpful, and the tandoori paneer pizza was a huge hit among my friends. The booking process was seamless. Will definitely book again!",
            name: "Ananya Sen",
            role: "Event Planner",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            comment: "The garlic bread and peri peri fries are the best sides you can get. Coffee is top-notch, though it gets quite busy on Friday evenings. Highly recommend booking a table ahead of time.",
            name: "Rahul Krishnan",
            role: "College Student",
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
            rating: 4
        },
        {
            comment: "A hidden gem! The Espresso Mascarpone Tiramisu is out of this world, absolutely authentic. Beautiful interior styling and excellent, polite service. We had a lovely time.",
            name: "Meera Joshi",
            role: "Freelance Writer",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            comment: "The Oreo Fudge Milkshake and Veg Club Sandwich are my absolute comfort food combo. Love the light/dark theme toggle option on the website too, very clean and modern UI!",
            name: "Arjun Mehta",
            role: "UI Designer",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            comment: "Outstanding quality of ingredients. The Pink Sauce Pasta has the perfect balance of creaminess and tang. The interactive floor map made table booking a breeze for my family dinner.",
            name: "Divya Nair",
            role: "College Professor",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
            rating: 5
        },
        {
            comment: "I come here almost every weekend to read and relax. The ambiance is peaceful, the staff is polite, and the Hazelnut Cold Brew is extremely refreshing. A solid 10/10 experience!",
            name: "Kabir Kapoor",
            role: "Photographer",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
            rating: 5
        }
    ];

    const sliderTrack = document.getElementById('testimonial-slider-track');
    const sliderViewport = document.querySelector('.slider-viewport');
    const dotsContainer = document.getElementById('slider-dots-container');
    const reviewForm = document.getElementById('add-review-form');
    const starIcons = document.querySelectorAll('#rating-stars-container i');

    let currentSlideIndex = 0;
    let autoSlideInterval;
    let selectedFormRating = 5;

    function renderTestimonials() {
        if (!sliderTrack || !dotsContainer) return;
        sliderTrack.innerHTML = '';
        dotsContainer.innerHTML = '';

        testimonialsData.forEach((test, index) => {
            // Render slide card
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `
                <i class="fas fa-quote-left slide-quote-icon"></i>
                <p class="slide-comment">"${test.comment}"</p>
                <div class="slide-author">
                    <img src="${test.image}" alt="${test.name}" class="slide-author-img" onerror="this.onerror=null; this.src='assets/sig_cappuccino.png';">
                    <div>
                        <h4 class="slide-author-name">${test.name}</h4>
                        <span class="slide-author-role">${test.role}</span>
                    </div>
                </div>
            `;
            sliderTrack.appendChild(slide);

            // Render navigation dots
            const dot = document.createElement('span');
            dot.className = `dot ${index === currentSlideIndex ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
        
        goToSlide(currentSlideIndex);
    }

    function goToSlide(index) {
        if (!sliderTrack) return;
        currentSlideIndex = index;

        const slideWidth = sliderViewport
            ? sliderViewport.clientWidth
            : sliderTrack.querySelector('.slide')?.offsetWidth || sliderTrack.clientWidth;

        sliderTrack.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;

        // Update dots classes
        const dots = document.querySelectorAll('#slider-dots-container .dot');
        dots.forEach((dot, idx) => {
            dot.className = `dot ${idx === currentSlideIndex ? 'active' : ''}`;
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            const nextIdx = (currentSlideIndex + 1) % testimonialsData.length;
            goToSlide(nextIdx);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Window resize handler to align offset
    window.addEventListener('resize', () => {
        goToSlide(currentSlideIndex);
    });

    // Testimonial slider navigation arrow event listeners
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIdx = (currentSlideIndex - 1 + testimonialsData.length) % testimonialsData.length;
            goToSlide(prevIdx);
            resetAutoSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIdx = (currentSlideIndex + 1) % testimonialsData.length;
            goToSlide(nextIdx);
            resetAutoSlide();
        });
    }

    // Rating star select handler in review form
    starIcons.forEach(star => {
        star.addEventListener('click', () => {
            selectedFormRating = parseInt(star.getAttribute('data-rating'));
            starIcons.forEach((s, idx) => {
                if(idx < selectedFormRating) {
                    s.className = 'fas fa-star active';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
    });

    // Handle new review submission
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('review-name').value.trim();
            const text = document.getElementById('review-text').value.trim();

            if (!name || !text) {
                alert('Please fill out all required fields.');
                return;
            }

            // Append new review to state
            testimonialsData.push({
                comment: text,
                name: name,
                role: 'Verified Customer',
                image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
                rating: selectedFormRating
            });

            // Re-render slider
            renderTestimonials();
            goToSlide(testimonialsData.length - 1);
            resetAutoSlide();

            // Reset form
            reviewForm.reset();
            starIcons.forEach(s => s.className = 'fas fa-star active');
            selectedFormRating = 5;

            alert('Thank you for your valuable feedback! Your review has been added to our feedback board.');
        });
    }

    renderTestimonials();
    startAutoSlide();


    /* ==========================================
       9. EVENTS & BLOG ARTICLE DIALOGS
       ========================================== */
    const blogArticles = [
        {
            id: 'b-art1',
            title: '5 Secrets to Brewing Perfect Coffee at Home',
            category: 'Brewing Tips',
            excerpt: 'Struggling to make café-quality coffee? Here are the golden parameters of grind sizes, temperature, and extraction times.',
            image: 'assets/sig_cappuccino.png',
            date: 'June 10, 2026',
            author: 'Chief Barista Vikram',
            body: `
                <p>Have you ever wondered why the coffee you brew at home never tastes quite as rich, aromatic, and balanced as the one served at The Brew & Bite? The secret lies in a few critical scientific details that are easy to master once you know them.</p>
                <p><strong>1. Freshness is Key:</strong> Coffee beans begin to oxidize and lose flavor compounds immediately after roasting. For the best flavor, buy whole beans and grind them right before brewing.</p>
                <p><strong>2. The Grind Size:</strong> Different brewing methods require different grind sizes. French press needs a coarse, sand-like grind, while an espresso machine requires fine, powdered grinds. Match your grind size to your coffee maker!</p>
                <p><strong>3. Water Temperature:</strong> Hot boiling water will scorch the coffee grinds, resulting in a bitter cup. The optimal water temperature is between 90°C and 95°C. Let your boiling kettle sit for 1 minute before pouring.</p>
                <p><strong>4. Brew Ratios:</strong> Standard guidelines suggest a 1:16 ratio (1 gram of coffee for every 16 grams of water). Adjust slightly to fit your strength preferences.</p>
            `
        },
        {
            id: 'b-art2',
            title: 'Perfecting the Art of Espresso & Latte Microfoam',
            category: 'Barista Craft',
            excerpt: 'Deep-dive into the texture of microfoam. What separates a flat white foam from a bubbly cappuccino head.',
            image: 'assets/cold_coffee.png',
            date: 'June 08, 2026',
            author: 'Senior Barista Maria',
            body: `
                <p>Espresso is the heart of most coffee recipes. Pulling the perfect espresso shot is part science, part art. In this post, we explore the micro-textures of milk foam.</p>
                <p><strong>What is Microfoam?</strong> Unlike standard frothy foam with large visible air bubbles, microfoam is thick, shiny, and behaves like wet paint. It consists of microscopic air bubbles trapped in the milk protein structure.</p>
                <p><strong>The Temperature Rule:</strong> Never steam milk above 65°C. Steaming milk beyond this point causes the proteins to break down, releasing sulfur gas which alters the sweet, natural taste of lactose.</p>
                <p><strong>Pouring Technique:</strong> Start by pouring high above the cup to slide milk under the espresso crema, then drop the pitcher close to the surface to draw heart or leaf patterns.</p>
            `
        },
        {
            id: 'b-art3',
            title: 'Sweet Pairings: Coffee & Dessert Matching Guide',
            category: 'Dessert Guides',
            excerpt: 'Match our dark roast coffees with cheesecakes and chocolate brownies. Optimize sugar balances for maximum taste.',
            image: 'assets/dessert.jpg',
            date: 'June 05, 2026',
            author: 'Pastry Chef Rohan',
            body: `
                <p>Much like cheese and wine pairings, matching the right dessert with the right coffee profile can elevate your sensory experience. The goal is to either complement or contrast flavors.</p>
                <p><strong>Tiramisu with Espresso:</strong> A perfect match. The rich coffee-infused ladyfingers and mascarpone cream in tiramisu harmonize with a straight single espresso or a flat white, intensifying the dark cocoa notes.</p>
                <p><strong>Strawberry Cheesecake with Cold Brew:</strong> The acidity of fresh strawberries and rich dairy cream pairs wonderfully with a smooth, fruity cold brew, cutting through the sweetness without washing away the flavor.</p>
                <p><strong>Dark Chocolate Brownie with Cafe Latte:</strong> A full-bodied latte softens the dense chocolate texture, balancing the bitterness of dark cocoa with sweet textured milk.</p>
            `
        }
    ];

    const blogGrid = document.getElementById('blog-grid-container');
    const blogDetailModal = document.getElementById('blog-detail-modal');
    const blogModalCloseBtn = document.getElementById('blog-modal-close-btn');

    function renderBlogGrid() {
        if (!blogGrid) return;
        blogGrid.innerHTML = '';

        blogArticles.forEach(art => {
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.innerHTML = `
                <div class="blog-img">
                    <img src="${art.image}" alt="${art.title}" loading="lazy">
                </div>
                <div class="blog-content">
                    <span class="blog-category">${art.category}</span>
                    <h4 class="blog-title">${art.title}</h4>
                    <p class="blog-excerpt">${art.excerpt}</p>
                    <span class="blog-read-more">Read Full Post <i class="fas fa-arrow-right"></i></span>
                </div>
            `;

            // Card click expands full modal
            card.addEventListener('click', () => {
                openBlogModal(art.id);
            });

            blogGrid.appendChild(card);
        });
    }

    function openBlogModal(artId) {
        const art = blogArticles.find(a => a.id === artId);
        if (!art || !blogDetailModal) return;

        document.getElementById('blog-modal-image').src = art.image;
        document.getElementById('blog-modal-category').textContent = art.category;
        document.getElementById('blog-modal-title').textContent = art.title;
        document.getElementById('blog-modal-date').innerHTML = `<i class="far fa-calendar"></i> ${art.date}`;
        document.getElementById('blog-modal-author').innerHTML = `<i class="far fa-user"></i> ${art.author}`;
        document.getElementById('blog-modal-body').innerHTML = art.body;

        blogDetailModal.classList.add('active');
    }

    if (blogModalCloseBtn && blogDetailModal) {
        blogModalCloseBtn.addEventListener('click', () => {
            blogDetailModal.classList.remove('active');
        });
        blogDetailModal.addEventListener('click', (e) => {
            if (e.target === blogDetailModal) {
                blogDetailModal.classList.remove('active');
            }
        });
    }

    renderBlogGrid();


    /* ==========================================
       10. FAQ ACCORDION ENGINE
       ========================================== */
    const faqsData = [
        {
            q: "Do you offer home delivery?",
            a: "Yes! We offer home delivery through our delivery partners (Zomato & Swiggy) within a 5km radius. Alternatively, you can place an order on this website, complete mock checkout, and pick up your items directly at our counter."
        },
        {
            q: "Can I reserve a table online in advance?",
            a: "Absolutely! Our interactive table booking system allows you to select available tables (booth, lounge, cozy seating) and reserve your preferred spot in real-time. There is no reservation charge."
        },
        {
            q: "Do you have vegetarian and vegan food options?",
            a: "All of our listed food items on the menu (Burgers, Pizza, Pasta, Sides, Desserts) are 100% vegetarian. We also offer soy milk and almond milk alternatives for coffee beverages."
        },
        {
            q: "Are pets allowed in the café?",
            a: "Yes! The Brew & Bite Café is proudly pet-friendly. We have a dedicated outdoor patio area where pets are welcome, and we even offer fresh water and special treats for your furry friends."
        }
    ];

    const faqContainer = document.getElementById('faq-accordion-container');

    function renderFAQs() {
        if (!faqContainer) return;
        faqContainer.innerHTML = '';

        faqsData.forEach(faq => {
            const item = document.createElement('div');
            item.className = 'faq-item';
            item.innerHTML = `
                <div class="faq-question">
                    <span>${faq.q}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>${faq.a}</p>
                </div>
            `;

            // Toggle expansion
            item.querySelector('.faq-question').addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Collapse all FAQs first
                document.querySelectorAll('.faq-item').forEach(el => {
                    el.classList.remove('active');
                    el.querySelector('.faq-answer').style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    const answer = item.querySelector('.faq-answer');
                    // dynamically set height to support smooth transition
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });

            faqContainer.appendChild(item);
        });
    }

    renderFAQs();


    /* ==========================================
       11. MAP PIN INTERACTIVE MOCKUP & CONTACT FORM
       ========================================== */

    // ── Toast notification helper ──────────────────────────────────────────
    function showToast(msg, type = 'success') {
        // Remove any existing toast so they don't stack
        const existing = document.getElementById('brew-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.id = 'brew-toast';
        toast.className = `brew-toast brew-toast--${type}`;

        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        toast.innerHTML = `
            <i class="fas ${icon} brew-toast__icon"></i>
            <span class="brew-toast__msg">${msg}</span>
            <button class="brew-toast__close" aria-label="Close"><i class="fas fa-times"></i></button>
        `;

        document.body.appendChild(toast);

        // Trigger entrance
        requestAnimationFrame(() => toast.classList.add('brew-toast--show'));

        // Auto-dismiss after 4 s
        const timer = setTimeout(() => dismissToast(toast), 4000);

        toast.querySelector('.brew-toast__close').addEventListener('click', () => {
            clearTimeout(timer);
            dismissToast(toast);
        });
    }

    function dismissToast(toast) {
        toast.classList.remove('brew-toast--show');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }

    const mapPin = document.getElementById('map-pin-btn');
    const mapPopup = document.getElementById('map-location-popup');
    const contactForm = document.getElementById('contact-message-form');

    if (mapPin && mapPopup) {
        mapPin.addEventListener('click', (e) => {
            e.stopPropagation();
            mapPopup.classList.toggle('active');
        });
        
        // Hide map popup when clicking elsewhere
        document.addEventListener('click', () => {
            mapPopup.classList.remove('active');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name    = document.getElementById('contact-name').value.trim();
            const email   = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();

            if (!name) {
                showToast('Please enter your full name.', 'error');
                document.getElementById('contact-name').focus();
                return;
            }
            if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                showToast('Please enter a valid email address.', 'error');
                document.getElementById('contact-email').focus();
                return;
            }
            if (!message) {
                showToast('Please write your message before sending.', 'error');
                document.getElementById('contact-message').focus();
                return;
            }

            showToast(`Message sent! We'll reply to ${email} within 24 hours.`, 'success');
            contactForm.reset();
        });
    }


    /* ==========================================
       12. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
       ========================================== */
    let animationsInitialized = false;

    function initScrollAnimations() {
        if (animationsInitialized) return;
        animationsInitialized = true;

        const observerOptions = {
            root: null,
            threshold: 0,
            rootMargin: '0px 0px 0px 0px'
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Fade-up: whole sections
        document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));

        // Slide-in: individual columns / panels
        document.querySelectorAll('.slide-from-left, .slide-from-right').forEach(el => observer.observe(el));

        // Fallback: force all animated elements visible after 600ms
        // so nothing stays hidden if the observer misses them
        setTimeout(() => {
            document.querySelectorAll('.fade-in-section, .slide-from-left, .slide-from-right').forEach(el => {
                el.classList.add('is-visible');
            });
        }, 600);
    }

    // Call scroll animations immediately to ensure they register on page load
    initScrollAnimations();
