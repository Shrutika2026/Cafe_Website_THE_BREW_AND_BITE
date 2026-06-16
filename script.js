const fs = require('fs');
const path = require('path');
const https = require('https');

function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                file.close();
                fs.unlink(dest, () => {});
                return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
            }
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function downloadTarget(target) {
    if (target.directUrl) {
        console.log(`Downloading direct URL for ${target.name}...`);
        await downloadFile(target.directUrl, target.dest);
        console.log(`Successfully downloaded ${target.name}!`);
        return;
    }

    console.log(`Fetching page for ${target.name}...`);
    const html = await fetchHtml(target.pageUrl);
    const match = html.match(/https:\/\/i\.pinimg\.com\/[^\"]+\.jpg/);
    if (match) {
        const imgUrl = match[0].replace(/\\/g, '');
        console.log(`Found image URL: ${imgUrl}`);
        console.log(`Downloading to ${target.dest}...`);
        await downloadFile(imgUrl, target.dest);
        console.log(`Successfully downloaded ${target.name}!`);
    } else {
        throw new Error(`No image found on Pinterest page for ${target.name}`);
    }
}

async function run() {
    const assetsDir = path.join(__dirname, 'assets');
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir);

    const targets = [
        { name: 'Fresh Mango Smoothie', pageUrl: 'https://in.pinterest.com/pin/1131107262686602176/', dest: path.join(assetsDir, 'fresh_mango_smoothie.jpg') },
        { name: 'Cheese Burst Pizza Margherita', pageUrl: 'https://in.pinterest.com/pin/1073334523709404883/', dest: path.join(assetsDir, 'cheese_burst_margherita.jpg') },
        { name: 'Spicy Mexican Burger', pageUrl: 'https://in.pinterest.com/pin/1005710160538177718/', dest: path.join(assetsDir, 'spicy_mexican_burger.jpg') },
        { name: 'Paneer Tikka Tandoori Pizza', pageUrl: 'https://in.pinterest.com/pin/1133570168730865176/', dest: path.join(assetsDir, 'paneer_tikka_pizza.jpg') },
        { name: 'Grated Paneer Sandwich', pageUrl: 'https://in.pinterest.com/pin/4606126992917014656/', dest: path.join(assetsDir, 'grated_paneer_sandwich.jpg') },
        { name: 'Cheese Corn Sandwich', pageUrl: 'https://in.pinterest.com/pin/991143830517771556/', dest: path.join(assetsDir, 'cheese_corn_sandwich.jpg') },
        { name: 'Veg Club Triple Sandwich', pageUrl: 'https://in.pinterest.com/pin/1016898790859567214/', dest: path.join(assetsDir, 'veg_club_sandwich.jpg') },
        { name: 'Paneer Tikka Roll Wrap', pageUrl: 'https://in.pinterest.com/pin/289708188552876061/', dest: path.join(assetsDir, 'paneer_tikka_roll.jpg') },
        { name: 'Mexican Veg Roll Wrap', pageUrl: 'https://in.pinterest.com/pin/721842646551733224/', dest: path.join(assetsDir, 'mexican_veg_roll.jpg') },
        { name: 'Classic French Fries', pageUrl: 'https://in.pinterest.com/pin/479281585363927921/', dest: path.join(assetsDir, 'classic_french_fries.jpg') },
        { name: 'Loaded Cheese Fries', pageUrl: 'https://in.pinterest.com/pin/30680841208681163/', dest: path.join(assetsDir, 'loaded_cheese_fries.jpg') },
        { name: 'Baked Garlic Bread Slices', pageUrl: 'https://in.pinterest.com/pin/376965431333217986/', dest: path.join(assetsDir, 'garlic_bread.jpg') },
        { name: 'Crispy Seasoned Potato Wedges', pageUrl: 'https://in.pinterest.com/pin/1099370959057300864/', dest: path.join(assetsDir, 'potato_wedges.jpg') },
        { name: 'Crispy Golden Onion Rings', pageUrl: 'https://in.pinterest.com/pin/1148980923683587541/', dest: path.join(assetsDir, 'onion_rings.jpg') },
        { name: 'Tangy Red Sauce Pasta', pageUrl: 'https://in.pinterest.com/pin/1074671529843236898/', dest: path.join(assetsDir, 'red_sauce_pasta.jpg') },
        { name: 'Mixed Pink Sauce Pasta', pageUrl: 'https://in.pinterest.com/pin/141863457008259694/', dest: path.join(assetsDir, 'pink_sauce_pasta.jpg') },
        { name: 'Gourmet Alfredo Mushroom Pasta', pageUrl: 'https://in.pinterest.com/pin/633529872623423924/', dest: path.join(assetsDir, 'alfredo_mushroom_pasta.jpg') },
        { name: 'Spicy Tomato Arrabbiata Pasta', pageUrl: 'https://in.pinterest.com/pin/532761830938018750/', dest: path.join(assetsDir, 'arrabbiata_pasta.jpg') },
        { name: 'Warm Brownie with Ice Cream', pageUrl: 'https://in.pinterest.com/pin/1120974163508971544/', dest: path.join(assetsDir, 'brownie_ice_cream.jpg') },
        { name: 'Chocolate Lava Cake', pageUrl: 'https://in.pinterest.com/pin/1087619378779866995/', dest: path.join(assetsDir, 'lava_cake.jpg') },
        { name: 'Fresh Hot Waffles', pageUrl: 'https://in.pinterest.com/pin/88312842692024047/', dest: path.join(assetsDir, 'hot_waffles.jpg') },
        { name: 'Espresso Mascarpone Tiramisu', pageUrl: 'https://in.pinterest.com/pin/958070520839799624/', dest: path.join(assetsDir, 'tiramisu.jpg') },
        { name: 'Double Chocolate Chip Muffin', pageUrl: 'https://in.pinterest.com/pin/468867011233313210/', dest: path.join(assetsDir, 'chocolate_muffin.jpg') },
        { name: 'Classic Chocolate Brownie', pageUrl: 'https://in.pinterest.com/pin/379569074866040693/', dest: path.join(assetsDir, 'chocolate_brownie.jpg') },
        { name: 'Strawberry NY Cheesecake Slice', pageUrl: 'https://in.pinterest.com/pin/1057501556264115213/', dest: path.join(assetsDir, 'cheesecake.jpg') },
        { name: 'FAQ Background', directUrl: 'https://i.pinimg.com/236x/99/98/a0/9998a09a8c446561721c9095a4e08c95.jpg', dest: path.join(assetsDir, 'faq_bg.jpg') }
    ];

    for (const target of targets) {
        try {
            await downloadTarget(target);
        } catch (e) {
            console.error(`Error processing ${target.name}:`, e.message);
        }
    }
}

run();
