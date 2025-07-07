// AI Product Image Generation Script using Replicate
// This script generates AI product images for the Abibas brand using Stable Diffusion

require('dotenv').config();
const Replicate = require('replicate');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// Product data for AI image generation
const products = [
  {
    name: 'Ultra Boost AI',
    description: 'AI-engineered running shoe with responsive cushioning',
    filename: 'ultraboost-ai.jpg',
    prompt: 'high-quality product photo of a futuristic running shoe with sleek design, responsive cushioning technology, breathable upper, professional studio lighting, white background, commercial photography style'
  },
  {
    name: 'Cloudfoam Striker',
    description: 'Lightweight shoe with Cloudfoam technology',
    filename: 'cloudfoam-striker.jpg',
    prompt: 'professional product photography of a lightweight athletic shoe with cloud-like sole technology, modern design, studio lighting, white background, commercial style'
  },
  {
    name: 'Terrex Trail Pro',
    description: 'All-terrain trail running shoe',
    filename: 'terrex-trail-pro.jpg',
    prompt: 'high-quality product photo of rugged trail running shoe with aggressive grip pattern, outdoor performance design, professional studio lighting, white background'
  },
  {
    name: 'Predator Elite',
    description: 'Professional soccer cleats',
    filename: 'predator-elite.jpg',
    prompt: 'professional product photography of elite soccer cleats with precision control elements, lightweight design, studio lighting, white background, commercial photography'
  },
  {
    name: 'TechFit Training Tee',
    description: 'Compression training shirt',
    filename: 'techfit-tee.jpg',
    prompt: 'high-quality product photo of modern athletic compression shirt, technical fabric, sleek design, professional studio lighting, white background, folded presentation'
  },
  {
    name: 'AeroReady Track Jacket',
    description: 'Lightweight running jacket',
    filename: 'aeroready-jacket.jpg',
    prompt: 'professional product photography of lightweight athletic jacket with ventilation details, modern sporty design, studio lighting, white background, hanging presentation'
  },
  {
    name: 'Pro Performance Shorts',
    description: 'Athletic training shorts',
    filename: 'performance-shorts.jpg',
    prompt: 'high-quality product photo of athletic training shorts with modern design, performance fabric, professional studio lighting, white background, laid flat presentation'
  },
  {
    name: 'Elite Training Ball',
    description: 'FIFA certified soccer ball',
    filename: 'training-ball.jpg',
    prompt: 'professional product photography of premium soccer ball with modern panel design, FIFA quality, studio lighting, white background, commercial style'
  },
  {
    name: 'Performance Backpack',
    description: 'Ergonomic sports backpack',
    filename: 'backpack.jpg',
    prompt: 'high-quality product photo of modern sports backpack with ergonomic design, multiple compartments, professional studio lighting, white background'
  },
  {
    name: 'Heritage Originals Sneakers',
    description: 'Classic retro sneakers',
    filename: 'heritage-sneakers.jpg',
    prompt: 'professional product photography of retro-style sneakers with classic design, vintage aesthetic, modern comfort, studio lighting, white background'
  }
];

// Ensure images directory exists
const imagesDir = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to generate image using Replicate
async function generateProductImage(product) {
  try {
    console.log(`🎨 Generating image for: ${product.name}`);
    
    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: product.prompt,
          width: 512,
          height: 512,
          num_outputs: 1,
          num_inference_steps: 20,
          guidance_scale: 7.5,
          scheduler: "K_EULER"
        }
      }
    );

    if (output && output[0]) {
      const imageUrl = output[0];
      const filepath = path.join(imagesDir, product.filename);
      
      await downloadImage(imageUrl, filepath);
      console.log(`✅ Generated and saved: ${product.filename}`);
    } else {
      console.log(`❌ No output for: ${product.name}`);
    }
  } catch (error) {
    console.error(`❌ Error generating image for ${product.name}:`, error.message);
  }
}

// Main function to generate all product images
async function generateAllImages() {
  console.log('🚀 Starting AI product image generation...');
  console.log(`📁 Images will be saved to: ${imagesDir}`);
  
  if (!process.env.REPLICATE_API_TOKEN) {
    console.error('❌ REPLICATE_API_TOKEN not found in environment variables');
    console.log('Please set your Replicate API token in .env.local');
    process.exit(1);
  }

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] Processing: ${product.name}`);
    
    // Check if image already exists
    const filepath = path.join(imagesDir, product.filename);
    if (fs.existsSync(filepath)) {
      console.log(`⏭️ Image already exists, skipping: ${product.filename}`);
      continue;
    }
    
    await generateProductImage(product);
    
    // Add delay to respect API rate limits
    if (i < products.length - 1) {
      console.log('⏳ Waiting 3 seconds before next generation...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n🎉 AI image generation completed!');
  console.log(`📸 Generated images are in: ${imagesDir}`);
}

// Run the image generation
if (require.main === module) {
  generateAllImages()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('❌ Error in image generation:', error);
      process.exit(1);
    });
}

module.exports = { generateAllImages, generateProductImage };